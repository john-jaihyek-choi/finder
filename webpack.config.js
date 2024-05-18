require("dotenv/config");
const Dotenv = require("dotenv-webpack");

const path = require("path");

const clientPath = path.join(__dirname, "client/");
const publicPath = path.join(__dirname, "server/public/");

module.exports = {
  plugins: [new Dotenv()],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: clientPath,
  output: {
    path: publicPath,
  },
  module: {
    rules: [
      {
        test: /\.jsx/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-transform-react-jsx"],
          },
        },
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    static: publicPath,
    historyApiFallback: true,
    host: "0.0.0.0",
    port: process.env.DEV_SERVER_PORT || 3000,
    proxy: [
      {
        context: ["/api"],
        target: `http://localhost:${process.env.PORT || 3001}`,
      },
    ],
    client: {
      logging: "info",
    },
    watchFiles: publicPath,
  },
};
