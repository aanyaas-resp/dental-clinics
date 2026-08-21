"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/**
 * Calendar — shadcn/ui's canonical Calendar component (react-day-picker
 * under the hood), restyled with this project's forest/gold palette.
 * Used on /book for appointment date selection.
 */
function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-semibold text-ink font-display",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 inline-flex items-center justify-center rounded-md",
          "text-ink/60 hover:bg-sand hover:text-forest transition-colors"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-ink/40 rounded-md w-9 font-normal text-[0.75rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-sand first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
        ),
        day: cn(
          "h-9 w-9 p-0 font-normal inline-flex items-center justify-center rounded-md",
          "text-ink hover:bg-sand hover:text-forest transition-colors aria-selected:opacity-100"
        ),
        day_selected:
          "bg-forest text-cream hover:bg-forest hover:text-cream focus:bg-forest focus:text-cream",
        day_today: "border border-forest/40 font-semibold text-forest",
        day_outside: "text-ink/30 opacity-50",
        day_disabled: "text-ink/25 opacity-40 hover:bg-transparent cursor-not-allowed",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
