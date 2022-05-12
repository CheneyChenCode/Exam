export const checkJsonEmpty = (json) => {
  const isNullOrEmpty = Object.keys(json).filter(
    (key) => json[key] === null || json[key] === ""
  );
  return isNullOrEmpty.length === 0;
};

export const assignObject = (obj, source) => {
  return Object.keys(obj).reduce((result, key) => {
    result[key] = source[key] || obj[key];
    return result;
  }, {});
};
