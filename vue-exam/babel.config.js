const prodPlugin = [];
// 如果是生产环境，则自动清理掉打印的日志，但保留error与warn
if (process.env.NODE_ENV === "production") {
  prodPlugin.push([
    "transform-remove-console",
    {
      exclude: ["error", "warn"],
    },
  ]);
}

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [...prodPlugin],
};
