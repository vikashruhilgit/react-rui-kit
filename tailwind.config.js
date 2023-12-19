// import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./lib/**/*.{js,jsx,ts,tsx}"],
  theme: {
    /* colors: {
      ...colors,
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
    }, */
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/forms")],
};
