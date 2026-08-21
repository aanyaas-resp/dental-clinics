// Central place for verified clinic details.
// Only factual, provided information lives here — no invented
// qualifications, awards, testimonials, or treatment-outcome claims.

export const CLINIC = {
  name: "Shriram Dental Clinic & Implant Center",
  shortName: "Shriram Dental",
  addressLine1: "CIDCO N-2",
  addressLine2: "Chhatrapati Sambhajinagar, Maharashtra",
  fullAddress: "CIDCO N-2, Chhatrapati Sambhajinagar, Maharashtra",
  phone: "8788267331",
  phoneDisplay: "+91 87882 67331",
  phoneHref: "tel:+918788267331",
  whatsappHref: "https://wa.me/918788267331",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Shriram+Dental+Clinic+%26+Implant+Center+CIDCO+N-2+Chhatrapati+Sambhajinagar+Maharashtra",
};

export const SITE_URL = "https://www.shriramdentalclinic.in";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
};

// Standard dental-care categories. Descriptions are kept general —
// no specific numbers, outcomes, or claims are stated.
export const SERVICES: Service[] = [
  {
    slug: "dental-implants",
    title: "Dental Implants",
    short: "Fixed, natural-feeling replacements for missing teeth.",
    description:
      "Titanium implants placed to support a crown, bridge, or denture — a long-term option for replacing one or several missing teeth.",
    icon: "Anchor",
  },
  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    short: "Relieving pain and saving the natural tooth.",
    description:
      "Treatment of infected or damaged tooth pulp to relieve pain and preserve the natural tooth wherever possible.",
    icon: "Activity",
  },
  {
    slug: "braces-aligners",
    title: "Braces & Clear Aligners",
    short: "Straightening teeth with traditional or clear options.",
    description:
      "Orthodontic correction of crowded, gapped, or misaligned teeth using metal braces or clear aligners, based on what suits the case.",
    icon: "AlignCenter",
  },
  {
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    short: "Smile design, veneers, and shade correction.",
    description:
      "Improving the appearance of teeth through veneers, bonding, contouring, and whitening, planned around your smile.",
    icon: "Sparkles",
  },
  {
    slug: "crowns-bridges-dentures",
    title: "Crowns, Bridges & Dentures",
    short: "Restoring shape, bite, and missing teeth.",
    description:
      "Fixed and removable restorations that rebuild damaged teeth or replace missing ones, matched to your bite and jaw.",
    icon: "Layers",
  },
  {
    slug: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    short: "Gentle dental care for children.",
    description:
      "Preventive and restorative dental care for children, in a setting intended to keep young patients comfortable.",
    icon: "Baby",
  },
  {
    slug: "teeth-whitening",
    title: "Teeth Whitening",
    short: "In-clinic shade correction for a brighter smile.",
    description:
      "Professional whitening to lighten tooth shade, carried out under supervision for a controlled, even result.",
    icon: "Sun",
  },
  {
    slug: "oral-surgery",
    title: "Oral Surgery & Extractions",
    short: "Extractions and minor surgical procedures.",
    description:
      "Simple and surgical extractions, including wisdom tooth removal, carried out with attention to comfort and aftercare.",
    icon: "Stethoscope",
  },
  {
    slug: "general-preventive-dentistry",
    title: "General & Preventive Care",
    short: "Check-ups, cleaning, and cavity treatment.",
    description:
      "Routine examinations, scaling and cleaning, and fillings — the ongoing care that keeps small problems from becoming big ones.",
    icon: "ShieldCheck",
  },
];

export const CLINIC_HIGHLIGHTS = [
  {
    icon: "MapPin",
    title: "Easy to find",
    text: "Located in CIDCO N-2, Chhatrapati Sambhajinagar — a familiar neighbourhood address, not a hard-to-reach clinic.",
  },
  {
    icon: "PhoneCall",
    title: "Direct access to the clinic",
    text: "Call or WhatsApp the clinic directly to ask questions or book a visit — no call centre in between.",
  },
  {
    icon: "Anchor",
    title: "Implant-focused practice",
    text: "The clinic's name reflects its focus: dental implants alongside general and cosmetic dental care.",
  },
  {
    icon: "Users",
    title: "Care for the whole family",
    text: "From children's dentistry to full mouth rehabilitation, appointments are planned around each patient's needs.",
  },
];

// Describes an actual real-world sequence (a first visit),
// so numbering here communicates genuine order.
export const VISIT_STEPS = [
  {
    step: "01",
    title: "Call or WhatsApp the clinic",
    text: "Reach out to check timings and share what you need help with.",
  },
  {
    step: "02",
    title: "Visit for a consultation",
    text: "Come in for an examination so the dentist can understand your case.",
  },
  {
    step: "03",
    title: "Discuss a treatment plan",
    text: "Review the recommended treatment, options, and next steps together.",
  },
  {
    step: "04",
    title: "Begin your treatment",
    text: "Start treatment on a schedule that works for you.",
  },
];

// Placeholder gallery imagery — replace with real photographs of the
// clinic, equipment, and (with consent) the team before launch.
export const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
    alt: "Modern dental clinic treatment room",
  },
  {
    src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=80",
    alt: "Dental instruments arranged for a procedure",
  },
  {
    src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
    alt: "Dental treatment chair in a clinic",
  },
  {
    src: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&q=80",
    alt: "Dentist examining a patient",
  },
  {
    src: "https://images.unsplash.com/photo-1541604193435-73ce30a4b826?w=1200&q=80",
    alt: "Close-up of a healthy smile",
  },
  {
    src: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=1200&q=80",
    alt: "Reception area of a dental clinic",
  },
];
