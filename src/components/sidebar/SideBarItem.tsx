import { Link } from 'react-router-dom';

type Props = {
  navigation: number;
  id: number;
  name: string;
  href: string;
  icon: string;
  handleUpdateView: (newHref: string) => void;
};

export default function SideBarItem({
  navigation,
  id,
  name,
  href,
  icon,
  handleUpdateView,
}: Props) {
  return (
    <>
      <li
        key={id}
        className={navigation === id ? 'rounded-lg bg-blue-200' : ''}
      >
        <Link
          to={href}
          onClick={() => handleUpdateView(href)}
          className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-blue-100
            dark:text-white dark:hover:bg-blue-700"
        >
          <img
            className="mr-3 w-5 flex-shrink-0 w-5"
            aria-hidden="true"
            src={icon}
          ></img>
          <span className="ms-3">{name}</span>
        </Link>
      </li>
    </>
  );
}
