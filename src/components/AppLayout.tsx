import { Outlet } from "react-router-dom";
import NavBar from "./ui/NavBar/NavBar";

const AppLayout = () => {
  return (
    <div className="relative flex justify-start">
      <NavBar />
      <div className="lg:m-l-52">
        <Outlet />

        {/* <h1 className="text-3xl font-bold underline">Vite + React</h1>
        <Button>Клик</Button> */}
      </div>
    </div>
  );
};

export default AppLayout;
