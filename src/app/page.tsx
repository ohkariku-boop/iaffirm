import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function LandingPage() {
  return (
    <div className="min-h-screen landing-atmosphere text-[#2a2825]">
      <header className="sticky top-0 z-50 bg-[#f7f3ed]/75 backdrop-blur-md border-b border-[#e8e2d9]/70">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
          <Logo size="sm" />
          <Link
            href="/app"
            className="text-sm text-[#6b6560] hover:text-[#2c2a26] transition-colors"
          >
            Open the app
          </Link>
        </div>
      </header>

      <section className="landing-hero landing-hero--tight">
        <div className="flex flex-col max-w-5xl mx-auto w-full px-5 sm:px-6 pt-8 pb-8 sm:pt-10 sm:pb-10">
          <p className="text-xs sm:text-sm tracking-wide text-[#5b8a72] mb-2">
            A quiet practice for better days
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-semibold leading-[1.15] tracking-tight mb-3 text-[#2c2a26] max-w-2xl">
            The words you speak to yourself matter.
          </h1>
          <p className="text-base sm:text-lg text-[#3d3a36]/90 leading-relaxed max-w-xl mb-5">
            Practice positive self-talk in your own voice. Record a line, play it back when you
            need lifting — one day at a time.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 text-sm font-medium bg-[#5b8a72] text-white px-5 py-2.5 rounded-full hover:bg-[#4a7a62] transition-colors shadow-sm"
            >
              Begin
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/install"
              className="text-sm text-[#6b6560] hover:text-[#2c2a26] transition-colors"
            >
              Add to home screen
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e5dfd5]/80 bg-white/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-8 sm:py-10">
          <p className="text-lg sm:text-xl font-medium leading-snug text-[#2c2a26] max-w-2xl mx-auto text-center">
            “I am learning to speak to myself the way I would speak to someone I love.”
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-6 py-12 sm:py-14">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
          <div>
            <h2 className="text-xs tracking-wide text-[#5b8a72] uppercase mb-5">
              What you’ll find here
            </h2>
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-medium mb-1 text-[#2c2a26]">Your voice, not a stranger’s</h3>
                <p className="text-sm text-[#6b6560] leading-relaxed">
                  Record lines that feel true. Play them back when the day feels heavy.
                </p>
              </div>
              <div>
                <h3 className="text-base font-medium mb-1 text-[#2c2a26]">Words for the moment</h3>
                <p className="text-sm text-[#6b6560] leading-relaxed">
                  Confidence, calm, self-compassion, motivation, gratitude — or write your own.
                </p>
              </div>
              <div>
                <h3 className="text-base font-medium mb-1 text-[#2c2a26]">A gentle practice</h3>
                <p className="text-sm text-[#6b6560] leading-relaxed">
                  No shame streaks. A quiet place to return when you want a little lift.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xs tracking-wide text-[#5b8a72] uppercase mb-2">
              How & why it works
            </h2>
            <p className="text-sm text-[#6b6560] leading-relaxed mb-5">
              Simple practice, grounded in habit and self-talk — not hype.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-medium mb-1 text-[#2c2a26]">Your own voice</h3>
                <p className="text-sm text-[#6b6560] leading-relaxed">
                  The mind learns from what it hears often. Your voice lands differently than a quote on a screen.
                </p>
              </div>
              <div>
                <h3 className="text-base font-medium mb-1 text-[#2c2a26]">Short and repeated</h3>
                <p className="text-sm text-[#6b6560] leading-relaxed">
                  A few honest lines, returned to often, beat a long list you never revisit.
                </p>
              </div>
              <div>
                <h3 className="text-base font-medium mb-1 text-[#2c2a26]">Make it personal</h3>
                <p className="text-sm text-[#6b6560] leading-relaxed">
                  If a phrase feels false, change it until it fits.
                </p>
              </div>
              <div>
                <h3 className="text-base font-medium mb-1 text-[#2c2a26]">What this is not</h3>
                <p className="text-sm text-[#6b6560] leading-relaxed">
                  Not therapy or medical treatment.{" "}
                  <Link href="/disclaimer" className="text-[#5b8a72] underline underline-offset-2">
                    Health disclaimer
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e5dfd5]/80 bg-white/45 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xs tracking-wide text-[#5b8a72] uppercase mb-1">
                Home screen
              </h2>
              <p className="text-sm text-[#6b6560]">
                Add iAffirm like an app. Recordings stay on this device.
              </p>
            </div>
            <Link
              href="/install"
              className="text-sm font-medium text-[#5b8a72] hover:underline underline-offset-2 shrink-0"
            >
              Full guide →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#e5dfd5]/90 bg-white/65 backdrop-blur-sm px-4 py-3">
              <p className="text-sm font-medium text-[#2c2a26] mb-1.5">iPhone · Safari</p>
              <p className="text-xs text-[#6b6560] leading-relaxed">
                Share → Add to Home Screen → Add
              </p>
            </div>
            <div className="rounded-xl border border-[#e5dfd5]/90 bg-white/65 backdrop-blur-sm px-4 py-3">
              <p className="text-sm font-medium text-[#2c2a26] mb-1.5">Android · Chrome</p>
              <p className="text-xs text-[#6b6560] leading-relaxed">
                Menu ⋮ → Install app or Add to Home screen
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e5dfd5]">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-12 sm:py-14 text-center">
          <h2 className="text-xl sm:text-2xl font-medium mb-3 leading-snug text-[#2c2a26]">
            Better days often begin with how we speak to ourselves.
          </h2>
          <p className="text-sm text-[#6b6560] mb-2 max-w-md mx-auto leading-relaxed">
            Start with one affirmation. Native apps are on the way.
          </p>
          <p className="text-xs text-[#6b6560]/90 mb-6">
            Free to try · Full practice from $3.99/month
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 text-sm font-medium bg-[#5b8a72] text-white px-6 py-2.5 rounded-full hover:bg-[#4a7a62] transition-colors"
          >
            Open iAffirm
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#e8e2d9]/80 bg-[#f7f3ed]/70 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-1.5 max-w-xs">
              <Logo size="sm" />
              <p className="text-xs text-[#6b6560] leading-relaxed">
                Kinder self-talk — in your own voice.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm">
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-[#2a2825] uppercase tracking-wide">Product</p>
                <Link href="/app" className="block text-xs text-[#6b6560] hover:text-[#2a2825]">
                  Open app
                </Link>
                <Link href="/install" className="block text-xs text-[#6b6560] hover:text-[#2a2825]">
                  Home screen
                </Link>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-[#2a2825] uppercase tracking-wide">Legal</p>
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
