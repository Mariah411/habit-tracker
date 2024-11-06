import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./ui/NavBar/NavBar";

const AppLayout = () => {
  return (
    <div className="relative flex justify-start">
      <NavBar />
      <div className="container max-w-4xl px-2 mx-auto ">
        <div className="lg:ml-52 pb-16">
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
    </div>
  );
};

export default AppLayout;
