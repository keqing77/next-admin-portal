export interface DashboardData {
  cards: {
    totalQueries: number;
    avgTimeTaken: number;
    totalTimeSaved: number; 
    totalErratic: number;
    totalExceedThreshold: number;
    avgStarRating: number;
    roi: number;
    platformCost: number;
    totalCostSavings: number;
  };
  charts: {
    queriesPerRegion: Array<{
      date: string;
      totalQueries: number;
      avgQueries: number;
      regions: {
        UK: number;
        HK: number;
        SG: number;
        CHN: number;
      };
    }>;
    queries: Array<{ date: string; value: number }>;
    timeSaved: Array<{ date: string; value: number }>;
    llmCost: Array<{ date: string; value: number }>;
    llmResponseTime: Array<{ date: string; value: number }>;
  };
} 
