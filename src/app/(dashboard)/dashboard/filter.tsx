"use client";

import DatePicker from "./date-picker";

export const DashboardFilter = () => {
  return (
    <section>
      <div className="flex flex-wrap items-center gap-4 p-4">
        <div className="flex items-center gap-3">
          <DatePicker />
        </div>
      </div>
    </section>
  );
};
