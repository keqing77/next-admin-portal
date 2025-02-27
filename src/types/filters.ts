export interface FilterOption {
  label: string;
  value: string;
}

export interface Filters {
  timeRange: string;
  countries: string[];
  departments: string[];
  searchQuery: string;
}

export const COUNTRY_OPTIONS: FilterOption[] = [
  { label: "Hong Kong", value: "HK" },
  { label: "United Kingdom", value: "UK" },
  { label: "Singapore", value: "SG" },
  { label: "China", value: "CHN" },
];

export const GBGF_OPTIONS: FilterOption[] = [
  { label: "ASP", value: "ASP" },
  { label: "CIO", value: "CIO" },
  { label: "FBI", value: "FBI" },
]; 