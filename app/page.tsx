"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import {
  useGetPackagesQuery,
  IPackage as ApiPackage,
} from "@/features/packages/packageApi";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bgIndex, setBgIndex] = useState(0);

  const { data, isLoading, isError } = useGetPackagesQuery({});

  const filteredPackages = data?.filter((pkg: ApiPackage) =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔄 Rotate background images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(
        (prevIndex) => (prevIndex + 1) % (filteredPackages?.length ?? 1)
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredPackages]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  const currentBgImage = filteredPackages?.[bgIndex]?.image;

  return (
    <main className="max-w-7xl mx-auto p-4">
      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Background Slideshow Section */}
      {currentBgImage ? (
        <div
          className="w-full h-[450px] bg-cover bg-center rounded-lg mb-6 transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${currentBgImage})`,
          }}
        ></div>
      ) : (
        <div className="w-full h-[450px] rounded-lg mb-6 bg-gray-200 animate-pulse"></div> // fallback shimmer
      )}

      {/* Package List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredPackages?.slice(0, 6).map((pkg: ApiPackage) => (
          <Card
            key={pkg._id}
            title={pkg.title}
            description={pkg.description}
            price={pkg.price}
            image={pkg.image}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
