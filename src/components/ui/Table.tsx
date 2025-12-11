import { PRODUCT_LIMIT_PER_PAGE } from "../../constant/Constant";
import { Product } from "../../types/Product";

import Loading from "./Loading";
import Pagination from "./Pagination";

interface Props {
  searchText: string;
  setSearchText: (value: string) => void;
  totalItems: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  products: Product[];
  isSelected: (value: string) => boolean;
  handleItemClick: (event: any, value: string) => void;
}

const Table = ({
  searchText,
  setSearchText,
  totalItems,
  currentPage,
  setCurrentPage,
  isLoading,
  isError,
  error,
  products,
  isSelected,
  handleItemClick,
}: Props) => {
  return (
    <div className="w-full p-4 relative overflow-x-auto shadow-md">
      <div className="pb-4 bg-white dark:bg-gray-900">
        <label htmlFor="w-full table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div
            className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3
              pointer-events-none"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="pt-2 pb-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full
              bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search product"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-4">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Inventory
            </th>
            <th scope="col" className="px-6 py-3">
              Price (&euro;)
            </th>
            <th scope="col" className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <th>
                <Loading />
              </th>
            </tr>
          ) : isError ? (
            <tr>
              <th>{error?.message}</th>
            </tr>
          ) : (
            products.map((product: Product) => {
              const isItemSelected = isSelected(product.cms_product_id);

              return (
                <tr
                  key={product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50
                    dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img src={product.image_url} className="w-10 h-10 w-auto" />
                  </th>
                  <td className="px-6 py-4">{product.shortened_title}</td>
                  <td className="px-6 py-4">{product.inventory_quantity}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500
                          dark:focus:ring-blue-600 dark:ring-offset-gray-800
                          dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                          dark:border-gray-600"
                        checked={isItemSelected}
                        onChange={(event) =>
                          handleItemClick(event, product.cms_product_id)
                        }
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {!isLoading && !isError && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={totalItems}
          defaultItemsPerPage={PRODUCT_LIMIT_PER_PAGE}
        />
      )}
    </div>
  );
};

export default Table;
