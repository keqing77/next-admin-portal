"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Success", value: 85 },
  { name: "Failure", value: 15 },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"];

export default function RequestStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            success: {
              label: "Success",
              color: COLORS[0],
            },
            failure: {
              label: "Failure",
              color: COLORS[1],
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
