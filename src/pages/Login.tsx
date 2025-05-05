
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type PatientData = {
  name: string;
  dob: Date | undefined;
  dueDate: Date | undefined;
  currentWeek: string;
};

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [patientData, setPatientData] = useState<PatientData>({
    name: '',
    dob: undefined,
    dueDate: undefined,
    currentWeek: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!patientData.name || !patientData.dob || !patientData.dueDate || !patientData.currentWeek) {
      toast({
        title: t('error'),
        description: t('pleaseCompleteAllFields'),
        variant: "destructive",
      });
      return;
    }

    // Save patient data to localStorage
    localStorage.setItem('patientData', JSON.stringify(patientData));
    
    // Show success message
    toast({
      title: t('success'),
      description: t('loginSuccessful'),
    });

    // Navigate to home page
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-care-text">
            {t('patientLogin')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('name')}</Label>
              <Input 
                id="name"
                name="name"
                value={patientData.name}
                onChange={handleInputChange}
                placeholder={t('enterYourName')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dob">{t('dateOfBirth')}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="dob"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !patientData.dob && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {patientData.dob ? format(patientData.dob, "PPP") : <span>{t('selectDate')}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={patientData.dob}
                    onSelect={(date) => setPatientData(prev => ({ ...prev, dob: date }))}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueDate">{t('dueDate')}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="dueDate"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !patientData.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {patientData.dueDate ? format(patientData.dueDate, "PPP") : <span>{t('selectDate')}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={patientData.dueDate}
                    onSelect={(date) => setPatientData(prev => ({ ...prev, dueDate: date }))}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currentWeek">{t('currentWeek')}</Label>
              <Input 
                id="currentWeek"
                name="currentWeek"
                value={patientData.currentWeek}
                onChange={handleInputChange}
                placeholder={t('enterCurrentWeek')}
              />
            </div>
            
            <Button type="submit" className="w-full bg-care hover:bg-care-dark">
              {t('login')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
