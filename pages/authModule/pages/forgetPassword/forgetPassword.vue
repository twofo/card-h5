<template>
<view class="page">

 <view class="title">
  <text id="title-1">请输入您绑定的手机号码</text>
  <text id="title-2">按下列步骤即可找回密码</text>
 </view> 

 <view class="content">
  <form @submit="confirmSubmit">
    <view :class="'input-group ' + (phone_focus ? 'active' : '')">
      <text class="input-label">手机号：</text>
      <input value type="number" id="phone" placeholder="请输入手机号" maxlength="20" cursor-spacing="20" @input="phoneInput" @focus="inputFocus" @blur="inputBlur"></input>
    </view>
    
    <view :class="'input-group ' + (authCord_focus ? 'active' : '')">
      <text class="input-label">验证码：</text>
      <input value type="text" id="authCord" placeholder="请输入验证码" maxlength="6" cursor-spacing="20" @input="authCodeInput" @focus="inputFocus" @blur="inputBlur"></input>

      <text v-if="!alreadySend" class="input-label-send" @tap="send">发送验证码</text>
      <text v-if="alreadySend" class="input-label-send" @tap="send">{{time+"S 后重新发送"}}</text>
    </view>

    <view :class="'input-group ' + (password_focus ? 'active' : '')">
      <text class="input-label">密码：</text>
      <input password="true" id="password" placeholder="请输入新密码" maxlength="20" cursor-spacing="20" @input="passwordInput" :value="psw" @focus="inputFocus" @blur="inputBlur"></input>
    </view>

    <view :class="'input-group ' + (confirmPassword_focus ? 'active' : '')">
      <text class="input-label">确认密码：</text>
      <input password="true" id="confirmPassword" placeholder="请再次输入新密码" maxlength="20" cursor-spacing="20" @input="confirmInput" :value="confirmPassword" @focus="inputFocus" @blur="inputBlur"></input>
    </view>

    <view class="page__bd page__bd_spacing button_top">
      <button class="weui-btn" type="primary" :disabled="disabled" form-type="submit">确认修改</button>
    </view>
    
  </form>

 </view>

</view>
</template>

<script>
//获取实例
var app = getApp(); //引用封装好的加密解密js
// var aesTool = require('../../utils/AES_Tool.js')
// var CryptoJS = require('../../utils/AES_Tool.js')

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
      authCode: '',
      //验证码
      psw: '',
      confirmPassword: '',
      phone_focus: false,
      authCord_focus: false,
      password_focus: false,
      confirmPassword_focus: false
    };
  },

  components: {},
  props: {},
  onShow: function () {},
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
      let checkPhoneNum = app.globalData.CheckUtil.checkPhone(phoneNum);

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
    passwordInput: function (e) {
      var _this = this;

      let psw = e.detail.value;

      _this.setData({
        psw: psw
      });

      _this.checkSubmit();
    },
    confirmInput: function (e) {
      var _this = this;

      let confirmPassword = e.detail.value;

      _this.setData({
        confirmPassword: confirmPassword
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
      var password = _this.psw;
      var confirmPassword = _this.confirmPassword;

      _this.setData({
        confirmPassword: confirmPassword
      }); //TOMD
      // if (_this.checkEmpty(phone) && _this.checkEmpty(authcode) && _this.checkEmpty(password) && _this.checkEmpty(confirmPassword) && password == confirmPassword && alreadySend) {
      // if (_this.checkEmpty(phone) && _this.checkEmpty(authcode) && _this.checkEmpty(password) && _this.checkEmpty(confirmPassword) && password == confirmPassword) {


      if (app.globalData.CheckUtil.isNotBlank(phone) && app.globalData.CheckUtil.isNotBlank(authcode) && app.globalData.CheckUtil.isNotBlank(password) && app.globalData.CheckUtil.isNotBlank(confirmPassword)) {
        _this.setData({
          disabled: false
        });
      } else {
        _this.setData({
          disabled: true
        });
      }
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

      if (_this.canSend) {
        wx.request({
          url: app.globalData.RequestUrl.baseRequestUrl.forgetPasswordOfCode,
          data: {
            phoneNum: phone
          },
          header: {
            'content-type': 'application/json' //默认值

          },
          method: 'POST',
          success: function (res) {
            if (res.data && res.data.code == "200") {
              _this.showAcceptCord();

              _this.timer();
            } else if (res.data.msg == '该手机号尚未绑定账号!') {
              app.globalData.ShowMsgUtil.showErrorModal(res.data.msg, '尚未注册');

              _this.hidenSend();

              _this.hideAcceptCordError();
            }
          },
          fail: function (res) {
            app.globalData.ShowMsgUtil.showNoneToastByFail();

            _this.hideAcceptCordError();
          }
        });
      } else {
        app.globalData.ShowMsgUtil.showErrorModal('格式不正确', '请输入正确的手机号码');

        _this.hidenSend();

        _this.hideAcceptCordError();
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
      app.globalData.ShowMsgUtil.showSuccessToast('发送成功', 2000);
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
     * 确认修改密码的实现
     * 
     * 
     */
    confirmSubmit: function (e) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      var phone = _this.phoneNum;
      var authCord = _this.authCode;
      var password = _this.psw;
      var confirmPassword = _this.confirmPassword;

      if (password != confirmPassword) {
        app.globalData.ShowMsgUtil.showErrorModal('两次密码不一致', '请重新输入！');

        _this.clearForgetPage();

        return;
      }

      if (!app.globalData.CheckUtil.checkPhone(phone)) {
        app.globalData.ShowMsgUtil.showErrorModal('请输入正确的手机号！', '手机号格式不正确');
        return;
      } //TOMD
      // else if( !alreadySend ){
      //   app.showErrorModal('验证按接收失败', '请重新输入！');
      // } 
      // if (_this.checkSubmit()){
      // 对密码进行aes+base64加密


      var result = app.globalData.CryptoJS.EncryptBASE64(password);
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.forgetPassword,
        data: {
          phoneNum: phone,
          psw: result,
          code: authCord
        },
        header: {
          'content-type': 'application/json' //默认值

        },
        method: 'PUT',

        success(res) {
          if (res.data && res.data.code == "200") {
            app.globalData.ShowMsgUtil.showSuccessAndReturn('修改成功', 2000);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal(res.data.msg, '请重新输入！');
          }
        },

        fail: function (res) {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
    clearForgetPage: function (e) {
      this.setData({
        psw: '',
        confirmPassword: ''
      });
    },

    /**
     * 输入框动态效果实现
     * 
     */
    inputFocus: function (e) {
      app.globalData.PublicUtil.inputFocus(e, this);
    },
    inputBlur: function (e) {
      app.globalData.PublicUtil.inputBlur(e, this);
    }
  }
};
</script>
<style>
@import "./forgetPassword.css";
</style>