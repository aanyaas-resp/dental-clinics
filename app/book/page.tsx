import type { Metadata } from "next";
import { CLINIC, SITE_URL } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { BookingForm } from "@/components/sections/BookingForm";
import { Phone, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: `Book a dental appointment online at ${CLINIC.name} in CIDCO N-2, Chhatrapati Sambhajinagar. Pick a date, time, and treatment — the clinic will confirm by phone.`,
  alternates: { canonical: `${SITE_URL}/book` },
  openGraph: {
    title: `Book an Appointment | ${CLINIC.shortName}`,
    description:
      "Pick a date and time that works for you — the clinic confirms every request by phone.",
    url: `${SITE_URL}/book`,
  },
};

export default function BookPage() {
  return (
    <div className="bg-cream pb-24 pt-32 sm:pt-40">
      <Container className="max-w-3xl">
        <Reveal variant="blur">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-forest">
            Online booking
          </p>
          <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
            Book your visit
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/65">
            Choose a date, a time slot, and what you need — the clinic will
            call to confirm. Prefer to talk first?{" "}
            <a href={CLINIC.phoneHref} className="font-semibold text-forest underline underline-offset-2">
              Call {CLINIC.phoneDisplay}
            </a>{" "}
            or{" "}
            <a
              href={CLINIC.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-forest underline underline-offset-2"
            >
              WhatsApp us
            </a>
            .
          </p>
        </Reveal>

        <Reveal variant="fade-up" delay={0.1} className="mt-10">
          <BookingForm />
        </Reveal>

        <Reveal variant="fade-up" delay={0.15} className="mt-8 flex flex-wrap items-center gap-6 text-sm text-ink/50">
          <span className="flex items-center gap-2">
            <Phone size={15} /> {CLINIC.phoneDisplay}
          </span>
          <span className="flex items-center gap-2">
            <MessageCircle size={15} /> WhatsApp available
          </span>
        </Reveal>
      </Container>
    </div>
  );
}
