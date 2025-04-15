"use client";
import React, { useEffect, useState } from "react";
import { useGetPackagesQuery } from "@/features/packages/packageApi";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import SortDropdown from "./SortDropdown";
import DurationFilter from "./DurationFilter";
import Pagination from "./Pagination";

type Props = {
  searchTerm: string;
};

const PackageList = ({ searchTerm }: Props) => {
  const { data, error, isLoading } = useGetPackagesQuery({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortOrder, setSortOrder] = useState("Default");
  const [selectedDurations, setSelectedDurations] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  const limit = 6;


  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  // 3️⃣ Reset to page 1 when filter changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory, priceRange, sortOrder, selectedDurations]);

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
  if (sortOrder === "lowToHigh") {
    filtered = filtered.sort((a: any, b: any) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filtered = filtered.sort((a: any, b: any) => b.price - a.price);
  }

  // Duration (multi-select)
  if (selectedDurations.length > 0) {
    filtered = filtered.filter((pkg: any) =>
      selectedDurations.includes(pkg.days)
    );
  }

  // 2️⃣ Apply Pagination on filtered data
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPackages = filtered.slice(startIndex, endIndex);

  return (
    <div className="container-custom mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Sidebar */}
        <div className="lg:w-1/4 w-full bg-[#FAFAFA] shadow p-2 rounded-sm h-[100%]">
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="text-xl font-semibold text-gray-700">Filters</h2>
            <button
              className="flex items-center text-orange-500 hover:underline cursor-pointer"
              onClick={() => {
                setSelectedCategory("All");
                setPriceRange({ min: 0, max: 100000 });
                setSortOrder("Default");
                setSelectedDurations([]);
              }}
            >
              Reset
            </button>
          </div>
          <PriceFilter onPriceChange={handlePriceChange} />
          <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
          <DurationFilter
            selectedDurations={selectedDurations}
            setSelectedDurations={setSelectedDurations}
          />
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4 w-full">
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPackages?.map((pkg: any) => (
              <div
                key={pkg.id}
                className=" rounded-lg p-4 shadow hover:shadow-lg transition-all duration-400 bg-gray-50 text-[#146B83] space-y-2"
              >
                <h3 className="text-xl font-semibold text-black">
                  {pkg.title}
                </h3>
                <p className="">{pkg.location}</p>
                <p className="text-sm">
                  {pkg.days} days / {pkg.nights} nights
                </p>
                <p className="font-bold x">
                  <span>BDT</span> {pkg.price?.toLocaleString()}
                </p>
                <p className="text-sm">{pkg.category}</p>
              </div>
            ))}
          </div>
          <Pagination
            page={page}
            setPage={setPage}
            total={filtered.length}
            limit={limit}
          />
        </div>
      </div>
    </div>
  );
};

export default PackageList;
