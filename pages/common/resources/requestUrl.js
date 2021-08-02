/**
 * 跳转路径 
 * 
 * requestUrl的模块地址
 */
var BaseRequestUrl = require("./requestPath/baseRequestUrl.js");

var PayRequestUrl = require("./requestPath/payRequestUrl.js");

var AppoprRequestUrl = require("./requestPath/appoprRequestUrl.js");

var AttendanceRequestUrl = require("./requestPath/attendanceRequestUrl.js");

var RepairRequestUrl = require("./requestPath/repairRequestUrl.js");

var AppointmentRequestUrl = require("./requestPath/appointmentRequestUrl.js");
var websocketpath=require("./requestPath/websoket.js");

var requestUrl = {
  // baseRequestUrl
  baseRequestUrl: BaseRequestUrl,
  // baseRequestUrl
  payRequestUrl: PayRequestUrl,
  // appoprRequestUrl
  appoprRequestUrl: AppoprRequestUrl,
  // attendanceRequestUrl
  attendanceRequestUrl: AttendanceRequestUrl,
  //RepairRequestUrl
  repairRequestUrl: RepairRequestUrl,
  //AppointmentRequestUrl
  appointmentRequestUrl: AppointmentRequestUrl,
  websocketpath:websocketpath
};
module.exports = requestUrl;