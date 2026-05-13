import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

export const DiseaseDetection = () => {
    const { t, language } = useLanguage();
    const [file, setFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const mockDiseases = [
        {
            diseaseEn: "Early Blight",
            diseaseTa: "முன்கூட்டிய கருகல் நோய்",
            confidence: "92%",
            solutionEn: "Apply copper-based fungicides. Ensure proper spacing between plants for air circulation.",
            solutionTa: "தாமிரம் கலந்த பூஞ்சைக் கொல்லிகளைப் பயன்படுத்தவும். காற்று ஓட்டத்திற்காக செடிகளுக்கு இடையே சரியான இடைவெளியை உறுதி செய்யவும்."
        },
        {
            diseaseEn: "Powdery Mildew",
            diseaseTa: "சாம்பல் நோய்",
            confidence: "88%",
            solutionEn: "Use sulfur-based fungicides and avoid overhead watering to keep foliage dry.",
            solutionTa: "கந்தகம் கலந்த பூஞ்சைக் கொல்லிகளைப் பயன்படுத்தவும் மற்றும் இலைகளை ஈரமாகாமல் இருக்க தெளிப்பு நீர்ப்பாசனத்தைத் தவிர்க்கவும்."
        },
        {
            diseaseEn: "Leaf Spot",
            diseaseTa: "இலைப்புள்ளி நோய்",
            confidence: "95%",
            solutionEn: "Remove infected leaves immediately. Water at the base of the plant.",
            solutionTa: "பாதிக்கப்பட்ட இலைகளை உடனடியாக அகற்றவும். தாவரத்தின் அடியில் நீர்ப்பாசனம் செய்யவும்."
        },
        {
            diseaseEn: "Healthy Leaf",
            diseaseTa: "ஆரோக்கியமான இலை",
            confidence: "99%",
            solutionEn: "No action needed. Continue current maintenance routines.",
            solutionTa: "எந்த நடவடிக்கையும் தேவையில்லை. தற்போதைய பராமரிப்பு முறைகளைத் தொடரவும்."
        }
    ];

    const handleUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(URL.createObjectURL(selectedFile));
            setAnalyzing(true);
            setResult(null);

            // Simulate analysis delay
            setTimeout(() => {
                const randomOutcome = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
                
                setAnalyzing(false);
                setResult(randomOutcome);
            }, 2000);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>{t.nav.diseaseDetection}</h2>
            <p style={styles.subtitle}>
                {language === 'en'
                    ? 'Upload a clear image of the affected plant leaf for AI analysis.'
                    : 'AI பகுப்பாய்விற்கு பாதிக்கப்பட்ட திருத்தமான தாவர இலையின் படத்தைப் பதிவேற்றவும்.'}
            </p>

            <div style={styles.uploadArea}>
                <input
                    type="file"
                    accept="image/*"
                    id="leaf-upload"
                    style={{ display: 'none' }}
                    onChange={handleUpload}
                />
                <label htmlFor="leaf-upload" style={styles.uploadLabel}>
                    {!file && (
                        <div style={styles.uploadContent}>
                            <Upload size={48} color="var(--primary)" style={{ marginBottom: 16 }} />
                            <span style={styles.btnText}>{t.common.upload}</span>
                        </div>
                    )}
                    {file && (
                        <img src={file} alt="Uploaded leaf" style={styles.previewImage} />
                    )}
                </label>
            </div>

            {analyzing && (
                <div style={styles.analyzingBox}>
                    <div style={styles.spinner}></div>
                    <p>{language === 'en' ? 'Analyzing image...' : 'படத்தை பகுப்பாய்வு செய்கிறது...'}</p>
                </div>
            )}

            {result && !analyzing && (
                <div style={styles.resultCard}>
                    <div style={styles.resultHeader}>
                        <AlertCircle color="var(--error)" size={24} />
                        <h3 style={styles.diseaseName}>
                            {language === 'en' ? 'Disease Detected: ' : 'கண்டறியப்பட்ட நோய்: '}
                            {language === 'en' ? result.diseaseEn : result.diseaseTa}
                        </h3>
                    </div>
                    <p style={styles.confidence}>
                        {language === 'en' ? 'Confidence: ' : 'நம்பிக்கை சதவீதம்: '}
                        <strong>{result.confidence}</strong>
                    </p>

                    <div style={styles.solutionBox}>
                        <h4 style={styles.solutionTitle}>
                            <CheckCircle2 size={18} style={{ marginRight: 8 }} />
                            {language === 'en' ? 'Recommended Action' : 'பரிந்துரைக்கப்பட்ட தற்காப்பு'}
                        </h4>
                        <p style={styles.solutionText}>
                            {language === 'en' ? result.solutionEn : result.solutionTa}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
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
    uploadArea: {
        width: '100%',
        height: '300px',
        border: '2px dashed var(--primary)',
        borderRadius: '16px',
        backgroundColor: 'var(--surface)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '24px',
        overflow: 'hidden',
        transition: 'background 0.3s',
    },
    uploadLabel: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    uploadContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    btnText: {
        backgroundColor: 'var(--primary)',
        color: 'white',
        padding: '10px 24px',
        borderRadius: '24px',
        fontWeight: '600',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    analyzingBox: {
        textAlign: 'center',
        padding: '24px',
        color: 'var(--text-muted)',
    },
    spinner: {
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid var(--primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 16px',
    },
    resultCard: {
        backgroundColor: 'var(--surface)',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        borderLeft: '6px solid var(--error)',
    },
    resultHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '8px',
    },
    diseaseName: {
        color: 'var(--error)',
        margin: 0,
        fontSize: '1.25rem',
    },
    confidence: {
        color: 'var(--text-muted)',
        marginBottom: '20px',
    },
    solutionBox: {
        backgroundColor: '#E8F5E9',
        padding: '16px',
        borderRadius: '8px',
    },
    solutionTitle: {
        display: 'flex',
        alignItems: 'center',
        color: 'var(--success)',
        marginBottom: '8px',
    },
    solutionText: {
        color: 'var(--text-main)',
        lineHeight: '1.6',
    }
};
