/**
 * 跳转路径 
 * 
 * 会议模块 - 页面地址
 */
var page = "/pages/appointmentModule/pages";
var appointmentPageUrl = {
  page,
  // 接口测试 - 
  testUrl: `${page}/test/test`,
  // 发起端 - 我的考勤首页
  attendanceIndexUrl: `${page}/attendanceIndex/attendanceIndex`,
  // 发起端 - 我的预约首页
  appointmentIndexUrl: `${page}/appointmentIndex/appointmentIndex`,
  // 发起端 - 会议管理 - 会议列表
  meetingListUrl: `${page}/creatorMeetingList/meetingList`,
  // 发起端 - 会议管理 - 会议详情
  meetingDetailUrl: `${page}/creatorMeetingDetail/meetingDetail`,
  // 发起端 - 会议管理 - 会议创建、编辑
  meetingOperationUrl: `${page}/creatorMeetingOperation/meetingOperation`,
  // 发起端 - 会议管理 - 会议创建、编辑 - 人员选择
  creatorSelectPersonUrl: `${page}/creatorSelectPerson/creatorSelectPerson`,
  // 考勤管理 - 会议管理 - 会议创建、编辑 - 学生选择 - 选择院系
  selectDepartmentUrl: `${page}/creatorSelectDepartment/selectDepartment`,
  // 考勤管理 - 会议管理 - 会议创建、编辑 - 学生选择 - 选择专业
  selectMajorlUrl: `${page}/creatorSelectMajor/selectMajor`,
  // 考勤管理 - 会议管理 - 会议创建、编辑 - 学生选择 - 选择班级
  selectClasslUrl: `${page}/creatorSelectClass/selectClass`,
  // 考勤管理 - 会议管理 - 会议创建、编辑 - 学生选择- 选择学生
  selectStudentUrl: `${page}/creatorSelectStudent/selectStudent`,
  // 发起端 - 会议考勤 - 考勤统计
  attendaceStatisticsUrl: `${page}/creatorAttendaceStatistics/attendaceStatistics`,
  // 发起端 - 会议考勤 - 考勤详情
  attendaceUserDetailUrl: `${page}/creatorAttendaceUserDetail/attendaceUserDetail`,
  // 发起端 - 会议考勤 - 考勤审核列表
  creatorAttendaceApproveUrl: `${page}/creatorAttendaceApprove/creatorAttendaceApprove`,
  // 发起端 - 会议考勤 - 考勤审核详情
  creatorAttendaceApproveDetailUrl: `${page}/creatorAttendaceApproveDetail/creatorAttendaceApproveDetail`,
  // 发起端 - 会议预约 - 预约房间
  appointmentRoomUrl: `${page}/creatorAppointmentRoom/appointmentRoom`,
  // 发起端 - 会议预约 - 预约时间
  appointmentTimeUrl: `${page}/creatorAppointmentTime/appointmentTime`,
  // 发起端 - 会议编辑 - 人群选择
  creatorSelectPersonUrl: `${page}/creatorSelectPerson/creatorSelectPerson`,
  // 发起端 - 琴房预约 - 琴房申请
  appiontPianoRoomUrl: `${page}/creatorAppiontPianoRoom/appiontPianoRoom`,
  // 参会端 - 琴房管理 - 琴房列表
  attendPianoListUrl: `${page}/attentPianoList/attentPianoList`,
  // 参会端 - 琴房管理 - 琴房房间选择
  selsectPianoRoomUrl: `${page}/selsectPianoRoom/selsectPianoRoom`,
  // 参会端 - 琴房管理 - 琴房时间选择
  selectPianoTimeUrl: `${page}/selectPianoTime/selectPianoTime`,
  // 参会端 - 琴房管理 - 琴房详情
  attendPianoDetailUrl: `${page}/attendPionoDetial/attendPionoDetial`,
  cancelPianoAppiontmentUrl: `${page}/cancelPianoAppiontment/cancelPianoAppiontment`,
  // 参会端 - 会议管理 - 会议列表
  attendMeetingListUrl: `${page}/attendMeetingList/attendMeetingList`,
  // 参会端 - 会议管理 - 会议详情
  attendMeetingDetailUrl: `${page}/attendMeetingDetail/attendMeetingDetail`,
  // 参会端 - 会议考勤 - 考勤打卡
  attendAttendaceSignUrl: `${page}/attendAttendaceSign/attendAttendaceSign`,
  // 参会端 - 会议考勤 - 请假申请
  attendAskForLeaveApplyUrl: `${page}/attendAskForLeaveApply/attendAskForLeaveApply`,
  // 发起端 - 公共区域 - 预约/公共水域
  commonAreaUrl: `${page}/commonArea/commonArea`,
  // 管理端 - 会议预约 - 预约审核
  adminAppointmentApproveUrl: `${page}/adminAppointmentApprove/adminAppointmentApprove`,

  /***************************** 微信小程序操作水表 *****************************/
  // 公共区域 - 公共水表
  commonWatermeterUrl: `${page}/commonWatermeter/commonWatermeter`,
  // 设备用水 - 蓝牙连接
  contentWatermeterUrl: `${page}/contentWatermeter/contentWatermeter`
};
module.exports = appointmentPageUrl;