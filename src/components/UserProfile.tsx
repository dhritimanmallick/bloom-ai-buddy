
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const UserProfile: React.FC = () => {
  const { t } = useLanguage();
  
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
            <span className="font-medium">Adhira M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t('age')}:</span>
            <span className="font-medium">29 years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t('currentWeek')}:</span>
            <span className="font-medium text-care-text">Week 24</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">{t('dueDate')}:</span>
            <span className="font-medium flex items-center gap-1">
              <Calendar className="h-4 w-4 text-care" />
              August 15, 2025
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

export default UserProfile;
