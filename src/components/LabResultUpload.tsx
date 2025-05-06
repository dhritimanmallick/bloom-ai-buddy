
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/components/ui/use-toast';
import { Upload, X } from 'lucide-react';

interface LabResultUploadProps {
  onClose: () => void;
}

const LabResultUpload: React.FC<LabResultUploadProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      // Only accept image files
      const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
      
      if (imageFiles.length !== fileArray.length) {
        toast({
          title: t('warning'),
          description: t('onlyImagesAllowed'),
          variant: "destructive",
        });
      }
      
      setFiles(prev => [...prev, ...imageFiles]);
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  
  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: t('error'),
        description: t('pleaseSelectFiles'),
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: t('success'),
      description: t('labResultsUploaded'),
    });
    
    setIsUploading(false);
    onClose();
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Lab Results</DialogTitle>
          <DialogDescription>
            Upload your laboratory test results for Dr. Dheepa to review.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="lab-files">Lab Result Images</Label>
            <div 
              className="border-2 border-dashed rounded-md p-6 text-center hover:bg-muted/50 cursor-pointer"
              onClick={() => document.getElementById('lab-files')?.click()}
            >
              <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-1">
                Click or drag and drop to upload lab result images
              </p>
              <p className="text-xs text-muted-foreground">
                Supported formats: JPG, PNG, GIF
              </p>
              <Input 
                id="lab-files" 
                type="file" 
                className="hidden" 
                multiple 
                accept="image/*"
                onChange={handleFileChange} 
              />
            </div>
            
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <Label>Selected Files</Label>
                <div className="max-h-32 overflow-y-auto">
                  {files.map((file, index) => (
                    <div 
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between py-2 px-3 bg-muted rounded-md"
                    >
                      <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleUpload} 
            disabled={isUploading || files.length === 0}
            className="bg-care hover:bg-care-dark"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LabResultUpload;
