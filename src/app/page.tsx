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
            Better than the top affirmation apps
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Daily affirmations
            <br />
            <span className="text-primary">in your own voice</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            The effortless delivery of I Am. The proven power of ThinkUp&apos;s own-voice recording.
            Plus AI personalization. Built to actually change how you talk to yourself.
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
              href="#why"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
            >
              Why it&apos;s better
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

      {/* Why better */}
      <section id="why" className="border-t border-border py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Built from the best of the top apps
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-14">
            We studied I Am, ThinkUp, Innertune, Selfpause, Gratitude, Mantra and others.
            Then we took what actually works and removed what doesn&apos;t.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {[
              {
                from: "From I Am",
                title: "Effortless daily presence",
                desc: "Beautiful cards and smart reminders so positivity finds you — without needing to open an app every time.",
              },
              {
                from: "From ThinkUp & Selfpause",
                title: "Your own voice",
                desc: "Record affirmations and hear them in your voice. Research shows this is significantly more effective than reading someone else’s words.",
              },
              {
                from: "From Innertune",
                title: "Rich, high-quality library",
                desc: "Carefully written affirmations across confidence, anxiety, self-love, motivation, gratitude, success and more.",
              },
              {
                from: "From newer AI apps",
                title: "Personal, not generic",
                desc: "AI-generated affirmations tailored to your actual goals and situation — not the same recycled lines everyone else gets.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <p className="text-xs font-medium text-primary mb-2">{item.from}</p>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border py-20 bg-card/30">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Everything you need. Nothing you don’t.
          </h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-14">
            A focused practice tool — not another cluttered wellness app.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Mic,
                title: "Own-voice recording",
                desc: "Record once, listen anytime. The single most effective way to internalize affirmations.",
              },
              {
                icon: Brain,
                title: "AI personalization",
                desc: "Describe a goal or feeling. Get affirmations written specifically for you.",
              },
              {
                icon: Layers,
                title: "Curated categories",
                desc: "Confidence, anxiety, self-love, motivation, gratitude, success, relationships and more.",
              },
              {
                icon: Bell,
                title: "Smart reminders",
                desc: "Gentle, controllable notifications that actually help instead of becoming noise.",
              },
              {
                icon: Heart,
                title: "Favorites & custom",
                desc: "Save what resonates. Write your own. Build a personal library that grows with you.",
              },
              {
                icon: Shield,
                title: "Private by design",
                desc: "Your recordings and personal affirmations stay yours. Clean, respectful product.",
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

      {/* Roadmap / Coming soon */}
      <section className="border-t border-border py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            <Smartphone className="w-3.5 h-3.5" />
            Roadmap
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Web today. Native apps next.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
            The web app is live so you can start practicing and give feedback right away.
            Native iOS and Android apps are planned next — same powerful core, refined for mobile.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground mb-10">
            <span className="px-3 py-1.5 rounded-full bg-muted">Web app — live</span>
            <span className="px-3 py-1.5 rounded-full bg-muted">AI personalization — soon</span>
            <span className="px-3 py-1.5 rounded-full bg-muted">iOS & Android — planned</span>
          </div>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Try the web app free
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
          <p>Built to help you change your self-talk for good.</p>
        </div>
      </footer>
    </div>
  );
}
