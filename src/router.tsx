import { createHashRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ReportPage from "./pages/ReportPage";
import SettingsPage from "./pages/SettingsPage";
import TaskPage from "./pages/TaskPage";

export const routes = [
  {
    path: "/",
    element: <TaskPage />,
  },
  {
    path: "settings",
    element: <SettingsPage />,
  },
  {
    path: "report",
    element: <ReportPage />,
  },
];

export const router = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [...routes],
  },
]);
