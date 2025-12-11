import { useSelector } from "react-redux";

import { RootState } from "../../store";

interface Props {
  icon?: string;
  name?: string;
  className?: string;
  onClick: (event: any) => void;
}

const Button = ({ icon, name, className, onClick }: Props) => {
  const loading = useSelector((state: RootState) => state.action.loading);

  return (
    <button
      className={`${className} bg-blue-400 px-4 py-2.5 rounded-md text-sm font-medium
      hover:bg-blue-200`}
      onClick={onClick}
      disabled={loading}
    >
      <div className="py-0.5 flex items-center">
        <img className="mr-2" src={icon}></img>
        <div>{name}</div>
      </div>
    </button>
  );
};

export default Button;
