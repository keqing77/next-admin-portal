"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  ComposedChart
} from "recharts";



interface ChartQueriesPerUserProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ChartQueriesPerUser({ className, ...props }: ChartQueriesPerUserProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Total/Average Queries Per User</CardTitle>
      </CardHeader>
      <CardContent>
    
      </CardContent>
    </Card>
  );
} 