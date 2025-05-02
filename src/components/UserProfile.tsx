
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';

const UserProfile: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <User className="h-5 w-5 text-care" />
          Your Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Name:</span>
            <span className="font-medium">Angela Wilson</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Age:</span>
            <span className="font-medium">29 years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Current Week:</span>
            <span className="font-medium text-care-text">Week 24</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Due Date:</span>
            <span className="font-medium flex items-center gap-1">
              <Calendar className="h-4 w-4 text-care" />
              August 15, 2025
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Next Appointment:</span>
            <span className="font-medium">June 5, 2025</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
