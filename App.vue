<script>

export default {
  globalData: {
    version: 'v3.0.5',
    SystemInfo: uni.getSystemInfoSync(),
		showOnlyABC: false,
		  //true 为APP嵌入银行APP中 
		  
		showLogin: true,  //是否需要登录,非单点需要登录 ,false 单点不需要
		   //h5
		   
		//   buf2hex: function (buffer) { 
		//     return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
		//   },
    //app.js
    // getUserInfo: function (cb) {
    //   var that = this;

    //   if (this.personInfo) {
    //     typeof cb == "function" && cb(this.personInfo);
    //   } else {
    //     //调用登录接口
    //     wx.login({
    //       success: function () {
    //         wx.getUserInfo({
    //           success: function (res) {
    //             that.personInfo = res.userInfo;
    //             typeof cb == "function" && cb(that.personInfo);
    //           }
    //         });
    //       }
    //     });
    //   }
    // },
    getNet: function () {
      uni.getNetworkType({
        success: function (res) {
          // 返回网络类型, 有效值：
          // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
          var networkType = res.networkType;
					console.log(networkType)
          if (networkType == none) {
            return false;
          }

          return true;
        }
      });
    },

    // getUserInStorage: function(user){
    //   if(user == undefined || user == '') {
    //     wx.showModal({
    //       title: '请先登录！',
    //       content: '还未登录',
    //       showCancel: false
    //     });
    //     wx.navigateTo({
    //       url: '/pages/login/login',
    //     })
    //   } else {
    //     return true;
    //   }
    // },
    // getUser: function () {
    //   var openid = wx.getStorageSync('userInfo');
    //   if (openid == '' || openid == undefined) {
    //     wx.navigateTo({
    //       url: '/pages/auth/auth',
    //     })
    //   } else {
    //     return wx.getStorageSync('user');
    //   }
    // },
    // processData: function(key){
    //   var _this = this;
    //   var data = JSON.parse(_this.util.base64.decode(key));
    //   _this._user.is_bind = data.is_bind;
    //   _this._user.openid = data.user.openid;
    //   _this._user.teacher = (data.user.type == '教职工');
    //   _this._user.we = data.user;
    //   _this._time = data.time;
    //   _this._t = data['\x74\x6f\x6b\x65\x6e'];
    //   console.log(_this);
    //   return data;
    // },
    // 检测当前微信版本号是否大于 7.0.12
    // compareVersion(v1, v2) {
    //   v1 = v1.split('.');
    //   v2 = v2.split('.');
    //   const len = Math.max(v1.length, v2.length);

    //   while (v1.length < len) {
    //     v1.push('0');
    //   }

    //   while (v2.length < len) {
    //     v2.push('0');
    //   }

    //   for (let i = 0; i < len; i++) {
    //     const num1 = parseInt(v1[i]);
    //     const num2 = parseInt(v2[i]);

    //     if (num1 > num2) {
    //       return 1;
    //     } else if (num1 < num2) {
    //       return -1;
    //     }
    //   }

    //   return 0;
    // },

    /**
     * 实现文件规范
     * 
     * 调用文件
     */
		
			// util: require('./utils/util'),
			// 请求 - 路径调用
			RequestUrl: require("./pages/common/resources/requestUrl.js"),
			// 跳转 - 路径调用
			PageUrl: require("./pages/common/resources/pageUrl.js"),
			// 主包图片路径
			ImageUrl: require("./pages/common/resources/imageUrl.js"),
			// 静态常量
			Constant: require("./pages/common/resources/constant.js"),
			// 工具方法
			Utils: require("./pages/common/resources/utils.js"),
			// // 缓存 - 工具方法调用
			StorageUtil: require("./pages/common/resources/utils/storageUtil.js"),
			// // 校验 - 工具方法调用
			CheckUtil: require("./pages/common/resources/utils/checkUtil.js"),
			// // 提示信息 - 方法调用
			ShowMsgUtil: require("./pages/common/resources/utils/showMsgUtil.js"),
			// // 常用 - 工具方法调用
			PublicUtil: require("./pages/common/resources/utils/publicUtil.js"),
			base64Util: require("./pages/common/resources/utils/base64.js"),
			// // AES加密 - 工具方法调用
			CryptoJS: require("./pages/common/resources/utils/encrypt/AES_Tool.js"),
			// // arrayBufferDemo: require("./pages/tarBarModule/demo/arrayBufferDemo.js"),
			// bluetoothUtil: require("./pages/common/resources/utils/bluetooth/bluetoothUtil.js"),
			// agreementUtil: require("./pages/common/resources/utils/bluetooth/agreementUtil.js")
		
   
  },
  //版本号
  onLaunch: function () {
    var _this = this; //读取缓存
		
  },
  onShow: function () {
  
   
  },
};
</script>
<style>
@import "./app.css";
</style>   