"use client";

import { useState, useEffect, useMemo } from "react";
import { AffirmationCard } from "@/components/AffirmationCard";
import { CategoryPills } from "@/components/CategoryPills";
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { PersonalAffirmation } from "@/components/PersonalAffirmation";
import { PremiumModal, type PremiumReason } from "@/components/PremiumModal";
import { LimitBanner } from "@/components/LimitBanner";
import { AboutPractice } from "@/components/AboutPractice";
import { LibraryView } from "@/components/LibraryView";
import { ThemePicker } from "@/components/ThemePicker";
import { RemindersPanel } from "@/components/RemindersPanel";
import { Logo } from "@/components/Logo";
import { User, Loader2, Heart, Check, Lock } from "lucide-react";
import { usePremium } from "@/hooks/usePremium";
import { useLibrary } from "@/hooks/useLibrary";
import {
  getAffirmationsForTier,
  getCategoriesForTier,
  ALL_AFFIRMATIONS,
} from "@/lib/content";
import { getTheme, loadThemeId, saveThemeId, type ThemeId } from "@/lib/themes";
import type { Affirmation } from "@/types";

type Tab = "today" | "library" | "you";

export default function AppPage() {
  const [tab, setTab] = useState<Tab>("today");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showRecorder, setShowRecorder] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [premiumReason, setPremiumReason] = useState<PremiumReason>("general");
  const [practiceText, setPracticeText] = useState<string | null>(null);
  const [saveNudge, setSaveNudge] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [themeId, setThemeId] = useState<ThemeId>("sage");
  const [themeReady, setThemeReady] = useState(false);

  const premium = usePremium();
  const library = useLibrary();

  useEffect(() => {
    setThemeId(loadThemeId());
    setThemeReady(true);
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  const theme = getTheme(themeId);

  // If free user had a premium theme stored, fall back
  useEffect(() => {
    if (!premium.ready || !themeReady) return;
    if (!premium.isPremium && theme.premium) {
      setThemeId("sage");
      saveThemeId("sage");
    }
  }, [premium.ready, premium.isPremium, theme.premium, themeReady]);

  const categories = useMemo(
    () => getCategoriesForTier(premium.isPremium),
    [premium.isPremium]
  );

  const affirmations = useMemo(
    () => getAffirmationsForTier(premium.isPremium),
    [premium.isPremium]
  );

  const filtered = selectedCategory
    ? affirmations.filter((a) => a.category?.slug === selectedCategory)
    : affirmations;

  const current = filtered[currentIndex % (filtered.length || 1)] || filtered[0];

  // Reset index when category or tier changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory, premium.isPremium]);

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
    if (practiceText) library.addRecording(practiceText);
    premium.markRecording();
    setShowRecorder(false);
    setPracticeText(null);
    if (!premium.isPremium) {
      setSaveNudge(true);
      setTimeout(() => setSaveNudge(false), 8000);
    }
  };

  const handleThemeSelect = (id: ThemeId) => {
    setThemeId(id);
    saveThemeId(id);
  };

  const lockedCategoryCount = premium.isPremium
    ? 0
    : Math.max(0, 10 - categories.length);

  if (!premium.ready || !library.ready || !themeReady) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: theme.pageBg }}
      >
        <Loader2 className="w-7 h-7 animate-spin" style={{ color: theme.accent }} />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-500"
      style={
        {
          background: theme.pageBg,
          color: theme.text,
          ["--primary" as string]: theme.accent,
          ["--background" as string]: theme.pageBg,
        } as React.CSSProperties
      }
    >
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b"
        style={{
          background: `${theme.pageBg}f2`,
          borderColor: `${theme.accent}18`,
        }}
      >
        <div className="max-w-lg mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo href="/" size="sm" />
            {premium.isPremium && (
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                style={{ background: theme.accentSoft, color: theme.accent }}
              >
                full practice
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {!premium.isPremium && (
              <button
                onClick={() => openPremium("general")}
                className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-full transition-colors"
                style={{ background: "#fdf0f0", color: "#b85c5c" }}
              >
                <Heart className="w-3.5 h-3.5" />
                Full practice
              </button>
            )}
            <button
              onClick={() => setTab("you")}
              className="p-2 rounded-full transition-colors"
              style={{ color: theme.muted }}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-5 py-6 pb-28 space-y-6">
        {tab === "today" && (
          <>
            <CategoryPills
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />

            {!premium.isPremium && lockedCategoryCount > 0 && (
              <button
                onClick={() => openPremium("general")}
                className="w-full flex items-center justify-between gap-2 rounded-2xl border px-4 py-2.5 text-left text-xs"
                style={{
                  borderColor: `${theme.accent}25`,
                  background: theme.accentSoft,
                  color: theme.muted,
                }}
              >
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  {lockedCategoryCount} more categories in full practice
                </span>
                <span style={{ color: theme.accent }} className="font-medium">
                  Unlock
                </span>
              </button>
            )}

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

            {saveNudge && !premium.isPremium && (
              <div
                className="rounded-2xl border px-4 py-3 flex items-start gap-3"
                style={{ borderColor: `${theme.accent}30`, background: "#fff" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: theme.accentSoft }}
                >
                  <Check className="w-4 h-4" style={{ color: theme.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Saved to your library</p>
                  <p className="text-xs mt-0.5" style={{ color: theme.muted }}>
                    {premium.recordingsLeft === 0
                      ? "That was your last free recording."
                      : `${premium.recordingsLeft} free recording${premium.recordingsLeft === 1 ? "" : "s"} left.`}
                  </p>
                  {(premium.recordingsLeft === 0 || premium.recordingsLeft === 1) && (
                    <button
                      onClick={() => openPremium("recordings")}
                      className="mt-2 text-xs font-medium"
                      style={{ color: theme.accent }}
                    >
                      See full practice →
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setSaveNudge(false)}
                  className="text-xs shrink-0"
                  style={{ color: theme.muted }}
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
                  isFavorite={library.isFavorite(current.id)}
                  onFavorite={() => library.toggleFavorite(current.id)}
                  onPractice={() => openRecorder()}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (filtered.length)
                        setCurrentIndex((i) => (i + 1) % filtered.length);
                    }}
                    className="flex-1 py-3 rounded-2xl border text-sm font-medium transition-colors bg-white/80"
                    style={{ borderColor: `${theme.accent}22`, color: theme.muted }}
                  >
                    Next
                  </button>
                  <button
                    onClick={() => openRecorder()}
                    className="flex-1 py-3 rounded-2xl text-sm font-medium text-white transition-opacity hover:opacity-90"
                    style={{ background: theme.accent }}
                  >
                    Record
                  </button>
                </div>
              </div>
            )}

            <PersonalAffirmation
              canUseAi={premium.canUseAi}
              aiLeft={premium.aiLeft}
              onNeedPremium={() => openPremium("ai")}
              onPractice={(text) => {
                library.addCustomLine(text);
                openRecorder(text);
              }}
              onGenerated={() => premium.markAiGeneration()}
            />

            <section className="space-y-4 pt-1">
              <div className="flex items-center justify-between">
                <h2
                  className="text-[11px] font-medium tracking-[0.14em] uppercase"
                  style={{ color: theme.muted }}
                >
                  More in {selectedCategory ? categories.find((c) => c.slug === selectedCategory)?.name : "your library"}
                </h2>
                <span className="text-[11px]" style={{ color: theme.muted }}>
                  {filtered.length} lines
                  {!premium.isPremium && ` · ${ALL_AFFIRMATIONS.length} in full practice`}
                </span>
              </div>
              <div className="grid gap-3">
                {filtered.slice(0, premium.isPremium ? 12 : 6).map((a: Affirmation) => (
                  <AffirmationCard
                    key={a.id}
                    affirmation={a}
                    isFavorite={library.isFavorite(a.id)}
                    onFavorite={() => library.toggleFavorite(a.id)}
                    onPractice={() => openRecorder(a.content)}
                  />
                ))}
              </div>
              {!premium.isPremium && (
                <button
                  onClick={() => openPremium("general")}
                  className="w-full py-3 rounded-2xl border border-dashed text-sm"
                  style={{ borderColor: `${theme.accent}40`, color: theme.accent }}
                >
                  Unlock full library ({ALL_AFFIRMATIONS.length}+ affirmations)
                </button>
              )}
            </section>
          </>
        )}

        {tab === "library" && (
          <LibraryView
            lib={library.lib}
            affirmations={ALL_AFFIRMATIONS}
            isPremium={premium.isPremium}
            onPractice={(text) => openRecorder(text)}
            onRemoveRecording={library.removeRecording}
            onToggleFavorite={library.toggleFavorite}
            onUpgrade={() => openPremium("general")}
          />
        )}

        {tab === "you" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold mb-1">You</h2>
              <p className="text-sm" style={{ color: theme.muted }}>
                {premium.isPremium
                  ? "Full practice is on. Themes, sounds, and the full library are yours."
                  : "Free practice with limits. Upgrade anytime for the full experience."}
              </p>
            </div>

            <ThemePicker
              current={themeId}
              isPremium={premium.isPremium}
              onSelect={handleThemeSelect}
              onNeedPremium={() => openPremium("general")}
            />

            <RemindersPanel
              isPremium={premium.isPremium}
              onNeedPremium={() => openPremium("general")}
              accent={theme.accent}
              muted={theme.muted}
            />

            <div className="rounded-2xl border bg-white px-4 py-4 space-y-3" style={{ borderColor: `${theme.accent}20` }}>
              <p className="text-sm font-medium">Practice status</p>
              <ul className="text-sm space-y-2" style={{ color: theme.muted }}>
                <li>
                  Recordings:{" "}
                  {premium.isPremium
                    ? "Unlimited"
                    : `${premium.usage.recordingsUsed} / 3 used`}
                </li>
                <li>
                  Personal lines:{" "}
                  {premium.isPremium
                    ? "Unlimited"
                    : `${premium.usage.aiGenerationsUsed} / 3 used`}
                </li>
                <li>Favorites: {library.lib.favorites.length}</li>
                <li>Saved practices: {library.lib.recordings.length}</li>
                <li>Library size: {affirmations.length} affirmations available</li>
              </ul>
              {!premium.isPremium && (
                <button
                  onClick={() => openPremium("general")}
                  className="w-full mt-2 py-3 rounded-xl text-sm font-medium text-white"
                  style={{ background: theme.accent }}
                >
                  Unlock full practice
                </button>
              )}
            </div>

            <button
              onClick={() => setShowAbout(true)}
              className="w-full text-left rounded-2xl border bg-white px-4 py-3 text-sm"
              style={{ borderColor: `${theme.accent}20` }}
            >
              How this practice works
            </button>

            {premium.isPremium && (
              <button
                onClick={() => premium.deactivatePremium()}
                className="w-full text-xs text-center"
                style={{ color: theme.muted }}
              >
                Demo: turn off full practice
              </button>
            )}
          </div>
        )}
      </main>

      <nav
        className="sticky bottom-0 border-t bg-white/95 backdrop-blur-md"
        style={{ borderColor: `${theme.accent}18` }}
      >
        <div className="max-w-lg mx-auto px-6 h-14 flex items-center justify-between text-[11px]">
          {(
            [
              ["today", "Today"],
              ["library", "Library"],
              ["you", "You"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="font-medium transition-colors px-3 py-2"
              style={{
                color: tab === id ? theme.accent : theme.muted,
              }}
            >
              {label}
            </button>
          ))}
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
