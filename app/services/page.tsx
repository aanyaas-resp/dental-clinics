import type { Metadata } from "next";
import { SERVICES } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal } from "@/components/animations/Reveal";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Dental services at Shriram Dental Clinic & Implant Center — general dentistry, root canal treatment, implants, braces, cosmetic dentistry and more.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-sand pb-16 pt-32 sm:pb-24 sm:pt-40">
        <Container className="max-w-2xl">
          <Reveal>
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Services
            </span>
            <h1 className="font-display text-4xl leading-[1.12] text-ink sm:text-5xl">
              Dental care, treatment by treatment
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink/65 sm:text-lg">
              A look at what Shriram Dental Clinic &amp; Implant Center
              treats. Call the clinic if you don&apos;t see what you&apos;re
              looking for — it may still be something we can help with.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <Container>
          <Reveal
            stagger
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </Reveal>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
