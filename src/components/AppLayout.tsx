import { useLocation, useOutlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./ui/NavBar/NavBar";

import { useMemo } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { TodayContext } from "../contexts.ts";

const AppLayout = () => {
  const today = useMemo(() => new Date(new Date().setHours(0, 0, 0, 0)), []);

  const location = useLocation();
  const currentOutlet = useOutlet();

  return (
    <>
      <NavBar />

      <div className="container max-w-4xl px-2 mx-auto ">
        <div className="lg:ml-52 ">
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
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  timeout={300}
                  classNames="page"
                  unmountOnExit
                >
                  {() => <div className="page">{currentOutlet}</div>}
                </CSSTransition>
              </SwitchTransition>
              {/* <Outlet /> */}
            </TodayContext.Provider>
          </>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
