"use client";

import { Card, AreaChart, Title } from "@tremor/react";

const data = [
  {
    date: "2024-01-01",
    "Response Time": 250,
  },
  // ... 添加更多数据点
];

export default function RequestTimeChart() {
  return (
    <div className="w-full overflow-x-auto">
      <AreaChart
        className="h-72 min-w-[400px]"
        data={data}
        index="date"
        categories={["Response Time"]}
        colors={["blue"]}
        valueFormatter={(value) => `${value}ms`}
        yAxisWidth={40}
        showAnimation={true}
        showLegend={false}
        showGridLines={false}
      />
    </div>
  );
}
