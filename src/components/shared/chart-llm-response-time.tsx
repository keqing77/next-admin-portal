"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 模拟数据
const data = [
  { date: "2023-10-01", responseTime: 480 },
  { date: "2023-10-02", responseTime: 520 },
  { date: "2023-10-03", responseTime: 450 },
  { date: "2023-10-04", responseTime: 560 },
  { date: "2023-10-05", responseTime: 530 },
  { date: "2023-10-06", responseTime: 490 },
  { date: "2023-10-07", responseTime: 510 },
  { date: "2023-10-08", responseTime: 470 },
  { date: "2023-10-09", responseTime: 540 },
  { date: "2023-10-10", responseTime: 500 },
];

interface ChartLLMResponseTimeProps {
  className?: string;
}

export function ChartLLMResponseTime({ className }: ChartLLMResponseTimeProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">LLM Response Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                domain={[0, 'dataMax + 100']}
                tickCount={7}
                tickFormatter={(value) => `${value} ms`}
              />
              <Tooltip 
                formatter={(value: number) => [`${value} ms`, "Response Time"]}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleDateString();
                }}
              />
              <Area
                type="monotone"
                dataKey="responseTime"
                stroke="#8884d8"
                fill="url(#colorGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 