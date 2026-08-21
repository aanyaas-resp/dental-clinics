import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as Icons from "lucide-react";
import { ArrowLeft, Phone, MessageCircle, CalendarDays } from "lucide-react";
import { CLINIC, SERVICES } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal } from "@/components/animations/Reveal";
import { CTABanner } from "@/components/sections/CTABanner";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

// Pre-render every service page at build time.
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

function getService(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: "Service not found" };
  }

  return {
    title: service.title,
    description: `${service.description} Available at ${CLINIC.name} in CIDCO N-2, Chhatrapati Sambhajinagar.`,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const Icon =
    (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon] ??
    Icons.Stethoscope;

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(
    0,
    3
  );

  return (
    <>
      <section className="bg-sand pb-16 pt-32 sm:pb-24 sm:pt-40">
        <Container className="max-w-2xl">
          <Reveal>
            <Link
              href="/services"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-dark"
            >
              <ArrowLeft size={15} />
              All services
            </Link>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-forest text-cream">
              <Icon size={26} strokeWidth={1.75} />
            </div>
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Services
            </span>
            <h1 className="font-display text-4xl leading-[1.12] text-ink sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink/65 sm:text-lg">
              {service.description}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <Container className="max-w-2xl">
          <Reveal className="rounded-xl2 border border-line bg-sand/40 p-7 sm:p-9">
            <h2 className="font-display text-xl text-ink">
              What this treats
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/60 sm:text-base">
              {service.short}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-ink/60 sm:text-base">
              Every case is different, so the dentist will confirm whether
              this is the right treatment for you at a consultation before
              anything is planned. Call or WhatsApp the clinic if you have
              questions beforehand.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/book" variant="primary" icon={<CalendarDays size={16} />}>
                Book Appointment
              </Button>
              <Button
                href={CLINIC.phoneHref}
                variant="secondary"
                icon={<Phone size={16} />}
              >
                Call {CLINIC.phoneDisplay}
              </Button>
              <Button
                href={CLINIC.whatsappHref}
                variant="ghost"
                external
                icon={<MessageCircle size={16} />}
              >
                WhatsApp
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {otherServices.length > 0 && (
        <section className="bg-sand py-20 sm:py-28">
          <Container>
            <Reveal>
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Also treated here
              </span>
              <h2 className="font-display text-3xl leading-[1.15] text-ink sm:text-4xl">
                Other services you may need
              </h2>
            </Reveal>

            <Reveal
              stagger
              className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {otherServices.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </Reveal>
          </Container>
        </section>
      )}

      <CTABanner />
    </>
  );
}
