"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Filter } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export const DashboardFilter = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });

  const [filters, setFilters] = useState({
    market: [],
    valueStream: [],
    requestType: [],
  });

  return (
    <section>
      <div className="flex flex-wrap items-center gap-4 p-4">
        <div className="flex items-center gap-3">
          {/* Date Range Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
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
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {/* Filter Button */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Filters</h4>
                  <p className="text-sm text-muted-foreground">
                    Select the filters to apply to your dashboard
                  </p>
                </div>
                <Separator />

                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Markets" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Markets</SelectLabel>
                          <SelectItem value="hk">Hong Kong</SelectItem>
                          <SelectItem value="uk">UK</SelectItem>
                          <SelectItem value="chn">China</SelectItem>
                          <SelectItem value="sg">Singapore</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-1">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Value Stream" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Value Stream</SelectLabel>
                          <SelectItem value="abc">ABC</SelectItem>
                          <SelectItem value="edf">EDF</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-1">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Request Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Request Type</SelectLabel>
                          <SelectItem value="issue">Issue</SelectItem>
                          <SelectItem value="control">Control</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button size="sm">Apply Filters</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="ml-auto">
          {/* 可以在这里添加其他按钮，如导出报告等 */}
        </div>
      </div>
    </section>
  );
};
