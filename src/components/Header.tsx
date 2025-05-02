
import React from 'react';
import { Bell, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <header className="border-b sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-care p-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-care-text">Amma அம்மா</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={toggleLanguage} 
            className="flex items-center gap-1"
          >
            <Languages className="h-5 w-5" />
            <span className="hidden sm:inline-block">{t('switchLanguage')}</span>
          </Button>
          
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-care-emergency text-[10px] text-white">2</span>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-care-dark flex items-center justify-center text-white">
              AM
            </div>
            <span className="text-sm font-medium hidden sm:inline-block">Adhira M</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
