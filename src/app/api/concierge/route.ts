import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * CORS: izinkan landing statis (GitHub Pages) memakai AI ini juga.
 * OPTIONS dijawab 204 dengan header CORS.
 */
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

/**
 * AI Studio Concierge — answers strictly from the official studio
 * information below. No invented prices, schedules or addresses.
 */
const SYSTEM_PROMPT = `You are the friendly concierge of ELCHÍ STUDIO BALI, a creative workshop studio in Bali, Indonesia led by Elin Kim.

OFFICIAL INFORMATION (the only facts you may use):

CLASSES (all open to every skill level):
1. Travel Drawing — 100 minutes. Essential sketching skills with pencils and pens to recreate a destination of your choice. Bring: photos on your phone of the place you want to draw.
2. Postcards — 100 minutes. Choose 3 favourite designs from a collection of unique Bali-themed postcards; learn basic watercolour techniques plus acrylic pens and coloured pencils. Afterwards you may write a letter to your future self or a loved one, pick a month, and the studio mails it later as a surprise.
3. Dog Keychain — 110 minutes. Needle-felting with felting wool to create a 3D version of your own dog. Bring: photos of your dog.
4. Custom Flip-Flop — 60 minutes. Redesign flip-flops by wrapping straps in your favourite colours and adding ten special charms. Note: ankle straps are not included and are available for purchase separately at the studio.
5. Custom T-shirt — 90 minutes. Choose shirt colour and size, paint your own design, learn creative cutting techniques, no sewing required.
6. Creative Flow — 90 minutes. Bring your own art goals and choose your materials; relaxed group class led by Elin with personalised guidance including at least 20 minutes of one-on-one feedback.

PRIVATE EXPERIENCES:
- Private Group Class — for hen's parties, birthdays, team-building or fun days with friends. Enquiry needs: preferred date, number of participants, preferred class. Up to 50 participants possible (Elin has taught groups of up to 50).
- Private 1:1 Class — 90 minutes, tailored to your interests; choose an existing class or request something unique. Enquiry needs: preferred date, time and creative idea.

INSTRUCTOR: Elin Kim — 19 years of teaching experience; studied art restoration at École de Condé Paris and Fine Arts at ESADMM Marseille; certified in needle felting (2022), fitness (2020) and flower rice cakes (2018); teaches in English, French and Korean; has held workshops for organisations including Pinterest, Bottega Veneta, Westfield, Mirvac, ClassBento and the Korean Cultural Centre Australia; her previous studio Elin's Classes earned over 250 five-star reviews.

BOOKING: enquiries go through the website booking form (name, email, class, preferred date, participants, message). No payment is taken upfront; the studio confirms availability personally and shares the exact studio address and WhatsApp number with the booking confirmation.

STUDIO LOCATION: Gg. Puji No. 9B, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361, Indonesia. Email: ptelchistudiobali@gmail.com, elchistudio@gmail.com, info@elchistudio.com.

RULES:
- Answer ONLY from the information above. If asked about prices, exact schedules, or anything not listed, say warmly that the studio confirms those details personally via the booking form.
- Keep answers short and warm (2–5 sentences). Match the visitor's language (English, Indonesian, French or Korean).
- Never invent prices, addresses, phone numbers or dates.`;

/** Site locale → hard language directive for the reply. */
const LOCALE_RULES: Record<string, string> = {
  id: "IMPORTANT LANGUAGE RULE: The visitor is browsing the website in Indonesian (Bahasa Indonesia). ALWAYS reply in warm, natural Bahasa Indonesia — unless the visitor writes to you in another language, then follow the visitor.",
  ko: "IMPORTANT LANGUAGE RULE: The visitor is browsing the website in Korean (한국어). ALWAYS reply in warm, natural polite Korean (해요체/합니다체) — unless the visitor writes to you in another language, then follow the visitor.",
  en: "IMPORTANT LANGUAGE RULE: The visitor is browsing the website in English. Reply in warm, natural English — unless the visitor writes to you in another language, then follow the visitor.",
};

const FALLBACK =
  "I'm having a little trouble connecting right now. Please use the booking form — it always reaches us!";

type Msg = { role: string; content: string };

/**
 * Provider 1 — any OpenAI-compatible API via env vars:
 *   AI_API_KEY   (required to activate this provider)
 *   AI_BASE_URL  (optional; default https://api.z.ai/api/paas/v4)
 *                Google Gemini: https://generativelanguage.googleapis.com/v1beta/openai
 *                OpenAI:        https://api.openai.com/v1
 *   AI_MODEL     (optional; default glm-4.5-flash — e.g. gemini-3.8-flash / gpt-4o-mini)
 *
 * NOTE: Production env vars (Z.ai GLM-4.5-flash) configured on Vercel — 17 Nov 2026.
 */
/**
 * Vercel function budget — reasoning models can exceed the 10 s Hobby default;
 * declaring 60 s keeps long AI calls alive (lower plan caps are respected automatically).
 */
export const maxDuration = 60;

async function callOpenAICompatible(messages: Msg[]): Promise<string> {
  const key = process.env.AI_API_KEY as string;
  const base = (process.env.AI_BASE_URL || "https://api.z.ai/api/paas/v4").replace(/\/+$/, "");
  const model = process.env.AI_MODEL || "glm-4.5-flash";
  let lastErr: unknown = new Error("AI provider unreachable");
  for (let attempt = 0; attempt < 2; attempt++) {
    const ctl = new AbortController();
    const tm = setTimeout(() => ctl.abort(), 25000);
    try {
      const payload: Record<string, unknown> = { model, messages, temperature: 0.6, max_tokens: 400 };
      // GLM flash is a reasoning model — thinking mode added ~8 s latency on Vercel
      // and pushed calls past the function timeout (the "trouble connecting" bug).
      // Disabled = ~1-2 s answers, ideal for a chat concierge.
      if (base.includes("z.ai")) payload.thinking = { type: "disabled" };
      const res = await fetch(`${base}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify(payload),
        signal: ctl.signal,
      });
      if (!res.ok) throw new Error(`AI provider responded ${res.status}`);
      const data = await res.json();
      const txt = String(data?.choices?.[0]?.message?.content ?? "").trim();
      if (txt) return txt;
      throw new Error("AI returned empty content");
    } catch (e) {
      lastErr = e;
    } finally {
      clearTimeout(tm);
    }
    if (attempt === 0) await new Promise((r) => setTimeout(r, 1000));
  }
  throw lastErr;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body.messages) ? body.messages.slice(-8) : [];
    if (!messages.length) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400, headers: CORS });
    }
    const localeRule = LOCALE_RULES[String(body.locale ?? "en")] ?? LOCALE_RULES.en;
    const convo: Msg[] = [
      { role: "system", content: `${SYSTEM_PROMPT}\n\n${localeRule}` },
      ...messages.map((m: Msg) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: String(m.content ?? "").slice(0, 1000),
      })),
    ];

    let reply = "";

    // Provider 1: generic OpenAI-compatible (aktif begitu AI_API_KEY diisi di Vercel)
    if (process.env.AI_API_KEY) {
      try {
        reply = await callOpenAICompatible(convo);
      } catch (e) {
        console.error("[concierge.openai-compatible]", e);
      }
    }

    // Provider 2: z-ai-web-dev-sdk (fallback bawaan platform)
    if (!reply) {
      try {
        const zai = await ZAI.create();
        const completion = await zai.chat.completions.create({ messages: convo });
        reply = String(completion?.choices?.[0]?.message?.content ?? "").trim();
      } catch (e) {
        console.error("[concierge.zai]", e);
      }
    }

    return NextResponse.json({ reply: reply || FALLBACK }, { headers: CORS });
  } catch (err) {
    console.error("[concierge.POST]", err);
    return NextResponse.json({ reply: FALLBACK }, { status: 200, headers: CORS });
  }
}
