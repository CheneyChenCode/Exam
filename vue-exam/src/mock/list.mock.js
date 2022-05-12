let list = {
  code: 200,
  msg: "success",
  data: {
    total: 100,
    "result|10": [
      {
        id: "@guid",
        name: "@cname", // 中文名
        aliasName: "@first()", // 随机英文名
        "age|20-30": 23,
        "job|1": ["前端工程师", "后端工程师", "UI工程师", "需求工程师"],
        birthday: "@datetime", //随机时间
        mobile: "@phone", //
        email: "@email()", //随机email
        address: "@county(true)", //随机地址
        domicile: "@city(true)", //随机城市
      },
    ],
  },
};
let menuList = {
  code: 200,
  msg: "success",
  data: {
    total: 1,
    "result|1": [
      {
        id: "1",
        name: "菜单1",
      },
    ],
  },
};

// 导出两份数据
export default {
  "get|/user/list": list,
  "post|/menu/list": menuList,
};
