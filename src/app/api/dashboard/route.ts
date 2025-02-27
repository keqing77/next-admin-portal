import { NextRequest, NextResponse } from "next/server";
import { format } from 'date-fns';

interface GBGFData {
  ASP: number;
  BSP: number;
  CSP: number;
  FIN: number;
}

interface RegionData {
  UK: number;
  HK: number;
  SG: number;
  CHN: number;
}

interface QueryData {
  date: string;
  totalQueries: number;
  avgQueries: number;
  regions: RegionData;
  GBGF: GBGFData;
}

interface TimeSavedData {
  total: number;
  avg: number;
  types: {
    Issues: number;
    "Root Causes": number;
    Actions: number;
    Controls: number;
  };
}

interface LLMCostData {
  date: string;
  total: number;
  avg: number;
  country: RegionData;
  GBGF: GBGFData;
}

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQueryData(date: string): QueryData {
  return {
    date,
    totalQueries: generateRandomNumber(150, 400),
    avgQueries: generateRandomNumber(40, 100),
    regions: {
      UK: generateRandomNumber(10, 90),
      HK: generateRandomNumber(50, 100),
      SG: generateRandomNumber(15, 90),
      CHN: generateRandomNumber(50, 120)
    },
    GBGF: {
      ASP: generateRandomNumber(100, 250),
      BSP: generateRandomNumber(20, 50),
      CSP: generateRandomNumber(10, 50),
      FIN: generateRandomNumber(10, 100)
    }
  };
}

function generateLLMCostData(date: string): LLMCostData {
  return {
    date,
    total: generateRandomNumber(1500, 2000),
    avg: generateRandomNumber(350, 450),
    country: {
      UK: generateRandomNumber(100, 350),
      HK: generateRandomNumber(100, 500),
      SG: generateRandomNumber(100, 350),
      CHN: generateRandomNumber(100, 600)
    },
    GBGF: {
      ASP: generateRandomNumber(150, 350),
      BSP: generateRandomNumber(100, 500),
      CSP: generateRandomNumber(100, 350),
      FIN: generateRandomNumber(100, 600)
    }
  };
}

export async function GET(request: NextRequest) {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const dates = ["2025-02-24", "2025-02-25", "2025-02-26"];
  
  const dashboardData = {
    cards: {
      totalQueries: generateRandomNumber(1000, 1200),
      avgTimeTaken: generateRandomNumber(90, 100),
      totalTimeSaved: generateRandomNumber(300000, 350000),
      totalErratic: generateRandomNumber(8, 12),
      totalExceedThreshold: generateRandomNumber(50, 60),
      avgStarRating: 4 + Math.random(),
      roi: 0.3 + Math.random() * 0.1,
      platformCost: 100000,
      totalCostSavings: generateRandomNumber(25000, 35000)
    },
    charts: {
      queries: dates.map(date => generateQueryData(date)),
      timeSaved: [{
        total: generateRandomNumber(90, 120),
        avg: generateRandomNumber(20, 30),
        types: {
          Issues: generateRandomNumber(40, 60),
          "Root Causes": generateRandomNumber(15, 25),
          Actions: generateRandomNumber(10, 20),
          Controls: generateRandomNumber(10, 20)
        }
      }],
      llmCost: dates.map(date => generateLLMCostData(date)),
      llmResponseTime: dates.map(date => ({
        date,
        value: generateRandomNumber(500, 800)
      }))
    }
  };

  return NextResponse.json(dashboardData);
}
