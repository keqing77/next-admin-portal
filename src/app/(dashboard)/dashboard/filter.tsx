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
import { format, isValid, parse, subMonths } from "date-fns";
import { CalendarIcon, Filter } from "lucide-react";
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

                {/* 过滤选项，保持不变 */}
                {/* ... 保持原始过滤器代码不变 ... */}
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
