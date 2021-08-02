/**
 * 请求路径 
 * 
 * 会议模块 - 请求地址
 */
var BaseUrl = require("../common.js");

var baseRequest = BaseUrl.baseRequestUrl; //清远

var appointmentRequestUrl = {
  baseRequest,
  // 预约V2.0 - 获取预约，所需的配置信息
  getAppointmentConfigure: `${baseRequest}/area/appointment/getAppointmentConfigure`,
  // 预约V2.0 - 根据预约房间、预约时间段获取指定的预约情况"
  getAppointmentDetail: `${baseRequest}/area/appointment/getAppointmentDetail`,
  // 预约 - 预约房间 - 根据区域类型获取所有房间 /rest/
  getAllRoomByType: `${baseRequest}/appointment/room/getAllRoomByType`,
  // 发起端 - 创建会议
  creatMeeting: `${baseRequest}/attence/meeting/creat`,
  // 发起端 - 修改会议
  updateMeeting: `${baseRequest}/attence/meeting/update`,
  // 发起端 - 创建会议 - 人员选择（学生）
  selectPersonnel: `${baseRequest}/attence/meeting/selectPersonnel`,
  // 发起端 - 创建会议 - 人员选择（学生）- 根据姓名、编号进行搜素
  searchPersonnel: `${baseRequest}/attence/meeting/searchPersonnel`,
  // 发起端 - 会议列表
  listByStatus: `${baseRequest}/attence/meeting/listByStatus`,
  // 发起端 - 会议详情
  meetingDetail: `${baseRequest}/attence/meeting/info`,
  // 发起端 - 取消会议
  cancelMeeting: `${baseRequest}/attence/meeting/cancel`,
  // 发起端 - 会议考勤统计 - 人数统计
  checkInDetail: `${baseRequest}/attence/record/meeting/personnel/checkInDetail`,
  // 发起端 - 会议考勤统计 - 图形统计
  statistics: `${baseRequest}/attence/record/meeting/statistics`,
  // 发起端 - 会议考勤审核 - 审核列表
  approvalApplyList: `${baseRequest}/attence/approval/meeting/applyList`,
  // 发起端 - 会议考勤审核 - 审核详情
  approvalApplyDetail: `${baseRequest}/attence/approval/meeting/apply/detail`,
  // 发起端 - 会议考勤审核 - 审核同意或拒绝
  approvalRatify: `${baseRequest}/attence/approval/meeting/apply/ratify`,
  // 参会端 - 补卡申请
  attenceApply: `${baseRequest}/attence/approval/meeting/apply`,
  // 资源管理员端 - 预约会议室列表
  // getAppointmentMeetingRoomList: `${baseRequest}/attence/approval/meeting/room`,
  // 资源管理员端 - 预约会议室列表
  approvalMeetingRoomAppointment: `${baseRequest}/attence/approval/meeting/room/approval`,

  /**
   * 接口V2.0  琴房与练功房
   */
  // 发起端 - 创建会议 - 人员选择（学生）- 根据姓名、编号进行搜素
  searchPersonnel: `${baseRequest}/area/appointment/search/personnel`,
  //创建实训室预约
  createAreaAppointment: `${baseRequest}/area/appointment/create`,
  //获取实训室预约列表
  getAreaAppointmentList: `${baseRequest}/area/appointment/list`,
  //获取实训室预约详情
  getAreaAppointmentDetail: `${baseRequest}/area/appointment/`,
  //获取收费信息
  getChargeDetail: `${baseRequest}/area/appointment/charge/detail`,
  // 资源管理员端 - 预约会议室列表； 练功房管理员 - 预约练功房列表
  getApprovalAppointmentList: `${baseRequest}/area/appointment/approval/`,
  // 资源管理员端 - 预约会议室列表
  approvalDanceRoomAppointment: `${baseRequest}/area/appointment/dance/approval`,
  // 取消预约 -  获取实训室预约详情
  getAppointmentCancelInfo: `${baseRequest}/area/appointment/cancel/`,
  // 取消预约
  toCancelAppointment: `${baseRequest}/area/appointment/cancel`,
  // 编辑预约
  toUpdateAppointment: `${baseRequest}/area/appointment/dance/update`,

  /**
   * 接口v1.0 - 琴房
   */
  //获取收费信息
  getChargeInfo: `${baseRequest}/appointment/room/piano/getChargeInfo`,
  //获取收费信息 - 旧接口
  //getChargeInfo: `${baseRequest}/appointment/room/piano/getChargeInfo`,
  //创建实训室预约
  createPianoRoomAppointment: `${baseRequest}/appointment/room/piano/create`,
  //创建实训室预约 - 旧接口
  //createPianoRoomAppointment: `${baseRequest}/appointment/room/piano/create`,
  //获取实训室预约列表
  getPianoRoomAppointmentList: `${baseRequest}/appointment/room/piano/list`,
  //获取实训室预约列表 - 旧接口
  //getPianoRoomAppointmentList: `${baseRequest}/appointment/room/piano/list`,
  //获取实训室预约详情
  getPianoRoomAppointmentDetail: `${baseRequest}/appointment/room/piano/detail`,
  //获取实训室预约详情 - 旧接口
  //getPianoRoomAppointmentDetail: `${baseRequest}/appointment/room/piano/detail`,
  // 取消预约
  // cancelPianoRoomAppointment: `${baseRequest}/appointment/room/piano/cancel`,
  // 取消预约 -  获取实训室预约详情
  // getPianoRoomAppointmentCancelInfo: `${baseRequest}/appointment/room/piano/cancel/info`,
  repeatDataCorrection: `${baseRequest}/iot/device/water/repeatDataCorrection`
};
module.exports = appointmentRequestUrl;