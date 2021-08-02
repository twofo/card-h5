/**
 * 请求路径 
 * 
 * 维修模块 - 请求地址
 */
var BaseUrl = require("../common.js");

var baseRequest = BaseUrl.baseRequestUrl; //清远
// var baseRequest = 'http://localhost:8088/rest'//本地环境 65
// var baseRequest = "http://192.168.1.62:80/rest";//张家玮

var repairRequestUrl = {
  baseRequest,
  // 学生端 - 报修申请
  saveRepairs: `${baseRequest}/iot/repair/saveRepairs`,
  // 学生端 - 报修列表查询
  selectRepairsList: `${baseRequest}/iot/repair/selectRepairsList`,
  // 学生端 - 查询报修详情
  selectRepairByCode: `${baseRequest}/iot/repair/selectRepairByCode`,
  // 学生端 - 提交报修评价
  saveComments: `${baseRequest}/iot/repair/saveComments`,
  // 宿管端 - 查询所有工种
  selectALLWorkerType: `${baseRequest}/iot/repair/selectALLWorkerType`,
  // 宿管端 - 查询工种下的人员
  selectALLByWorkerId: `${baseRequest}/iot/repair/selectALLByWorkerId`,
  selectAllWorker: `${baseRequest}/iot/repair/selectAllWorker`,
  // 宿管端 - 确认分配师傅
  saveDistribution: `${baseRequest}/iot/repair/saveDistribution`,
  // 维修端 - 确认处理
  confirmDeal: `${baseRequest}/iot/repair/confirmDeal`,
  // 维修端 - 确认拒绝
  confirmRefuse: `${baseRequest}/iot/repair/saveDeviceRepairRefuse`,
  // 维修端 - 维修完成
  repairFinish: `${baseRequest}/iot/repair/saveDeviceRepairFinish`,
  // 维修端 - 我的评价
  getCommentStatistics: `${baseRequest}/iot/repair/getDeviceRepairComment`,
  // 维修端 - 评论统计
  selectStatisticsOfComment: `${baseRequest}/iot/repair/selectStatisticsOfComment`,
  // 维修端 - 已完成工单统计
  selectStatisticsOfWorkOrder: `${baseRequest}/iot/repair/selectStatisticsOfWorkOrder`
};
module.exports = repairRequestUrl;