import { NextResponse } from "next/server";

// TODO: wire to a real email/notification service before launch — see
// SITE-PLAN.md §10. Currently just validates and logs server-side.

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  console.log("New Beaumont Knights contact message:", body);

  return NextResponse.json({ ok: true });
}
