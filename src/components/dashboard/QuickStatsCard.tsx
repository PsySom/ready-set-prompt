import { Card } from '@/components/ui/card';
import { Smile, CheckCircle2, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface QuickStatsCardProps {
  entriesCount: number;
}

const QuickStatsCard = ({ entriesCount }: QuickStatsCardProps) => {
  const { t } = useTranslation();
  
  // Mock data - будет заменено на реальные расчеты
  const stats = [
    { label: t('dashboard.quickStats.mood'), value: t('dashboard.quickStats.moodValue'), icon: Smile, color: 'text-primary' },
    { label: t('dashboard.quickStats.activities'), value: '67%', icon: CheckCircle2, color: 'text-accent' },
    { label: t('dashboard.quickStats.streak'), value: `5 ${t('dashboard.quickStats.days')}`, icon: TrendingUp, color: 'text-secondary' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 space-y-2">
          <div className={`p-2 rounded-lg bg-muted/50 w-fit ${stat.color}`}>
            <stat.icon className="h-4 w-4" />
          </div>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
          <p className="text-lg font-bold">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
};

export default QuickStatsCard;
