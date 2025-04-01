"use client";

import { HelpCircle } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircularProgress } from "./CircularProgress";

const metrics = [
  { title: "Accuracy", value: 4.3, color: "green", type: "score" },
  { title: "Completeness", value: 4.8, color: "green", type: "score" },
  { title: "Hallucination", value: 60, color: "yellow", type: "percentage" },
  { title: "Contextual Relevance", value: 4.9, color: "red", type: "score" },
  { title: "Semantic Relevance", value: 2.8, color: "red", type: "score" },
  { title: "Consistency", value: 54, color: "gray", type: "percentage" },
];

const metricsData = [
  {
    month: "Jan",
    accuracy: 4.3,
    completeness: 4.8,
    hallucination: 0.6,
    contextualRelevance: 4.9,
    semanticRelevance: 2.8,
    consistency: 0.54,
  },
  {
    month: "Feb",
    accuracy: 4.5,
    completeness: 4.7,
    hallucination: 0.5,
    contextualRelevance: 4.8,
    semanticRelevance: 3.0,
    consistency: 0.52,
  },
  {
    month: "Mar",
    accuracy: 4.6,
    completeness: 4.9,
    hallucination: 0.4,
    contextualRelevance: 4.7,
    semanticRelevance: 2.9,
    consistency: 0.5,
  },
  {
    month: "Apr",
    accuracy: 4.7,
    completeness: 4.8,
    hallucination: 0.3,
    contextualRelevance: 4.6,
    semanticRelevance: 3.1,
    consistency: 0.48,
  },
  {
    month: "May",
    accuracy: 4.8,
    completeness: 4.9,
    hallucination: 0.2,
    contextualRelevance: 4.5,
    semanticRelevance: 3.2,
    consistency: 0.46,
  },
];

// 定义每个指标的颜色
const metricColors = {
  accuracy: "#22c55e", // 绿色
  completeness: "#3b82f6", // 蓝色
  hallucination: "#eab308", // 黄色
  contextualRelevance: "#ef4444", // 红色
  semanticRelevance: "#8b5cf6", // 紫色
  consistency: "#64748b", // 灰色
};

// 定义指标名称的类型
type MetricKey =
  | "accuracy"
  | "completeness"
  | "hallucination"
  | "contextualRelevance"
  | "semanticRelevance"
  | "consistency";

// 美化指标名称的辅助函数
const formatMetricName = (name: MetricKey | string): string => {
  return name
    .replace(/([A-Z])/g, " $1") // 在大写字母前添加空格
    .replace(/^./, (str) => str.toUpperCase()); // 首字母大写
};

export function DashboardChart() {
  return (
    <section className="mt-4">
      <div className="w-full ">
        <h2 className="text-xl font-bold mb-4">
          Model Evaluation Functional Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index} className="w-full">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-sm">{metric.title}</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Information about {metric.title.toLowerCase()}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex justify-center">
                  <CircularProgress
                    value={metric.value}
                    color={metric.color}
                    type={metric.type as "score" | "percentage"}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="lg:col-span-4 my-4">
        <CardContent className="pl-2 pt-4">
          {metricsData.length === 0 ? (
            <div className="flex items-center justify-center h-[350px] text-muted-foreground">
              <div className="text-center">
                <p className="text-lg font-medium">No Data Available</p>
                <p className="text-sm">
                  There is no metrics data to display at this time.
                </p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={metricsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip
                  formatter={(value, name) => [
                    value,
                    formatMetricName(name as string),
                  ]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend formatter={(value) => formatMetricName(value)} />
                <Bar dataKey="accuracy" fill={metricColors.accuracy} />
                <Bar dataKey="completeness" fill={metricColors.completeness} />
                <Bar
                  dataKey="hallucination"
                  fill={metricColors.hallucination}
                />
                <Bar
                  dataKey="contextualRelevance"
                  fill={metricColors.contextualRelevance}
                />
                <Bar
                  dataKey="semanticRelevance"
                  fill={metricColors.semanticRelevance}
                />
                <Bar dataKey="consistency" fill={metricColors.consistency} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
