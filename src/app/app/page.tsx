"use client";

import { useState, useEffect } from "react";
import { AffirmationCard } from "@/components/AffirmationCard";
import { CategoryPills } from "@/components/CategoryPills";
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { Sparkles, Plus, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { getCategories, getAffirmations } from "@/lib/supabase/data";
import type { Affirmation, Category } from "@/types";

const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Confidence", slug: "confidence", description: null, icon: "🌿", color: "#5b8a72", sort_order: 1 },
  { id: "2", name: "Self-Love", slug: "self-love", description: null, icon: "💗", color: "#c45c7a", sort_order: 2 },
  { id: "3", name: "Calm", slug: "anxiety", description: null, icon: "🌊", color: "#5a8a9e", sort_order: 3 },
  { id: "4", name: "Motivation", slug: "motivation", description: null, icon: "☀️", color: "#c49a5c", sort_order: 4 },
  { id: "5", name: "Gratitude", slug: "gratitude", description: null, icon: "🙏", color: "#7a9e5a", sort_order: 5 },
  { id: "6", name: "Success", slug: "success", description: null, icon: "✨", color: "#8a7ac4", sort_order: 6 },
];

const MOCK_AFFIRMATIONS: Affirmation[] = [
  { id: "a1", content: "I am confident in my abilities and trust myself completely.", category_id: "1", is_system: true, language: "en", tags: [], category: MOCK_CATEGORIES[0] },
  { id: "a2", content: "I am enough exactly as I am right now.", category_id: "2", is_system: true, language: "en", tags: [], category: MOCK_CATEGORIES[1] },
  { id: "a3", content: "I am safe in this moment. I breathe in calm and exhale tension.", category_id: "3", is_system: true, language: "en", tags: [], category: MOCK_CATEGORIES[2] },
  { id: "a4", content: "I take consistent action toward my goals every day.", category_id: "4", is_system: true, language: "en", tags: [], category: MOCK_CATEGORIES[3] },
  { id: "a5", content: "I am grateful for all the abundance already in my life.", category_id: "5", is_system: true, language: "en", tags: [], category: MOCK_CATEGORIES[4] },
  { id: "a6", content: "I am creating the life I desire with every choice I make.", category_id: "6", is_system: true, language: "en", tags: [], category: MOCK_CATEGORIES[5] },
  { id: "a7", content: "I speak with clarity and my voice matters.", category_id: "1", is_system: true, language: "en", tags: [], category: MOCK_CATEGORIES[0] },
  { id: "a8", content: "I treat myself with the same kindness I give others.", category_id: "2", is_system: true, language: "en", tags: [], category: MOCK_CATEGORIES[1] },
];

export default function AppPage() {
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [affirmations, setAffirmations] = useState<Affirmation[]>(MOCK_AFFIRMATIONS);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRecorder, setShowRecorder] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [cats, affs] = await Promise.all([
          getCategories(),
          getAffirmations(selectedCategory),
        ]);
        if (cats.length > 0) {
          setCategories(cats);
          setUsingMock(false);
        }
        if (affs.length > 0) {
          setAffirmations(affs);
          setUsingMock(false);
        }
      } catch {
        // keep mocks
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [selectedCategory]);

  const filtered = selectedCategory
    ? affirmations.filter((a) => a.category?.slug === selectedCategory)
    : affirmations;

  const current = filtered[currentIndex % (filtered.length || 1)] || filtered[0];

  const nextAffirmation = () => {
    if (filtered.length) setCurrentIndex((i) => (i + 1) % filtered.length);
  };

  const handleSaveRecording = async (blob: Blob) => {
    console.log("Recording saved:", blob.size, "bytes");
    setShowRecorder(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-7 h-7 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-medium tracking-tight text-foreground">iAffirm</span>
            {usingMock && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                demo
              </span>
            )}
          </Link>
          <button className="p-2 rounded-full text-muted-foreground hover:bg-muted transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-6">
        <CategoryPills
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {current && (
          <div className="space-y-4">
            <AffirmationCard
              affirmation={current}
              large
              onPractice={() => setShowRecorder(true)}
            />
            <button
              onClick={nextAffirmation}
              className="w-full py-3 rounded-xl bg-white border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
            >
              Next affirmation
            </button>
          </div>
        )}

        <section className="space-y-3 pt-2">
          <h2 className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            More for you
          </h2>
          <div className="grid gap-3">
            {filtered.slice(0, 6).map((a) => (
              <AffirmationCard
                key={a.id}
                affirmation={a}
                onPractice={() => {
                  const idx = filtered.findIndex((x) => x.id === a.id);
                  if (idx >= 0) setCurrentIndex(idx);
                  setShowRecorder(true);
                }}
              />
            ))}
          </div>
        </section>
      </main>

      <nav className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-border">
        <div className="max-w-lg mx-auto px-6 h-14 flex items-center justify-around text-muted-foreground">
          <button className="flex flex-col items-center gap-0.5 text-primary">
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </button>
          <button className="flex flex-col items-center gap-0.5">
            <Plus className="w-5 h-5" />
            <span className="text-[10px]">Create</span>
          </button>
          <button className="flex flex-col items-center gap-0.5">
            <User className="w-5 h-5" />
            <span className="text-[10px]">Profile</span>
          </button>
        </div>
      </nav>

      {showRecorder && current && (
        <VoiceRecorder
          affirmationText={current.content}
          onSave={handleSaveRecording}
          onClose={() => setShowRecorder(false)}
        />
      )}
    </div>
  );
}
