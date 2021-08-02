/**
 * 跳转路径 
 * 
 * authModule模块的页面地址
 */
var page = "/pages/authModule/pages";
var authPageUrl = {
  page,
  // 登录页面地址
  loginUrl: `${page}/login/login`,
  // 授权页面地址
  authUrl: `${page}/auth/auth`,
  // 忘记密码页面地址
  forgetPasswordUrl: `${page}/forgetPassword/forgetPassword`,
  // 账号注册地址
  registUrl: `${page}/regist/regist`,
  // 切换角色页面地址
  switchRoleUrl: `${page}/switchRole/switchRole`,
  // 绑定手机号页面地址
  bindPhoneUrl: `${page}/bindPhone/bindPhone`,
  // 操作成功页面
  successPageUrl: `${page}/successPage/successPage`,
  // 操作失败页面
  failPageUrl: `${page}/failPage/failPage`,
	// 返回重新登录
	rebackUrl: `${page}/reback/reback`,
	rebackUrl: `${page}/reback/reback`
}
module.exports = authPageUrl;