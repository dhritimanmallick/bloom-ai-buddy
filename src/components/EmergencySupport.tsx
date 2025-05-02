
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const EmergencySupport: React.FC = () => {
  return (
    <Card className="border-care-emergency">
      <CardHeader className="pb-2 bg-red-50 rounded-t-lg">
        <CardTitle className="text-lg font-medium flex items-center gap-2 text-care-emergency">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-care-emergency">
            <path d="M10.24 3.957l-8.422 14.06A1.989 1.989 0 0 0 3.518 21h16.845a1.989 1.989 0 0 0 1.7-2.983l-8.423-14.06a1.989 1.989 0 0 0-3.4 0z"></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
          Emergency Support
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm mb-4">For urgent medical assistance or if you experience:</p>
        <ul className="list-disc ml-5 text-sm mb-4 space-y-1">
          <li>Severe abdominal pain</li>
          <li>Heavy bleeding</li>
          <li>Severe headache with vision changes</li>
          <li>Reduced or no fetal movement</li>
          <li>Water breaking before 37 weeks</li>
        </ul>
        <Button className="w-full bg-care-emergency hover:bg-red-600 mb-2 flex items-center justify-center gap-2">
          <Phone className="h-4 w-4" />
          Call Emergency Services
        </Button>
        <Button variant="outline" className="w-full border-care-emergency text-care-emergency hover:bg-red-50">
          Contact Your Doctor
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmergencySupport;
