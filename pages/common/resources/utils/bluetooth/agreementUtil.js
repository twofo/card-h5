// var app = getApp().globalData;
/**
 *  小程序读取数据 - 设备发送给小程序的数据的指令前缀
 */

function readData(buffer) {
  //console.log("buffer - ", buffer);
  let dateView = new DataView(buffer);
  let hexArr = buf2hex(buffer); //console.log("hexArr - ", hexArr);

  let hex1 = hexArr.substring(0, 2); // console.log("hex1 - ", hex1);

  let hex2 = hexArr.substring(2, 4); // console.log("hex2 - ", hex2);
  // 水量上报一二个字节是#

  if (hex1 === "23" && hex2 === "23") {
    return "03";
  } // 指令0x01表示设备是水表


  if (hex1 === "08") {
    switch (hex2) {
      case "01":
      case "02":
      case "03":
      case "04":
      case "05":
        return hex2;

      default:
        console.log("接收操作指令有误");
        break;
    }
  } else {
    console.warn("接收蓝牙指令有误");
  }
}
/**
 * 小程序读取 - 开启水表，设备返回小程序指令数据
 */


function readOpenWaterMeter(buffer) {
  let dataView = new DataView(buffer);
  let openType = this.readData(buffer);

  if (openType === "01") {
    let obj = openAndCloseWaterMeter(1, dataView);
    let bcc = dataView.getUint8(8);
    console.log("buffer - 开启水表，返回设备指令", obj);
    return obj;
  }

  console.warn("读取指令失败，指令有误");
}
/**
 * 小程序读取 - 关闭水表，返回设备指令数据
 */


function readCloseWaterMeter(buffer) {
  let dataView = new DataView(buffer);
  let openType = this.readData(buffer);

  if (openType === "02") {
    let obj = openAndCloseWaterMeter(2, dataView);
    let bcc = dataView.getUint8(8);
    console.log("buffer - 关闭水表，返回设备指令", obj);
    return obj;
  }

  console.warn("读取指令失败，指令有误");
}

function openAndCloseWaterMeter(type, dataView) {
  let obj = {};
  obj.type = type;
  let msg = type == 1 ? "开启水表，返回设备指令数据" : "关闭水表，返回设备指令数据"; // 获取operaResult的16进制数据

  let operaResultBuffer = new ArrayBuffer(1);
  let operaResultdataView = new DataView(operaResultBuffer);
  operaResultdataView.setUint8(0, dataView.getUint8(2)); // console.log("buffer - " + msg + " - operaResult", deviceIdBuffer);

  obj.operaResult = buf2hex(operaResultBuffer); // 获取deviceId的16进制数据

  let deviceIdBuffer = new ArrayBuffer(5);
  let deviceIddataView = new DataView(deviceIdBuffer);
  deviceIddataView.setUint32(0, dataView.getUint32(3));
  deviceIddataView.setUint8(4, dataView.getUint8(7)); // console.log("buffer - " + msg + " - deviceId", deviceIdBuffer);

  obj.deviceId = buf2hex(deviceIdBuffer);
  return obj;
}
/**
 * 小程序读取某组数据中的某一条 - 水量上报，设备指请求小程序指令数据
 * 
 * TODO - 用于分包处理水量上报
 */


function readOneWaterReport(buffer) {
  let dataView = new DataView(buffer);
  let hexArr = buf2hex(buffer); // console.log("hexArr - ", hexArr);

  let hex1 = hexArr.substring(0, 2); // console.log("hex1 - ", hex1);

  let hex2 = hexArr.substring(2, 4); // console.log("hex2 - ", hex2);

  let howMuch = hexArr.substring(4, 6); // console.log("howMuch - ", howMuch);

  let whichNumber = hexArr.substring(6, 8); // console.log("whichNumber - ", whichNumber);

  let realData = hexArr.substring(8, 20); // console.log("realData - ", realData);

  if (hex1 === "23" && hex2 === "23") {
    let obj = handleOneWaterReport(dataView);
    console.log("buffer - 水量上报，设备指请求小程序指令数据", obj);
    return obj;
  }

  console.warn("读取指令失败，指令有误");
}
/**
 * TODO - 用于分包处理水量上报
 * @param {*} dataView 
 */


