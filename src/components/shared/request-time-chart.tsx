"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { name: "Homepage", time: 120 },
  { name: "Login", time: 80 },
  { name: "Dashboard", time: 200 },
  { name: "Profile", time: 150 },
  { name: "Settings", time: 100 },
];

export default function RequestTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Time (ms)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            time: {
              label: "Request Time (ms)",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="time" fill="var(--color-time)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
