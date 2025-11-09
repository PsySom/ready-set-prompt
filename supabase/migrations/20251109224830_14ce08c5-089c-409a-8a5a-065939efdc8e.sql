-- Add localization fields for exercises table

-- Add Russian name field
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS name_ru TEXT;

-- Add localized description fields
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS description_ru TEXT;
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS description_fr TEXT;

-- Add localized effects fields (arrays)
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS effects_en TEXT[];
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS effects_ru TEXT[];
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS effects_fr TEXT[];

-- Add localized instructions fields (jsonb)
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS instructions_en JSONB;
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS instructions_ru JSONB;
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS instructions_fr JSONB;

-- Migrate existing data to language-specific fields
UPDATE exercises SET 
  description_en = description,
  effects_en = effects,
  instructions_en = instructions
WHERE description_en IS NULL;

-- Update existing name_ru with current name field (assuming it's Russian)
UPDATE exercises SET name_ru = name WHERE name_ru IS NULL;