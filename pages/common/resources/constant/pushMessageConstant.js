/**
 * 静态常量 - 消息推送数据 
 * 
 */
const INFO_TEMPLATE = 'TrVtvmyUy_j0451YHX8GRmu0peRUkOkknkAH8ziQuqs';
const APPROVAL_TEMPLATE = 'AmhOcQQXLy7AeMvosBa2zUB-DM_n3_jxzKj7OvT7mPQ';
const DEVICE_ALARM_TEMPLATE = 'j4LSOwEBU-5atCzeOWjKj7DTXj5nwo9Zygj7zRgNono';
const PAY_SUCCESS_TEMPLATE = 'xv3ETl4J1xblAfPmc8Bt_r2lExkyZAt6VfN9SqC75xs';
const PAY_FAIL_TEMPLATE = '6m7jwZR_TEl9F41y9LILoHHqlfEDBEMN6l1FEJqis_I';
var pushMsgConstant = {
  // 通用消息模板
  commonlyTemplates: [INFO_TEMPLATE, APPROVAL_TEMPLATE, DEVICE_ALARM_TEMPLATE],
  // 支付类消息模板
  PayTemplates: [PAY_SUCCESS_TEMPLATE, PAY_FAIL_TEMPLATE],
  // 测试
  testTemplates: [PAY_FAIL_TEMPLATE, DEVICE_ALARM_TEMPLATE],
  // 通知消息模板
  INFO_TEMPLATE: INFO_TEMPLATE,
  // 审核消息模板
  APPROVAL_TEMPLATE: APPROVAL_TEMPLATE,
  // 设备告警消息模板
  DEVICE_ALARM_TEMPLATE: DEVICE_ALARM_TEMPLATE,
  // 支付成功消息模板
  PAY_SUCCESS_TEMPLATE: PAY_SUCCESS_TEMPLATE,
  // 支付失败消息模板
  PAY_FAIL_TEMPLATE: PAY_FAIL_TEMPLATE
};
module.exports = pushMsgConstant;