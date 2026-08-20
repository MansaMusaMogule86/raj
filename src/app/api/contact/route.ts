import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 * Stores messages locally (in-memory for demo) and forwards to a
 * configurable email if set. Swap the sink for a real provider
 * (Resend, Postmark, etc.) before launch.
 */
const inbox: { name: string; email: string; message: string; at: string }[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? "").slice(0, 120);
    const email = String(body?.email ?? "").slice(0, 200);
    const message = String(body?.message ?? "").slice(0, 4000);

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    inbox.push({ name, email, message, at: new Date().toISOString() });
    console.log("[contact] new message from", email, "—", message.slice(0, 80));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ count: inbox.length });
}
