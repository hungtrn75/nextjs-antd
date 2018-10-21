require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");
/* eslint-disable */
const withLess = require("@zeit/next-less");
// const withCss = require("@zeit/next-css");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {};
  // require.extensions[".css"] = file => {};
}

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: {
      "primary-color": "#1DA57A",
      "link-color": "#1DA57A",
      "border-radius-base": "2px"
    }
  },
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];
    // config.module.rules.push({
    //   test: /\.css$/,
    //   use: [
    //     {
    //       loader: MiniCssExtractPlugin.loader
    //     },
    //     {
    //       loader: "css-loader",
    //       options: {
    //         modules: true,
    //         sourceMap: true
    //       }
    //     }
    //   ]
    // });

    return config;
  }
});
