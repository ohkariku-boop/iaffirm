import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#f5f0eb]">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-[#0c0c0c]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-[15px] font-medium tracking-wide">iAffirm</span>
          <Link
            href="/app"
            className="text-sm text-[#f5f0eb]/70 hover:text-[#f5f0eb] transition-colors"
          >
            Open the app
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-28">
        <p className="text-sm tracking-wide text-[#c4b5a0] mb-8">
          A quiet practice for better days
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-medium leading-[1.15] tracking-tight mb-8">
          The words you speak to yourself matter.
        </h1>
        <p className="text-lg sm:text-xl text-[#f5f0eb]/70 leading-relaxed max-w-xl mb-12">
          iAffirm is a simple space to practice positive self-talk.
          Record affirmations in your own voice. Return to them when you need lifting.
          Build a kinder relationship with your mind — one day at a time.
        </p>
        <Link
          href="/app"
          className="inline-flex items-center gap-2 text-[15px] font-medium border border-[#f5f0eb]/20 px-6 py-3 rounded-full hover:bg-[#f5f0eb] hover:text-[#0c0c0c] transition-colors"
        >
          Begin
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Divider quote */}
      <section className="border-y border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-2xl sm:text-3xl font-medium leading-snug text-[#f5f0eb]/90 max-w-lg mx-auto">
            “I am learning to speak to myself the way I would speak to someone I love.”
          </p>
        </div>
      </section>

      {/* What it offers */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-sm tracking-wide text-[#c4b5a0] mb-12">
          What you’ll find here
        </h2>

        <div className="space-y-16">
          <div>
            <h3 className="text-xl font-medium mb-3">Your voice, not a stranger’s</h3>
            <p className="text-[#f5f0eb]/65 leading-relaxed max-w-lg">
              Hearing an affirmation in your own voice can make it land differently.
              Record the words that feel true for you. Play them back when the day feels heavy.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">Words for the moments that need them</h3>
            <p className="text-[#f5f0eb]/65 leading-relaxed max-w-lg">
              Confidence. Calm. Self-compassion. Motivation. Gratitude.
              Choose what you need today — or write your own.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">A practice that stays gentle</h3>
            <p className="text-[#f5f0eb]/65 leading-relaxed max-w-lg">
              No streaks that shame you. No noise. Just a quiet place to return to
              when you want to lift your own spirit a little.
            </p>
          </div>
        </div>
      </section>

      {/* Soft CTA */}
      <section className="border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-medium mb-6 leading-snug">
            Better days often begin<br />with how we speak to ourselves.
          </h2>
          <p className="text-[#f5f0eb]/60 mb-10 max-w-md mx-auto leading-relaxed">
            Start with one affirmation. See how it feels.
            The web app is ready when you are. Native apps are on the way.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 text-[15px] font-medium bg-[#f5f0eb] text-[#0c0c0c] px-7 py-3.5 rounded-full hover:bg-[#e8e0d5] transition-colors"
          >
            Open iAffirm
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[#f5f0eb]/40">
          <span>iAffirm</span>
          <p>Made for anyone who wants a little more kindness toward themselves.</p>
        </div>
      </footer>
    </div>
  );
}
