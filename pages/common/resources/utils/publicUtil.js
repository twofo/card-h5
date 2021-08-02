// var app = getApp().globalData;
/**
 * 在duration以后跳转到url页面
 * 
 * url        页面路径
 * duration   显示时间
 * jumpByUrl(url, duration)
 */

function navigateByUrl(url, duration) {
  setTimeout(function () {
    wx.navigateTo({
      url: url
    });
  }, duration || 2000);
}

function navigateBack(duration) {
  setTimeout(function () {
    wx.navigateBack({
      delta: 1
    });
  }, duration || 2000);
}

function navigateBackByValue(duration, value) {
  setTimeout(function () {
    wx.navigateBack({
      delta: 1 + '?value=' + value
    });
  }, duration || 2000);
}

function redirectByUrl(url, duration) {
  setTimeout(function () {
    wx.redirectTo({
      url: url
    });
  }, duration || 2000);
}

function reLaunchByUrl(url, duration) {
  setTimeout(function () {
    wx.reLaunch({
      url: url
    });
  }, duration || 2000);
}

function switchTabByUrl(url, duration) {
  setTimeout(function () {
    wx.switchTab({
      url: url
    });
  }, duration || 2000);
}
/**
 * 输入框动态效果
 * 
 * inputFocus(e, that)
 */


function inputFocus(e, that) {
  if (e.target.id == 'username') {
    that.setData({
      'username_focus': true
    });
  } else if (e.target.id == 'phone') {
    that.setData({
      'phone_focus': true
    });
  } else if (e.target.id == 'authCord') {
    that.setData({
      'authCord_focus': true
    });
  } else if (e.target.id == 'password') {
    that.setData({
      'password_focus': true
    });
  } else if (e.target.id == 'confirmPassword') {
    that.setData({
      'confirmPassword_focus': true
    }); /////
  } else if (e.target.id == 'number') {
    that.setData({
      'number_focus': true
    });
  } else if (e.target.id == 'gender') {
    that.setData({
      'gender_focus': true
    });
  } else if (e.target.id == 'birth') {
    that.setData({
      'birth_focus': true
    });
  } else if (e.target.id == 'idCard') {
    that.setData({
      'idcard_focus': true
    });
  }
}

function inputBlur(e, that) {
  if (e.target.id == 'username') {
    that.setData({
      'username_focus': false
    });
  } else if (e.target.id == 'phone') {
    that.setData({
      'phone_focus': false
    });
  } else if (e.target.id == 'authCord') {
    that.setData({
      'authCord_focus': false
    });
  } else if (e.target.id == 'password') {
    that.setData({
      'password_focus': false
    });
  } else if (e.target.id == 'confirmPassword') {
    that.setData({
      'confirmPassword_focus': false
    }); //////
  } else if (e.target.id == 'number') {
    that.setData({
      'number_focus': false
    });
  } else if (e.target.id == 'gender') {
    that.setData({
      'gender_focus': false
    });
  } else if (e.target.id == 'birth') {
    that.setData({
      'birth_focus': false
    });
  } else if (e.target.id == 'idCard') {
    that.setData({
      'idcard_focus': false
    });
  }
}
/**
 * 信息展示为空处理
 * 
 * inputFocus(e, that)
 */


function isNullDeal(userInfoCach, userDetailCach) {
  if (userDetailCach.name == null) {
    userDetailCach.name = '暂无';
  }

  if (userDetailCach.personType == 0 && userDetailCach.studentCode == null) {
    userDetailCach.studentCode = '暂无';
  }

  if (userDetailCach.personType == 0 && userDetailCach.majorName == null) {
    userDetailCach.majorName = '暂无';
  }

  if (userDetailCach.personType == 1 && userDetailCach.teacherCode == null) {
    userDetailCach.teacherCode = '暂无';
  }

  if (userInfoCach.roomInfo != null && (userInfoCach.roomInfo.buildName == null || userInfoCach.roomInfo.roomName == null)) {
    userInfoCach.roomInfo.buildName = '暂无';
    userInfoCach.roomInfo.roomName = '暂无';
  }

  if (userDetailCach.className == null) {
    userDetailCach.className = '暂无';
  }

  if (userDetailCach.college == null) {
    userDetailCach.college = '暂无';
  }

  if (userInfoCach.roomInfo == null) {
    userInfoCach.roomInfo = '暂无';
  }

  if (userDetailCach.personType == 1 && userDetailCach.department == null) {
    userDetailCach.department = '暂无';
  }

  if (userDetailCach.cardNumber == null) {
    userDetailCach.cardNumber = '暂无';
  }

  if (userInfoCach.role != null) {
    if (userDetailCach.name == null) {
      userDetailCach.name = '暂无';
    }

    if (userDetailCach.department == null) {
      userDetailCach.department = '暂无';
    }

    if (userDetailCach.email == null) {
      userDetailCach.email = '暂无';
    }

    if (userDetailCach.mobile == null) {
      userDetailCach.mobile = '暂无';
    }
  }

  return userDetailCach;
}
/**
 * 将时间戳转化为日期
 * 
 * formatTime(currenttime, 'Y/M/D h:m:s')
 */


