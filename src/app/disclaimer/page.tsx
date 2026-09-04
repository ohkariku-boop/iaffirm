import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata = {
  title: "Health & Wellness Disclaimer — iAffirm",
  description: "Important information about the nature of iAffirm.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#f7f3ed] text-[#2a2825]">
      <header className="border-b border-[#e5dfd5] bg-[#f7f3ed]/90 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Logo size="sm" />
          <Link href="/" className="text-sm text-[#6b6560] hover:text-[#2a2825]">
            Home
          </Link>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Health & Wellness Disclaimer</h1>
        <p className="text-sm text-[#6b6560] mb-10">Last updated: September 3, 2026</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-[#2a2825]/90">
          <section>
            <h2 className="text-lg font-semibold mb-2">General wellbeing only</h2>
            <p>
              iAffirm offers tools for positive self-talk, reflection, and personal affirmations.
              Content on the Service — including curated affirmations, user-created text, voice
              recordings, and AI-generated suggestions — is for general wellness and educational
              purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Not professional care</h2>
            <p>
              iAffirm does <strong>not</strong> provide medical, psychological, psychiatric, or
              therapeutic advice, diagnosis, or treatment. It is not a licensed healthcare provider
              and is not a substitute for consultation with qualified professionals.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Crisis support</h2>
            <p>
              If you are experiencing a mental health emergency, thoughts of self-harm, or are in
              immediate danger, contact local emergency services or a crisis hotline right away.
              In the United States, you can call or text <strong>988</strong> (Suicide & Crisis Lifeline).
              iAffirm is not designed to respond to crises.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Your responsibility</h2>
            <p>
              You are responsible for how you use the Service and for decisions you make about your
              health and wellbeing. Always seek the advice of a physician or other qualified health
              provider with questions about a medical or mental health condition.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Related policies</h2>
            <p>
              See also our{" "}
              <Link href="/terms" className="text-primary underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
