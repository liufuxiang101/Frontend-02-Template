module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:4001',
        pathRewrite: {
          '/api': ''
        },
        changeOrigin: true
      }
    }
  }
}
