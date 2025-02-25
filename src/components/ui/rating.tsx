"use client";

import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  className?: string;
}

export function Rating({ value, className }: RatingProps) {
  return (
    <div className={`flex ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= value ? "text-amber-400" : "text-gray-200"
          }`}
          fill="currentColor"
        />
      ))}
    </div>
  );
} 