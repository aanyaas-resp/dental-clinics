"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageSquarePlus } from "lucide-react";
import { CLINIC, NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EnquiryModal } from "@/components/sections/EnquiryModal";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation. Adjusting state during render
  // (rather than in an Effect) avoids an extra render-then-effect pass —
  // see https://react.dev/learn/you-might-not-need-an-effect
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Hide the public navbar on any admin route
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isCompact = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-0 transition-all duration-500 ease-out">
      <div
        className={cn(
          "w-full transition-all duration-500 ease-out",
          isCompact
            ? "mt-3 w-[calc(100%-20px)] overflow-hidden rounded-[12px] border border-white/30 bg-cream/70 shadow-soft backdrop-blur-xl supports-[backdrop-filter]:bg-cream/50"
            : "mt-0 w-full rounded-none border border-transparent bg-transparent"
        )}
      >
        <Container
          className={cn(
            "flex items-center justify-between transition-all duration-500 ease-out",
            isCompact ? "h-16" : "h-20"
          )}
        >
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-forest">
              <Image
                src="/images/logo.png"
                alt={`${CLINIC.name} logo`}
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </span>
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-display text-[1.05rem] text-ink">
                Shriram Dental
              </span>
              <span className="hidden truncate text-[0.65rem] uppercase tracking-[0.18em] text-ink/50 min-[380px]:block">
                Clinic &amp; Implant Center
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide text-ink/70 transition-colors hover:text-forest",
                  pathname === link.href && "text-forest"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href={CLINIC.phoneHref}
              className="flex items-center gap-2 text-sm font-semibold text-ink/80 hover:text-forest"
            >
              <Phone size={16} />
              {CLINIC.phoneDisplay}
            </a>
            <EnquiryModal
              trigger={
                <button className="flex items-center gap-2 rounded-full border border-forest/20 px-5 py-3 text-sm font-semibold text-forest transition-colors hover:border-forest/50">
                  <MessageSquarePlus size={16} />
                  Enquire
                </button>
              }
            />
            <Button href="/book" variant="primary">
              Book Appointment
            </Button>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </Container>

        {open && (
          <div className="border-t border-line/50 md:hidden">
            <Container className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium text-ink/80 hover:bg-sand hover:text-forest",
                    pathname === link.href && "text-forest"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={CLINIC.phoneHref}
                className="mt-2 flex items-center gap-2 rounded-lg bg-sand px-3 py-3 text-base font-semibold text-forest"
              >
                <Phone size={18} />
                {CLINIC.phoneDisplay}
              </a>
              <Link
                href="/book"
                className="flex items-center gap-2 rounded-lg bg-forest px-3 py-3 text-base font-semibold text-cream"
              >
                Book Appointment
              </Link>
            </Container>
          </div>
        )}
      </div>
    </header>
  );
}