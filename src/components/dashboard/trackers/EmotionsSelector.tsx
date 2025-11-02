import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface Emotion {
  label: string;
  emoji: string;
  category: 'negative' | 'neutral' | 'positive';
}

interface EmotionsSelectorProps {
  selectedEmotions: Array<{ label: string; intensity: number; category: string }>;
  onChange: (emotions: Array<{ label: string; intensity: number; category: string }>) => void;
}

const EmotionsSelector = ({ selectedEmotions, onChange }: EmotionsSelectorProps) => {
  const { t } = useTranslation();
  
  const emotions: Emotion[] = [
    { label: t('trackers.emotionsList.sad'), emoji: '😢', category: 'negative' },
    { label: t('trackers.emotionsList.anxious'), emoji: '😰', category: 'negative' },
    { label: t('trackers.emotionsList.fearful'), emoji: '😨', category: 'negative' },
    { label: t('trackers.emotionsList.angry'), emoji: '😠', category: 'negative' },
    { label: t('trackers.emotionsList.shame'), emoji: '😳', category: 'negative' },
    { label: t('trackers.emotionsList.guilt'), emoji: '😔', category: 'negative' },
    { label: t('trackers.emotionsList.calm'), emoji: '😌', category: 'neutral' },
    { label: t('trackers.emotionsList.curious'), emoji: '🤔', category: 'neutral' },
    { label: t('trackers.emotionsList.surprised'), emoji: '😮', category: 'neutral' },
    { label: t('trackers.emotionsList.joy'), emoji: '😊', category: 'positive' },
    { label: t('trackers.emotionsList.happy'), emoji: '😄', category: 'positive' },
    { label: t('trackers.emotionsList.inspired'), emoji: '✨', category: 'positive' },
    { label: t('trackers.emotionsList.grateful'), emoji: '🙏', category: 'positive' },
    { label: t('trackers.emotionsList.content'), emoji: '😌', category: 'positive' },
  ];
  
  const toggleEmotion = (emotion: Emotion) => {
    const existing = selectedEmotions.find((e) => e.label === emotion.label);
    
    if (existing) {
      onChange(selectedEmotions.filter((e) => e.label !== emotion.label));
    } else {
      onChange([
        ...selectedEmotions,
        { label: emotion.label, intensity: 5, category: emotion.category },
      ]);
    }
  };

  const updateIntensity = (label: string, intensity: number) => {
    onChange(
      selectedEmotions.map((e) =>
        e.label === label ? { ...e, intensity } : e
      )
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'negative':
        return 'border-destructive text-destructive bg-destructive/10';
      case 'neutral':
        return 'border-secondary text-secondary bg-secondary/10';
      case 'positive':
        return 'border-accent text-accent bg-accent/10';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">{t('trackers.emotions')}</Label>

      <div className="flex flex-wrap gap-2">
        {emotions.map((emotion) => {
          const isSelected = selectedEmotions.some((e) => e.label === emotion.label);
          return (
            <button
              key={emotion.label}
              onClick={() => toggleEmotion(emotion)}
              className={cn(
                'px-3 py-2 rounded-full border-2 smooth-transition text-sm font-medium',
                'hover:scale-105',
                isSelected
                  ? getCategoryColor(emotion.category)
                  : 'border-border bg-card hover:border-primary/50'
              )}
            >
              <span className="mr-1">{emotion.emoji}</span>
              {emotion.label}
            </button>
          );
        })}
      </div>

      {/* Intensity sliders for selected emotions */}
      {selectedEmotions.length > 0 && (
        <div className="space-y-4 pt-4 border-t">
          {selectedEmotions.map((emotion) => (
            <div key={emotion.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{emotion.label}</span>
                <span className="text-sm text-muted-foreground">
                  {t('trackers.intensity')}: {emotion.intensity}/10
                </span>
              </div>
              <Slider
                min={0}
                max={10}
                step={1}
                value={[emotion.intensity]}
                onValueChange={([val]) => updateIntensity(emotion.label, val)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmotionsSelector;
