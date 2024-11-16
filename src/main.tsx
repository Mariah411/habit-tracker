import dayjs from "dayjs";
import "dayjs/locale/ru";
import { StrictMode } from "react";
import "./Calendar.css";
// import "react-calendar/dist/Calendar.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Theme from "./components/Theme.tsx";
import "./index.css";
import { router } from "./router.tsx";

dayjs.locale("ru");

window.addEventListener("load", async () => {
  if (navigator.serviceWorker) {
    try {
      const reg = await navigator.serviceWorker.register("./serviceWorker.js");
      // console.log("service worker register success", reg);
    } catch (e) {
      console.log("service worker register fail", e);
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  </StrictMode>
);
