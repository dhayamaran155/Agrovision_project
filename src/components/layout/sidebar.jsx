import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../LanguageContext';
import { Home, MessageSquare, Sprout, ScanSearch, FileText, Video } from 'lucide-react';

export const Sidebar = ({ isOpen }) => {
    const { t } = useLanguage();

    const navItems = [
        { path: '/', label: t.nav.dashboard, icon: <Home size={20} /> },
        { path: '/chatbot', label: t.nav.chatbot, icon: <MessageSquare size={20} /> },
        { path: '/crop', label: t.nav.cropPlanning, icon: <Sprout size={20} /> },
        { path: '/disease', label: t.nav.diseaseDetection, icon: <ScanSearch size={20} /> },
        { path: '/schemes', label: t.nav.schemes, icon: <FileText size={20} /> },
        { path: '/videos', label: t.nav.videos, icon: <Video size={20} /> },
    ];

    if (!isOpen) return null;

    return (
        <aside style={styles.sidebar}>
            <div style={styles.navContainer}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        style={({ isActive }) => ({
                            ...styles.navLink,
                            ...(isActive ? styles.activeLink : {}),
                        })}
                    >
                        {item.icon}
                        <span style={styles.label}>{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </aside>
    );
};

const styles = {
    sidebar: {
        width: '250px',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        height: 'calc(100vh - 64px)',
        position: 'sticky',
        top: '64px',
        overflowY: 'auto',
        transition: 'width 0.3s',
    },
    navContainer: {
        padding: '16px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '8px',
        color: 'var(--text-main)',
        fontWeight: '500',
        transition: 'background 0.2s, color 0.2s',
    },
    activeLink: {
        backgroundColor: 'var(--primary-light)',
        color: 'white',
    },
    label: {
        fontSize: '0.95rem',
    }
};
