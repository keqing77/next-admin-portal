"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimeSavedChartProps {
  data: Array<{
    types: {
      Issues: number;
      "Root Causes": number;
      Actions: number;
      Controls: number;
    };
    total: number;
  }>;
  className?: string;
}

export function TimeSavedChart({ data, className }: TimeSavedChartProps) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const pieData = Object.entries(data[0].types).map(([name, value]) => ({
    name,
    value
  }));

  function formatTime(seconds: number) {
    if (seconds >= 3600) {
      return `${Math.round(seconds / 3600)} hours`;
    } else if (seconds >= 60) {
      return `${Math.round(seconds / 60)} mins`;
    }
    return `${seconds} seconds`;
  }

  return (
    <div className={cn("rounded-lg border bg-card", className)}>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Time Saved by Type</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex flex-col">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-2">
            Total time saved: <span className="font-bold">{formatTime(data[0].total)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 