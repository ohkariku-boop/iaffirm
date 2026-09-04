import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      {
        error: "Stripe is not configured",
        demo: true,
        message: "Add STRIPE_SECRET_KEY to enable real checkout.",
      },
      { status: 503 }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const plan = body.plan === "monthly" ? "monthly" : "yearly";

    const priceId =
      plan === "monthly"
        ? process.env.STRIPE_PRICE_MONTHLY
        : process.env.STRIPE_PRICE_YEARLY;

    if (!priceId) {
      return NextResponse.json(
        { error: "Stripe price IDs not configured", demo: true },
        { status: 503 }
      );
    }

    const stripe = new Stripe(secret);
    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/app/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/app?checkout=cancel`,
      allow_promotion_codes: true,
      metadata: { product: "iaffirm_full_practice", plan },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (e) {
    console.error("Stripe checkout error", e);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
