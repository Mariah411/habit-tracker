import { FC } from "react";
import { useLocation } from "react-router-dom";

const SettingsIcon = (color: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`size-4 lg:size-6 ${color}`}
  >
    <path
      fillRule="evenodd"
      d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
      clipRule="evenodd"
    />
  </svg>
);

const ListIcon = (color: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`size-4 lg:size-6 ${color}`}
  >
    <path
      fillRule="evenodd"
      d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
      clipRule="evenodd"
    />
  </svg>
);

const ChartIcon = (color: string) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`size-4 lg:size-6 ${color}`}
  >
    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
  </svg>
);

type NavButtonProps = {
  icon: (color: string) => JSX.Element;
  text: string;
  isActive?: boolean;
  path: string;
};
const NavButton: FC<NavButtonProps> = (props: NavButtonProps) => {
  const { icon, text, isActive, path } = props;
  const fillColor = isActive ? "fill-gray-900" : "fill-gray-400";
  const textColor = isActive ? "text-gray-900" : "text-gray-400";
  return (
    <div className="flex flex-col items-center lg:flex-row m-3">
      {icon(fillColor)}
      <a
        href={path}
        className={`text-lg font-semibold leading-6 lg:ml-5 ${textColor}`}
      >
        {text}
      </a>
    </div>
  );
};

// type NavBarProps = {
//   // activeKey: "tasks" | "reports" | "settings";
// };

const NavBarItems = [
  {
    key: "tasks",
    icon: ListIcon,
    text: "Задачи",
    path: "/",
  },
  {
    key: "reports",
    icon: ChartIcon,
    text: "Отчеты",
    path: "/report",
  },
  {
    key: "settings",
    icon: SettingsIcon,
    text: "Настройки",
    path: "/settings",
  },
];

const NavBar: FC = () => {
  const { pathname } = useLocation();

  // const { activeKey } = props;
  return (
    <div className="navbar navbar-lg">
      {NavBarItems.map((item) => (
        <NavButton {...item} isActive={item.path === pathname} />
      ))}
    </div>
  );
};

export default NavBar;
