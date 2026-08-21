"use client";

import Image from "next/image";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import { CLINIC } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useScopedGsap, gsap } from "@/lib/gsap";

export function Hero() {
  const ref = useScopedGsap<HTMLDivElement>(({ el }) => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(el.querySelectorAll("[data-hero-in]"), {
      opacity: 0,
      y: 24,
      duration: 0.9,
      stagger: 0.12,
    });

    const path = el.querySelector<SVGPathElement>("[data-smile-path]");
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      tl.to(
        path,
        { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut" },
        "-=0.5"
      );
    }
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-sand pb-16 pt-32 sm:pb-24 sm:pt-40"
    >
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <div
            data-hero-in
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-forest/15 bg-cream px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-forest"
          >
            <MapPin size={14} />
            CIDCO N-2, Chhatrapati Sambhajinagar
          </div>

          <h1
            data-hero-in
            className="font-display text-[2.6rem] leading-[1.08] text-ink sm:text-6xl lg:text-[3.6rem]"
          >
            Dental care built around{" "}
            <span className="relative inline-block text-forest">
              your smile
              <svg
                data-smile-path-wrap
                viewBox="0 0 300 24"
                className="absolute -bottom-2 left-0 w-full text-gold"
                fill="none"
              >
                <path
                  data-smile-path
                  d="M4 6C60 26 240 26 296 6"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            , not a script.
          </h1>

          <p
            data-hero-in
            className="mt-6 max-w-lg text-base leading-relaxed text-ink/65 sm:text-lg"
          >
            {CLINIC.name} is a neighbourhood dental practice in CIDCO N-2,
            offering general dentistry and dental implants — with a plan
            explained clearly before any treatment begins.
          </p>

          <div data-hero-in className="mt-9 flex flex-wrap items-center gap-4">
            <Button href={CLINIC.phoneHref} variant="primary" icon={<Phone size={16} />}>
              Call {CLINIC.phoneDisplay}
            </Button>
            <Button href="/services" variant="secondary" icon={<ArrowRight size={16} />}>
              View services
            </Button>
          </div>

          <div
            data-hero-in
            className="mt-10 flex items-center gap-6 border-t border-ink/10 pt-6 text-sm text-ink/60"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-forest" />
              Implant-focused practice
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-forest" />
              Family &amp; cosmetic care
            </span>
          </div>
        </div>

        <div data-hero-in className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl2 shadow-card sm:aspect-[5/6]">
            <Image
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1000&q=80"
              alt="Dental treatment chair in a modern clinic"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden w-48 rounded-xl2 bg-cream p-5 shadow-card sm:block">
            <p className="font-display text-2xl text-forest">CIDCO N-2</p>
            <p className="mt-1 text-xs leading-relaxed text-ink/60">
              A short, easy drive from across Chhatrapati Sambhajinagar.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
