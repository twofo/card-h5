/**
 * 蓝牙初始化
 * 
 */
function initBluetooth() {
  console.log('------------------------蓝牙初始化------------------------');
  let obj = {}; // 手机蓝牙是否已经开启

  wx.openBluetoothAdapter({
    success: res => {},
    fail: res => {
      obj.msg = "请检查手机蓝牙是否打开";
    }
  }); // 判断是否开启位置权限
}
/**
 * 检查是否打开蓝牙
 */


function checkIsOpen() {
  wx.openBluetoothAdapter({
    success: res => {
      console.log("手机蓝牙已打开");
    },
    fail: res => {
      console.log("手机蓝牙未打开");
    }
  });
}
/**
 * 检查蓝牙是否可用
 */


function checkIsAvailable() {
  wx.getBluetoothAdapterState({
    success: function (res) {
      console.log("蓝牙适配器可用");
    },
    fail: function (res) {
      console.log("蓝牙适配器不可用");
    }
  });
}
/**
 * 开始搜素附近蓝牙
 * 
 */


function searchbluetooth(services) {
  var that = this;
  console.log("开始搜索附近蓝牙设备", services);
  wx.startBluetoothDevicesDiscovery({
    services: services,
    success: function (res) {
      console.log("开始搜索附近蓝牙设备");
      console.log(res);
    },
    fail: function (res) {
      console.log("开始搜索", res);
    }
  });
}
/**
 * 停止蓝牙扫描
 * 
 */


// wx.stopBluetoothDevicesDiscovery({
//   success: function (res) {
//     console.log("停止蓝牙搜索");
//     console.log(res);
//   }
// });
/**
 * 获取所有蓝牙设备
 * 
 */

function getAllDevices() {
  wx.getBluetoothDevices({
    success: function (res) {
      console.log("显示所有蓝牙设备");
      console.log(res);
    }
  });
}
/**
 * 获取蓝牙所有服务
 * 
 */


function getAllserviceByDevice(e) {
  var that = this;
  wx.getBLEDeviceServices({
    // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
    deviceId: this.data.connectedDeviceId,
    success: function (res) {
      console.log("获取蓝牙所有服务");
      console.log('device services:', res.services);
    }
  });
}
/**
 * 获取正在应用的service
 * 
 * 含有0000ABF0的service
 */


function getAvailableService(services) {
  console.log("services", services);
  let resultService = '';

  for (let i = 0; i < services.length; i++) {
    if (services[i].uuid.search("0000abf0") != -1 || services[i].uuid.search("0000ABF0") != -1) {
      resultService = services[i];
    }
  }

  console.log("resultService", resultService);
  return resultService;
}
/**
 * 获取正在应用的特征值
 * 
 * 含0000ABF1 - 手机发送设备，写入
 * 含0000ABF2 - 手机接收设备，读取
 */


function getAvailableReadCharacters(characteristics) {
  let resultCharacteristic = '';

  for (let i = 0; i < characteristics.length; i++) {
    if (characteristics[i].uuid.search("0000abf2") != -1 || characteristics[i].uuid.search("0000ABF2") != -1) {
      resultCharacteristic = characteristics[i];
    }
  }

  return resultCharacteristic;
}

function getAvailableWriteCharacters(characteristics) {
  let resultCharacteristic = '';

  for (let i = 0; i < characteristics.length; i++) {
    if (characteristics[i].uuid.search("0000abf1") != -1 || characteristics[i].uuid.search("0000ABF1") != -1) {
      resultCharacteristic = characteristics[i];
    }
  }

  return resultCharacteristic;
}

module.exports = {
  getAvailableService: getAvailableService,
  getAvailableReadCharacters: getAvailableReadCharacters,
  getAvailableWriteCharacters: getAvailableWriteCharacters,
  searchbluetooth: searchbluetooth
};