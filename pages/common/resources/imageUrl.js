/**
 * 图片路径 
 * 
 * 主包 - 图片地址
 */
var image = "/static/images";
var imageUrl = {
  image,
  // QRCode
  QRCode: `${image}/mine/QRCode.png`,
  // 个人中心 - 钱包 
  myWallet: `${image}/mine/wallet.png`,
  // 个人中心 - 关于我们
  about: `${image}/mine/about.png`,
  // 个人中心 - 帮助
  help: `${image}/mine/help.png`,
  // 个人中心 - 帮助
  shiwu: `${image}/mine/shiwu.png`,
  // 个人中心 - 意见反馈
  issue: `${image}/mine/issue.png`,
  // 个人中心 - 挂失申请
  lossApply: `${image}/mine/lossApply.png`,
  // 个人中心 - 操作记录
  operatingRecord: `${image}/mine/operatingRecord.png`,
  optionAttendanceApprovePic: `${image}/index/option/student/meeting.png`,
  shixunroom: `${image}/index/option/student/shixun.png`,
  // 个人中心 - 发布公告
  publish: `${image}/mine/publish.png`,
  // 个人中心 - 报修管理
  repairManage: `${image}/mine/repairManage.png`,
  // 个人中心 - 设置
  set: `${image}/mine/set.png`,
  // admin-1
  admin1: `${image}/mine/admin-1.png`,
  // admin-2
  admin2: `${image}/mine/admin-2.png`,
  //人脸识别
  facePic: `${image}/mine/facePic.png`,
  // 设备开启图片
  open: `${image}/index/device/open.png`,
  // 设备关闭图片
  close: `${image}/index/device/close.png`,
  // 设备禁止操作图片
  frobit: `${image}/index/device/frobit.png`,
  // 没有操作设备图片
  none: `${image}/index/device/none.png`,
  // 没有操作设备图片
  none: `${image}/index/device/none.png`,
  // 教师端：功能选项 - 水费
  waterConsume: `${image}/index/option/student/water_consume.png`,
  // 教师端：功能选项 - 电费
  electricityConsume: `${image}/index/option/student/electricity_consume.png`,
  // 教师端：功能选项 - 钱包
  wallet: `${image}/index/option/student/wallet.png`,
  house: `${image}/index/option/student/house.png`,
  // 教师端：功能选项 - 校园卡
  campusCard: `${image}/index/option/student/campus_card.png`,
  // 教师端：功能选项 - 报修
  repair: `${image}/index/option/student/repair.png`,
  // 教师端: 功能选项 - 预约
  appiontmet: `${image}/index/option/student/appiontment.png`,
  // 教师端: 功能选项 - 预约
  appiont: `${image}/index/option/student/appiont.png`,
  // 教师端: 功能选项 - 预约
  waterBase: `${image}/index/option/student/waterBase.png`,
  // 教室学生端 - 功能选项 - 公共资源
  commonResource: `${image}/index/option/student/commonresource.png`,
  // 学生端：功能选项 - 水电费
  waterEleConsume: `${image}/index/option/student/electricity_consume.png`,
  // 学生端：功能选项 - 钱包
  wallet: `${image}/index/option/student/wallet.png`,
  // 学生端：功能选项 - 考勤
  attendace: `${image}/index/option/student/attendace.png`,
  // 学生端：功能选项 - 报修
  repair: `${image}/index/option/student/repair.png`,
	
	// 学生端：功能选项 - 个人中心
	profile: `${image}/index/option/student/profile.png`,
	// 学生端：功能选项 - 消息中心
	newCentrol: `${image}/index/option/student/newCentrol.png`,
	
	eletri_home: `${image}/index/option/student/eletri_home.png`,
	ecode_home: `${image}/index/option/student/ecode_home.png`,
	lost_home: `${image}/index/option/student/lost_home.png`,
	account_home: `${image}/index/option/student/account_home.png`,
	water_home: `${image}/index/option/student/water_home.png`,
	
	
  //退宿
  tuisu: `${image}/index/option/student/tuisu.png`,
  //调宿
  diaosu: `${image}/index/option/student/diaosu.png`,
  //调宿
  waisu: `${image}/index/option/student/leaveSchool.png`,
  //归寝记录
  guiqinjilu: `${image}/index/option/student/comeRoomRecord.png`,
  liuxiao: `${image}/index/option/student/staySchool.png`,
  // 宿管端：功能选项 - 门锁管理
  boorLock: `${image}/index/option/dormAdmin/boor_lock.png`,
  // 宿管端：功能选项 - 电表管理
  electricityMeter: `${image}/index/option/dormAdmin/electricity_meter.png`,
  // 宿管端：功能选项 - 水表管理
  waterMeter: `${image}/index/option/dormAdmin/water_meter.png`,
  // 宿管端：功能选项 - 灯控管理
  lampControl: `${image}/index/option/dormAdmin/lamp_control.png`,
  // 辅导员端：功能选项 - 入寝管理
  enterBedroom: `${image}/index/option/counsellorAdmin/enter_bedroom.png`,
  // 辅导员端：功能选项 - 考勤统计
  attendaceStatistics: `${image}/index/option/counsellorAdmin/attendace_statistics.png`,
  // 辅导员端：功能选项 - 审批管理
  approve: `${image}/index/option/counsellorAdmin/approve.png`,
  // 宿舍管理 
  roomManagerImg: `${image}/index/option/student/roomManger.png`,
  // 综合管理
  totalManagerImg: `${image}/index/option/student/comcomSearch.png`,
  // 教师端: 考勤 - 我的考勤 - 归寝考勤
  attendanceBackBedrrom: `${image}/index/option/student/attendance_back_bedrrom.png`,
  // 教室端 : 考勤 - 我的考勤 -预约考勤
  attendanceMeeting: `${image}/index/option/student/attendance_meeting.png`,
  // 教室端 : 考勤 -  事务审批 
  shenpi: `${image}/index/option/student/shenpi.png`,
  // 考勤端：考勤计划人员选择 - 下级 禁止状态
  disable: `${image}/public/ic_sub_disable.png`,
  // 考勤端：考勤计划人员选择 - 下级 允许状态
  enable: `${image}/public/ic_sub_enable.png`,
  // 搜索
  search: `${image}/public/search.png`,
  // 消息中心 - 支付
  msgPay: `${image}/msg/msg-pay.png`,
  // 消息中心 - 考勤统计
  msgAttendance: `${image}/msg/msg-attendance.png`,
  // 消息中心 - 设备报修
  msgRepair: `${image}/msg/msg-repair.png`,
  // 消息中心 - 设备告警
  msgAlarm: `${image}/msg/msg-alarm.png`,
  // 消息中心 - 公告
  msgNotice: `${image}/msg/msg-notice.png`,
  // 消息中心 - 其它
  msgOther: `${image}/msg/msg-other.png`,
  // 消息中心 - 已读
  msgUnread: `${image}/msg/msg-unread.png`,
  // 消息中心 - 未读
  msgRead: `${image}/msg/msg-read.png`,
  // 消息中心 - 红点
  msgClue: `${image}/msg/msg-clue.png`,
  // 学生管理
  studentManageImg: `${image}/index/option/student/studentManage.png`,
  // 班级管理
  classMangeImg: `${image}/index/option/student/classManage.png`,
  // 我的宿舍
  myRoomImg: `${image}/index/option/student/myRoom.png`,
  // 公共用水
  commonWater: `${image}/index/option/student/commonWater.png`,
  // 失物招领
  lostAndFound: `${image}/index/option/student/lostAndFound.png`,
	//学杂费缴费
	xuezaImg: `${image}/index/option/student/xuezafei.png`
	
};
module.exports = imageUrl;