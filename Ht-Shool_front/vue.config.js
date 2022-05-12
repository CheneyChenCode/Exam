module.exports = {
  publicPath: '/',
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    open: false,
    port: 9019,
    // port: 8080,
    proxy: {
      '^/': {
        ws: false,
        target: 'http://127.0.0.1:9010/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  }

};
