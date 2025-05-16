type Props = {
  currentPage: number;
  setCurrentPage: (newPage: number) => void;
  totalItems: number;
  defaultItemsPerPage: number;
};

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalItems,
  defaultItemsPerPage,
}: Props) {
  const itemsPerPage = Math.min(totalItems, defaultItemsPerPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const displayRange = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - displayRange && i <= currentPage + displayRange)
      ) {
        pageNumbers.push(
          <li key={i}>
            <div
              onClick={() => handlePageChange(i)}
              className={
                currentPage === i
                  ? `flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500
                    bg-gray-200 border border-gray-300 hover:bg-gray-100 hover:text-gray-700
                    dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
                    dark:hover:text-white`
                  : `flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500
                    bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700
                    dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
                    dark:hover:text-white`
              }
              style={{
                cursor: 'pointer',
              }}
            >
              {i}
            </div>
          </li>,
        );
      } else if (
        i === currentPage - displayRange - 1 ||
        i === currentPage + displayRange + 1
      ) {
        pageNumbers.push(
          <li key={i}>
            <div
              className={
                currentPage === i
                  ? `flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500
                    bg-gray-200 border border-gray-300 dark:bg-gray-800 dark:border-gray-700
                    dark:text-gray-400`
                  : `flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500
                    bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700
                    dark:text-gray-400`
              }
            >
              ...
            </div>
          </li>,
        );
      }
    }

    return pageNumbers;
  };

  return (
    <>
      <nav aria-label="Page navigation example">
        <div className="mb-1">
          <p className="text-sm text-gray-500">
            Showing{' '}
            <span className="font-medium">
              {currentPage != totalPages
                ? itemsPerPage
                : totalItems - itemsPerPage * (currentPage - 1)}
            </span>{' '}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <div
              className="cursor-pointer flex items-center justify-center px-4 h-10 text-base font-medium
                text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100
                hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
                dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              <svg
                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Previous
            </div>
          </li>

          {renderPageNumbers()}

          <li>
            <div
              className="cursor-pointer flex items-center justify-center px-4 h-10 text-base font-medium
                text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100
                hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
                dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              Next
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
