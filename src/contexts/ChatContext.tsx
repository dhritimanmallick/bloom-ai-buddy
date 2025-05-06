
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
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      text: t('greeting'),
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Update initial message when language changes
  useEffect(() => {
    setMessages(prev => [{
      id: '1',
      text: t('greeting'),
      sender: 'ai',
      timestamp: new Date(),
    }, ...prev.slice(1)]);
  }, [language, t]);

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
    setMessages([
      {
        id: '1',
        text: t('greeting'),
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
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
