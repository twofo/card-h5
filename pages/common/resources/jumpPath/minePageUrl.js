/**
 * 跳转路径 
 * 
 * mineModule模块的页面地址
 */
var page = "/pages/mineModule/pages";
var minePageUrl = {
  page,
  // 用户详情 - 页面地址
  userDetail: `${page}/userDetail/userDetail`,
  // 二维码详情 - 页面地址
  QRCodeDetail: `${page}/QRCodeDetail/QRCodeDetail`,
  // 上传图像 - 页面地址
  uploadPic: `${page}/uploadPic/uploadPic`,
  // 意见反馈 - 页面地址
  issueUpdata: `${page}/issueUpdata/issueUpdata`,
  // 操作记录 - 页面地址
  operatingRecord: `${page}/operatingRecord/operatingRecord`,
  // 帮助 - 页面地址
  help: `${page}/help/help`,
  // 帮助列表 - 页面地址
  helpIssue: `${page}/helpIssue/helpIssue`,
  // 问题详情 - 页面地址
  issueDetail: `${page}/issueDetail/issueDetail`,
  // 设置 - 页面地址
  set: `${page}/set/set`,
  // 限额设置 - 页面地址
  setLimit: `${page}/setLimit/setLimit`,
  // 修改密码 - 页面地址
  passwordAlter: `${page}/passwordAlter/passwordAlter`,
  // 挂失申请 - 页面地址
  lossApply: `${page}/lossApply/lossApply`,
  //关于我们 - 页面地址
  about: `${page}/about/about`,
  //发布公告 - 页面地址
  publish: `${page}/publish/publish`,
  //发布公告 - 页面地址
  selectDepartmentOrBuildUrl: `${page}/selectDepartmentOrBuild/selectDepartmentOrBuild?selectId=1`,
  //消息模板Demo
  messageDemo: `${page}/messageDemo/messageDemo`
};
module.exports = minePageUrl;