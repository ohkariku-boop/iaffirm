import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ArrowRight, Share, MoreVertical } from "lucide-react";

export const metadata = {
  title: "Add to Home Screen — iAffirm",
  description: "Use iAffirm from your home screen on iPhone or Android.",
};

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8f0eb] text-sm font-medium text-[#5b8a72]">
        {n}
      </span>
      <span className="text-[15px] text-[#2a2825] leading-relaxed pt-0.5">{children}</span>
    </li>
  );
}

function PhoneFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.75rem] border border-[#e5dfd5] bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-2 border-b border-[#e5dfd5] bg-[#faf8f5] text-xs font-medium text-[#6b6560] text-center">
        {label}
      </div>
      <div className="p-5 space-y-4 min-h-[200px]">{children}</div>
    </div>
  );
}

export default function InstallPage() {
  return (
    <div className="min-h-screen bg-[#f7f3ed] text-[#2a2825]">
      <header className="border-b border-[#e5dfd5] bg-[#f7f3ed]/90 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Logo size="sm" />
          <Link href="/app" className="text-sm text-[#5b8a72] font-medium hover:opacity-80">
            Open app
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12 space-y-12">
        <div className="space-y-4">
          <p className="text-sm tracking-wide text-[#5b8a72]">Home screen</p>
          <h1 className="text-3xl font-semibold tracking-tight leading-snug">
            Use iAffirm like an app
          </h1>
          <p className="text-[#6b6560] leading-relaxed max-w-lg">
            Add it to your home screen so today&apos;s practice is one tap away.
            Your recordings stay on this device. Native apps are planned for later.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 text-sm font-medium bg-[#5b8a72] text-white px-5 py-2.5 rounded-full hover:bg-[#4a7a62] transition-colors"
          >
            Open iAffirm first
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <PhoneFrame label="iPhone · Safari">
            <div className="flex items-center gap-2 text-[#5b8a72] text-sm font-medium">
              <Share className="w-4 h-4" />
              iPhone
            </div>
            <ol className="space-y-3">
              <Step n={1}>
                Open <strong>iAffirm</strong> in <strong>Safari</strong> (not only an in-app browser).
              </Step>
              <Step n={2}>
                Tap the <strong>Share</strong> button (square with an arrow) at the bottom.
              </Step>
              <Step n={3}>
                Scroll and tap <strong>Add to Home Screen</strong>.
              </Step>
              <Step n={4}>
                Tap <strong>Add</strong>. The iA icon appears on your home screen.
              </Step>
            </ol>
            <div className="rounded-xl bg-[#f7f3ed] border border-[#e5dfd5] px-3 py-2 text-xs text-[#6b6560] leading-relaxed">
              Tip: If you don&apos;t see Share, you may be in Instagram/Chrome&apos;s browser — open the
              link in Safari instead.
            </div>
          </PhoneFrame>

          <PhoneFrame label="Android · Chrome">
            <div className="flex items-center gap-2 text-[#5b8a72] text-sm font-medium">
              <MoreVertical className="w-4 h-4" />
              Android
            </div>
            <ol className="space-y-3">
              <Step n={1}>
                Open <strong>iAffirm</strong> in <strong>Chrome</strong>.
              </Step>
              <Step n={2}>
                Tap the <strong>menu</strong> (three dots) in the top right.
              </Step>
              <Step n={3}>
                Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>.
              </Step>
              <Step n={4}>
                Confirm. Launch iAffirm from your home screen like any app.
              </Step>
            </ol>
            <div className="rounded-xl bg-[#f7f3ed] border border-[#e5dfd5] px-3 py-2 text-xs text-[#6b6560] leading-relaxed">
              Tip: Some Android browsers show a small install banner automatically — you can use that
              too.
            </div>
          </PhoneFrame>
        </div>

        <section className="rounded-2xl border border-[#e5dfd5] bg-white/80 px-5 py-6 space-y-2">
          <h2 className="text-base font-medium">What this does — and doesn&apos;t</h2>
          <ul className="text-sm text-[#6b6560] space-y-2 leading-relaxed">
            <li>Gives you a home-screen icon and a fuller-screen experience.</li>
            <li>Helps you return for today&apos;s practice more easily.</li>
            <li>Does not replace the App Store / Play versions we may ship later (widgets, richer notifications).</li>
            <li>Recordings and favorites stay on this device unless you clear site data.</li>
          </ul>
        </section>

        <div className="text-center pb-8">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#5b8a72] hover:underline"
          >
            Back to the app
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
