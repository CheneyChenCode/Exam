const api = {};

const apiModule = require.context("/", false, /\.api\.js$/);
apiModule.keys().map((key) => {
  Object.assign(api, apiModule(key));
});

export default api;
