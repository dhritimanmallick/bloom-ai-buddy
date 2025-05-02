
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send } from 'lucide-react';
import { useChat, MessageType } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';

const ChatInterface: React.FC = () => {
  const { messages, addMessage, isTyping, setIsTyping } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock responses based on keywords
  const mockResponses: Record<string, string> = {
    hello: "Hello there! How are you feeling today?",
    appointment: "I can help you schedule an appointment. Would you prefer morning or afternoon?",
    pain: "I'm sorry to hear you're experiencing pain. Could you describe where the pain is located and its severity?",
    nausea: "Nausea is common during pregnancy. Have you tried eating small, frequent meals? Ginger tea can also help.",
    emergency: "If you're experiencing severe pain, bleeding, or believe this is an emergency, please call emergency services immediately at 911.",
    default: "Thank you for your message. Is there anything else you'd like to know about your pregnancy care?"
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    addMessage(input, 'user');
    setInput('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Find relevant response or use default
    setTimeout(() => {
      setIsTyping(false);
      const lowerInput = input.toLowerCase();
      
      let response = mockResponses.default;
      for (const [keyword, reply] of Object.entries(mockResponses)) {
        if (lowerInput.includes(keyword)) {
          response = reply;
          break;
        }
      }
      
      addMessage(response, 'ai');
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-care" />
          <h2 className="text-lg font-medium">Care Assistant</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 chat-container flex flex-col">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("chat-bubble", message.sender === 'ai' ? 'ai' : 'user')}
          >
            {message.text}
          </div>
        ))}
        
        {isTyping && (
          <div className="chat-bubble ai">
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
            placeholder="Type your question..."
            className="flex-1"
          />
          <Button onClick={handleSend} className="bg-care hover:bg-care-dark">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          For medical emergencies, please call emergency services immediately.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
