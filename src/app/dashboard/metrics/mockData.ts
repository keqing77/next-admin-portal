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
  // REQ001 - john.smith
  {
    requestId: "REQ001",
    metricName: "Accuracy",
    evaluationMethod: "Manual",
    timestamp: "2024-03-15T10:00:00",
    metricValue: 85,
    threshold: 70,
    actionableInsights: "NA",
    username: "john.smith",
    country: "HK",
    businessUnit: "ASP"
  },
  {
    requestId: "REQ001",
    metricName: "Completeness",
    evaluationMethod: "Manual",
    timestamp: "2024-03-15T10:00:00",
    metricValue: 92,
    threshold: 70,
    actionableInsights: "NA",
    username: "john.smith",
    country: "HK",
    businessUnit: "ASP"
  },
  {
    requestId: "REQ001",
    metricName: "Hallucination",
    evaluationMethod: "Manual",
    timestamp: "2024-03-15T10:00:00",
    metricValue: 5,
    threshold: 10,
    actionableInsights: "NA",
    username: "john.smith",
    country: "HK",
    businessUnit: "ASP"
  },
  // REQ002 - sarah.chen
  {
    requestId: "REQ002",
    metricName: "Accuracy",
    evaluationMethod: "Auto",
    timestamp: "2024-03-15T11:30:00",
    metricValue: 78,
    threshold: 70,
    actionableInsights: "NA",
    username: "sarah.chen",
    country: "SG",
    businessUnit: "CIO"
  },
  {
    requestId: "REQ002",
    metricName: "Completeness",
    evaluationMethod: "Auto",
    timestamp: "2024-03-15T11:30:00",
    metricValue: 88,
    threshold: 70,
    actionableInsights: "NA",
    username: "sarah.chen",
    country: "SG",
    businessUnit: "CIO"
  },
  {
    requestId: "REQ002",
    metricName: "Hallucination",
    evaluationMethod: "Auto",
    timestamp: "2024-03-15T11:30:00",
    metricValue: 8,
    threshold: 10,
    actionableInsights: "NA",
    username: "sarah.chen",
    country: "SG",
    businessUnit: "CIO"
  },
  // REQ003 - mike.johnson
  {
    requestId: "REQ003",
    metricName: "Accuracy",
    evaluationMethod: "Manual",
    timestamp: "2024-03-15T09:15:00",
    metricValue: 95,
    threshold: 70,
    actionableInsights: "NA",
    username: "mike.johnson",
    country: "UK",
    businessUnit: "FBI"
  },
  {
    requestId: "REQ003",
    metricName: "Completeness",
    evaluationMethod: "Manual",
    timestamp: "2024-03-15T09:15:00",
    metricValue: 90,
    threshold: 70,
    actionableInsights: "NA",
    username: "mike.johnson",
    country: "UK",
    businessUnit: "FBI"
  },
  {
    requestId: "REQ003",
    metricName: "Hallucination",
    evaluationMethod: "Manual",
    timestamp: "2024-03-15T09:15:00",
    metricValue: 2,
    threshold: 10,
    actionableInsights: "NA",
    username: "mike.johnson",
    country: "UK",
    businessUnit: "FBI"
  },
  {
    requestId: "REQ004",
    metricName: "Accuracy",
    evaluationMethod: "Auto",
    timestamp: "2024-03-15T13:45:00",
    metricValue: 82,
    threshold: 70,
    actionableInsights: "NA",
    username: "alex.wong",
    country: "HK",
    businessUnit: "CTO"
  },
  {
    requestId: "REQ004",
    metricName: "Completeness",
    evaluationMethod: "Auto",
    timestamp: "2024-03-15T13:45:00",
    metricValue: 89,
    threshold: 70,
    actionableInsights: "NA",
    username: "alex.wong",
    country: "HK",
    businessUnit: "CTO"
  },
  {
    requestId: "REQ004",
    metricName: "Hallucination",
    evaluationMethod: "Auto",
    timestamp: "2024-03-15T13:45:00",
    metricValue: 6,
    threshold: 10,
    actionableInsights: "NA",
    username: "alex.wong",
    country: "HK",
    businessUnit: "CTO"
  },
  // REQ005 - emma.liu
  {
    requestId: "REQ005",
    metricName: "Accuracy",
    evaluationMethod: "Manual",
    timestamp: "2024-03-15T14:20:00",
    metricValue: 87,
    threshold: 70,
    actionableInsights: "NA",
    username: "emma.liu",
    country: "SG",
    businessUnit: "ASP"
  },
  {
    requestId: "REQ005",
    metricName: "Completeness",
    evaluationMethod: "Manual",
    timestamp: "2024-03-15T14:20:00",
    metricValue: 91,
    threshold: 70,
    actionableInsights: "NA",
    username: "emma.liu",
    country: "SG",
    businessUnit: "ASP"
  },
  {
    requestId: "REQ005",
    metricName: "Hallucination",
    evaluationMethod: "Manual",
    timestamp: "2024-03-15T14:20:00",
    metricValue: 4,
    threshold: 10,
    actionableInsights: "NA",
    username: "emma.liu",
    country: "SG",
    businessUnit: "ASP"
  },
];
