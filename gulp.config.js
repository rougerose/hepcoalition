module.exports = {
  server: {
    proxy: "http://localhost:8888/hepcoalition.spip4.dev/",
    notify: false,
  },
  tailwind: "tailwind.config.js",
  css: {
    src: "src/css/",
    dist: "dist/css/",
  },
  cssVendor: {
    src: [],
    dist: "src/css/vendor",
  },
  html: {
    src: [
      "*.html",
      "breadcrumb/*.html",
      "content/*.html",
      "footer/*.html",
      "head/*.html",
      "header/*.html",
      "inclure/**/*.html",
      "header/*.html",
      "overlay/*.html",
    ],
  },
  fonts: {
    clean: ["dist/fonts/*"],
    src: [
      {
        src: "node_modules/@fontsource/roboto-condensed/files/roboto-condensed-{latin,cyrillic}-*.{woff,woff2}",
        name: "roboto-condensed",
      },
      {
        src: "node_modules/@fontsource/almarai/files/almarai-arabic-*.{woff,woff2}",
        name: "almarai",
      },
      {
        src: [
          "node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-{0..119}-{300,400,700}-normal.woff2",
          "node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-all-{300,400,700}-normal.woff",
        ],
        name: "noto-sans-sc",
      },
    ],
    dist: "dist/fonts",
  },
  js: {
    src: ["src/js/main.js"],
    watch: "src/js/**/*.js",
    dist: "dist/js/",
    name: "hepcoalition.js",
  },
  clean: ["dist/js/lib/*.js", "dist/css/*.css", "dist/js/*.js", "!dist/"],
  tasks: {
    css: true,
    cssVendor: false,
    fonts: true,
    js: true,
    clean: true,
    reload: true,
  },
};
