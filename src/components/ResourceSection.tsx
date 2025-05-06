
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ResourceSection: React.FC = () => {
  const resources = [
    {
      id: 1,
      title: 'Nutrition During Pregnancy',
      description: 'Essential guide to eating well during pregnancy',
      tag: 'Nutrition',
    },
    {
      id: 2,
      title: 'Understanding Trimester Changes',
      description: 'What to expect in each trimester',
      tag: 'Development',
    },
    {
      id: 3,
      title: 'Exercise Safety Guidelines',
      description: 'Safe workouts for expectant mothers',
      tag: 'Fitness',
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-care">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          Educational Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {resources.map((resource) => (
            <div key={resource.id} className="p-3 border rounded-lg hover:border-care transition-colors">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium">{resource.title}</span>
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                  {resource.tag}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
              <Button variant="link" className="text-care p-0 h-auto">
                Read more
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceSection;
