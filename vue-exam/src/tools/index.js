const tools = {};

const toolsModule = require.context("/", false, /\.tool\.js$/);
toolsModule.keys().map((key) => Object.assign(tools, toolsModule(key)));

export default tools;
