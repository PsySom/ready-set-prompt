import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TodayActivitiesCard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Mock data - будет заменено на реальные данные из Supabase
  const activities = [
    { id: 1, name: 'Morning meditation', time: '09:00', completed: true, impact: 'restorative' },
    { id: 2, name: 'Workout', time: '10:30', completed: false, impact: 'restorative' },
    { id: 3, name: 'Team meeting', time: '14:00', completed: false, impact: 'draining' },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'restorative':
        return 'bg-accent';
      case 'draining':
        return 'bg-destructive';
      case 'neutral':
        return 'bg-muted';
      case 'mixed':
        return 'bg-warning';
      default:
        return 'bg-muted';
    }
  };

  return (
    <Card className="p-lg space-y-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.todayActivitiesCard.title')}</h3>
        <Button size="sm" variant="ghost" onClick={() => navigate('/calendar')}>
          <Plus className="h-4 w-4 mr-1" />
          {t('dashboard.todayActivitiesCard.add')}
        </Button>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-xl">
          <p className="text-muted-foreground">{t('dashboard.todayActivitiesCard.noActivities')}</p>
          <Button variant="outline" className="mt-md" onClick={() => navigate('/calendar')}>
            {t('dashboard.todayActivitiesCard.planYourDay')}
          </Button>
        </div>
      ) : (
        <div className="space-y-sm">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-center gap-sm p-sm rounded-lg bg-muted/50 hover:bg-muted medium-transition ease-out-expo hover:scale-[1.01] animate-slide-in-right cursor-pointer"
              style={{ animationDelay: `calc(${index} * var(--animation-delay-xs))` }}
            >
              <Checkbox checked={activity.completed} />
              <div
                className={`h-2 w-2 rounded-full ${getImpactColor(activity.impact)}`}
              />
              <div className="flex-1">
                <p className={`font-medium ${activity.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {activity.name}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button
        variant="link"
        className="w-full"
        onClick={() => navigate('/calendar')}
      >
        {t('dashboard.todayActivitiesCard.viewAll')}
      </Button>
    </Card>
  );
};

export default TodayActivitiesCard;
