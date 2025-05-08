"use client";

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  total: number;
  limit: number;
};

const Pagination = ({ page, setPage, total, limit }: PaginationProps) => {
  const totalPages = Math.ceil(total / limit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-6 px-4">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="px-3 py-1 rounded border border-orange-300 text-sm disabled:opacity-50 cursor-pointer whitespace-nowrap"
      >
        Prev
      </button>

      <div className="flex flex-wrap justify-center gap-1 max-w-full overflow-x-auto">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 border border-orange-300 rounded text-sm cursor-pointer whitespace-nowrap ${
              p === page
                ? "bg-orange-300 text-white border-orange-300"
                : "hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="px-3 py-1 rounded border border-orange-300 text-sm disabled:opacity-50 cursor-pointer whitespace-nowrap"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
