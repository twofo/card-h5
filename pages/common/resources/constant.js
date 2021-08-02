/**
 * 静态常量 
 * 
 */
var ArrayConstant = require("./constant/arrayConstant.js");

var FunctionOption = require("./constant/functionOption.js");

var RoleTypeConstant = require("./constant/roleTypeConstant.js");

var SignInStatusConstant = require("./constant/signInStatusConstant.js");

var MessageTypeConstant = require("./constant/messageTypeConstant.js");

var PushMsgConstant = require("./constant/pushMessageConstant.js");

var constant = {
  // 静态常量 - 数组
  arrayConstant: ArrayConstant,
  // 功能选项 
  functionOption: FunctionOption,
  // 静态常量 - 角色类型值
  roleTypeConstant: RoleTypeConstant,
  // 静态常量 - 签到状态
  signInStatusConstant: SignInStatusConstant,
  // 静态变量 - 消息大小类型
  messageTypeConstant: MessageTypeConstant,
  // 静态变量 - 消息推送
  pushMsgConstant: PushMsgConstant
};
module.exports = constant;