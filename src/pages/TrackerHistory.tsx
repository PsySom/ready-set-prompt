import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Download, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MoodGraph from '@/components/tracker-history/MoodGraph';
import EmotionsDistribution from '@/components/tracker-history/EmotionsDistribution';
import StressAnxietyGraph from '@/components/tracker-history/StressAnxietyGraph';
import EnergyGraph from '@/components/tracker-history/EnergyGraph';
import SatisfactionMetrics from '@/components/tracker-history/SatisfactionMetrics';
import EntriesList from '@/components/tracker-history/EntriesList';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

export type Period = 'day' | 'week' | 'month';

export interface TrackerEntry {
  id: string;
  entry_date: string;
  entry_time: string;
  mood_score: number | null;
  stress_level: number | null;
  anxiety_level: number | null;
  energy_level: number | null;
  process_satisfaction: number | null;
  result_satisfaction: number | null;
  created_at: string;
  emotions?: Array<{
    emotion_label: string;
    intensity: number;
    category: string;
  }>;
}

const TrackerHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [period, setPeriod] = useState<Period>('week');
  const [entries, setEntries] = useState<TrackerEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user, period]);

  const fetchEntries = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const now = new Date();
      let startDate: Date;

      switch (period) {
        case 'day':
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'week':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
      }

      const { data: entriesData, error: entriesError } = await supabase
        .from('tracker_entries')
        .select('*')
        .eq('user_id', user.id)
        .gte('entry_date', startDate.toISOString().split('T')[0])
        .order('entry_date', { ascending: true })
        .order('entry_time', { ascending: true });

      if (entriesError) throw entriesError;

      // Fetch emotions for each entry
      if (entriesData && entriesData.length > 0) {
        const entryIds = entriesData.map((e) => e.id);
        const { data: emotionsData, error: emotionsError } = await supabase
          .from('tracker_emotions')
          .select('*')
          .in('tracker_entry_id', entryIds);

        if (emotionsError) throw emotionsError;

        // Merge emotions with entries
        const entriesWithEmotions = entriesData.map((entry) => ({
          ...entry,
          emotions: emotionsData?.filter((e) => e.tracker_entry_id === entry.id) || [],
        }));

        setEntries(entriesWithEmotions);
      } else {
        setEntries([]);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: t('trackerHistory.loadError'),
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mood-history-${period}-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: t('trackerHistory.exportSuccess'),
      description: t('trackerHistory.exportDescription'),
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 lg:space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-4 lg:space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="default"
              onClick={() => navigate('/dashboard')}
              className="pl-0 hover-scale transition-all"
            >
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              {t('trackerHistory.back')}
            </Button>

            <Button variant="outline" size="default" onClick={handleExport} className="hover-scale transition-all self-start sm:self-auto">
              <Download className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              {t('trackerHistory.export')}
            </Button>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{t('trackerHistory.title')}</h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2">{t('trackerHistory.subtitle')}</p>
          </div>

          {/* Period Selector */}
          <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="day" className="text-sm md:text-base">{t('trackerHistory.periods.day')}</TabsTrigger>
              <TabsTrigger value="week" className="text-sm md:text-base">{t('trackerHistory.periods.week')}</TabsTrigger>
              <TabsTrigger value="month" className="text-sm md:text-base">{t('trackerHistory.periods.month')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        ) : entries.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <div className="text-6xl">📊</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{t('trackerHistory.noEntriesYet')}</h3>
                <p className="text-muted-foreground">{t('trackerHistory.noEntriesDescription')}</p>
              </div>
              <Button onClick={() => navigate('/dashboard')}>{t('trackerHistory.startTracking')}</Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6 lg:space-y-8">
            {/* Mood Graph */}
            <div className="animate-fade-in">
              <MoodGraph entries={entries} period={period} />
            </div>

            {/* Emotions and Stress Grid */}
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
              <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <EmotionsDistribution entries={entries} />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <StressAnxietyGraph entries={entries} period={period} />
              </div>
            </div>

            {/* Energy and Satisfaction Grid */}
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
              <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <EnergyGraph entries={entries} period={period} />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                <SatisfactionMetrics entries={entries} />
              </div>
            </div>

            {/* Entries List */}
            <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
              <EntriesList entries={entries} onEntryDeleted={fetchEntries} />
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default TrackerHistory;
