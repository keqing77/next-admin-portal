"use client";

import React, { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, ReferenceLine } from "recharts";

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
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";

const dailyData = [
  { date: "2024-06-01", accuracy: 85, completeness: 82, hallucination: 8 },
  { date: "2024-06-02", accuracy: 88, completeness: 85, hallucination: 7 },
  { date: "2024-06-03", accuracy: 82, completeness: 78, hallucination: 12 },
  { date: "2024-06-04", accuracy: 86, completeness: 80, hallucination: 9 },
  { date: "2024-06-05", accuracy: 84, completeness: 83, hallucination: 8 },
  { date: "2024-06-06", accuracy: 87, completeness: 84, hallucination: 6 },
  { date: "2024-06-07", accuracy: 89, completeness: 86, hallucination: 7 },
];

const monthlyData = [
  { date: "2024-01-01", accuracy: 83, completeness: 80, hallucination: 9 },
  { date: "2024-02-01", accuracy: 85, completeness: 82, hallucination: 8 },
  { date: "2024-03-01", accuracy: 86, completeness: 83, hallucination: 7 },
  { date: "2024-04-01", accuracy: 84, completeness: 81, hallucination: 8 },
  { date: "2024-05-01", accuracy: 87, completeness: 84, hallucination: 6 },
  { date: "2024-06-01", accuracy: 88, completeness: 85, hallucination: 7 },
];

const yearlyData = [
  { date: "2022-01-01", accuracy: 80, completeness: 77, hallucination: 10 },
  { date: "2023-01-01", accuracy: 84, completeness: 81, hallucination: 8 },
  { date: "2024-01-01", accuracy: 88, completeness: 85, hallucination: 6 },
];

const chartConfig = {
  accuracy: {
    label: "Accuracy",
    color: "hsl(240, 60%, 70%)", // #8884d8 equivalent
  },
  completeness: {
    label: "Completeness",
    color: "hsl(145, 45%, 65%)", // #82ca9d equivalent
  },
  hallucination: {
    label: "Hallucination",
    color: "hsl(45, 100%, 67%)", // #ffc658 equivalent
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
        <CardTitle>Model Evaluation Metrics</CardTitle>
        <CardDescription>
          {timeFrame === "daily"
            ? "June 1 - June 7, 2024"
            : timeFrame === "monthly"
            ? "January - June 2024"
            : "2022 - 2024"}
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
            <ReferenceLine
              y={70}
              stroke={chartConfig.accuracy.color}
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{
                value: "Accuracy Threshold (70%)",
                fill: chartConfig.accuracy.color,
                position: "right",
                dy: -10,
              }}
            />
            <ReferenceLine
              y={70}
              stroke={chartConfig.completeness.color}
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{
                value: "Completeness Threshold (70%)",
                fill: chartConfig.completeness.color,
                position: "right",
                dy: 10,
              }}
            />
            <ReferenceLine
              y={10}
              stroke={chartConfig.hallucination.color}
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{
                value: "Hallucination Threshold (10%)",
                fill: chartConfig.hallucination.color,
                position: "right",
              }}
            />
            <Bar
              dataKey="accuracy"
              fill={chartConfig.accuracy.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="completeness"
              fill={chartConfig.completeness.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="hallucination"
              fill={chartConfig.hallucination.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
