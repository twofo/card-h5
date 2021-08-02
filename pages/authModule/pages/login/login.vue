<template>
<view class="container">
  <view class="remind-box" v-if="remind">
    <image class="remind-img" :src="authImageUrl.loading"></image>
  </view>
  <block v-else>
    <view class="content">
      <view class="hd" :style="'transform:rotateZ(' + angle + 'deg);'">
          <image class="logo" :src="authImageUrl.logo"></image>
          <image class="wave" :src="authImageUrl.wave" mode="aspectFill"></image>
          <image class="wave wave-bg" :src="authImageUrl.wave" mode="aspectFill"></image>
      </view>
      <view class="bd">
        <form class="login-form">
          <view :class="'input-group ' + (username_focus ? 'active' : '')">
            <text class="input-label">账号</text>
            <input type="text" cursor-spacing="30" id="username" maxlength="20" placeholder="请输入登录认证账号" @input="useridInput" @focus="inputFocus" @blur="inputBlur" :value="username"></input>
          </view>
          <view :class="'input-group ' + (password_focus ? 'active' : '')">
            <text class="input-label">密码</text>
            <input :password="!isShow" cursor-spacing="30" id="password" placeholder="密码默认为身份证后6位" @input="passwdInput" @focus="inputFocus" @blur="inputBlur"></input>
            <image :src="isShow ?  authImageUrl.passwordEyeOpen : authImageUrl.passwordEyeClose" style="width:65rpx;height:30rpx;" @tap="bindSee"></image>
          </view>
          <view class="login-help">
            <text v-if="isNeedRegistration" @tap="regist">账号注册</text>
            <image v-if="isNeedRegistration" class="login-help-img" :src="authImageUrl.regist"></image>
            <text v-if="isForgetPassword" @tap="forgetPassword">忘记密码</text>
            <image v-if="isForgetPassword" class="login-help-img" :src="authImageUrl.forget"></image>
            <text @tap="showHelp" v-if="!isNeedRegistration">帮助</text>
            <image class="login-help-img" v-if="!isNeedRegistration" @tap="showHelp" :src="authImageUrl.help"></image>
          </view>
        </form>
        <view class="confirm-btn" @tap="bind">
            <text>确认绑定</text>
        </view>
      </view>

      <view class="help" id="help" v-if="help_status" @tap="tapHelp">
        <view class="box">
          <view class="box-hd">
            <text class="box-title">帮助</text>
            <!-- <image class="box-close" src="/images/more/close.png" bindtap="hideHelp"></image> -->
          </view>
          <view class="box-bd">
            <view class="help-q">1、帐号和密码是什么？</view>
            <view class="help-a">
              <text>帐号：统一认证码（学号或者职工工号）</text>
              <text>密码：初始密码(身份证后6位)或者已更改密码</text>
              <view class="help-q">2、忘记密码？</view>
              <view class="help-a">
                <text>请使用手机号码验证码找回密码</text>
              </view>
            </view>
          </view>
        </view>
      </view>

    </view>
  </block>

</view>
</template>

<script>
//获取应用实例
var app = getApp({allowDefault: true});
var authImageUrl = require("../../resources/utils/imageUrl.js");

