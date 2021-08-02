<template>
<button @tap="bluetooth"> 蓝牙 </button>
</template>

<script>
var app = getApp();
var ArrayBufferDemo = app.globalData.arrayBufferDemo;
var BluetoothUtil = app.globalData.bluetoothUtil;
var AgreementUtil = app.globalData.agreementUtil;

export default {
  data() {
    return {
      connectedDeviceId: "",
      services: "",
      serviceId: "",
      characteristicId: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  methods: {
    /**
     * 一、初始化蓝牙
     */
    initializeBluetooth: function () {
      //关闭蓝牙模块
      wx.closeBluetoothAdapter({
        complete: function (res) {
          console.log("关闭蓝牙模块 - ", res); //判断蓝牙是否打开

          wx.openBluetoothAdapter({
            success: function (res) {
              console.log("初始化蓝牙设备 - ", res); //判断蓝牙是否可用

              wx.onBluetoothAdapterStateChange(function (res) {
                console.log("蓝牙适配器状态变化 - ", res);
                let availableStr = res.available ? "蓝牙适配器可用" : "蓝牙适配器不可用";
                let discoveringStr = res.discovering ? "正在搜索" : "搜索可用";
                console.log("手机蓝牙是否可用：", availableStr);
                console.log("是否正在搜素", discoveringStr);

                if (!res.available) {
                  app.globalData.ShowMsgUtil.showErrorModal('蓝牙连接失败', "手机蓝牙不可用：");
                }
              }); //监听寻找新设备的事件

              wx.onBluetoothDeviceFound(function (devices) {
                // TODO 在这可以判断是否已经搜素到，指定蓝牙。如果搜素到，则停止蓝牙搜素
                console.log("监听寻找新设备的事件 - ", devices);

                for (let i = 0; i < devices.devices.length; i++) {
                  console.log('new device list has founded');
                  console.log('设备id - ' + devices.devices[i].deviceId);
                  console.log('设备name - ' + devices.devices[i].name);
                }
              });
            },
            fail: function (res) {
              app.globalData.ShowMsgUtil.showErrorModal('蓝牙连接失败', "请检查手机蓝牙是否打开");
              console.log("初始化蓝牙设备 - ", res);
              console.log("请检查手机蓝牙是否打开");
            }
          });
        },
        fail: function (res) {
          app.globalData.ShowMsgUtil.showErrorModal('蓝牙连接失败', "请检查手机蓝牙是否打开");
          console.log("关闭蓝牙模块 - ", res);
          console.log("请检查手机蓝牙是否打开");
        }
      });
    },

    /**
     * 二、蓝牙连接
     */
    bluetooth: function () {//开始搜素附近蓝牙
      //获取搜素到的所有蓝牙设备
      //连接蓝牙设备
      //获取连接设备信息。启用/停用 低功耗蓝牙设备特征值变化时的notify功能，订阅特征值
    },

    /**
     * 1、开始搜素附近蓝牙
     */
    searchbluetooth: function () {
      var that = this;
      wx.startBluetoothDevicesDiscovery({
        success: function (res) {
          console.log("开始搜索附近蓝牙设备");
          console.log(res);
        }
      });
    },

    /**
     * 2、获取搜素到的所有蓝牙设备
     */
    getbluetoothDevice: function () {
      wx.getBluetoothDevices({
        success: function (res) {
          console.log("获取所有蓝牙设备");
          console.log(res);
        }
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
    toConnect: function (deviceId) {
      var _this = this;

      app.globalData.ShowMsgUtil.showLoadAndMsgToast("连接水表中...");
      wx.createBLEConnection({
        deviceId: deviceId,
        timeout: 30000,
        success: res => {
          console.log(res);

          if (res.errCode == 0) {
            console.log('连接水表: success');

            _this.setData({
              connectedDeviceId: e.currentTarget.id
            });

            _this.stopsearch();
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('提示', "不能正常对水表进行连接");
          }
        },
        fail: res => {
          wx.hideLoading();

          if (res.errCode == 10012) {
            app.globalData.ShowMsgUtil.showErrorModal('提示', "水表连接超时");
          }

          console.warn("连接水表: fail", res);
        },
        complete: () => {
          wx.hideLoading();
        }
      });
    },

    /**
     * 5、获取连接设备所有服务
     */
    getAllservice: function (e) {
      var that = this;
      wx.getBLEDeviceServices({
        // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
        deviceId: this.connectedDeviceId,
        success: function (res) {
          console.log("获取连接设备的所有服务");
          console.log('device services:', res.services);
          that.setData({
            services: res.services
          });
        }
      });
    },

    /**
     * 6、获取连接设备信息
     */
    getConnectDeviceInfo: function () {
      console.log("1、开始获取设备信息");
      wx.getBLEDeviceServices({
        deviceId: that.deviceId,

        success(getServicesRes) {
          console.log("getServicesRes", getServicesRes);
          let service = getServicesRes.services[1];
          let serviceId = service.uuid;
          console.log("2、获取连接设备特征值");
          wx.getBLEDeviceCharacteristics({
            deviceId: that.deviceId,
            serviceId: serviceId,

            success(getCharactersRes) {
              console.log("getCharactersRes", getCharactersRes);
              let characteristic = getCharactersRes.characteristics[1];
              let characteristicId = characteristic.uuid;
              that.setData({
                serviceId: serviceId,
                characteristicId: characteristicId
              });
              console.log('成功获取uuId', that.serviceId, that.characteristicId);
              console.log("3、启用/停用 低功耗蓝牙设备特征值变化时的notify功能，订阅特征值");
              wx.notifyBLECharacteristicValueChange({
                state: true,
                deviceId: that.deviceId,
                serviceId: serviceId,
                characteristicId: getCharactersRes.characteristics[0].uuid,

                success() {
                  console.log('开始监听特征值');
                  wx.onBLECharacteristicValueChange(function (onNotityChangeRes) {
                    console.log('监听到特征值更新', onNotityChangeRes);
                    let characteristicValue = that.ab2hex(onNotityChangeRes.value);
                    console.log('更新后的特征值(16进制格式)', characteristicValue);
                  });
                },

                fail: res => {
                  console.warn("监听特征值失败");
                }
              });
            },

            fail: res => {
              console.warn("获取特征值信息失败", res);
            },
            complete: res => {
              console.log('获取服务信息完成', res);
              wx.hideLoading();
            }
          });
        },

        fail: res => {
          console.warn("获取服务信息失败", res);
        },
        complete: () => {
          wx.hideLoading();
        }
      });
    },

    /**
     * 三、蓝牙通信
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
      var _this = this; //监听特征值变化


      wx.onBLECharacteristicValueChange(function (res) {
        console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`);
        console.log(AgreementUtil.buf2hex(res.value));
      }); //读取设备特征值二进制数据

      wx.readBLECharacteristicValue({
        // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
        deviceId: _this.connectedDeviceId,
        // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
        serviceId: _this.serviceId,
        // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
        characteristicId: _this.characteristicId,
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
    bluetoothSendCommand: function () {
      var _this = this; // 向蓝牙设备发送一个0x00的16进制数据


      let buffer = this.handlerWrite(3);
      wx.writeBLECharacteristicValue({
        // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
        deviceId: _this.connectedDeviceId,
        // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
        serviceId: _this.serviceId,
        // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
        characteristicId: _this.characteristicId,
        // 这里的value是ArrayBuffer类型
        value: buffer,

        success(res) {
          console.log('writeBLECharacteristicValue success', res.errMsg);
        }

      });
    },

    /**
     * 四、蓝牙通信超时处理
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

      switch (operationtype) {
        case 1:
          //1、小程序请求设备 - 开启水表
          buffer = AgreementUtil.writeOpenWaterMeter(issueMoney, userId, frozenRecordId);
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
          buffer = AgreementUtil.writeIssuedByLineRetrue(issueMoney);
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

      switch (operationtype) {
        case "01":
          //1、设备返回小程序 - 开启水表，小程序返回设备指令数据  
          obj = AgreementUtil.readOpenWaterMeter(buffer);
          console.log("读取 - 开启水表，设备返回");
          break;

        case "02":
          //1、设备返回小程序 - 关闭水表，小程序返回设备指令数据
          obj = AgreementUtil.readCloseWaterMeter(buffer);
          console.log("读取 - 关闭水表，设备返回");
          break;

        case "03":
          //1、设备请求小程序 - 水表水量上报
          obj = AgreementUtil.readWaterReport(buffer);
          console.log("读取 - 水表水量上报，设备请求");
          break;

        case "04":
          //1、设备请求小程序 - 新下发授权额度
          obj = AgreementUtil.readIssuedByLine(buffer);
          console.log("读取 - 重新下发授权额度，设备请求");
          break;

        default:
          console.log("蓝牙通信指令有误");
          break;
      }

      return obj;
    },

    /**
     * 操作水表 - 所有操作的业务逻辑
     */
    handlerOperation: function (buffer) {
      //let buffer = new ArrayBuffer(2);
      let dataV = new DataView(buffer);
      dataV.setInt8(0, 0x02);
      dataV.setInt8(1, 0x02); // 获取接收指令，表示的操作类型

      let operationtype = AgreementUtil.readData(buffer);
      console.log("operationtype - ", operationtype);

      switch (operationtype) {
        case "01":
          //1、请求平台 - 获取下发授权额度
          //2、小程序请求设备 - 开启水表
          AgreementUtil.writeOpenWaterMeter(10.2); //3、设备返回小程序 - 开启水表，小程序返回设备指令数据  

          console.log("开启水表，设备返回");
          break;

        case "02":
          //1、小程序请求设备 - 关闭水表
          AgreementUtil.writeCloseWaterMeter(); //2、设备返回小程序 - 关闭水表，小程序返回设备指令数据

          console.log("关闭水表，设备返回");
          break;

        case "03":
          //1、设备请求小程序 - 水表水量上报
          //2、请求平台 - 进行用水上报扣费逻辑
          //3、小程序返回设备 - 水表水量上报，操作是否成功
          AgreementUtil.writeWaterReportRetrue();
          console.log("水表水量上报，设备请求");
          break;

        case "04":
          //1、设备请求小程序
          //2、小程序返回设备 - 重新下发授权额度
          AgreementUtil.writeIssuedByLineRetrue(10.0);
          console.log("重新下发授权额度，设备请求");
          break;

        default:
          console.log("蓝牙通信指令有误");
          break;
      }
    }
  }
};
</script>
