"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const modelCostsData = [
  {
    model: "gpt-4o-mini",
    tokens: "12.18K",
    cost: "$0.002508"
  },
  {
    model: "gemini-1.5-pro",
    tokens: "2147",
    cost: "$0.000415"
  },
  {
    model: "text-embedding-ada-002",
    tokens: "147",
    cost: "$0.000015"
  }
];

interface ChartModelCostsProps {
  className?: string;
}

export function ChartModelCosts({ className }: ChartModelCostsProps) {
  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader>
        <CardTitle>Model Usage</CardTitle>
        <div className="text-2xl font-bold">$0.002523</div>
        <div className="text-sm text-muted-foreground">Total Cost</div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="py-2">Model</th>
                <th className="py-2">Tokens</th>
                <th className="py-2 text-right">USD</th>
              </tr>
            </thead>
            <tbody>
              {modelCostsData.map((item) => (
                <tr key={item.model} className="border-t">
                  <td className="py-2">{item.model}</td>
                  <td className="py-2">{item.tokens}</td>
                  <td className="py-2 text-right">{item.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
} 