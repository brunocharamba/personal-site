module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    boxShadow: {
      window: "0 10px 30px 0px rgba(0, 0, 0, 0.3)",
    },
    extend: {},
  },
  variants: {
    scrollbar: ["rounded"],
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
