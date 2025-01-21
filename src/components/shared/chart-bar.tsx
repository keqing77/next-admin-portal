"use client";

import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";

const dailyData = [
  { date: "2024-06-01", desktop: 186, mobile: 80 },
  { date: "2024-06-02", desktop: 305, mobile: 200 },
  { date: "2024-06-03", desktop: 237, mobile: 120 },
  { date: "2024-06-04", desktop: 173, mobile: 190 },
  { date: "2024-06-05", desktop: 209, mobile: 130 },
  { date: "2024-06-06", desktop: 214, mobile: 140 },
  { date: "2024-06-07", desktop: 225, mobile: 150 },
];

const monthlyData = [
  { date: "2024-01-01", desktop: 5860, mobile: 2500 },
  { date: "2024-02-01", desktop: 6305, mobile: 2800 },
  { date: "2024-03-01", desktop: 6237, mobile: 3120 },
  { date: "2024-04-01", desktop: 5973, mobile: 2990 },
  { date: "2024-05-01", desktop: 6209, mobile: 3130 },
  { date: "2024-06-01", desktop: 6214, mobile: 3140 },
];

const yearlyData = [
  { date: "2023-01-01", desktop: 72000, mobile: 30000 },
  { date: "2024-01-01", desktop: 78000, mobile: 34000 },
  { date: "2025-01-01", desktop: 82000, mobile: 38000 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type TimeFrame = "daily" | "monthly" | "yearly";

export function ChartBar() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("daily");

  const chartData = {
    daily: dailyData,
    monthly: monthlyData,
    yearly: yearlyData,
  }[timeFrame];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    switch (timeFrame) {
      case "daily":
        return `${date.getMonth() + 1}/${date.getDate()}`;
      case "monthly":
        return date.toLocaleString("default", { month: "short" });
      case "yearly":
        return date.getFullYear().toString();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Bar Chart - {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}{" "}
          Visitors
        </CardTitle>
        <CardDescription>
          {timeFrame === "daily"
            ? "June 1 - June 7, 2024"
            : timeFrame === "monthly"
            ? "January - June 2024"
            : "2020 - 2024"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <SegmentedControl
            value={timeFrame}
            onValueChange={(value) => setTimeFrame(value as TimeFrame)}
          >
            <SegmentedControlItem value="daily">Daily</SegmentedControlItem>
            <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
            <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
          </SegmentedControl>
        </div>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={formatDate}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="desktop"
              stackId="a"
              fill="var(--color-desktop)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill="var(--color-mobile)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this{" "}
          {timeFrame === "daily"
            ? "week"
            : timeFrame === "monthly"
            ? "month"
            : "year"}{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing {timeFrame} visitors
        </div>
      </CardFooter>
    </Card>
  );
}
