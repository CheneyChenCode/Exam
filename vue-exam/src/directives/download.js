const portReg = /(http|https):\/\/([\w.]+\/?)\S*/;
const baseUrl = process.env.VUE_APP_REQUEST_URL;
const createElementA = (url) => {
  if (!portReg.test(url)) {
    url = baseUrl + url;
  }
  const a = document.createElement("a");
  a.href = url;
  a.download = url.split("//").pop();
  a.target = "_blank";
  a.click();
};
export default {
  bind(el, binding) {
    el.addEventListener("click", () => {
      const urlStr = binding.value;
      const urls = urlStr.split(",");
      if (urls.length === 0) return false;
      urls.forEach((url) => {
        createElementA(url.trim());
      });
    });
  },
  unbind(el) {
    el.removeEventListener("click", el.handler);
  },
};
