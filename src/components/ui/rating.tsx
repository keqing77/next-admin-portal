"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
  readOnly?: boolean;
}

export function Rating({
  value = 0,
  max = 5,
  onChange,
  className,
  readOnly = true,
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  
  // 确保值在有效范围内
  const safeValue = Math.min(Math.max(0, value), max);
  
  // 用于显示的当前值（如果在hover状态则显示hover值）
  const displayValue = hoverValue !== null ? hoverValue : safeValue;
  
  // 生成星星数组
  const stars = Array.from({ length: max }, (_, i) => {
    const starValue = i + 1;
    const isFullStar = displayValue >= starValue;
    const isHalfStar = !isFullStar && displayValue > starValue - 0.5;
    
    return (
      <div
        key={i}
        className={cn(
          "cursor-default transition-colors",
          !readOnly && "cursor-pointer"
        )}
        onMouseEnter={() => !readOnly && setHoverValue(starValue)}
        onMouseLeave={() => !readOnly && setHoverValue(null)}
        onClick={() => !readOnly && onChange?.(starValue)}
      >
        {isFullStar ? (
          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
        ) : isHalfStar ? (
          <div className="relative">
            <Star className="h-5 w-5 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            </div>
          </div>
        ) : (
          <Star className="h-5 w-5 text-gray-300" />
        )}
      </div>
    );
  });

  return (
    <div className={cn("flex space-x-1", className)}>
      {stars}
    </div>
  );
} 