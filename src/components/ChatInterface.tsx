
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Upload } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { getChatResponse } from '@/services/aiService';
import ApiKeySettings from './ApiKeySettings';
import { toast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import LabResultUpload from './LabResultUpload';

const ChatInterface: React.FC = () => {
  const { messages, addMessage, isTyping, setIsTyping } = useChat();
  const { language, t } = useLanguage();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Only scroll to bottom when messages change or typing status changes
  useEffect(() => {
    if (messagesEndRef.current) {
      // Use requestAnimationFrame to ensure DOM is fully updated before scrolling
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    addMessage(input, 'user');
    setInput('');
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Get AI response - no need to check for API key as the service now handles default
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
      e.preventDefault(); // Prevent default form submission behavior
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-care" />
          <h2 className="text-lg font-medium">Dr. Dheepa's Care Assistant</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2 border-care text-care hover:bg-care/10"
            onClick={() => setShowUploadModal(true)}
          >
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Upload Lab Results</span>
          </Button>
          <ApiKeySettings />
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-4 relative">
        <ScrollArea className="h-full pr-4">
          <div className="flex flex-col">
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
        </ScrollArea>
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

      {showUploadModal && (
        <LabResultUpload onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
};

export default ChatInterface;
