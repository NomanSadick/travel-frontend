"use client";

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  total: number;
  limit: number;
};

const Pagination = ({ page, setPage, total, limit }: PaginationProps) => {

    const totalPages  = Math.ceil(total / limit);



  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      <button
       
     
        className="px-3 py-1 rounded border border-orange-300 text-sm disabled:opacity-50"
      >
        Prev
      </button>

      <button
       
       
        className="px-3 py-1 rounded border border-orange-300 text-sm disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;