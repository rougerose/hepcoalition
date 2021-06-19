const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  corePlugins: {
    fontSmoothing: false,
    container: false,
  },
  purge: [
    "./body.html",
    "./content/*.html",
    "./header/*.html",
    "./inclure/**/*.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"HepC"', ...defaultTheme.fontFamily.sans],
      mono: defaultTheme.fontFamily.mono,
    },
    screens: {
      sm: "568px",
      md: "768px",
      lg: "800px",
      xl: "1100px",
    },
    extend: {
      colors: {
        primary: {
          500: "#19a1ac",
          900: "#0a3f43",
        },
        secondary: {
          500: "#c11f02",
        },
      },
      fontSize: {
        "2xs": ".625rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
