
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const ApiKeySettings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
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
          <Button onClick={handleSave} className="w-full">
            {t('saveApiKey')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeySettings;
