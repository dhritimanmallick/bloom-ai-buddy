
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

  // Mock responses based on keywords for prenatal care
  const mockResponses: Record<string, string> = {
    hello: "Hello! I'm your antenatal care assistant from Dr. Dheepa Thyagrajan's office. How can I help you today?",
    appointment: "I can help you schedule an appointment with Dr. Dheepa Thyagrajan. Would you prefer morning or afternoon?",
    pain: "I understand you're experiencing pain. Could you describe where it's located and its intensity? For severe or sudden pain, please contact Dr. Dheepa Thyagrajan immediately.",
    nausea: "Nausea is common during pregnancy. Dr. Dheepa Thyagrajan recommends eating small, frequent meals and trying ginger tea. If vomiting is severe or persistent, please schedule an appointment.",
    cramp: "Mild cramping can be normal, but if you experience severe cramping or it's accompanied by bleeding, please contact Dr. Dheepa Thyagrajan immediately.",
    bleeding: "Any bleeding during pregnancy should be reported. Please contact Dr. Dheepa Thyagrajan's office immediately for evaluation.",
    diet: "A balanced diet rich in fruits, vegetables, proteins, and whole grains is important. Dr. Dheepa Thyagrajan recommends prenatal vitamins with folic acid as well.",
    exercise: "Moderate exercise like walking, swimming, or prenatal yoga is beneficial. Dr. Dheepa Thyagrajan advises to avoid high-impact activities and to stay hydrated.",
    sleep: "Sleeping on your left side promotes better blood flow. Dr. Dheepa Thyagrajan suggests using pregnancy pillows for support and maintaining a regular sleep schedule.",
    emergency: "If you're experiencing severe pain, heavy bleeding, or believe this is an emergency, please call emergency services immediately at 911 or contact Dr. Dheepa Thyagrajan's emergency line.",
    default: "Thank you for your message. Is there anything else you'd like to know about your prenatal care? For specific medical advice, Dr. Dheepa Thyagrajan would be happy to address your concerns during your next appointment."
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
          <h2 className="text-lg font-medium">Dr. Dheepa's Care Assistant</h2>
        </div>
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
            placeholder="Ask about your pregnancy care..."
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
