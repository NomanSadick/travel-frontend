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
      setSearchTerm(localSearch); // debounce করে searchTerm update হবে
      setIsTyping(false);
    }, 3000);
  
    return () => clearTimeout(delay); // টাইপ করতে থাকলে আগের টাইমার ক্যানসেল হবে
  }, [localSearch, setSearchTerm]);

  return (
    <div className="w-full max-w-xl mx-auto">
      {isTyping && <p className="text-sm text-gray-400">Searching...</p>}

      <input
        type="text"
        placeholder="Search by package name..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
    </div>
  );
};

export default SearchBar;
