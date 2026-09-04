import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata = {
  title: "Privacy Policy — iAffirm",
  description: "How iAffirm collects, uses, and protects your information.",
};

export default function PrivacyPage() {
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

      <article className="max-w-2xl mx-auto px-6 py-12 prose-sm">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#6b6560] mb-10">Last updated: September 3, 2026</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-[#2a2825]/90">
          <section>
            <h2 className="text-lg font-semibold mb-2">Who we are</h2>
            <p>
              iAffirm (“we”, “us”) provides a web application for practicing positive self-talk,
              including optional voice recording and personalized affirmation suggestions.
              This policy explains what information we collect and how we use it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Information we collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Account information</strong> — if you sign up: email address and display name.
              </li>
              <li>
                <strong>Usage data</strong> — features you use (e.g. recordings started, categories viewed),
                approximate limits for free trials, and basic device/browser information.
              </li>
              <li>
                <strong>Content you create</strong> — custom affirmations, favorites, and voice recordings
                you choose to save. Recordings are stored so you can play them back.
              </li>
              <li>
                <strong>Payment information</strong> — if you subscribe, payments are processed by a third-party
                provider (e.g. Stripe). We do not store full card numbers on our servers.
              </li>
              <li>
                <strong>Local device data</strong> — some preferences and free-tier usage may be stored in your
                browser (localStorage) for demo and continuity before an account is linked.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">How we use information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide and improve the iAffirm service</li>
              <li>To save your library, recordings, and preferences</li>
              <li>To enforce free-tier limits and manage subscriptions</li>
              <li>To generate personal affirmation suggestions when you ask for them</li>
              <li>To communicate about the product (e.g. important account or service notices)</li>
              <li>To protect against abuse and maintain security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Voice recordings</h2>
            <p>
              Microphone access is only requested when you choose to record. Recordings you save may be
              stored on our infrastructure (or a provider such as Supabase Storage) and associated with
              your account. We do not sell your recordings. You can delete saved recordings when account
              tools support it; contact us if you need help removing data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">AI-assisted suggestions</h2>
            <p>
              When you use “Write for me” or similar features, the text you enter may be sent to a language
              model provider to generate affirmation suggestions. Do not include sensitive personal data you
              do not want processed for that purpose. Suggestions are not medical or therapeutic advice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Sharing</h2>
            <p>We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Infrastructure and database providers that host the app</li>
              <li>Payment processors for subscriptions</li>
              <li>AI providers solely to generate requested suggestions</li>
              <li>Authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Retention</h2>
            <p>
              We keep account and content data while your account is active and for a reasonable period
              afterward if needed for legal, security, or operational reasons. You may request deletion of
              your account data by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Security</h2>
            <p>
              We use industry-standard measures (encryption in transit, access controls) to protect data.
              No method of transmission or storage is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Children</h2>
            <p>
              iAffirm is not directed at children under 13 (or the minimum age in your jurisdiction).
              We do not knowingly collect data from children under that age.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Your choices</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Decline microphone access in your browser</li>
              <li>Clear local browser storage to reset local free-tier counters</li>
              <li>Request access or deletion of account data by emailing us</li>
              <li>Cancel a subscription through the payment provider or account settings when available</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Changes</h2>
            <p>
              We may update this policy from time to time. The “Last updated” date will change when we do.
              Continued use of iAffirm after changes means you accept the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p>
              Questions about privacy:{" "}
              <a href="mailto:privacy@iaffirm.app" className="text-primary underline">
                privacy@iaffirm.app
              </a>
              {" "}(or the support email listed on the site when available).
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
