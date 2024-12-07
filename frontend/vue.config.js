// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        // target: "http://localhost:3000"
        target: "http://58.225.62.172:8000"
      }
    }
  },
  // publicPath: './'
  //
  publicPath: '/memo/'
}
