<template>
<view class="page">
 <view class="title">
  <text id="title-1">账号注册</text>
 </view>
 <view class="content">
  <form @submit="confirmSubmit">
    <view :class="'input-group ' + (number_focus ? 'active' : '')">
      <text class="input-label">账号</text>
      <input type="number" id="number" placeholder="请输入账号" maxlength="12" cursor-spacing="20" @input="numberInput" @focus="inputFocus" @blur="inputBlur"></input>
    </view>

    <view :class="'input-group ' + (username_focus ? 'active' : '')">
      <text class="input-label">姓名</text>
      <input type="text" id="username" placeholder="请输入姓名" maxlength="20" cursor-spacing="20" @input="userNameInput" @focus="inputFocus" @blur="inputBlur"></input>
    </view>

    <view :class="'input-group ' + (password_focus ? 'active' : '')">
      <text class="input-label">密码</text>
      <input :password="!isShow" id="password" placeholder="请输入密码" maxlength="12" cursor-spacing="20" @input="psdInput" @focus="inputFocus" @blur="inputBlur"></input>
      <image :src="isShow ?  authImageUrl.passwordEyeOpen : authImageUrl.passwordEyeClose" style="width:50rpx;height:25rpx;" @tap="bindSee"></image>
    </view>

    <view :class="'input-group ' + (confirmPassword_focus ? 'active' : '')">
      <text class="input-label">确认密码</text>
      <input :password="!isShow1" id="confirmPassword" placeholder="请再次输入新密码" maxlength="12" cursor-spacing="20" @input="comPsdInput" :value="confirmPassword" @focus="inputFocus" @blur="inputBlur"></input>
      <image :src="isShow1 ?  authImageUrl.passwordEyeOpen : authImageUrl.passwordEyeClose" style="width:50rpx;height:25rpx;" @tap="bindSee1"></image>
    </view>

    <view :class="'input-group ' + (phone_focus ? 'active' : '')">
      <text class="input-label">手机号</text>
      <input value type="number" id="phone" placeholder="请输入手机号" maxlength="11" cursor-spacing="20" @input="phoneInp" @focus="inputFocus" @blur="inputBlur"></input>
    </view>

    <view :class="'input-group ' + (gender_focus ? 'active' : '')">
      <text class="input-label">性别</text>
      <radio-group class="group" @change="radioChange">
        <view v-for="(item, index) in radioItems" :key="index" class="label-2">
          <radio :id="item.name" :value="item.value" :checked="item.checked" color="#F39827"></radio>
          <label class="label-2-text" :for="item.name"><text>{{item.name}}</text></label>
        </view>
      </radio-group>
    </view>

    <view :class="'input-group ' + (birth_focus ? 'active' : '')">
      <text class="input-label">出生年月</text>
      <picker mode="date" :value="date" start="1000-12-01" :end="nowTime" @change="bindDateChange">
        <view class="picker">
          {{date}}
        </view>
      </picker>
    </view>

    <view :class="'input-group ' + (idcard_focus ? 'active' : '')">
      <text class="input-label">身份证</text>
      <input value type="idcard" id="idCard" placeholder="请输入身份证号码" maxlength="20" cursor-spacing="20" @input="idCardInput" @focus="inputFocus" @blur="inputBlur"></input>
    </view>




    <view class="page__bd page__bd_spacing button_top">
      <button class="weui-btn" type="primary" :disabled="disabled" form-type="submit" style="border:1rpx solid #fff">确认</button>
    </view>
    
  </form>

 </view>

</view>
</template>

<script>
//获取实例
var app = getApp();
var authImageUrl = require("../../resources/utils/imageUrl.js");

