<template>
<view class="page">
	
	<!-- 提示框 -->
	<msg-select :msg="msg" :showModel="showModel" :btnList="btnList" @confirm="bindConfirm" @cancel="bindCancel"></msg-select>

	<view class="weui-cells">
		<view class="weui-cell" style="padding:10rpx 30rpx;height:30px;" @tap="goToContent">
			<view class="weui-cell__bd more_bd">确认是否打开蓝牙</view>
			<view class="weui-cell__ft addBlue"> 
				<switch type="switch" disabled style="zoom: 0.5;" :checked="checked"></switch>
			</view>
		</view>
	</view>
	
	<view class="searchBlue">
		<!-- <view>附近可用设备</view> -->
		<!-- <view class="connectedSum" > -->
			<view class="weui-cells weui-cells_after-title" @tap="startBluetoothDevicesDiscovery">
					<view url class="weui-cell weui-cell_access" hover-class="weui-cell_active">
							<view class="weui-cell__hd">
									<image v-if="startSearch&&checked" :src="ImageUrls.loadingPic" mode="widthFix" style="width: 20rpx;" class="loadingImg"></image>
							</view>
							<view class="weui-cell__bd">附近可用设备</view>
							<view class="weui-cell__ft weui-cell__ft_in-access">点击搜索</view>
					</view>	
			</view>
		<!-- </view> -->
		
		<view class="weui-cells" v-if="checked && searchBlueBase.length>0">
			<block v-for="(item, index) in searchBlueBase" :key="index">
				<view class="weui-cell" style="padding:10rpx 30rpx;height:30px;" :data-value="item" @tap="toConnect">
					<view class="weui-cell__bd more_bd">水表位置:{{item.name}}[楼层#房间号]</view>
					<view class="weui-cell__ft searchBlueItem" :data-value="item">
						<image :src="ImageUrls.blueSignPic" mode="widthFix" style="width: 30rpx; margin-right: 30rpx;"></image>			
						<view v-if="item.RSSI + 100 > 70">强</view>
						<view class="noticeColor" v-if="69 >item.RSSI + 100 > 39">良</view>
						<view class="sendErr" v-if="item.RSSI + 100 < 40">弱</view>
					</view>
				</view>
			</block>
		</view>
	</view>
	
</view>
</template>

<script>
var ImageUrls = require("../../resources/utils/imageUrl.js");
var app = getApp();
var ArrayBufferDemo = app.globalData.arrayBufferDemo;
var BluetoothUtil = app.globalData.bluetoothUtil;
var AgreementUtil = app.globalData.agreementUtil;
var temp = [];
function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i;
    }
  }

  return -1;
}
import msgSelect from "../../../../components/common/msgSelect/msgSelect";

