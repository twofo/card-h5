<template>
<view class="page box">

  <view class="content">

  
    <view class="info-hd">

      <!-- 图像 -->
      <view v-if="pic">
        <image class="user-avatar" :src="pic"></image>
      </view>
      <view v-else>
        <image class="user-avatar" src="/static/images/mine/admin-1.png"></image>
      </view>

      <!-- 显示展示 -->
      <view class="info-right">
        <view class="user-right-top">
          <text class="user-text username">{{userInfoCach.name}}</text>
        </view>
        <text class="user-text ">{{userInfoCach.username}}</text>
      </view>

    </view>

    <!-- 二维码显示 -->
    <view class="box-QRCode">
       <view class="QRCode-pic">
        <canvas canvas-id="qrcode" class="QRCode-pic"></canvas>
      </view>
    </view>

    <view class="bottom">
      <view class="bottom-left"></view>
      <view class="bottom-right"></view>
      <view class="bottom-content">扫一扫上面的二维码图案
      </view>
    </view>
  </view>

</view>
</template>

<script>
var app = getApp();
const {
  barcode,
  qrcode
} = require("../../resources/utils/QRCode/index.js");

export default {
  data() {
    return {
      userInfoCach: {},
      timer: '',
			pic:''
    };
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;

    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    const loginObjCach = app.globalData.StorageUtil.get('loginObjCach');
		let img = loginObjCach.image == null ? "" : loginObjCach.image
    _this.setData({
      userInfoCach: userInfoCach,
			pic: img
    }); // 关闭定时器
    // clearInterval(this.myTime);


    this.getString(userInfoCach);
    let timer = setInterval(function (userInfoCach) {
      _this.getString();
    }, 60000);
    this.setData({
      timer
    });
  },
  onUnload: function () {
    clearInterval(this.timer);
  },
  methods: {
    /**
     * 获取生成二维码的字符串
     */
    getString: function () {
			app.globalData.ShowMsgUtil.netErrNotice();
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;

      let userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.payRequestUrl.getCode,
        data: {
          type: 3 //0 app支付  3 自助机办卡

        },
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          wx.hideToast();
          console.log('获取用户码返回', res.data);

          if (res.data && res.data.code == 200) {
            qrcode('qrcode', res.data.rows, 430, 430);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },

        fail: function () {
          wx.hideToast();
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    }
  }
};
</script>
<style>
@import "./QRCodeDetail.css";
</style>