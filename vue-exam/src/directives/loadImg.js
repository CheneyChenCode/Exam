const errorImg = require("@/assets/error.png");
export default {
  bind(el, binding) {
    const src = binding.value;
    el.src = src;
    el.onerror = function () {
      el.src = errorImg;
    };
  },
};
