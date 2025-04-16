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
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="px-3 py-1 rounded border text-sm disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-1 border rounded text-sm ${
            p === page ? "bg-orange-300 text-white" : "hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="px-3 py-1 rounded border text-sm disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;


