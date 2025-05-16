import { ChangeEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import { getProducts } from '../../api/ProductAPIs';
import { ERROR, PRODUCT_LIMIT_PER_PAGE } from '../../constant/Constant';
import { changeMessage } from '../../reducers/ActionSlice';
import { RootState } from '../../store';
import { Product } from '../../types/Product';
import Table from '../ui/Table';
import Toast from '../ui/Toast';

interface Props {
  checkedProducts: Product[];
  setCheckedProducts: (newCheckedProducts: Product[]) => void;
  handleClose: () => void;
  handleSubmitProducts: () => void;
  multipleSelection: boolean;
}

export default function ProductModal({
  checkedProducts,
  setCheckedProducts,
  handleClose,
  handleSubmitProducts,
  multipleSelection,
}: Props) {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['shopId']);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = PRODUCT_LIMIT_PER_PAGE * (currentPage - 1);
  const [searchText, setSearchText] = useState('');
  const message = useSelector((state: RootState) => state.action.message);

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['products', currentPage, searchText],
    queryFn: () =>
      getProducts(cookies.shopId, offset, PRODUCT_LIMIT_PER_PAGE, searchText),
  });

  const handleItemClick = (
    event: ChangeEvent<HTMLInputElement>,
    cms_product_id: string,
  ) => {
    const checkedProduct = products.results.find(
      (product: Product) => product.cms_product_id == cms_product_id,
    );

    if (checkedProduct) {
      if (event.target.checked && checkedProducts.length < 10) {
        setCheckedProducts(
          multipleSelection
            ? [...checkedProducts, checkedProduct]
            : [checkedProduct],
        );
      } else if (event.target.checked && checkedProducts.length >= 10) {
        dispatch(
          changeMessage({
            content: 'You cannot select more than 10 products!',
            type: ERROR,
          }),
        );
      } else {
        setCheckedProducts(
          checkedProducts.filter(
            (product: Product) => product.cms_product_id != cms_product_id,
          ),
        );
      }
    }
  };

  const isSelected = (cms_product_id: string) =>
    checkedProducts
      .map((product: Product) => product.cms_product_id)
      .indexOf(cms_product_id) !== -1;

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50">
      <div
        className="fixed top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-50"
        onClick={handleClose}
      ></div>
      <div
        className="overflow-y-auto overflow-x-hidden relative bg-white rounded-lg shadow w-4/5
          md:w-full h-4/5 max-w-2xl"
      >
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h2 className="text-lg font-semibold">Product List</h2>
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={handleClose}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <Table
          searchText={searchText}
          setSearchText={setSearchText}
          totalItems={products?.count}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
          isError={isError}
          error={error}
          products={products?.results}
          isSelected={isSelected}
          handleItemClick={handleItemClick}
        />

        <div className="flex justify-end gap-2 p-4 md:p-5 border-t border-gray-200 rounded-b">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white
              rounded-md py-1.5 px-4 border border-blue-500 hover:border-transparent"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md py-1.5 px-4"
            onClick={handleSubmitProducts}
          >
            Select
          </button>
        </div>
      </div>
      {message.content && <Toast />}
    </div>
  );
}
