/* eslint-disable prettier/prettier */
/**
 * @description:函数组合
 * @param {Function} 需要组合的函数
 * @return {Function} 组合后的函数
 */
const compose = function(...fns)
{
  return function operate(x)
  {
    return fns.reduceRight((result, item) =>
    {
      return item(result);
    }, x);
  };
};

/**
 * @description:Promise组合
 * @param {Function} 需要组合的函数
 * @return {Promise} 组合后的函数
 */
const applyAsync = (acc, val) => acc.then(val);
const composeAsync = (...funcs) => (x) => funcs.reduce(applyAsync, Promise.resolve(x));

export { composeAsync, compose };
