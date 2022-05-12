const checkButtons = {
  disposal: (binding, vNode) => {
    return (
      ((binding.arg === "1" || !binding.arg) &&
        vNode.context.$store.state.reTake.roles.includes("qa")) ||
      (binding.arg === "2" &&
        vNode.context.$store.state.reTake.roles.includes("tutor")) ||
      (binding.arg === "3" &&
        vNode.context.$store.state.reTake.roles.includes("student"))
    );
  },
  graduated: (binding, vNode) => {
    return (
      (binding.arg === "4" || !binding.arg) &&
      vNode.context.$store.state.reTake.roles.includes("tutor")
    );
  },
};
export default {
  componentUpdated(el, binding, vNode) {
    if (checkButtons[binding.value]?.(binding, vNode)) return false;
    const permission =
      vNode.context.$store.state.reTake.currentRole[binding.value];

    if (typeof permission === "boolean" && !permission) {
      el.remove();
    }
  },
  inserted(el, binding, vNode) {
    if (checkButtons[binding.value]?.(binding, vNode)) return false;
    const permission =
      vNode.context.$store.state.reTake.currentRole[binding.value];

    if (typeof permission === "boolean" && !permission) {
      el.remove();
    }
  },
};
