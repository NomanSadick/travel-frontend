"use client";
import React, { useState } from "react";

type Props = {
  onPriceChange: (min: number, max: number) => void;
};

const PriceFilter = ({ onPriceChange }: Props) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const handleApply = () => {
    onPriceChange(minPrice, maxPrice);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
        className="border rounded px-4 py-2 w-36"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="border rounded px-4 py-2 w-36"
      />
      <button
        onClick={handleApply}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default PriceFilter;
