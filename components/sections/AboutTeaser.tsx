import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowRight } from "lucide-react";

export function AboutTeaser() {
  return (
    <section className="bg-sand py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl2 shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000&q=80"
              alt="Treatment room at the clinic"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="About the clinic"
            title="A dental clinic that treats CIDCO N-2 like the neighbourhood it is"
            description="Shriram Dental Clinic &amp; Implant Center focuses on straightforward, well-explained dental care — from a first check-up to dental implants — for patients across Chhatrapati Sambhajinagar."
          />
          <p className="mt-4 text-sm leading-relaxed text-ink/60">
            Every visit starts with a proper look and an honest conversation
            about what your teeth need, so you know what to expect before any
            treatment begins.
          </p>
          <div className="mt-8">
            <Button href="/about" variant="secondary" icon={<ArrowRight size={16} />}>
              More about the clinic
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
