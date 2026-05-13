import React from 'react';
import { useLanguage } from '../LanguageContext';
import { IndianRupee, FileText, Check } from 'lucide-react';

export const Schemes = () => {
    const { t, language } = useLanguage();

    const schemesData = [
        {
            id: 1,
            titleEn: "PM-KISAN Samman Nidhi",
            titleTa: "பி.எம் கிசான் சம்மன் நிதி",
            descEn: "Financial benefit of Rs. 6000/- per year in three equal installments to small and marginal farmer families.",
            descTa: "சிறு மற்றும் குறு விவசாயக் குடும்பங்களுக்கு ஆண்டுக்கு தலா ரூ. 6000/- மூன்று சம தவணைகளில் நிதியுதவி.",
            eligibilityEn: ["Small and marginal farmers", "Own cultivable land"],
            eligibilityTa: ["சிறு மற்றும் குறு விவசாயிகள்", "சொந்த சாகுபடி நிலம்"],
            applyLink: "https://pmkisan.gov.in/"
        },
        {
            id: 2,
            titleEn: "Kisan Credit Card (KCC)",
            titleTa: "கிசான் கிரெடிட் கார்டு (KCC)",
            descEn: "Providing adequate and timely credit support from the banking system to the farmers for their cultivation needs.",
            descTa: "விவசாயிகளின் சாகுபடி தேவைகளுக்காக வங்கி முறையிலிருந்து போதுமான மற்றும் சரியான நேரத்தில் கடன் ஆதரவை வழங்குதல்.",
            eligibilityEn: ["All farmers (individuals/joint)", "Tenant farmers"],
            eligibilityTa: ["அனைத்து விவசாயிகள் (தனிநபர்/கூட்டு)", "குத்தகை விவசாயிகள்"],
            applyLink: "https://www.myscheme.gov.in/schemes/kcc"
        },
        {
            id: 3,
            titleEn: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            titleTa: "பிரதான் மந்திரி பயிர் காப்பீட்டுத் திட்டம்",
            descEn: "Provides comprehensive insurance cover against failure of the crop helping in stabilising farmers' income.",
            descTa: "பயிர் தோல்விக்கு எதிரான விரிவான காப்பீட்டுத் தொகையை வழங்குகிறது, இது விவசாயிகளின் வருமானத்தை நிலைப்படுத்த உதவுகிறது.",
            eligibilityEn: ["Farmers growing notified crops", "Loanee and Non-loanee farmers"],
            eligibilityTa: ["அறிவிக்கப்பட்ட பயிர்களை வளர்க்கும் விவசாயிகள்", "கடன் பெற்ற மற்றும் கடன் பெறாத விவசாயிகள்"],
            applyLink: "https://pmfby.gov.in/"
        }
    ];

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>{t.nav.schemes}</h2>
            <p style={styles.subtitle}>
                {language === 'en'
                    ? 'Explore available government schemes, subsidies, and agricultural loans.'
                    : 'கிடைக்கக்கூடிய அரசுத் திட்டங்கள், மானியங்கள் மற்றும் விவசாயக் கடன்களை ஆராயுங்கள்.'}
            </p>

            <div style={styles.grid}>
                {schemesData.map(scheme => (
                    <div key={scheme.id} style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div style={styles.iconCircle}>
                                <IndianRupee size={24} color="var(--primary)" />
                            </div>
                            <h3 style={styles.cardTitle}>{language === 'en' ? scheme.titleEn : scheme.titleTa}</h3>
                        </div>

                        <p style={styles.description}>
                            {language === 'en' ? scheme.descEn : scheme.descTa}
                        </p>

                        <div style={styles.eligibilityBox}>
                            <h4 style={styles.eligibilityTitle}>
                                <FileText size={16} style={{ marginRight: 6 }} />
                                {language === 'en' ? 'Eligibility Criteria:' : 'தகுதி வரம்பு:'}
                            </h4>
                            <ul style={styles.list}>
                                {(language === 'en' ? scheme.eligibilityEn : scheme.eligibilityTa).map((item, idx) => (
                                    <li key={idx} style={styles.listItem}>
                                        <Check size={14} color="var(--success)" style={{ marginRight: 8, flexShrink: 0, marginTop: 4 }} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button 
                            style={styles.applyBtn} 
                            onClick={() => window.open(scheme.applyLink, '_blank')}
                        >
                            {language === 'en' ? 'Apply Now' : 'இப்போது விண்ணப்பிக்கவும்'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
    },
    card: {
        backgroundColor: 'var(--surface)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '16px',
    },
    iconCircle: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#E8F5E9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    cardTitle: {
        margin: 0,
        fontSize: '1.2rem',
        color: 'var(--text-main)',
    },
    description: {
        color: 'var(--text-muted)',
        lineHeight: '1.5',
        marginBottom: '24px',
        flex: 1,
    },
    eligibilityBox: {
        backgroundColor: '#FAFAFA',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '24px',
    },
    eligibilityTitle: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 0 12px 0',
        color: 'var(--text-main)',
        fontSize: '0.95rem',
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    listItem: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '8px',
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
    },
    applyBtn: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid var(--primary)',
        backgroundColor: 'transparent',
        color: 'var(--primary)',
        fontWeight: '600',
        transition: 'background 0.2s, color 0.2s',
    }
};
