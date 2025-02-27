"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LLMCostChartProps {
  data: Array<{
    date: string;
    total: number;
    avg: number;
  }>;
}

export function LLMCostChart({ data }: LLMCostChartProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>LLM Cost Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Cost" />
            <Line type="monotone" dataKey="avg" stroke="#82ca9d" name="Average Cost" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 