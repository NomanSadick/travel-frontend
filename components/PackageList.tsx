"use client";
import React, { useState } from "react";
import { useGetPackagesQuery } from "@/features/packages/packageApi";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

type Props = {
  searchTerm: string;
};

const PackageList = ({ searchTerm }: Props) => {
  const { data, error, isLoading } = useGetPackagesQuery({});
  const [selectedCategory, setSelectedCategory] = useState("All");





  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading packages</div>;

  let filtered = data;

  // Filter data based on search term
  if (searchTerm) {
    filtered = filtered.filter((pkg: any) =>
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  

    // Category Filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((pkg: any) => pkg.category === selectedCategory);
    }

   

    

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <PriceFilter/>
      <h2 className="text-3xl font-bold mb-4">All Packages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered?.map((pkg: any) => (
          <div
            key={pkg.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition-all duration-200"
          >
            <h3 className="text-xl font-semibold">{pkg.title}</h3>
            <p className="text-gray-600">{pkg.location}</p>
            <p className="text-sm">
              {pkg.days} days / {pkg.nights} nights
            </p>
            <p className="font-bold text-blue-600">
              BDT {pkg.price?.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">{pkg.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageList;
