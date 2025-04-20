"use client";
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import PackageList from "@/components/PackageList";


const App = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Manage search term in state

  return (
    <main className="max-w-7xl mx-auto p-4">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PackageList searchTerm={searchTerm} />
    </main>
  );
};

export default App;


