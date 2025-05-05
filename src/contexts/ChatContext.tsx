
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

export type MessageType = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

type ChatContextType = {
  messages: MessageType[];
  addMessage: (text: string, sender: 'user' | 'ai') => void;
  clearMessages: () => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Generate greeting with patient and doctor names
  useEffect(() => {
    if (!initialized) {
      const storedData = localStorage.getItem('patientData');
      let greeting = t('greeting');
      
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          const patientName = parsedData.name;
          const doctorName = parsedData.doctor || 'Dr. Dheepa';
          
          if (patientName && doctorName) {
            greeting = `Hello ${patientName}! I'm ${doctorName}'s pregnancy care assistant. How can I help you today?`;
            if (language === 'ta') {
              greeting = `வணக்கம் ${patientName}! நான் ${doctorName} கர்ப்பப் பராமரிப்பு உதவியாளர். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?`;
            }
          }
        } catch (e) {
          console.error('Error parsing patient data:', e);
        }
      }

      setMessages([{
        id: '1',
        text: greeting,
        sender: 'ai',
        timestamp: new Date(),
      }]);
      
      setInitialized(true);
    }
  }, [language, t, initialized]);

  // Update greeting when language changes
  useEffect(() => {
    if (initialized && messages.length > 0) {
      const storedData = localStorage.getItem('patientData');
      let greeting = t('greeting');
      
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          const patientName = parsedData.name;
          const doctorName = parsedData.doctor || 'Dr. Dheepa';
          
          if (patientName && doctorName) {
            greeting = `Hello ${patientName}! I'm ${doctorName}'s pregnancy care assistant. How can I help you today?`;
            if (language === 'ta') {
              greeting = `வணக்கம் ${patientName}! நான் ${doctorName} கர்ப்பப் பராமரிப்பு உதவியாளர். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?`;
            }
          }
        } catch (e) {
          console.error('Error parsing patient data:', e);
        }
      }

      setMessages(prev => [{
        id: '1',
        text: greeting,
        sender: 'ai',
        timestamp: new Date(),
      }, ...prev.slice(1)]);
    }
  }, [language, t, initialized]);

  const addMessage = (text: string, sender: 'user' | 'ai') => {
    const newMessage: MessageType = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearMessages = () => {
    // Re-initialize with the personalized greeting
    setInitialized(false);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages, isTyping, setIsTyping }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
