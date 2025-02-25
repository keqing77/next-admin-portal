"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerWithRangeProps {
  className?: string;
  date: { from: Date; to: Date };
  setDate: (value: { from: Date; to: Date } | ((prevState: { from: Date; to: Date }) => { from: Date; to: Date })) => void;
  timeRange?: string;
  setTimeRange?: (value: string) => void;
  timeRanges?: Array<{ value: string; label: string }>;
}

export function DatePickerWithRange({
  className,
  date,
  setDate,
  timeRange,
  setTimeRange,
  timeRanges = [],
}: DatePickerWithRangeProps) {
  // 添加处理时间范围选择的函数
  const handleTimeRangeChange = (value: string) => {
    if (setTimeRange) {
      setTimeRange(value);
      
      // 根据选择的时间范围自动设置日期
      const today = new Date();
      let fromDate = new Date();
      
      switch(value) {
        case "today":
          // 今天
          setDate({ from: today, to: today });
          break;
        case "yesterday":
          // 昨天
          fromDate.setDate(today.getDate() - 1);
          setDate({ from: fromDate, to: fromDate });
          break;
        case "7days":
          // 过去7天
          fromDate.setDate(today.getDate() - 6);
          setDate({ from: fromDate, to: today });
          break;
        case "30days":
          // 过去30天
          fromDate.setDate(today.getDate() - 29);
          setDate({ from: fromDate, to: today });
          break;
        case "thisMonth":
          // 本月
          fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
          setDate({ from: fromDate, to: today });
          break;
        case "lastMonth":
          // 上个月
          const lastMonth = today.getMonth() - 1;
          const year = lastMonth < 0 ? today.getFullYear() - 1 : today.getFullYear();
          const month = lastMonth < 0 ? 11 : lastMonth;
          fromDate = new Date(year, month, 1);
          const toDate = new Date(year, month + 1, 0);
          setDate({ from: fromDate, to: toDate });
          break;
        // 可以根据需要添加更多的时间范围选项
      }
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[350px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "PPP")} - {format(date.to, "PPP")}
                </>
              ) : (
                format(date.from, "PPP")
              )
            ) : (
              <span>Select date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={{
              from: date?.from,
              to: date?.to,
            }}
            onSelect={(selectedDate) => {
              if (selectedDate?.from && selectedDate?.to) {
                setDate({
                  from: selectedDate.from,
                  to: selectedDate.to,
                });
              }
            }}
            numberOfMonths={2}
          />
          
          {/* 添加时间范围选择器 */}
          {timeRange !== undefined && setTimeRange && timeRanges.length > 0 && (
            <div className="p-3 border-t">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Preset time ranges</h4>
                <Select
                  value={timeRange}
                  onValueChange={handleTimeRangeChange}
                >
                  <SelectTrigger className="w-full">
                    <Clock className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}