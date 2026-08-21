"use client";

import { FormEvent, ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { CalendarDays, Loader2, Send, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input, Textarea } from "@/components/ui/input";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * EnquiryModal
 * A lightweight "quick enquiry" popup available from anywhere on the
 * site (header + mobile CTA). Kept separate from the full /book flow —
 * this is for "call me back" / general questions, not a scheduled slot.
 */
export function EnquiryModal({ trigger }: { trigger: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message, source_page: pathname }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setStatus("idle");
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        {status === "success" ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 className="mb-4 text-forest" size={40} />
            <h3 className="font-display text-xl text-ink">Enquiry sent</h3>
            <p className="mt-2 text-sm text-ink/60">
              Thanks — the clinic will call you back shortly. For a specific
              date and time, you can also{" "}
              <a href="/book" className="font-semibold text-forest underline underline-offset-2">
                book a slot directly
              </a>
              .
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Quick enquiry</DialogTitle>
              <DialogDescription>
                Share a few details and the clinic will call you back — or{" "}
                <a href="/book" className="font-semibold text-forest underline underline-offset-2">
                  book an exact slot instead
                </a>
                .
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="enquiry-name">Your name</Label>
                <Input
                  id="enquiry-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rohan Deshmukh"
                />
              </div>
              <div>
                <Label htmlFor="enquiry-phone">Phone number</Label>
                <Input
                  id="enquiry-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                />
              </div>
              <div>
                <Label htmlFor="enquiry-message">What&apos;s this about?</Label>
                <Textarea
                  id="enquiry-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. tooth pain, implant consultation..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:bg-forest-dark disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send enquiry
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="text-center text-xs text-red-600">
                  Something went wrong — please call or WhatsApp the clinic instead.
                </p>
              )}

              <a
                href="/book"
                className="flex items-center justify-center gap-2 text-xs font-semibold text-ink/50 hover:text-forest"
              >
                <CalendarDays size={14} /> Prefer to pick a date? Go to booking
              </a>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
