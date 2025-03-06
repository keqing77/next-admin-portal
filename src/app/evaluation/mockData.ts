import { DateRange } from "react-day-picker";
import { format } from "date-fns";

export type BusinessUnit = 'ASP' | 'CIO' | 'CTO' | 'FBI';

export interface MetricData {
  requestId: string;
  username: string;
  createTime: string;
  country: string;
  businessUnit: BusinessUnit;
  accuracy: number;
  completeness: number;
  hallucination: number;
  actionableInsights: string;
  input?: string;
  output?: string;
  responseTime?: number;
  model?: string;
}

export const mockData: MetricData[] = [
  {
    requestId: "REQ001",
    username: "john.smith",
    createTime: "2024-03-15 10:00:00",
    country: "HK",
    businessUnit: "ASP",
    accuracy: 85,
    completeness: 92,
    hallucination: 5,
    actionableInsights: "All metrics within acceptable range"
  },
  {
    requestId: "REQ002",
    username: "sarah.chen",
    createTime: "2024-03-15 11:30:00",
    country: "SG",
    businessUnit: "CIO",
    accuracy: 78,
    completeness: 88,
    hallucination: 8,
    actionableInsights: "All metrics within acceptable range"
  },
  {
    requestId: "REQ003",
    username: "mike.johnson",
    createTime: "2024-03-15 09:15:00",
    country: "UK",
    businessUnit: "FBI",
    accuracy: 65,
    completeness: 60,
    hallucination: 2,
    actionableInsights: "All metrics within acceptable range"
  },
  {
    requestId: "REQ004",
    username: "alex.wong",
    createTime: "2024-03-15 13:45:00",
    country: "HK",
    businessUnit: "CTO",
    accuracy: 82,
    completeness: 89,
    hallucination: 6,
    actionableInsights: "All metrics within acceptable range"
  },
  {
    requestId: "REQ005",
    username: "emma.liu",
    createTime: "2024-03-15 14:20:00",
    country: "SG",
    businessUnit: "ASP",
    accuracy: 87,
    completeness: 91,
    hallucination: 4,
    actionableInsights: "All metrics within acceptable range"
  }
];
