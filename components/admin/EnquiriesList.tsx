import { format, parseISO } from "date-fns";
import { Phone } from "lucide-react";

type Enquiry = {
  id: string;
  name: string;
  phone: string;
  message: string | null;
  created_at: string;
  status: string;
};

export function EnquiriesList({ enquiries }: { enquiries: Enquiry[] }) {
  if (enquiries.length === 0) {
    return (
      <p className="rounded-xl2 border border-line bg-cream p-8 text-center text-sm text-ink/50">
        No enquiries yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {enquiries.map((e) => (
        <div key={e.id} className="rounded-xl2 border border-line bg-cream p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-ink">{e.name}</p>
              <a href={`tel:${e.phone}`} className="mt-0.5 flex items-center gap-1.5 text-xs text-forest hover:underline">
                <Phone size={12} /> {e.phone}
              </a>
            </div>
            <span className="whitespace-nowrap text-[0.65rem] text-ink/40">
              {format(parseISO(e.created_at), "d MMM, h:mm a")}
            </span>
          </div>
          {e.message && <p className="mt-3 text-sm text-ink/65">{e.message}</p>}
        </div>
      ))}
    </div>
  );
}
