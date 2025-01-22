import { DateRange } from "react-day-picker";

export type BusinessUnit = 'ASP' | 'CIO' | 'CTO' | 'FBI';

export interface MetricData {
  requestId: string;
  metricName: string;
  evaluationMethod: string;
  timestamp: string;
  metricValue: number;
  threshold: number;
  actionableInsights: string;
  country: string;
  businessUnit: BusinessUnit;
  input?: string;
  output?: string;
  responseTime?: number;
  model?: string;
  username: string;
}

export const mockData: MetricData[] = [
  {
    requestId: "REQ001",
    metricName: "Response Time",
    evaluationMethod: "Average",
    timestamp: "2024-03-15T10:00:00",
    metricValue: 250,
    threshold: 300,
    actionableInsights: "Performance is within acceptable range",
    username: "john.smith",
    country: "HK",
    businessUnit: "ASP"
  },
  {
    requestId: "REQ002",
    metricName: "CPU Usage",
    evaluationMethod: "Peak",
    timestamp: "2024-03-15T11:30:00",
    metricValue: 85,
    threshold: 90,
    actionableInsights: "CPU usage approaching threshold, consider optimization",
    username: "sarah.chen",
    country: "SG",
    businessUnit: "CIO"
  },
  {
    requestId: "REQ003",
    metricName: "Memory Usage",
    evaluationMethod: "Average",
    timestamp: "2024-03-15T09:15:00",
    metricValue: 65,
    threshold: 80,
    actionableInsights: "Memory usage is stable",
    username: "mike.johnson",
    country: "UK",
    businessUnit: "FBI"
  },
  {
    requestId: "REQ004",
    metricName: "API Latency",
    evaluationMethod: "95th Percentile",
    timestamp: "2024-03-15T14:20:00",
    metricValue: 320,
    threshold: 300,
    actionableInsights: "API performance needs investigation",
    username: "emma.wilson",
    country: "Canada",
    businessUnit: "CTO"
  },
  {
    requestId: "REQ005",
    metricName: "Error Rate",
    evaluationMethod: "Count",
    timestamp: "2024-03-15T13:45:00",
    metricValue: 15,
    threshold: 10,
    actionableInsights: "Error rate exceeded threshold, check logs",
    username: "alex.kumar",
    country: "India",
    businessUnit: "ASP"
  },
  {
    requestId: "REQ006",
    metricName: "Database Connections",
    evaluationMethod: "Peak",
    timestamp: "2024-03-15T15:30:00",
    metricValue: 180,
    threshold: 200,
    actionableInsights: "Connection pool usage normal",
    username: "lisa.wang",
    country: "Singapore",
    businessUnit: "CIO"
  },
  {
    requestId: "REQ007",
    metricName: "Network Throughput",
    evaluationMethod: "Average",
    timestamp: "2024-03-15T16:45:00",
    metricValue: 750,
    threshold: 1000,
    actionableInsights: "Network performance is optimal",
    username: "david.miller",
    country: "Germany",
    businessUnit: "CTO"
  },
  {
    requestId: "REQ008",
    metricName: "Cache Hit Rate",
    evaluationMethod: "Percentage",
    timestamp: "2024-03-15T17:20:00",
    metricValue: 78,
    threshold: 75,
    actionableInsights: "Cache performance meeting targets",
    username: "anna.kowalski",
    country: "Poland",
    businessUnit: "ASP"
  },
  {
    requestId: "REQ009",
    metricName: "Queue Length",
    evaluationMethod: "Maximum",
    timestamp: "2024-03-15T18:10:00",
    metricValue: 45,
    threshold: 50,
    actionableInsights: "Message queue processing within limits",
    username: "carlos.garcia",
    country: "UK",
    businessUnit: "FBI"
  },
  {
    requestId: "REQ010",
    metricName: "Storage Usage",
    evaluationMethod: "Current",
    timestamp: "2024-03-15T19:00:00",
    metricValue: 82,
    threshold: 85,
    actionableInsights: "Storage capacity nearing threshold, plan expansion",
    username: "sophie.martin",
    country: "HK",
    businessUnit: "CTO"
  }
];
