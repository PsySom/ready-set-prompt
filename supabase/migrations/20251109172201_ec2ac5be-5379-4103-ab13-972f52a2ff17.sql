-- Add exercise_id and test_id to activities table for linking to exercises/tests
ALTER TABLE public.activities 
ADD COLUMN exercise_id UUID REFERENCES public.exercises(id),
ADD COLUMN test_id UUID REFERENCES public.tests(id);

-- Add index for better query performance
CREATE INDEX idx_activities_exercise_id ON public.activities(exercise_id);
CREATE INDEX idx_activities_test_id ON public.activities(test_id);