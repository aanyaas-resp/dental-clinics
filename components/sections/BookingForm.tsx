"use client";

import { FormEvent, useState } from "react";
import { format } from "date-fns";
import { CalendarDays, CheckCircle2, Clock, Loader2, Send } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input, Textarea } from "@/components/ui/input";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
];

type Status = "idle" | "submitting" | "success" | "error";

/**
 * BookingForm
 * Appointment picker calendar (shadcn/react-day-picker) + time-slot grid
 * + patient details, posting to /api/appointments (Supabase). Modelled
 * on the shadcn "Appointment Picker Calendar" pattern.
 */
export function BookingForm() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [slot, setSlot] = useState<string | null>(null);
  const [service, setService] = useState(SERVICES[0]?.title ?? "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!date || !slot) return;
    setStatus("submitting");

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_name: name,
          phone,
          email: email || undefined,
          service,
          appointment_date: format(date, "yyyy-MM-dd"),
          time_slot: slot,
          notes: notes || undefined,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-xl2 border border-line bg-sand/50 px-6 py-16 text-center">
        <CheckCircle2 className="mb-4 text-forest" size={44} />
        <h2 className="font-display text-2xl text-ink">Appointment requested</h2>
        <p className="mt-2 max-w-sm text-sm text-ink/60">
          {date && slot && (
            <>
              {format(date, "EEEE, d MMMM")} at {slot} — the clinic will call
              you shortly to confirm.
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6 rounded-xl2 border border-line bg-cream p-6 shadow-soft sm:p-8 lg:grid-cols-2"
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="service">Treatment</Label>
          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full rounded-lg border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-forest"
          >
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Not sure / General consultation">
              Not sure / General consultation
            </option>
          </select>
        </div>

        <div>
          <Label>Date</Label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg border border-line bg-cream px-4 py-3 text-left text-sm text-ink outline-none transition-colors hover:border-forest/50 focus:border-forest"
              >
                <CalendarDays size={16} className="text-forest" />
                {date ? format(date, "EEEE, d MMMM yyyy") : "Choose a date"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  setDate(d);
                  setCalendarOpen(false);
                }}
                disabled={{ before: today }}
                fromDate={today}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>Time slot</Label>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSlot(t)}
                className={cn(
                  "flex items-center justify-center gap-1 rounded-lg border px-2 py-2.5 text-xs font-medium transition-colors",
                  slot === t
                    ? "border-forest bg-forest text-cream"
                    : "border-line text-ink/70 hover:border-forest/50"
                )}
              >
                <Clock size={12} />
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="patient-name">Your name</Label>
          <Input
            id="patient-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rohan Deshmukh"
          />
        </div>
        <div>
          <Label htmlFor="patient-phone">Phone number</Label>
          <Input
            id="patient-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
          />
        </div>
        <div>
          <Label htmlFor="patient-email">Email (optional)</Label>
          <Input
            id="patient-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <Label htmlFor="patient-notes">Notes (optional)</Label>
          <Textarea
            id="patient-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything the clinic should know beforehand"
          />
        </div>

        <button
          type="submit"
          disabled={!date || !slot || status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:bg-forest-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Requesting...
            </>
          ) : (
            <>
              <Send size={16} /> Request appointment
            </>
          )}
        </button>
        {status === "error" && (
          <p className="text-center text-xs text-red-600">
            Something went wrong — please call or WhatsApp the clinic instead.
          </p>
        )}
        {(!date || !slot) && (
          <p className="text-center text-xs text-ink/40">
            Pick a date and time slot to continue.
          </p>
        )}
      </div>
    </form>
  );
}
