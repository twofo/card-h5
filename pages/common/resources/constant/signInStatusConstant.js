/**
 * 静态常量 - 考勤状态
 * 
 */
var signInStatusConstant = {
  // 签到状态：正常
  SIGN_STATUS_NORMAL: 20,
  // 签到状态：未签到
  SIGN_STATUS_UN_SIGN: 21,
  // 签到状态：迟到
  SIGN_STATUS_LATE: 22,
  // 签到状态：请假
  SING_STATUS_LEAVE: 23,
  // 签到状态：补签 
  SING_STATUS_SUPPLE: 24,
  // 签到状态：无需签到
  SIGN_STATUS_NONE: 25,
  // 签到状态：可能打卡
  SIGN_STATUS_COLCK: 26
};
module.exports = signInStatusConstant;