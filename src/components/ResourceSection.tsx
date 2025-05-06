
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ResourceSection: React.FC = () => {
  const { t } = useLanguage();
  
  const resources = {
    nutrition: [
      {
        id: 1,
        title: 'Nutrition During Pregnancy',
        description: 'Essential guide to eating well during pregnancy',
        tag: 'Nutrition',
        url: 'https://www.acog.org/womens-health/faqs/nutrition-during-pregnancy',
      },
      {
        id: 4,
        title: 'Healthy Eating Tips',
        description: 'Simple ways to improve your diet during pregnancy',
        tag: 'Nutrition',
        url: 'https://www.marchofdimes.org/pregnancy/eating-healthy-during-pregnancy',
      },
    ],
    development: [
      {
        id: 2,
        title: 'Understanding Trimester Changes',
        description: 'What to expect in each trimester',
        tag: 'Development',
        url: 'https://www.womenshealth.gov/pregnancy/youre-pregnant-now-what/stages-pregnancy',
      },
      {
        id: 5,
        title: 'Fetal Growth Milestones',
        description: 'Week by week development guide',
        tag: 'Development',
        url: 'https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-care/art-20045302',
      },
    ],
    fitness: [
      {
        id: 3,
        title: 'Exercise Safety Guidelines',
        description: 'Safe workouts for expectant mothers',
        tag: 'Fitness',
        url: 'https://www.acog.org/womens-health/faqs/exercise-during-pregnancy',
      },
      {
        id: 6,
        title: 'Prenatal Yoga Benefits',
        description: 'How yoga can help during pregnancy',
        tag: 'Fitness',
        url: 'https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-yoga/art-20047193',
      },
    ],
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <FileText className="h-5 w-5 text-care" />
          {t('resources')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="nutrition">
          <TabsList className="w-full mb-2">
            <TabsTrigger value="nutrition" className="flex-1">Nutrition</TabsTrigger>
            <TabsTrigger value="development" className="flex-1">Development</TabsTrigger>
            <TabsTrigger value="fitness" className="flex-1">Fitness</TabsTrigger>
          </TabsList>
          
          {Object.entries(resources).map(([category, items]) => (
            <TabsContent key={category} value={category} className="space-y-3 mt-2">
              {items.map((resource) => (
                <div key={resource.id} className="p-3 border rounded-lg hover:border-care transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium">{resource.title}</span>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                      {resource.tag}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-care hover:text-care-dark font-medium text-sm"
                  >
                    <Button variant="link" className="text-care p-0 h-auto flex items-center gap-1">
                      {t('readMore')}
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </a>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResourceSection;
