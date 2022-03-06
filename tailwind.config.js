const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  corePlugins: {
    fontSmoothing: false,
    container: false,
  },
  mode: "jit",
  purge: [
    "./body.html",
    "./breadcrumb/*.html",
    "./content/*.html",
    "./formulaires/*.html",
    "./footer/*.html",
    "./head/*.html",
    "./header/*.html",
    "./overlay/*.html",
    "./inclure/**/*.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"HepC", "Noto Sans SC", "Almarai"', ...defaultTheme.fontFamily.sans],
      mono: defaultTheme.fontFamily.mono,
    },
    screens: {
      sm: "568px",
      md: "768px",
      lg: "800px",
      xl: "1100px",
    },
    extend: {
      // colors: {
      //   primary: {
      //     500: "#19a1ac",
      //     900: "#0a3f43",
      //   },
      //   secondary: {
      //     500: "#c11f02",
      //   },
      // },
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
