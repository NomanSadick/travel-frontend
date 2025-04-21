"use client";
import React, { useState } from "react";
import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar"; // ✅ Import your SearchBar
import { useGetPackagesQuery } from "@/features/packages/packageApi";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError } = useGetPackagesQuery({});

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  // Filter data based on search term
  const filteredPackages = data?.filter((pkg: any) =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto p-4">
      {/* ✅ SearchBar at the top */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Package List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {filteredPackages?.slice(0, 6).map((pkg: any) => (
          <Card
            key={pkg._id}
            id={pkg._id}
            title={pkg.title}
            description={pkg.description}
            price={pkg.price}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
