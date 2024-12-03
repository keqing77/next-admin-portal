import { subHours, format } from "date-fns";

export interface ModelRequest {
  id: string;
  model: string;
  parameters: number;
  requestTime: number;
  status: "success" | "error";
  timestamp: Date;
}

export function generateMockData(count: number): ModelRequest[] {
  const models = ["GPT-3.5", "GPT-4", "BERT", "T5"];
  const now = new Date();

  return Array.from({ length: count }, (_, i) => ({
    id: `req-${i + 1}`,
    model: models[Math.floor(Math.random() * models.length)],
    parameters: Math.floor(Math.random() * 100000000000) + 100000000,
    requestTime: Math.random() * 1000 + 100,
    status: Math.random() > 0.05 ? "success" : "error",
    timestamp: subHours(now, i),
  }));
}

export function calculateMetrics(data: ModelRequest[]) {
  const totalRequests = data.length;
  const errorCount = data.filter((req) => req.status === "error").length;
  const errorRate = (errorCount / totalRequests) * 100;
  const avgRequestTime =
    data.reduce((sum, req) => sum + req.requestTime, 0) / totalRequests;

  return {
    totalRequests,
    errorRate: errorRate.toFixed(2),
    avgRequestTime: avgRequestTime.toFixed(2),
  };
}

export function generateChartData(data: ModelRequest[]) {
  const hourlyData: { [hour: string]: { total: number; errors: number } } = {};

  data.forEach((req) => {
    const hour = format(req.timestamp, "yyyy-MM-dd HH:00");
    if (!hourlyData[hour]) {
      hourlyData[hour] = { total: 0, errors: 0 };
    }
    hourlyData[hour].total++;
    if (req.status === "error") {
      hourlyData[hour].errors++;
    }
  });

  return Object.entries(hourlyData).map(([hour, data]) => ({
    hour,
    errorRate: (data.errors / data.total) * 100,
  }));
}
