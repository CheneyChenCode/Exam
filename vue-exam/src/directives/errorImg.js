const errorImg = require("@/assets/error.png");
export default {
  bind(el) {
    el.onerror = function () {
      el.src = errorImg;
    };
  },
};
