"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const data = [
  { subject: "UI", score: 80 },
  { subject: "UX", score: 85 },
  { subject: "Performance", score: 90 },
  { subject: "Features", score: 75 },
  { subject: "Support", score: 88 },
];

export default function UserSatisfactionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Satisfaction</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            score: {
              label: "Satisfaction Score",
              color: "hsl(var(--chart-5))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="var(--color-score)"
                fill="var(--color-score)"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
