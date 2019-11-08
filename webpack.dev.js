/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const distPath = path.resolve(__dirname, "dist");

module.exports = merge.strategy({ entry: "prepend" })(common, {
  mode: "development",
  devtool: "source-map",
  entry: "./src/main.ts",
  output: {
    path: distPath,
    filename: "main.js",
  },
  devServer: {
    contentBase: distPath,
    port: 3000,
    stats: "minimal",
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        ENV: "development",
      },
    }),
  ],
});
