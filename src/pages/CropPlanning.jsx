import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Calendar, Sun, CloudRain, Snowflake } from 'lucide-react';

export const CropPlanning = () => {
    const { t, language } = useLanguage();
    const [selectedSeason, setSelectedSeason] = useState(null);

    const seasonsEn = [
        { id: 'kharif', name: 'Kharif (Monsoon)', period: 'July - October', icon: <CloudRain size={24} /> },
        { id: 'rabi', name: 'Rabi (Winter)', period: 'October - March', icon: <Snowflake size={24} /> },
        { id: 'zaid', name: 'Zaid (Summer)', period: 'March - June', icon: <Sun size={24} /> },
    ];

    const seasonsTa = [
        { id: 'kharif', name: 'காரிஃப் (மழைக்காலம்)', period: 'ஜூலை - அக்டோபர்', icon: <CloudRain size={24} /> },
        { id: 'rabi', name: 'ரபி (குளிர்காலம்)', period: 'அக்டோபர் - மார்ச்', icon: <Snowflake size={24} /> },
        { id: 'zaid', name: 'சயீத் (கோடைகாலம்)', period: 'மார்ச் - ஜூன்', icon: <Sun size={24} /> },
    ];

    const seasons = language === 'en' ? seasonsEn : seasonsTa;

    const recommendations = {
        kharif: {
            en: { crops: 'Rice, Maize, Sorghum, Pearl Millet/Bajra', tips: 'Ensure proper drainage to prevent waterlogging. Monitor for standard monsoon pests.' },
            ta: { crops: 'நெல், மக்காச்சோளம், சோளம், கம்பு', tips: 'நீர் தேங்காமல் இருக்க சரியான வடிகால் வசதியை உறுதி செய்யவும். மழைக்கால பூச்சிகளைக் கண்காணிக்கவும்.' }
        },
        rabi: {
            en: { crops: 'Wheat, Barley, Oats, Chickpea/Gram', tips: 'Utilize soil moisture from previous monsoon rains. Mild irrigation needed.' },
            ta: { crops: 'கோதுமை, பார்லி, ஓட்ஸ், கொண்டைக்கடலை', tips: 'முந்தைய பருவமழையிலிருந்து மண்ணின் ஈரப்பதத்தைப் பயன்படுத்தவும். மிதமான பாசனம் தேவை.' }
        },
        zaid: {
            en: { crops: 'Watermelon, Muskmelon, Cucumber, Vegetables', tips: 'Frequent irrigation is necessary. Protect from intense heat.' },
            ta: { crops: 'தர்பூசணி, முலாம்பழம், வெள்ளரி, காய்கறிகள்', tips: 'அடிக்கடி பாசனம் தேவை. கடுமையான வெப்பத்திலிருந்து விடுபடவும்.' }
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>{t.nav.cropPlanning}</h2>

            <p style={styles.subtitle}>
                {language === 'en'
                    ? 'Select a season to view recommended crops and farming tips.'
                    : 'பரிந்துரைக்கப்பட்ட பயிர்கள் மற்றும் விவசாயக் குறிப்புகளைப் பார்க்க ஒரு பருவத்தைத் தேர்ந்தெடுக்கவும்.'}
            </p>

            <div style={styles.seasonGrid}>
                {seasons.map(s => (
                    <div
                        key={s.id}
                        style={{ ...styles.seasonCard, ...(selectedSeason === s.id ? styles.selectedCard : {}) }}
                        onClick={() => setSelectedSeason(s.id)}
                    >
                        <div style={styles.iconWrapper}>{s.icon}</div>
                        <h3 style={styles.seasonName}>{s.name}</h3>
                        <p style={styles.seasonPeriod}>
                            <Calendar size={14} style={{ marginRight: 4, display: 'inline' }} />
                            {s.period}
                        </p>
                    </div>
                ))}
            </div>

            {selectedSeason && (
                <div style={styles.resultsBox}>
                    <h3 style={styles.resultsTitle}>
                        {language === 'en' ? 'Recommendations' : 'பரிந்துரைகள்'}
                    </h3>
                    <div style={styles.resultItem}>
                        <strong>{language === 'en' ? 'Top Crops:' : 'சிறந்த பயிர்கள்:'}</strong>
                        <p>{recommendations[selectedSeason][language].crops}</p>
                    </div>
                    <div style={styles.resultItem}>
                        <strong>{language === 'en' ? 'Key Tips:' : 'முக்கிய குறிப்புகள்:'}</strong>
                        <p>{recommendations[selectedSeason][language].tips}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '900px',
        margin: '0 auto',
    },
    header: {
        color: 'var(--primary-dark)',
        marginBottom: '8px',
    },
    subtitle: {
        color: 'var(--text-muted)',
        marginBottom: '24px',
    },
    seasonGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
    },
    seasonCard: {
        backgroundColor: 'var(--surface)',
        border: '2px solid var(--border)',
        borderRadius: '12px',
        padding: '24px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s, border-color 0.2s',
    },
    selectedCard: {
        borderColor: 'var(--primary)',
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 16px rgba(46, 125, 50, 0.1)',
    },
    iconWrapper: {
        color: 'var(--secondary)',
        marginBottom: '12px',
    },
    seasonName: {
        fontSize: '1.2rem',
        marginBottom: '8px',
        color: 'var(--text-main)',
    },
    seasonPeriod: {
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
    },
    resultsBox: {
        backgroundColor: '#E8F5E9',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #C8E6C9',
    },
    resultsTitle: {
        color: 'var(--primary-dark)',
        marginBottom: '16px',
        borderBottom: '2px solid #C8E6C9',
        paddingBottom: '8px',
    },
    resultItem: {
        marginBottom: '12px',
    }
};
