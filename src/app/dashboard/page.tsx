"use client";

import {
  CircleDollarSign,
  Activity,
  CircleX,
  MonitorCog,
  Hourglass,
  Star,
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

  return (
    <div className="flex flex-col gap-4">
      {/* Navigation Tabs */}
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex space-x-4">
            <h1 className="text-2xl font-bold">Analytics</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search..."
                value={filters.searchQuery}
                onChange={(e) =>
                  setFilters({ ...filters, searchQuery: e.target.value })
                }
                className="w-[200px]"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <div className="p-2">
                    <div className="mb-4">
                      <label className="text-sm font-medium">Countries</label>
                      {countries.map((country) => (
                        <DropdownMenuCheckboxItem
                          key={country.value}
                          checked={filters.countries.includes(country.value)}
                          onCheckedChange={(checked) => {
                            setFilters({
                              ...filters,
                              countries: checked
                                ? [...filters.countries, country.value]
                                : filters.countries.filter(
                                    (c) => c !== country.value
                                  ),
                            });
                          }}
                        >
                          {country.label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </div>
                    <div className="mb-2">
                      <label className="text-sm font-medium">Departments</label>
                      {departments.map((dept) => (
                        <DropdownMenuCheckboxItem
                          key={dept.value}
                          checked={filters.departments.includes(dept.value)}
                          onCheckedChange={(checked) => {
                            setFilters({
                              ...filters,
                              departments: checked
                                ? [...filters.departments, dept.value]
                                : filters.departments.filter(
                                    (d) => d !== dept.value
                                  ),
                            });
                          }}
                        >
                          {dept.label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <DatePickerWithRange date={date} setDate={setDate} />
            <Button variant="default">Export Data</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start h-[48px] px-4 bg-muted/50">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-background"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-background"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-background"
            >
              Reports
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-background"
            >
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Compare to:
                </span>
                <Select defaultValue="previous-month">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="previous-month">
                      Previous Month
                    </SelectItem>
                    <SelectItem value="previous-year">Previous Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

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

          <TabsContent value="analytics" className="p-6">
            <DataTable filters={filters} />
          </TabsContent>

          <TabsContent value="reports" className="p-6">
            <h2>Reports Content</h2>
          </TabsContent>

          <TabsContent value="notifications" className="p-6">
            <h2>Notifications Content</h2>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
