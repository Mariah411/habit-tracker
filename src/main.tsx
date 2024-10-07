import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout.tsx";
import "./index.css";
import ReportPage from "./pages/ReportPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import TaskPage from "./pages/TaskPage.tsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <TaskPage />,
      },
      { path: "/settings", element: <SettingsPage /> },
      {
        path: "/report",
        element: <ReportPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
