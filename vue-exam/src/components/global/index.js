const changerStr = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const requireComponents = require.context("./", false, /.vue$/);

const install = (Vue) => {
  requireComponents.keys().forEach((key) => {
    const config = requireComponents(key);
    const componentName = changerStr(
      key
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    );
    Vue.component(componentName, config.default || config);
  });
};
export default { install };
