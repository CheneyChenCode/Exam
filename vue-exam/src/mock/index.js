const Mock = require("mockjs");
Mock.XHR.prototype.withCredentials = true;
//设置ajax请求的相应时间
Mock.setup({ timeout: "200-600" });
let configArray = [];

const files = require.context(".", true, /\.mock\.js$/);
files.keys().forEach((key) => {
  Object.keys(files(key).default).forEach((ele) => {
    configArray = configArray.concat([
      {
        [ele]: files(key).default[ele],
      },
    ]);
  });
});

// 注册所有的mock服务
configArray.forEach((item) => {
  for (let [path, target] of Object.entries(item)) {
    let protocol = path.split("|");
    Mock.mock(
      new RegExp(`${process.env.VUE_APP_REQUEST_URL}${protocol[1]}`),
      protocol[0],
      target
    );
  }
});
