
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send } from 'lucide-react';
import { useChat, MessageType } from '@/contexts/ChatContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const ChatInterface: React.FC = () => {
  const { messages, addMessage, isTyping, setIsTyping } = useChat();
  const { language, t } = useLanguage();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock responses based on keywords for prenatal care
  const mockResponsesEn: Record<string, string> = {
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
  
  const mockResponsesTa: Record<string, string> = {
    hello: "வணக்கம்! நான் டாக்டர் தீபா தியாகராஜனின் அலுவலகத்திலிருந்து உங்கள் கர்ப்பகால பராமரிப்பு உதவியாளர். நான் எப்படி உதவ முடியும்?",
    appointment: "டாக்டர் தீபா தியாகராஜனுடன் சந்திப்பை ஏற்பாடு செய்ய நான் உதவ முடியும். நீங்கள் காலை அல்லது மாலை நேரத்தை விரும்புகிறீர்களா?",
    pain: "நீங்கள் வலியை அனுபவிக்கிறீர்கள் என்பதை நான் புரிந்து கொள்கிறேன். அது எங்கே உள்ளது மற்றும் அதன் தீவிரத்தை விவரிக்க முடியுமா? கடுமையான அல்லது திடீர் வலிக்கு, டாக்டர் தீபா தியாகராஜனை உடனடியாக தொடர்பு கொள்ளவும்.",
    nausea: "கர்ப்பத்தின் போது குமட்டல் பொதுவானது. டாக்டர் தீபா தியாகராஜன் சிறிய, அடிக்கடி உணவுகளை உண்பது மற்றும் இஞ்சி தேநீர் முயற்சிப்பதை பரிந்துரைக்கிறார். வாந்தி கடுமையானதாக அல்லது தொடர்ச்சியாக இருந்தால், தயவுசெய்து ஒரு சந்திப்பை ஏற்பாடு செய்யுங்கள்.",
    cramp: "லேசான பிடிப்புகள் சாதாரணமாக இருக்கலாம், ஆனால் நீங்கள் கடுமையான பிடிப்புகளை அனுபவித்தால் அல்லது அது இரத்தப்போக்குடன் தொடர்புடையதாக இருந்தால், டாக்டர் தீபா தியாகராஜனை உடனடியாக தொடர்பு கொள்ளவும்.",
    bleeding: "கர்ப்பத்தின் போது ஏற்படும் எந்தவொரு இரத்தப்போக்கும் தெரிவிக்கப்பட வேண்டும். தயவுசெய்து மதிப்பீட்டிற்காக டாக்டர் தீபா தியாகராஜனின் அலுவலகத்தை உடனடியாக தொடர்பு கொள்ளவும்.",
    diet: "பழங்கள், காய்கறிகள், புரதங்கள் மற்றும் முழு தானியங்கள் நிறைந்த சமநிலை உணவு முக்கியம். டாக்டர் தீபா தியாகராஜன் ஃபோலிக் அமிலத்துடன் கூடிய தாய்மை வைட்டமின்களை பரிந்துரைக்கிறார்.",
    exercise: "நடைப்பயிற்சி, நீச்சல் அல்லது தாய்மை யோகா போன்ற மிதமான உடற்பயிற்சி பயனளிக்கும். டாக்டர் தீபா தியாகராஜன் அதிக தாக்க செயல்பாடுகளைத் தவிர்க்கவும், நீரேற்றத்தைத் தக்க வைக்கவும் அறிவுறுத்துகிறார்.",
    sleep: "இடது பக்கத்தில் படுத்துக் கொள்வது சிறந்த இரத்த ஓட்டத்தை ஊக்குவிக்கிறது. டாக்டர் தீபா தியாகராஜன் ஆதரவுக்காக கர்ப்பம் தலையணைகளைப் பயன்படுத்துவதையும், வழக்கமான தூக்க அட்டவணையைப் பராமரிப்பதையும் பரிந்துரைக்கிறார்.",
    emergency: "நீங்கள் கடுமையான வலி, கனமான இரத்தப்போக்கு அனுபவித்தால், அல்லது இது அவசரமானது என்று நம்பினால், தயவுசெய்து அவசர சேவைகளை உடனடியாக அழைக்கவும் அல்லது டாக்டர் தீபா தியாகராஜனின் அவசர தொலைபேசி எண்ணைத் தொடர்பு கொள்ளவும்.",
    default: "உங்கள் செய்திக்கு நன்றி. உங்கள் கர்ப்பகால பராமரிப்பைப் பற்றி வேறு ஏதாவது தெரிந்து கொள்ள விரும்புகிறீர்களா? குறிப்பிட்ட மருத்துவ ஆலோசனைக்கு, உங்கள் அடுத்த சந்திப்பின் போது டாக்டர் தீபா தியாகராஜன் உங்கள் கவலைகளை சந்தோஷமாக நிவர்த்தி செய்வார்."
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
    
    // Find relevant response or use default based on current language
    setTimeout(() => {
      setIsTyping(false);
      const lowerInput = input.toLowerCase();
      
      const mockResponses = language === 'en' ? mockResponsesEn : mockResponsesTa;
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
