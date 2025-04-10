"use client";
import React, { useState } from "react";

type Props = {
  onPriceChange: (min: number, max: number) => void;
};

const PriceFilter = ({ onPriceChange }: Props) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const handleApply = () => {
    if (minPrice < 0) setMinPrice(0); // Prevent negative prices
    if (maxPrice < minPrice) setMaxPrice(minPrice); // Ensure max is not less than min
    onPriceChange(minPrice, maxPrice);
  };

  return (
    <div className="p-2 border-gray-300 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Set Your Budget</h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-4">
        <div className="w-full sm:w-[45%]">
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-600 mb-1">Min Price</label>
          <input
            id="minPrice"
            type="number"
            placeholder="Enter Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="border-2 border-orange-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>

        <div className="w-full sm:w-[45%]">
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-600 mb-1">Max Price</label>
          <input
            id="maxPrice"
            type="number"
            placeholder="Enter Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="border-2 border-orange-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
      </div>

      <button
        onClick={handleApply}
        className="w-full bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-orange-500 transition-all mt-2"
      >
        Apply Your Budget
      </button>
    </div>
  );
};

export default PriceFilter;
