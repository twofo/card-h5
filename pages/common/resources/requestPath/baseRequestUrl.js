/**
 * 请求路径 
 * 
 * baseRequestUrl的请求地址
 */
var BaseUrl = require("../common.js");

var baseRequest = BaseUrl.baseRequestUrl; //清远
// var baseRequest = 'http://localhost:8088/rest'//本地环境 65
//var baseRequest = "http://192.168.1.167:8088/rest";//张家玮

var baseRequestUrl = {
  baseRequest,
  // 查询个人设备列表
  version: `${baseRequest}/sys/version/getVersion`,
  // 登录请求
  auth: `${baseRequest}/auth`,
  // 解密手机号码
  getUserPhone: `${baseRequest}/sys/user/wx/decodePhone`,
  //修改手机号
  updatePhone: `${baseRequest}/sys/user/wx/update`,
  regist: `${baseRequest}/sys/user/register`,
  // 登录请求
  saveOpenid: `${baseRequest}/sys/user/saveOpenid`,
  // 忘记密码 - 获取验证码
  forgetPasswordOfCode: `${baseRequest}/bus/user/getRandomCode/forgetPassword`,
  // 忘记密码 - 确认修改
  forgetPassword: `${baseRequest}/bus/user/resetPsw`,
  // 绑定手机号 - 获取验证码 
  bindPhoneOfCode: `${baseRequest}/bus/user/getRandomCode/bindPhone`,
  // 绑定手机号 - 确认修改
  bindPhone: `${baseRequest}/bus/user/bindPhone`,
  //
   bind: `${baseRequest}/msg/message/faceFailMessage`,
   //首页用户提交信息
   submessa:`${baseRequest}/msg/message/setHasRead`,
  // 切换角色
  switchRole: `${baseRequest}/roleSwitch`,
  // 查询个人信息
  getUserDetail: `${baseRequest}/bus/user/info`,
  // 获取用户图像
  getImage: `${baseRequest}/bus/user/getImage`,
  // 上传用户图像
  upImage: `${baseRequest}/bus/user/upImage`,
	// 删除用户图像
	deleteImage: `${baseRequest}/bus/user/daleteImage`,
  // 设置限额金额
  limitMoney: `${baseRequest}/bus/user/limitMoney`,
  // 查询限额金额
  getLimitMoney: `${baseRequest}/bus/user/getLimitMoney`,
  // 删除限额金额
  deleteLimitMoney: `${baseRequest}/bus/user/deleteLimitMoney`,
  // 修改密码
  passwordAlter: `${baseRequest}/bus/user/Change/Psw`,
  // 获取消费机参数
  getConsumerMachinePay: `${baseRequest}/bus/user/getConsumerMachinePay`,
  // 设置消费机参数
  setConsumerMachinePay: `${baseRequest}/bus/user/setConsumerMachinePay`,
  // 获取帮助列表
  helpList: `${baseRequest}/sys/help/list`,
  // 获取该帮助里所有文章
  articles: `${baseRequest}/sys/help/`,
  // 获取帮助列表
  article: `${baseRequest}/sys/help/`,
  // 意见反馈
  feedback: `${baseRequest}/bus/user/Feedback`,
  // 设备操作记录查询
  getUserOperateDeviceRecords: `${baseRequest}/iot/device/getUserOperateDeviceRecords`,
  // 获取校园卡状态
  getCardInfo: `${baseRequest}/bus/card/user`,
  // 卡挂失申请
  cardLossApply: `${baseRequest}/bus/user/cardLossApply`,
  // 发布公告
  appSendToMany: `${baseRequest}/msg/message/appSendToMany`,
  // 根据部门父级查询
  byOrg: `${baseRequest}/msg/message/byOrg`,
  // 根据楼栋父级查询
  byBuilding: `${baseRequest}/msg/message/byBuilding`,
  // 获取告警类别
  getAllIotDeviceAlarms: `${baseRequest}/bus/user/getAllIotDeviceAlarms`,
  // 根据告警类别查询
  getAlarmByUserId: `${baseRequest}/iot/device/getAlarmByUserId`,
  // 查询所有告警信息
  deviceAlarm: `${baseRequest}/bus/user/deviceAlarm`,
  // 首页 - 统计记录 - 本月用电、用水、消费
  countAlarm: `${baseRequest}/sys/user/count`,
  // 查询个人设备列表
  getDeviceList: `${baseRequest}/iot/device/list`,
  // 查询水表信息
  getWaterInfo: `${baseRequest}/iot/device/waterInfo`,
  // 查询电表信息
  getElectricityInfo: `${baseRequest}/iot/device/electricityInfo`,
  // 查询个人记录
  myRecord: `${baseRequest}/bus/user/myRecord`,
  // 设备管理 - 故障率及在离线统计
  getCountByUserId: `${baseRequest}/iot/device/getCountByUserId`,
  // 设备管理 - 用电统计
  getDeviceEle: `${baseRequest}/sys/user/getDeviceEle`,
  // 设备管理 - 用水统计
  getWaterByUserId: `${baseRequest}/iot/device/getWaterByUserId`,
  // 设备管理 - 获取所有楼栋信息
  getBuildList: `${baseRequest}/bus/building/buildings`,
  // 设备管理 - 根据楼栋获取房间
  getRoomByBuildId: `${baseRequest}/bus/room/`,
  // 设备管理 - 根据房间获取设备
  getDeviceByRoomId: `${baseRequest}/iot/device/`,
  // 门锁授权 - 获取房间人员信息
  roomPersonnels: `${baseRequest}/bus/room/roomPersonnels`,
  // 门锁授权 - 查询到可配置的可授权时间信息
  authorityTime: `${baseRequest}/iot/device/authorityTime`,
  // 门锁授权 - 门锁操作记录
  getAllIotLockOperateRecords: `${baseRequest}/iot/device/getAllIotLockOperateRecords`,
  // 操作门锁 - 门锁是否启用蓝牙信标
  getOperateLockSetting: `${baseRequest}/bus/user/getOperateLockSetting`,
  // 门锁授权
  limitTimeAuthorization: `${baseRequest}/iot/device/lock/limitTimeAuthorization`,
  // 配置 - 获取小程序端配置
  getVersionRequest: `${baseRequest}/sys/version/getVersion`,

  /************************************************************** 钱包 *******************************************************************/
  // 钱包 - 获取扣费模式
  getDeductionModel: `${baseRequest}/bus/user/getDeductionModel`,
  // 钱包 - 查询账户·余额及积分
  balance: `${baseRequest}/bus/user/balance`,
  // 钱包 - 获取指定充值记录
  getRechargeRecord: `${baseRequest}/bus/user/getRechargeRecord`,
  // 钱包 - 请求银行卡列表
  listIotBankCard: `${baseRequest}/iot/bankcard/listIotBankCard`,
  // 钱包 - 银行卡新增
  saveBankCard: `${baseRequest}/iot/bankcard/save`,
  // 钱包 - 银行卡新增
  deleteBankCard: `${baseRequest}/iot/bankcard/removeBankCard`,
  // 钱包 - 余额提现申请
  payRefund: `${baseRequest}/pay/payRefund`,
  // 钱包 - 获取支付方式
  payMethod: `${baseRequest}/pay/payMethod`,
  // 钱包 - 获取交易记录
  getTransActionRecords: `${baseRequest}/pay/getTransActionRecords`,

  /************************************************************** 微信小程序操作水表 *******************************************************************/
  //微信蓝牙操作水表 - 获取下发授权额度
  issueAuthorizationMoney: `${baseRequest}/iot/device/water/issueAuthorizationMoney`,
  //微信蓝牙操作水表 - 用水上报处理
  handlerWaterReport: `${baseRequest}/iot/device/water/handlerWaterReport`,
  //微信蓝牙操作水表 - 关闭水表后业务处理
  unfreeze: `${baseRequest}/iot/device/water/unfreeze`,

  /************************************************************** 留校、外宿等记录 *******************************************************************/
  // 留校、外宿申请
  inOrOutSchoolApply: `${baseRequest}/record/apply`,
  // 留校、外宿列表查询
  inOrOutSchoolLists: `${baseRequest}/record/lists`,
  // 留校、外宿详情查询
  inOrOutSchoolDetail: `${baseRequest}/record/detail`,
  // 留校、外宿审核
  inOrOutSchoolApproval: `${baseRequest}/record/approval`,
  refundSchoolApply:`${baseRequest}/bus/user/reTreat`,

  /******************************************************* 宿管 - 综合查询、宿舍管理信息查询 ************************************************************/
  // 综合查询
  listsByType: `${baseRequest}/record/type/lists`,
  // 宿舍信息
  dormInfoTotalStatistics: `${baseRequest}/record/drom/statistics`,
  // 设备（水/电）使用量统计
  deviceUseStatistics: `${baseRequest}/record/deviceUse/statistics`,
  // 异常统计信息
  errorInform: `${baseRequest}/record/error/inform`,
  // 查询水表信息
  getUsageByRoom: `${baseRequest}/record/deviceUse/roomUsage`,
  //水电锁操作记录
  getRoomOprRecored: `${baseRequest}/bus/room/getRoomOprRecored`,

  /********************************************************** 铺导员 - 班级、学生管理信息查询 ***************************************************************/
  // 班级管理
  getClassInfo: `${baseRequest}/record/class/info`,
  // 学生管理信息
  getStudentInfo: `${baseRequest}/record/students/info`,
  // 学生详情信息
  getStudentDetail: `${baseRequest}/record/students/detail`,

  /********************************************************** 失物招领 ***************************************************************/
  // 失物列表
  getLostFoundList: `${baseRequest}/bus/lost/found/user/page`,
  // 失物详情
  getLostFoundDetail: `${baseRequest}/bus/lost/found/detail`
};
module.exports = baseRequestUrl;