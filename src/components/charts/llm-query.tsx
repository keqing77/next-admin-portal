import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  addDays,
  differenceInDays,
  endOfDay,
  format,
  parseISO,
  startOfDay,
} from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// 模拟数据生成函数（生成最近60天的数据）
const generateMockData = () => {
  const today = new Date();
  return Array.from({ length: 60 }).map((_, i) => {
    const date = addDays(today, -59 + i);
    return {
      date: date.toISOString(),
      HK: Math.floor(Math.random() * 800 + 200),
      UK: Math.floor(Math.random() * 800 + 200),
      SG: Math.floor(Math.random() * 800 + 200),
      CHN: Math.floor(Math.random() * 800 + 200),
    };
  });
};

// 智能计算X轴刻度
const calculateTicks = (start: Date, end: Date) => {
  const totalDays = differenceInDays(end, start);

  // 根据时间跨度自动调整刻度密度
  let interval = 1;
  if (totalDays > 30) interval = 7; // 每月
  else if (totalDays > 14) interval = 3; // 每3天
  else if (totalDays > 7) interval = 2; // 每2天

  const ticks = [];
  let current = startOfDay(start);

  while (current <= end) {
    ticks.push(current);
    current = addDays(current, interval);
  }

  // 确保包含结束日期
  if (!ticks.some((t) => t.getTime() === end.getTime())) {
    ticks.push(endOfDay(end));
  }

  return ticks;
};

export default function ChartPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date(), -6),
    to: new Date(),
  });

  // 预生成所有数据（模拟数据库）
  const allData = generateMockData();
  console.log(allData, "allData");

  // 过滤数据
  const filteredData = allData.filter((d) => {
    const date = parseISO(d.date);
    return (
      date >= startOfDay(dateRange.from!) && date <= endOfDay(dateRange.to!)
    );
  });

  // 计算X轴刻度
  const xTicks =
    dateRange.from && dateRange.to
      ? calculateTicks(dateRange.from, dateRange.to)
      : [];

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>LLM Cost Trends</CardTitle>
      </CardHeader>
      <div className="p-6 mx-auto">
        <div className="mb-6 flex justify-center">
          {/* <DatePickerWithRange
            date={{ from: dateRange.from as Date, to: dateRange.to as Date }}
            onSelect={(date) => {
              if (date) {
                setDateRange(date);
              }
            }}
          /> */}
        </div>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(parseISO(date), "MM/dd")}
                ticks={xTicks.map((t) => t.toISOString())}
              />
              <YAxis
                domain={[0, 1000]}
                tickCount={6}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                labelFormatter={(label) =>
                  format(parseISO(label), "yyyy-MM-dd")
                }
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                }}
              />

              <Bar dataKey="HK" fill="#8884d8" name="Hong Kong" />
              <Bar dataKey="UK" fill="#82ca9d" name="United Kingdom" />
              <Bar dataKey="SG" fill="#ffc658" name="Singapore" />
              <Bar dataKey="CHN" fill="#ff7300" name="China" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </div>
    </Card>
  );
}
