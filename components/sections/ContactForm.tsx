"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { CLINIC } from "@/lib/constants";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const text = [
      `Hi, I'm ${name || "a patient"}.`,
      phone && `My phone number is ${phone}.`,
      message || "I'd like to book a dental visit.",
    ]
      .filter(Boolean)
      .join(" ");

    const url = `${CLINIC.whatsappHref}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl2 border border-line bg-cream p-6 shadow-soft sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-ink"
          >
            Your name
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rohan Deshmukh"
            className="w-full rounded-lg border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-forest"
          />
        </div>

        <div className="sm:col-span-1">
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold text-ink"
          >
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
            className="w-full rounded-lg border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-forest"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-semibold text-ink"
          >
            What do you need help with?
          </label>
          <textarea
            id="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us briefly — e.g. tooth pain, a broken tooth, an implant consultation..."
            className="w-full resize-none rounded-lg border border-line bg-cream px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-forest"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:bg-forest-dark hover:-translate-y-0.5 sm:w-auto"
      >
        Send via WhatsApp
        <Send size={16} />
      </button>

      <p className="mt-4 text-xs text-ink/45">
        This opens WhatsApp with your details pre-filled so you can send it
        directly to the clinic.
      </p>
    </form>
  );
}
