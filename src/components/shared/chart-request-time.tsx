"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const timeRanges = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

// Sample data - replace with your actual data
const generateData = (range: string) => {
  const data = [];
  const now = new Date();
  const points = range === "daily" ? 7 : range === "weekly" ? 4 : 6;

  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(now);
    if (range === "daily") date.setDate(date.getDate() - i);
    else if (range === "weekly") date.setDate(date.getDate() - i * 7);
    else date.setMonth(date.getMonth() - i);

    data.push({
      date: date.toLocaleDateString(),
      success: Math.floor(Math.random() * 1000) + 500,
      error: Math.floor(Math.random() * 100) + 10,
    });
  }
  return data;
};

interface ChartRequestTimeProps {
  className?: string;
}

export function ChartRequestTime({ className }: ChartRequestTimeProps) {
  const [timeRange, setTimeRange] = useState("daily");
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Move data generation to client-side only
    setChartData(generateData(timeRange));
  }, [timeRange]);

  // Calculate totals from chartData instead of data
  const totals = chartData.reduce(
    (acc, curr) => {
      acc.success += curr.success;
      acc.error += curr.error;
      return acc;
    },
    { success: 0, error: 0 }
  );

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Request</CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="font-medium">
                Total Requests:{" "}
                {(totals.success + totals.error).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <Select
          value={timeRange}
          onValueChange={(value) => setTimeRange(value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <div className="flex justify-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#10b981]" />
              <span className="text-sm">Success</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
              <span className="text-sm">Error</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData} // Use chartData instead of data
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="success"
                stroke="#10b981"
                strokeWidth={2}
                dot={true}
                name="Success"
              />
              <Line
                type="monotone"
                dataKey="error"
                stroke="#ef4444"
                strokeWidth={2}
                dot={true}
                name="Error"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
