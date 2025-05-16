import { FIXED_AMOUNT, PERCENTAGE } from '../../constant/Constant';

interface Props {
  label?: string;
  discount_value: number;
  discount_type: string;
  errorMessage?: string;
  handleChangeDiscount: (event: any) => void;
}

const DiscountSelection = ({
  label,
  discount_value,
  discount_type,
  errorMessage,
  handleChangeDiscount,
}: Props) => {
  return (
    <div>
      <div className="inline-flex items-center cursor-pointer">
        <label className="block mb-2 w-full text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      </div>
      <div className="flex">
        <select
          id="discount"
          name={'discount_type'}
          value={discount_type}
          onChange={handleChangeDiscount}
          className="w-2/5 pl-4 cursor-pointer bg-gray-200 border border-gray-300 text-gray-900
            text-sm font-medium text-centers rounded-l-lg hover:bg-gray-200 focus:ring-1
            focus:outline-none focus:ring-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600
            dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value={PERCENTAGE}>Percentage (%)</option>
          <option value={FIXED_AMOUNT}>Amount (&euro;)</option>
        </select>
        <input
          id={'discount'}
          name={'discount_value'}
          type={'number'}
          min={0}
          value={discount_value}
          className="w-3/5 bg-gray-50 border border-gray-300 text-gray-900 font-medium sm:text-sm
            rounded-r-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChangeDiscount}
        />
      </div>
      {errorMessage !== '' && (
        <p className="mt-1 text-sm text-gray-500 text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default DiscountSelection;
