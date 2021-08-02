<template>
<view class="page box">
<!-- <canvas canvas-id='share' style='width:375px;height:580px;'  hidden='{{canvasHidden}}'></canvas>  -->

  <view class="content" :style="'height: ' + (screenHeight-230) + 'px'">

    <view class="box-barCode" :style="'height: ' + ((screenHeight-230)/2.8) + 'px;margin: 0px auto;'">
      <canvas canvas-id="barcode" class="barCode-pic"></canvas>
    </view>

    <view class="box-QRCode">
      <view class="QRCode-pic">
        <canvas canvas-id="qrcode" class="QRCode-pic"></canvas>
      </view>
      <text class="title">{{expireAtTime}}</text>
    </view>

    <view class="bottom">
      <view class="bottom-left"></view>
      <view class="bottom-right"></view>
      <view class="bottom-content">可用余额 <text class="bottom-font"> {{inputMoney}} </text> 元
      </view>
    </view>
  </view>
 
  <view class="am-footer">
      <!-- <button open-type="share" data-tag="share1" id="btn_share1">转发</button> -->
      <button @tap="onShareTap">保存图片</button>
  </view>


<view class="show" @tap="hideview" :style="'display:' + display + ';position: absolute;top: 1%;height: ' + (screenHeight*0.75) + 'px'">
  <view class="containera">
    
    <view class="fourlayoutstylea">
      <button :size="primarySize" @tap="showLocal"> 保存分享图片 </button>
    </view>
    <view class="canvas-box">
    <canvas canvas-id="myCanvas" class="canvas-box-ba">
    </canvas>
      <!-- <canvas canvas-id="myCanvas" style="width:100%;height:{{windowHeight}}px;"></canvas> -->
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
} = require("../../resources/utils/wallet/QRCode/index.js");
/*
小程序利用canvas实现一键保存图片功能 */

