/**
 * 请求路径 
 * 
 * 考勤模块 - 请求地址
 */
var BaseUrl = require("../common.js");

var baseRequest = BaseUrl.baseRequestUrl; //清远
// var baseRequest = 'http://localhost:8088/rest'//本地环境 65 
// var baseRequest = "http://192.168.1.62:80/rest";//张家玮

var attendanceRequestUrl = {
  baseRequest,
  // 获取考勤计划列表
  getAttendPlanList: `${baseRequest}/attence/plan/page`,
  // 获取组织架构
  getAttendOrg: `${baseRequest}/attence/plan/manageList`,
  // 创建考勤计划
  createAttendancePlan: `${baseRequest}/attence/plan/increaseOrUpdate`,
  // 删除考勤计划
  deleteAttendancePlan: `${baseRequest}/attence/plan/remove`,
  // 开启或关闭考勤计划
  switchAttendancePlan: `${baseRequest}/attence/plan/disableOrEnable`,
  // 获取考勤计划详情
  getAttendancePlanDetail: `${baseRequest}/attence/plan/planDetails`,
  // 学生 - 获取学生端考勤月统计
  getStuMonthRecord: `${baseRequest}/attence/record/person/monthRecord`,
  // 学生 - 获取日签到详情
  getDaySignDetail: `${baseRequest}/attence/record/person/recordStatus`,
  // 学生 - 获取学生指定日的申请补卡时间点详情信息\
  getComedyAttendInfo: `${baseRequest}/attence/approval/timePlace`,
  // 学生 - 申请补签
  applyComedySign: `${baseRequest}/attence/approval/apply`,
  // 获取待办审批
  getWaitingApproval: `${baseRequest}/attence/approval/review`,
  // 获取已审核审批
  getProcessedApproval: `${baseRequest}/attence/approval/notReview`,
  // 处理审批
  handleApproval: `${baseRequest}/attence/approval/verify`,
  // 获取考勤统计
  getAttendStatistics: `${baseRequest}/attence/record/teacher/summary`,
  // 获取班级日统计
  getClassDayStatistics: `${baseRequest}/attence/record/teacher/classDaySummary`,
  //  获取班级月统计
  getClassMonthStatistics: `${baseRequest}/attence/record/teacher/classMonthDetails`,
  // 获取一个考勤计划创建后提前多少时间执行通知学生
  getAdvanceTime: `${baseRequest}/attence/plan/advanceTime`,
  // 获取签到信息
  getSignInfo: `${baseRequest}/attence/record/person/checkInStatus`,
  // 获取签到列表
  signInStatusDetail: `${baseRequest}/attence/record/person/checkInStatus`,
  // 打卡
  signIn: `${baseRequest}/attence/record/person/checkIn`,
  // 获取月份学生个人统计
  getClassMonthPersonalStatistics: `${baseRequest}/attence/record/teacher/person/monthSummary`,
  // 我的待办 - 查询
  getAllApprovalByTypes: `${baseRequest}/attence/approval/all`,
  // 我的待办 - 审核
  applyApproval: `${baseRequest}/attence/approval/approval`
};
module.exports = attendanceRequestUrl;