function handleOneWaterReport(dataView) {
  let obj = {};
  obj.type = 3;
  obj.howMuch = dataView.getUint8(2);
  obj.whichNumber = dataView.getUint8(3); // 获取水量上报真实数据

  let realDataBuffer;

  if (obj.howMuch != obj.whichNumber) {
    realDataBuffer = new ArrayBuffer(16);
    let realDatadataView = new DataView(realDataBuffer);
    realDatadataView.setUint32(0, dataView.getUint32(4));
    realDatadataView.setUint32(4, dataView.getUint32(8));
    realDatadataView.setUint32(8, dataView.getUint32(12));
    realDatadataView.setUint32(12, dataView.getUint32(16));
  } else {
    realDataBuffer = new ArrayBuffer(4);
    let realDatadataView = new DataView(realDataBuffer);
    realDatadataView.setUint32(0, dataView.getUint32(4));
  }

  obj.realData = buf2hex(realDataBuffer);
  return obj;
}
/**
 * 小程序读取 - 水量上报，设备指请求小程序指令数据
 */


function readWaterReport(buffer) {
  let dataView = new DataView(buffer);
  let openType = this.readData(buffer);

  if (openType === "03") {
    let obj = handleWaterReport(buffer);
    console.log("buffer - 水量上报，设备指请求小程序指令数据", obj);
    return obj;
  }

  console.warn("读取指令失败，指令有误");
}

function handleWaterReport(buffer) {
  let obj = {};
  obj.type = 3;
  obj.realData = buf2hex(buffer);
  console.log('realData - 00', obj.realData);
  console.log('realData - 01', obj.realData.substring(1, 5));
  obj.flag = obj.realData.substring(70, 74); // realDataBuffer = new ArrayBuffer(16);
  // let realDatadataView = new DataView(realDataBuffer);
  // realDatadataView.setUint32(0, dataView.getUint32(2));
  // realDatadataView.setUint32(4, dataView.getUint32(6));
  // realDatadataView.setUint16(8, dataView.getUint16(10));
  // realDatadataView.setUint8(10, dataView.getUint8(12));
  // realDatadataView.setUint32(11, dataView.getUint32(13));
  // realDatadataView.setUint16(15, dataView.getUint16(17));
  // realDatadataView.setUint8(17, dataView.getUint8(19));
  // realDatadataView.setUint8(18, dataView.getUint8(20));
  // realDatadataView.setUint32(19, dataView.getUint32(21));
  // realDatadataView.setUint8(23, dataView.getUint8(25));
  // realDatadataView.setFloat32(24, dataView.getUint8(25));

  return obj;
}
/**
 * 小程序读取 - 重新下发授权额度，设备指请求小程序指令数据
 */


function readIssuedByLine(buffer) {
  let obj = {};
  let openType = this.readData(buffer);

  if (openType === "04") {
    obj.type = 4;
    console.log("buffer -  重新下发授权额度，设备指请求小程序指令数据");
    return obj;
  }

  console.warn("读取指令失败，指令有误");
  return 0;
}
/**
 * 小程序读取 - App授权认证，设备指返回小程序指令数据
 */


function readAuth(buffer) {
  let dataView = new DataView(buffer);
  let openType = this.readData(buffer);

  if (openType === "05") {
    let obj = handleAuth(dataView);
    console.log("buffer -  App授权认证，设备指返回小程序指令数据");
    return obj;
  }

  console.warn("读取指令失败，指令有误");
  return 0;
}

function handleAuth(dataView) {
  let obj = {};
  obj.type = 5;
  let msg = "123"; // 获取userId的16进制数据

  let userIdBuffer = new ArrayBuffer(4);
  let userIddataView = new DataView(userIdBuffer);
  userIddataView.setUint32(0, dataView.getUint32(2));
  console.log("buffer - " + msg + " - userId", userIdBuffer);
  obj.userId = parseInt(buf2hex(userIdBuffer), 16); // 获取deviceStatus的16进制数据

  let deviceStatusBuffer = new ArrayBuffer(1);
  let deviceStatusdataView = new DataView(deviceStatusBuffer);
  deviceStatusdataView.setUint8(0, dataView.getUint8(6));
  console.log("buffer - " + msg + " - deviceStatus", deviceStatusBuffer);
  obj.deviceStatus = buf2hex(deviceStatusBuffer);
  let band2 = hex_to_bin(buf2hex(deviceStatusBuffer));
  console.log("buffer - " + msg + " - band2", band2);
  obj.isLock = band2.charAt(3);
  obj.isOpen = band2.charAt(2);
  console.log("buffer - " + msg + " - isLock", obj.isLock);
  console.log("buffer - " + msg + " - isOpen", obj.isOpen);
  return obj;
}
/**
 * 小程序写入 - App授权认证
 */


function writeAuth() {
  let buffer = new ArrayBuffer(3);
  let dataView = new DataView(buffer);
  dataView.setUint8(0, 0x08);
  dataView.setUint8(1, 0x05);
  dataView.setUint8(2, 0x00);
  console.log("buffer - 与水表请求认证指令", buffer);
  return buffer;
}
/**
 * 小程序写入 - 开启水表指令数据
 */


