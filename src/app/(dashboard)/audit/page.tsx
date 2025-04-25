"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, PlusCircle, MinusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { mockData } from "./mockData";
import { Highlight, themes } from "prism-react-renderer";

interface ExpandableJsonProps {
  content: Record<string, any> | string;
}

const ExpandableJson: React.FC<ExpandableJsonProps> = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getPreview = (content: Record<string, any> | string) => {
    if (typeof content === "string") return content;
    const str = JSON.stringify(content);
    return str.length > 30 ? str.substring(0, 30) + "..." : str;
  };

  if (typeof content === "string") {
    return <div className="text-sm">{content}</div>;
  }

  const jsonString = JSON.stringify(content, null, 2);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {isExpanded ? (
          <div className="w-full">
            <Highlight theme={themes.vsLight} code={jsonString} language="json">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className="bg-slate-50 p-3 rounded-md overflow-auto max-h-[300px] text-sm font-mono border">
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        ) : (
          <div className="text-sm truncate max-w-[200px] font-mono">
            {getPreview(content)}
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleExpand}
          className="ml-2"
        >
          {isExpanded ? (
            <MinusCircle className="h-4 w-4" />
          ) : (
            <PlusCircle className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default function ActivityPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [username, setUsername] = useState<string>("");

  const filteredData = mockData.filter((row) => {
    const matchesUsername =
      !username || row.username.toLowerCase().includes(username.toLowerCase());
    const matchesCountry =
      selectedCountries.length === 0 || selectedCountries.includes(row.country);
    const matchesDepartment =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(row.department);
    return matchesUsername && matchesCountry && matchesDepartment;
  });

  return (
    <div className="container mx-auto p-6">
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <DatePickerWithRange
          className="w-[300px]"
          value={dateRange}
          onChange={setDateRange}
        />

        <input
          type="text"
          placeholder="Filter by Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-3 py-2 border rounded-md w-[180px]"
        />

        {/* Add country and department filters similar to metrics page */}
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer">
                User ID <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="cursor-pointer">
                Username <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Request Content</TableHead>
              <TableHead>Response Content</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Request Token</TableHead>
              <TableHead>Response Token</TableHead>
              <TableHead>Cost ($)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={`${row.userId}-${row.activity}`}>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>
                  {typeof row.country === "string" ? row.country : "-"}
                </TableCell>
                <TableCell>
                  {typeof row.department === "string" ? row.department : "-"}
                </TableCell>
                <TableCell>
                  <ExpandableJson content={row.requestContent} />
                </TableCell>
                <TableCell>
                  <ExpandableJson content={row.responseContent} />
                </TableCell>
                <TableCell>
                  {typeof row.activity === "string" ? row.activity : "-"}
                </TableCell>
                <TableCell>{row.requestToken}</TableCell>
                <TableCell>{row.responseToken}</TableCell>
                <TableCell>
                  {row.cost > 0 ? row.cost.toFixed(3) : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="text-sm">Page {currentPage}</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
