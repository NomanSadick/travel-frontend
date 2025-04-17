"use client";
import React, { useEffect, useState } from "react";
import { useGetPackagesQuery } from "@/features/packages/packageApi";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import SortDropdown from "./SortDropdown";
import DurationFilter from "./DurationFilter";
import Pagination from "./Pagination";
import { FiFilter, FiX } from "react-icons/fi";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const limit = 6;

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory, priceRange, sortOrder, selectedDurations]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading packages</div>;

  let filtered = data;

  if (searchTerm) {
    filtered = filtered.filter((pkg: any) =>
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (selectedCategory !== "All") {
    filtered = filtered.filter((pkg: any) => pkg.category === selectedCategory);
  }

  filtered = filtered.filter(
    (pkg: any) => pkg.price >= priceRange.min && pkg.price <= priceRange.max
  );

  if (sortOrder === "lowToHigh") {
    filtered = filtered.sort((a: any, b: any) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filtered = filtered.sort((a: any, b: any) => b.price - a.price);
  }

  if (selectedDurations.length > 0) {
    filtered = filtered.filter((pkg: any) =>
      selectedDurations.includes(pkg.days)
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPackages = filtered.slice(startIndex, endIndex);

  return (
    <div className="container-custom mx-auto px-4 py-8">
      {/* Mobile Header with Filter and Reset Category */}
      <div className="lg:hidden flex flex-col gap-2 mb-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setSelectedCategory("All")}
            className="text-sm bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            Reset Category
          </button>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            <FiFilter /> Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block lg:w-1/4 w-full bg-[#FAFAFA] shadow p-2 rounded-sm h-[100%]">
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

        {/* Mobile Filter Drawer */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto lg:hidden">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={() => setIsFilterOpen(false)}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full h-full fixed right-0 top-0 w-4/6">
                <div className="bg-white p-4 h-full overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-orange-300">
                      Filters
                    </h2>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="text-orange-300 hover:text-orange-500"
                    >
                      <FiX size={24} />
                    </button>
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
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
                  <SortDropdown
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                  <DurationFilter
                    selectedDurations={selectedDurations}
                    setSelectedDurations={setSelectedDurations}
                  />
                  <div className="mt-4 flex justify-center">
                    <button
                      className="px-4 py-2 bg-orange-500 text-white rounded-md"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
                className="rounded-lg p-4 shadow hover:shadow-lg transition-all duration-400 bg-gray-50 text-[#146B83] space-y-2"
              >
                <h3 className="text-xl font-semibold text-black">
                  {pkg.title}
                </h3>
                <p className="">{pkg.location}</p>
                <p className="text-sm">
                  {pkg.days} days / {pkg.nights} nights
                </p>
                <p className="font-bold">
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
