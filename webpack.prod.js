/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common");

const distPath = path.resolve(__dirname, "dist");

module.exports = merge.strategy({ entry: "prepend" })(common, {
  mode: "production",
  output: {
    path: distPath,
    filename: "main.js",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          drop_console: true,
        },
      }),
    ],
  },
});
