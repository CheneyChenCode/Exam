const CompressionWebpackPlugin = require("compression-webpack-plugin");
const isProd = process.env.NODE_ENV === "development";
// const isProd = process.env.NODE_ENV === "development";
module.exports = {
  configureWebpack: (config) => {
    if (isProd) {
      // 配置webpack 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          // 超过4kb压缩
          threshold: 4096,
        })
      );
    }
  },
  chainWebpack: (config) => {
    // 项目标题
    config.plugin("html").tap((args) => {
      args[0].title = "华天网络学堂考试系统";
      return args;
    });
  },
  publicPath: !isProd ? "/" : "",
  css: {
    // 是否将css 提取到独立的文件,生产环境提取，开发环境不提取
    extract: !!isProd,
    // 开发模式开启css sourcemap
    sourceMap: !isProd,
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            hack: 'true;@import "~@/style/_variables.less"',
          },
        },
      },
    },
  },
  // 不需要生产环境的 source map
  productionSourceMap: false,
  // 代理
  devServer: {
    port: 9011,
    proxy: {
      "^/cdp": {
        target: process.env.CDP_URL,
        changeOrigin: true,
        pathRewrite: {
          "^/cdp": "",
        },
      },
      // "/RemedialClasses": {
      //   target: "http://10.160.82.97:9010",
      //   changeOrigin: true,
      // },
      "^/": {
        target: process.env.EXAM_URL,
        changeOrigin: true,
        pathRewrite: {
          "^/": "",
        },
      },
    },
  },
};