export default {
  data() {
    return {
      authImageUrl: authImageUrl,
      disabled: false,
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
      phone_focus: false,
      authCord_focus: false,
      password_focus: false,
      confirmPassword_focus: false,
      radioItems: [{
        name: '男',
        value: 1,
        checked: 'true'
      }, {
        name: '女',
        value: 2
      }],
      date: '1990-09-01',
      nowTime: "2020-7-31",
      isShow: false,
      isShow1: false,
      userInfo: {},
      psw: "",
      confirmPassword: ""
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    let t = new Date();
    let nowTime = app.globalData.PublicUtil.formatTimeTwo(t.getTime(), "Y-M-D");
    this.setData(nowTime);
  },
  methods: {
    radioChange(e) {
      console.log(e);
      const checked = e.detail.value;
      const gender = {};

      for (let i = 0; i < this.radioItems.length; i++) {
        if (checked.indexOf(this.radioItems[i].name) !== -1) {
          gender['radioItems[' + i + '].checked'] = true;
        } else {
          gender['radioItems[' + i + '].checked'] = false;
        }
      }

      this.userInfo.gender = checked;
    },

    bindDateChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value);
      let val = e.detail.value;
      this.userInfo.birth = val;
      this.setData({
        date: val
      });
    },

    numberInput(e) {
      console.log(e);
      let val = e.detail.value;

      if (app.globalData.CheckUtil.isNotBlank(val)) {
        let valLen = val.length;
        this.userInfo.number = val;
      }
    },

    userNameInput(e) {
      console.log(e);
      let val = e.detail.value;

      if (app.globalData.CheckUtil.isNotBlank(val)) {
        if (/^[\u4e00-\u9fa5]+$/i.test(val)) {
          this.userInfo.username = val;
        } else {
          app.globalData.ShowMsgUtil.showNoneToast("请输入姓名", 2000);
        }
      } else {}

      console.log(this.userInfo);
    },

    psdInput(e) {
      console.log(e);
      let val = e.detail.value;

      if (app.globalData.CheckUtil.isNotBlank(val)) {
        this.userInfo.password = val;
      } else {}
    },

    comPsdInput(e) {
      console.log(e);
      let val = e.detail.value;
      this.userInfo.formPsd = val;
    },

    phoneInp(e) {
      console.log(e);
      let val = e.detail.value;

      if (app.globalData.CheckUtil.isNotBlank(val)) {
        if (!app.globalData.CheckUtil.checkPhone(val)) {
          app.globalData.ShowMsgUtil.showNoneToast("请输入正确的手机号码", 2000);
        } else {
          this.userInfo.phoneNumber = val;
          wx.hideToast();
        }
      } else {}
    },

    idCardInput(e) {
      console.log(e);
      let val = e.detail.value;
      this.userInfo.idCard = val;
    },

    // 用于切换密码是否可见
    bindSee: function () {
      let is = !this.isShow;
      this.setData({
        isShow: is
      });
    },
    bindSee1: function () {
      let is = !this.isShow1;
      this.setData({
        isShow1: is
      });
    },

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
						app.globalData.ShowMsgUtil.netErrNotice();
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
    confirmPsd: function (old, news) {
      if (old != news) {
        app.globalData.ShowMsgUtil.showNoneToast("两次密码不一致", 2000);
        this.setData({
          'password_focus': true,
          'confirmPassword_focus': true
        });
        return false;
      } else {
        this.setData({
          'password_focus': false,
          'confirmPassword_focus': false
        });
        return true;
      }
    },

    checkUserInfo(data, msg1, msg2) {
      let userData = data;

      if (!app.globalData.CheckUtil.isNotBlank(userData)) {
        app.globalData.ShowMsgUtil.showNoneToast(msg1, 2000);
        return false;
      } else {
        if (msg2) {
          if (userData.length <= 5) {
            app.globalData.ShowMsgUtil.showNoneToast(msg2, 2000);
            return false;
          }
        }
      }

      return true;
    },

    confirmSubmit: function (e) {
      var _this = this;

      console.log(this.userInfo);
      let userData = this.userInfo;

      if (Object.keys(userData).length === 0) {
        app.globalData.ShowMsgUtil.showNoneToast("请填写注册内容", 2000);
        return;
      }

      let num = this.checkUserInfo(userData.number, "请填写账号", "账号长度在6~12之间");

      if (!num) {
        return;
      }

      let name = this.checkUserInfo(userData.username, "请填写姓名");

      if (!name) {
        return;
      }

      let psd = this.checkUserInfo(userData.password, "请填写密码", "密码长度在6~12之间");

      if (!psd) {
        return;
      }

      let comfirmPsd = this.confirmPsd(userData.password, userData.formPsd);

      if (!comfirmPsd) {
        return;
      }

      let phone = this.checkUserInfo(userData.phoneNumber, "请填写手机号码");

      if (!phone) {
        return;
      }

      if (!userData.gender) {
        userData.gender = 1;
      }

      if (!userData.birth) {
        userData.birth = this.date;
      }

      let indentify = this.checkUserInfo(userData.idCard, "请填写身份证号码");

      if (!indentify) {
        return;
      }

      if (!app.globalData.CheckUtil.idCardCheck(userData.idCard)) {
        app.globalData.ShowMsgUtil.showNoneToast("请输入正确的身份证号码", 2000);
        return;
      }

      this.setData({
        disabled: true
      });
      let data = {
        studentCode: userData.number,
        name: userData.username,
        password: app.globalData.CryptoJS.EncryptBASE64(userData.password),
        mobile: userData.phoneNumber,
        gender: userData.gender,
        dateBirth: userData.birth,
        identificationNumber: userData.idCard
      };
      this.postMethods(data); // 对密码进行aes+base64加密
      // var result = app.CryptoJS.EncryptBASE64(password);
    },

    postMethods(data) {
      let _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      app.globalData.ShowMsgUtil.showLoadAndMsgToast('注册中');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.regist,
        data: data,
        header: {
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          _this.setData({
            disabled: false
          });

          console.log(res);

          if (res.data && res.data.code == "200") {
            app.globalData.ShowMsgUtil.showSuccessToast("注册成功", 2000);
            setTimeout(function () {
              app.globalData.ShowMsgUtil.showSuccessToast("前往登陆", 2000);
            }, 2000);
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/authModule/pages/login/login'
              });
            }, 4000);
            _this.userInfo = {};
          } else {
            app.globalData.ShowMsgUtil.showErrorModal("注册失败", res.data.msg);
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
@import "./regist.css";
</style>