import dayjs from "dayjs";

// 短时间<YYYY/MM/DD>
const shortTime = function (value, formater = "YYYY-MM-DD") {
  return dayjs(value).format(formater);
};

//长时间 <YYYY-MM-DD HH:mm:ss.SS>
const time = function (value, formater = "YYYY-MM-DD HH:mm:ss") {
  return dayjs(value).format(formater);
};

// 长时间<YYYY/MM/DD HH:mm:ss>
const timeP = function (value, formater = "YYYY/MM/DD HH:mm:ss") {
  return dayjs(value).format(formater);
};

// leaveTime<YYYY/MM/DD HH:mm>
const leaveTime = function (value, formater = "YYYY/MM/DD HH:mm") {
  return dayjs(value).format(formater);
};

// mothTime<YYYY-MM>
const mothTime = function (value, formater = "YYYY-MM") {
  return dayjs(value).format(formater);
};

// mothTimeP<YYYY/MM>
const mothTimeP = function (value, formater = "YYYY/MM") {
  return dayjs(value).format(formater);
};

// mothDayTime<YYYY-MM-DD>
const mothDayTime = function (value, formater = "YYYY-MM-DD") {
  return dayjs(value).format(formater);
};
// mothDayTimeFull
const mothDayTimeFull = function (value, formater = "YYYYYY-MM-DD 00:00") {
  return dayjs(value).format(formater);
};

// mothFirst
const mothFirst = function (value, formater = "YYYY-MM-01") {
  return dayjs(value).format(formater);
};

// mothFirstP
const mothFirstP = function (value, formater = "YYYY-MM-01 00:00:00") {
  return dayjs(value).format(formater);
};

// moth
const moth = function (value, formater = "MM") {
  return dayjs(value).format(formater);
};

// dayTime
const dayTime = function (value, formater = "DD") {
  return dayjs(value).format(formater);
};

// secondsTime
const secondsTime = function (value, formater = "HH:mm:ss") {
  return dayjs(value).format(formater);
};

// secondShortTime
const secondShortTime = function (value, formater = "HH:mm") {
  return dayjs(value).format(formater);
};
export default {
  shortTime,
  time,
  timeP,
  leaveTime,
  mothTime,
  mothTimeP,
  mothDayTime,
  mothDayTimeFull,
  mothFirst,
  mothFirstP,
  moth,
  dayTime,
  secondsTime,
  secondShortTime,
};
