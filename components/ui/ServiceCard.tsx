import Link from "next/link";
import * as Icons from "lucide-react";
import type { Service } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[
    service.icon
  ] ?? Icons.Stethoscope;

  return (
    <Link
      href={`/services/${service.slug}`}
      aria-label={`Learn more about ${service.title}`}
      className="service-card group relative flex h-full flex-col rounded-xl2 border border-line bg-cream p-7 transition-all duration-300 hover:-translate-y-1 hover:border-forest/30 hover:shadow-card sm:p-8"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-forest/[0.06] text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-cream">
        <Icon size={22} strokeWidth={1.75} />
      </div>
      <h3 className="font-display text-xl text-ink">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/60">
        {service.short}
      </p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/50">
        {service.description}
      </p>
      <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
        Learn more
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </Link>
  );
}
