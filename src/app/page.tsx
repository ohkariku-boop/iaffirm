import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function LandingPage() {
  return (
    <div className="min-h-screen landing-atmosphere text-[#2a2825]">
      <header className="sticky top-0 z-50 bg-[#f7f3ed]/85 backdrop-blur-md border-b border-[#e8e2d9]">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
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
        <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-semibold leading-[1.15] tracking-tight mb-8 text-[#2c2a26]">
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


      <section className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-sm tracking-wide text-[#5b8a72] mb-4">
          How & why it works
        </h2>
        <p className="text-[#6b6560] leading-relaxed max-w-lg mb-12">
          A simple practice, grounded in how habits and self-talk form — not in hype.
        </p>
        <div className="space-y-10 max-w-lg">
          <div>
            <h3 className="text-lg font-medium mb-2 text-[#2c2a26]">Your own voice</h3>
            <p className="text-[#6b6560] leading-relaxed">
              The mind learns from what it hears often. Words you speak and hear in your own
              voice can land differently than a stranger’s quote on a screen.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2 text-[#2c2a26]">Short and repeated</h3>
            <p className="text-[#6b6560] leading-relaxed">
              Small, regular practice is how habits form. A few honest lines, returned to often,
              matter more than a long list you never revisit.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2 text-[#2c2a26]">Make it personal</h3>
            <p className="text-[#6b6560] leading-relaxed">
              Lines that feel true are easier to say and easier to believe. If a phrase feels
              false, change it until it fits.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2 text-[#2c2a26]">What this is not</h3>
            <p className="text-[#6b6560] leading-relaxed">
              iAffirm is a gentle self-talk practice, not therapy or medical treatment.
              If you’re struggling, please reach out to a professional or local support.{" "}
              <Link href="/disclaimer" className="text-[#5b8a72] underline underline-offset-2">
                Health disclaimer
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e5dfd5] bg-white/70 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-medium mb-6 leading-snug text-[#2c2a26]">
            Better days often begin<br />with how we speak to ourselves.
          </h2>
          <p className="text-[#6b6560] mb-6 max-w-md mx-auto leading-relaxed">
            Start with one affirmation. See how it feels.
            The web app is ready when you are. Native apps are on the way.
          </p>
          <p className="text-sm text-[#6b6560]/80 mb-10">
            Free to try · Full practice from $3.99/month
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

      <footer className="border-t border-[#e8e2d9] bg-[#f7f3ed]/80">
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8">
            <div className="space-y-3 max-w-xs">
              <Logo />
              <p className="text-sm text-[#6b6560] leading-relaxed">
                A quiet space for kinder self-talk — in your own voice.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div className="space-y-2">
                <p className="font-medium text-[#2a2825]">Product</p>
                <Link href="/app" className="block text-[#6b6560] hover:text-[#2a2825]">
                  Open app
                </Link>
                <Link href="/app" className="block text-[#6b6560] hover:text-[#2a2825]">
                  Full practice
                </Link>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-[#2a2825]">Legal</p>
                <Link href="/privacy" className="block text-[#6b6560] hover:text-[#2a2825]">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-[#6b6560] hover:text-[#2a2825]">
                  Terms of Service
                </Link>
                <Link href="/disclaimer" className="block text-[#6b6560] hover:text-[#2a2825]">
                  Health disclaimer
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-[#e5dfd5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6b6560]">
            <p>© {new Date().getFullYear()} iAffirm. All rights reserved.</p>
            <p>Not a substitute for professional mental health care.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
