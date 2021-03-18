/* eslint-disable */
// const CompressionWebpackPlugin = require("compression-webpack-plugin")
// const needGzip = process.env.NODE_ENV === 'production' //&& process.env.VUE_APP_BASE_URL !== '/falcon-controller/'
module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/" : "assets",
  outputDir: 'dist',
  filenameHashing: false,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/v2': {
          target: 'https://openapi.aodianyun.com', //API服务器的地址
          ws: true,  //代理websockets
          changeOrigin: true, // 虚拟的站点需要更管origin
      }
    }
  }
}
