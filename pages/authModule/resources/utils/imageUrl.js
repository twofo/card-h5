/**
 * 图片路径 
 * 
 * AuthImageUrl图片地址
 */
var image = "/static/pages/authModule/resources/pic";
var authImageUrl = {
  image,
  // logo
  logo: `${image}/logo.png`,
  regist: `${image}/regist.png`,
  help: `${image}/help.png`,
  // forget
  forget: `${image}/forget.png`,
  // wave
  wave: `${image}/wave.png`,
  // loading
  loading: `${image}/loading.gif`,
  // 选中
  icRoleCheck: `${image}/ic_role_check.png`,
  // 普通用户
  user: `${image}/user.png`,
  // 维修工
  maintainAdmin: `${image}/maintain_admin.png`,
  // 宿管
  dormAdminAdmin: `${image}/dorm_admin_admin.png`,
  // 辅导员
  counsellAdmin: `${image}/counsell_admin.png`,
  // 密码可见 - 打开
  passwordEyeOpen: `${image}/password_eye_open.png`,
  // 密码可见 - 关闭
  passwordEyeClose: `${image}/password_eye_close.png`,
	//404
	notFountImg:`${image}/404.png`
};
module.exports = authImageUrl;