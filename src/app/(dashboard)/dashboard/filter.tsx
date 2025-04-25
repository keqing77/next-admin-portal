"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isValid, parse, subMonths } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

export const DashboardFilter = () => {
  // 默认设置为三个月范围：今天到三个月前
  const [date, setDate] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 3),
    to: new Date(),
  });

  // 字符串形式的日期，用于输入框
  const [startDateStr, setStartDateStr] = useState("");
  const [endDateStr, setEndDateStr] = useState("");

  // 初始化和日期变化时更新字符串
  useEffect(() => {
    if (date?.from) {
      setStartDateStr(format(date.from, "yyyy-MM-dd"));
    }
    if (date?.to) {
      setEndDateStr(format(date.to, "yyyy-MM-dd"));
    }
  }, [date]);

  // 处理输入框日期变化
  const handleStartDateChange = (value: string) => {
    setStartDateStr(value);
    const parsed = parse(value, "yyyy-MM-dd", new Date());
    if (isValid(parsed)) {
      setDate((prev) => ({
        from: parsed,
        to: prev?.to,
      }));
    }
  };

  const handleEndDateChange = (value: string) => {
    setEndDateStr(value);
    const parsed = parse(value, "yyyy-MM-dd", new Date());
    if (isValid(parsed)) {
      setDate((prev) => ({
        from: prev?.from,
        to: parsed,
      }));
    }
  };

  return (
    <section>
      <div className="flex flex-wrap items-center gap-4 p-4">
        <div className="flex items-center gap-3">
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
              <div className="p-4 border-b">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDateStr}
                      onChange={(e) => handleStartDateChange(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDateStr}
                      onChange={(e) => handleEndDateChange(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(newRange) => {
                  setDate(newRange);
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </section>
  );
};
