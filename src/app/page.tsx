import Link from "next/link";
import { Sparkles, Mic, Heart, Zap, Shield, ArrowRight, Brain, Layers, Bell, Smartphone } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold tracking-tight">iAffirm</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/app"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Open App
            </Link>
            <Link
              href="/app"
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Try Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            <Zap className="w-3.5 h-3.5" />
            Daily affirmations that feel personal
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Affirmations
            <br />
            <span className="text-primary">in your own voice</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            A calm place to practice positive self-talk. Record affirmations in your voice,
            explore thoughtful categories, and build a practice that feels like yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/app"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              Try the Web App
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
            >
              Learn more
            </a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Web app available now · Native iOS & Android coming soon
          </p>

          {/* Phone preview */}
          <div className="mt-16 mx-auto max-w-xs">
            <div className="rounded-[2rem] border border-border bg-card p-3 shadow-2xl shadow-primary/10">
              <div className="rounded-[1.5rem] bg-background overflow-hidden">
                <div className="h-8 flex items-center justify-center">
                  <div className="w-20 h-1 rounded-full bg-muted" />
                </div>
                <div className="px-5 pb-8 pt-4 space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="font-medium">iAffirm</span>
                  </div>
                  <div className="rounded-2xl bg-card border border-border p-5 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Confidence</p>
                    <p className="text-lg font-medium leading-snug">
                      I am confident in my abilities and trust myself completely.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-10 rounded-xl bg-muted" />
                    <div className="w-24 h-10 rounded-xl bg-primary/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Simple tools for a meaningful practice
          </h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-14">
            Designed to help you show up for yourself, one affirmation at a time.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Mic,
                title: "Your own voice",
                desc: "Record affirmations and listen back in your voice. A simple way to make the words feel more real.",
              },
              {
                icon: Brain,
                title: "Personal to you",
                desc: "Create your own affirmations or get suggestions based on what you’re working on.",
              },
              {
                icon: Layers,
                title: "Thoughtful categories",
                desc: "Confidence, calm, self-love, motivation, gratitude, and more — choose what fits today.",
              },
              {
                icon: Bell,
                title: "Gentle reminders",
                desc: "Optional notifications that support your practice without becoming noise.",
              },
              {
                icon: Heart,
                title: "Your personal library",
                desc: "Save favorites, write your own, and keep the affirmations that truly resonate.",
              },
              {
                icon: Shield,
                title: "Private by design",
                desc: "Your recordings and personal affirmations stay yours. A calm, respectful space.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="border-t border-border py-20 bg-card/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            <Smartphone className="w-3.5 h-3.5" />
            What’s next
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Web today. Native apps next.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
            The web app is here so you can start practicing and share feedback.
            Native iOS and Android apps are on the way.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground mb-10">
            <span className="px-3 py-1.5 rounded-full bg-muted">Web app — available</span>
            <span className="px-3 py-1.5 rounded-full bg-muted">More personalization — soon</span>
            <span className="px-3 py-1.5 rounded-full bg-muted">iOS & Android — planned</span>
          </div>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Try the web app
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>iAffirm</span>
          </div>
          <p>A quiet space for better self-talk.</p>
        </div>
      </footer>
    </div>
  );
}
