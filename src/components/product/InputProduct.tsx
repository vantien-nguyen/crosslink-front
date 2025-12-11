import { Product } from "../../types/Product";
import Input from "../ui/Input";

interface Props {
  id: string;
  label?: string;
  errorMessage?: string;
  selectedProduct: Product | null;
  placeholder?: string;
  onClick: (event: any) => void;
}

const InputProduct = ({
  id,
  label,
  errorMessage,
  selectedProduct,
  placeholder,
  onClick,
}: Props) => {
  return (
    <div>
      <label className="inline-flex w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
        <p className="w-3/4">{label}</p>
      </label>
      {selectedProduct ? (
        <div
          className="flow-root cursor-pointer bg-gray-50 border border-gray-300 rounded-lg
            focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onClick={onClick}
        >
          <div className="hover:bg-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="w-10 h-10 rounded-full"
                  src={selectedProduct.image_url}
                />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm truncate dark:text-white">
                  {selectedProduct.shortened_title}
                </p>
              </div>
              <div
                className="mr-4 inline-flex items-center text-sm font-semibold text-gray-900
                  dark:text-white"
              >
                &euro;{selectedProduct.price}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Input
          id={id}
          type="text"
          error={errorMessage}
          placeholder={placeholder}
          onClick={onClick}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default InputProduct;
