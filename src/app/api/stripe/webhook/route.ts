import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * Webhook for subscription events. With on-device entitlement, the success page
 * activates local premium after Checkout. Webhook is ready for future account sync.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !whSecret) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const stripe = new Stripe(secret);
  const sig = req.headers.get("stripe-signature");
  const raw = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(raw, sig!, whSecret);
    if (
      event.type === "checkout.session.completed" ||
      event.type === "customer.subscription.updated"
    ) {
      // Future: mark user premium in DB when accounts exist
      console.log("Stripe event", event.type);
    }
    return NextResponse.json({ received: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
