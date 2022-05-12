const userInfo = {
  state: {
    userInfo: {},
  },
  getters: {
    userInfo: (state) => {
      if (state.userInfo) {
        return state.userInfo;
      } else {
        return localStorage.getItem("userInfo");
      }
    },
  },
  mutations: {
    setUserInfo(state, value) {
      state.userInfo = value;
    },
  },
  actions: {
    setUserInfo({ commit }) {
      commit("setUserInfo");
    },
  },
};

export default userInfo;
