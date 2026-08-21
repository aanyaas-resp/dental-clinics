import * as Icons from "lucide-react";
import { CLINIC_HIGHLIGHTS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

export function WhyChooseUs() {
  return (
    <section className="bg-forest py-20 text-cream sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why patients choose us"
            title="A clinic that's easy to reach, and easy to talk to"
            className="[&_h2]:text-cream [&_span]:text-gold-light"
          />
        </Reveal>

        <Reveal
          stagger
          className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2"
        >
          {CLINIC_HIGHLIGHTS.map((item) => {
            const Icon =
              (Icons as unknown as Record<string, Icons.LucideIcon>)[
                item.icon
              ] ?? Icons.CheckCircle2;
            return (
              <div key={item.title} className="flex gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream/10 text-gold-light">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-display text-lg text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cream/60">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
