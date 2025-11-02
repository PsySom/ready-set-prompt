import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

interface NotificationSettingsProps {
  profile: any;
  onUpdate: (updates: any) => void;
}

export const NotificationSettings = ({
  profile,
  onUpdate,
}: NotificationSettingsProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {t('settings.notifications.title')}
        </h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">{t('settings.notifications.enable')}</Label>
          <Switch
            id="notifications"
            checked={profile.notifications_enabled}
            onCheckedChange={(checked) =>
              onUpdate({ notifications_enabled: checked })
            }
          />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {t('settings.notifications.trackerReminders')}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>{t('settings.notifications.trackerReminders')}</Label>
            <Switch
              checked={profile.tracker_frequency > 0}
              onCheckedChange={(checked) =>
                onUpdate({ tracker_frequency: checked ? 2 : 0 })
              }
            />
          </div>

          {profile.tracker_frequency > 0 && (
            <>
              <div>
                <Label>{t('settings.notifications.frequency')}</Label>
                <Select
                  value={profile.tracker_frequency?.toString()}
                  onValueChange={(value) =>
                    onUpdate({ tracker_frequency: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 {t('common.time')}</SelectItem>
                    <SelectItem value="2">2 {t('common.times')}</SelectItem>
                    <SelectItem value="3">3 {t('common.times')}</SelectItem>
                    <SelectItem value="4">4 {t('common.times')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>{t('settings.notifications.times')}</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  {(profile.tracker_times || []).join(', ')}
                </p>
              </div>
            </>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {t('journal.morning')} & {t('journal.evening')}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>{t('settings.notifications.morningReflection')}</Label>
              <p className="text-sm text-muted-foreground">
                {profile.morning_reflection_time}
              </p>
            </div>
            <Switch
              checked={profile.morning_reflection_enabled}
              onCheckedChange={(checked) =>
                onUpdate({ morning_reflection_enabled: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>{t('settings.notifications.eveningReflection')}</Label>
              <p className="text-sm text-muted-foreground">
                {profile.evening_reflection_time}
              </p>
            </div>
            <Switch
              checked={profile.evening_reflection_enabled}
              onCheckedChange={(checked) =>
                onUpdate({ evening_reflection_enabled: checked })
              }
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {t('settings.notifications.activityReminders')}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>{t('settings.notifications.activityReminders')}</Label>
            <Switch
              checked={profile.activity_reminders_enabled}
              onCheckedChange={(checked) =>
                onUpdate({ activity_reminders_enabled: checked })
              }
            />
          </div>

          {profile.activity_reminders_enabled && (
            <div>
              <Label>{t('settings.notifications.minutesBefore')}</Label>
              <Select
                value={profile.activity_reminder_minutes?.toString()}
                onValueChange={(value) =>
                  onUpdate({ activity_reminder_minutes: parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 {t('common.minutes')}</SelectItem>
                  <SelectItem value="10">10 {t('common.minutes')}</SelectItem>
                  <SelectItem value="15">15 {t('common.minutes')}</SelectItem>
                  <SelectItem value="30">30 {t('common.minutes')}</SelectItem>
                  <SelectItem value="60">1 {t('common.hour')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
