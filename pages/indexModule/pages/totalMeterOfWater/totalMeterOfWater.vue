<template>
<view class="page">
  <view v-if="!nothing">
    <view class="page__bd background-content">
      <!-- 上层 -->
      <view class="background-up" :style="'width: ' + (windowWidth*0.92) + 'px'">
        <view v-for="(item, index) in roomsDeviceArr.arr" :key="index" style="border-bottom:20rpx solid rgba(204,204,204,0.5)">
          <!-- 标题 -->
          <view class="weui-cells_after-title" style="margin: 0 15px;">
            <view class="myui-cell">
              <!-- <view class="" style="width: {{windowWidth*0.92*0.44}}px">
							<text>状态：</text>
							<image src="{{Waterobj.statusImage}}" style="width:{{windowWidth*0.92*0.03}}px;height:{{windowHeight*0.5*0.03}}px;"></image>
							<text style="margin-left: 20rpx;">{{Waterobj.status}}</text>
						</view> -->
              <view class="weui-cell__ft wx-font">截止时间：{{roomsDeviceArr.time}}</view>
            </view>
          </view>
          <!-- 设备编号 -->
          <view class="wx-device">
            <text style="font-size:12px;color:rgb(60,58,80);">{{item.type}}：</text>
            <!-- <text style="font-size: 18px;color:rgb(70,68,83)">{{Waterobj.deviceCode}}</text> -->
          </view>
          <!-- 用水量显示 -->
          <view class="wx-show">
            <view class="show-items items-start" style>{{item.count[0]}}</view>
            <view class="show-items items-black">{{item.count[1]}}</view>
            <view class="show-items items-black">{{item.count[2]}}</view>
            <view class="show-items items-black">{{item.count[3]}}</view>
            <view class="show-items items-black">{{item.count[4]}}</view>
            <view class="items-box-point">
              <view class="items-point"></view>
            </view>
            <view class="show-items items-red" style="background-color: rgb(32,164,247);">{{item.count[5]}}</view>
            <view class="show-items items-end" style="background-color: rgb(32,164,247);">{{item.count[6]}}</view>
            <view class="show-items" style="color: black;">{{item.size}}</view>
          </view>
          <!-- 用红杠分隔 -->
          <view style="display: flex;flex-direction: row;justify-content: center;margin: 23px 0px 15px 0;" v-if="item.deviceType != 4">
            <image class :src="ImageUrl.blueLine" :style="'width: ' + (windowWidth*0.66) + 'px;height:3px;'"></image>
          </view>
          <!-- 用红杠分隔 -->
          <view style="display: flex;flex-direction: row;justify-content: center;margin: 23px 0px 15px 0;" v-if="item.deviceType == 4">
            <image class :src="ImageUrl.redLine" :style="'width: ' + (windowWidth*0.66) + 'px;height:3px;'"></image>
          </view>
          <view v-if="item.deviceType == 4">
            <view>
              <!-- 开关 -->
              <view class="wx-button" :style="'height:' + (windowHeight*0.57*0.42) + 'px;'" v-if="!item.pageData.isSummary">
                总闸开关
                <view class="button-box" @tap="bindTotalSwitch">
                  <image :src="item.pageData.image" style="width:80px;height:80px;"></image>
                  <text style="font-size:12px;color:rgb(182,181,193);margin-top:6px;">{{item.pageData.msg}}</text>
                </view>
              </view>
              <view v-else style="margin: 20px 15px 15px;">
                <view>
                  <view class="weui-cell__bd">设备类型：总表</view>
                  <view class="weui-cell__bd ">总表无法操作</view>
                </view>
              </view>
            </view>
            <view>
              <view class="background-bottom">
                <view class="emmter-box" v-if="item.pageData.isMuchWay && !item.pageData.isSummary">
                  <text>电表分表</text>
                  <view class="emmter-items">
                    <view class="emmter-item" @tap="bindFirstSwitch">
                      <image :src="item.pageData.firstIsOpenImage" style="width:50px;height:50px;"></image>
                      <text>一路</text>
                    </view>
                    <view class="emmter-item" @tap="bindSecondSwitch">
                      <image :src="item.pageData.secondIsOpenImage" style="width:50px;height:50px;"></image>
                      <text>二路</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>

        </view>





      </view>

      <!-- 下层 -->
      <view class="background-top" :style="'height: ' + (windowHeight*0.3) + 'px; width: 100%;background-color: rgb(32,164,247);'"></view>

    </view>
    <!-- <view class="page__bd background-content" hidden="{{showEle}}"> -->
    <!-- 上层 -->
    <!-- <view class="background-up" style="height:{{windowHeight*0.57}}px;width: {{windowWidth*0.92}}px;">
      

    
     
      <view  style="margin: 20px 15px 15px;"> 
        <view>
          <view class="weui-cell__bd">设备类型：总表</view>
          <view class="weui-cell__bd ">总表无法操作</view>
        </view>
      </view>
    </view>

    <view class="background-bottom" style="height: {{windowHeight*0.7-7}}px; width: 100%;background-color: #fff;">
      <view class="emmter-box" style=" padding-top: {{windowHeight*0.7*0.53-2}}px;" wx:if="{{pageData.isMuchWay && !pageData.isSummary}}">
        <text>电表分表</text>
        <view class="emmter-items">
          <view class="emmter-item" bindtap="bindFirstSwitch">
            <image src="{{pageData.firstIsOpenImage}}" style="width:50px;height:50px;"></image>
            <text>一路</text>
          </view>
          <view class="emmter-item" bindtap="bindSecondSwitch">
            <image src="{{pageData.secondIsOpenImage}}" style="width:50px;height:50px;"></image>
            <text>二路</text>
          </view>
        </view>
      </view>
    </view>
  </view> -->
  </view>
  <view class="nomore" v-if="nothing">暂无设备,请安装!</view>

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
      pageData: {},
      ImageUrl: ImageUrl,
      showWaterData: [],
      //用水量显示数据
      showEleData: [],
      //用电量显示数据
      roomsDeviceArr: [1, 2, 3],
      nothing: false,
      disable: true
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function (options) {
    // 确保缓存里的设备数据存在
    console.log(options);
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight,
      windowWidth: wx.getSystemInfoSync().windowWidth
    });
    let devices = app.globalData.StorageUtil.get("roomDevices"); // let devices = [{ deviceType: 2 }, { deviceType: 8 }, { deviceType:4}]

    console.log(devices);

    if (devices) {
      let roomId = options.roomId;
      this.getUsageByRoom(roomId, devices);
    } else {
      this.setData({
        nothing: true
      });
    }
  },
  methods: {
    getUsageByRoom: function (roomIds, devices) {
      let _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      wx.showNavigationBarLoading();
      var data = {
        roomId: roomIds
      };
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getUsageByRoom,
        method: 'GET',
        data: data,
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取水电信息返回', res.data);

          if (res.data && res.data.code === 200) {
            let arr = _this.reduceData(res.data.data, devices);

            let roomsDeviceArr = {
              time: res.data.data.today,
              arr: arr
            };
            console.log(roomsDeviceArr);

            _this.setData({
              roomsDeviceArr
            });
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

    reduceData(data, devices) {
      console.log(devices);
      let colorWater = this.dealWaterData(data.usageTotalColdWater);
      let hotWater = this.dealWaterData(data.usageTotalHotWater);
      let electry = this.dealWaterData(data.usageTotalEle);
      let dat = [];
      let ind = 0;

      for (let i = 0; i < devices.length; i++) {
        let obj = {};

        if (devices[i].deviceType == 4 || devices[i].deviceType == 2 || devices[i].deviceType == 8) {
          if (devices[i].deviceType == 2) {
            obj = {
              type: "冷水表用水量",
              count: colorWater,
              size: "m³",
              deviceType: 2
            };
          }

          if (devices[i].deviceType == 8) {
            obj = {
              type: "热水表用水量",
              count: hotWater,
              size: "m³",
              deviceType: 8
            };
          }

          if (devices[i].deviceType == 4) {
            let eled = this.reduceEleData(devices[i]);
            console.log(eled);
            obj = {
              type: "电表用电量",
              count: electry,
              size: "kW.h",
              deviceType: 4,
              pageData: eled
            };
          }

          dat[ind] = obj;
          ind++;
        } else {
          console.log(devices[i].deviceType);
          continue;
        }
      }

      return dat;
    },

    reduceEleData: function (deviceObj) {
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


      this.setData({
        pageData: obj
      });
      return obj;
    },

    /**
       * 操作电表
       * 
       * 总表操作
       */
    bindTotalSwitch: function () {
      var _this = this;

      if (this.disable) {
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
      } else {
        app.globalData.ShowMsgUtil.showErrorModal('提示', '请勿连续开启！');
      }
    },

    /** 
    * 一路电表操作
    */
    bindFirstSwitch: function () {
      var _this = this;

      if (this.disable) {
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
      } else {
        app.globalData.ShowMsgUtil.showErrorModal('提示', '请勿连续开启！');
      }
    },

    /** 
     * 二路电表操作
     */
    bindSecondSwitch: function () {
      var _this = this;

      if (this.disable) {
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
      } else {
        app.globalData.ShowMsgUtil.showErrorModal('提示', '请勿连续开启！');
      }
    },

    /**
     * 对电表进行开关
     */
    buttonElec: function (deviceCode, status) {
      this.setData({
        disable: false
      });
						app.globalData.ShowMsgUtil.netErrNotice();
      var _this = this;

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
          _this.setData({
            disable: true
          });

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
    },

    /**
       * 处理水量返回数据 - 用于页面显示
       */
    dealWaterData: function (data) {
      data = data.toFixed(2);
      console.log(data.toString());
      var showWaterData = [];
      var eleData = data.toString();
      var arr = eleData.split(".");

      if (arr[0].length > 5) {
        arr[0] = arr[0].substring(0, 5);
      }

      let t = 0;

      for (let i = 0; i < 5; i++) {
        showWaterData[i] = 0;

        if (5 - i <= arr[0].length) {
          showWaterData[i] = arr[0].split('')[t];
          t++;
        }
      }

      t = 0;

      if (arr.length == 1) {
        showWaterData[5] = 0;
        showWaterData[6] = 0;
      } else {
        for (let i = 5; i < 7; i++) {
          showWaterData[i] = 0;

          if (7 - i <= arr[1].length) {
            showWaterData[i] = arr[1].split('')[t];
            t++;
          }
        }
      }

      return showWaterData;
    },

    /**
     * 获取用水量
     */
    getWaterInfo: function (deviceDetailCach, userInfoCach) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      var deviceCode = deviceDetailCach.deviceCacheToApp.deviceCode;
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getWaterInfo,
        data: {
          deviceCode: deviceCode
        },
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取用水量信息返回', res.data);

          if (res.data && res.data.code === 200) {
            var data = res.data.rows;

            _this.dealWaterData(data);
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
    getElectricityInfo: function (deviceDetailCach, userInfoCach) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
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
      });
    },

    /**
     * 处理页面显示数据
     */
    dealPageData: function (deviceObj) {
      let obj = {};

      if (deviceObj.deviceCacheToApp.status.online) {
        obj.status = '在线';
        obj.statusImage = ImageUrl.deviceOnLine;
      } else {
        obj.status = '离线';
        obj.statusImage = ImageUrl.deviceOffLine;
      }

      obj.lastLoginTime = app.globalData.PublicUtil.formatTimeTwo(deviceObj.deviceCacheToApp.lastLoginTime == null ? new Date().getTime() : deviceObj.deviceCacheToApp.lastLoginTime, 'Y-M-D h:m:s');
      obj.deviceCode = deviceObj.deviceCacheToApp.deviceCode;
      obj.deviceName = deviceObj.deviceName;
      obj.deviceVersion = deviceObj.deviceVersion;
      console.log("deviceObj" + deviceObj.deviceCacheToApp);
      return obj;
    }
  }
};
</script>
<style>
@import "./totalMeterOfWater.css";
</style>