import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { AppointmentsTable } from "@/components/admin/AppointmentsTable";
import { EnquiriesList } from "@/components/admin/EnquiriesList";

export const dynamic = "force-dynamic";

export default async function AdminAppointmentsPage() {
  const supabase = await createClient();

  const [{ data: appointments }, { data: enquiries }] = await Promise.all([
    supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: true })
      .order("time_slot", { ascending: true }),
    supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
  ]);

  return (
    <Container className="space-y-10">
      <div>
        <h1 className="font-display text-3xl text-ink">Appointments</h1>
        <p className="mt-1 text-sm text-ink/55">
          All booking requests submitted through the /book page, newest
          dates first.
        </p>
      </div>

      <AppointmentsTable initialAppointments={appointments ?? []} />

      <div>
        <h2 className="font-display text-2xl text-ink">Quick enquiries</h2>
        <p className="mt-1 text-sm text-ink/55">
          Call-back requests from the popup enquiry form.
        </p>
      </div>
      <EnquiriesList enquiries={enquiries ?? []} />
    </Container>
  );
}
