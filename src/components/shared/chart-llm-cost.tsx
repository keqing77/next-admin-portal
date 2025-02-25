"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "2023-10-01", HK: 300, UK: 450, SG: 280, CHN: 520, Total: 1550, Average: 387.5 },
  { date: "2023-10-02", HK: 320, UK: 430, SG: 310, CHN: 490, Total: 1550, Average: 387.5 },
  { date: "2023-10-03", HK: 340, UK: 440, SG: 290, CHN: 510, Total: 1580, Average: 395 },
  { date: "2023-10-04", HK: 280, UK: 420, SG: 300, CHN: 530, Total: 1530, Average: 382.5 },
  { date: "2023-10-05", HK: 310, UK: 460, SG: 320, CHN: 500, Total: 1590, Average: 397.5 },
  { date: "2023-10-06", HK: 330, UK: 450, SG: 330, CHN: 480, Total: 1590, Average: 397.5 },
  { date: "2023-10-07", HK: 350, UK: 470, SG: 340, CHN: 510, Total: 1670, Average: 417.5 },
];

const lineColors = {
  HK: "#FF6384",
  UK: "#36A2EB",
  SG: "#FFCE56",
  CHN: "#4BC0C0",
  Total: "#9966FF",
  Average: "#FF9F40",
};

const regionNames = {
  HK: "Hong Kong",
  UK: "United Kingdom",
  SG: "Singapore",
  CHN: "China",
  Total: "Total",
  Average: "Average"
};

interface ChartLLMCostProps {
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const date = new Date(label).toLocaleDateString();
    
    return (
      <div className="bg-background border rounded-md shadow-sm p-2 text-sm">
        <p className="font-medium mb-1">{date}</p>
        {payload.map((entry: any) => (
          <div key={entry.dataKey} className="flex items-center gap-1.5">
            <div 
              className="w-3 h-3" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-medium">
              {regionNames[entry.dataKey as keyof typeof regionNames]}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ChartLLMCost({ className }: ChartLLMCostProps) {
  const regions = ["HK", "UK", "SG", "CHN", "Total", "Average"];

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">LLM Cost</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
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
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                iconType="square" 
                iconSize={10}
                wrapperStyle={{ paddingTop: 10 }}
              />
              {regions.map((region) => (
                <Line
                  key={region}
                  type="monotone"
                  dataKey={region}
                  stroke={lineColors[region as keyof typeof lineColors]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 