"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import { CLINIC, NAV_LINKS, SERVICES } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  // Hide the public footer on any admin route
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-line bg-forest text-cream/80">
      <Container className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1">
          <span className="font-display text-xl text-cream">
            Shriram Dental
          </span>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cream/50">
            Clinic &amp; Implant Center
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
            Dental care for the CIDCO N-2 neighbourhood — general dentistry,
            implants, and everything in between.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-cream/50">
            Explore
          </h4>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/70 transition-colors hover:text-gold-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-cream/50">
            Services
          </h4>
          <ul className="mt-5 space-y-3">
            {SERVICES.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <Link
                  href="/services"
                  className="text-sm text-cream/70 transition-colors hover:text-gold-light"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-cream/50">
            Visit or call
          </h4>
          <ul className="mt-5 space-y-4 text-sm text-cream/70">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold-light" />
              <span>{CLINIC.fullAddress}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-gold-light" />
              <a href={CLINIC.phoneHref} className="hover:text-gold-light">
                {CLINIC.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle size={18} className="shrink-0 text-gold-light" />
              <a
                href={CLINIC.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-light"
              >
                WhatsApp the clinic
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-gold-light" />
              <span>Call ahead to confirm today&apos;s clinic timings.</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-cream/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <p>
            © {year} {CLINIC.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p>CIDCO N-2, Chhatrapati Sambhajinagar, Maharashtra</p>
            <Link href="/admin/login" className="text-cream/40 hover:text-gold-light">
              Staff login
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}