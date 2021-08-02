/**
 * 请求路径 
 * 
 * appoprRequestUrl的请求地址
 */
var BaseUrl = require("../common.js");

var appoprRequestUrl = BaseUrl.appoprRequestUrl; //清远
// var appoprRequestUrl = "http://192.168.1.35:8090/";//开发环境ip地址
// var appoprRequestUrl = "http://192.168.1.62:8090/";//张家玮

var appoprRequestUrl = {
  appoprRequestUrl,
  // 操作电表
  operateEle: `${appoprRequestUrl}/ammeter/operateRelay`,
  // 操作水表
  operateWater: `${appoprRequestUrl}/watermeter/useWater`,
  // 操作门锁
  operateLock: `${appoprRequestUrl}/lock/unlock`,
  // 请求开启门锁beacon
  lockBluetoothOpen: `${appoprRequestUrl}/lock/lockBluetoothOpen`,
  // 操作灯控
  operateLamp: `${appoprRequestUrl}/lamp/operateLamp`,

  /**
   * 消息中心接口
   */
  // 未读消息统计
  unreadStatistics: `${appoprRequestUrl}/message/unread/statistics`,
  // 获取当日最新消息
  getNewest: `${appoprRequestUrl}/message/latest`,
  // 标记消息已读
  markRead: `${appoprRequestUrl}/message/markRead`,
  // 获取一类消息
  getListByType: `${appoprRequestUrl}/message/listByType`,
  // 获取消息详情
  getMsgDetail: `${appoprRequestUrl}/message/detail`,
  // 设置消息已确认
  confirmedMsg: `${appoprRequestUrl}/message/markConfirmed`,
  // 设置消息已处理
  handledMsg: `${appoprRequestUrl}/message/markHandled`,
  //报修订单总条数
  latestLength :`${appoprRequestUrl}/message/latestLength`,
};
module.exports = appoprRequestUrl;