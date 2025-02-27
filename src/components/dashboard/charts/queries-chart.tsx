"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QueriesChartProps {
  data: Array<{
    date: string;
    total: number;
    avg: number;
    regions: {
      UK: number;
      HK: number;
      SG: number;
      CHN: number;
    };
  }>;
  className?: string;
}

export function QueriesChart({ data, className }: QueriesChartProps) {
  return (
    <div className={cn("rounded-lg border bg-card", className)}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Queries Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalQueries" stroke="#8884d8" name="Total Queries" />
              <Line type="monotone" dataKey="avgQueries" stroke="#82ca9d" name="Average Queries" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
} 