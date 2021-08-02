/**
 * 跳转路径 
 * 
 * 维修模块 - 页面地址
 */
var page = "/pages/repairModule/pages";
var repairPageUrl = {
  page,
  // 学生端 - 报修首页
  studentRepairIndexUrl: `${page}/studentRepairIndex/studentRepairIndex`,
  // 学生端 - 报修首页 - 报修申请
  studentRepairApplyUrl: `${page}/studentRepairApply/studentRepairApply`,
  // 学生端 - 报修首页 - 我的报修
  studentRepairShowUrl: `${page}/studentRepairShow/studentRepairShow`,
  // 学生端 - 报修首页 - 我的报修 - 报修详情
  studentRepairDetailUrl: `${page}/studentRepairDetail/studentRepairDetail`,
  // 学生端 - 报修首页 - 我的报修 - 报修评价
  studentRepairCommentUrl: `${page}/studentRepairComment/studentRepairComment`,
  // 操作成功页面
  successPageUrl: `${page}/successPage/successPage`,
  // 宿管端 - 报修管理
  repairManageUrl: `${page}/repairManage/repairManage`,
  // 宿管端 - 报修管理 - 报修详情
  repairDetailUrl: `${page}/repairDetail/repairDetail`,
  // 宿管端 - 报修管理 - 报修分配
  repairDistributeUrl: `${page}/repairDistribute/repairDistribute`,
  // 维修端 - 首页
  index: `${page}/index`,
  // 维修端 - 首页 - 报修详情页面
  repairDetailOfMaintainUrl: `${page}/repairDetailOfMaintain/repairDetailOfMaintain`,
  // 维修端 - 工单 - 维修完成
  maintainFinishUrl: `${page}/maintainFinish/maintainFinish`,
  // 维修端 - 我的 - 工单完成统计
  finishOrderStatisticsUrl: `${page}/finishOrderStatistics/finishOrderStatistics`,
  // 维修端 - 我的 - 评价统计
  commentStatisticsUrl: `${page}/commentStatistics/commentStatistics`
};
module.exports = repairPageUrl;