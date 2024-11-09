import dayjs from "dayjs";
import "dayjs/locale/ru";
import { StrictMode } from "react";
import "./Calendar.css";
// import "react-calendar/dist/Calendar.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppLayout />,
//     children: [
//       {
//         path: "/",
//         element: <TaskPage />,
//       },
//       { path: "/settings", element: <SettingsPage /> },
//       {
//         path: "/report",
//         element: <ReportPage />,
//       },
//     ],
//   },
// ]);

dayjs.locale("ru");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
