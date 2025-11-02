import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import TemplateCard from '@/components/activity-templates/TemplateCard';
import CategoryFilter from '@/components/activity-templates/CategoryFilter';
import TemplateDetailModal from '@/components/activity-templates/TemplateDetailModal';

interface ActivityTemplate {
  id: string;
  name: string;
  name_en: string;
  name_fr: string;
  description: string | null;
  category: string;
  impact_type: string;
  default_duration_minutes: number | null;
  emoji: string;
  is_system: boolean;
}

const ActivityTemplates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<ActivityTemplate | null>(null);

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['activity-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activity_templates')
        .select('*')
        .order('category', { ascending: true })
        .order('name_en', { ascending: true });
      
      if (error) throw error;
      return data as ActivityTemplate[];
    },
  });

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="container max-w-4xl mx-auto p-4 space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Activity Templates</h1>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>

      <div className="container max-w-4xl mx-auto p-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No templates found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onClick={() => setSelectedTemplate(template)}
              />
            ))}
          </div>
        )}
      </div>

      <TemplateDetailModal
        template={selectedTemplate}
        open={selectedTemplate !== null}
        onClose={() => setSelectedTemplate(null)}
      />
    </div>
  );
};

export default ActivityTemplates;
