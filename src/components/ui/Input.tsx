import { useSelector } from "react-redux";

import { RootState } from "../../store";

interface Props {
  label?: string;
  id: string;
  type: string;
  name?: string;
  placeholder?: string;
  className?: string;
  value?: any;
  error?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: any) => void;
}

const Input = ({
  label,
  id,
  type,
  name,
  placeholder,
  required,
  className,
  value,
  error,
  onChange,
  onClick,
}: Props) => {
  const loading = useSelector((state: RootState) => state.action.loading);

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={`${required ? `after:content-['*'] after:ml-0.5 after:text-red-500` : ""} mb-2
          block text-sm font-medium text-gray-700 dark:text-white`}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={id}
        className={`${className} block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5
        text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white
        dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500
        sm:text-sm`}
        disabled={loading}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}
      />
      {error !== "" && (
        <p className="mt-1 text-xs text-gray-500 text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
