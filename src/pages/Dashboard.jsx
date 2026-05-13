import React from 'react';
import { useLanguage } from '../LanguageContext';

export const Dashboard = () => {
    const { t } = useLanguage();
    return (
        <div>
            <h2>{t.nav.dashboard}</h2>
            <p>Welcome to AgriBot. Select an option from the sidebar to get started.</p>
        </div>
    );
};
