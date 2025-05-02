
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'ta'; // English or Tamil

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, Record<string, string>>;
  t: (key: string) => string;
};

// Basic translations
const translations = {
  en: {
    'greeting': "Hello! I'm your antenatal care assistant from Dr. Dheepa Thyagrajan's office. How can I help you today?",
    'appointmentSchedule': 'Schedule Appointment',
    'emergencySupport': 'Emergency Support',
    'resources': 'Resources',
    'chatPlaceholder': 'Ask about your pregnancy care...',
    'emergencyNotice': 'For medical emergencies, please call emergency services immediately.',
    'yourProfile': 'Your Profile',
    'name': 'Name',
    'age': 'Age',
    'currentWeek': 'Current Week',
    'dueDate': 'Due Date',
    'nextAppointment': 'Next Appointment',
    'privacyPolicy': 'Privacy Policy',
    'termsOfService': 'Terms of Service',
    'contactSupport': 'Contact Support',
    'switchLanguage': 'தமிழில் காட்டு',
  },
  ta: {
    'greeting': "வணக்கம்! நான் டாக்டர் தீபா தியாகராஜனின் அலுவலகத்திலிருந்து உங்கள் கர்ப்பகால பராமரிப்பு உதவியாளர். நான் எப்படி உதவ முடியும்?",
    'appointmentSchedule': 'சந்திப்பை திட்டமிடுக',
    'emergencySupport': 'அவசர ஆதரவு',
    'resources': 'வளங்கள்',
    'chatPlaceholder': 'உங்கள் கர்ப்பத்தைப் பற்றிக் கேளுங்கள்...',
    'emergencyNotice': 'மருத்துவ அவசரங்களுக்கு, அவசர சேவைகளை உடனடியாக அழைக்கவும்.',
    'yourProfile': 'உங்கள் சுயவிவரம்',
    'name': 'பெயர்',
    'age': 'வயது',
    'currentWeek': 'தற்போதைய வாரம்',
    'dueDate': 'முடிவு தேதி',
    'nextAppointment': 'அடுத்த சந்திப்பு',
    'privacyPolicy': 'தனியுரிமைக் கொள்கை',
    'termsOfService': 'சேவை விதிமுறைகள்',
    'contactSupport': 'ஆதரவைத் தொடர்பு கொள்ளுங்கள்',
    'switchLanguage': 'Show in English',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Function to get translation
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
