<template>
<view class="page" xmlns:wx="http://www.w3.org/1999/xhtml">

    <view class="page__bd">

        <view class="weui-cells weui-cells_after-title top">
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__hd">
                    <view class="weui-label">账号：</view>
                </view>
                <view class="weui-cell__bd weui-input">
                  {{userInfoCach.username}}
                </view>
            </view>
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__hd">
                    <view class="weui-label">旧密码：</view>
                </view>
                <view class="weui-cell__bd">
                    <input class="weui-input" placeholder="请填写旧密码" @blur="inputOldPswFun" password="true" type="text"></input>
                </view>
            </view>
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__hd">
                    <view class="weui-label">新密码：</view>
                </view>
                <view class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入新密码" @blur="inputNewPswFun" password="true" type="text"></input>
                </view>
            </view>
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__hd">
                    <view class="weui-label">确认密码：</view>
                </view>
                <view class="weui-cell__bd">
                    <input class="weui-input" placeholder="请再次输入密码" @blur="inputAgainPswFun" password="true" type="text"></input>
                </view>
            </view>
            
        </view>
        <view class="weui-cells__tips">密码至少6个字符</view>

        <view class="weui-btn-area bottom-box">
            <button class="weui-btn" :disabled="disabled" type="primary" @tap="confirmChange">确定</button>
        </view>
    </view>
</view>
</template>

<script>
var app = getApp(); // var CryptoJS = require('../../../utils/AES_Tool.js')

export default {
  data() {
    return {
      userInfoCach: {},
      inputIdentifier: '',
      inputOldPsw: '',
      inputNewPsw: '',
      inputAgainPsw: '',
      disabled: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('------------------------修改密码------------------------');
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    this.setData({
      userInfoCach: userInfoCach
    });
  },
  methods: {
    inputIdentifierFun: function (e) {},
    inputOldPswFun: function (e) {
      this.setData({
        inputOldPsw: e.detail.value
      });
    },
    inputNewPswFun: function (e) {
      this.setData({
        inputNewPsw: e.detail.value
      });
    },
    inputAgainPswFun: function (e) {
      this.setData({
        inputAgainPsw: e.detail.value
      });
    },

    /**
     * 确定修改密码
     */
    confirmChange: function () {
      var inputOldPsw = this.inputOldPsw;
      var inputNewPsw = this.inputNewPsw;
      var inputAgainPsw = this.inputAgainPsw;
      var id = '';

      if (!inputOldPsw || !inputNewPsw || !inputAgainPsw) {
        app.globalData.ShowMsgUtil.showErrorModal('请填写完整', '所有输入都为必填');
        return;
      }

      if (inputNewPsw != inputAgainPsw) {
        app.globalData.ShowMsgUtil.showErrorModal('请填写完整', '两次输入的密码不一致');
        return;
      }

      if (inputNewPsw.length < 6 || inputNewPsw.length < 6) {
        app.globalData.ShowMsgUtil.showErrorModal('请填写完整', '密码至少为6个字符');
        return;
      }

      var inputOldPsw = app.globalData.CryptoJS.EncryptBASE64(inputOldPsw);
      var inputNewPsw = app.globalData.CryptoJS.EncryptBASE64(inputNewPsw);
      this.request(inputOldPsw, inputNewPsw);
    },
    // 发起修改密码请求
    request: function (oldPsw, newPsw) {
			app.globalData.ShowMsgUtil.netErrNotice();
      this.setData({
        disabled: true
      });

      var _this = this;

      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.passwordAlter,
        data: {
          "oldPsw": oldPsw,
          "newPsw": newPsw
        },
        header: {
          'token': _this.userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'PUT',

        success(res) {
          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessAndReturn('密码修改成功！', 2000);
          } else {
            this.setData({
              disabled: false
            });
            app.globalData.ShowMsgUtil.showErrorModal('请求失败！', res.data.msg, res.data.code);
          }
        },

        fail: function () {
          this.setData({
            disabled: false
          });
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    }
  }
};
</script>
<style>
@import "./passwordAlter.css";
</style>