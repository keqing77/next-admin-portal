"use client";

import {
  CircleDollarSign,
  Activity,
  CircleX,
  MonitorCog,
  Hourglass,
  Star,
  Clock,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import { useState } from "react";
import { ChartLine } from "@/components/shared/chart-line";
import { ChartBar } from "@/components/shared/chart-bar";
import { ChartArea } from "@/components/shared/chart-area";
import { ChartPie } from "@/components/shared/chart-pie";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { Input } from "@/components/ui/input";

const statsCards = [
  {
    title: "Total Cost",
    value: "$40,500",
    icon: CircleDollarSign,
    trend: "up",
  },
  {
    title: "Number of Request",
    value: "3,012",
    icon: Activity,
    trend: "up",
  },
  {
    title: "Avg Time on processing",
    value: "1m:16s",
    icon: Hourglass,
    trend: "down",
  },
  {
    title: "Avg Manual Star Score",
    value: "3.18/5",
    icon: Star,
    trend: "up",
  },
  {
    title: "No of Erratic Reported",
    value: "2",
    icon: CircleX,
    trend: "up",
  },
  {
    title: "Metric Exceeding Thresholds",
    value: "12",
    icon: MonitorCog,
    trend: "up",
  },
];

const countries = [
  { value: "HK", label: "Hong Kong" },
  { value: "UK", label: "United Kingdom" },
  { value: "SG", label: "Singapore" },
  { value: "ARG", label: "Argentina" },
];

const departments = [
  { value: "ASP", label: "ASP" },
  { value: "CIO", label: "CIO" },
  { value: "CTO", label: "CTO" },
  { value: "FBI", label: "FBI" },
];

const timeRanges = [
  { value: "5m", label: "5 min" },
  { value: "30m", label: "30 min" },
  { value: "1h", label: "1 hour" },
  { value: "3h", label: "3 hour" },
  { value: "24h", label: "24 hour" },
  { value: "7d", label: "7 days" },
  { value: "1M", label: "1 month" },
  { value: "3M", label: "3 months" },
  { value: "1y", label: "1 year" },
];

const tableData = [
  {
    name: "Response Time",
    application: "RMC",
    date: "2024-03-20 - 2025-02-18",
    amount: "1m:16s",
  },
  {
    name: "Number of Request",
    application: "RMC",
    date: "2024-03-20 - 2025-02-18",
    amount: "3,012",
  },
  {
    name: "Total Cost",
    application: "RMC",
    date: "2024-03-20 - 2025-02-18",
    amount: "$40,500",
  },
  {
    name: "Avg Time on processing",
    application: "RMC",
    date: "2024-03-20 - 2025-02-18",
    amount: "1m:16s",
  },
  {
    name: "Avg Manual Star Score",
    application: "RMC",
    date: "2024-03-20 - 2025-02-18",
    amount: "3.18/5",
  },
  {
    name: "No of Erratic Reported",
    application: "RMC",
    date: "2024-03-20 - 2025-02-18",
    amount: "2",
  },
  {
    name: "Metric Exceeding Thresholds",
    application: "RMC",
    date: "2024-03-20 - 2025-02-18",
    amount: "12",
  },
];

export default function DashboardPage() {
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const [filters, setFilters] = useState({
    timeRange: "24h",
    countries: [] as string[],
    departments: [] as string[],
    searchQuery: "",
  });

  const [tempFilters, setTempFilters] = useState({
    countries: [] as string[],
    departments: [] as string[],
  });

  const [open, setOpen] = useState(false);

  const handleApplyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      countries: tempFilters.countries,
      departments: tempFilters.departments,
    }));
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="border-b bg-background/50">
        <Tabs defaultValue="charts">
          <TabsList className="w-full justify-start h-[48px] px-4 bg-background border-b">
            <TabsTrigger
              value="charts"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Charts
            </TabsTrigger>
            <TabsTrigger
              value="rawdata"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              RawData
            </TabsTrigger>
          </TabsList>

          <div className="flex h-16 items-center px-4">
            {/* Left aligned items */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <DatePickerWithRange date={date} setDate={setDate} />
                <Select
                  value={filters.timeRange}
                  onValueChange={(value) =>
                    setFilters({ ...filters, timeRange: value })
                  }
                >
                  <SelectTrigger className="w-[120px]">
                    <Clock className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      {(filters.countries.length > 0 ||
                        filters.departments.length > 0) && (
                        <span className="rounded-full bg-primary w-2 h-2" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <div className="p-2">
                      <div className="mb-4">
                        <label className="text-sm font-medium">Countries</label>
                        {countries.map((country) => (
                          <DropdownMenuCheckboxItem
                            key={country.value}
                            checked={tempFilters.countries.includes(
                              country.value
                            )}
                            onCheckedChange={(checked) => {
                              setTempFilters((prev) => ({
                                ...prev,
                                countries: checked
                                  ? [...prev.countries, country.value]
                                  : prev.countries.filter(
                                      (c) => c !== country.value
                                    ),
                              }));
                            }}
                          >
                            {country.label}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </div>
                      <div className="mb-4">
                        <label className="text-sm font-medium">
                          Departments
                        </label>
                        {departments.map((dept) => (
                          <DropdownMenuCheckboxItem
                            key={dept.value}
                            checked={tempFilters.departments.includes(
                              dept.value
                            )}
                            onCheckedChange={(checked) => {
                              setTempFilters((prev) => ({
                                ...prev,
                                departments: checked
                                  ? [...prev.departments, dept.value]
                                  : prev.departments.filter(
                                      (d) => d !== dept.value
                                    ),
                              }));
                            }}
                          >
                            {dept.label}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </div>
                      <div className="flex justify-end gap-2 mt-4 border-t pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setTempFilters({ countries: [], departments: [] });
                            setFilters((prev) => ({
                              ...prev,
                              countries: [],
                              departments: [],
                            }));
                            setOpen(false);
                          }}
                        >
                          Clear
                        </Button>
                        <Button size="sm" onClick={handleApplyFilters}>
                          Apply
                        </Button>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Right aligned button - using ml-auto to push it to the right */}
            <Button variant="default" className="ml-auto">
              Export Data
            </Button>
          </div>

          <TabsContent value="charts" className="p-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {statsCards.map((card) => (
                <Card key={card.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {card.title}
                    </CardTitle>
                    <card.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid gap-4 md:grid-cols-2 mt-6">
              <ChartBar />
              <ChartLine />
              <ChartArea />
              <ChartPie />
            </div>
          </TabsContent>

          <TabsContent value="rawdata" className="p-6">
            <div className="rounded-md border bg-card">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Name
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Application
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Date
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <td className="p-4">{row.name}</td>
                      <td className="p-4">{row.application}</td>
                      <td className="p-4">{row.date}</td>
                      <td className="p-4">{row.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
