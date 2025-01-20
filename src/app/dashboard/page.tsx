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

export default function DashboardPage() {
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

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
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Model Evaluation</CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={modelEvaluationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine
                  y={70}
                  stroke="#8884d8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  label={{
                    value: "Accuracy Threshold (70%)",
                    fill: "#8884d8",
                    position: "right",
                    dy: -10, // 向上偏移
                  }}
                />
                <ReferenceLine
                  y={70}
                  stroke="#82ca9d"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  label={{
                    value: "Completeness Threshold (70%)",
                    fill: "#82ca9d",
                    position: "right",
                    dy: 10, // 向下偏移
                  }}
                />
                <ReferenceLine
                  y={10}
                  stroke="#ffc658"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  label={{
                    value: "Hallucination Threshold (10%)",
                    fill: "#ffc658",
                    position: "right",
                  }}
                />
                <Bar dataKey="accuracy" fill="#8884d8" name="Accuracy" />
                <Bar
                  dataKey="completeness"
                  fill="#82ca9d"
                  name="Completeness"
                />
                <Bar
                  dataKey="hallucination"
                  fill="#ffc658"
                  name="Hallucination"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Response Time by Date</CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="time"
                  stroke="#8884d8"
                  name="Response Time (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Total Costs</CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke="#82ca9d"
                  name="Cost ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Number of Requests</CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={requestData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="#ffc658"
                  name="Number of Requests"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
