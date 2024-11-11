import { createContext } from "react";

export const TodayContext = createContext(new Date());

export type Themes = "light" | "dark";

export const ThemeContext = createContext<
  | {
      theme: Themes;
      setTheme: (theme: Themes) => void;
    }
  | undefined
>(undefined);
