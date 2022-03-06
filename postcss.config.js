module.exports = ({ env }) => ({
  plugins: [
    require("postcss-logical"),
    require("postcss-dir-pseudo-class"),
    require("tailwindcss"),
    require("autoprefixer"),
    env === "production"
      ? require("cssnano")({
          preset: ["default", { discardComments: { removeAll: true } }],
        })
      : false,
  ],
});
