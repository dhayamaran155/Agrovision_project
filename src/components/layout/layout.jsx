import React, { useState, useEffect } from 'react';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

export const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Auto-collapse sidebar on smaller screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={styles.container}>
            <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <div style={styles.mainWrapper}>
                <Sidebar isOpen={sidebarOpen} />
                <main style={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    mainWrapper: {
        display: 'flex',
        flex: 1,
    },
    content: {
        flex: 1,
        padding: '24px',
        overflowY: 'auto',
        backgroundColor: 'var(--background)',
    }
};
