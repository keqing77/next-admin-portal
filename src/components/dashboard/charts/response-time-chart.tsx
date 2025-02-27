"use client";

import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResponseTimeChartProps {
  data: { date: string; value: number; }[];
  className?: string;
}

export function ResponseTimeChart({ data, className }: ResponseTimeChartProps) {
  return (
    <div className={cn("rounded-lg border bg-card", className)}>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>LLM Response Time</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis dataKey="value" name="Response Time (ms)" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Response Time" data={data} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
} 