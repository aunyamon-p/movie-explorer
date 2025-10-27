interface PaginationProps {
  currentPage: number; 
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {

  const actualTotalPages = Math.min(totalPages, 500);
  if (actualTotalPages <= 1) return null;

  const siblingCount = 1;
  const firstPageIndex = 1;
  const lastPageIndex = actualTotalPages;


  const getPaginationRange = (): (number | string)[] => {
    const totalPageNumbers = siblingCount * 2 + 3 + 2;

    if (totalPageNumbers >= actualTotalPages) {
      return range(firstPageIndex, actualTotalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, firstPageIndex);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPageIndex);

    const shouldShowLeftDots = leftSiblingIndex > firstPageIndex + 1;
    const shouldShowRightDots = rightSiblingIndex < lastPageIndex - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, '...', lastPageIndex];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(lastPageIndex - rightItemCount + 1, lastPageIndex);
      return [firstPageIndex, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
    return range(firstPageIndex, actualTotalPages); 
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="flex justify-center items-center gap-2 md:gap-3 mt-8 text-white">
      
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-[#111] border border-[#444] rounded disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === '...') {
          return <span key={`dots-${index}`} className="px-1 py-1 text-gray-500">...</span>;
        }

        return (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber as number)}
            className={`px-3 py-1 rounded text-sm md:text-base transition-colors ${
              currentPage === pageNumber
                ? "bg-red-500 text-white font-bold cursor-default" 
                : "bg-[#111] border border-[#444] hover:bg-[#222] hover:border-[#555]"
            }`}
            disabled={currentPage === pageNumber}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, actualTotalPages))}
        disabled={currentPage === actualTotalPages}
        className="px-3 py-2 bg-[#111] border border-[#444] rounded disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
