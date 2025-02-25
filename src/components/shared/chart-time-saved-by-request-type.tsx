"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ChartTimeSavedByRequestTypeProps {
  className?: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const initialData = [
  { name: "Issues", value: 65, hours: 125 },
  { name: "Root Causes", value: 45, hours: 87 },
  { name: "Actions", value: 30, hours: 59 },
  { name: "Controls", value: 15, hours: 27 }
];

export function ChartTimeSavedByRequestType({ className }: ChartTimeSavedByRequestTypeProps) {
  const [data, setData] = useState(initialData);
  const [timeRange, setTimeRange] = useState("7d");

  const totalHours = data.reduce((acc, item) => acc + item.hours, 0);
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Total Time Saved by Request Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name]}
                labelFormatter={() => 'Percentage'}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-center text-sm text-muted-foreground">
          Total time saved: <span className="font-semibold text-primary">{totalHours} hours</span>
        </div>
      </CardContent>
    </Card>
  );
} 