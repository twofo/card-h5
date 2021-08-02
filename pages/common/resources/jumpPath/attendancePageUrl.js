/**
 * 跳转路径 
 * 
 * indexModule模块的页面地址
 */
var page = "/pages/attendanceModule/pages";
var attendancePageUrl = {
  page,
  // 我的考勤
  myAttendanceIndexUrl: `${page}/index`,
  // 接口测试 - 
  testUrl: `${page}/test/test`,
  // 考勤管理 - 入寝管理
  blockManageUrl: `${page}/attendancePlan/attendancePlan`,
  // 考勤管理 - 入寝管理 - 考勤计划发送
  attendaceSendUrl: `${page}/attendaceSend/attendaceSend`,
  // 考勤管理 - 入寝管理 - 考勤计划发送 - 选择星期
  selectWeekUrl: `${page}/selectWeek/selectWeek`,
  // 考勤管理 - 入寝管理 - 考勤计划发送 - 选择人员
  selectPersonnelUrl: `${page}/selectPersonnel/selectPersonnel`,
  // 考勤管理 - 入寝管理 - 考勤计划发送 - 选择专业
  selectMajorlUrl: `${page}/selectMajor/selectMajor`,
  // 考勤管理 - 入寝管理 - 考勤计划发送 - 选择班级
  selectClasslUrl: `${page}/selectClass/selectClass`,
  // 考勤管理 - 入寝管理 - 考勤计划发送 - 选择学生
  selectStudentUrl: `${page}/selectStudent/selectStudent`,
  // 考勤管理 - 考勤统计
  attendaceStatisticsUrl: `${page}/attendanceStatistics/attendanceStatistics`,
  // 考勤管理 - 考勤统计 - 班级详情
  classDetailUrl: `${page}/attendanceStatisticsClassDetail/attendanceStatisticsClassDetail`,
  // 考勤管理 - 审批管理
  approveManageUrl: `${page}/approveManage/approveManage`,
  // 考勤 - 学生考勤首页页面
  studentIndexUrl: `${page}/studentIndex/studentIndex`,
  // 考勤 - 学生考勤统计首页
  studentStatisticsIndexUrl: `${page}/studentStatisticsIndex/studentStatisticsIndex`,
  // 考勤 - 学生考勤统计
  studentStatisticsUrl: `${page}/studentStatistics/studentStatistics`,
  // 考勤 - 学生考勤补卡申请
  studentReissueApplyUrl: `${page}/studentReissueApply/studentReissueApply`,
  // 考勤 - 学生考勤打卡首页
  studentClockIndexUrl: `${page}/studentClockIndex/studentClockIndex`,
  // 考勤 - 学生考勤打卡
  studentClockUrl: `${page}/studentClock/studentClock`,
  // 选择责任教师
  dutyTeacherUrl: `${page}/dutyTeacher/dutyTeacher`
};
module.exports = attendancePageUrl;