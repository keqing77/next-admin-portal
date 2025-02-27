"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter } from "lucide-react";
import { useFilterStore } from "@/store/filter";
import { cn } from "@/lib/utils";
import { COUNTRY_OPTIONS, GBGF_OPTIONS } from "@/types/filters";

interface FilterButtonProps {
  onApply: () => void;
}

export function FilterButton({ onApply }: FilterButtonProps) {
  const { countries, gbgfs, toggleCountry, toggleGbgf, reset } = useFilterStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10">
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {(countries.length > 0 || gbgfs.length > 0) && (
            <span className="ml-2 rounded-full bg-primary w-5 h-5 text-[10px] flex items-center justify-center text-primary-foreground">
              {countries.length + gbgfs.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="font-medium">Countries</div>
            <div className="flex flex-wrap gap-2">
              {COUNTRY_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleCountry(option.value)}
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
                    countries.includes(option.value)
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-medium">GBGF</div>
            <div className="flex flex-wrap gap-2">
              {GBGF_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleGbgf(option.value)}
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
                    gbgfs.includes(option.value)
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                reset();
                onApply();
              }}
            >
              Clear filters
            </Button>
            <Button size="sm" onClick={onApply}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
