import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { Location } from "@/components/sections/Location";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Shriram Dental Clinic & Implant Center in CIDCO N-2, Chhatrapati Sambhajinagar — call, WhatsApp, or send your details.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-sand pb-16 pt-32 sm:pb-24 sm:pt-40">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Get in touch
            </span>
            <h1 className="font-display text-4xl leading-[1.12] text-ink sm:text-5xl">
              Let&apos;s get your visit sorted
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/65 sm:text-lg">
              Call the clinic directly for the fastest response, or share
              your details below and we&apos;ll get back to you on WhatsApp.
            </p>
          </Reveal>

          <Reveal>
            <ContactForm />
          </Reveal>
        </Container>
      </section>

      <Location />
    </>
  );
}
