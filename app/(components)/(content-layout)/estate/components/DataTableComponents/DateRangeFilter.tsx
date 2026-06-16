"use client";
import {
  filterByDateRange,
} from "../../lib/dateFilters";
import React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

export default function DateRangeFilter({
  data,
  onFilter,
  setIsSearch,
  className,
}: {
  data: any[];
  onFilter: any;
  setIsSearch: any;
  className?: string;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });

  const handleChange = (selectedDate: any) => {
    setDate(selectedDate);
    setIsSearch(false);

    const startDate = selectedDate.from;
    const endDate = selectedDate.to;

    const filteredData = filterByDateRange(data, startDate, endDate);
    onFilter(filteredData);
  };

  return (
    <div className={cn("grid gap-2 bg-white text-black w-full sm:w-auto", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full sm:w-[300px] justify-start text-left font-normal bg-white text-black border-gray-300 hover:bg-gray-100",
              !date && "text-gray-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-black" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0 bg-white text-black border border-gray-200"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(value) => handleChange(value)}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}