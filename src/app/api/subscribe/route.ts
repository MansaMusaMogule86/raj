import { NextResponse } from "next/server";

/**
 * Newsletter subscribe endpoint.
 * Stores subscribers in-memory (demo) — swap for a real ESP (Resend,
 * ConvertKit, MailerLite) before launch. Validates email shape and
 * de-duplicates by address.
 */
const subscribers: { email: string; at: string; source: string }[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email ?? "").slice(0, 200).trim().toLowerCase();
    const source = String(body?.source ?? "footer").slice(0, 60);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }
    if (subscribers.some((s) => s.email === email)) {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    subscribers.push({ email, at: new Date().toISOString(), source });
    console.log("[subscribe] new subscriber from", source, "—", email);
    return NextResponse.json({ ok: true, count: subscribers.length });
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ count: subscribers.length });
}