function writeOpenWaterMeter(amount, userId) {
  console.log(">>>>>>>>>amount - ", amount);
  let buffer = new ArrayBuffer(12);
  let dataView = new DataView(buffer);
  dataView.setUint8(0, 0x08);
  dataView.setUint8(1, 0x01);
  dataView.setFloat32(2, amount, true);
  dataView.setUint8(6, 0x01);
  dataView.setInt32(7, userId);
  dataView.setUint8(11, 0x00);
  console.log("buffer - 开启水表指令", buffer); // console.log("buffer - 开启水表指令", dataView.getFloat32(2).toFixed(1));

  return buffer;
}
/**
 * 小程序写入 - 关闭水表指令数据
 */


function writeCloseWaterMeter() {
  let buffer = new ArrayBuffer(3);
  let dataView = new DataView(buffer);
  dataView.setUint8(0, 0x08);
  dataView.setUint8(1, 0x02);
  dataView.setUint8(2, 0x00);
  console.log("buffer - 关闭水表指令", buffer);
  return buffer;
}
/**
 * 小程序写入 - 用水上报返回
 */


function writeWaterReportRetrue(isSucceed, flag) {
  console.log('isSucceed - ', isSucceed, parseInt(flag, 16));
  let buffer = new ArrayBuffer(6);
  let dataView = new DataView(buffer);
  dataView.setUint8(0, 0x08);
  dataView.setUint8(1, 0x03);

  if (isSucceed == 1) {
    dataView.setUint8(2, 0x01);
  } else {
    dataView.setUint8(2, 0x00);
  }

  dataView.setUint16(3, parseInt(flag, 16));
  dataView.setUint8(5, 0x00);
  console.log("buffer - 用水上报返回指令", buf2hex(buffer));
  return buffer;
}
/**
 * 小程序写入 - 重新下发授权额度返回
 */


function writeIssuedByLineRetrue(amount) {
  let buffer = new ArrayBuffer(8);
  let dataView = new DataView(buffer);
  dataView.setUint8(0, 0x08);
  dataView.setUint8(1, 0x04);
  dataView.setUint8(2, 0x01);
  dataView.setFloat32(3, amount, true);
  dataView.setUint8(7, 0x00);
  console.log("buffer - 重新下发授权额度返回", buffer);
  return buffer;
}
/**
 * 将buffer值，转化为16进制
 * 
 * @param {*} buffer 
 */


function buf2hex(buffer) {
  var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
    return ('00' + bit.toString(16)).slice(-2);
  });
  return hexArr.join('');
}
/**
 * 将16进制字符串，转化为buffer值
 * @param {*} hex 
 */


function hexbuf2(hex) {
  var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
    return parseInt(h, 16);
  }));
  return typedArray.buffer;
}
/**
 * 将16进制转化为2进制字符串
 * @param {*} str 
 */


function hex_to_bin(str) {
  let hex_array = [{
    key: 0,
    val: "0000"
  }, {
    key: 1,
    val: "0001"
  }, {
    key: 2,
    val: "0010"
  }, {
    key: 3,
    val: "0011"
  }, {
    key: 4,
    val: "0100"
  }, {
    key: 5,
    val: "0101"
  }, {
    key: 6,
    val: "0110"
  }, {
    key: 7,
    val: "0111"
  }, {
    key: 8,
    val: "1000"
  }, {
    key: 9,
    val: "1001"
  }, {
    key: 'a',
    val: "1010"
  }, {
    key: 'b',
    val: "1011"
  }, {
    key: 'c',
    val: "1100"
  }, {
    key: 'd',
    val: "1101"
  }, {
    key: 'e',
    val: "1110"
  }, {
    key: 'f',
    val: "1111"
  }];
  let value = "";

  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < hex_array.length; j++) {
      if (str.charAt(i).toLowerCase() == hex_array[j].key) {
        value = value.concat(hex_array[j].val);
        break;
      }
    }
  }

  console.log(value);
  return value;
}

module.exports = {
  readData: readData,
  readOpenWaterMeter: readOpenWaterMeter,
  readCloseWaterMeter: readCloseWaterMeter,
  readOneWaterReport: readOneWaterReport,
  readWaterReport: readWaterReport,
  readIssuedByLine: readIssuedByLine,
  writeOpenWaterMeter: writeOpenWaterMeter,
  writeCloseWaterMeter: writeCloseWaterMeter,
  writeWaterReportRetrue: writeWaterReportRetrue,
  writeIssuedByLineRetrue: writeIssuedByLineRetrue,
  writeAuth: writeAuth,
  readAuth: readAuth,
  buf2hex: buf2hex,
  hexbuf2: hexbuf2
};