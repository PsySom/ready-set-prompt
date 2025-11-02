import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useTranslation } from 'react-i18next';

interface SatisfactionSlidersProps {
  processValue: number;
  resultValue: number;
  onProcessChange: (value: number) => void;
  onResultChange: (value: number) => void;
}

const SatisfactionSliders = ({
  processValue,
  resultValue,
  onProcessChange,
  onResultChange,
}: SatisfactionSlidersProps) => {
  const { t } = useTranslation();
  
  const getEmoji = (val: number) => {
    if (val <= 2) return '😔';
    if (val <= 4) return '😐';
    if (val <= 6) return '🙂';
    if (val <= 8) return '😊';
    return '😃';
  };

  return (
    <div className="space-y-6">
      {/* Process Satisfaction */}
      <div className="space-y-4">
        <div>
          <Label className="text-base font-semibold">{t('trackers.processSatisfaction')}</Label>
          <p className="text-xs text-muted-foreground mt-1">{t('trackers.satisfactionLabels.processQuestion')}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl">{getEmoji(processValue)}</span>
          <span className="text-sm text-muted-foreground">{processValue}/10</span>
        </div>

        <Slider
          min={0}
          max={10}
          step={1}
          value={[processValue]}
          onValueChange={([val]) => onProcessChange(val)}
          className="py-4"
        />
      </div>

      {/* Result Satisfaction */}
      <div className="space-y-4">
        <div>
          <Label className="text-base font-semibold">{t('trackers.resultSatisfaction')}</Label>
          <p className="text-xs text-muted-foreground mt-1">{t('trackers.satisfactionLabels.resultQuestion')}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl">{getEmoji(resultValue)}</span>
          <span className="text-sm text-muted-foreground">{resultValue}/10</span>
        </div>

        <Slider
          min={0}
          max={10}
          step={1}
          value={[resultValue]}
          onValueChange={([val]) => onResultChange(val)}
          className="py-4"
        />
      </div>
    </div>
  );
};

export default SatisfactionSliders;
