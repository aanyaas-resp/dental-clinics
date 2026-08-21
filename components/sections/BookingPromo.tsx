import Image from "next/image";
import { CalendarCheck, Clock3, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";

const POINTS = [
  { icon: CalendarCheck, text: "Pick a date and time slot in a couple of taps" },
  { icon: Clock3, text: "Morning and evening slots available" },
  { icon: PhoneCall, text: "The clinic calls to confirm every request" },
];

export function BookingPromo() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal variant="slide-right" className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl2 shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1100&q=80"
              alt="Dental appointment scheduling"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 92vw, 45vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal variant="slide-left" className="order-1 lg:order-2">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-forest">
            Skip the phone tag
          </p>
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            Book your appointment online
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/65">
            Choose the treatment, a date, and a time slot that works for
            you — the clinic reviews every request and calls to confirm,
            so you never lose your spot.
          </p>

          <ul className="mt-8 space-y-4">
            {POINTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-ink/75">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand text-forest">
                  <Icon size={16} />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <Button href="/book" variant="primary" className="mt-9">
            Book an appointment
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
