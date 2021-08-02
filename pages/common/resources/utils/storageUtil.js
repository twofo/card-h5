
/**
 * 异步写入缓存
 * 
 * 1. 作用：不管缓存是否存入成功，都会执行下一步
 * 2. 使用场景：写入后的操作，与是否成功存入缓存无关
 * set(key, value)
 */
function set(key, value) {
  if (!key || !value) {
    return;
  }

  wx.setStorage({
    key: key,
    data: value
  });
}
/**
 * 同步写入缓存
 * 
 * 1. 作用：只有缓存存入成功，才会执行下一步
 * 2. 使用场景：写入后的操作，只有成功存入缓存后才执行
 * setSync(key, value)
 */


function setSync(key, value) {
  if (!key || !value) {
    return;
  }

  try {
    return wx.setStorageSync(key, value);
  } catch (e) {
    return wx.setStorage({
      key: key,
      value: value,
      success: function (res) {}
    });
  }
}
/**
 * 同步获取缓存
 * 
 * 1. 作用：只有获取到缓存，才会执行下一步
 * 2. 使用场景：获取缓存后的操作，只有成功获取缓存后才执行
 * get(key)
 */


function get(key, isLogin) {
	// var app = getApp()
	// console.log(app.globalData.showLogin)
  var value;

  if (isLogin != 1 && (key === 'loginObjCach' && key === 'userInfoCach')) {
    if (!uni.getStorageSync(key)) {
			console.log("重新登录")
      redirectToLogin();
    }
  }

  // if (key === 'openid') {
  //   if (!wx.getStorageSync(key)) {
  //     setTimeout(function () {
  //       wx.navigateTo({
  //         url: '/pages/authModule/pages/auth/auth'
  //       });
  //     }, 500);
  //   }
  // }

  try {
    value = wx.getStorageSync(key);
  } catch (e) {
    value = wx.getStorage({
      key: key,
      success: function (res) {}
    });
  }

  console.log(key, value);
  return value;
}

function redirectToLogin() {
	var app = getApp()
	console.log(app.globalData.showLogin)
  setTimeout(function () {
		console.log("跳转过去")
		var url;
		if(app.globalData.showLogin){
			url = '/pages/authModule/pages/login/login'
		}else{
			url = '/pages/authModule/pages/reback/reback'
		}
    uni.reLaunch({
      url: url,
			success() {
				console.log('跳转成功')
			},
			fail(err) {
				console.log(err)
			}
    });
  }, 50);
}
/**
 * 清除缓存
 * 
 * 1. 作用：根据key值清楚对应的缓存
 * 2. 使用场景：不需要缓存时
 * remove(key)
 */


function remove(key) {
  if (!key) {
    return;
  }

  wx.removeStorage({
    key: key
  });
}
/**
 * 获取设置了过期时间的缓存
 * 
 * 1. 获取设置过期时间的缓存，
 * 2. 若缓存过期，则提示默认值
 * get('key', '默认值')
 */


function getOfExpire(key) {
  const timeout = parseInt(wx.getStorageSync(key + "" + '_paseTime') || 0); // 1. 判断timeout是否存在。 

  if (timeout) {
    // 若存在则，则判断时间是否过期
    if (Date.now() > timeout) {
      removeOfExpire(key);
      return;
    }
  } // 若不存在则为永久保存;
  // 2. key没过期，永久保存都可取出


  let value = wx.getStorageSync(key); // return value ? value : def;

  return value;
}

;
/**
 * 写入有过期时间的缓存
 * 
 * 1. 写入需存储key及value的缓存
 * 2. 需存储一个过期时间的缓存
 * 3. 写入分两种：（1）写入永久 （2）写入过期
 * 4. 过期时间单位为小时
 */

function setOfExpire(key, value, timeout = 0) {
  var _timeout = parseInt(timeout); // 若有过期时间，则使用过期时间缓存


  if (_timeout) {
    wx.setStorageSync(key + "" + '_paseTime', Date.now() + _timeout * 1000 * 60 * 60);
  } else {
    removeOfExpire(key);
  } // 若没有过期时间，则为永久


  wx.setStorageSync(key, value);
  return value;
}

function removeOfExpire(key) {
  wx.removeStorageSync(key);
  wx.removeStorageSync(key + "" + '_paseTime');
  return undefined;
}
/**
 * 清空换存
 * 
 * 1. 作用：清空除了opeanid的缓存
 * 2. 使用场景：退出登录与清空缓存时
 * clear()
 */


function clear() {
  remove("loginObjCach");
  remove("userInfoCach");
  remove("onceLimitCach");
  remove("oneDayLimitCach");
  remove("oneMonthLimitCach");
  remove("helpCach");
  remove("helpCach_paseTime");
  remove("articleCach");
  remove("articleCach_paseTime");
  remove("issueCach");
  remove("issueCach_paseTime");
  remove("userDetailCach");
  remove("deviceCach");
  remove("deviceFaultCach");
  remove("ElectMonthCach");
  remove("ElectDataCach");
  remove("waterMonthCach");
  remove("waterDataCach");
  remove("buildsByAdminId");
  remove("attendaceWeekCach");
  remove("departmentCach");
  remove("majorCach");
  remove("classCach");
  remove("sendPageObjCach");
  remove("toWeekCach");
  remove("tabBarIndex");
  remove("deviceAdminEleDetailCach");
  remove("deviceAdminWaterDetailCach");
  remove("purseBalanceCach");
  remove('pianoConfigDate');
  remove('danceConfigDate');
  remove("attendeeStudentCach");
}

module.exports = {
  get: get,
  set: set,
  setSync: setSync,
  remove: remove,
  getOfExpire: getOfExpire,
  setOfExpire: setOfExpire,
  removeOfExpire: removeOfExpire,
  clear: clear
};