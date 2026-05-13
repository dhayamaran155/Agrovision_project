import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { PlayCircle, X } from 'lucide-react';

export const Videos = () => {
    const { t, language } = useLanguage();
    const [selectedVideo, setSelectedVideo] = useState(null);

    const getEmbedUrl = (url) => {
        if (!url) return '';
        if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1].split('?')[0];
            return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        } else if (url.includes('youtube.com/watch')) {
            try {
                const urlObj = new URL(url);
                const videoId = urlObj.searchParams.get('v');
                return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            } catch (e) {
                return url;
            }
        }
        return url;
    };

    const videos = [
        {
            id: "vid1",
            titleEn: "Modern Organic Farming Techniques",
            titleTa: "நவீன இயற்கை விவசாய நுட்பங்கள்",
            thumbId: "organic-farm",
            duration: "12:45",
            url: "https://youtu.be/mkEsLdNKlPM?t=9"
        },
        {
            id: "vid2",
            titleEn: "Effective Drip Irrigation Setup",
            titleTa: "பயனுள்ள சொட்டு நீர் பாசன அமைப்பு",
            thumbId: "drip-irrigation",
            duration: "08:20",
            url: "https://youtu.be/yR-t7Kks0EM?t=4"
        },
        {
            id: "vid3",
            titleEn: "Pest Management in Tomatoes",
            titleTa: "தக்காளியில் பூச்சி மேலாண்மை",
            thumbId: "tomato-farm",
            duration: "15:10",
            url: "https://youtu.be/mkEsLdNKlPM?t=9"
        },
        {
            id: "vid4",
            titleEn: "Applying for Kisan Credit Card",
            titleTa: "கிசான் கிரெடிட் கார்டு விண்ணப்பிக்கும் முறை",
            thumbId: "kisan-card",
            duration: "05:30",
            url: "https://youtu.be/yR-t7Kks0EM?t=4"
        }
    ];

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>{t.nav.videos}</h2>
            <p style={styles.subtitle}>
                {language === 'en'
                    ? 'Watch educational videos curated for advanced farming and scheme application guidelines.'
                    : 'மேம்பட்ட விவசாயம் மற்றும் திட்ட விண்ணப்ப வழிகாட்டுதல்களுக்காக தொகுக்கப்பட்ட கல்வி வீடியோக்களைப் பார்க்கவும்.'}
            </p>

            <div style={styles.grid}>
                {videos.map(video => (
                    <div key={video.id} style={styles.videoCard} onClick={() => setSelectedVideo(video)}>
                        <div style={styles.thumbnailArea}>
                            {/* Using a placeholder service since we don't have actual thumbnails */}
                            <img
                                src={`https://source.unsplash.com/400x225/?agriculture,${video.thumbId}`}
                                alt={language === 'en' ? video.titleEn : video.titleTa}
                                style={styles.thumbnail}
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=400&h=225';
                                }}
                            />
                            <div style={styles.overlay}>
                                <PlayCircle size={48} color="white" />
                            </div>
                            <span style={styles.durationBadge}>{video.duration}</span>
                        </div>

                        <div style={styles.videoInfo}>
                            <h3 style={styles.videoTitle}>
                                {language === 'en' ? video.titleEn : video.titleTa}
                            </h3>
                            <p style={styles.channelName}>AgriBot Education</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Video Modal Overlay */}
            {selectedVideo && (
                <div style={styles.modalOverlay} onClick={() => setSelectedVideo(null)}>
                    <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button style={styles.closeButton} onClick={() => setSelectedVideo(null)}>
                            <X size={24} />
                        </button>
                        <iframe
                            width="100%"
                            height="100%"
                            src={getEmbedUrl(selectedVideo.url)}
                            title={language === 'en' ? selectedVideo.titleEn : selectedVideo.titleTa}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ borderRadius: '8px' }}
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '24px',
    },
    modalContent: {
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        aspectRatio: '16/9',
        backgroundColor: '#000',
        borderRadius: '8px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    },
    closeButton: {
        position: 'absolute',
        top: '-40px',
        right: '0',
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        padding: '8px',
        zIndex: 1001,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
    },
    header: {
        color: 'var(--primary-dark)',
        marginBottom: '8px',
    },
    subtitle: {
        color: 'var(--text-muted)',
        marginBottom: '32px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
    },
    videoCard: {
        backgroundColor: 'var(--surface)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid var(--border)',
        transition: 'transform 0.2s',
        cursor: 'pointer',
    },
    thumbnailArea: {
        position: 'relative',
        height: '180px',
        backgroundColor: '#eee',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
        transition: 'opacity 0.2s',
    },
    durationBadge: {
        position: 'absolute',
        bottom: '8px',
        right: '8px',
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '0.8rem',
        fontWeight: '500',
    },
    videoInfo: {
        padding: '16px',
    },
    videoTitle: {
        margin: '0 0 8px 0',
        fontSize: '1.1rem',
        color: 'var(--text-main)',
        lineHeight: '1.4',
    },
    channelName: {
        margin: 0,
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
    }
};