function formatIosTime(dates) {
  var date = new Date(dates); //一定要记得写这个，不然会报date.getFullYear is not a function

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatTime(dates) {
  var date = new Date(dates); //一定要记得写这个，不然会报date.getFullYear is not a function

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};
/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/


function formatTimeTwo(number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }

  return format;
}
/** 
 * 获取当前时间与星期
 * 
 * days: 传入天数
 * todate默认参数是当前日期，可以传入对应时间 todate格式为2018-10-05
*/


function getDates(days, todate) {
  var dateArry = [];

  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj);
  }

  return dateArry;
}

function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('7', '1', '2', '3', '4', '5', '6');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  let yearDate = date.getFullYear();
  let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  let dayFormate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  dateObj.time = yearDate + '-' + month + '-' + dayFormate;
  dateObj.week = show_day[day];
  return dateObj;
}
/**
 * 门锁操作类型
 */


function getDeviceStatusS(openrateAction) {
  // 0 - 重置 1 - 重启 2 - 升级 3 - 锁定 4 - 解锁 5 - 自检 6 - 开门
  switch (openrateAction) {
    case 0:
      return "重置";
      break;

    case 1:
      return "重启";
      break;

    case 2:
      return "升级";
      break;

    case 3:
      return "锁定";
      break;

    case 4:
      return "解锁";
      break;

    case 5:
      return "自检";
      break;

    case 6:
      return "开门";
      break;

    default:
      return "未知";
      break;
  }
}
/** 
 * 判断对象是否为空
 * 
 * days: 传入天数
 * todate默认参数是当前日期，可以传入对应时间 todate格式为2018-10-05
*/


function isNotEmpty(obj) {
  if (Object.keys(obj).length === 0) {
    return false;
  }

  return true;
}
/**
 * 判断是否第一次进入此页面
 */


function isFristEnter() {
  let isFrist = false;
  var pages = getCurrentPages();
  var obj = {}; //isFirst页面栈是否含有本页面，目的为了避免通过目录无限循环，解决小程序10层页面的问题

  for (var i in pages) {
    //将循环数组中的每个数赋值给item 作为对象中的键
    var item = pages[i].route;

    if (obj[item]) {
      //这句的意思是对象中以item作为键存在吗，如果存在的话，就让这键的值再加1
      obj[item] = obj[item] + 1;
      isFrist = false;
    } else {
      //如果不存在等于1，多次循环就可得到结果
      obj[item] = 1;
      isFrist = true;
    }
  }

  console.log(obj);
  return isFrist;
} // 计算余额


function minuteChanageYuanBalance(money) {
  if (money == null) {
    money = 0;
  }

  let result = parseFloat(money);
  result = (result / 100.0).toFixed(2);
  return result;
} // 数组去重


function arrayUnique(array) {
  var r = [];

  for (var i = 0, l = array.length; i < l; i++) {
    for (var j = i + 1; j < l; j++) if (array[i] === array[j]) j = ++i;

    r.push(array[i]);
  }

  return r;
}

module.exports = {
  navigateByUrl: navigateByUrl,
  navigateBack: navigateBack,
  navigateBackByValue: navigateBackByValue,
  redirectByUrl: redirectByUrl,
  switchTabByUrl: switchTabByUrl,
  reLaunchByUrl: reLaunchByUrl,
  inputFocus: inputFocus,
  inputBlur: inputBlur,
  isNullDeal: isNullDeal,
  formatIosTime: formatIosTime,
  formatTime: formatTime,
  formatTimeTwo: formatTimeTwo,
  getDates: getDates,
  isNotEmpty: isNotEmpty,
  getDeviceStatusS: getDeviceStatusS,
  isFristEnter: isFristEnter,
  minuteChanageYuanBalance: minuteChanageYuanBalance,
  arrayUnique: arrayUnique
};