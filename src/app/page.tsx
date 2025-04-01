"use client";

import { DashboardCard } from "./dashboard/card";
import { DashboardChart } from "./dashboard/chart";
import { DashboardFilter } from "./dashboard/filter";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Filter menu */}
      <DashboardFilter />
      {/* Adopiton and Usage & Impact and ROI */}
      <DashboardCard />
      {/* Model Evaluation Functional Metrics */}
      <DashboardChart />
    </div>
  );
}
