
// This file has duplicate properties in the translations object.
// I'll update it to fix these duplications while preserving functionality.
import React, { createContext, useContext, useState, ReactNode } from 'react';

type LanguageType = 'en' | 'ta';

type TranslationsType = {
  [key: string]: {
    [key in LanguageType]: string;
  };
};

const translations: TranslationsType = {
  greeting: {
    en: "Hello! I'm Dr. Dheepa's pregnancy care assistant. How can I help you today?",
    ta: "வணக்கம்! நான் டாக்டர் தீபாவின் கர்ப்பப் பராமரிப்பு உதவியாளர். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?"
  },
  chatPlaceholder: {
    en: "Type your question or concern...",
    ta: "உங்கள் கேள்வி அல்லது கவலையை தட்டச்சு செய்யவும்..."
  },
  emergencyNotice: {
    en: "For emergencies, please call your doctor immediately.",
    ta: "அவசர நிலைகளுக்கு, உடனடியாக உங்கள் மருத்துவரை அழைக்கவும்."
  },
  yourProfile: {
    en: "Your Profile",
    ta: "உங்கள் சுயவிவரம்"
  },
  name: {
    en: "Name",
    ta: "பெயர்"
  },
  age: {
    en: "Age",
    ta: "வயது"
  },
  currentWeek: {
    en: "Current Week",
    ta: "நடப்பு வாரம்"
  },
  dueDate: {
    en: "Due Date",
    ta: "பிரசவ தேதி"
  },
  nextAppointment: {
    en: "Next Appointment",
    ta: "அடுத்த சந்திப்பு"
  },
  emergencySupport: {
    en: "Emergency Support",
    ta: "அவசர ஆதரவு"
  },
  callHotline: {
    en: "Call Hotline",
    ta: "ஹாட்லைன் அழைக்கவும்"
  },
  callDoctor: {
    en: "Call Your Doctor",
    ta: "உங்கள் மருத்துவரை அழைக்கவும்"
  },
  upcomingAppointments: {
    en: "Upcoming Appointments",
    ta: "வரவிருக்கும் சந்திப்புகள்"
  },
  scheduleNew: {
    en: "Schedule New",
    ta: "புதியதை திட்டமிடவும்"
  },
  educationalResources: {
    en: "Educational Resources",
    ta: "கல்வி வளங்கள்"
  },
  footer: {
    en: "© 2025 Pregnancy Care Assistant",
    ta: "© 2025 கர்ப்ப பராமரிப்பு உதவியாளர்"
  },
  addApiKey: {
    en: "Add API Key",
    ta: "API விசையைச் சேர்க்கவும்"
  },
  error: {
    en: "Error",
    ta: "பிழை"
  },
  success: {
    en: "Success",
    ta: "வெற்றி"
  },
  errorGettingResponse: {
    en: "Error getting response from AI. Please try again.",
    ta: "AI இலிருந்து பதில் பெறுவதில் பிழை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்."
  },
  pleaseAddApiKey: {
    en: "Please add your OpenAI API key in the settings to enable AI responses.",
    ta: "AI பதில்களை இயக்க அமைப்புகளில் உங்கள் OpenAI API விசையைச் சேர்க்கவும்."
  },
  patientLogin: {
    en: "Patient Login",
    ta: "நோயாளி உள்நுழைவு"
  },
  dateOfBirth: {
    en: "Date of Birth",
    ta: "பிறந்த தேதி"
  },
  enterYourName: {
    en: "Enter your name",
    ta: "உங்கள் பெயரை உள்ளிடவும்"
  },
  selectDate: {
    en: "Select date",
    ta: "தேதியைத் தேர்ந்தெடுக்கவும்"
  },
  enterCurrentWeek: {
    en: "Enter current week of pregnancy",
    ta: "கர்ப்பத்தின் நடப்பு வாரத்தை உள்ளிடவும்"
  },
  login: {
    en: "Login",
    ta: "உள்நுழைய"
  },
  pleaseCompleteAllFields: {
    en: "Please complete all fields",
    ta: "அனைத்து புலங்களையும் பூர்த்தி செய்யவும்"
  },
  loginSuccessful: {
    en: "Login successful",
    ta: "உள்நுழைவு வெற்றிகரமாக"
  },
  chooseDoctor: {
    en: "Choose Your Doctor",
    ta: "உங்கள் மருத்துவரைத் தேர்ந்தெடுக்கவும்"
  },
  drDheepa: {
    en: "Dr. Dheepa Thyagrajan",
    ta: "டாக்டர் தீபா தியாகராஜன்"
  },
  drSarah: {
    en: "Dr. Sarah Johnson",
    ta: "டாக்டர் சாரா ஜான்சன்"
  },
  drRobert: {
    en: "Dr. Robert Chen",
    ta: "டாக்டர் ராபர்ட் சென்"
  },
  yourDoctor: {
    en: "Your Doctor",
    ta: "உங்கள் மருத்துவர்"
  }
};

type LanguageContextType = {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageType>('en');

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
