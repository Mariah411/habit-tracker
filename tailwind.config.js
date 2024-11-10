/** @type {import('tailwindcss').Config} */

import * as colors from "tailwindcss/colors";
export default {
  darkMode: "selector",
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      midphone: "410px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },

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
      indigo: colors.indigo,
      primary: "#6366f1",
      "primary-light": "#818cf8",
      secondary: "#eef2ff",
      "secondary-dark": "#c7d2fe",
      "secondary-darker": "#312e81",
      background: "#eef2ff",
      rose: colors.rose,
    },
    extend: {},
  },
  plugins: [],
};
