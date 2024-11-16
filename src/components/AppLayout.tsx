import { useLocation, useOutlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./ui/NavBar/NavBar";

import { useMemo, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { TodayContext } from "../contexts.ts";
import { useTheme } from "./Theme.tsx";

const AppLayout = () => {
  const today = useMemo(() => new Date(new Date().setHours(0, 0, 0, 0)), []);

  const { theme } = useTheme();

  const location = useLocation();

  const currentOutlet = useOutlet();

  const ref = useRef(null);

  return (
    <TodayContext.Provider value={today}>
      <div className={theme}>
        <div className="bg-white dark:bg-gray-900">
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
                  theme={theme}
                />

                <SwitchTransition>
                  <CSSTransition
                    key={location.pathname}
                    nodeRef={ref}
                    timeout={300}
                    classNames="page"
                    unmountOnExit
                  >
                    {() => <div className="page">{currentOutlet}</div>}
                  </CSSTransition>
                </SwitchTransition>
                {/* <Outlet /> */}
              </>
            </div>
          </div>
        </div>
      </div>
    </TodayContext.Provider>
  );
};

export default AppLayout;
