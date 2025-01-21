"use client";

import * as React from "react";
import { Label, Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

const chartData = [
  { region: "HK", visitors: 275, fill: "hsl(0, 70%, 50%)" },
  { region: "UK", visitors: 200, fill: "hsl(210, 70%, 50%)" },
  { region: "SG", visitors: 287, fill: "hsl(120, 70%, 50%)" },
  { region: "AU", visitors: 173, fill: "hsl(45, 70%, 50%)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  HK: {
    label: "Hong Kong",
    color: "hsl(0, 70%, 50%)", // 红色
  },
  UK: {
    label: "United Kingdom",
    color: "hsl(210, 70%, 50%)", // 蓝色
  },
  SG: {
    label: "Singapore",
    color: "hsl(120, 70%, 50%)", // 绿色
  },
  AU: {
    label: "Australia",
    color: "hsl(45, 70%, 50%)", // 黄色
  },
} satisfies ChartConfig;

export function ChartPie() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Visitors by Region</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (payload?.[0]?.payload) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg bg-background p-2 shadow-md">
                      <p className="font-semibold">
                        {
                          chartConfig[data.region as keyof typeof chartConfig]
                            .label
                        }
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Visitors: {data.visitors.toLocaleString()}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="region"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              strokeWidth={2}
              stroke="var(--background)"
            >
              {chartData.map((entry) => (
                <Cell key={entry.region} fill={entry.fill} />
              ))}
            </Pie>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Visitors
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {Object.entries(chartConfig)
            .filter(([key]) => key !== "visitors")
            .map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{
                    backgroundColor:
                      "color" in config ? config.color : undefined,
                  }}
                />
                <span>{config.label}</span>
              </div>
            ))}
        </div>
      </CardFooter>
    </Card>
  );
}
