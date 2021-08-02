

var ShowMsgUtil = require("./showMsgUtil.js");
/**
 * 判断输入是否为空
 * 
 * param1参数
 * param2参数
 * isNotBlank(param1, param2)
 */


function isNotBlank(param1) {
  // if (!param1 || !param2) {
  //   return false;
  // }
  // return true;
  if (param1 != '' && param1 != null) {
    return true;
  }

  return false;
}

function checkEmpty(e) {
  if (e != '' && e != null) {
    return true;
  }

  return false;
}
/**
 * 校验手机号码的格式
 * 
 * phoneNum
 * checkPhone(phoneNum)
 */


function checkPhone(phoneNum) {
  let str = /^1[34578]\d{9}$/;

  if (str.test(phoneNum)) {
    return true;
  } else {
    return false;
  }
} // 判断缓存里是否存在user


function checkUserExists(user) {
	var app = getApp();
  if (user == undefined || user == '') {
		var url;
		if(app.globalData.showLogin){
			url = '/pages/authModule/pages/login/login'
		}else{
			url = '/pages/authModule/pages/reback/reback'
		}
    wx.redirectTo({
      url: url,
    });
  }
} // 检查token是否登录过期


function checkLoginInPast(code) {
	var app = getApp();
	console.log('其他js文件中的app', app)
  if (code == 1001) {
    ShowMsgUtil.showErrorModal('请重新登录！', '登录过期');
    wx.hideToast();
    setTimeout(function () {
			var url;
			if(app.globalData.showLogin){
				url = '/pages/authModule/pages/login/login'
			}else{
				url = '/pages/authModule/pages/reback/reback'
			}
      wx.redirectTo({
        url:url,
      });
    }, 2000);
    return true;
  }
} // 性名验证


function verifyName(name) {
  if (!/^[\u4E00-\u9FA5A-Za-z]+$/.test(name)) {
    ShowMsgUtil.showErrorModal('请重新输入', '持卡人姓名有误');
    return false;
  }

  return true;
} // 银行卡号验证


function verifyCardNumber(cardNumber) {
  if (!/^([1-9]{1})(\d{12,18})$/.test(cardNumber)) {
    ShowMsgUtil.showErrorModal('格式不正确', '银行卡号位数为13到19的数字');
    return false;
  }

  return true;
} // 验证金额是否合法


function verifyMoney(money) {
  var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;

  if (!reg.test(money)) {
    return false;
  }

  return true;
}

function idCardCheck(num) {
  var res = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;

  if (!res.test(num)) {
    return false;
  }

  return true;
}

module.exports = {
  checkUserExists: checkUserExists,
  checkLoginInPast: checkLoginInPast,
  isNotBlank: isNotBlank,
  checkPhone: checkPhone,
  verifyName: verifyName,
  verifyCardNumber: verifyCardNumber,
  verifyMoney: verifyMoney,
  idCardCheck
};