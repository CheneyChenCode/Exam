const UPLOAD_BASE_URL = process.env.VUE_APP_PORT;
const portReg = /(http|https):\/\/([\w.]+\/?)\S*/;
const isBase64Regex =
  /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i;
export function addPort(value) {
  if (!value) return "";
  if (isBase64Regex.test(value)) return value;
  if (portReg.test(value)) return value;
  return `${UPLOAD_BASE_URL}${value}`;
}
