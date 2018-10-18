require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");
/* eslint-disable */
const withLess = require("@zeit/next-less");

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {};
}

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    return config;
  }
});
