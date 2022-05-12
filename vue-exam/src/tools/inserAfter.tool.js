/**
 * @description:自定义insertAfter函数
 * @param {DOM} newElement:新的元素
 * @param {DOM} targetElement:目标的元素
 */
export function insertAfter(newElement, targetElement) {
  const parent = targetElement.parentNode;
  if (parent.lastChild === targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}
