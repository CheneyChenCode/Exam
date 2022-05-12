import { type } from "./dataType.tool.js";
/**
 * @description: 对象深度冻结
 * @param {Object}:对象
 * @return {Object}:冻结后的对象
 */
export function deepFreeze(obj) {
  const propNames = Reflect.ownKeys(obj);
  propNames.forEach((key) => {
    const value = obj[key];
    if (value && type(value) === "object") {
      deepFreeze(value);
    }
  });
  return Object.freeze(obj);
}
