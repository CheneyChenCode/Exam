const rolesConfig = {};

const rolesModel = require.context("/", false, /\.config\.js$/);

rolesModel.keys().map((key) => {
  Object.assign(rolesConfig, rolesModel(key));
});

export default rolesConfig;
