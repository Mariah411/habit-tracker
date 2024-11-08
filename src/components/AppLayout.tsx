import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./ui/NavBar/NavBar";

import { useMemo } from "react";
import { TodayContext } from "../contexts.ts";

const AppLayout = () => {
  const today = useMemo(() => new Date(new Date().setHours(0, 0, 0, 0)), []);

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
            <TodayContext.Provider value={today}>
              <Outlet />
            </TodayContext.Provider>
          </>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
