import { Phone, MessageCircle } from "lucide-react";
import { CLINIC } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { Reveal } from "@/components/animations/Reveal";

export function CTABanner() {
  return (
    <section className="bg-sand py-16 sm:py-20">
      <Container>
        <Reveal variant="zoom" className="relative overflow-hidden rounded-xl2 bg-forest px-6 py-14 text-center sm:px-16 sm:py-16">
          {/* Optional low-res background video — add /public/videos/clinic-loop.mp4
              to activate; fails silently and shows the dot pattern below until then. */}
          <BackgroundVideo src="/videos/clinic-loop.mp4" className="opacity-20" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <h2 className="relative font-display text-3xl text-cream sm:text-4xl">
            Ready to get your teeth looked at?
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/65 sm:text-base">
            Call or WhatsApp {CLINIC.shortName} in CIDCO N-2 and the clinic
            will help you find a convenient time.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href={CLINIC.phoneHref} variant="secondary" icon={<Phone size={16} />}>
              Call {CLINIC.phoneDisplay}
            </Button>
            <Button
              href={CLINIC.whatsappHref}
              variant="ghostInvert"
              external
              icon={<MessageCircle size={16} />}
            >
              WhatsApp us
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
