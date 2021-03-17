/* eslint-disable */
// const CompressionWebpackPlugin = require("compression-webpack-plugin")
// const needGzip = process.env.NODE_ENV === 'production' //&& process.env.VUE_APP_BASE_URL !== '/falcon-controller/'
module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/" : "assets",
  outputDir: 'dist',
  filenameHashing: false,
  productionSourceMap: false,
  devServer: {
    proxy: 'https://openapi.aodianyun.com'
  }
}
