-- Seed categories
insert into public.categories (name, slug, description, icon, color, sort_order) values
  ('Confidence', 'confidence', 'Build unshakeable self-belief', '💪', '#F59E0B', 1),
  ('Self-Love', 'self-love', 'Cultivate compassion for yourself', '❤️', '#EC4899', 2),
  ('Anxiety Relief', 'anxiety', 'Calm your mind and find peace', '🌊', '#3B82F6', 3),
  ('Motivation', 'motivation', 'Fuel your drive and ambition', '🔥', '#EF4444', 4),
  ('Gratitude', 'gratitude', 'Appreciate the good in your life', '🙏', '#10B981', 5),
  ('Success', 'success', 'Attract achievement and abundance', '🏆', '#8B5CF6', 6),
  ('Relationships', 'relationships', 'Nurture connection and love', '🤝', '#F472B6', 7),
  ('Health', 'health', 'Honor your body and energy', '🌿', '#22C55E', 8),
  ('Mindfulness', 'mindfulness', 'Stay present and centered', '🧘', '#06B6D4', 9),
  ('Resilience', 'resilience', 'Bounce back stronger', '🛡️', '#6366F1', 10);

-- Seed system affirmations (sample set - expand later)
insert into public.affirmations (content, category_id, is_system, language, tags) 
select content, c.id, true, 'en', tags
from (values
  -- Confidence
  ('I am confident in my abilities and trust myself completely.', 'confidence', array['confidence', 'self-belief']),
  ('I am worthy of success and I claim it now.', 'confidence', array['confidence', 'success']),
  ('I speak with clarity and my voice matters.', 'confidence', array['confidence', 'communication']),
  ('I am becoming more confident every single day.', 'confidence', array['confidence', 'growth']),
  ('I trust my intuition and make decisions with ease.', 'confidence', array['confidence', 'intuition']),

  -- Self-Love
  ('I am enough exactly as I am right now.', 'self-love', array['self-love', 'acceptance']),
  ('I treat myself with the same kindness I give others.', 'self-love', array['self-love', 'kindness']),
  ('I am worthy of love, respect, and happiness.', 'self-love', array['self-love', 'worth']),
  ('I forgive myself and release what no longer serves me.', 'self-love', array['self-love', 'forgiveness']),
  ('My body is my home and I care for it with love.', 'self-love', array['self-love', 'body']),

  -- Anxiety
  ('I am safe in this moment. I breathe in calm and exhale tension.', 'anxiety', array['anxiety', 'calm']),
  ('I release worry and choose peace instead.', 'anxiety', array['anxiety', 'peace']),
  ('My thoughts do not control me. I control my thoughts.', 'anxiety', array['anxiety', 'mindset']),
  ('I am grounded, centered, and at ease.', 'anxiety', array['anxiety', 'grounding']),
  ('This feeling is temporary. I am resilient and strong.', 'anxiety', array['anxiety', 'resilience']),

  -- Motivation
  ('I take consistent action toward my goals every day.', 'motivation', array['motivation', 'action']),
  ('I am focused, disciplined, and unstoppable.', 'motivation', array['motivation', 'discipline']),
  ('Every small step I take moves me closer to my dreams.', 'motivation', array['motivation', 'progress']),
  ('I have the energy and drive to achieve anything I set my mind to.', 'motivation', array['motivation', 'energy']),
  ('I show up for myself even when it feels hard.', 'motivation', array['motivation', 'consistency']),

  -- Gratitude
  ('I am grateful for all the abundance already in my life.', 'gratitude', array['gratitude', 'abundance']),
  ('I notice and appreciate the small joys around me.', 'gratitude', array['gratitude', 'presence']),
  ('Thank you for this day and all the opportunities it holds.', 'gratitude', array['gratitude', 'morning']),
  ('I am surrounded by love and support.', 'gratitude', array['gratitude', 'connection']),
  ('My life is full of blessings, and I recognize them daily.', 'gratitude', array['gratitude', 'awareness']),

  -- Success
  ('I am creating the life I desire with every choice I make.', 'success', array['success', 'creation']),
  ('Opportunities flow to me easily and frequently.', 'success', array['success', 'abundance']),
  ('I am successful in all areas of my life.', 'success', array['success', 'holistic']),
  ('My work creates value and impact in the world.', 'success', array['success', 'purpose']),
  ('I attract success by being my authentic self.', 'success', array['success', 'authenticity']),

  -- Relationships
  ('I attract healthy, loving, and supportive relationships.', 'relationships', array['relationships', 'love']),
  ('I communicate openly and listen with compassion.', 'relationships', array['relationships', 'communication']),
  ('I am a source of love and positivity for those around me.', 'relationships', array['relationships', 'giving']),
  ('I set healthy boundaries with ease and confidence.', 'relationships', array['relationships', 'boundaries']),
  ('My relationships are built on mutual respect and trust.', 'relationships', array['relationships', 'trust']),

  -- Health
  ('I honor my body by nourishing it with good food and movement.', 'health', array['health', 'body']),
  ('I have vibrant energy and excellent health.', 'health', array['health', 'energy']),
  ('I listen to my body and give it what it needs.', 'health', array['health', 'intuition']),
  ('Rest is productive. I allow myself to recover fully.', 'health', array['health', 'rest']),
  ('I am strong, healthy, and full of vitality.', 'health', array['health', 'strength']),

  -- Mindfulness
  ('I am fully present in this moment.', 'mindfulness', array['mindfulness', 'presence']),
  ('I observe my thoughts without judgment.', 'mindfulness', array['mindfulness', 'awareness']),
  ('Peace begins with me, right here, right now.', 'mindfulness', array['mindfulness', 'peace']),
  ('I breathe deeply and return to the present.', 'mindfulness', array['mindfulness', 'breath']),
  ('This moment is enough. I am enough.', 'mindfulness', array['mindfulness', 'acceptance']),

  -- Resilience
  ('I bounce back from challenges stronger than before.', 'resilience', array['resilience', 'growth']),
  ('Setbacks are setups for comebacks. I keep going.', 'resilience', array['resilience', 'persistence']),
  ('I have survived 100% of my difficult days so far.', 'resilience', array['resilience', 'strength']),
  ('I adapt, learn, and grow through every experience.', 'resilience', array['resilience', 'adaptability']),
  ('My inner strength is greater than any obstacle.', 'resilience', array['resilience', 'inner-power'])
) as v(content, cat_slug, tags)
join public.categories c on c.slug = v.cat_slug;
