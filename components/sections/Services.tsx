import { SERVICES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function Services({ limit }: { limit?: number }) {
  const list = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Treatments"
              title="Dental care under one roof"
              description="From routine check-ups to dental implants, treatment is planned around what your teeth actually need."
            />
          </Reveal>
          {limit && (
            <Button href="/services" variant="ghost" icon={<ArrowRight size={16} />}>
              View all services
            </Button>
          )}
        </div>

        <Reveal stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
