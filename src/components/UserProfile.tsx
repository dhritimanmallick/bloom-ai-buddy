
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

type PatientData = {
  name: string;
  dob: string;
  dueDate: string;
  currentWeek: string;
};

const UserProfile: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  
  useEffect(() => {
    const storedData = localStorage.getItem('patientData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setPatientData({
        name: parsedData.name,
        dob: parsedData.dob,
        dueDate: parsedData.dueDate,
        currentWeek: parsedData.currentWeek
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!patientData) {
    return <div className="animate-pulse h-[280px] bg-gray-100 rounded-lg"></div>;
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <User className="h-5 w-5 text-care" />
          {t('yourProfile')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t('name')}:</span>
            <span className="font-medium">{patientData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t('age')}:</span>
            <span className="font-medium">
              {patientData.dob ? calculateAge(new Date(patientData.dob)) : '-'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t('currentWeek')}:</span>
            <span className="font-medium text-care-text">Week {patientData.currentWeek}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t('dueDate')}:</span>
            <span className="font-medium flex items-center gap-1">
              <Calendar className="h-4 w-4 text-care" />
              {patientData.dueDate ? format(new Date(patientData.dueDate), 'MMMM d, yyyy') : '-'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t('nextAppointment')}:</span>
            <span className="font-medium">June 5, 2025</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to calculate age from date of birth
function calculateAge(dob: Date): string {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  
  return `${age} years`;
}

export default UserProfile;
