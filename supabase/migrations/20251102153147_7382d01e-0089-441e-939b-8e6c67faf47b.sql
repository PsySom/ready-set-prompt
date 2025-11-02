-- Create activity templates table
create table activity_templates (
  id uuid default extensions.uuid_generate_v4() primary key,
  name text not null,
  name_en text not null,
  name_fr text not null,
  description text,
  category activity_category not null,
  impact_type activity_impact not null,
  default_duration_minutes integer,
  emoji text not null,
  is_system boolean default true,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table activity_templates enable row level security;

-- Policy: Templates are viewable by everyone
create policy "Templates are viewable by everyone"
  on activity_templates for select
  using (true);

-- Seed data with activity templates
insert into activity_templates (name, name_en, name_fr, category, impact_type, default_duration_minutes, emoji) values
-- Sleep & Rest
('8 часов сна', '8 hours sleep', '8 heures de sommeil', 'sleep', 'restorative', 480, '💤'),
('Вечерняя рутина', 'Evening routine', 'Routine du soir', 'sleep', 'restorative', 30, '🛀'),
('Дневной отдых', 'Afternoon rest', 'Repos après-midi', 'leisure', 'restorative', 15, '🧘'),

-- Nutrition & Hydration
('Здоровый завтрак', 'Healthy breakfast', 'Petit-déjeuner sain', 'nutrition', 'neutral', 30, '🥗'),
('Обед', 'Lunch', 'Déjeuner', 'nutrition', 'neutral', 45, '🍽️'),
('Ужин', 'Dinner', 'Dîner', 'nutrition', 'neutral', 45, '🍴'),
('Выпить 2 литра воды', 'Drink 2L water', 'Boire 2L d''eau', 'hydration', 'neutral', 0, '💧'),

-- Exercise
('Утренняя зарядка', 'Morning exercise', 'Exercice matinal', 'exercise', 'mixed', 10, '🏃'),
('Прогулка 30 минут', '30 min walk', 'Marche 30 min', 'exercise', 'restorative', 30, '🚶'),
('Тренировка', 'Workout', 'Entraînement', 'exercise', 'mixed', 45, '🏋️'),

-- Practices
('Медитация 10 минут', '10 min meditation', '10 min méditation', 'practice', 'restorative', 10, '🧘'),
('Дыхательное упражнение', 'Breathing exercise', 'Exercice de respiration', 'practice', 'restorative', 5, '🫁'),
('Утренняя рефлексия', 'Morning reflection', 'Réflexion matinale', 'reflection', 'neutral', 10, '📝'),
('Вечерняя рефлексия', 'Evening reflection', 'Réflexion du soir', 'reflection', 'neutral', 10, '📝'),

-- Mindfulness
('Заполнить трекеры', 'Fill trackers', 'Remplir trackers', 'reflection', 'neutral', 5, '📊'),
('Упражнение на заземление', 'Grounding exercise', 'Exercice d''ancrage', 'practice', 'restorative', 10, '✍️'),
('Почитать книгу', 'Read a book', 'Lire un livre', 'hobby', 'restorative', 30, '📖'),

-- Creative & Leisure
('Творчество 30 минут', '30 min creativity', '30 min créativité', 'hobby', 'restorative', 30, '🎨'),
('Послушать музыку', 'Listen to music', 'Écouter de la musique', 'leisure', 'restorative', 20, '🎵');