/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        polarnight1: "#2e3440",
        polarnight2: "#3b4252",
        polarnight3: "#434c5e",
        polarnight4: "#4c566a",
        snowstorm1: "#d8dee9",
        snowstorm2: "#e5e9f0",
        snowstorm3: "#eceff4",
        frost2: "#88c0d0",
        frost3: "#81a1c1",
        frost4: "#5e81ac",
        brand: "#ff385c",
      },
    },
  },
  plugins: [],
};
