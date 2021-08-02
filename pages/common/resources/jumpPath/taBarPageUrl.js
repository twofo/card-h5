/**
 * 跳转路径 
 * 
 * taBarPageUrl模块的页面地址
 */
var page = "/pages/tarBarModule";
var taBarPageUrl = {
  page,
  // 首页页面地址
  indexUrl: `${page}/index/index`,
  // 登录页面地址
  loginUrl: `${page}/login/login`,
  // 消息页面地址
  messageUrl: `${page}/message/message`,
  // 个人中心页面地址
  mine: `${page}/mine/mine`
};
module.exports = taBarPageUrl;