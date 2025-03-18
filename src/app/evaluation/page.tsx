"use client";

import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { subDays } from "date-fns";
import { AlertCircle, ArrowUpDown, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { mockData } from "./mockData";

export default function MetricsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedBusinessUnits, setSelectedBusinessUnits] = useState<string[]>(
    []
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [username, setUsername] = useState<string>("");

  const filteredData = mockData.filter((row) => {
    const matchesUsername =
      !username || row.username.toLowerCase().includes(username.toLowerCase());
    const matchesCountry =
      selectedCountries.length === 0 || selectedCountries.includes(row.country);
    const matchesBusinessUnit =
      selectedBusinessUnits.length === 0 ||
      selectedBusinessUnits.includes(row.businessUnit);
    return matchesUsername && matchesCountry && matchesBusinessUnit;
  });

  const toggleSelection = (
    current: string[],
    value: string,
    setter: (value: string[]) => void
  ) => {
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setter(updated);
  };

  // Add helper functions for select all and reset
  const selectAllCountries = () => {
    setSelectedCountries(["HK", "UK", "SG"]);
  };

  const resetCountries = () => {
    setSelectedCountries([]);
  };

  const selectAllBusinessUnits = () => {
    setSelectedBusinessUnits(["ASP", "CIO", "CTO", "FBI"]);
  };

  const resetBusinessUnits = () => {
    setSelectedBusinessUnits([]);
  };

  // Helper function to format selected items for display
  const formatSelectedItems = (items: string[], maxLength: number = 25) => {
    if (items.length === 0) return "All";

    const text = items.join(", ");
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="container mx-auto p-6">
      {/* <h1 className="text-2xl font-bold mb-6">Metrics Dashboard</h1> */}

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <DatePickerWithRange
          className="w-[300px]"
          value={dateRange}
          onChange={setDateRange}
        />

        <input
          type="text"
          placeholder="Filter by Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-3 py-2 border rounded-md w-[180px]"
        />

        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[180px]">
            <span className="truncate">
              {formatSelectedItems(
                selectedCountries.map((country) => {
                  switch (country) {
                    case "HK":
                      return "Hong Kong";
                    case "UK":
                      return "United Kingdom";
                    case "SG":
                      return "Singapore";
                    default:
                      return country;
                  }
                })
              )}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[180px]">
            <div className="flex justify-between px-2 py-1.5 text-sm border-b">
              <button
                onClick={selectAllCountries}
                className="text-blue-600 hover:underline"
              >
                Select All
              </button>
              <button
                onClick={resetCountries}
                className="text-red-600 hover:underline"
              >
                Reset
              </button>
            </div>
            {[
              { value: "HK", label: "Hong Kong" },
              { value: "UK", label: "United Kingdom" },
              { value: "SG", label: "Singapore" },
            ].map((country) => (
              <DropdownMenuCheckboxItem
                key={country.value}
                checked={selectedCountries.includes(country.value)}
                onCheckedChange={() =>
                  toggleSelection(
                    selectedCountries,
                    country.value,
                    setSelectedCountries
                  )
                }
                className="flex items-center gap-2 cursor-pointer"
                style={{ padding: "6px 8px" }}
              >
                <div className="w-4 h-4 border rounded flex items-center justify-center">
                  {selectedCountries.includes(country.value) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span className="flex-grow">{country.label}</span>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[180px]">
            <span className="truncate">
              {formatSelectedItems(selectedBusinessUnits)}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[180px]">
            <div className="flex justify-between px-2 py-1.5 text-sm border-b">
              <button
                onClick={selectAllBusinessUnits}
                className="text-blue-600 hover:underline"
              >
                Select All
              </button>
              <button
                onClick={resetBusinessUnits}
                className="text-red-600 hover:underline"
              >
                Reset
              </button>
            </div>
            {[
              { value: "ASP", label: "ASP" },
              { value: "CIO", label: "CIO" },
              { value: "CTO", label: "CTO" },
              { value: "FBI", label: "FBI" },
            ].map((unit) => (
              <DropdownMenuCheckboxItem
                key={unit.value}
                checked={selectedBusinessUnits.includes(unit.value)}
                onCheckedChange={() =>
                  toggleSelection(
                    selectedBusinessUnits,
                    unit.value,
                    setSelectedBusinessUnits
                  )
                }
                className="flex items-center gap-2 cursor-pointer"
                style={{ padding: "6px 8px" }}
              >
                <div className="w-4 h-4 border rounded flex items-center justify-center">
                  {selectedBusinessUnits.includes(unit.value) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span className="flex-grow">{unit.label}</span>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer">
                Request ID <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="cursor-pointer">
                Username <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="cursor-pointer">
                Create Time <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Accuracy (%)</TableHead>
              <TableHead>Completeness (%)</TableHead>
              <TableHead>Hallucination (%)</TableHead>
              <TableHead>Context Relevance</TableHead>
              <TableHead>Semantic Relevance</TableHead>
              <TableHead>Consistency</TableHead>
              <TableHead>Calculate</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => {
              const isSuccess =
                row.accuracy > 70 &&
                row.completeness > 70 &&
                row.hallucination < 10;

              return (
                <TableRow key={row.requestId}>
                  <TableCell>
                    <Link
                      href={`/dashboard/metrics/${row.requestId}`}
                      className="text-blue-600 hover:underline"
                    >
                      {row.requestId}
                    </Link>
                  </TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.createTime}</TableCell>
                  <TableCell>
                    {isSuccess ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </TableCell>
                  <TableCell>{row.accuracy}</TableCell>
                  <TableCell>{row.completeness}</TableCell>
                  <TableCell>{row.hallucination}</TableCell>
                  <TableCell>
                    {!isSuccess ? (
                      <a
                        href={`/api/reports/${row.requestId}`}
                        download
                        className="text-blue-600 hover:underline"
                      >
                        Download Report
                      </a>
                    ) : (
                      row.actionableInsights
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
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
