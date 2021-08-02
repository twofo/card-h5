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
      timer: "",
			pic:""
    };
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function (options) {
		console.log(options)
		
		if(options.roomType){
			if(options.roomType == 2){
				uni.setNavigationBarTitle({
				  title: "公共资源_琴房预约记录_打卡"
				});
			}else{
				uni.setNavigationBarTitle({
				  title: "公共资源_练功房预约记录_打卡"
				});
			}
		}
		
		if(options.type){
			if(options.type == 'kqdk'){
				uni.setNavigationBarTitle({
				  title: "考勤_会议考勤_打卡"
				});
			}else{
				uni.setNavigationBarTitle({
				  title: "考勤_参会记录_打卡"
				});
			}
		}
    var _this = this;
    let userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    let loginObjCach = app.globalData.StorageUtil.get('loginObjCach');
    this.getString();
    let timer = setInterval(function () {
      _this.getString();
    }, 30000);
    this.setData({
      timer,
      userInfoCach,
			pic:loginObjCach.image
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
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();
      let userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
			app.globalData.ShowMsgUtil.netErrNotice();
      var _this = this;
      wx.request({
        url: app.globalData.RequestUrl.payRequestUrl.getCode,
        data: {
          type: 3 //0 app支付  3 自助机办卡  考勤打卡扫码   闸机扫码
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
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    }
  }
};
</script>
<style>
@import "./attendAttendaceSign.css";
</style>