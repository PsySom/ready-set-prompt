import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Plus, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface TemplateDetailModalProps {
  template: {
    id: string;
    name: string;
    name_en: string;
    description: string | null;
    category: string;
    impact_type: string;
    default_duration_minutes: number | null;
    emoji: string;
  } | null;
  open: boolean;
  onClose: () => void;
}

const getImpactInfo = (impactType: string) => {
  switch (impactType) {
    case 'restorative':
      return {
        label: 'Restorative',
        description: 'Helps you recover energy',
        color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
      };
    case 'draining':
      return {
        label: 'Draining',
        description: 'Requires energy',
        color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
      };
    case 'mixed':
      return {
        label: 'Mixed',
        description: 'Challenging but rewarding',
        color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
      };
    default:
      return {
        label: 'Neutral',
        description: 'Balanced effect',
        color: 'bg-muted text-muted-foreground border-border',
      };
  }
};

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    sleep: 'Sleep & Rest',
    nutrition: 'Nutrition',
    hydration: 'Hydration',
    exercise: 'Exercise',
    hobby: 'Hobby',
    work: 'Work',
    social: 'Social',
    practice: 'Practice',
    health: 'Health',
    reflection: 'Reflection',
    leisure: 'Leisure',
  };
  return labels[category] || category;
};

const TemplateDetailModal = ({ template, open, onClose }: TemplateDetailModalProps) => {
  const { user } = useAuth();

  const handleAddToToday = async () => {
    if (!template || !user) return;

    const now = new Date();
    const today = format(now, 'yyyy-MM-dd');
    const currentTime = format(now, 'HH:mm:ss');

    try {
      const { error } = await supabase.from('activities').insert({
        title: template.name_en,
        category: template.category as any,
        impact_type: template.impact_type as any,
        duration_minutes: template.default_duration_minutes,
        date: today,
        start_time: currentTime,
        status: 'planned' as any,
        template_id: template.id,
        user_id: user.id,
      });

      if (error) throw error;

      toast.success('Activity added to today!');
      onClose();
    } catch (error) {
      console.error('Error adding activity:', error);
      toast.error('Failed to add activity');
    }
  };

  if (!template) return null;

  const impactInfo = getImpactInfo(template.impact_type);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-5xl">{template.emoji}</span>
            <div className="flex-1">
              <DialogTitle className="text-xl">{template.name_en}</DialogTitle>
            </div>
          </div>
          {template.description && (
            <DialogDescription>{template.description}</DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Category</p>
            <Badge variant="outline">{getCategoryLabel(template.category)}</Badge>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Impact Type</p>
            <div className="space-y-2">
              <Badge variant="outline" className={impactInfo.color}>
                {impactInfo.label}
              </Badge>
              <p className="text-sm text-muted-foreground">{impactInfo.description}</p>
            </div>
          </div>

          {template.default_duration_minutes !== null && template.default_duration_minutes > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Default Duration</p>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{template.default_duration_minutes} minutes</span>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button onClick={handleAddToToday} className="flex-1 gap-2">
              <Plus className="h-4 w-4" />
              Add to today
            </Button>
            <Button variant="outline" className="flex-1 gap-2" onClick={onClose}>
              <Calendar className="h-4 w-4" />
              Schedule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDetailModal;
