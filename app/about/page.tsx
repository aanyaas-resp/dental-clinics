import type { Metadata } from "next";
import Image from "next/image";
import { CLINIC_HIGHLIGHTS, CLINIC } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/sections/CTABanner";
import { Reveal } from "@/components/animations/Reveal";
import * as Icons from "lucide-react";
import { Phone, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About the Clinic",
  description:
    "About Shriram Dental Clinic & Implant Center — a dental practice in CIDCO N-2, Chhatrapati Sambhajinagar.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-sand pb-16 pt-32 sm:pb-24 sm:pt-40">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              About us
            </span>
            <h1 className="font-display text-4xl leading-[1.12] text-ink sm:text-5xl">
              A dental practice built for the neighbourhood it sits in
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink/65 sm:text-lg">
              {CLINIC.name} is located in CIDCO N-2, Chhatrapati
              Sambhajinagar. The clinic offers general dentistry alongside
              dental implants, with treatment plans explained clearly before
              any work begins.
            </p>
            <div className="mt-8">
              <Button href={CLINIC.phoneHref} icon={<Phone size={16} />}>
                Call {CLINIC.phoneDisplay}
              </Button>
            </div>
          </Reveal>

          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-xl2 shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=1000&q=80"
              alt="Reception area of the dental clinic"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Our approach"
              title="Straightforward care, explained before you sit down"
              description="Every patient is examined properly and told what's going on with their teeth in plain language — including what a treatment involves, and why it's being recommended."
            />
          </Reveal>
          <Reveal>
            <SectionHeading
              eyebrow="What the clinic focuses on"
              title="General dentistry, with implants as a specialty"
              description="The clinic's name reflects its focus: dental implants sit alongside routine dentistry, so patients don't need to be referred elsewhere for either."
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why patients choose us"
              title="What to expect at Shriram Dental"
              align="center"
              className="mx-auto"
            />
          </Reveal>

          <Reveal
            stagger
            className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2"
          >
            {CLINIC_HIGHLIGHTS.map((item) => {
              const Icon =
                (Icons as unknown as Record<string, Icons.LucideIcon>)[
                  item.icon
                ] ?? Icons.CheckCircle2;
              return (
                <div
                  key={item.title}
                  className="flex gap-5 rounded-xl2 border border-line bg-cream p-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest/[0.06] text-forest">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </Reveal>

          <Reveal className="mt-12 text-center">
            <Button href="/services" variant="ghost" icon={<ArrowRight size={16} />}>
              See everything we treat
            </Button>
          </Reveal>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
