interface Props {
  id: string;
  value: string;
  items: {
    key: string;
    name: string;
  }[];
  handleChange: (event: any) => void;
  className?: string;
}

const Selection = ({ id, value, items, handleChange, className }: Props) => {
  return (
    <form className={`${className}`}>
      <select
        id={id}
        value={value}
        className="border border-gray-300 text-gray-800 text-sm rounded-lg font-medium
          focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-9 shadow
          dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:cursor-pointer"
        onChange={handleChange}
      >
        {items.map((item) => {
          return (
            <option key={item.key} value={item.key}>
              {item.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default Selection;
