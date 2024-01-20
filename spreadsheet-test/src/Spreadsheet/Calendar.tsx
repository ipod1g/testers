import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import * as React from "react";
import { DayPicker } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={"p-3"}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-neutral-400 rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: `
        'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-black [&:has([aria-selected].day-outside)]:bg-black/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
        ${
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        }
        `,
        day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-neutral-100 rounded-md",
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-black text-white hover:bg-black hover:text-white focus:bg-black focus:text-white rounded-md",
        day_today: "bg-neutral-400 text-white rounded-md",
        day_outside:
          "day-outside text-neutral-400 opacity-50  aria-selected:bg-neutral-500/50 aria-selected:text-neutral-400 aria-selected:opacity-30",
        day_disabled: "text-neutral-400 opacity-50",
        day_range_middle:
          "aria-selected:bg-neutral-500 aria-selected:text-neutral-500",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft fontSize="small" />,
        IconRight: () => <ChevronRight fontSize="small" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
