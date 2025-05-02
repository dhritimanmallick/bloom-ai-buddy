
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t py-6 bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-care p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">
            Amma அம்மா Antenatal Care Assistant &copy; {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:underline">{t('privacyPolicy')}</a>
          <a href="#" className="hover:underline">{t('termsOfService')}</a>
          <a href="#" className="hover:underline">{t('contactSupport')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
