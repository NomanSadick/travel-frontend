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
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all duration-200 ${selectedCategory
            === category ? "border-blue-500 text-blue-600 font-semibold" : "border-gray-300 text-gray-600 hover:border-blue-300 hover:text-blue-500"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
