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
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ChartLine } from "@/components/shared/chart-line";
import { ChartBar } from "@/components/shared/chart-bar";
import { ChartArea } from "@/components/shared/chart-area";
import { ChartPie } from "@/components/shared/chart-pie";

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

// Add sample data for charts
const modelEvaluationData = [
  { date: "2024-03-01", accuracy: 85, completeness: 82, hallucination: 8 },
  { date: "2024-03-02", accuracy: 88, completeness: 85, hallucination: 7 },
  { date: "2024-03-03", accuracy: 82, completeness: 78, hallucination: 12 },
  // ... more data
];

const responseTimeData = [
  { date: "2024-03-01", time: 1200 },
  { date: "2024-03-02", time: 1100 },
  { date: "2024-03-03", time: 1500 },
  // ... more data
];

const costData = [
  { date: "2024-03-01", cost: 250 },
  { date: "2024-03-02", cost: 300 },
  { date: "2024-03-03", cost: 280 },
  // ... more data
];

const requestData = [
  { date: "2024-03-01", requests: 150 },
  { date: "2024-03-02", requests: 180 },
  { date: "2024-03-03", requests: 200 },
  // ... more data
];

// Add these constants near the top of the file, after other constants
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
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

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
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.value} value={dept.value}>
                  {dept.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
