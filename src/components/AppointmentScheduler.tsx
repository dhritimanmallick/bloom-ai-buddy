
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarPlus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AppointmentScheduler: React.FC = () => {
  const { t } = useLanguage();
  
  const upcomingAppointments = [
    {
      id: 1,
      date: 'June 5, 2025',
      time: '10:30 AM',
      doctor: 'Dr. Dheepa Thyagrajan',
      type: 'Regular Checkup',
    },
    {
      id: 2,
      date: 'July 10, 2025',
      time: '11:00 AM',
      doctor: 'Dr. Dheepa Thyagrajan',
      type: 'Ultrasound',
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Calendar className="h-5 w-5 text-care" />
          {t('yourAppointments')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingAppointments.map((appointment) => (
          <div key={appointment.id} className="mb-4 p-3 bg-care-light rounded-lg">
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium">{appointment.type}</span>
              <span className="text-xs bg-care text-white px-2 py-0.5 rounded-full">
                {appointment.date}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {appointment.time} with {appointment.doctor}
            </div>
          </div>
        ))}

        <Button className="w-full mt-2 bg-care hover:bg-care-dark flex items-center gap-2 justify-center">
          <CalendarPlus className="h-4 w-4" />
          {t('scheduleAppointment')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AppointmentScheduler;
