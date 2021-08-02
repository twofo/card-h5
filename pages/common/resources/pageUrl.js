/**
 * 跳转路径 
 * 
 * pageUrl的模块地址
 */
var AuthPageUrl = require("./jumpPath/authPageUrl.js");

var IndexPageUrl = require("./jumpPath/indexPageUrl.js");

var MessagePageUrl = require("./jumpPath/messagePageUrl.js");

var MinePageUrl = require("./jumpPath/minePageUrl.js");

var AttendancePageUrl = require("./jumpPath/attendancePageUrl.js");

var TaBarPageUrl = require("./jumpPath/taBarPageUrl.js");

var RepairPageUrl = require("./jumpPath/repairPageUrl.js");

var AppointmentPageUrl = require("./jumpPath/appointmentPageUrl.js");

var pageUrl = {
  // authModule模块
  authPageUrl: AuthPageUrl,
  // indexModule模块
  indexPageUrl: IndexPageUrl,
  // messageModule模块
  messagePageUrl: MessagePageUrl,
  // mineModule模块
  minePageUrl: MinePageUrl,
  // attendanceModule模块
  attendancePageUrl: AttendancePageUrl,
  // tarBarModule模块
  taBarPageUrl: TaBarPageUrl,
  // RepairModule模块
  repairPageUrl: RepairPageUrl,
  //appointmentModule模块
  appointmentPageUrl: AppointmentPageUrl
};
module.exports = pageUrl;