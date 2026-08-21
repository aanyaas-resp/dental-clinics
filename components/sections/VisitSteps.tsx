import { VISIT_STEPS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

export function VisitSteps() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Your first visit"
            title="What happens when you get in touch"
            align="center"
          />
        </Reveal>

        <Reveal
          stagger
          className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VISIT_STEPS.map((item, i) => (
            <div key={item.step} className="relative">
              <span className="font-display text-4xl text-forest/15">
                {item.step}
              </span>
              <h3 className="mt-3 font-display text-lg text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                {item.text}
              </p>
              {i < VISIT_STEPS.length - 1 && (
                <span className="absolute right-[-1.1rem] top-3 hidden h-px w-8 bg-line lg:block" />
              )}
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
