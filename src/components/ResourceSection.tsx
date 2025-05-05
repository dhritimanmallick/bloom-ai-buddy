
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ResourceSection: React.FC = () => {
  const { t } = useLanguage();
  
  const resources = [
    {
      id: 1,
      title: 'Nutrition During Pregnancy',
      description: 'Essential guide to eating well during pregnancy',
      tag: 'Nutrition',
      url: 'https://www.acog.org/womens-health/faqs/nutrition-during-pregnancy',
    },
    {
      id: 2,
      title: 'Understanding Trimester Changes',
      description: 'What to expect in each trimester',
      tag: 'Development',
      url: 'https://www.womenshealth.gov/pregnancy/youre-pregnant-now-what/stages-pregnancy',
    },
    {
      id: 3,
      title: 'Exercise Safety Guidelines',
      description: 'Safe workouts for expectant mothers',
      tag: 'Fitness',
      url: 'https://www.acog.org/womens-health/faqs/exercise-during-pregnancy',
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <FileText className="h-5 w-5 text-care" />
          {t('resources')}
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
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <Button variant="link" className="text-care p-0 h-auto">
                  {t('readMore')}
                </Button>
              </a>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceSection;
