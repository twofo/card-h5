<template>
<view class="container">
  <scroll-view scroll-y :style="'width:690rpx;height:' + list_height + 'rpx'">
    <block v-for="(item, index) in devicesList" :key="index">
      <view class="list-item" :id="item.deviceId" @tap="Connect">
        <view style="display:flex;flex-direction:column;width:80%">
          <text style="font-size:medium;word-break:break-all">设备名称: {{item.name}}</text>
          <text style="font-size:x-small;color:gray;word-break:break-all">设备ID: {{item.deviceId}}</text>
          <text style="font-size:x-small;color:gray;word-break:break-all">信号强度RSSI: {{item.RSSI}}</text>
        </view>
        <image style="width:36px;height:36px" mode="aspectFit" src="/static/images/bluetooth.png"></image>
      </view>
    </block>
  </scroll-view>
  <button type="primary" class="button" :loading="searching" @tap="Search">{{searching?"搜索中...":"搜索蓝牙设备"}}</button>
</view>
</template>

<script>
const app = getApp();

export default {
  data() {
    return {
      // 是否在搜素
      searching: false,
      // 设备列表
      devicesList: [],
      list_height: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
    var list_height = (app.globalData.SystemInfo.windowHeight - 50) * (750 / app.globalData.SystemInfo.windowWidth) - 60;
    that.setData({
      list_height: list_height
    });
    wx.onBluetoothAdapterStateChange(function (res) {
      console.log(res);
      that.setData({
        searching: res.discovering
      });

      if (!res.available) {
        that.setData({
          searching: false
        });
      }
    });
    wx.onBluetoothDeviceFound(function (devices) {
      //剔除重复设备，兼容不同设备API的不同返回值
      var isnotexist = true;

      if (devices.deviceId) {
        if (devices.advertisData) {
          devices.advertisData = app.globalData.buf2hex(devices.advertisData);
        } else {
          devices.advertisData = '';
        }

        console.log(devices);

        for (var i = 0; i < that.devicesList.length; i++) {
          if (devices.deviceId == that.devicesList[i].deviceId) {
            isnotexist = false;
          }
        }

        if (isnotexist) {
          that.devicesList.push(devices);
        }
      } else if (devices.devices) {
        if (devices.devices[0].advertisData) {
          devices.devices[0].advertisData = app.globalData.buf2hex(devices.devices[0].advertisData);
        } else {
          devices.devices[0].advertisData = '';
        }

        console.log(devices.devices[0]);

        for (var i = 0; i < that.devicesList.length; i++) {
          if (devices.devices[0].deviceId == that.devicesList[i].deviceId) {
            isnotexist = false;
          }
        }

        if (isnotexist) {
          that.devicesList.push(devices.devices[0]);
        }
      } else if (devices[0]) {
        if (devices[0].advertisData) {
          devices[0].advertisData = app.globalData.buf2hex(devices[0].advertisData);
        } else {
          devices[0].advertisData = '';
        }

        console.log(devices[0]);

        for (var i = 0; i < devices_list.length; i++) {
          if (devices[0].deviceId == that.devicesList[i].deviceId) {
            isnotexist = false;
          }
        }

        if (isnotexist) {
          that.devicesList.push(devices[0]);
        }
      }

      that.setData({
        devicesList: that.devicesList
      });
    });
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {
    var that = this;
    that.setData({
      devicesList: []
    });

    if (this.searching) {
      wx.stopBluetoothDevicesDiscovery({
        success: function (res) {
          console.log(res);
          that.setData({
            searching: false
          });
        }
      });
    }
  },
  methods: {
    /**
     * 搜素蓝牙设备
     */
    Search: function () {
      var that = this;

      if (!that.searching) {
        // 关闭蓝牙模块（不该放在这）
        wx.closeBluetoothAdapter({
          complete: function (res) {
            console.log(res); // 打开蓝牙适配器

            wx.openBluetoothAdapter({
              success: function (res) {
                console.log(res); // 获取本机蓝牙适配器的状态：判断蓝牙是否

                wx.getBluetoothAdapterState({
                  success: function (res) {
                    console.log(res);
                  }
                }); // wx.startBeaconDiscovery({
                //   uuids: ['b7435734-c701-4ce6-8c4b-c9d25c6b8098'],//参数uuid
                //   success: function (res) {
                //     console.log('蓝牙设备信息--' + res.beacons);
                //     wx.onBeaconUpdate(function (res) {//监听 iBeacon 设备的更新事件  
                //       //封装请求数据 
                //       var beacons = res.beacons;
                //       console.log('蓝牙设备信息--' + beacons);
                //       var reqContent = {};
                //       var bleArray = [];
                //       for (var i = 0; i < beacons.length; i++) {
                //         var bleObj = {};
                //         bleObj.distance = beacons[i].accuracy;
                //         bleObj.rssi = beacons[i].rssi;
                //         bleObj.mac = beacons[i].major + ":" + beacons[i].minor;
                //         bleArray.push(bleObj);
                //       }
                //       console.log('蓝牙设备信息--' + bleArray);
                //       // reqContent.ble = bleArray;
                //       //请求后台向redis插入数据
                //       // redisSave(reqContent);
                //     });
                //   },
                // })

                wx.startBluetoothDevicesDiscovery({
                  allowDuplicatesKey: false,
                  success: function (res) {
                    console.log('设备信息2--' + res);
                    that.setData({
                      searching: true,
                      devicesList: []
                    });
                  }
                });
              },
              // 在打开蓝牙适配器中：提示手机蓝牙未打开
              fail: function (res) {
                console.log(res);
                wx.showModal({
                  title: '提示',
                  content: '请检查手机蓝牙是否打开',
                  showCancel: false,
                  success: function (res) {
                    that.setData({
                      searching: false
                    });
                  }
                });
              }
            });
          }
        });
      } else {
        wx.stopBluetoothDevicesDiscovery({
          success: function (res) {
            console.log(res);
            that.setData({
              searching: false
            });
          }
        });
      }
    },
    Connect: function (e) {
      var that = this;
      var advertisData, name;
      console.log(e.currentTarget.id);

      for (var i = 0; i < that.devicesList.length; i++) {
        if (e.currentTarget.id == that.devicesList[i].deviceId) {
          name = that.devicesList[i].name;
          advertisData = that.devicesList[i].advertisData;
        }
      }

      wx.stopBluetoothDevicesDiscovery({
        success: function (res) {
          console.log(res);
          that.setData({
            searching: false
          });
        }
      });
      wx.showLoading({
        title: '连接蓝牙设备中...'
      });
      wx.createBLEConnection({
        deviceId: e.currentTarget.id,
        success: function (res) {
          console.log(res);
          wx.hideLoading();
          wx.showToast({
            title: '连接成功',
            icon: 'success',
            duration: 1000
          });
          wx.navigateTo({
            url: '../device/device?connectedDeviceId=' + e.currentTarget.id + '&name=' + name
          });
        },
        fail: function (res) {
          console.log(res);
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '连接失败',
            showCancel: false
          });
        }
      });
    }
  }
};
</script>
<style>
@import "./boothDemo.css";
</style>