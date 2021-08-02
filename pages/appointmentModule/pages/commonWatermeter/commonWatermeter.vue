<template>
<view class="page">
	<view class="weui-cells" style="font-size: 32rpx;">
		<view class="weui-cell" style="padding:10rpx 30rpx;" @tap="bluetoothSwitch" v-if="!isShowSwitch">
			<view class="weui-cell__bd more_bd">蓝牙</view>
			<view class="weui-cell__ft addBlue"> 
				<switch type="switch" disabled style="zoom: 0.5;" :checked="checked"></switch>
			</view>
		</view>
		<view class="weui-cell" style="padding:10rpx 30rpx;" @tap="goToContent" v-if="!dormDeviceId || (isIOS && isIOS==1 && isShowSwitch)">
			<view class="weui-cell__bd more_bd">查找设备</view>
			<view class="weui-cell__ft addBlue"><image src="/static/images/public/search.png" class="image-items"></image></view>
		</view>
		<view class="weui-cell">
			<view class="weui-cell__bd more_bd">连接状态</view>
			<view class="weui-cell__ft "> {{showDeviceInfo.connectStatus}} </view>
		</view>
	</view>
	
	<!-- 提示框 -->
  <msg-select :msg="msgObj.msg" :showModel="msgObj.showModel" :btnList="msgObj.btnList" @confirm="bindConfirm" @cancel="bindCancel"></msg-select>

	
	<view class="weui-cells">
		<view class="weui-cell nomore" v-if="waterBase.length <= 0">
		<!-- -- 暂无使用记录 --  -->
		</view>
		<view class v-else>
			<view class="weui-cell">
				<view class="weui-cell__bd more_bd">设备</view>
				<view class="weui-cell__ft weui-center"> 
					<!-- <image src="{{ImageUrls.blueRecord}}" mode="widthFix" style="width: 32rpx;margin-right: 10rpx;"></image> -->
					<!-- <text style="color: #666;">使用记录</text>	 -->
				</view>
			</view>
			<view class="weui-cell baseCont">
				<view class="switchWaterBase">
					<view class="switchBox">
						<view class="switchItem" @tap="operateWaterMeter">
							<view :class="'switchInfo ' + ( (isContent == 0 || isContent == 2) ? 'backgroundColor': '' ) + ' ' + (switchWaterMeter == 1 ? 'openBaseColor' :'') + '  '">
								<view v-if="switchWaterMeter == 1">已开启</view>
								<view v-else>水表</view>
								<image v-if="isContent == 0 || isContent == 2" :src="ImageUrls.closeDefault" mode="widthFix" style="width: 80rpx; margin: 10rpx 0;"></image>
								<view v-else="isContent == 1">
									<image v-if="switchWaterMeter == 0" :src="ImageUrls.closeOpen" mode="widthFix" style="width: 80rpx; margin: 10rpx 0;"></image>
									<image v-else-if="switchWaterMeter == 1" :src="ImageUrls.closeDefault" mode="widthFix" style="width: 80rpx; margin: 10rpx 0;"></image>
									<image v-else="switchWaterMeter == 2" :src="ImageUrls.closeDefault" mode="widthFix" style="width: 80rpx; margin: 10rpx 0;"></image>
								</view>
								<!-- <view  wx:if="{{isContent == 2 }}" style="margin: 10rpx 0;">00:00:02</view> -->
								<view>{{baseStatus}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
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
var waterReportArr = [];
var waterReportCommand = '';
var waterReportOneObj = {};
var waterReportHowMuch = 0;
import msgSelect from "../../../../components/common/msgSelect/msgSelect";

export default {
  data() {
    return {
      waterBase: [1, 2],
      //已连接蓝牙设备
      ImageUrls: ImageUrls,
      baseStatus: '点击使用',
      //点击开启设备,点击关闭设备
      isContent: 0,
      //是否连接设备 0 未连接  1已连接
      switchWaterMeter: 0,
      //0关 1开 
      showDeviceInfo: {},
      command: '',
      //输入指令
      retrueCommand: '',
      //返回指令
      dormDeviceId: '',
      // 用于接收宿舍水表蓝牙
      balance: 0.00,
      msgObj: {},
      //订阅消息提示框对象
      isGetBluetoothInfo: 0,
      connectDeviceInfo: {},
      //连接上的设备信息
      isFristIn: 0,
      deviceId: '',
      //设备ID
      serviceId: '',
      //连接的服务ID
      readCharacteristicId: '',
      //连接设备的读取特征值
      writeCharacteristicId: '',
      //连接设备的写入特征值
      isIOS: 0,
      isShowSwitch: true,
      roomName: '',
      checked: false,
      //是否打开手机蓝牙
      deviceName: '' //用于显示设备名称
      ,
      isPublic: "",
      startSearch: false
    };
  },

  components: {
    msgSelect
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("----------------------------------------蓝牙操作用水页面----------------------------------------");
    console.log("options - ", options);
    wx.stopBluetoothDevicesDiscovery();
    let showDeviceInfo = {};
    showDeviceInfo.connectStatus = '未连接';
    showDeviceInfo.deviceName = '暂无';
    this.setData({
      isIOS: options.isIOS,
      isPublic: options.isPublic,
      roomName: options.roomName,
      showDeviceInfo: showDeviceInfo
    });

    if (options && options.isIOS) {
      showDeviceInfo.connectStatus = '未连接';
      showDeviceInfo.deviceName = options.roomName;

      if (options.deviceId != 'undefined' && options.deviceId != null && options.deviceId != '') {
        showDeviceInfo.connectStatus = '已连接';
        this.setData({
          isShowSwitch: false,
          dormDeviceId: options.deviceId
        });
        this.initializeBluetooth(options.deviceId);
      }

      this.setData({
        showDeviceInfo: showDeviceInfo
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.ShowMsgUtil.showLoadToast("加载中...");
    this.getBalance(1); // console.log(">>>>>>>>>>>options.isConnect - ", this.data.isGetBluetoothInfo);

    let connectDeviceInfo = app.globalData.StorageUtil.get("connectDeviceInfo"); // console.log(">>>>>>>>>>>connectDeviceInfo - ", connectDeviceInfo);
    // console.log(">>>>>>>>>>>isFristIn - ", this.data.isFristIn);

    if (this.isGetBluetoothInfo == 1 && connectDeviceInfo) {
      this.getConnectDeviceInfo(connectDeviceInfo);
      this.setData({
        connectDeviceInfo: connectDeviceInfo,
        deviceId: connectDeviceInfo
      });
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("生命周期函数--监听页面卸载");
    wx.stopBluetoothDevicesDiscovery();
    wx.closeBluetoothAdapter(); //关闭蓝牙模块，使其进入未初始化状态。

    app.globalData.StorageUtil.remove("connectDeviceInfo");
  },
  methods: {
    bluetoothSwitch() {
      //checked 为true时,自动搜索附近设备
      let _this = this; // this.openBluetoothAdapter();


      this.initializeBluetooth(this.dormDeviceId);
    },

    goToContent() {
      if (this.switchWaterMeter == 1) {
        app.globalData.ShowMsgUtil.showErrorModal('操作失败', '水表使用过程中，无法切换设备');
        return;
      }

      if (this.isIOS == 1) {
        app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.contentWatermeterUrl + '?roomName=' + this.roomName, 500);
      } else {
        app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.contentWatermeterUrl, 500);
      }
    },

    /**
     * 一、获取连接设备信息
     */
    getConnectDeviceInfo: function (deviceId) {
      if (!deviceId) {
        deviceId = this.deviceId;
      }

      console.log("----------------------------------------获取连接设备信息----------------------------------------");
      var that = this;
      console.log("1、开始获取设备信息, deviceId - ", deviceId);
      wx.getBLEDeviceServices({
        deviceId: deviceId,

        success(getServicesRes) {
          // console.log("getServicesRes", getServicesRes);
          let service = BluetoothUtil.getAvailableService(getServicesRes.services);
          console.log("service", service); // let service = getServicesRes.services[0]

          let serviceId = service.uuid;
          console.log("2、获取连接设备特征值, serviceId - ", serviceId);
          wx.getBLEDeviceCharacteristics({
            deviceId: deviceId,
            serviceId: serviceId,

            success(getCharactersRes) {
              // console.log("getCharactersRes", getCharactersRes);
              let characteristic = getCharactersRes.characteristics[1];
              let readCharacteristicId = BluetoothUtil.getAvailableReadCharacters(getCharactersRes.characteristics).uuid;
              let writeCharacteristicId = BluetoothUtil.getAvailableWriteCharacters(getCharactersRes.characteristics).uuid;
              console.log("readCharacteristicId", readCharacteristicId);
              console.log("writeCharacteristicId", writeCharacteristicId);
              let showDeviceInfo = {};
              showDeviceInfo.connectStatus = '已连接';
              console.log("roomName - ", that.roomName);
              console.log("roomName - ", that.roomName != "" || that.roomName != null);
              showDeviceInfo.deviceName = that.roomName != "" && that.roomName != null ? that.roomName : that.deviceName;
              that.setData({
                isFristIn: 1,
                isContent: 1,
                showDeviceInfo: showDeviceInfo,
                serviceId: serviceId,
                readCharacteristicId: readCharacteristicId,
                writeCharacteristicId: writeCharacteristicId
              }); // console.log('成功获取uuId', that.data.serviceId, that.data.readCharacteristicId);

              console.log("3、启用/停用 低功耗蓝牙设备特征值变化时的notify功能，订阅特征值");
              wx.notifyBLECharacteristicValueChange({
                state: true,
                deviceId: deviceId,
                serviceId: serviceId,
                characteristicId: readCharacteristicId,

                success() {
                  console.log('>>>>>>>>>开始监听特征值');
                  wx.onBLECharacteristicValueChange(function (onNotityChangeRes) {
                    // console.log('>>>>>>>>>监听到特征值更新',typeof onNotityChangeRes.value);
                    let characteristicValue = AgreementUtil.buf2hex(onNotityChangeRes.value);
                    console.log('>>>>>>>>>更新后的特征值(16进制格式)', characteristicValue);
                    that.setData({
                      retrueCommand: characteristicValue
                    }); // 处理监听设备返回小程序数据

                    that.handleReadDeviceReturn(onNotityChangeRes.value);
                  }); // 与水表进行鉴权认证

                  that.toAuth();
                },

                fail: res => {
                  console.warn("监听特征值失败");
                  app.globalData.ShowMsgUtil.showErrorModal('水表连接失败', "请稍后再试");
                }
              });
            },

            fail: res => {
              console.warn("获取特征值信息失败", res);
              app.globalData.ShowMsgUtil.showErrorModal('水表连接失败', "请稍后再试");
            },
            complete: res => {
              console.log('获取服务信息完成', res);
              wx.hideLoading(); // app.ShowMsgUtil.showErrorModal('水表连接失败', "请稍后再试");
            }
          });
        },

        fail: res => {
          console.warn("获取服务信息失败", res);
          app.globalData.ShowMsgUtil.showErrorModal('水表连接失败', "请稍后再试");
        },
        complete: () => {
          wx.hideLoading();
        }
      });
    },

    /***********************************实际业务处理***********************************/
    toAuth: function () {
      //2、小程序请求设备 - 开启水表
      let buffer = AgreementUtil.writeAuth(); // console.log(">>>>>>>>>>buffer - ", buffer);

      this.bluetoothSendCommand(buffer);
    },

    /**
     * 二、操作水表
     */
    operateWaterMeter: function () {
      // 用于操作自己宿舍水表
      if (this.isContent == 0 && this.dormDeviceId) {
        this.startBluetoothDevicesDiscovery();
        return;
      }

      this.handleOperate();
    },
    handleOperate: function () {
      var _this = this;

      console.log(">>>>>>>>>>isContent - ", _this.isContent);

      if (_this.isContent == 0) {
        this.getConnectDeviceInfo();
      } else if (_this.isContent == 1) {
        let isOpen = _this.switchWaterMeter;

        if (isOpen == 0) {
          app.globalData.ShowMsgUtil.showLoadToast('水表开启中...');

          _this.openWaterMeter();
        } else if (isOpen == 1) {
          app.globalData.ShowMsgUtil.showLoadToast('水表关闭中...');

          _this.closeWaterMeter();
        }
      } else {
        app.globalData.ShowMsgUtil.showErrorModal('无法用水', '请稍后再试');
      }
    },
    openWaterMeter: function () {
      //1、请求平台 - 获取下发授权额度
      let data = {};
      this.issueAuthorizationMoney(data, 1);
    },
    handleFristIssueWebReturn: function (issueMoney) {
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); //2、小程序请求设备 - 开启水表

      let buffer = AgreementUtil.writeOpenWaterMeter(issueMoney, userInfoCach.userId); // console.log(">>>>>>>>>>buffer - ", buffer);

      this.bluetoothSendCommand(buffer); //3、设备返回小程序 - 开启水表，小程序返回设备指令数据 - 通过监听处理
      //TODO 如果7秒内，设备没有返回 - 连接超时处理
    },
    closeWaterMeter: function () {
      console.log(" ----- 点击关闭水表操作"); //1、小程序请求设备 - 关闭水表

      let buffer = AgreementUtil.writeCloseWaterMeter();
      this.bluetoothSendCommand(buffer); //2、设备返回小程序 - 关闭水表，小程序返回设备指令数据
      //TODO 如果7秒内，设备没有返回 - 连接超时处理
    },
    handleSecondIssueWebReturn: function (issueMoney) {
      //小程序返回设备 - 重新下发授权额度
      let buffer = AgreementUtil.writeIssuedByLineRetrue(issueMoney); // console.log(">>>>>>>>>>buffer - ", buffer);

      this.bluetoothSendCommand(buffer);
    },

    /**
     * 三、监听设备返回小程序 - 业务处理
     */
    handleReadDeviceReturn: function (buffer) {
      console.log("----------------------------------------读取 - 监听设备返回小程序业务处理----------------------------------------");
      let obj = this.handlerRead(buffer);

      if (obj) {
        switch (obj.type) {
          case 1:
            console.log("开启水表 - 设备返回数据处理");
            this.handleOpenReadDeviceReturn(obj);
            break;

          case 2:
            console.log("关闭水表 - 设备返回数据处理");
            this.handleCloseReadDeviceReturn(obj);
            break;

          case 3:
            console.log("上报水量 - 设备返回数据处理"); // this.handleOneWaterReportReadDeviceReturn(obj);

            this.handleWaterReportReadDeviceReturn(obj);
            console.log("读取 - 水表水量上报，设备请求", obj);
            break;

          case 4:
            console.log("重新下发授权额度 - 设备返回数据处理"); //请求平台 - 获取重新下发授权额度

            let data = {};
            this.issueAuthorizationMoney(data, 0);
            break;

          case 5:
            console.log("App授权认证 - 设备返回数据处理"); //请求平台 - 获取重新下发授权额度

            this.handleAppAutoReadDeviceReturn(obj);
            break;

          default:
            console.warn("此返回数据格式不正确");
            break;
        }

        console.log('>>>>>>>>>>>>>>>>>>>>>>obj', obj);
      } //开启水表返回 - 提示 
      //关闭水表返回 - 成功，向后台发起关闭水表请求；失败，提示
      //重新下发授权额度返回
      //上报水量返回

    },
    handleOpenReadDeviceReturn: function (obj) {
      let baseStatus;
      let switchWaterMeter;

      if (obj.operaResult == 1) {
        baseStatus = '点击关闭';
        switchWaterMeter = 1;
        wx.hideToast({});
        app.globalData.ShowMsgUtil.showLoadToast('开启成功', 1000); // this.getBalance(0);
        // TODO 将连接成功的设备信息，存入常用设备缓存中

        this.handleDeviceStorage(obj);
      } else {
        baseStatus = '点击开启';
        switchWaterMeter = 0;
        wx.hideToast({});
        app.globalData.ShowMsgUtil.showLoadToast('开启失败', 1000); // 关闭水表

        this.closeWaterMeter();
        wx.hideToast({});
      }

      this.setData({
        baseStatus: baseStatus,
        switchWaterMeter: switchWaterMeter
      });
    },

    /**
     * 保存已连接设备信息
     */
    handleDeviceStorage: function (obj) {
      console.log("开启成功的设备 - ", obj.deviceId); // 判断缓存中是否已存在该设备，去重

      let isExists = false;
      const deviceCach = app.globalData.StorageUtil.get('connectDeviceCach').length == 0 ? [] : app.globalData.StorageUtil.get('connectDeviceCach');

      for (let i = 0; i < deviceCach.length; i++) {
        if (deviceCach[i].deviceId === this.deviceId && deviceCach[i].deviceName === this.showDeviceInfo.deviceName && deviceCach[i].deviceCode === obj.deviceId && deviceCach[i].isIos === this.isIOS) {
          console.log('与缓存中有一样的设备');
          isExists = true;
        }
      } // 如果不存在，则存入缓存


      if (!isExists) {
        let cach = deviceCach;
        let cachObj = {};
        cachObj.deviceId = this.deviceId;
        cachObj.deviceCode = obj.deviceId;
        cachObj.deviceName = this.showDeviceInfo.deviceName;
        cachObj.isIos = this.isIosOrAndrond();
        cach[deviceCach.length] = cachObj; // 去重

        cach = this.arrayUnique(cach);
        console.log("数组去重后 - ", cach); // 去除不是指定格式数据

        cach = this.removeIllegalData(cach);
        console.log("移除违规后 - ", cach);
        app.globalData.StorageUtil.set('connectDeviceCach', cach);
      } // 苹果手机还需要存uuid。先得确保uuid是否是固定的

    },
    // 存储安卓与苹果区分的标识
    isIosOrAndrond: function () {
      let isIos = 0;
      wx.getSystemInfo({
        success: function (res) {
          console.log("获取当前用户的设备类型 - ", res.platform);

          if (res.platform == "devtools") {
            PC;
          } else if (res.platform == "ios") {
            isIos = 1;
          } else if (res.platform == "android") {
            isIos = 0;
          }
        }
      });
      return isIos;
    },
    // 数组去重
    arrayUnique: function (array) {
      console.log("数组去重前 - ", array);
      var r = [];

      for (var i = 0, l = array.length; i < l; i++) {
        for (var j = i + 1; j < l; j++) if (array[i].deviceCode === array[j].deviceCode && array[i].deviceId === array[j].deviceId) j = ++i;

        r.push(array[i]);
      }

      return r;
    },
    removeIllegalData: function (cach) {
      console.log("移除违规前 - ", cach);

      for (let i = 0; i < cach.length; i++) {
        if (cach[i].deviceCode == '' || cach[i].deviceName == '' || cach[i].deviceId == '' || cach[i].deviceCode == undefined || cach[i].deviceName == undefined || cach[i].deviceId == undefined || cach[i].isIos == undefined) {
          cach.splice(i, 1);
        }
      }

      return cach;
    },
    handleCloseReadDeviceReturn: function (obj) {
      let baseStatus;
      let switchWaterMeter;

      if (obj.operaResult == 1) {
        baseStatus = '点击开启';
        switchWaterMeter = 0;
        wx.hideToast({}); // app.ShowMsgUtil.showLoadToast('水表关闭成功', 5000);

        app.globalData.ShowMsgUtil.showLoadToast('操作中', 5000); // 请求后台处理水表关闭逻辑
        // let data = {};
        // this.unfreeze(data);
        // TODO 执行定时器，7秒后，关闭蓝牙模块。留5秒，为了接收水量上报

        this.handleCloseSuccess();
      } else {
        switchWaterMeter = 1;
        wx.hideToast({});
        app.globalData.ShowMsgUtil.showLoadToast('水表关闭失败', 2000);
      }

      this.setData({
        baseStatus: baseStatus,
        switchWaterMeter: switchWaterMeter
      });
    },
    handleCloseSuccess: function () {
      wx.hideToast({});
      app.globalData.ShowMsgUtil.showLoadToast('关水中', 9000);
      setTimeout(() => {
        wx.hideToast({});
        app.globalData.ShowMsgUtil.showLoadToast('关水成功！', 2000);
        console.log("关闭用水后，断开蓝牙连接");
        wx.stopBluetoothDevicesDiscovery();
        wx.closeBluetoothAdapter(); //关闭蓝牙模块，使其进入未初始化状态。

        app.globalData.StorageUtil.remove("connectDeviceInfo"); // 跳转到首页页面

        app.globalData.PublicUtil.switchTabByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl, 2000);
      }, 7000);
    },

    /**
     * 用于分包处理水量上报
     * @param {*} obj 
     */
    handleOneWaterReportReadDeviceReturn: function (obj) {
      if (JSON.stringify(waterReportOneObj) != "{}") {
        if (waterReportOneObj.whichNumber > obj.whichNumber) {
          waterReportHowMuch++;
          waterReportOneObj = obj;
          waterReportCommand = obj.realData + waterReportCommand;
        } else if (waterReportOneObj.whichNumber < obj.whichNumber) {
          waterReportHowMuch++;
          waterReportOneObj = obj;
          waterReportCommand = waterReportCommand + obj.realData;
        }
      } else {
        waterReportHowMuch = 1;
        waterReportOneObj = obj;
        waterReportCommand = obj.realData;
      }

      console.log(">>>>>>>>>>>>>>>>>>>>>>waterReportHowMuch - 00 - ", waterReportHowMuch);
      console.log(">>>>>>>>>>>>>>>>>>>>>>waterReportHowMuch - 00 - ", waterReportHowMuch);
      console.log(">>>>>>>>>>>>>>>>>>>>>>waterReportArr - 01 - ", waterReportArr); // 获取完设备返回数据

      if (obj.howMuch == waterReportHowMuch) {
        waterReportHowMuch = 0;
        console.log(">>>>>>>>>>>>>>>>>>>>>>waterReportArr - 01 - ", waterReportArr);
        console.log(">>>>>>>>>>>>>>>>>>>>>>waterReportCommand - 01 - ", waterReportCommand); // 将未处理完的数据，处理

        for (let i = 0; i < waterReportArr.length; i++) {
          // isHandle为0 - 平台未处理
          if (waterReportArr[i].isHandle == 0) {
            // 请求后台，上报用量数据
            this.handlerWaterReport(waterReportArr[i].waterReportCommand);
          }
        } // 过滤数据


        for (let i = 0; i < waterReportArr.length; i++) {
          // isHandle为0 - 平台未处理
          if (waterReportArr[i].isHandle == 0) {
            if (waterReportArr[i].waterReportCommand == waterReportCommand) {
              console.log("waterReportArr[i].waterReportCommand == waterReportCommand");
              return;
            }
          }
        } // 保存未处理完的数据


        let waterReportArrObj = {};
        waterReportArrObj.isHandle = 0;
        waterReportArrObj.waterReportCommand = waterReportCommand;
        waterReportArr[waterReportArr.length] = waterReportArrObj;
        console.log(">>>>>>>>>>>>>>>>>>>>>>waterReportArr - 02 - ", waterReportArr); // 将未处理完的数据，处理

        for (let i = 0; i < waterReportArr.length; i++) {
          // isHandle为0 - 平台未处理
          if (waterReportArr[i].isHandle == 0) {
            // 请求后台，上报用量数据
            this.handlerWaterReport(waterReportArr[i].waterReportCommand);
          }
        } // this.handlerWaterReport(waterReportCommand); 


        let waterReportObj = AgreementUtil.readWaterReport(AgreementUtil.hexbuf2(waterReportCommand));
        console.log(">>>>>>>>>>>>>>>>>>>>>>waterReportObj - ", waterReportObj);
        waterReportCommand = '';
        waterReportOneObj = {};
      }
    },
    handleWaterReportReadDeviceReturn: function (obj) {
      waterReportCommand = obj.realData;
      console.log(">>>>>>>>>>>>>>>>>>>>>>waterReportArr - 01 - ", waterReportArr);
      console.log(">>>>>>>>>>>>>>>>>>>>>>waterReportArr - 01 - ", waterReportArr);

      for (let i = 0; i < waterReportArr.length; i++) {
        if (waterReportArr[i].waterReportCommand.length < 70) {
          waterReportArr.splice(i, 1);
        }
      }

      console.log(">>>>>>>>>>>>>>>>>>>>>>readData - 00 - ", obj.realData);
      console.log(">>>>>>>>>>>>>>>>>>>>>>waterReportArr - 01 - ", waterReportArr); // 将未处理完的数据，处理

      for (let i = 0; i < waterReportArr.length; i++) {
        // isHandle为0 - 平台未处理
        if (waterReportArr[i].isHandle == 0) {
          // 请求后台，上报用量数据
          console.log('waterReportArr[i].flag - ', waterReportArr[i].flag);
          this.handlerWaterReport(waterReportArr[i].waterReportCommand, waterReportArr[i].flag);
        }
      } // 过滤数据


      for (let i = 0; i < waterReportArr.length; i++) {
        // isHandle为0 - 平台未处理
        if (waterReportArr[i].isHandle == 0) {
          if (waterReportArr[i].waterReportCommand == waterReportCommand) {
            console.log("waterReportArr[i].waterReportCommand == waterReportCommand");
            return;
          }
        }
      } // 保存未处理完的数据


      let waterReportArrObj = {};
      waterReportArrObj.isHandle = 0;
      waterReportArrObj.waterReportCommand = waterReportCommand;
      waterReportArrObj.flag = obj.flag;
      waterReportArr[waterReportArr.length] = waterReportArrObj;
      console.log(">>>>>>>>>>>>>>>>>>>>>>waterReportArr - 02 - ", waterReportArr); // 将未处理完的数据，处理

      for (let i = 0; i < waterReportArr.length; i++) {
        // isHandle为0 - 平台未处理
        if (waterReportArr[i].isHandle == 0) {
          console.log('waterReportArr[i].flag - ', waterReportArr[i].flag); // 请求后台，上报用量数据

          this.handlerWaterReport(waterReportArr[i].waterReportCommand, waterReportArr[i].flag);
        }
      } // this.handlerWaterReport(waterReportCommand); 


      waterReportCommand = '';
      waterReportOneObj = {};
    },
    handleReportWebReturn: function (isSucceed, flag) {
      console.log("水量上报 - 平台处理成功，发送处理结果给设备.", isSucceed, flag);
      let buffer = AgreementUtil.writeWaterReportRetrue(isSucceed, flag);
      this.bluetoothSendCommand(buffer);
    },
    handleAppAutoReadDeviceReturn: function (obj) {
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      var isContent = 1;
      var baseStatus = '';

      if (obj == null) {
        isContent = 2;
        this.setData({
          baseStatus: '无法用水',
          isContent: isContent
        });
        app.globalData.ShowMsgUtil.showErrorModal('水表连接失败', '无法通信');
        return;
      } // 处理水表水表已锁定  


      if (obj.isLock == 1) {
        isContent = 2;
        console.warn("水表已锁定");
        this.setData({
          baseStatus: '水表已锁定',
          isContent: isContent
        });
        app.globalData.ShowMsgUtil.showErrorModal('水表连接失败', '水表已经被锁定');
        return;
      } // 处理水表状态为开的业务


      if (obj.isOpen == 1) {
        // 同一个人在使用
        if (obj.userId == userInfoCach.userId) {
          let switchWaterMeter = 1;
          this.setData({
            baseStatus: '点击关闭',
            switchWaterMeter: switchWaterMeter
          });
        } else if (obj.userId != userInfoCach.userId) {
          // 提示用户，用人再使用，请稍后再试
          isContent = 2;
          baseStatus = '有人在使用', console.warn("水表状态 - 有人在使用，请稍后再试");
          app.globalData.ShowMsgUtil.showErrorModal('请稍后再试', '有人正在用水');
          this.setData({
            baseStatus: '无法用水',
            isContent: isContent
          });
        } else {
          isContent = 2;
          baseStatus = '水表状态未知', console.warn("水表状态 - 未知");
          app.globalData.ShowMsgUtil.showErrorModal('水表连接失败', '获取水表信息有误');
          this.setData({
            baseStatus: '无法用水',
            isContent: isContent
          });
        }
      } // 处理水表状态为关的业务
      else if (obj.isOpen == 0) {
          console.log("水表状态 - 正常使用"); // 用于操作自己宿舍水表

          if (this.dormDeviceId) {
            this.handleOperate();
            return;
          }
        }
    },

    /***********************************蓝牙连接操作处理***********************************/

    /**
     * 四、蓝牙通信
     * 
     * 监听情形：
     * 1、通信过程中，得一直监听，水表发送的通信指令。
     * 2、发送指令给水表后，监听设备返回指令。如果一段时间未监听到，则进行超时处理
     */
    bluetoothCommunication: function () {//读
      //写
    },

    /**
     * 1、读取设备指令
     * 
     * 定时，扫描
     */
    bluetoothRecevieCommand: function () {
      console.log("----------------------------------------读取 - 手机接收设备指令----------------------------------------");

      var _this = this; //监听特征值变化


      wx.onBLECharacteristicValueChange(function (res) {
        console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`);
        console.log(AgreementUtil.buf2hex(res.value));
      }); //读取设备特征值二进制数据

      wx.readBLECharacteristicValue({
        // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
        deviceId: _this.deviceId,
        // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
        serviceId: _this.serviceId,
        // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
        characteristicId: _this.readCharacteristicId,
        success: function (res) {
          console.log('readBLECharacteristicValue:');
          console.log(res);
        }
      });
    },

    /**
     * 2、写入设备指令
     * 
     */
    bluetoothSendCommand: function (buffer) {
      var _this = this;

      wx.writeBLECharacteristicValue({
        // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
        deviceId: _this.deviceId,
        // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
        serviceId: _this.serviceId,
        // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
        characteristicId: _this.writeCharacteristicId,
        // 这里的value是ArrayBuffer类型
        value: buffer,

        success(res) {
          console.log('writeBLECharacteristicValue success', res);
        },

        fail(res) {
          console.log('writeBLECharacteristicValue fail', res);
        }

      });
    },
    inputCommand: function (e) {
      console.log(">>>>>>>e - ", e.detail.value);
      this.setData({
        command: e.detail.value
      });
    },

    /**
     * 五、蓝牙通信超时处理
     */
    handlerBluetoothCommunicationTimeout: function () {//平台 - 解冻授权额度
      //关闭蓝牙，处理
    },

    /**
     * 关闭蓝牙模块 
     */
    onCloseConnect() {
      wx.closeBLEConnection({
        deviceId: this.deviceId,
        success: function (res) {
          console.log("成功断开连接");
          wx.showToast({
            title: '成功断开连接'
          });
        }
      });
    },

    /***********************************蓝牙指令读写处理***********************************/

    /**
     * 写入设备数据
     * @param {*} buffer 
     */
    handlerWrite: function (operationtype, issueMoney) {
      let buffer;

      switch (Number(operationtype)) {
        case 1:
          //1、小程序请求设备 - 开启水表
          buffer = AgreementUtil.writeOpenWaterMeter(100, 3911);
          console.log("开启水表，小程序请求");
          break;

        case 2:
          //2、小程序请求设备 - 关闭水表
          buffer = AgreementUtil.writeCloseWaterMeter();
          console.log("关闭水表，小程序请求");
          break;

        case 3:
          //3、小程序返回设备 - 水表水量上报，操作是否成功
          buffer = AgreementUtil.writeWaterReportRetrue();
          console.log("水表水量上报，小程序返回");
          break;

        case 4:
          //4、小程序返回设备 - 重新下发授权额度
          buffer = AgreementUtil.writeIssuedByLineRetrue(10);
          console.log("重新下发授权额度，小程序返回");
          break;

        default:
          console.log("蓝牙通信指令有误");
          break;
      }

      return buffer;
    },

    /**
     * 读取设备数据 - 作出对应的处理
     * 
     * @param {*} buffer 
     */
    handlerRead: function (buffer) {
      let obj = {}; // 获取接收指令，表示的操作类型

      let operationtype = AgreementUtil.readData(buffer);
      console.log("operationtype - ", operationtype);
      console.log("读取 - buffer - ", buffer);

      switch (operationtype) {
        case "01":
          //1、设备返回小程序 - 开启水表，小程序返回设备指令数据  
          obj = AgreementUtil.readOpenWaterMeter(buffer);
          console.log("读取 - 开启水表，设备返回");
          break;

        case "02":
          //2、设备返回小程序 - 关闭水表，小程序返回设备指令数据
          obj = AgreementUtil.readCloseWaterMeter(buffer);
          console.log("读取 - 关闭水表，设备返回");
          break;

        case "03":
          //3、设备请求小程序 - 水表水量上报
          obj = AgreementUtil.readWaterReport(buffer);
          console.log("读取 - 水表水量上报，设备请求");
          break;

        case "04":
          //4、设备请求小程序 - 新下发授权额度
          obj = AgreementUtil.readIssuedByLine(buffer);
          console.log("读取 - 重新下发授权额度，设备请求");
          break;

        case "05":
          //5、设备返回小程序 - App授权认证
          obj = AgreementUtil.readAuth(buffer);
          console.log("读取 - App授权认证，设备返回");
          break;

        default:
          console.log("蓝牙通信指令有误");
          break;
      }

      return obj;
    },

    /***********************************后台接口请求处理***********************************/

    /**
     * 微信蓝牙操作水表 - 获取下发授权额度
     * - 请求参数
     * deviceId 设备Id
     * isFrist 是否是，开启水表时下发的授权额度。是：true、 否、false
     * - 返回参数
     * issueMoney 下发额度
     */
    issueAuthorizationMoney: function (data, isFristIssue) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.issueAuthorizationMoney,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: data,
        success: function (res) {
          // wx.hideToast({});
          console.log('获取下发授权额度', res.data);

          if (res.data && res.data.code == 200) {
            if (isFristIssue == 1 && res.data.data > 0) {
              // 第一次下发授权额度后，开启水表处理
              _this.handleFristIssueWebReturn(res.data.data);
            } else if (isFristIssue == 0 && res.data.data > 0) {
              // 重新下发授权额度，重新下发处理
              _this.handleSecondIssueWebReturn(res.data.data);
            } // 更新用户余额


            _this.getBalance(0);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('提示', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
      return 0;
    },

    /**
     * 微信蓝牙操作水表 - 关闭水表后业务处理
     * - 请求参数
     * deviceId 设备ID
     * - 返回参数
     * 返回信息
     */
    unfreeze: function (data) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.unfreeze,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: data,
        success: function (res) {
          console.log('关闭水表后业务处理', res.data);

          if (res.data && res.data.code == 200) {} else {
            wx.hideToast({});
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          wx.hideToast({});
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    /**
       * 微信蓝牙操作水表 - 用水上报处理
       * - 请求参数
       * waterReportHexStr
       * - 返回参数
       * 返回信息
       */
    handlerWaterReport: function (waterReportHexStr, flag) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

      if (waterReportHexStr.length < 70) {
        console.log('水量上报格式有误！');
        return;
      }

      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.handlerWaterReport,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {
          waterReportHexStr: waterReportHexStr
        },
        success: function (res) {
          console.log('用水上报处理', res.data);

          if (res.data && res.data.code == 200) {
            for (let i = 0; i < waterReportArr.length; i++) {
              if (waterReportArr[i].waterReportCommand == waterReportHexStr) {
                // 请求后台，上报用量数据
                waterReportArr[i].isHandle = 1;
              }
            } // 


            _this.handleReportWebReturn(1, flag); // 更新用户余额


            _this.getBalance(0);
          } else if (res.data && res.data.code == 201) {
            console.log('请求失败,重复提交');
            return;
          } else {
            wx.hideToast({});

            _this.handleReportWebReturn(0, flag);

            console.log('请求失败,' + res.data.msg); // app.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);

            return;
          }
        },
        fail: function () {
          wx.hideToast({});

          _this.handleReportWebReturn(0, flag);

          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    /**
     * 获取余额
     */
    getBalance: function (isFrist) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.balance,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {
          deductionMode: 1
        },
        success: function (res) {
          console.log('获取用户钱包余额处理返回', res.data);

          if (res.data && res.data.code == 200) {
            wx.hideToast({});
            let balance = app.globalData.PublicUtil.minuteChanageYuanBalance(res.data.rows.purseBalance.balance);

            _this.setData({
              balance: balance
            });

            if (isFrist == 1 && parseFloat(_this.balance) <= parseFloat(0)) {
              _this.msgSelect();
            }
          } else {
            wx.hideToast({});
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          wx.hideToast({});
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    /********************************************首页 - 开启自己宿舍水表******************************************** */

    /**
     * 开始搜素附近蓝牙
     */
    startBluetoothDevicesDiscovery() {
      if (this.checked == false) {
        app.globalData.ShowMsgUtil.showErrorModal('操作失败', '请先打开蓝牙开关');
        return;
      }

      app.globalData.ShowMsgUtil.showLoadToast('正在搜索设备', 2000);
      wx.startBluetoothDevicesDiscovery({
        success: function (res) {
          console.log("开始搜索附近蓝牙设备"); // console.log(res)
        }
      });
    },

    /**
     * 一、初始化蓝牙
     */
    initializeBluetooth: function (deviceId) {
      let _this = this; //关闭蓝牙模块


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

                }
              }); //监听寻找新设备的事件

              wx.onBluetoothDeviceFound(function (devices) {
                let t = 0; // TODO 在这可以判断是否已经搜素到，指定蓝牙。如果搜素到，则停止蓝牙搜素

                console.log("监听寻找新设备的事件 - ", devices.devices[0]); // let realDeviceId = _this.handleDormDeviceId(deviceId);

                let realDeviceId;

                if (_this.isIOS == 1) {
                  realDeviceId = deviceId;
                } else {
                  if (_this.isPublic == 1) {
                    realDeviceId = deviceId;
                  } else {
                    realDeviceId = _this.handleAndroid(deviceId);
                  }
                }

                for (let i = 0; i < devices.devices.length; i++) {
                  if (!devices.devices[i].deviceId || !devices.devices[i].name) {
                    return;
                  } // console.log('new device list has founded')


                  console.log('设备id - ' + devices.devices[i].deviceId);
                  console.log('宿舍的蓝牙设备id - ' + realDeviceId); // console.log('设备name - ' + devices.devices[i].name)
                  // 处理deviceId，判断是否扫描到宿舍热水表

                  if (devices.devices[i].deviceId.indexOf(realDeviceId) != -1 || devices.devices[i].deviceId.indexOf(realDeviceId.toLowerCase) != -1) {
                    _this.stopBluetoothDevicesDiscovery();

                    _this.setData({
                      deviceId: devices.devices[i].deviceId
                    }); // 连接该设备


                    _this.connectDevice(devices.devices[i].deviceId);

                    break;
                  }
                }
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

          _this.setData({
            checked: false
          });
        }
      });
    },
    handleDormDeviceId: function (dormBluetoothId) {
      let realDeviceId = '';

      var _this = this;

      wx.getSystemInfo({
        success: function (res) {
          if (res.platform == "devtools") {
            PC;
          } else if (res.platform == "ios") {
            realDeviceId = _this.handleIos(dormBluetoothId);
          } else if (res.platform == "android") {
            realDeviceId = _this.handleAndroid(dormBluetoothId);
          }
        }
      });
      return realDeviceId;
    },
    handleAndroid: function (dormBluetoothId) {
      let realStr = (parseInt(dormBluetoothId, 16) + 2).toString(16).toUpperCase();
      return this.handleRealValue(realStr);
    },
    handleIos: function (dormBluetoothId) {// 苹果通过蓝牙广播获取mac地址
      // wx.onBluetoothDeviceFound(function(res) {
      // var devices = res.devices;
      // console.log('new device list has founded')
      // console.dir(devices)
      // console.log(ab2hex(devices[0].advertisData))
      // var buff = devices.advertisData.slice(2, 8);
      // var arrayBuff = Array.prototype.map.call(new Uint8Array(buff), x => ('00' + 
      // x.toString(16)).slice(-2)).join(':');
      // var arrayMac = arrayBuff.toUpperCase();
      // console.dir(arrayMac)
      // })
    },
    handleRealValue: function (str) {
      let reg = new RegExp("[A-Za-z0-9]{1,2}", "g");
      let ma = str.match(reg);
      return ma.join(":"); //最后面不要"^_^" 就去掉( + "^_^")
    },
    connectDevice: function (deviceId) {
      var _this = this;

      app.globalData.ShowMsgUtil.showLoadAndMsgToast("连接水表中...");
      wx.createBLEConnection({
        deviceId: deviceId,
        timeout: 30000,
        success: res => {
          console.log('>>>>>>>>>>>toConnect - res>', res);

          if (res.errCode == 0) {
            // TODO 水表身份认证
            // 设置Mtu 
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
            app.globalData.StorageUtil.set("connectDeviceInfo", deviceId);

            _this.setData({
              isGetBluetoothInfo: 1
            });

            _this.getConnectDeviceInfo(deviceId);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('提示', "不能正常对水表进行连接");
          }
        },
        fail: res => {
          wx.hideLoading();

          if (res.errCode == 10012) {
            app.globalData.ShowMsgUtil.showErrorModal('提示', "水表连接超时");
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('提示', "水表连接失败");
          }

          _this.setData({
            checked: false
          });
        },
        complete: () => {
          wx.hideLoading();
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

    /********************************************余额不足******************************************** */
    msgSelect: function () {
      let obj = {};
      obj.btnList = ['取消', '去充值'];
      obj.msg = '钱包余额不足';
      obj.showModel = true;
      this.setData({
        msgObj: obj
      });
    },
    //点击确认
    bindConfirm: function () {
      let _this = this;

      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.walletIndexUrl, 500);
    },
    //点击取消
    bindCancel: function () {
      let _this = this;

      _this.msgObj.showModel = false;

      _this.setData({
        msgObj: _this.msgObj
      });
    }
  }
};
</script>
<style>
@import "./commonWatermeter.css";
</style>