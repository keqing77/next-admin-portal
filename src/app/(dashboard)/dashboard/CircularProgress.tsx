interface CircularProgressProps {
  value: number;
  color: string;
  type: "score" | "percentage";
}

export function CircularProgress({
  value,
  color,
  type,
}: CircularProgressProps) {
  const size = 100;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // For score type (0-5), convert to percentage
  const percentage = type === "score" ? (value / 5) * 100 : value;
  const offset = circumference - (percentage / 100) * circumference;

  // Define colors based on the color prop
  const getColor = () => {
    switch (color) {
      case "green":
        return "text-green-500";
      case "yellow":
        return "text-yellow-500";
      case "red":
        return "text-red-500";
      case "gray":
        return "text-gray-400";
      default:
        return "text-blue-500";
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg height={size} width={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={getColor()}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-xl font-bold">
          {type === "score" ? value.toFixed(1) : `${value}%`}
        </span>
      </div>
    </div>
  );
}
