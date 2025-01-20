"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { mockData, MetricData } from "./mockData";
import { DateRange } from "react-day-picker";

export default function MetricsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [country, setCountry] = useState<string>("");
  const [businessUnit, setBusinessUnit] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Metrics Dashboard</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <DatePickerWithRange
          className="w-[300px]"
          value={dateRange}
          onChange={setDateRange}
        />

        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HK">Hong Kong</SelectItem>
            <SelectItem value="UK">United Kingdom</SelectItem>
            <SelectItem value="SG">Singapore</SelectItem>
          </SelectContent>
        </Select>

        <Select value={businessUnit} onValueChange={setBusinessUnit}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Business Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ASP">ASP</SelectItem>
            <SelectItem value="CIO">CIO</SelectItem>
            <SelectItem value="CTO">CTO</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer">
                Request ID <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead>Metric Name</TableHead>
              <TableHead>Evaluation Method</TableHead>
              <TableHead className="cursor-pointer">
                Timestamp <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead>Metric Value</TableHead>
              <TableHead>Threshold</TableHead>
              <TableHead>Actionable Insights</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((row) => (
              <TableRow key={row.requestId}>
                <TableCell>
                  <Link
                    href={`/dashboard/metrics/${row.requestId}`}
                    className="text-blue-600 hover:underline"
                  >
                    {row.requestId}
                  </Link>
                </TableCell>
                <TableCell>{row.metricName}</TableCell>
                <TableCell>{row.evaluationMethod}</TableCell>
                <TableCell>
                  {new Date(row.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{row.metricValue}</TableCell>
                <TableCell>{row.threshold}</TableCell>
                <TableCell>{row.actionableInsights}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="text-sm">Page {currentPage}</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
