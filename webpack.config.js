const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "source-map" : "source-map",
  entry: path.resolve(__dirname, "src", "index.tsx"),
  output: {
    path: isDevelopment
      ? path.resolve(__dirname, "dist")
      : path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    static: path.resolve(__dirname, "public"),
    watchFiles: path.resolve(__dirname, "src"),
    hot: true,
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [isDevelopment && require("react-refresh/babel")].filter(
              Boolean
            ),
          },
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
