import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language, TranslationState } from '../translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: TranslationState;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('pt');

    return (
        <LanguageContext.Provider value={{
            language,
            setLanguage,
            t: translations[language]
        }}>
            {children}
        </LanguageContext.Provider>
    );
};
