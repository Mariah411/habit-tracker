import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./ui/NavBar/NavBar";

const AppLayout = () => {
  return (
    <div className="relative flex justify-start">
      <NavBar />
      <div className="lg:m-l-52 max-w-2xl container px-2 mx-auto">
        <>
          <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
            theme="light"
          />
          <Outlet />
        </>
      </div>
    </div>
  );
};

export default AppLayout;
