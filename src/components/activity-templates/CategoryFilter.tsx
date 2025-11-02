import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { value: 'all', label: 'All', emoji: '📋' },
  { value: 'sleep', label: 'Sleep', emoji: '🛏️' },
  { value: 'nutrition', label: 'Nutrition', emoji: '🍽️' },
  { value: 'hydration', label: 'Hydration', emoji: '💧' },
  { value: 'exercise', label: 'Exercise', emoji: '🏃' },
  { value: 'hobby', label: 'Hobby', emoji: '🎨' },
  { value: 'work', label: 'Work', emoji: '💼' },
  { value: 'social', label: 'Social', emoji: '👥' },
  { value: 'practice', label: 'Practice', emoji: '🧘' },
  { value: 'health', label: 'Health', emoji: '🩺' },
  { value: 'reflection', label: 'Reflection', emoji: '📝' },
  { value: 'leisure', label: 'Leisure', emoji: '🎮' },
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 pb-2">
        {categories.map((cat) => (
          <Badge
            key={cat.value}
            variant={selectedCategory === cat.value ? 'default' : 'outline'}
            className="cursor-pointer whitespace-nowrap px-3 py-1.5"
            onClick={() => onCategoryChange(cat.value)}
          >
            <span className="mr-1">{cat.emoji}</span>
            {cat.label}
          </Badge>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CategoryFilter;
