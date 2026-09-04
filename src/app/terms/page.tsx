import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata = {
  title: "Terms of Service — iAffirm",
  description: "Terms governing use of the iAffirm application.",
};

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-sm text-[#6b6560] mb-10">Last updated: September 3, 2026</p>

        <div className="space-y-8 text-[15px] leading-relaxed text-[#2a2825]/90">
          <section>
            <h2 className="text-lg font-semibold mb-2">Agreement</h2>
            <p>
              By accessing or using iAffirm (the “Service”), you agree to these Terms of Service.
              If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">What iAffirm is</h2>
            <p>
              iAffirm is a wellness tool for reading, recording, and practicing positive affirmations.
              It may include optional personalization features and a paid “full practice” subscription.
              The Service is provided for personal, non-commercial use unless we agree otherwise in writing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Not medical or therapy advice</h2>
            <p>
              iAffirm is <strong>not</strong> a medical device, therapy, counseling, or crisis service.
              Affirmations and AI-generated suggestions are for general wellbeing and self-reflection only.
              They are not a substitute for professional mental health care. If you are in crisis or need
              clinical support, contact a qualified professional or local emergency services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Accounts</h2>
            <p>
              You may need an account for some features. You are responsible for keeping your login
              credentials secure and for activity under your account. Provide accurate information and
              notify us of unauthorized use.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Subscriptions and payments</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Free access may include limits (e.g. number of recordings or personal suggestions).
              </li>
              <li>
                Paid plans (“Full practice” / Premium) unlock additional features as described in the app
                at the time of purchase.
              </li>
              <li>
                Prices are shown before you confirm. Subscriptions renew until cancelled according to the
                terms of the payment provider (e.g. Stripe, Apple, or Google when applicable).
              </li>
              <li>
                Refunds are handled according to the payment platform’s policies and applicable law.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Your content</h2>
            <p>
              You retain rights to content you create (custom affirmations, voice recordings).
              You grant us a limited license to host, process, and display that content solely to
              operate the Service for you. You must not upload content that is illegal, harmful, or
              infringes others’ rights.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Acceptable use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Abuse, disrupt, or overload the Service</li>
              <li>Attempt unauthorized access to systems or other users’ data</li>
              <li>Reverse engineer or resell the Service without permission</li>
              <li>Use the Service for unlawful purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Intellectual property</h2>
            <p>
              The iAffirm name, branding, design, and system-provided affirmation library are owned by
              us or our licensors. You may not copy or redistribute them except as allowed through
              normal use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Disclaimer of warranties</h2>
            <p>
              The Service is provided “as is” and “as available.” We do not guarantee uninterrupted
              access, error-free operation, or that the Service will meet your specific goals.
              To the fullest extent permitted by law, we disclaim implied warranties of merchantability,
              fitness for a particular purpose, and non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, iAffirm and its operators will not be liable for
              indirect, incidental, special, consequential, or punitive damages, or for loss of profits,
              data, or goodwill, arising from your use of the Service. Our total liability for any claim
              relating to the Service is limited to the greater of (a) amounts you paid us in the twelve
              months before the claim or (b) USD $50, if you have not paid us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Termination</h2>
            <p>
              You may stop using the Service at any time. We may suspend or terminate access if you
              violate these terms or if we discontinue the Service. Provisions that by nature should
              survive (e.g. liability limits, intellectual property) will survive termination.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Changes</h2>
            <p>
              We may update these terms. We will update the “Last updated” date when we do. Continued
              use after changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a href="mailto:legal@iaffirm.app" className="text-primary underline">
                legal@iaffirm.app
              </a>
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
