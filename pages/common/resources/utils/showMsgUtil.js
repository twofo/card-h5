// var app = getApp().globalData;
/**
 * 提示操作成功
 * 
 * title      信息提示标题
 * duration   显示时间
 * showSuccessToast(title, duration)
 */

function showSuccessToast(title, duration) {
  wx.hideToast();
  wx.showToast({
    title: title || '加载中',
    icon: 'success',
    mask: true,
    duration: duration || 10000
  });
}
/**
 * 操作成功并返回上一级
 * 
 * title      信息提示标题
 * duration   显示时间
 */


function showSuccessAndReturn(title, duration) {
  wx.hideToast();
  wx.showToast({
    title: title || '操作成功',
    icon: 'success',
    duration: duration || 2000
  });
  setTimeout(function () {
    wx.navigateBack({
      delta: 1
    });
  }, 2000);
}
/**
 * 提示后台返回错误信息
 * 
 * title      信息提示标题
 * content    信息提示内容
 */


function showErrorModal(title, content, code,confirmText) {
  wx.hideToast();
	var app = getApp()
  if (code == 1001 || code == 2200) {
		if(app.globalData.showLogin){
			uni.showToast({
			  title: '登录已失效!',
			  icon: 'none',
			  mask: true,
			  duration: 2000
			});
		}
   
    setTimeout(function () {
			var url;
			if(app.globalData.showLogin){
				url = '/pages/authModule/pages/login/login'
			}else{
				url = '/pages/authModule/pages/reback/reback'
			}
      wx.redirectTo({
        url: url
      });
    }, 500);
  } else {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false,
      confirmColor: '#20a4f7',
      confirmText:  confirmText || '确定'
    });
  }
}
/**
 * 只显示加载图像
 * 
 * title      信息提示标题
 * duration   显示时间
 */


function showLoadToast(title, duration) {
  wx.hideToast();
  wx.showToast({
    title: title || '',
    icon: 'loading',
    mask: true,
    duration: duration || 10000
  });
}
/**
 * 提示加载图像与加载信息
 * 
 * title      信息提示标题
 * duration   显示时间
 */


function showLoadAndMsgToast(title, duration) {
  wx.hideToast();
  wx.showToast({
    title: title || '加载中',
    icon: 'loading',
    mask: true,
    duration: duration || 10000
  });
}
/**
 * 提示无法避免的错误
 * 
 * title      信息提示标题
 * duration   显示时间
 */


function showNoneToast(title, duration) {
  wx.showToast({
    title: title || '加载中',
    icon: 'none',
    mask: true,
    duration: duration || 10000
  });
}

function showNoneToastByFail() {
  uni.hideToast();
	uni.showToast({
	  title: '对不起，您访问的服务出错',
	  icon: 'none',
	  mask: true,
	  duration: 2000
	});
	
}

/**
 * 是否弹窗模板
 *   
 */
// wx.showModal({
//   title: '提示',
//   content: '是否编辑预约信息',
//   cancelText: '否',
//   confirmText: '是',
//   confirmColor: '#20a4f7',
//   success(res) {
//     if (res.confirm) {
//       //点击确定
//      
//     } else if (res.cancel) {
//       //点击否
//       
//     }
//   }

/**
 * 网络异常提示
 * 
 * msg      
 */
 function netErrNotice(){
	uni.getNetworkType({
	  success: function (res) {
	    var networkType = res.networkType;
			console.log(networkType)
	    if (networkType == 'none') {
					uni.showToast({
						mask:true,
						title:'当前网络不可用,请开启网络',
						icon:none,
						duration:60000
					})
				
	    }else if(networkType == '2g' || networkType == '3g'){
					 uni.showToast({
					 	mask:true,
						title:'网络不佳，请切换网络',
						icon:none,
						duration:3000
						
					 })
			}
	
	  },
	});
}


function showNetWorkError(msg) {
  var _this = this;

  _this.showLoadToast(msg, 5000);

  wx.showNavigationBarLoading();
}

module.exports = {
  showSuccessToast: showSuccessToast,
  showSuccessAndReturn: showSuccessAndReturn,
  showErrorModal: showErrorModal,
  showLoadToast: showLoadToast,
  showLoadAndMsgToast: showLoadAndMsgToast,
  showNoneToast: showNoneToast,
  showNetWorkError: showNetWorkError,
  showNoneToastByFail: showNoneToastByFail,
	netErrNotice:netErrNotice
};