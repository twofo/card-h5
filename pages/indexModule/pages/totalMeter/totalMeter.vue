<template>
<view class="page">   
  <view class="page__bd background-content">
    <!-- 上层 -->
    <view class="background-up" :style="'height:' + (windowHeight*0.57) + 'px;width: ' + (windowWidth*0.92) + 'px;'">
      <view :style="'height:' + (windowHeight*0.57*0.44) + 'px;'">
        <!-- 标题 -->
        <view class="weui-cells_after-title" style="margin: 0 15px;">
          <view class="myui-cell">
            <view class :style="'width: ' + (windowWidth*0.92*0.44) + 'px'">
              <text>设备状态：</text>
              <image :src="pageData.statusImage" :style="'width:' + (windowWidth*0.92*0.03) + 'px;height:' + (windowHeight*0.57*0.03) + 'px;'"></image>
              <!-- <view class="myui-cell-image" style="width:{{windowWidth*0.92*0.03}}px;height:{{windowHeight*0.67*0.03}}px; border-radius: {{windowWidth*0.92*0.03*0.5}}px"></view> -->
              <text style="margin-left: 20rpx;">{{pageData.status}}</text> 
            </view>
            <view class="weui-cell__ft wx-font">最近登录时间：{{pageData.lastLoginTime}}</view>
          </view>
        </view>
        <!-- 设备编号 -->
        <view class="wx-device">
          <text style="font-size:12px;color:rgb(60,58,80);">设备编号：</text>
          <text style="font-size: 18px;color:rgb(70,68,83)">{{pageData.deviceCode}}</text>
        </view>
        <!-- 用电量显示 -->
        <view class="wx-show" :style="'height:' + (windowHeight*0.57*0.13) + 'px;width: ' + (windowWidth*0.67) + 'px;'">
          <view class="show-items items-start" style>{{showEleData[0]}}</view>
          <view class="show-items items-black">{{showEleData[1]}}</view>
          <view class="show-items items-black">{{showEleData[2]}}</view>
          <view class="show-items items-black">{{showEleData[3]}}</view>
          <view class="show-items items-black">{{showEleData[4]}}</view>
          <view class="items-box-point"><view class="items-point"></view></view>
          <view class="show-items items-red">{{showEleData[5]}}</view>
          <view class="show-items items-end">{{showEleData[6]}}</view>
          <view class="show-items" style="color: black;">kW.h</view>
        </view>
      </view>
      <!-- 用红杠分隔 -->
      <view style="display: flex;flex-direction: row;justify-content: center;margin: 0px 0px 15px 0;">
        <image class :src="ImageUrl.redLine" :style="'width: ' + (windowWidth*0.66) + 'px;height:3px;'"></image>
      </view>
      <!-- 设备信息 -->
       <view class="weui-cells_after-title" :style="'margin: 0px 30px 15px;width: ' + (windowWidth*0.76) + 'px;font-size: 12px;color: rgb(124,122,145);'">
        <view class="myui-cell">
          <view class="weui-cell__bd">
            <text class>设备名称：{{pageData.deviceName}}</text>
          </view>
          <view class="weui-cell__ft ">设备版本：{{pageData.deviceVersion}}</view>
        </view>
      </view>
      <!-- 开关 -->
      <view class="wx-button" :style="'height:' + (windowHeight*0.57*0.42) + 'px;'" v-if="!pageData.isSummary">
      总闸开关
        <view class="button-box" @tap="bindTotalSwitch">
          <image :src="pageData.image" style="width:80px;height:80px;"></image>
          <text style="font-size:12px;color:rgb(182,181,193);margin-top:6px;">{{pageData.msg}}</text>
        </view>
      </view>
      <view v-else style="margin: 20px 15px 15px;"> 
        <view>
          <view class="weui-cell__bd">设备类型：总表</view>
          <view class="weui-cell__bd ">总表无法操作</view>
        </view>
      </view>
    </view>



    <!-- 下层 -->
    <view class="background-top" :style="'height: ' + (windowHeight*0.3) + 'px; width: 100%;background-color: rgb(32,164,247);'"></view>

    <view class="background-bottom" :style="'height: ' + (windowHeight*0.7-7) + 'px; width: 100%;background-color: #fff;'">
      <view class="emmter-box" :style="' padding-top: ' + (windowHeight*0.7*0.53-2) + 'px;'" v-if="pageData.isMuchWay && !pageData.isSummary">
        <text>电表分表</text>
        <view class="emmter-items">
          <view class="emmter-item" @tap="bindFirstSwitch">
            <image :src="pageData.firstIsOpenImage" style="width:50px;height:50px;"></image>
            <text>一路</text>
          </view>
          <view class="emmter-item" @tap="bindSecondSwitch">
            <image :src="pageData.secondIsOpenImage" style="width:50px;height:50px;"></image>
            <text>二路</text>
          </view>
        </view>
      </view>
    </view>
  </view>
  
