import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mic, Heart, Shield } from "lucide-react";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "iAffirm — Affirmations in your own voice",
  description:
    "The words you speak to yourself shape how you meet the day. iAffirm helps you practice kinder self-talk by recording affirmations in your own voice — private, simple, on your device.",
  openGraph: {
    title: "iAffirm — Affirmations in your own voice",
    description:
      "Practice positive self-talk where it lands deepest: in your own voice. A quiet daily practice for a noisy world.",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen landing-atmosphere text-[#2a2825]">
      <header className="sticky top-0 z-50 bg-[#f7f3ed]/85 backdrop-blur-md border-b border-[#e8e2d9]/80">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-4">
            <Link
              href="/install"
              className="hidden sm:inline text-sm text-[#6b6560] hover:text-[#2c2a26] transition-colors"
            >
              How to install
            </Link>
            <Link
              href="/app"
              className="text-sm font-medium text-[#5b8a72] hover:text-[#4a7a62] transition-colors"
            >
              Open the app
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="landing-hero">
        <div className="max-w-5xl mx-auto w-full px-5 sm:px-6 pt-6 pb-8 sm:pt-8 sm:pb-10">
          <p className="text-xs sm:text-sm font-medium tracking-[0.12em] uppercase text-[#5b8a72] mb-2">
            Self-talk · in your voice
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-[2.85rem] font-semibold leading-[1.12] tracking-tight text-[#2c2a26] max-w-2xl mb-3">
            The most important conversation you have is the one with yourself.
          </h1>
          <p className="text-base sm:text-[1.05rem] text-[#3d3a36]/95 leading-relaxed max-w-xl mb-5">
            In a world that rarely slows down, the way you speak to yourself can steady you —
            or wear you down. iAffirm is a simple practice: choose a true line,{" "}
            <strong className="font-medium text-[#2c2a26]">say it in your own voice</strong>, and
            return to it when you need strength.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 text-sm font-medium bg-[#5b8a72] text-white px-5 py-2.5 rounded-full hover:bg-[#4a7a62] transition-colors shadow-sm"
            >
              Start free trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#why"
              className="text-sm text-[#6b6560] hover:text-[#2c2a26] transition-colors"
            >
              Why this matters
            </Link>
          </div>
        </div>
      </section>

      {/* Tension / why now */}
      <section id="why" className="border-y border-[#e5dfd5]/90 bg-white/55 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-10 sm:py-12">
          <h2 className="text-xs font-medium tracking-[0.12em] uppercase text-[#5b8a72] mb-3">
            Why affirmations matter now
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <p className="text-[15px] sm:text-base text-[#3d3a36] leading-relaxed mb-4">
                We live in a constant stream of news, comparison, deadlines, and noise. It is easy
                for the inner voice to turn harsh — rehearsing worry, self-criticism, and “not
                enough.”
              </p>
              <p className="text-[15px] sm:text-base text-[#3d3a36] leading-relaxed">
                Affirmations are not magic spells. They are{" "}
                <strong className="font-medium text-[#2c2a26]">intentional self-talk</strong>:
                short, honest statements you choose to practice so that kindness and steadiness get
                repetition — the same way stress gets repetition if we leave the mind on autopilot.
              </p>
            </div>
            <div>
              <p className="text-[15px] sm:text-base text-[#3d3a36] leading-relaxed mb-4">
                Research on self-talk and habits suggests that what we repeat shapes what feels
                familiar. A few grounded lines, practiced often, can support calmer focus and a more
                compassionate stance toward yourself — especially on hard days.
              </p>
              <p className="text-[15px] sm:text-base text-[#3d3a36] leading-relaxed">
                That matters for mental wellbeing in this era: not as a cure-all, but as a{" "}
                <strong className="font-medium text-[#2c2a26]">daily skill</strong> you can own —
                quiet, private, and always available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Own voice */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 py-10 sm:py-12">
        <h2 className="text-xs font-medium tracking-[0.12em] uppercase text-[#5b8a72] mb-3">
          Why your own voice is different
        </h2>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#2c2a26] max-w-2xl mb-4 leading-snug">
          Reading a quote is one thing. Hearing yourself say it is another.
        </h3>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          <div className="rounded-2xl border border-[#e5dfd5]/90 bg-white/65 backdrop-blur-sm p-4 sm:p-5">
            <div className="w-9 h-9 rounded-full bg-[#e8f0eb] flex items-center justify-center mb-3">
              <Mic className="w-4 h-4 text-[#5b8a72]" />
            </div>
            <h4 className="text-sm font-semibold text-[#2c2a26] mb-1.5">It lands deeper</h4>
            <p className="text-sm text-[#6b6560] leading-relaxed">
              Your nervous system knows your voice. A line you speak and hear can feel more real
              than text written by a stranger.
            </p>
          </div>
          <div className="rounded-2xl border border-[#e5dfd5]/90 bg-white/65 backdrop-blur-sm p-4 sm:p-5">
            <div className="w-9 h-9 rounded-full bg-[#e8f0eb] flex items-center justify-center mb-3">
              <Heart className="w-4 h-4 text-[#5b8a72]" />
            </div>
            <h4 className="text-sm font-semibold text-[#2c2a26] mb-1.5">It becomes practice</h4>
            <p className="text-sm text-[#6b6560] leading-relaxed">
              Recording takes a moment of presence. Playback is a return visit — the habit that
              turns a nice idea into something you actually use.
            </p>
          </div>
          <div className="rounded-2xl border border-[#e5dfd5]/90 bg-white/65 backdrop-blur-sm p-4 sm:p-5">
            <div className="w-9 h-9 rounded-full bg-[#e8f0eb] flex items-center justify-center mb-3">
              <Shield className="w-4 h-4 text-[#5b8a72]" />
            </div>
            <h4 className="text-sm font-semibold text-[#2c2a26] mb-1.5">It stays yours</h4>
            <p className="text-sm text-[#6b6560] leading-relaxed">
              Your recordings stay on this device. No performance for an audience — just you,
              building a kinder inner voice in private.
            </p>
          </div>
        </div>
      </section>

      {/* How */}
      <section className="border-y border-[#e5dfd5]/90 bg-white/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-10 sm:py-12">
          <h2 className="text-xs font-medium tracking-[0.12em] uppercase text-[#5b8a72] mb-3">
            How iAffirm works
          </h2>
          <ol className="grid sm:grid-cols-3 gap-6 sm:gap-5 list-none p-0 m-0">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5b8a72] text-white text-xs font-semibold">
                1
              </span>
              <div>
                <h4 className="text-sm font-semibold text-[#2c2a26] mb-1">Choose a line</h4>
                <p className="text-sm text-[#6b6560] leading-relaxed">
                  From today’s practice, a category that fits your season, or words you write for
                  yourself.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5b8a72] text-white text-xs font-semibold">
                2
              </span>
              <div>
                <h4 className="text-sm font-semibold text-[#2c2a26] mb-1">Record it</h4>
                <p className="text-sm text-[#6b6560] leading-relaxed">
                  Speak slowly. Let the words be true enough to say out loud — not forced
                  positivity.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5b8a72] text-white text-xs font-semibold">
                3
              </span>
              <div>
                <h4 className="text-sm font-semibold text-[#2c2a26] mb-1">Listen back</h4>
                <p className="text-sm text-[#6b6560] leading-relaxed">
                  Play it when the day gets loud. Optional soft sound under your voice. Return
                  tomorrow.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* What you get + mental health frame */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 py-10 sm:py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
          <div>
            <h2 className="text-xs font-medium tracking-[0.12em] uppercase text-[#5b8a72] mb-3">
              Built for real life
            </h2>
            <h3 className="text-xl font-semibold tracking-tight text-[#2c2a26] mb-3 leading-snug">
              A small practice for a loud age.
            </h3>
            <p className="text-sm text-[#6b6560] leading-relaxed mb-3">
              You do not need an hour of silence. You need a few honest sentences and a way to hear
              them in a voice you trust — yours.
            </p>
            <p className="text-sm text-[#6b6560] leading-relaxed mb-3">
              Practising self-affirmation is one way to interrupt automatic harshness and give your
              mind a steadier script. Used gently and regularly, it can support emotional balance
              alongside sleep, movement, relationships, and professional care when you need it.
            </p>
            <p className="text-xs text-[#6b6560] leading-relaxed">
              iAffirm is a self-talk practice tool — not therapy or medical treatment.{" "}
              <Link href="/disclaimer" className="text-[#5b8a72] underline underline-offset-2">
                Health disclaimer
              </Link>
            </p>
          </div>
          <ul className="space-y-3 text-sm text-[#3d3a36]">
            {[
              "Today’s line — one clear focus for the day",
              "Hundreds of affirmations across life seasons",
              "Record and play back in your own voice",
              "Optional calm sound under playback",
              "Personal lines for what you’re going through",
              "Recordings stay on your device",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-2.5 items-start rounded-xl border border-[#e5dfd5]/90 bg-white/60 px-3.5 py-2.5"
              >
                <span className="mt-0.5 text-[#5b8a72] font-semibold">✓</span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Close */}
      <section className="border-t border-[#e5dfd5]/90 bg-white/55 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-10 sm:py-12 text-center">
          <p className="text-lg sm:text-xl font-medium leading-snug text-[#2c2a26] max-w-xl mx-auto mb-2">
            Better days often begin with how we speak to ourselves.
          </p>
          <p className="text-sm text-[#6b6560] max-w-md mx-auto mb-5 leading-relaxed">
            Start with one line. Hear it in your voice. Build the habit the world rarely teaches —
            talking to yourself with care.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 text-sm font-medium bg-[#5b8a72] text-white px-6 py-2.5 rounded-full hover:bg-[#4a7a62] transition-colors shadow-sm"
          >
            Open iAffirm
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[11px] text-[#6b6560] mt-4">
            Free 10-day Full practice trial · Then from $3.99/month · Web app · Native apps planned
          </p>
        </div>
      </section>

      <footer className="border-t border-[#e8e2d9]/80 bg-[#f7f3ed]/75 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-1.5 max-w-xs">
              <Logo size="sm" />
              <p className="text-xs text-[#6b6560] leading-relaxed">
                Kinder self-talk — in your own voice. Private practice for a noisy world.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              <div className="space-y-1.5">
                <p className="text-[11px] font-medium text-[#2a2825] uppercase tracking-wide">
                  Product
                </p>
                <Link href="/app" className="block text-xs text-[#6b6560] hover:text-[#2a2825]">
                  Open app
                </Link>
                <Link href="/install" className="block text-xs text-[#6b6560] hover:text-[#2a2825]">
                  How to install
                </Link>
              </div>
              <div className="space-y-1.5">
                <p className="text-[11px] font-medium text-[#2a2825] uppercase tracking-wide">
                  Legal
                </p>
                <Link href="/privacy" className="block text-xs text-[#6b6560] hover:text-[#2a2825]">
                  Privacy
                </Link>
                <Link href="/terms" className="block text-xs text-[#6b6560] hover:text-[#2a2825]">
                  Terms
                </Link>
                <Link href="/disclaimer" className="block text-xs text-[#6b6560] hover:text-[#2a2825]">
                  Disclaimer
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[#e5dfd5] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#6b6560]">
            <p>© {new Date().getFullYear()} iAffirm</p>
            <p>Not a substitute for professional mental health care.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
