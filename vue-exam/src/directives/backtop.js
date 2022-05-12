const scrollEvent = function (el, binding, target) {
  if (target.srcElement.scrollTo > binding.value) {
    el.style.visibility = "unset";
  } else {
    el.style.visibility = "hidden";
  }
};
export default {
  bind(el, binding) {
    el.addEventListener("click", () => {
      const target = binding.arg
        ? document.querySelector(`#${binding.arg}`)
        : window;
      target.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  },
  updated(el, binding) {
    const target = binding.arg
      ? document.querySelector(`#${binding.arg}`)
      : window;
    if (binding.value) {
      target.addEventListener("scroll", scrollEvent(el, binding, target));
    }
    if (target.scrollTo < binding.value) {
      el.style.visibility = "hidden";
    }
  },
  unbind(el, binding) {
    const target = binding.arg
      ? document.querySelector(`#${binding.arg}`)
      : window;
    target.removeEventListener("scroll", scrollEvent);
    el.removeEventListener("click", scrollEvent);
  },
};