</view>
</template>

<script>
var app = getApp();
var ImageUrl = require("../../resources/utils/imageUrl.js");

export default {
  data() {
    return {
      windowHeight: 0,
      //获取屏幕高度
      windowWidth: 0,
      ImageUrl: ImageUrl,
      pageData: {},
      //页面显示数据
      showEleData: [] //用电量显示数据

    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
    console.log('ImageUrl - ', ImageUrl); // 确保缓存里的设备数据存在

    const deviceDetailCach = app.globalData.StorageUtil.get('deviceAdminEleDetailCach');

    if (deviceDetailCach == null || deviceDetailCach == '') {
      app.globalData.ShowMsgUtil.showErrorModal('显示失败', '设备选择失败！');
      setTimeout(function () {
        wx.hideToast();
        wx.navigateBack({
          delta: 1
        });
      }, 2000);
    } // 处理页面显示数据


    var obj = this.dealPageData(deviceDetailCach);
    this.getElectricityInfo(deviceDetailCach);
    this.setData({
      pageData: obj,
      windowHeight: wx.getSystemInfoSync().windowHeight,
      windowWidth: wx.getSystemInfoSync().windowWidth
    });
  },
  methods: {
    getElectricityInfo: function (deviceDetailCach) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      var deviceCode = deviceDetailCach.deviceCacheToApp.deviceCode;
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getElectricityInfo,
        data: {
          deviceCode: deviceCode
        },
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取用电量信息返回', res.data);

          if (res.data && res.data.code === 200) {
            var data = res.data.rows;

            _this.dealEleData(data);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function (res) {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideNavigationBarLoading();
        }
      });
    },

    /**
     * 处理电量返回数据 - 用于页面显示
     */
    dealEleData: function (data) {
      var showEleData = [];
      var eleData = data.usage.toString();
      var arr = eleData.split(".");

      if (arr[0].length > 5) {
        arr[0] = arr[0].substring(0, 5);
      }

      let t = 0;

      for (let i = 0; i < 5; i++) {
        showEleData[i] = 0;

        if (5 - i <= arr[0].length) {
          showEleData[i] = arr[0].split('')[t];
          t++;
        }
      }

      t = 0;

      if (arr.length == 1) {
        showEleData[5] = 0;
        showEleData[6] = 0;
      } else {
        for (let i = 5; i < 7; i++) {
          showEleData[i] = 0;

          if (7 - i <= arr[1].length) {
            showEleData[i] = arr[1].split('')[t];
            t++;
          }
        }
      }

      this.setData({
        showEleData: showEleData
      }); // console.log('showEleData-', showEleData);
    },

    /**
     * 处理页面显示数据
     */
    dealPageData: function (deviceObj) {
      let obj = {};
      console.log('deviceObj - ', deviceObj);

      if (deviceObj.deviceCacheToApp.status.online) {
        obj.status = '在线';
        obj.statusImage = ImageUrl.deviceOnLine;
      } else {
        obj.status = '离线';
        obj.statusImage = ImageUrl.deviceOffLine;
      }

      obj.lastLoginTime = app.globalData.PublicUtil.formatTimeTwo(deviceObj.deviceCacheToApp.lastLoginTime, 'Y-M-D h:m:s');
      obj.deviceCode = deviceObj.deviceCacheToApp.deviceCode;
      obj.deviceName = deviceObj.deviceName;
      obj.deviceVersion = deviceObj.deviceVersion; // 判断是否为总表

      obj.isSummary = deviceObj.deviceCacheToApp.attributes.summary; // obj.isSummary = false;
      // 判断是否为单路还是多路。0为多路，1为单路
      // if (deviceObj.deviceCacheToApp.gateway != null && (deviceObj.deviceCacheToApp.gateway.gatewayType == 0 || deviceObj.deviceCacheToApp.gateway.gatewayType == 3)){

      obj.isMuchWay = true;

      if (deviceObj.deviceCacheToApp.status.firstIsOpen == 1) {
        obj.firstIsOpen = 1;
        obj.firstIsOpenImage = ImageUrl.emmterOneWayOn;
      } else {
        obj.firstIsOpen = 0;
        obj.firstIsOpenImage = ImageUrl.emmterOneWayOff;
      }

      if (deviceObj.deviceCacheToApp.status.secondIsOpen == 1) {
        obj.secondIsOpen = 1;
        obj.secondIsOpenImage = ImageUrl.emmterOneWayOn;
      } else {
        obj.secondIsOpen = 0;
        obj.secondIsOpenImage = ImageUrl.emmterOneWayOff;
      } // 判断总闸的状态


      obj.online = deviceObj.deviceCacheToApp.status.online;

      if (deviceObj.deviceCacheToApp.status.online) {
        obj.isOpen = deviceObj.deviceCacheToApp.status.isOpen;

        if (deviceObj.deviceCacheToApp.status.isOpen == 1) {
          obj.image = ImageUrl.switchClose;
          obj.msg = '点击此处，将"关闭"电表总闸';
        } else {
          obj.image = ImageUrl.switchOpen;
          obj.msg = '点击此处，将"开启"电表总闸';
        }
      } else {
        obj.firstIsOpen = 0;
        obj.firstIsOpenImage = ImageUrl.emmterOneWayOff;
        obj.secondIsOpen = 0;
        obj.secondIsOpenImage = ImageUrl.emmterOneWayOff;
        obj.image = ImageUrl.switchForbit;
        obj.msg = '无法连接，请确认检查设备是否通电';
      } // 获取单双路的状态
      // } else{
      //   obj.isMuchWay = false;
      // }
      // console.log('obj', obj);


      return obj;
    },

    /**
     * 操作电表
     * 
     * 总表操作
     */
    bindTotalSwitch: function () {
      var _this = this;

      if (!this.pageData.online || this.pageData.isSummary) {
        return;
      }

      if (this.pageData.isOpen == 1) {
        // 操作单路电表（关-开、开-关）
        _this.buttonElec(this.pageData.deviceCode, 1);
      } else if (this.pageData.isOpen == 0) {
        // 操作单路电表（关-开、开-关）
        _this.buttonElec(this.pageData.deviceCode, 2);
      } else {
        app.globalData.ShowMsgUtil.showErrorModal('提示', '操作失败！');
      }
    },

    /** 
     * 一路电表操作
     */
    bindFirstSwitch: function () {
      var _this = this;

      if (!this.pageData.online || this.pageData.isSummary || !this.pageData.isMuchWay) {
        return;
      }

      if (this.pageData.firstIsOpen == 1) {
        // 操作单路电表（关-开、开-关）
        _this.buttonElec(this.pageData.deviceCode, 3);
      } else if (this.pageData.firstIsOpen == 0) {
        // 操作单路电表（关-开、开-关）
        _this.buttonElec(this.pageData.deviceCode, 4);
      } else {
        app.globalData.ShowMsgUtil.showErrorModal('提示', '操作失败！');
      }
    },

    /** 
     * 二路电表操作
     */
    bindSecondSwitch: function () {
      var _this = this;

      if (!this.pageData.online || this.pageData.isSummary || !this.pageData.isMuchWay) {
        return;
      }

      if (this.pageData.secondIsOpen == 1) {
        // 操作单路电表（关-开、开-关）
        _this.buttonElec(this.pageData.deviceCode, 5);
      } else if (this.pageData.secondIsOpen == 0) {
        // 操作单路电表（关-开、开-关）
        _this.buttonElec(this.pageData.deviceCode, 6);
      } else {
        app.globalData.ShowMsgUtil.showErrorModal('提示', '操作失败！');
      }
    },

    /**
     * 对电表进行开关
     */
    buttonElec: function (deviceCode, status) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      console.log('电表开启的设备编号', deviceCode);
      wx.request({
        url: app.globalData.RequestUrl.appoprRequestUrl.operateEle,
        data: {
          'deviceType': 4,
          'deviceCode': deviceCode,
          'operateType': 1,
          'status': status
        },
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          console.log('电表操作返回--', res.data);

          if (res.data && res.data.code == 200) {
            if (status == 1) {
              _this.pageData.image = ImageUrl.switchOpen;
              _this.pageData.msg = '点击此处，将"开启"电表总闸';
              app.globalData.ShowMsgUtil.showSuccessToast('关电表总闸成功', 2000);
            }

            if (status == 2) {
              _this.pageData.image = ImageUrl.switchClose;
              _this.pageData.msg = '点击此处，将"关闭"电表总闸';
              app.globalData.ShowMsgUtil.showSuccessToast('开电表总闸成功', 2000);
            }

            if (status == 3) {
              _this.pageData.firstIsOpen = false;
              _this.pageData.firstIsOpenImage = ImageUrl.emmterOneWayOff;
              app.globalData.ShowMsgUtil.showSuccessToast('关电表一路成功', 2000);
            }

            if (status == 4) {
              _this.pageData.firstIsOpen = true;
              _this.pageData.firstIsOpenImage = ImageUrl.emmterOneWayOn;
              app.globalData.ShowMsgUtil.showSuccessToast('开电表一路成功', 2000);
            }

            if (status == 5) {
              _this.pageData.secondIsOpen = false;
              _this.pageData.secondIsOpenImage = ImageUrl.emmterOneWayOff;
              app.globalData.ShowMsgUtil.showSuccessToast('关电表二路成功', 2000);
            }

            if (status == 6) {
              _this.pageData.secondIsOpen = true;
              _this.pageData.secondIsOpen = ImageUrl.emmterOneWayOn;
              app.globalData.ShowMsgUtil.showSuccessToast('开电表二路成功', 2000);
            }

            _this.setData({
              pageData: _this.pageData
            });

            setTimeout(function () {
              wx.hideToast({});
            }, 2000);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('操作失败', res.data.msg, res.data.code);
            wx.hideToast({});
          }
        },

        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          setTimeout(function () {
            wx.hideToast({});
          }, 2000);
        }
      });
    } // operationElec: function (tapIndex, elecList) {
    //   var _this = this;
    //   if (elecList[tapIndex].deviceCacheToApp != null && elecList[tapIndex].deviceCacheToApp.gateway != null && elecList[tapIndex].deviceCacheToApp.gateway.gatewayDeviceType == 0) {
    //     wx.showActionSheet({
    //       itemList: ['一路电表', '二路电表', '总路'],
    //       success: function (res) {
    //         // 一路电表
    //         if (!res.cancel) {
    //           app.ShowMsgUtil.showLoadAndMsgToast('设备操作中...', 10000);
    //           if (res.tapIndex == 0) {
    //             console.log('一路电表--' + elecList[tapIndex].deviceCacheToApp.status.firstIsOpen);
    //             //判断该路电表的状态
    //             if (elecList[tapIndex].deviceCacheToApp.status.firstIsOpen == 1) {
    //               // 操作单路电表（关-开、开-关）
    //               _this.buttonElec(elecList[tapIndex].deviceCode, 3);
    //             }
    //             if (elecList[tapIndex].deviceCacheToApp.status.firstIsOpen == 0) {
    //               // 操作单路电表（关-开、开-关）
    //               _this.buttonElec(elecList[tapIndex].deviceCode, 4);
    //             }
    //           }
    //           // 二路电表
    //           if (res.tapIndex == 1) {
    //             console.log('二路电表--' + elecList[tapIndex].deviceCacheToApp.status.secondIsOpen);
    //             if (elecList[tapIndex].deviceCacheToApp.status.secondIsOpen == 1) {
    //               // 操作单路电表（关-开、开-关）
    //               _this.buttonElec(elecList[tapIndex].deviceCode, 5);
    //             }
    //             if (elecList[tapIndex].deviceCacheToApp.status.secondIsOpen == 0) {
    //               // 操作单路电表（关-开、开-关）
    //               _this.buttonElec(elecList[tapIndex].deviceCode, 6);
    //             }
    //           }
    //           if (res.tapIndex == 2) {
    //             console.log('总开关--' + elecList[tapIndex].deviceCacheToApp.status.isOpen);
    //             if (elecList[tapIndex].deviceCacheToApp.status.isOpen == 1) {
    //               // 操作单路电表（关-开、开-关）
    //               _this.buttonElec(elecList[tapIndex].deviceCode, 1);
    //             }
    //             if (elecList[tapIndex].deviceCacheToApp.status.isOpen == 0) {
    //               // 操作单路电表（关-开、开-关）
    //               _this.buttonElec(elecList[tapIndex].deviceCode, 2);
    //             }
    //           }
    //         }
    //       }
    //     });
    //   } else {
    //     app.ShowMsgUtil.showErrorModal('提示', '操作失败！');
    //   }
    // },

  }
};
</script>
<style>
@import "./totalMeter.css";
</style>