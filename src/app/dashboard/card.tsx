import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROI } from "./roi";

export const DashboardCard = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <section className="lg:col-span-4">
        <h2 className="text-xl font-bold mb-4">Adoption and Usage</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 h-[200px]">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Queryies Processed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">919</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Erratic Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">31</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Feedback Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.18</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Queries in{" "}
                <span className="text-red-400 font-bold">RED</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">38 / 138</div>
              <p className="text-xs font-semibold">with Feedback provided</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="lg:col-span-1">
        <h2 className="text-xl font-bold mb-4">Impact and ROI</h2>
        <Card className="h-[calc(100%-40px)]">
          <ROI compact={true} />
        </Card>
      </section>
    </div>
  );
};
