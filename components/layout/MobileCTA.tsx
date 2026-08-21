"use client";

import { Phone, MessageCircle, CalendarDays } from "lucide-react";
import { CLINIC } from "@/lib/constants";

export function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-cream shadow-[0_-4px_20px_rgba(16,36,34,0.08)] sm:hidden">
      <a
        href={CLINIC.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-1.5 border-r border-line py-4 text-xs font-semibold text-forest"
      >
        <MessageCircle size={16} />
        WhatsApp
      </a>
      <a
        href="/book"
        className="flex flex-1 items-center justify-center gap-1.5 border-r border-line py-4 text-xs font-semibold text-forest"
      >
        <CalendarDays size={16} />
        Book
      </a>
      <a
        href={CLINIC.phoneHref}
        className="flex flex-1 items-center justify-center gap-1.5 bg-forest py-4 text-xs font-semibold text-cream"
      >
        <Phone size={16} />
        Call Now
      </a>
    </div>
  );
}
