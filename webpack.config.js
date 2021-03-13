const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: "./src/js/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        loader: "file-loader",
        options: {
          publicPath: "./dist/",
          name: "[name].[ext]?[hash]",
        },
      },
    ],
  },
  plugins: [new webpack.DefinePlugin({}), new CleanWebpackPlugin()],
  devServer: {
    proxy: {
      "/search": `https://www.googleapis.com/youtube/v3/search?`,
    },
  },
};
