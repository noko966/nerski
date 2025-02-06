// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./src/index.js", // Your entry point
  output: {
    filename: "bundle.js", // Output filename
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    client: {
      logging: "none",
      overlay: false, // Disable the error overlay
    },
    compress: true,
    port: 9000,
  },
  mode: "development", // or 'development'
};
