
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const DEFAULT_API_KEY = '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';

const ApiKeySettings: React.FC = () => {
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    } else {
      // If no key is saved, use the default and save it
      localStorage.setItem('openai_api_key', DEFAULT_API_KEY);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey.trim());
      toast({
        title: t('apiKeySaved'),
        description: t('apiKeyUpdatedSuccessfully'),
      });
      setOpen(false);
    } else {
      toast({
        title: t('error'),
        description: t('pleaseEnterValidApiKey'),
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setApiKey(DEFAULT_API_KEY);
    localStorage.setItem('openai_api_key', DEFAULT_API_KEY);
    toast({
      title: t('apiKeyReset'),
      description: t('apiKeyResetToDefault'),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="API Settings">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('apiSettings')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="apiKey">
              OpenAI API Key
            </label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
            />
            <p className="text-sm text-muted-foreground">
              {t('apiKeyExplanation')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">
              {t('saveApiKey')}
            </Button>
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Reset to Default
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeySettings;
