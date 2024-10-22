import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChartIcon, ListIcon, SettingsIcon } from "../Icons";

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
    <Link to={path} className={`font-semibold leading-6 lg:ml-5 ${textColor}`}>
      <div className="flex flex-col items-center lg:flex-row mx-3 my-2 lg:my-3 text-sm lg:text-md">
        {icon(fillColor)}
        <span className="lg:ml-3">{text}</span>
      </div>
    </Link>
  );
};

// type NavBarProps = {
//   // activeKey: "tasks" | "reports" | "settings";
// };

const NavBarItems = [
  {
    icon: ListIcon,
    text: "Задачи",
    path: "/",
  },
  {
    icon: ChartIcon,
    text: "Отчеты",
    path: "/report",
  },
  {
    icon: SettingsIcon,
    text: "Настройки",
    path: "/settings",
  },
];

const NavBar: FC = () => {
  const { pathname } = useLocation();

  // const { activeKey } = props;
  return (
    <div className="navbar navbar-lg z-40">
      {NavBarItems.map((item) => (
        <NavButton
          key={item.path}
          {...item}
          isActive={item.path === pathname}
        />
      ))}
    </div>
  );
};

export default NavBar;
