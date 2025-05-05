"use client";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const categories = [
  "All",
  "Quick Gateway",
  "Adventure",
  "Relaxation",
  "Cultural",
  "Luxury",
];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }: Props) => {
  return (
    <div className="flex flex-wrap gap-6 justify-around mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-8 py-2 rounded-lg border text-sm font-semibold transition-all duration-200 cursor-pointer ${selectedCategory
            === category ? "border-orange-300 text-orange-300 font-semibold" : "border-gray-300 text-gray-600 hover:border-orange-100 hover:text-orange-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
