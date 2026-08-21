"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Appointment = {
  id: string;
  patient_name: string;
  phone: string;
  email: string | null;
  service: string;
  appointment_date: string;
  time_slot: string;
  notes: string | null;
  status: "pending" | "confirmed" | "cancelled" | "completed";
};

const STATUS_STYLES: Record<Appointment["status"], string> = {
  pending: "bg-gold/15 text-gold-light border-gold/30",
  confirmed: "bg-forest/10 text-forest border-forest/30",
  cancelled: "bg-red-50 text-red-600 border-red-200",
  completed: "bg-ink/5 text-ink/50 border-ink/10",
};

/**
 * AppointmentsTable
 * Renders appointments fetched server-side and lets the signed-in admin
 * change status inline (writes directly to Supabase using the browser
 * client — permitted because RLS grants `authenticated` full access).
 */
export function AppointmentsTable({ initialAppointments }: { initialAppointments: Appointment[] }) {
  const [appointments, setAppointments] = useState(initialAppointments);

  async function updateStatus(id: string, status: Appointment["status"]) {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    const supabase = createClient();
    await supabase.from("appointments").update({ status }).eq("id", id);
  }

  if (appointments.length === 0) {
    return (
      <p className="rounded-xl2 border border-line bg-cream p-8 text-center text-sm text-ink/50">
        No appointment requests yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl2 border border-line bg-cream">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-line bg-sand/60 text-xs uppercase tracking-wide text-ink/50">
          <tr>
            <th className="px-4 py-3">Date &amp; time</th>
            <th className="px-4 py-3">Patient</th>
            <th className="px-4 py-3">Treatment</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id} className="border-b border-line/70 last:border-0">
              <td className="px-4 py-3 align-top">
                <div className="font-semibold text-ink">
                  {format(parseISO(a.appointment_date), "d MMM yyyy")}
                </div>
                <div className="text-ink/50">{a.time_slot}</div>
              </td>
              <td className="px-4 py-3 align-top">
                <div className="font-medium text-ink">{a.patient_name}</div>
                {a.notes && <div className="mt-1 max-w-[220px] text-xs text-ink/45">{a.notes}</div>}
              </td>
              <td className="px-4 py-3 align-top text-ink/70">{a.service}</td>
              <td className="px-4 py-3 align-top">
                <a href={`tel:${a.phone}`} className="flex items-center gap-1.5 text-forest hover:underline">
                  <Phone size={13} /> {a.phone}
                </a>
                {a.email && <div className="mt-0.5 text-xs text-ink/45">{a.email}</div>}
              </td>
              <td className="px-4 py-3 align-top">
                <select
                  value={a.status}
                  onChange={(e) => updateStatus(a.id, e.target.value as Appointment["status"])}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold outline-none",
                    STATUS_STYLES[a.status]
                  )}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
