import { NextRequest, NextResponse } from "next/server";
import { addDays, subDays, format, differenceInDays } from 'date-fns';

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

// 获取日期范围
function getDateRange(timeRange: string, fromDate?: string, toDate?: string) {
  const to = toDate ? new Date(toDate) : new Date();
  let from = fromDate ? new Date(fromDate) : new Date();
  
  if (!fromDate) {
    // 如果没有明确的 fromDate，则使用 timeRange 计算
    switch (timeRange) {
      case "5m":
        from = new Date(to.getTime() - 5 * 60 * 1000);
        break;
      case "30m":
        from = new Date(to.getTime() - 30 * 60 * 1000);
        break;
      case "1h":
        from = new Date(to.getTime() - 60 * 60 * 1000);
        break;
      case "3h":
        from = new Date(to.getTime() - 3 * 60 * 60 * 1000);
        break;
      case "24h":
        from = subDays(to, 1);
        break;
      case "7d":
        from = subDays(to, 7);
        break;
      case "1M":
        from = new Date(to);
        from.setMonth(from.getMonth() - 1);
        break;
      case "3M":
        from = new Date(to);
        from.setMonth(from.getMonth() - 3);
        break;
      case "1y":
        from = new Date(to);
        from.setFullYear(from.getFullYear() - 1);
        break;
      default:
        from = subDays(to, 7); // 默认为7天
    }
  }
  
  return { from, to };
}

// 生成指定日期范围内的时间序列数据
function generateTimeSeriesData(from: Date, to: Date, minValue = 100, maxValue = 1000) {
  const days = Math.max(1, differenceInDays(to, from) + 1);
  const step = days <= 7 ? 1 : days <= 30 ? 3 : 7; // 根据时间范围调整数据点密度
  
  const result: TimeSeriesData[] = [];
  for (let i = 0; i < days; i += step) {
    const currentDate = addDays(new Date(from), i);
    if (currentDate > to) break;
    
    result.push({
      date: format(currentDate, 'yyyy-MM-dd'),
      value: Math.floor(Math.random() * (maxValue - minValue)) + minValue,
    });
  }
  
  return result;
}

// 生成区域数据
function generateRegionData(from: Date, to: Date) {
  const days = Math.max(1, differenceInDays(to, from) + 1);
  const step = days <= 7 ? 1 : days <= 30 ? 3 : 7;
  
  const result: RegionData[] = [];
  for (let i = 0; i < days; i += step) {
    const currentDate = addDays(new Date(from), i);
    if (currentDate > to) break;
    
    const ukValue = Math.floor(Math.random() * 100) + 50;
    const hkValue = Math.floor(Math.random() * 100) + 40;
    const sgValue = Math.floor(Math.random() * 100) + 30;
    const chnValue = Math.floor(Math.random() * 100) + 20;
    const totalQueries = ukValue + hkValue + sgValue + chnValue;
    
    result.push({
      date: format(currentDate, 'yyyy-MM-dd'),
      totalQueries,
      avgQueries: Math.floor(totalQueries / 4),
      regions: {
        UK: ukValue,
        HK: hkValue,
        SG: sgValue,
        CHN: chnValue
      }
    });
  }
  
  return result;
}

export async function GET(request: NextRequest) {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 获取查询参数
  const searchParams = request.nextUrl.searchParams;
  const timeRange = searchParams.get('timeRange') || '24h';
  const fromDate = searchParams.get('from') || undefined;
  const toDate = searchParams.get('to') || undefined;
  const countries = searchParams.get('countries')?.split(',') || [];
  const departments = searchParams.get('departments')?.split(',') || [];
  const query = searchParams.get('query') || '';
  
  // 计算日期范围
  const { from, to } = getDateRange(timeRange, fromDate, toDate);
  
  // 根据日期范围生成数据
  const queriesPerRegion = generateRegionData(from, to);
  const queriesPerUser = generateTimeSeriesData(from, to, 200, 800);
  const queriesPerGBGF = generateTimeSeriesData(from, to, 150, 600);
  const timeSavedByRequestType = generateTimeSeriesData(from, to, 100, 500);
  const llmCost = generateTimeSeriesData(from, to, 10, 50);
  const llmResponseTime = generateTimeSeriesData(from, to, 300, 800);
  
  // 计算总查询数
  const totalQueries = queriesPerRegion.reduce((sum, day) => sum + day.totalQueries, 0);
  
  // 创建响应数据
  const dashboardData: DashboardResponse = {
    summary: {
      totalQueries,
      avgTimeTaken: "1m:35s",
      totalTimeSaved: `${Math.floor(totalQueries / 12)}h:${Math.floor(totalQueries / 60) % 60}m:${totalQueries % 60}s`,
      totalErratic: Math.floor(totalQueries * 0.01), // 1%的错误率
      totalExceedThreshold: Math.floor(totalQueries * 0.05), // 5%超过阈值
      avgStarRating: 3 + Math.random() * 2, // 3-5之间的评分
      roi: 0.2 + Math.random() * 0.5, // 0.2-0.7之间的ROI
      platformCost: 100000,
      totalCostSavings: 20000 + Math.floor(Math.random() * 80000), // 2-10万之间
    },
    charts: {
      queriesPerRegion,
      queriesPerUser,
      queriesPerGBGF,
      timeSavedByRequestType,
      llmCost,
      llmResponseTime,
    }
  };

  return NextResponse.json(dashboardData);
}
