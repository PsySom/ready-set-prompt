import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useTranslation } from 'react-i18next';

interface EnergySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const EnergySlider = ({ value, onChange }: EnergySliderProps) => {
  const { t } = useTranslation();
  
  const getEmoji = (val: number) => {
    if (val <= -3) return '😴';
    if (val <= -1) return '😪';
    if (val <= 1) return '😐';
    if (val <= 3) return '😊';
    return '⚡';
  };

  const getLabel = (val: number) => {
    if (val <= -3) return t('trackers.energyLabels.veryTired');
    if (val <= -1) return t('trackers.energyLabels.tired');
    if (val <= 1) return t('trackers.energyLabels.neutral');
    if (val <= 3) return t('trackers.energyLabels.energetic');
    return t('trackers.energyLabels.veryEnergetic');
  };

  const getColor = (val: number) => {
    const normalized = (val + 5) / 10;
    const hue = normalized * 120;
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">{t('trackers.energy')}</Label>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getEmoji(value)}</span>
          <span className="text-sm text-muted-foreground">{getLabel(value)}</span>
        </div>
      </div>

      <Slider
        min={-5}
        max={5}
        step={1}
        value={[value]}
        onValueChange={([val]) => onChange(val)}
        className="py-4"
        style={{
          ['--slider-color' as any]: getColor(value),
        }}
      />

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{t('trackers.energyLabels.veryTired')}</span>
        <span>{t('trackers.energyLabels.neutral')}</span>
        <span>{t('trackers.energyLabels.veryEnergetic')}</span>
      </div>
    </div>
  );
};

export default EnergySlider;
