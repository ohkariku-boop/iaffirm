"use client";

import { useState, useEffect } from "react";
import { AffirmationCard } from "@/components/AffirmationCard";
import { CategoryPills } from "@/components/CategoryPills";
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { PersonalAffirmation } from "@/components/PersonalAffirmation";
import { PremiumModal, type PremiumReason } from "@/components/PremiumModal";
import { LimitBanner } from "@/components/LimitBanner";
import { AboutPractice } from "@/components/AboutPractice";
import { User, Loader2, Heart, Check } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { getCategories, getAffirmations } from "@/lib/supabase/data";
import { usePremium } from "@/hooks/usePremium";
import type { Affirmation, Category } from "@/types";

const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Confidence", slug: "confidence", description: null, icon: "🌿", color: "#4a7c68", sort_order: 1 },
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
  const [showPremium, setShowPremium] = useState(false);
  const [premiumReason, setPremiumReason] = useState<PremiumReason>("general");
  const [practiceText, setPracticeText] = useState<string | null>(null);
  const [saveNudge, setSaveNudge] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(true);

  const premium = usePremium();

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

  const openPremium = (reason: PremiumReason = "general") => {
    setPremiumReason(reason);
    setShowPremium(true);
  };

  const openRecorder = (text?: string) => {
    if (!premium.canRecord) {
      openPremium("recordings");
      return;
    }
    setPracticeText(text || current?.content || null);
    setShowRecorder(true);
  };

  const handleSaveRecording = async (_blob: Blob) => {
    premium.markRecording();
    setShowRecorder(false);
    setPracticeText(null);
    // After save: gentle nudge if free and running low / out
    if (!premium.isPremium) {
      setSaveNudge(true);
      setTimeout(() => setSaveNudge(false), 8000);
    }
  };

  if (loading || !premium.ready) {
    return (
      <div className="min-h-screen flex items-center justify-center app-atmosphere">
        <Loader2 className="w-7 h-7 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col app-atmosphere">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-lg mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo href="/" size="sm" />
            {usingMock && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                demo
              </span>
            )}
            {premium.isPremium && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#fdf0f0] text-[#b85c5c]">
                full practice
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {!premium.isPremium && (
              <button
                onClick={() => openPremium("general")}
                className="flex items-center gap-1 text-xs font-medium text-primary px-2.5 py-1.5 rounded-full bg-[#fdf0f0] hover:bg-[#fce8e8] transition-colors"
              >
                <Heart className="w-3.5 h-3.5 text-[#b85c5c]" />
                Full practice
              </button>
            )}
            <button className="p-2 rounded-full text-muted-foreground hover:bg-muted/80 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-5 py-7 pb-28 space-y-6">
        <CategoryPills
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {!premium.isPremium && (
          <LimitBanner
            recordingsLeft={premium.recordingsLeft}
            aiLeft={premium.aiLeft}
            onUpgrade={() =>
              openPremium(
                premium.recordingsLeft === 0
                  ? "recordings"
                  : premium.aiLeft === 0
                    ? "ai"
                    : "general"
              )
            }
          />
        )}

        {/* Post-save nudge */}
        {saveNudge && !premium.isPremium && (
          <div className="rounded-2xl border border-primary/20 bg-white px-4 py-3 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#e8f0eb] flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">Saved to this session</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {premium.recordingsLeft === 0
                  ? "That was your last free recording. The full practice keeps it going."
                  : premium.recordingsLeft === 1
                    ? "1 free recording left. Upgrade anytime for unlimited."
                    : `Nice. ${premium.recordingsLeft} free recordings left.`}
              </p>
              {(premium.recordingsLeft === 0 || premium.recordingsLeft === 1) && (
                <button
                  onClick={() => openPremium("recordings")}
                  className="mt-2 text-xs font-medium text-primary"
                >
                  See full practice →
                </button>
              )}
            </div>
            <button
              onClick={() => setSaveNudge(false)}
              className="text-xs text-muted-foreground shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {current && (
          <div className="space-y-4">
            <AffirmationCard
              affirmation={current}
              large
              onPractice={() => openRecorder()}
            />
            <button
              onClick={() => {
                if (filtered.length) setCurrentIndex((i) => (i + 1) % filtered.length);
              }}
              className="w-full py-3 rounded-2xl bg-white/80 border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/25 transition-colors"
            >
              Next affirmation
            </button>
          </div>
        )}

        <PersonalAffirmation
          canUseAi={premium.canUseAi}
          aiLeft={premium.aiLeft}
          onNeedPremium={() => openPremium("ai")}
          onPractice={(text) => openRecorder(text)}
          onGenerated={() => premium.markAiGeneration()}
        />

        <section className="space-y-4 pt-1">
          <h2 className="text-[11px] font-medium text-muted-foreground tracking-[0.14em] uppercase">
            More for you
          </h2>
          <div className="grid gap-3">
            {filtered.slice(0, 6).map((a) => (
              <AffirmationCard
                key={a.id}
                affirmation={a}
                onPractice={() => openRecorder(a.content)}
              />
            ))}
          </div>
        </section>
      </main>

      <nav className="sticky bottom-0 bg-white border-t border-border">
        <div className="max-w-lg mx-auto px-8 h-14 flex items-center justify-between text-muted-foreground text-[11px]">
          <button className="text-primary font-medium">Today</button>
          <button className="hover:text-foreground transition-colors">Library</button>
          <button
            onClick={() => setShowAbout(true)}
            className="hover:text-foreground transition-colors"
          >
            You
          </button>
        </div>
      </nav>

      {showAbout && (
        <AboutPractice open={showAbout} onClose={() => setShowAbout(false)} />
      )}

      {showPremium && (
        <PremiumModal
          open={showPremium}
          reason={premiumReason}
          onClose={() => setShowPremium(false)}
          onSubscribe={(plan) => premium.activatePremium(plan)}
        />
      )}

      {showRecorder && practiceText && (
        <VoiceRecorder
          affirmationText={practiceText}
          onSave={handleSaveRecording}
          onClose={() => {
            setShowRecorder(false);
            setPracticeText(null);
          }}
          isPremium={premium.isPremium}
          onUpgrade={() => {
            setShowRecorder(false);
            openPremium("ambient");
          }}
        />
      )}
    </div>
  );
}
