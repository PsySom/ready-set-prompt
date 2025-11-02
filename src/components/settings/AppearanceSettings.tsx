import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

interface AppearanceSettingsProps {
  profile: any;
  onUpdate: (updates: any) => void;
}

export const AppearanceSettings = ({
  profile,
  onUpdate,
}: AppearanceSettingsProps) => {
  const themeContext = useTheme();
  const { t } = useTranslation();

  const themes = [
    { value: 'light', label: t('settings.appearance.light') },
    { value: 'dark', label: t('settings.appearance.dark') },
    { value: 'auto', label: t('settings.appearance.auto') },
  ];

  const colorSchemes = [
    { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
    { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
    { value: 'green', label: 'Green', color: 'bg-green-500' },
    { value: 'pink', label: 'Pink', color: 'bg-pink-500' },
  ];

  const fontSizes = [
    { value: 'small', label: t('settings.appearance.small') },
    { value: 'medium', label: t('settings.appearance.medium') },
    { value: 'large', label: t('settings.appearance.large') },
    { value: 'extra-large', label: t('settings.appearance.extraLarge') },
  ];

  // Sync profile with theme context on mount
  useEffect(() => {
    if (profile) {
      const theme = profile.theme as 'light' | 'dark' | 'auto' | null;
      if (theme) themeContext.setTheme(theme);
      if (profile.color_scheme) themeContext.setColorScheme(profile.color_scheme);
      if (profile.font_size) themeContext.setFontSize(profile.font_size);
      if (profile.high_contrast !== undefined) themeContext.setHighContrast(profile.high_contrast);
      if (profile.reduce_motion !== undefined) themeContext.setReduceMotion(profile.reduce_motion);
    }
  }, []);

  const handleThemeChange = (value: string) => {
    themeContext.setTheme(value as 'light' | 'dark' | 'auto');
    onUpdate({ theme: value });
  };

  const handleColorSchemeChange = (value: string) => {
    themeContext.setColorScheme(value);
    onUpdate({ color_scheme: value });
  };

  const handleFontSizeChange = (value: string) => {
    themeContext.setFontSize(value);
    onUpdate({ font_size: value });
  };

  const handleHighContrastChange = (checked: boolean) => {
    themeContext.setHighContrast(checked);
    onUpdate({ high_contrast: checked });
  };

  const handleReduceMotionChange = (checked: boolean) => {
    themeContext.setReduceMotion(checked);
    onUpdate({ reduce_motion: checked });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {t('settings.appearance.theme')}
        </h3>
        <RadioGroup
          value={themeContext.theme}
          onValueChange={handleThemeChange}
        >
          {themes.map((theme) => (
            <div key={theme.value} className="flex items-center space-x-2">
              <RadioGroupItem value={theme.value} id={theme.value} />
              <Label htmlFor={theme.value}>{theme.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {t('settings.appearance.colorScheme')}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {colorSchemes.map((scheme) => (
            <button
              key={scheme.value}
              onClick={() => handleColorSchemeChange(scheme.value)}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                themeContext.colorScheme === scheme.value
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${scheme.color}`} />
              <span className="font-medium">{scheme.label}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {t('settings.appearance.fontSize')}
        </h3>
        <RadioGroup
          value={themeContext.fontSize}
          onValueChange={handleFontSizeChange}
        >
          {fontSizes.map((size) => (
            <div key={size.value} className="flex items-center space-x-2">
              <RadioGroupItem value={size.value} id={size.value} />
              <Label htmlFor={size.value}>{size.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {t('settings.appearance.accessibility')}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>{t('settings.appearance.highContrast')}</Label>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better visibility
              </p>
            </div>
            <Switch
              checked={themeContext.highContrast}
              onCheckedChange={handleHighContrastChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>{t('settings.appearance.reduceMotion')}</Label>
              <p className="text-sm text-muted-foreground">
                Minimize animations and transitions
              </p>
            </div>
            <Switch
              checked={themeContext.reduceMotion}
              onCheckedChange={handleReduceMotionChange}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
