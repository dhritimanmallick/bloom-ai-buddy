
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { getChatResponse } from '@/services/aiService';
import ApiKeySettings from './ApiKeySettings';
import { toast } from '@/components/ui/use-toast';

const ChatInterface: React.FC = () => {
  const { messages, addMessage, isTyping, setIsTyping } = useChat();
  const { language, t } = useLanguage();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [patientName, setPatientName] = useState<string>('');
  const [doctorName, setDoctorName] = useState<string>('');

  useEffect(() => {
    // Load patient data
    const storedData = localStorage.getItem('patientData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setPatientName(parsedData.name || '');
      setDoctorName(parsedData.doctor || 'Dr. Dheepa Thyagrajan');
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    addMessage(input, 'user');
    setInput('');
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Check if API key is set
      const apiKey = localStorage.getItem('openai_api_key');
      
      if (!apiKey) {
        setTimeout(() => {
          setIsTyping(false);
          addMessage(t('pleaseAddApiKey'), 'ai');
        }, 1000);
        return;
      }
      
      // Get AI response
      const response = await getChatResponse(input, language);
      setIsTyping(false);
      addMessage(response, 'ai');
    } catch (error) {
      console.error('Error getting AI response:', error);
      setIsTyping(false);
      
      // Show friendly error message
      let errorMessage = t('errorGettingResponse');
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: t('error'),
        description: errorMessage,
        variant: "destructive",
      });
      
      addMessage(t('errorGettingResponse'), 'ai');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-care" />
            <h2 className="text-lg font-medium">{doctorName}'s Care Assistant</h2>
          </div>
          {patientName && (
            <p className="text-sm text-muted-foreground ml-7">
              Hello, {patientName}
            </p>
          )}
        </div>
        <ApiKeySettings />
      </div>

      <div className="flex-1 overflow-y-auto p-4 chat-container flex flex-col">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[80%] rounded-lg p-4 mb-2",
              message.sender === 'ai' 
                ? "bg-care-light text-gray-800 self-start rounded-bl-none" 
                : "bg-care text-white self-end rounded-br-none"
            )}
          >
            {message.text}
          </div>
        ))}
        
        {isTyping && (
          <div className="max-w-[80%] rounded-lg p-4 mb-2 bg-care-light text-gray-800 self-start rounded-bl-none">
            <div className="flex space-x-1">
              <div className="h-2 w-2 bg-care rounded-full animate-pulse-gentle"></div>
              <div className="h-2 w-2 bg-care rounded-full animate-pulse-gentle" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 bg-care rounded-full animate-pulse-gentle" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chatPlaceholder')}
            className="flex-1"
          />
          <Button onClick={handleSend} className="bg-care hover:bg-care-dark">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {t('emergencyNotice')}
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
