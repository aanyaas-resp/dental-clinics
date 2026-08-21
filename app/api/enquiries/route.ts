import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * POST /api/enquiries
 * Public endpoint used by the EnquiryModal popup. Writes with the
 * service-role client (server-only) so anonymous visitors don't need
 * their own Supabase session — RLS on the table still restricts direct
 * client access, this route is the sanctioned write path.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, message, source_page } = body ?? {};

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required." },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();
    const { error } = await supabase.from("enquiries").insert({
      name: String(name).slice(0, 200),
      phone: String(phone).slice(0, 30),
      message: message ? String(message).slice(0, 2000) : null,
      source_page: source_page ? String(source_page).slice(0, 200) : null,
    });

    if (error) {
      console.error("enquiries insert error", error);
      return NextResponse.json({ error: "Could not save enquiry." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("enquiries route error", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
