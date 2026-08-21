import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import { CLINIC } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

export function Location() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Visit the clinic"
            title="Find us in CIDCO N-2"
            description="Reach out before you visit to confirm timings and, if needed, book a slot."
          />

          <ul className="mt-8 space-y-5">
            <li className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/[0.06] text-forest">
                <MapPin size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Address</p>
                <p className="text-sm text-ink/60">{CLINIC.fullAddress}</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/[0.06] text-forest">
                <Phone size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Phone</p>
                <a
                  href={CLINIC.phoneHref}
                  className="text-sm text-ink/60 hover:text-forest"
                >
                  {CLINIC.phoneDisplay}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/[0.06] text-forest">
                <MessageCircle size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">WhatsApp</p>
                <a
                  href={CLINIC.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink/60 hover:text-forest"
                >
                  Message the clinic
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/[0.06] text-forest">
                <Clock size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Timings</p>
                <p className="text-sm text-ink/60">
                  Call ahead to confirm today&apos;s clinic hours.
                </p>
              </div>
            </li>
          </ul>
        </Reveal>

        <Reveal className="overflow-hidden rounded-xl2 border border-line shadow-soft">
          <iframe
            title="Shriram Dental Clinic & Implant Center location map"
            src="https://www.google.com/maps?q=Shriram+Dental+Clinic+%26+Implant+Center+CIDCO+N-2+Chhatrapati+Sambhajinagar+Maharashtra&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "420px" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </Container>
    </section>
  );
}
