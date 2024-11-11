import React, { useContext, useEffect, useState } from "react";
import { ThemeContext, Themes } from "../contexts";
import Button from "./ui/Button/Button";
import { MoonIcon, SunIcon } from "./ui/Icons";

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'You can use "useTheme" hook only within a <ThemeProvider> component.'
    );
  }

  return context;
};

const getTheme = (): Themes => {
  let theme = localStorage.getItem("theme");

  if (!theme) {
    localStorage.setItem("theme", "light");
    theme = "light";
  }

  return theme as Themes;
};

const Theme = (props: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Themes>(getTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    // document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

Theme.ThemeToggler = function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  const toogleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex justify-start">
      <Button
        onClick={toogleTheme}
        color={theme === "light" ? "primary" : "secondary"}
        classes="transition-all !rounded-l-lg !rounded-r-none"
      >
        {<SunIcon />}
      </Button>
      <Button
        onClick={toogleTheme}
        color={theme === "dark" ? "primary" : "secondary"}
        classes="transition-all !rounded-r-lg !rounded-l-none"
      >
        <MoonIcon />
      </Button>
    </div>
  );
};

export { useTheme };

export default Theme;
