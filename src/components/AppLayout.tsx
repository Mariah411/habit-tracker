import { Outlet } from "react-router-dom";
import NavBar from "./ui/NavBar/NavBar";

const AppLayout = () => {
  return (
    <div className="relative flex justify-start">
      <NavBar />
      <div className="lg:m-l-52 max-w-2xl container px-2 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
