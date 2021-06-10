// https://github.com/florianbouvot/gulp-boilerplate

const config = require("./gulp.config.js");
const { gulp, src, dest, watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync");
const del = require("del");
const postcss = require("gulp-postcss");
const csso = require("gulp-csso");
const size = require("gulp-size");
const sass = require("gulp-dart-sass");
const rename = require("gulp-rename");
const rollup = require("rollup");
const multiEntry = require("@rollup/plugin-multi-entry");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");

// Task: CSS
const css = function (done) {
  // Make sure this feature is activated before running
  if (!config.tasks.css) return done();

  return (
    src(config.css.src + "**/*.scss")
      .pipe(sass({includePaths: ["node_modules"]}))
      .pipe(dest(config.css.src))
      .pipe(postcss())
      // .pipe(csso())
      .pipe(size({ title: "CSS", gzip: true, showFiles: true }))
      .pipe(dest(config.css.dist))
      .pipe(browserSync.stream())
  );
};

const cssVendor = function (done) {
  // Make sure this feature is activated before running
  if (!config.tasks.cssVendor) return done();

  return src(config.cssVendor.src)
    .pipe(
      rename({
        prefix: "_",
        extname: ".scss",
      })
    )
    .pipe(dest(config.cssVendor.dist));
};

// Task: JS
const js = function (done) {
  // Make sure this feature is activated before running
	if (!config.tasks.js) return done();

  return rollup
    .rollup({
      input: config.js.src,
      plugins: [
        // multiEntry(),
        nodeResolve(),
        terser(),
      ],
    })
    .then((bundle) => {
      return bundle.write({
        file: config.js.dist + config.js.name,
        format: "iife",
      });
    });
}

const fonts = function (done) {
  if (!config.tasks.fonts) return done();

  let fs = require("fs");

  for (const font of config.fonts.src) {
    fs.access("./dist/fonts/" + font.name, (err) => {
      if (err) {
        return src(font.src)
          .pipe(
            rename(function (path) {
              return {
                dirname: font.name,
                basename: path.basename,
                extname: path.extname,
              };
            })
          )
          .pipe(dest(config.fonts.dist));
      } else {
        return done();
      }
    });
  }
}

// Task: Clean
const clean = function (done) {
  if (!config.tasks.clean) return done();

  del.sync(config.clean);

  // Signal completion
  return done();
};

// Task: Server
const startServer = function (done) {
  if (!config.tasks.reload) return done();

  // Initialize BrowserSync
  browserSync.init({
    proxy: config.server.proxy,
  });

  // Signal completion
  done();
};

// Reload the browser when files change
const reloadBrowser = function (done) {
  // Make sure this feature is activated before running
  if (!config.tasks.reload) return done();

  browserSync.reload();

  // Signal completion
  done();
};

// Watch for changes
const watchSource = function (done) {
  watch(config.css.src + "**/*.scss", series(css));
  watch(config.tailwind, series(css));
  watch(config.js.src, series(js, reloadBrowser));
  watch(config.html.src, reloadBrowser);

  // Signal completion
  done();
};

// Default task
exports.default = series(clean, cssVendor, parallel(css, js), startServer, watchSource);

// Build task
exports.build = series(clean, cssVendor, parallel(css, js));

exports.fonts = series(fonts);