export default {
  data() {
    return {
      authImageUrl: authImageUrl,
      remind: '加载中',
      help_status: false,
      username_focus: false,
      password_focus: false,
      userid: '',
      passwd: '',
      angle: 0,
      phone: '',
      isShow: false,
      username: '',
      isNeedRegistration: false,
      //是否需要注册
      isForgetPassword: false //是否开放忘记密码

    };
  },

  
	mounted(){
		//#ifdef H5  
		document.querySelector('.uni-page-head-hd').style.display = 'none'  
		//#endif  
	},
  onShow: function () {
    // 清空缓存
    app.globalData.StorageUtil.clear();
    // this.isRegistrationUser(); // 获取上一次登录的账号

    if (app.globalData.StorageUtil.get('username')) {
      this.setData({
        userid: app.globalData.StorageUtil.get('username'),
        username: app.globalData.StorageUtil.get('username')
      });
    }
  },
  created: function () {
    var that = this; // 显示加载动画
		console.log("登陆界面")
		console.log(app)
    setTimeout(function () {
      that.setData({
        remind: ''
      });
    }, 1000);
  },
  methods: {
    /**
     * 登录按钮
     */
    bind: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      if (!app.globalData.CheckUtil.isNotBlank(_this.userid) || !app.globalData.CheckUtil.isNotBlank(_this.passwd)) {
        app.globalData.ShowMsgUtil.showErrorModal('提醒', '账号及密码不能为空');
        return;
      }

      app.globalData.ShowMsgUtil.showLoadAndMsgToast('登录中'); // 对密码进行aes+base64加密

      var result = app.globalData.CryptoJS.EncryptBASE64(_this.passwd); // console.log( app.RequestUrl.baseRequestUrl.auth)
      // console.log("登录请求路径 - ", app.RequestUrl.baseRequestUrl.auth);

      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.auth,
        data: {
          username: _this.userid,
          password: result
        },
        header: {
          'content-type': 'application/json' //默认值
					
        },
        method: 'POST',
        success: function (res) {
			console.log(res);
          if (res.data && res.data.code == "200") {
            // 保存登录账号
            app.globalData.StorageUtil.set('username', res.data.rows.username);
            let obj = res.data.rows; // 提示登录成功
             console.log(obj);
            app.globalData.ShowMsgUtil.showSuccessToast("登录成功");
						
            /**
             * obj.image == null 的时候提醒用户添加照片,以供人脸识别
             * 
             */
            if (obj.roleList == null || obj.roleList != null && obj.roleList.length == 1) {
              setTimeout(function () {
                if (obj.roleList == null) {
                  _this.switchRoleRequest(obj.tokenByLoginAndSwitch, obj.username);
				  console.log('1')
                } else if (obj.roleList[0] != app.globalData.Constant.roleTypeConstant.DORMADMIN && obj.roleList[0] != app.globalData.Constant.roleTypeConstant.COUNSELOR && obj.roleList[0] != app.globalData.Constant.roleTypeConstant.MAINTAIN_MAN) {
                  _this.switchRoleRequest(obj.tokenByLoginAndSwitch, obj.username);
				  console.log('2')
                } else {
                  _this.switchRoleRequest(obj.tokenByLoginAndSwitch, obj.username, obj.roleList[0]);
				  console.log('3');
                }
              }, 2000);
			  console.log('1425');
            } else { 
              // 跳转到切换角色页面
			  console.log('1426');
              app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.authPageUrl.switchRoleUrl);
            } // 设置login缓存。含角色数组、username


            app.globalData.StorageUtil.set('loginObjCach', res.data.rows);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('绑定失败', res.data.msg);
          }
        },
        fail: function (res) {
          console.log("res - ", res);
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    /**
     * 输入 - 获取输入值
     */
    useridInput: function (e) {
      this.setData({
        userid: e.detail.value.replace(/\s+/g, '')
      });

      if (e.detail.value.length >= 20) {
        wx.hideKeyboard();
      }
    },
    passwdInput: function (e) {
      this.setData({
        passwd: e.detail.value
      });
    },

    /**
     * 输入 - 动态效果
     */
    inputFocus: function (e) {
      app.globalData.PublicUtil.inputFocus(e, this);
    },
    inputBlur: function (e) {
      app.globalData.PublicUtil.inputBlur(e, this);
    },

    /**
     * 帮助 - 显示与隐藏
     */
    tapHelp: function (e) {
      if (e.target.id == 'help') {
        this.hideHelp();
      }
    },
    showHelp: function (e) {
      this.setData({
        'help_status': true
      });
    },
    hideHelp: function (e) {
      this.setData({
        'help_status': false
      });
    },

    /**
      * 忘记密码 - 点击跳转
      */
    forgetPassword: function () {
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.authPageUrl.forgetPasswordUrl, 500);
    },

    /**
     * 账号注册 - 点击跳转
     */
    regist: function () {
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.authPageUrl.registUrl, 500);
    },

    /**
     * 判断
     * 
     * 查询个人信息。
     */
    switchRoleRequest: function (token, username, role) {
      // console.log("app.RequestUrl.baseRequestUrl.switchRole"+role);
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.switchRole,
        data: {
          username: username,
          role: role
        },
        header: {
          'token': token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          if (res.data && res.data.code == 200) {
						console.log('页面跳转')
            let userInfo = res.data.rows; // 1.设置userInfo缓存。

            app.globalData.StorageUtil.set('userInfoCach', userInfo); // 2.判断手机号是否绑定

            if (app.globalData.CheckUtil.isNotBlank(userInfo.mobile)) {
              // 若为维修端首页，则跳转到维修端首页
              if (role == app.globalData.Constant.roleTypeConstant.MAINTAIN_MAN) {
                app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.repairPageUrl.index, 1000);
              } else {
                // 跳转到首页页面
								if(app.globalData.showOnlyABC){
									app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl+'?noRefresh=1', 1000);
								}else{
									// app.globalData.PublicUtil.switchTabByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl, 1000);
									app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl+'?noRefresh=1', 1000);
								}
              }
            }
			 else {
              // 跳转到绑定手机号页面
              // app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.authPageUrl.bindPhoneUrl, 1000);
			  app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl+'?noRefresh=1', 1000);
            }
          } 
		  else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },

        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
    // 用于切换密码是否可见
    bindSee: function () {
      let is = !this.isShow;
      this.setData({
        isShow: is
      });
    },

    /**
     * 获取小程序配置
     * 
     * 判断是否需要注册
     */
    // isRegistrationUser: function () {
    //   var _this = this;

    //   wx.request({
    //     url: app.globalData.RequestUrl.baseRequestUrl.getVersionRequest,
    //     method: 'GET',
    //     success: function (res) {
    //       if (res.data && res.data.code == 200) {
    //         app.globalData.StorageUtil.set("xcxSet", res.data.rows);

    //         if (res.data.rows.registration == 1) {
    //           _this.setData({
    //             isNeedRegistration: true
    //           });
    //         } else {
    //           _this.setData({
    //             isNeedRegistration: false
    //           });
    //         }

    //         if (res.data.rows.forgetPassword == 1) {
    //           _this.setData({
    //             isForgetPassword: true
    //           });
    //         } else {
    //           _this.setData({
    //             isForgetPassword: false
    //           });
    //         }
    //       }
    //     },
    //     fail: function () {}
    //   });
    // }
  }
};
</script>
<style>
@import "./login.css";
</style>