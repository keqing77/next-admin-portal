"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for the steps - matching with the main page's request IDs
const mockStepsData = {
  req_100001: [
    {
      step: "Step 1",
      inputDescription: "User input validation",
      responseTimestamp: "2024-03-20 10:30:15",
      responseTime: "0.8s",
      model: "GPT-4",
    },
    {
      step: "Step 2",
      inputDescription: "Context processing",
      responseTimestamp: "2024-03-20 10:30:16",
      responseTime: "1.2s",
      model: "Claude-3",
    },
    {
      step: "Step 3",
      inputDescription: "Response generation",
      responseTimestamp: "2024-03-20 10:30:18",
      responseTime: "1.5s",
      model: "GPT-4",
    },
  ],
  "REQ-002": [
    {
      step: "Step 1",
      inputDescription: "Initial prompt analysis",
      responseTimestamp: "2024-03-20 11:15:10",
      responseTime: "0.9s",
      model: "Claude-3",
    },
    {
      step: "Step 2",
      inputDescription: "Data enrichment",
      responseTimestamp: "2024-03-20 11:15:12",
      responseTime: "1.1s",
      model: "GPT-4",
    },
    {
      step: "Step 3",
      inputDescription: "Final output generation",
      responseTimestamp: "2024-03-20 11:15:14",
      responseTime: "1.3s",
      model: "Claude-3",
    },
  ],
  // Add more mock data entries matching your main page's request IDs
};

export default function MetricDetail() {
  // Just use REQ-001 data for now
  const steps = mockStepsData["req_100001"];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link
          href="/dashboard/metrics"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Metrics
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Request Details - req_100001</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Step</TableHead>
              <TableHead>Input Description</TableHead>
              <TableHead>Response Timestamp</TableHead>
              <TableHead>Response Time</TableHead>
              <TableHead>Model</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {steps.map((step, index) => (
              <TableRow key={index}>
                <TableCell>{step.step}</TableCell>
                <TableCell>{step.inputDescription}</TableCell>
                <TableCell>{step.responseTimestamp}</TableCell>
                <TableCell>{step.responseTime}</TableCell>
                <TableCell>{step.model}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
