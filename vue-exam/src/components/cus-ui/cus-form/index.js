// 邮箱
const email =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 中文
const ChineseCharacter =
  /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/;

const date = /^\d{1,4}(-)(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31)$/; // 1900-12-12或1-1-1或0000-1-1

const checkEmail = (rule, value, callback) => {
  if (!email.test(value)) {
    callback(new Error("邮箱为空或格式错误"));
  } else {
    callback();
  }
};

const checkChineseCharacter = (rule, value, callback) => {
  console.log(ChineseCharacter.test(value));
  if (ChineseCharacter.test(value)) {
    callback(new Error("内容不能是中文"));
  } else {
    callback();
  }
};
const checkDate = (rule, value, callback) => {
  if (!date.test(value)) {
    callback(new Error("日期格式错误"));
  } else {
    callback();
  }
};

const cusRules = {
  email: checkEmail,
  date: checkDate,
  ChineseCharacter: checkChineseCharacter,
};
export { cusRules };
