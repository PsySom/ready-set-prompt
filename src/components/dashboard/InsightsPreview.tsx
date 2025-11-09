import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const InsightsPreview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [recommendationCount, setRecommendationCount] = useState(0);
  const [topRecommendation, setTopRecommendation] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchRecommendations();
    }
  }, [user]);

  const fetchRecommendations = async () => {
    try {
      const { data, error } = await supabase
        .from('user_recommendations')
        .select(`
          *,
          activity_templates (name, emoji)
        `)
        .eq('user_id', user?.id)
        .is('accepted', null)
        .eq('dismissed', false)
        .order('priority', { ascending: true })
        .limit(1);

      if (error) throw error;

      setRecommendationCount(data?.length || 0);
      if (data && data.length > 0) {
        setTopRecommendation(data[0]);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  if (recommendationCount === 0 || !topRecommendation) return null;

  const isPriority = topRecommendation.priority === 1;

  return (
    <Card className={`p-lg bg-gradient-to-br medium-transition ease-out-expo hover:shadow-lg hover:scale-[1.01] animate-fade-in-scale ${
      isPriority 
        ? 'from-destructive/5 to-warning/5 border-destructive/20' 
        : 'from-primary/5 to-secondary/5 border-primary/20'
    }`}>
      <div className="flex items-start gap-md">
        <div className={`p-sm rounded-lg medium-transition spring-bounce hover:scale-110 ${
          isPriority ? 'bg-destructive/10' : 'bg-primary/10'
        }`}>
          {isPriority ? (
            <AlertCircle className={`h-5 w-5 ${isPriority ? 'text-destructive' : 'text-primary'}`} />
          ) : (
            <Sparkles className="h-5 w-5 text-primary" />
          )}
        </div>

        <div className="flex-1 space-y-sm">
          <div className="flex items-center gap-sm">
            <span className="text-2xl medium-transition spring-smooth hover:scale-110">{topRecommendation.activity_templates.emoji}</span>
            <h3 className="font-semibold text-foreground">
              {recommendationCount} {recommendationCount === 1 ? t('dashboard.insightsPreview.recommendation') : t('dashboard.insightsPreview.recommendations')} {t('dashboard.insightsPreview.forYou')}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {topRecommendation.reason}: {topRecommendation.activity_templates.name}
          </p>
          
          <div className="flex gap-sm pt-sm">
            <Button size="sm" onClick={() => navigate('/recommendations')} className="medium-transition spring-bounce hover:scale-105">
              {t('dashboard.insightsPreview.viewRecommendations')}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default InsightsPreview;
