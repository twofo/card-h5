var CIM_URI = "ws://127.0.0.1:23456"; // 修改为服务器的真实IP

var CMD_HEARTBEAT_RESPONSE = new Uint8Array([67, 82]);
var SDK_VERSION = "1.0.0";
var SDK_CHANNEL = "browser";
var APP_PACKAGE = "com.farsunset.cim";
const ACTION_999 = "999"; //特殊的消息类型，代表被服务端强制下线

var DATA_HEADER_LENGTH = 3;
var C_H_RS = 0;
var S_H_RQ = 1;
var MESSAGE = 2;
var SENTBODY = 3;
var REPLYBODY = 4;
var socket;
var manualStop = false;
var CIMWebBridge = new Object(); // 进行scoket连接

CIMWebBridge.connection = function () {
  manualStop = false;
  window.localStorage.account = '';
  socket = new WebSocket(CIM_URI);
  socket.binaryType = 'arraybuffer';
  socket.onopen = CIMWebBridge.innerOnConnectionSuccessed;
  socket.onmessage = CIMWebBridge.innerOnMessageReceived;
  socket.onclose = CIMWebBridge.innerOnConnectionClosed;
}; // scoket连接成功


CIMWebBridge.innerOnConnectionSuccessed = function () {
  // var account = window.localStorage.account;
  var account = "111";

  if (account == '' || account == undefined) {
    onConnectionSuccessed();
  } else {
    CIMWebBridge.bindAccount(account);
  }
}; // scoket发送数据之sentBody


CIMWebBridge.bindAccount = function (account) {
  var body = new proto.com.farsunset.cim.sdk.web.model.SentBody();
  body.setKey("client_bind");
  body.getDataMap().set("account", "1412140106");
  body.getDataMap().set("channel", SDK_CHANNEL);
  body.getDataMap().set("version", SDK_VERSION);
  body.getDataMap().set("osVersion", browser.version);
  body.getDataMap().set("packageName", APP_PACKAGE);
  body.getDataMap().set("deviceId", "M5S");
  body.getDataMap().set("device", "wx_applet");
  CIMWebBridge.sendRequest(body);
}; // scoket发送数据。包含header + sentBody


CIMWebBridge.sendRequest = function (body) {
  var data = body.serializeBinary();
  var header = buildHeader(SENTBODY, data.length);
  var protubuf = new Uint8Array(data.length + header.length);
  protubuf.set(header, 0);
  protubuf.set(data, header.length);
  socket.send(protubuf);
}; // scoket发送数据之header


function buildHeader(type, length) {
  var header = new Uint8Array(DATA_HEADER_LENGTH);
  header[0] = type;
  header[1] = length & 0xff;
  header[2] = length >> 8 & 0xff;
  return header;
} // 发送心跳包。保持scoket连接


CIMWebBridge.sendHeartbeatResponse = function () {
  var data = CMD_HEARTBEAT_RESPONSE;
  var header = buildHeader(C_H_RS, data.length);
  var protubuf = new Uint8Array(data.length + header.length);
  protubuf.set(header, 0);
  protubuf.set(data, header.length);
  socket.send(protubuf);
};

CIMWebBridge.innerOnMessageReceived = function (e) {
  var data = new Uint8Array(e.data);
  var type = data[0];
  /**
  * 收到服务端发来的心跳请求，立即回复响应，否则服务端会在10秒后断开连接
  */

  if (type == S_H_RQ) {
    CIMWebBridge.sendHeartbeatResponse();
    return;
  }

  if (type == MESSAGE) {
    var length = getContentLength(data[1], data[2]);
    var data = proto.com.farsunset.cim.sdk.web.model.Message.deserializeBinary(data.subarray(DATA_HEADER_LENGTH, DATA_HEADER_LENGTH + length));
    onInterceptMessageReceived(data.toObject(false));
    return;
  }

  if (type == REPLYBODY) {
    var length = getContentLength(data[1], data[2]);
    var data = proto.com.farsunset.cim.sdk.web.model.ReplyBody.deserializeBinary(data.subarray(DATA_HEADER_LENGTH, DATA_HEADER_LENGTH + length));
    /**
     * 将proto对象转换成json对象，去除无用信息
     */

    var reply = {};
    reply.code = data.getCode();
    reply.key = data.getKey();
    reply.message = data.getMessage();
    reply.timestamp = data.getTimestamp();
    reply.data = {};
    /**
     * 注意，遍历map这里的参数 value在前key在后
     */

    data.getDataMap().forEach(function (v, k) {
      reply.data[k] = v;
    });
    onReplyReceived(reply);
  }
};

function getContentLength(lv, hv) {
  var l = lv & 0xff;
  var h = hv & 0xff;
  return l | (h <<= 8);
}

CIMWebBridge.innerOnConnectionClosed = function (e) {
  if (!manualStop) {
    var time = Math.floor(Math.random() * (30 - 15 + 1) + 15);
    setTimeout(function () {
      CIMWebBridge.connection();
    }, time);
  }
};

CIMWebBridge.stop = function () {
  manualStop = true;
  socket.close();
};

CIMWebBridge.resume = function () {
  manualStop = false;
  CIMWebBridge.connection();
};

function onInterceptMessageReceived(message) {
  //被强制下线之后，不再继续连接服务端
  if (message.action == ACTION_999) {
    manualStop = true;
  } //收到消息后，将消息发送给页面


  if (onMessageReceived instanceof Function) {
    onMessageReceived(message);
  }
} // 暴露接口


module.exports.CIMWebBridge = CIMWebBridge;