/**
 * 图片路径 
 * 
 * 考勤分包 - 图片地址
 */
var image = "/static/pages/attendanceModule/resources/pic";
var imageUrl = {
  image,
  // 辅导员端 - deletePic
  deletePic: `${image}/delete.png`,
  // 辅导员端 - 审核管理 - 同意
  approvalAgree: `${image}/approval_agree.png`,
  // 辅导员端 - 审核管理 - 拒绝
  approvalReject: `${image}/approval_reject.png`,
  // 学生端：考勤 - 考勤打卡
  clock: `${image}/clock.png`,
  // 学生端：考勤 - 考勤统计
  attendaceStatistics: `${image}/attendaceStatistics.png`,
  // 学生端：考勤 - 位置
  position: `${image}/position.png`,
  // 学生端：考勤 - 考勤统计 - 禁止
  error: `${image}/error.png`,
  // 学生端：考勤 - 考勤统计 - 结束
  right: `${image}/right.png`,
  // 学生端：考勤 - 考勤统计 - 无需打卡 
  msg: `${image}/msg.png`,
  // 学生端：考勤 - 考勤打卡 - 开始
  start: `${image}/start.png`,
  // 学生端：考勤 - 考勤打卡 - 结束
  end: `${image}/end.png`,
  // 学生端：考勤 - 补卡申请 - 相机
  camera: `${image}/camera.png`
};
module.exports = imageUrl;