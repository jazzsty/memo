// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        // target: "http://localhost:3000"
        target: "http://58.225.62.172:8000", // 백엔드 서버 URL
        changeOrigin: true, // 필요 시 도메인 변경 허용
        pathRewrite: { "^/api": "" }, // "/api" 경로를 제거 (백엔드 경로가 달라질 경우 사용)
      }
    }
  },
  // publicPath: './'
  publicPath: '/memo/'
}
