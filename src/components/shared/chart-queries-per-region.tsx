"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  Bar, 
  CartesianGrid, 
  Legend, 
  Line, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  ComposedChart
} from "recharts";

const data = [
  {
    date: "2023-07-01",
    totalQueries: 250,
    avgQueries: 120,
    UK: 80,
    HK: 70,
    SG: 60,
    CHN: 40
  },
  {
    date: "2023-07-02",
    totalQueries: 220,
    avgQueries: 110,
    UK: 65,
    HK: 75,
    SG: 45,
    CHN: 35
  },
  {
    date: "2023-07-03",
    totalQueries: 280,
    avgQueries: 140,
    UK: 90,
    HK: 80,
    SG: 65,
    CHN: 45
  },
  {
    date: "2023-07-04",
    totalQueries: 260,
    avgQueries: 130,
    UK: 85,
    HK: 70,
    SG: 60,
    CHN: 45
  },
  {
    date: "2023-07-05",
    totalQueries: 290,
    avgQueries: 145,
    UK: 95,
    HK: 85,
    SG: 65,
    CHN: 45
  }
];

interface ChartQueriesPerRegionProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ChartQueriesPerRegion({ className, ...props }: ChartQueriesPerRegionProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Total/Average Queries Per Region</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              scale="band" 
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }} 
            />
            <YAxis 
              domain={[0, 300]} 
              tickCount={4} 
              label={{  angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value, name) => {
                if (name === "totalQueries") return [`${value}`, "Total Queries"];
                if (name === "avgQueries") return [`${value}`, "Average Queries"];
                return [`${value}`, name];
              }}
              labelFormatter={(label) => {
                const date = new Date(label);
                return `${date.toLocaleDateString()}`;
              }}
            />
            {/* <Legend /> */}
            <Bar dataKey="UK" fill="#8884d8" />
            <Bar dataKey="HK" fill="#82ca9d" />
            <Bar dataKey="SG" fill="#ffc658" />
            <Bar dataKey="CHN" fill="#ff8042" />
            <Line 
              type="monotone" 
              dataKey="totalQueries" 
              stroke="#0066cc" 
              strokeWidth={2} 
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="avgQueries" 
              stroke="#00cc66" 
              strokeWidth={2} 
              dot={{ r: 4 }}
              activeDot={{ r: 6 }} 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 