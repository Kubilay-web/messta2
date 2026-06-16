"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-white text-black", className)}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-black",
        nav: "space-x-1 flex items-center",

        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-white text-black border-gray-300 p-0 opacity-70 hover:opacity-100 hover:bg-gray-100"
        ),

        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",

        table: "w-full border-collapse space-y-1",
        head_row: "flex",

        head_cell:
          "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",

        row: "flex w-full mt-2",

        cell:
          "h-9 w-9 text-center text-sm p-0 relative first:rounded-l-md last:rounded-r-md",

        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal text-black hover:bg-gray-100"
        ),

        day_selected:
          "bg-black text-white hover:bg-black focus:bg-black",

        day_today: "border border-black",

        day_outside:
          "text-gray-400 aria-selected:bg-gray-200 aria-selected:text-black",

        day_disabled: "text-gray-300 opacity-50",

        day_range_middle:
          "bg-gray-200 text-black",

        day_range_end:
          "bg-black text-white",

        day_hidden: "invisible",

        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4 text-black" />,
        IconRight: () => <ChevronRight className="h-4 w-4 text-black" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };