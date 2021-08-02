/**
 * 消息中心 - 消息类型
 * 
 */
var messageTypeConstant = {
  // 支付大类型
  PAY_TYPE: 1,
  // 支付子类型
  // 支出
  PAY_OUT_CHILD_TYPE: 1,
  // 收入
  PAY_IN_CHILD_TYPE: 2,
  // 考勤大类型
  ATTENDANCE_TYPE: 2,
  // 考勤子类型
  // 考勤通知
  ATTENDANCE_INFORM_CHILD_TYPE: 1,
  // 审批
  ATTENDANCE_APPROVE_CHILD_TYPE: 2,
  // 告警大类型
  ALARM_TYPE: 3,
  // 告警子类型
  // 门锁
  LOCK_CHILD_TYPE: 1,
  // 水表
  WATER_METER_CHILD_TYPE: 2,
  // 电控
  ELE_CONTROL_CHILD_TYPE: 3,
  // 电表
  EMMTER_CHILD_TYPE: 4,
  // 其它大类型
  OTHER_TYPE: 4,
  // 其它子类型
  // 系统通知
  SYSTEM_NOTIFICATION_CHILD_TYPE: 1,
  // 异常通知
  ERROR_NOTIFICATION_CHILD_TYPE: 2,
  // 公告大类型
  NOTICE_TYPE: 5,
  // 公告子类型
  // 公告通知
  NOTICE_CHILD_TYPE: 1,
  // 报修大类型
  REPAIR_TYPE: 6,
  // 报修子类型
  // 状态变更
  REPAIR_STATUS_CHILD_TYPE: 1,
  // 485网关大类型
  GATEWAY_485_TYPE: 17,
  // zigbee网关大类型
  GATEWAY_ZIGBEE: 19,
  // 自助机大类型
  SELF_SERVICE_MACHINE_TYPE: 21,
  // 通用大类型
  GENERIC_NOTIFICATION_TYPE: 998,
  // 服务器大类型
  SERVER_TYPE: 999
};
module.exports = messageTypeConstant;