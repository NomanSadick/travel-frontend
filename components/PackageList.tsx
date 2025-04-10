"use client";
import React, { useState } from "react";
import { useGetPackagesQuery } from "@/features/packages/packageApi";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import SortDropdown from "./SortDropdown";
import DurationFilter from "./DurationFilter";


type Props = {
  searchTerm: string;
};

const PackageList = ({ searchTerm }: Props) => {
  const { data, error, isLoading } = useGetPackagesQuery({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortOrder, setSortOrder] = useState("Default");
  const [selectedDurations, setSelectedDurations] = useState<number[]>([]);


  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

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

  // Price Filter
  filtered = filtered.filter(
    (pkg: any) => pkg.price >= priceRange.min && pkg.price <= priceRange.max
  );

 // Sort by Price
if(sortOrder === "lowToHigh"){
  filtered = filtered.sort((a: any, b: any) => a.price - b.price);
} else if(sortOrder === "highToLow"){
  filtered = filtered.sort((a: any, b: any) => b.price - a.price);
}

 // Duration (multi-select)
 

  return (
    <div className="container mx-auto px-4 py-8">
    
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Sidebar */}
        <div className="lg:w-1/4 w-full bg-[#FAF0E4] p-2 rounded-sm">
          <PriceFilter onPriceChange={handlePriceChange} />
          <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
          <DurationFilter selectedDurations={selectedDurations} setSelectedDurations={setSelectedDurations}/>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4 w-full">
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered?.map((pkg: any) => (
              <div
                key={pkg.id}
                className=" rounded-lg p-4 shadow hover:shadow-lg transition-all duration-200 bg-[#ADE792] "
              >
                <h3 className="text-xl font-semibold text-white">{pkg.title}</h3>
                <p className="text-white">{pkg.location}</p>
                <p className="text-sm text-white">
                  {pkg.days} days / {pkg.nights} nights
                </p>
                <p className="font-bold text-blue-600">
                  BDT {pkg.price?.toLocaleString()}
                </p>
                <p className="text-sm text-white">{pkg.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageList;
