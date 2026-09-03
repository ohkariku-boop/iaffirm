import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen landing-atmosphere text-[#2a2825]">
      <header className="sticky top-0 z-50 bg-[#f7f3ed]/85 backdrop-blur-md border-b border-[#e8e2d9]">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-[15px] font-medium tracking-wide">iAffirm</span>
          <Link
            href="/app"
            className="text-sm text-[#6b6560] hover:text-[#2c2a26] transition-colors"
          >
            Open the app
          </Link>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-6 pt-24 pb-28">
        <p className="text-sm tracking-wide text-[#5b8a72] mb-8">
          A quiet practice for better days
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-medium leading-[1.15] tracking-tight mb-8 text-[#2c2a26]">
          The words you speak to yourself matter.
        </h1>
        <p className="text-lg sm:text-xl text-[#6b6560] leading-relaxed max-w-xl mb-12">
          iAffirm is a simple space to practice positive self-talk.
          Record affirmations in your own voice. Return to them when you need lifting.
          Build a kinder relationship with your mind — one day at a time.
        </p>
        <Link
          href="/app"
          className="inline-flex items-center gap-2 text-[15px] font-medium bg-[#5b8a72] text-white px-6 py-3 rounded-full hover:bg-[#4a7a62] transition-colors"
        >
          Begin
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      <section className="border-y border-[#e5dfd5] bg-white/70 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-2xl sm:text-3xl font-medium leading-snug text-[#2c2a26] max-w-lg mx-auto">
            “I am learning to speak to myself the way I would speak to someone I love.”
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-sm tracking-wide text-[#5b8a72] mb-12">
          What you’ll find here
        </h2>

        <div className="space-y-16">
          <div>
            <h3 className="text-xl font-medium mb-3 text-[#2c2a26]">Your voice, not a stranger’s</h3>
            <p className="text-[#6b6560] leading-relaxed max-w-lg">
              Hearing an affirmation in your own voice can make it land differently.
              Record the words that feel true for you. Play them back when the day feels heavy.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3 text-[#2c2a26]">Words for the moments that need them</h3>
            <p className="text-[#6b6560] leading-relaxed max-w-lg">
              Confidence. Calm. Self-compassion. Motivation. Gratitude.
              Choose what you need today — or write your own.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3 text-[#2c2a26]">A practice that stays gentle</h3>
            <p className="text-[#6b6560] leading-relaxed max-w-lg">
              No streaks that shame you. No noise. Just a quiet place to return to
              when you want to lift your own spirit a little.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e5dfd5] bg-white/70 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-medium mb-6 leading-snug text-[#2c2a26]">
            Better days often begin<br />with how we speak to ourselves.
          </h2>
          <p className="text-[#6b6560] mb-10 max-w-md mx-auto leading-relaxed">
            Start with one affirmation. See how it feels.
            The web app is ready when you are. Native apps are on the way.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 text-[15px] font-medium bg-[#5b8a72] text-white px-7 py-3.5 rounded-full hover:bg-[#4a7a62] transition-colors"
          >
            Open iAffirm
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#e8e2d9]">
        <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[#6b6560]">
          <span className="text-[#2c2a26]">iAffirm</span>
          <p>Made for anyone who wants a little more kindness toward themselves.</p>
        </div>
      </footer>
    </div>
  );
}
