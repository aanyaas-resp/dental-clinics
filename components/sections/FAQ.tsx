"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

// General dental-care information — factual and educational, not
// clinic-specific claims or outcomes. Keeps with the file's existing
// no-fabrication rule (see lib/constants.ts).
const FAQS = [
  {
    q: "How often should I visit the dentist?",
    a: "Most dentists recommend a check-up and cleaning every six months, though some people benefit from more frequent visits depending on their oral health.",
  },
  {
    q: "Is a root canal painful?",
    a: "Modern root canal treatment is done under local anaesthesia, so the procedure itself is generally no more uncomfortable than getting a filling.",
  },
  {
    q: "How long do dental implants last?",
    a: "With good oral hygiene and regular check-ups, dental implants can last many years — the exact timeline depends on the individual case.",
  },
  {
    q: "At what age can a child see a dentist?",
    a: "Dental associations generally recommend a child's first dental visit by their first birthday, or within six months of their first tooth appearing.",
  },
  {
    q: "Do I need X-rays at every visit?",
    a: "Not necessarily — X-ray frequency depends on your oral health history and risk factors, and your dentist will advise what's appropriate for you.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-sand py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal variant="blur" className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-forest">
            Good to know
          </p>
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            Frequently asked questions
          </h2>
        </Reveal>

        <Reveal variant="fade-up" stagger delay={0.1} className="mt-10 space-y-3">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-xl2 border border-line bg-cream"
              >
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-ink sm:px-6 sm:py-5 sm:text-base"
                  aria-expanded={open}
                >
                  {item.q}
                  <ChevronDown
                    size={18}
                    className={cn(
                      "shrink-0 text-forest transition-transform duration-300",
                      open && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink/65 sm:px-6">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
