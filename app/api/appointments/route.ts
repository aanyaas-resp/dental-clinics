import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * POST /api/appointments
 * Public endpoint used by the /book page. Writes with the service-role
 * client server-side so anonymous visitors can submit a booking request
 * without an account — the admin dashboard (protected by Supabase Auth)
 * is where the clinic reviews and confirms these.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      patient_name,
      phone,
      email,
      service,
      appointment_date,
      time_slot,
      notes,
    } = body ?? {};

    if (!patient_name || !phone || !service || !appointment_date || !time_slot) {
      return NextResponse.json(
        { error: "Missing required booking fields." },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("appointments")
      .insert({
        patient_name: String(patient_name).slice(0, 200),
        phone: String(phone).slice(0, 30),
        email: email ? String(email).slice(0, 200) : null,
        service: String(service).slice(0, 200),
        appointment_date,
        time_slot: String(time_slot).slice(0, 50),
        notes: notes ? String(notes).slice(0, 2000) : null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("appointments insert error", error);
      return NextResponse.json(
        { error: "Could not save appointment request." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    console.error("appointments route error", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
