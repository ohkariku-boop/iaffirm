import { NextRequest, NextResponse } from "next/server";

/**
 * AI personal affirmations
 * - With OPENAI_API_KEY (or similar): real generation
 * - Without: high-quality templated fallback so the path works in demo
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = String(body.prompt || "").trim().slice(0, 500);
    const mood = String(body.mood || "").trim().slice(0, 80);

    if (!prompt || prompt.length < 3) {
      return NextResponse.json(
        { error: "Please share a bit more about what you’re working on." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      const system = `You write short personal affirmations for a wellness app.
Rules:
- First person, present tense (I am / I choose / I allow…)
- 1 sentence each, max ~20 words
- Believable and grounded — not exaggerated or medical advice
- Match the user's situation and wording
- Return ONLY a JSON array of 3 strings, no markdown`;

      const userMsg = mood
        ? `Situation: ${prompt}\nHow they want to feel: ${mood}`
        : `Situation: ${prompt}`;

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.7,
          max_tokens: 220,
          messages: [
            { role: "system", content: system },
            { role: "user", content: userMsg },
          ],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const raw = data.choices?.[0]?.message?.content || "[]";
        let affirmations: string[] = [];
        try {
          const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
          if (Array.isArray(parsed)) {
            affirmations = parsed.map(String).slice(0, 5);
          }
        } catch {
          // fall through to templates
        }
        if (affirmations.length >= 2) {
          return NextResponse.json({ affirmations, source: "ai" });
        }
      }
    }

    // Deterministic fallback (demo / no key)
    const affirmations = buildFallback(prompt, mood);
    return NextResponse.json({ affirmations, source: "template" });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

function buildFallback(prompt: string, mood: string): string[] {
  const lower = prompt.toLowerCase();
  const lines: string[] = [];

  if (mood) {
    lines.push(`I am growing into a sense of ${mood.toLowerCase()}, one day at a time.`);
  }

  if (/anx|worr|stress|fear|nerv/.test(lower)) {
    lines.push("I am safe in this moment and I can meet what comes with calm.");
    lines.push("I breathe gently and release what I do not need to carry right now.");
  } else if (/confiden|self-esteem|doubt|imposter/.test(lower)) {
    lines.push("I trust my abilities and speak with quiet confidence.");
    lines.push("I am capable of handling this, even when it feels hard.");
  } else if (/love|relationship|partner|friend/.test(lower)) {
    lines.push("I offer and receive kindness with an open heart.");
    lines.push("I am worthy of respect and healthy connection.");
  } else if (/work|career|job|goal|success|money/.test(lower)) {
    lines.push("I take steady steps toward the work that matters to me.");
    lines.push("I am building a life that reflects my effort and values.");
  } else if (/health|body|energy|sleep/.test(lower)) {
    lines.push("I care for my body with patience and respect.");
    lines.push("I listen to what I need and allow myself to rest and recover.");
  } else {
    lines.push("I am present with myself and choose words that support me.");
    lines.push("I move forward with honesty and a little more self-trust each day.");
  }

  lines.push("I am allowed to grow at my own pace.");

  // Light personalization: weave a short fragment of their words if safe
  const snippet = prompt
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 4)
    .join(" ");
  if (snippet) {
    lines.unshift(`I meet “${snippet}” with patience and a steady heart.`);
  }

  return [...new Set(lines)].slice(0, 4);
}
