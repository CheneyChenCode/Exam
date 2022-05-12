import { cloneDeep } from "lodash";
const rolesList = {
  93: "hr",
  94: "qa",
  95: "tutor",
  96: "student",
};
const activeRoles = (roles) => {
  const rolesArr = roles.split(",");
  const activeRoles = rolesArr.find((role) => Reflect.has(rolesList, role));
  return activeRoles;
};
const allRoles = (roles) => {
  const rolesArr = roles.split(",");
  const allRoles = rolesArr.filter((role) => Reflect.has(rolesList, role));
  const allRolesNames = allRoles.reduce((acc, role) => {
    acc.push(rolesList[role]);
    return acc;
  }, []);
  return allRolesNames;
};
const reTake = {
  state: {
    currentRole: {},
    lineData: {},
    roles: "",
  },
  mutations: {
    setCurrentRole(state, role) {
      Object.keys(state).forEach((key) => {
        if (activeRoles(role).includes(state[key]["role_id"])) {
          state.currentRole = cloneDeep(state[key]);
          state.roles = allRoles(role).join(",");
        }
      });
    },
    resetCurrentRole(state, role) {
      state.currentRole = cloneDeep(state[role]);
    },
    changeRole(state, role) {
      Object.assign(state.currentRole, role);
    },
    setLineData(state, data) {
      state.lineData = data;
    },
  },
  getters: {
    getCurrentRole(state) {
      return state.currentRole;
    },
    getLineData(state) {
      return state.lineData;
    },
  },
};
const rolesModel = require.context("/", false, /\.role\.js$/);
rolesModel.keys().map((key) => {
  Object.assign(reTake.state, rolesModel(key));
});

export default reTake;
