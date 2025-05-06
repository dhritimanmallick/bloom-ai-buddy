
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, CalendarPlus, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

const AppointmentScheduler: React.FC = () => {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showDialog, setShowDialog] = useState(false);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
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

  const availableTimeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleScheduleAppointment = () => {
    setDate(undefined);
    setTimeSlot(null);
    setShowDialog(true);
  };

  const handleConfirmAppointment = () => {
    if (!date || !timeSlot) return;
    
    setShowDialog(false);
    setShowConfirmation(true);
    
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment with Dr. Dheepa Thyagrajan on ${format(date, 'MMMM d, yyyy')} at ${timeSlot} has been confirmed.`,
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-care" />
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

        <Button 
          className="w-full mt-2 bg-care hover:bg-care-dark flex items-center gap-2 justify-center"
          onClick={handleScheduleAppointment}
        >
          <CalendarPlus className="h-4 w-4" />
          {t('scheduleAppointment')}
        </Button>
      </CardContent>

      {/* Appointment Scheduling Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule an Appointment with Dr. Dheepa Thyagrajan</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Select Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => {
                      // Disable weekends and dates in the past
                      const day = date.getDay();
                      return date < new Date() || day === 0 || day === 6;
                    }}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {date && (
              <div className="grid gap-2">
                <label className="text-sm font-medium">Select Time</label>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={timeSlot === slot ? "default" : "outline"}
                      className="text-sm"
                      onClick={() => setTimeSlot(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              className="bg-care hover:bg-care-dark"
              disabled={!date || !timeSlot}
              onClick={handleConfirmAppointment}
            >
              Confirm Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Appointment Confirmed Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex flex-col items-center p-4 text-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Appointment Confirmed!</h2>
            <p className="mb-4">
              {date && timeSlot && `Your appointment with Dr. Dheepa Thyagrajan has been scheduled for ${format(date, 'MMMM d, yyyy')} at ${timeSlot}.`}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              You will receive a confirmation via email shortly.
            </p>
            <Button 
              onClick={() => setShowConfirmation(false)} 
              className="bg-care hover:bg-care-dark"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AppointmentScheduler;
