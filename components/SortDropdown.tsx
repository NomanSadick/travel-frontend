"use client";
import React from "react";

type Props = {
  sortOrder: string;
  setSortOrder: (order: string) => void;
};

const SortDropdown = ({ sortOrder, setSortOrder }: Props) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="flex flex-col gap-4 mb-6 relative mt-4">
      <label className="text-xl font-semibold text-gray-700">Sort by</label>
      <div className="relative">
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="w-full border-2 border-orange-300  rounded-md px-4 py-2 bg-sky-50 appearance-none text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-300"
        >
          <option value="Default">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>

        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg
            className="w-4 h-4 text-orange-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.061l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;
