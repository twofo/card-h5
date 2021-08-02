/**
 * 工具方法 
 * 
 */
var Wxcharts = require("./utils/wxcharts.js");

var CheckUtil = require("./utils/checkUtil.js");

var PublicUtil = require("./utils/publicUtil.js");

var StorageUtil = require("./utils/storageUtil.js");

var ShowMsgUtil = require("./utils/showMsgUtil.js");

var utils = {
  // 统计图 - 工具方法
  wxcharts: Wxcharts,
  // 校验 - 工具方法
  checkUtil: CheckUtil,
  // 公用方法 - 工具方法
  publicUtil: PublicUtil,
  // 缓存 - 工具方法
  storageUtil: StorageUtil,
  // 缓存 - 工具方法
  showMsgUtil: ShowMsgUtil
};
module.exports = utils;