<template>
<view class="pages">

 <view class="title">
  <text class="title-1 pub">手机号绑定</text>
  <text id="title-2">应国家网信办实名制要求，需求绑定手机号</text>
 </view> 

 <view class="content">
  <form @submit="confirmSubmit">
    <view class="input-group">
      <text class="input-label">手机号：</text>
      <input  type="number" name="phone" placeholder="请输入手机号" maxlength="20" cursor-spacing="20" @input="phoneInput"></input>
    </view>
    
    <view class="input-group">
      <text class="input-label">验证码：</text>
      <input  type="text" name="authCord" placeholder="请输入验证码" maxlength="6" cursor-spacing="20" @input="authCodeInput"></input>

      <text v-if="!alreadySend" class="input-label-send" @tap="send">发送验证码</text>
      <text v-if="alreadySend" class="input-label-send" @tap="send">{{time+"S 后重新发送"}}</text>
    </view>

    <view class="confirm-btn top">
      <button :disabled="disabled" form-type="submit" type="primary">绑定</button>
   </view>
  </form>

 </view>

</view>
</template>

<script>
//获取实例
var app = getApp();

export default {
  data() {
    return {
      disabled: true,
      //是否禁止确认修改密码按钮
      canSend: false,
      //判断是否允许发送验证码
      alreadySend: false,
      //是否已经发送成功过验证码    
      time: 60,
      //倒计时60秒
      phoneNum: '',
      authCode: '' //验证码

    };
  },

  components: {},
  props: {},
  onShow: function () {
    var _this = this;
  },
	mounted(){
		//#ifdef H5  
		document.querySelector('.uni-page-head-hd').style.display = 'block'  
		document.querySelector('.uni-page-head-btn').style.display = 'block'  
		//#endif  
	},
  methods: {
    /**
     * -在每个输入事件时，获取输入的值，并赋值到data数据
     * -检测手机号是否格式正确
     * -检测是否可以提交按钮
     */

    /**
     * 1. 获取手机号码
     * -判断输入是否是格式正确的手机号码
     * -判断是否符合提交修改密码的条件
     */
    phoneInput: function (e) {
      var _this = this;

      let phoneNum = e.detail.value;
      let checkPhoneNum = this.checkPhone(phoneNum);

      _this.setData({
        phoneNum: phoneNum
      });

      if (checkPhoneNum) {
        _this.setData({
          phoneNum: phoneNum
        });

        _this.showSend();
      } else {
        _this.setData({
          phoneNum: ''
        });

        _this.hidenSend();
      }

      _this.checkSubmit();
    },
    //可以发送验证码
    showSend: function () {
      this.setData({
        canSend: true
      });
    },
    //禁止发送验证码
    hidenSend: function () {
      this.setData({
        canSend: false
      });
    },
    //校验手机号码的格式
    checkPhone: function (phoneNum) {
      let str = /^1\d{10}$/;

      if (str.test(phoneNum)) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * 2. 获取验证码
     * -判断是否符合提交修改密码的条件
     */
    authCodeInput: function (e) {
      var _this = this;

      let authCode = e.detail.value;

      _this.setData({
        authCode: authCode
      });

      _this.checkSubmit();
    },

    /**
     * 按钮禁用功能的实现 
     * -在每个输入事件中，
     * -不断判断是否满足可以提交数据导后台的条件
     * -条件： 1.四个输入都有值  2.接收验证码成功（alreadySend）  3.两次密码输入都相同
     */
    checkSubmit: function (e) {
      var _this = this;

      var phone = _this.phoneNum;
      var authcode = _this.authCode;

      if (_this.checkEmpty(phone) && _this.checkEmpty(authcode)) {
        _this.setData({
          disabled: false
        });
      } else {
        _this.setData({
          disabled: true
        });
      }
    },
    checkEmpty: function (e) {
      if (e != '' && e != null) {
        return true;
      }

      return false;
    },

    /**
     * 发送验证码的实现
     * -判断是否可以向后台发送请求。是则发送请求，否则提示手机号错误
     * -判断是否接收到验证码。是则已接收及倒计时开启，否则提示错误
     */

    /**
     * 1. send点击事件
     */
    send: function (e) {
      var _this = this;

      let phone = _this.phoneNum;

      if (_this.alreadySend) {
        console.log('在倒计时中，重复点击');
        return;
      }

      if (!_this.checkPhone(phone)) {
        app.globalData.ShowMsgUtil.showErrorModal('手机号格式不正确', '请输入正确的手机号！');
        return;
      }

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

      if (_this.canSend) {
				app.globalData.ShowMsgUtil.netErrNotice();
        wx.request({
          url: app.globalData.RequestUrl.baseRequestUrl.bindPhoneOfCode,
          data: {
            phoneNum: phone
          },
          header: {
            'token': userInfoCach.token,
            'content-type': 'application/json' //默认值

          },
          method: 'POST',
          success: function (res) {
            console.log('绑定手机号获取验证码返回', res.data);

            if (res.data && res.data.code == 200) {
              userInfoCach.mobile = phone;
              app.globalData.StorageUtil.set('userInfoCach', userInfoCach);

              _this.showAcceptCord();

              _this.timer();
            } else {
              app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);

              _this.hideAcceptCordError();

              return;
            }
          },
          fail: function () {
            app.globalData.ShowMsgUtil.showNoneToastByFail();

            _this.hideAcceptCordError();
          }
        });
      } else {// app.showErrorModal('格式不正确', '请输入正确的手机号码');
        // _this.hidenSend();
        // _this.hideAcceptCordError();
      }
    },
    // 接收验证码失败
    hideAcceptCordError: function (e) {
      this.setData({
        alreadySend: false
      });
    },
    // 接收验证码成功
    showAcceptCord: function (e) {
      wx.showToast({
        title: '发送成功',
        icon: 'success',
        duration: 2000
      });
      this.setData({
        alreadySend: true
      });
    },

    /**
     * 2. 60秒倒计时
     */
    timer: function (e) {
      var _this = this;

      let promise = new Promise((resolve, reject) => {
        let setTimer = setInterval(() => {
          _this.setData({
            time: _this.time - 1
          });

          if (_this.time <= 0) {
            _this.setData({
              time: 60
            });

            _this.hideAcceptCordError();

            resolve(setTimer);
          }
        }, 1000);
      });
      promise.then(setTimer => {
        clearInterval(setTimer);
      });
    },

    /**
     * 绑定手机号码
     */
    confirmSubmit: function (e) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      var phone = _this.phoneNum;
      var authCord = _this.authCode;

      if (!_this.checkPhone(phone)) {
        app.globalData.ShowMsgUtil.showErrorModal('格式不正确', '请输入正确的手机号！');
        return;
      }

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.bindPhone,
        data: {
          'phoneNum': phone,
          'code': authCord
        },
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',
        success: function (res) {
          console.log('绑定手机号码返回', res.data);

          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessToast("修改成功", 2000); // 若为维修端首页，则跳转到维修端首页

            if (userInfoCach.role == app.globalData.Constant.roleTypeConstant.MAINTAIN_MAN) {
              app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.repairPageUrl.index, 2000);
            } else {
              // 跳转到首页页面
              app.globalData.PublicUtil.switchTabByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl, 2000);
            }
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
    clearForgetPage: function (e) {
      this.setData({
        disabled: true,
        //是否禁止确认修改密码按钮
        canSend: false,
        //判断是否允许发送验证码
        alreadySend: false,
        //是否已经发送成功过验证码    
        time: 60,
        //倒计时60秒
        phoneNum: '',
        authCode: '' //验证码

      });
      this.onShow();
    }
  }
};
</script>
<style>
@import "./bindPhone.css";
</style>