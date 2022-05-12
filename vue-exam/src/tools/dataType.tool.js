/**
 * @description:数据类型判断
 * @param {any} params
 * @return {String} 数据类型
 */
export function type(param) {
  const typeStr = Object.prototype.toString.call(param);
  const typeArray = typeStr.replaceAll(/\[|\]/g, "").split(" ");
  return typeArray[1].toLowerCase();
}