export default {
  data() {
    return {
      ImageUrls: ImageUrls,
      checked: false,
      //是否打开手机蓝牙
      contBlueBase: {},
      //已连接蓝牙设备
      searchBlueBase: [],
      //附近蓝牙设备
      startSearch: false,
      //开始搜索
      showModel: false,
      //显示提示框
      btnList: [],
      msg: '',
      deviceId: "",
      isGetBluetoothInfo: 0,
      deviceName: ""
    };
  },

  components: {
    msgSelect
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {// this.initializeBluetooth();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("生命周期函数--监听页面卸载");
    this.stopBluetoothDevicesDiscovery();
    this.stopsearch();
    this.setData({
      searchBlueBase: []
    }); // wx.closeBluetoothAdapter(); //关闭蓝牙模块，使其进入未初始化状态。
  },
  methods: {
    goToContent() {
      //checked 为true时,自动搜索附近设备
      let _this = this;

      temp = []; // this.openBluetoothAdapter();

      this.initializeBluetooth();
    },

    /**
      * 一、初始化蓝牙
      */
    initializeBluetooth: function () {
      let _this = this;

      let {
        checked
      } = this; //关闭蓝牙模块

      wx.closeBluetoothAdapter({
        complete: function (res) {
          console.log("关闭蓝牙模块 - ", res); //判断蓝牙是否打开

          wx.openBluetoothAdapter({
            success: function (res) {
              console.log("初始化蓝牙设备 - ", res);

              _this.setData({
                checked: true
              }); //判断蓝牙是否可用


              wx.onBluetoothAdapterStateChange(function (res) {
                console.log("蓝牙适配器状态变化 - ", res);
                let availableStr = res.available ? "蓝牙适配器可用" : "蓝牙适配器不可用";
                let discoveringStr = res.discovering ? "正在搜索" : "搜索可用";
                console.log("手机蓝牙是否可用：", availableStr);
                console.log("是否正在搜素", discoveringStr);
                var isDvailable = res.available; //蓝牙适配器是否可用

                if (isDvailable) {} else {
                  app.globalData.ShowMsgUtil.showErrorModal('蓝牙连接失败', "手机蓝牙不可用：");

                  _this.stopBluetoothDevicesDiscovery(); //停止搜索


                  _this.setData({
                    searchBlueBase: []
                  });
                }
              }); //监听寻找新设备的事件

              wx.onBluetoothDeviceFound(function (devices) {
                let t = 0;
                let searchDevice = []; // TODO 在这可以判断是否已经搜素到，指定蓝牙。如果搜素到，则停止蓝牙搜素

                console.log("监听寻找新设备的事件 - ", devices.devices[0]);

                for (let i = 0; i < devices.devices.length; i++) {
                  if (!devices.devices[i].deviceId || !devices.devices[i].name) {
                    return;
                  }

                  searchDevice[t++] = devices.devices[i]; // console.log('new device list has founded')
                  // console.log('设备id - ' + devices.devices[i].deviceId)
                  // console.log('设备name - ' + devices.devices[i].name)
                }

                var device = devices.devices[0];

                if (device.name.indexOf('#') > -1) {
                  temp.push(device);
                }

                _this.setData({
                  searchBlueBase: temp
                });
              });
            },
            fail: function (res) {
              app.globalData.ShowMsgUtil.showErrorModal('蓝牙连接失败', "请检查手机蓝牙是否打开"); // console.log("初始化蓝牙设备 - ", res);

              console.warn("请检查手机蓝牙是否打开");

              _this.setData({
                checked: false
              });
            }
          });
        },
        fail: function (res) {
          app.globalData.ShowMsgUtil.showErrorModal('蓝牙连接失败', "请检查手机蓝牙是否打开"); // console.log("关闭蓝牙模块 - ", res);

          console.warn("请检查手机蓝牙是否打开");
        }
      });
    },

    /**
     * 开始搜素附近蓝牙
     */
    startBluetoothDevicesDiscovery() {
      console.log(">>>>>>>>>checked - ", this.checked);

      if (this.checked == false) {
        app.globalData.ShowMsgUtil.showErrorModal('操作失败', '请先打开蓝牙开关');
        return;
      }

      let _this = this;

      app.globalData.ShowMsgUtil.showLoadToast('正在搜索设备', 2000);

      _this.setData({
        startSearch: true
      });

      wx.startBluetoothDevicesDiscovery({
        success: function (res) {// console.log("开始搜索附近蓝牙设备")
          // console.log(res)
        }
      });
    },

    /**
     * 停止蓝牙搜素
     */
    stopBluetoothDevicesDiscovery() {
      wx.stopBluetoothDevicesDiscovery();
      this.setData({
        startSearch: false
      });
    },

    /**
     * 3、停止蓝牙搜素
     */
    stopsearch: function () {
      wx.stopBluetoothDevicesDiscovery({
        success: function (res) {
          console.log("停止蓝牙搜索");
          console.log(res);
        }
      });
    },

    /**
      * 4、连接蓝牙设备
      */
    toConnect: function (e) {
      wx.hideToast();
      console.log(">>>>>>>>>>>toConnect - ...", e);
      let btnList = ['取消', '连接'];
      this.setData({
        contBlueBase: e.currentTarget.dataset.value,
        msg: '是否连接',
        showModel: true,
        btnList: btnList
      });
    },
    //点击确认
    bindConfirm: function () {
      var _this = this; // app.StorageUtil.remove("connectDeviceInfo");


      console.log('>>>>>>>>>>>toConnect - res>', _this.contBlueBase.deviceId);

      _this.setData({
        showModel: false
      });

      app.globalData.ShowMsgUtil.showLoadAndMsgToast("连接水表中...");
      wx.createBLEConnection({
        deviceId: _this.contBlueBase.deviceId,
        timeout: 30000,
        success: res => {
          console.log('>>>>>>>>>>>toConnect - res>', res);

          if (res.errCode == 0) {
            // TODO 水表身份认证
            // 设置MTU
            let deviceId = _this.contBlueBase.deviceId;
            let mtu = 50;
            setTimeout(() => {
              wx.setBLEMTU({
                deviceId,
                mtu,
                success: res => {
                  console.log('setBLEMTU:success:', res);
                },

                fail(res) {
                  console.error('setBLEMTU:fail:', res);
                }

              });
            }, 1000);
            app.globalData.StorageUtil.remove("connectDeviceInfo");
            console.log('>>>>>>>>>>>toConnect - 连接水表: success');

            _this.setData({
              deviceId: _this.contBlueBase.deviceId
            });

            app.globalData.StorageUtil.set("connectDeviceInfo", _this.contBlueBase.deviceId);
            let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

            let prevPage = pages[pages.length - 2]; // prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

            prevPage.setData({
              // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
              isGetBluetoothInfo: 1,
              deviceName: _this.contBlueBase.localName
            });

            _this.stopBluetoothDevicesDiscovery();

            _this.stopsearch();

            app.globalData.PublicUtil.navigateBack(2000);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('提示', "不能正常对水表进行连接");
          }
        },
        fail: res => {
          wx.hideLoading();

          if (res.errCode == 10012) {
            app.globalData.ShowMsgUtil.showErrorModal('提示', "水表连接超时");
          } else {// app.ShowMsgUtil.showErrorModal('水表连接失败', "请稍后再试");
          }

          _this.setData({
            checked: false
          });

          console.warn(">>>>>>>>>>>toConnect - 连接水表: fail", res);
        },
        complete: () => {
          this.setData({
            showModel: false
          });
          wx.hideLoading();
        }
      });
    },
    wxSetBLEMTU: function () {
      wx.setBLEMTU({
        deviceId: this.contBlueBase.deviceId,
        mtu: 50,
        success: res => {
          console.log('setBLEMTU:success:', res);
        },

        fail(res) {
          console.error('setBLEMTU:fail:', res);
        },

        complete(res) {
          console.log('setBLEMTU:complete:', res);
        }

      });
    },
    //点击取消
    bindCancel: function () {
      this.setData({
        showModel: false
      });
    }
  }
};
</script>
<style>
@import "./contentWatermeter.css";
</style>