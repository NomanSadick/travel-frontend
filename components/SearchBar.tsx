"use client";
import React, { useState, useEffect } from "react";

type Props = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const SearchBar = ({ searchTerm, setSearchTerm }: Props) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [isTyping, setIsTyping] = useState(false);

  // Debounce effect
  useEffect(() => {
    setIsTyping(true);
    const delay = setTimeout(() => {
      setSearchTerm(localSearch); // debounce searchTerm update
      setIsTyping(false);
    }, 2000);
  
    return () => clearTimeout(delay); // Cancel previous timer if typing continues
  }, [localSearch, setSearchTerm]);

  return (
    <div className="max-w-7xl mx-auto">
      {isTyping && <p className="text-sm text-gray-400">Searching...</p>}

      <input
        type="text"
        placeholder="Search by package name..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="w-full px-4 py-2 border-1 border-orange-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-300"
      />
    </div>
  );
};

export default SearchBar;
