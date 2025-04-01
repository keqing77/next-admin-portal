"use client";

import * as React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { CardContent } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";

// 使用指定的颜色方案：浅蓝、深蓝、浅绿和紫色
const COLORS = ["#61AFFE", "#254E77", "#6FCF97", "#9B51E0"];

const timeSavedData = [
  { type: "Issues", timeSaved: 275, fill: COLORS[0] },
  { type: "Controls", timeSaved: 200, fill: COLORS[1] },
  { type: "Actions", timeSaved: 287, fill: COLORS[2] },
  { type: "Root Causes", timeSaved: 173, fill: COLORS[3] },
];

const chartConfig = {
  timeSaved: {
    label: "Time Saved",
  },
  type: {
    label: "Type",
  },
} satisfies ChartConfig;

export function ROI({ compact = false }: { compact?: boolean }) {
  const totalTimeSaved = React.useMemo(() => {
    return timeSavedData.length > 0
      ? timeSavedData.reduce((acc, curr) => acc + curr.timeSaved, 0)
      : 0;
  }, []);

  // 自定义tooltip内容
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded shadow-md">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value} hours`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <CardContent className="flex flex-col justify-center h-full p-0">
      <div className="text-center">
        <div className="pt-1 text-gray-500">Time Saved</div>
      </div>
      <div className={`w-full ${compact ? "h-[150px]" : "h-[300px]"}`}>
        {timeSavedData.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <p className="text-lg font-medium">No Data Available</p>
              <p className="text-sm">No time saved data to display.</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={timeSavedData}
                dataKey="timeSaved"
                nameKey="type"
                cx="50%"
                cy="50%"
                innerRadius={compact ? 40 : 60}
                outerRadius={compact ? 70 : 90}
                paddingAngle={2}
                startAngle={90}
                endAngle={-270}
                label={false}
              >
                {timeSavedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    strokeWidth={1}
                  />
                ))}
              </Pie>

              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <tspan
                  x="50%"
                  y="50%"
                  style={{
                    fontSize: compact ? "18px" : "24px",
                    fontWeight: "bold",
                    fill: "currentColor",
                  }}
                >
                  {totalTimeSaved.toLocaleString()}
                </tspan>
                <tspan
                  x="50%"
                  y={compact ? "58%" : "60%"}
                  style={{
                    fontSize: "12px",
                    fill: "currentColor",
                    opacity: 0.7,
                  }}
                >
                  Total Hours
                </tspan>
              </text>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </CardContent>
  );
}
