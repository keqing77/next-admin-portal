import { NextResponse } from "next/server";
import { ApiResponse } from "@/lib/utils";

interface RegionData {
  date: string;
  totalQueries: number;
  avgQueries: number;
  regions: {
    UK: number;
    HK: number;
    SG: number;
    CHN: number;
  };
}

interface TimeSeriesData {
  date: string;
  value: number;
}

interface DashboardResponse {
  summary: {
    totalQueries: number;
    avgTimeTaken: string;
    totalTimeSaved: string;
    totalErratic: number;
    totalExceedThreshold: number;
    avgStarRating: number;
    roi: number;
    platformCost: number;
    totalCostSavings: number;
  };
  charts: {
    queriesPerRegion: RegionData[];
    queriesPerUser: TimeSeriesData[];
    queriesPerGBGF: TimeSeriesData[];
    timeSavedByRequestType: TimeSeriesData[];
    llmCost: TimeSeriesData[];
    llmResponseTime: TimeSeriesData[];
  };
}

// 生成图表数据的辅助函数
function generateTimeSeriesData(days: number) {
  return Array.from({ length: days }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      value: Math.floor(Math.random() * 1000) + 200,
    };
  }).reverse();
}

export async function GET() {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  const dashboardData: DashboardResponse = {
    summary: {
      totalQueries: 3012,
      avgTimeTaken: "1m:35s",
      totalTimeSaved: "234h:25m:16",
      totalErratic: 2,
      totalExceedThreshold: 112,
      avgStarRating: 3.18,
      roi: 0.29,
      platformCost: 100000,
      totalCostSavings: 100000,
    },
    charts: {
      queriesPerRegion: [
        {
          date: "2024-03-01",
          totalQueries: 250,
          avgQueries: 120,
          regions: {
            UK: 80,
            HK: 70,
            SG: 60,
            CHN: 40
          }
        },
      ],
      queriesPerUser: generateTimeSeriesData(7),
      queriesPerGBGF: generateTimeSeriesData(7),
      timeSavedByRequestType: generateTimeSeriesData(7),
      llmCost: generateTimeSeriesData(30),
      llmResponseTime: generateTimeSeriesData(30),
    }
  };

  // 直接返回数据对象，让 NextResponse.json() 处理序列化
  return NextResponse.json(dashboardData);
}