export default {
  data() {
    return {
      'inputMoney': '',
      'expireAtTime': '',
      'authCode': '',
      'barcodeImgUrl': '',
      'qrcodeImgUrl': '',
      'display': "none",
      canvasHidden: true,
      //设置画板的显示与隐藏，画板不隐藏会影响页面正常显示
      screenWidth: '',
      //设备屏幕宽度
      screenHeight: 450,
      display: "",
      barcodeImgUrl: "",
      qrcodeImgUrl: "",
      shareImgSrc: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'inputMoney': options.inputMoney,
      'expireAtTime': options.expireAtTime,
      'authCode': options.authCode
    });
    this.getScrennInfo();
    console.log(this.screenHeight - 230);
    qrcode('qrcode', this.authCode, 350, 350);
    barcode('barcode', this.authCode, 740, 180);
  },

  /**
   * 生命周期函数--监听页面显示 
   */
  onShow: function () {},
  methods: {
    /**
     * 获取用户设备信息，屏幕宽度及高度
     */
    getScrennInfo: function () {
      var _this = this;

      wx.getSystemInfo({
        success: res => {
          _this.setData({
            screenWidth: res.screenWidth,
            screenHeight: res.screenHeight
          });
        }
      });
    },

    /**
     * 绘制多行文本，由于文字比较多，这里我们写了一个函数处理
     */
    drawText: function (ctx, str, leftWidth, initHeight, titleHeight, canvasWidth) {
      var lineWidth = 0;
      var lastSubStrIndex = 0; //每次开始截取的字符串的索引

      for (let i = 0; i < str.length; i++) {
        lineWidth += ctx.measureText(str[i]).width;

        if (lineWidth > canvasWidth) {
          ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight); //绘制截取部分

          initHeight += 16; //16为字体的高度

          lineWidth = 0;
          lastSubStrIndex = i;
          titleHeight += 30;
        }

        if (i == str.length - 1) {
          //绘制剩余部分
          ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight);
        }
      } // 标题border-bottom 线距顶部距离


      titleHeight = titleHeight + 10;
      return titleHeight;
    },
    onShareTap: function (event) {
      wx.showLoading({
        title: '生成中'
      });
      this.setData({
        display: "block"
      }); // 1. 将条形码canvas转化为图片临时路径

      this.barcodeToImgUrl();
    },

    /**
     * 将条形码canvas转化为图片临时路径
     */
    barcodeToImgUrl: function () {
      var that = this;
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 350,
        height: 100,
        destWidth: 740,
        destHeight: 140,
        canvasId: 'barcode',
        success: function (res) {
          that.setData({
            barcodeImgUrl: res.tempFilePath
          });

          if (!res.tempFilePath) {
            wx.showModal({
              title: '提示',
              content: '图片绘制中，请稍后重试',
              showCancel: false
            });
          } // 2. 将二维码canvas转化为临时图片路径


          that.qrcodeToImgUrl();
        },

        fail(res) {
          wx.showModal({
            title: '提示',
            content: '图片绘制出错, 请稍后再试！',
            showCancel: false
          });
        }

      });
    },

    /**
     * 将二维码canvas转化为临时图片路径
     */
    qrcodeToImgUrl: function () {
      var that = this;
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        destWidth: 350,
        destHeight: 350,
        canvasId: 'qrcode',
        success: function (res) {
          that.setData({
            qrcodeImgUrl: res.tempFilePath
          });

          if (!res.tempFilePath) {
            wx.showModal({
              title: '提示',
              content: '图片绘制中，请稍后重试',
              showCancel: false
            });
          } // 将二维码canvas转化为临时图片路径


          that.saveImageToPhotosAlbum();
        },

        fail(res) {
          wx.showModal({
            title: '提示',
            content: '图片绘制出错, 请稍后再试！',
            showCancel: false
          });
        }

      });
    },
    hideview: function () {
      this.setData({
        display: "none"
      });
    },

    /**
     * 开始画 - 将页面转化为图片
     */
    saveImageToPhotosAlbum: function () {
      var _this = this;

      var ctx = wx.createCanvasContext('myCanvas');
      var monryTest = "可用余额" + _this.inputMoney + "元";
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 800, 800);
      ctx.font = "16px Arial";
      ctx.fillStyle = '#bbb';
      ctx.fillText(_this.expireAtTime, 40, 390); //填充线

      ctx.fillStyle = '#000000';
      ctx.fillText(monryTest, 120, 430); //填充线

      ctx.drawImage(_this.barcodeImgUrl, 23, 48, 290, 100);
      ctx.drawImage(_this.qrcodeImgUrl, 80, 180, 180, 180);
      ctx.draw(false, function () {
        // 4. canvas画布转成图片
        _this.canvasToImage();
      });
    },

    /**
     * canvas画布转成图片
     */
    canvasToImage: function () {
      var _this = this;

      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 375,
        height: 580,
        destWidth: 375,
        destHeight: 580,
        canvasId: 'myCanvas',
        success: function (res) {
          _this.setData({
            shareImgSrc: res.tempFilePath
          });

          if (!res.tempFilePath) {
            wx.showModal({
              title: '提示',
              content: '图片绘制中，请稍后重试',
              showCancel: false
            });
          } // 5. 当用户点击分享到朋友圈时，将图片保存到相册


          _this.saveImageToPhotos(res.tempFilePath);
        },
        fail: function (res) {
          wx.showToast({
            title: '生成失败',
            icon: "none"
          });
        }
      });
    },

    /**
     * 当用户点击分享到朋友圈时，将图片保存到相册
     */
    saveImageToPhotos: function (shareImgSrc) {
      var _this = this;

      wx.saveImageToPhotosAlbum({
        filePath: shareImgSrc,

        success(res) {
          wx.showModal({
            title: '图片保存成功',
            content: '图片成功保存到相册了，可以去分享了！',
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#20a4f7',
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                });
              }

              _this.setData({
                canvasHidden: true
              });
            },
            fail: function () {
              wx.showToast({
                title: '保存失败',
                icon: "none"
              });
            }
          });
        }

      });
    }
  }
};
</script>
<style>
@import "./payRollCode.css";
</style>