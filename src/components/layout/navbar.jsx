import React from 'react';
import { useLanguage } from '../../LanguageContext';
import { Sprout, Menu } from 'lucide-react';

export const Navbar = ({ toggleSidebar }) => {
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <nav style={styles.navbar}>
            <div style={styles.left}>
                <button onClick={toggleSidebar} style={styles.iconBtn}>
                    <Menu size={24} color="white" />
                </button>
                <div style={styles.brand}>
                    <Sprout size={28} color="white" />
                    <h1 style={styles.title}>{t.appTitle}</h1>
                </div>
            </div>
            <div style={styles.right}>
                <button onClick={toggleLanguage} style={styles.langBtn}>
                    {language === 'en' ? 'தமிழ்' : 'English'}
                </button>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        height: '64px',
        backgroundColor: 'var(--primary)',
        color: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
    },
    left: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    title: {
        margin: 0,
        fontSize: '1.25rem',
        fontWeight: '600',
    },
    right: {
        display: 'flex',
        alignItems: 'center',
    },
    langBtn: {
        background: 'rgba(255,255,255,0.2)',
        border: 'none',
        color: 'white',
        padding: '6px 16px',
        borderRadius: '20px',
        fontWeight: '500',
        transition: 'background 0.2s',
    },
    iconBtn: {
        background: 'none',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px',
    }
};
