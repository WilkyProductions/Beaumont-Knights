import { NextResponse } from "next/server";

// TODO: this currently only validates and logs the submission. Before
// launch, wire this to real storage + notifications — see SITE-PLAN.md §10
// (e.g. write to a database/CMS and email the registrar + a confirmation
// email to the parent). No payment is collected here per current scope
// (SITE-PLAN.md §7).

const requiredFields = [
  "playerFirstName",
  "playerLastName",
  "dob",
  "division",
  "shirtSize",
  "parent1Name",
  "parent1Relationship",
  "parent1Phone",
  "parent1Email",
  "address",
  "city",
  "zip",
  "photoConsent",
  "waiverConsent",
] as const;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const missing = requiredFields.filter((field) => {
    const value = body[field];
    if (typeof value === "boolean") return value !== true;
    return !value || (typeof value === "string" && value.trim() === "");
  });

  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields", fields: missing },
      { status: 400 }
    );
  }

  // Placeholder: log server-side so submissions aren't silently dropped
  // during development. Replace with real persistence before launch.
  console.log("New Beaumont Knights signup:", {
    player: `${body.playerFirstName} ${body.playerLastName}`,
    division: body.division,
    parent: body.parent1Name,
    email: body.parent1Email,
  });

  return NextResponse.json({ ok: true });
}
