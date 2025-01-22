"use client";

import {
  CircleDollarSign,
  Activity,
  CircleX,
  MonitorCog,
  Hourglass,
  Star,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import { useState } from "react";
import { ChartLine } from "@/components/shared/chart-line";
import { ChartBar } from "@/components/shared/chart-bar";
import { ChartArea } from "@/components/shared/chart-area";
import { ChartPie } from "@/components/shared/chart-pie";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statsCards = [
  {
    title: "Total Cost",
    value: "$40,500",
    icon: CircleDollarSign,
    trend: "up",
  },
  {
    title: "Number of Request",
    value: "3,012",
    icon: Activity,
    trend: "up",
  },
  {
    title: "Avg Time on processing",
    value: "1m:16s",
    icon: Hourglass,
    trend: "down",
  },
  {
    title: "Avg Manual Star Score",
    value: "3.18/5",
    icon: Star,
    trend: "up",
  },
  {
    title: "No of Erratic Reported",
    value: "2",
    icon: CircleX,
    trend: "up",
  },
  {
    title: "Metric Exceeding Thresholds",
    value: "12",
    icon: MonitorCog,
    trend: "up",
  },
];

const countries = [
  { value: "HK", label: "Hong Kong" },
  { value: "UK", label: "United Kingdom" },
  { value: "SG", label: "Singapore" },
  { value: "ARG", label: "Argentina" },
];

const departments = [
  { value: "ASP", label: "ASP" },
  { value: "CIO", label: "CIO" },
  { value: "CTO", label: "CTO" },
  { value: "FBI", label: "FBI" },
];

export default function DashboardPage() {
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  // Add these state variables after the date state
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  // Replace the two Select components with DropdownMenu components
  const formatSelectedItems = (items: string[]) => {
    if (items.length === 0) return "";
    return items.join(", ");
  };

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <DatePickerWithRange date={date} setDate={setDate} />
          <Select defaultValue="24h">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30m">Last 30 minutes</SelectItem>
              <SelectItem value="1h">Last 1 hour</SelectItem>
              <SelectItem value="3h">Last 3 hours</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background w-[180px]">
              <span className="truncate">
                {selectedCountries.length > 0
                  ? formatSelectedItems(selectedCountries)
                  : "Filter by Country"}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px]">
              <div className="flex justify-between px-2 py-1.5 text-sm border-b">
                <button
                  onClick={() =>
                    setSelectedCountries(countries.map((c) => c.value))
                  }
                  className="text-blue-600 hover:underline"
                >
                  Select All
                </button>
                <button
                  onClick={() => setSelectedCountries([])}
                  className="text-red-600 hover:underline"
                >
                  Reset
                </button>
              </div>
              {countries.map((country) => (
                <DropdownMenuCheckboxItem
                  key={country.value}
                  checked={selectedCountries.includes(country.value)}
                  onCheckedChange={() => {
                    const updated = selectedCountries.includes(country.value)
                      ? selectedCountries.filter((c) => c !== country.value)
                      : [...selectedCountries, country.value];
                    setSelectedCountries(updated);
                  }}
                >
                  {country.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background w-[180px]">
              <span className="truncate">
                {selectedDepartments.length > 0
                  ? formatSelectedItems(selectedDepartments)
                  : "Filter by Department"}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px]">
              <div className="flex justify-between px-2 py-1.5 text-sm border-b">
                <button
                  onClick={() =>
                    setSelectedDepartments(departments.map((d) => d.value))
                  }
                  className="text-blue-600 hover:underline"
                >
                  Select All
                </button>
                <button
                  onClick={() => setSelectedDepartments([])}
                  className="text-red-600 hover:underline"
                >
                  Reset
                </button>
              </div>
              {departments.map((dept) => (
                <DropdownMenuCheckboxItem
                  key={dept.value}
                  checked={selectedDepartments.includes(dept.value)}
                  onCheckedChange={() => {
                    const updated = selectedDepartments.includes(dept.value)
                      ? selectedDepartments.filter((d) => d !== dept.value)
                      : [...selectedDepartments, dept.value];
                    setSelectedDepartments(updated);
                  }}
                >
                  {dept.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChartBar />
        <ChartLine />
        <ChartArea />
        <ChartPie />
      </div>
    </div>
  );
}
