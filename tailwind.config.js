/** @type {import('tailwindcss').Config} */

import * as colors from "tailwindcss/colors";
export default {
  darkMode: "selector",
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      white: colors.white,
      blue: colors.blue,
      primary: "#6366f1",
      "primary-light": "#818cf8",
      secondary: "#eef2ff",
      "secondary-dark": "#c7d2fe",
      background: "#eef2ff",
      rose: colors.rose,
    },
    extend: {},
  },
  plugins: [],
};
