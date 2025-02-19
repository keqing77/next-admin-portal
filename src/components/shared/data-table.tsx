interface DataTableProps {
  filters: {
    timeRange: string;
    countries: string[];
    departments: string[];
  };
}

export function DataTable({ filters }: DataTableProps) {
  // Fetch and display data based on filters
  return <div className="rounded-md border">table</div>;
}
