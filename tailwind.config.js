const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  corePlugins: {
    fontSmoothing: false,
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
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "1.5rem",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1100px",
    },
    extend: {
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
