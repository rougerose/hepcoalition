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
    src: ["*.html", "content/*.html", "inclure/**/*.html"],
  },
  fonts: {
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
          "node_modules/@fontsource/noto-sans-tc/files/noto-sans-tc-{0..119}-*.woff2",
          "node_modules/@fontsource/noto-sans-tc/files/noto-sans-tc-all-*.woff",
        ],
        name: "noto-sans-tc",
      },
    ],
    dist: "dist/fonts",
  },
  js: {
    src: ["src/js/main.js"],
    dist: "dist/js/",
    name: "hepcoalition.js",
  },
  // jsConcat: {
  //   src: ["src/lib/swiper/swiper-bundle.min.js"],
  //   dist: "dist/lib/",
  //   name: "libs.min.js",
  // },
  clean: ["dist/lib/*.js", "dist/css/*.css", "dist/js/*.js", "!dist/"],
  tasks: {
    css: true,
    cssVendor: false,
    fonts: true,
    js: true,
    // jsConcat: false,
    clean: true,
    reload: true,
  },
};
