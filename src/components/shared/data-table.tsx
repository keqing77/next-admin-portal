interface DataTableProps {
  filters: {
    timeRange: string;
    countries: string[];
    departments: string[];
  };
}

export function DataTable({ filters }: DataTableProps) {
  // Fetch and display data based on filters
  return (
    <div className="rounded-md border">
      {/* Implement your table structure here */}
      table
    </div>
  );
}
