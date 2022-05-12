export default {
  default: {
    module: require.context("./default", true, /\.router\.js$/),
  },
  other: {
    module: require.context("./other", true, /\.router\.js$/),
  },
};
