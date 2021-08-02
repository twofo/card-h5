/**
 * 跳转路径 
 * 
 * indexModule模块的页面地址
 */
var page = "/pages/indexModule/pages";
var indexPageUrl = {
  page,
  // 测试页面 - 页面地址
  testUrl: `${page}/test/test`,
  // 子页面 - 功能选项
  functionOptionUrl: `${page}/functionOption/functionOption`,
  // 水电信息 - 页面地址
  waterInfoUrl: `${page}/waterInformation/waterInformation`,
  // 校园卡 - 页面地址
  campusCardUrl: `${page}/campusCard/campusCard`,
  // 钱包 - 页面地址
  walletIndexUrl: `${page}/walletIndex/walletIndex`,
  // 钱包提现 - 代付劵页面 - 页面地址
  payRollCode: `${page}/payRollCode/payRollCode`,
  // 钱包充值 - 扣付费 - 页面地址
  toPay: `${page}/toPay/toPay`,
  // 钱包充值 - 预付费 - 页面地址
  toPayFee: `${page}/toPayFee/toPayFee`,
  // 钱包充值 - 缴费查询列表 - 页面地址
  toPayFeeList: `${page}/toPayFeeList/toPayFeeList`,
  //添加银行卡
  tobankCard:`${page}/bankCard/bankCard`,
  // 钱包提现 - 页面地址
  toWithdraw: `${page}/toWithdraw/toWithdraw`,
  // 钱包付款码 - 页面地址
  paymentCode: `${page}/paymentCode/paymentCode`,
  // 钱包消费记录 - 页面地址
  toConsumeRecord: `${page}/toConsumeRecord/toConsumeRecord`,
	//支付结果页面
	 payResult: `${page}/payResult/payResult`,
	 //消费码支付结果
	 payResults: `${page}/payResults/payResults`,
  // 门锁管理 - 页面地址
  boorLockManageUrl: `${page}/deviceManage/deviceManage?deviceId=1`,
  // 电表管理 - 页面地址
  eleMeterManageUrl: `${page}/deviceManage/deviceManage?deviceId=4`,
  // 水表管理 - 页面地址
  waterMeterManageUrl: `${page}/deviceManage/deviceManage?deviceId=2`,
  //失物招领
  lostAndFound: `${page}/foundThings/foundThings`,
  // 失物招领详情
  lostAndFoundDetail: `${page}/foundThingDetail/foundThingDetail`,
  // 门锁管理 - 页面地址
  lampControlManageUrl: `${page}/deviceManage/deviceManage?deviceId=5`,
  // 总电表操作 - 页面地址
  totalMeterUrl: `${page}/totalMeter/totalMeter`,
  // 总水表操作 - 页面地址
  totalMeterOfWaterUrl: `${page}/totalMeterOfWater/totalMeterOfWater`,
  // 消息详情 - 页面地址
  messageDetailUrl: `${page}/messageDetail/messageDetail`,
  // 消息分类列表 - 页面地址
  messageListOfTypeUrl: `${page}/messageListOfType/messageListOfType`,
  // 消息分类列表 - 页面地址
  bluetoothDemoUrl: `${page}/bluetoothDemo/bluetoothDemo`,

  /************************************************************** 宿管模块页面 *******************************************************************/
  // 宿舍管理 
  diviceManageUrl: `${page}/deviceManage/deviceManage`,
  // 宿舍管理 - 设备操作记录 
  deviceOperationRecordUrl: `${page}/deviceOperationRecord/deviceOperationRecord`,

  /************************************************************** 留校、外宿模块页面 *******************************************************************/
  // 外宿 / 留校申请 - 页面地址
  inOrOutSchoolApplyUrl: `${page}/inOrOutSchoolApply/inOrOutSchoolApply`,
  // 留校或外宿审核 - 页面地址
  inOrOutSchoolApprovalUrl: `${page}/inOrOutSchoolApproval/inOrOutSchoolApproval`,
  // 留校或外宿列表 - 页面地址
  inOrOutSchoolListUrl: `${page}/inOrOutSchoolList/inOrOutSchoolList`,
  // 留校或外宿详情 - 页面地址
  inOrOutSchoolDetailUrl: `${page}/inOrOutSchoolDetail/inOrOutSchoolDetail`,
  //辅导员 - 班级管理
  manageClassUrl: `${page}/manageClass/manageClass`,
  //辅导员 - 班级管理 - 班级成员
  manageClassDetailUrl: `${page}/manageClassDetail/manageClassDetail`,
  //辅导员 - 班级管理 - 学生个人信息
  studentInfoUrl: `${page}/studentInfo/studentInfo`,
  // 综合审核 - 页面地址
  approvalInfoUrl: `${page}/approvalInfo/approvalInfo`,
  // 综合查询 - 页面地址
  synthesizeQueryUrl: `${page}/synthesizeQuery/synthesizeQuery`,
  // 冲突列表
  conflictListUrl: `${page}/conflictList/conflictList`,
 //退宿申请
  retiredUrl:`${page}/conflictLists/conflictLists`,
  //退宿记录
   retiredUrl:`${page}/conflictLists/conflictLists`,
   inOrOut:`${page}/inOrOut/inOrOut`,
  
};
module.exports = indexPageUrl;