import { create } from 'zustand';
import { addDays } from 'date-fns';

interface FilterState {
  dateRange: {
    from: Date;
    to: Date;
  };
  timeRange: string;
  countries: string[];
  departments: string[];
  searchQuery: string;
  setDateRange: (dateRange: { from: Date; to: Date }) => void;
  setTimeRange: (timeRange: string) => void;
  setCountries: (countries: string[]) => void;
  setDepartments: (departments: string[]) => void;
  setSearchQuery: (query: string) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  // 初始状态
  dateRange: {
    from: new Date(),
    to: addDays(new Date(), 7),
  },
  timeRange: "24h",
  countries: [],
  departments: [],
  searchQuery: "",
  
  // 修改状态的方法
  setDateRange: (dateRange) => set({ dateRange }),
  setTimeRange: (timeRange) => set({ timeRange }),
  setCountries: (countries) => set({ countries }),
  setDepartments: (departments) => set({ departments }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  
  // 重置所有过滤器
  reset: () => set({
    dateRange: {
      from: new Date(),
      to: addDays(new Date(), 7),
    },
    timeRange: "24h",
    countries: [],
    departments: [],
    searchQuery: "",
  }),
})); 