<template>
  <view class="page box">
    <view class="content">
      <view class="box-barCode">
        <canvas canvas-id="barcode" class="barCode-pic"></canvas>
        <text class="title" @tap="showCode()">{{codes}}</text>
      </view>
      <view class="box-QRCode">
        <canvas canvas-id="qrcode" class="QRCode-pic"></canvas>
        <text class="title">每分钟自动刷新，限当面使用</text>
      </view>
      <view class="bottom">
        <view class="bottom-left"></view>
        <view class="bottom-right"></view>
        <view class="bottom-content">余额支付
        </view>
      </view>
    </view>
	<view class="c-top" v-if="lefticon">
		
	</view>
  </view>

</template>
<script>
	var app = getApp();
	const {
		barcode,
		qrcode
	} = require("../../resources/utils/wallet/QRCode/index.js");
	export default {
		data() {
			return {
				texts: '',
				codes: '点击查看付款码数字',
				websocket: '',
				path:app.globalData.RequestUrl.websocketpath,
				//recognition: false,
				lockReconnect: false,
				tt: false,
				timeout: 10000,
				timeoutObj: null,
				serverTimeoutObj: null,
				usertake:'',
				usersname:'',
				show:'',
				lefticon:false,
				usercodename:'',
				usertest:'',
				userindex:'',
			};
		},
		components: {},
		props: {},
		// 生成二维码
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {      
			var _this = this;
			var test =window.location.search;
			console.log(test);
			_this.usertest=test;
				let Userdata = app.globalData.StorageUtil.get('userInfoCach');
				console.log(Userdata);
			      if(Userdata=='' ||Userdata.username==''){
					  var _this=this;
					  console.log('11111111111');
				              test.split("?");
								var a=test.split("?");
								var c=a[1].split('&');
			                  	var h=c[1];
				                 this.usersname=h.split("=");
								  var d=c[0].split('=');
								  var userken=d[1];
								  this.usertake=userken;
								  console.log(_this.usersname);
								  _this.userroleswitch(_this.usersname,userken);
									_this.lefticon=true;
									console.log(_this.lefticon);
									_this.userindex=1;
									
								
			}else{
				_this.userindex=2;
			}
		         uni.$on("userindex", (options) => {
		         	if (options.value) {
		         			_this.lefticon=true;
							_this.setData({
								lefticon:true
							})
		         	}
		         })
				 console.log(_this.lefticon)
				
			this.createWebSocket();
			//	if (this.recognition) {
			const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); // 关闭定时器
			clearInterval(this.myTime);
			console.log(Userdata);
			if(Userdata!==''){
					_this.getString(userInfoCach);
			}
			this.myTime = setInterval(function() {
				_this.getString(userInfoCach);
			}, 60000);
			//	}
		},
	
		/**
		 * 退出改页面是关闭定时
		 */
		onunload: function() {
			clearInterval(this.myTime);
			this.websocket.onclose = function() {
				console.log("onunload-------------socket已经关闭-------------")
			}
		},	
	   onLoad:function(){
	   	console.log('142555');
	   },
		beforeDestroy() {
			var _this = this;
			clearInterval(this.myTime);
			clearInterval(_this.timeoutObj);
			_this.websocket.close();
			_this.websocket.onclose = function() {
				console.log("beforeDestroy-------------socket已经关闭-------------")
			}
		},
		methods: {
			createWebSocket: function() {
				console.log('111111');
				var _this = this;
				try {
					let Userdata = app.globalData.StorageUtil.get('userInfoCach');
					var username;
					console.log(_this.usertest.length);
					if(_this.usertest.length>0){		
					     username=_this.usersname[1];
					}else{
						username= Userdata.username;
					}
					console.log(username);
					_this.websocket = new WebSocket(_this.path + '/kyzh?deviceCode=D98' + username)
					console.log( Userdata.username);
					 console.log(_this.path);
					_this.WebSocketinit();
				} catch (e) {
					console.log('createWebSocket-------------连接失败，重连----------------')
					_this.reconnect();
				}
			},
			reconnect: function() {
				var _this = this;
				if (this.lockReconnect) {
					return;
				};
				this.lockReconnect = true;
				//没连接上会一直重连，设置延迟避免请求过多
				this.tt && clearTimeout(this.tt);
				this.tt = setTimeout(function() {
					_this.createWebSocket();
					this.lockReconnect = false;
				}, 1000);

			},
			heartCheck: function() {
				var _this = this;
				_this.timeoutObj && clearTimeout(_this.timeoutObj);
				_this.serverTimeoutObj && clearTimeout(_this.serverTimeoutObj);
				_this.timeoutObj = setTimeout(function() {
					//这里发送一个心跳，后端收到后，返回一个心跳消息，
					_this.websocket.send("ping");
					_this.serverTimeoutObj = setTimeout(function() {
						console.log('heartCheck-----------没有收到pong，重连------------');
						_this.reconnect();
					}, _this.timeout);

				}, _this.timeout)
			},
			WebSocketinit: function() {
				var _this = this;
				try {
					_this.websocket.onopen = function() {
						console.log('websocket.onopen-------------连接成功----------------');
						_this.heartCheck();
					}

					_this.websocket.onerror = function() {
						console.log('websocket.onerror-------------连接失败，重连----------------')
						_this.reconnect();
					}
					_this.websocket.onmessage = function(msg) {
						console.log('websocket.onmessage--------------' + msg.data + '-------------')
						if (msg.data == 'pong') {
							_this.heartCheck();
						
						} else {
							let s = parseFloat(msg.data);
							if (s && !isNaN(s)) {
								app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.payResults
								 +"?status=SUCCESS&amount=" + msg.data + '&userindex=' + _this.userindex, 500);
								_this.websocket.close();
								_this.websocket.onclose = function() {
									console.log("跳转支付页面-------------socket已经关闭-------------")
								}
							}
						}
					}
					_this.websocket.onclose = function() {
						console.log("websocket.onclose-------------socket已经关闭，重连-------------")
						_this.reconnect();
					}
				} catch (e) {
					console.log('websocket-------------绑定事件没有成功，重连----------------')
					_this.reconnect();
				}
			},
			showCode() {
				console.log(this.texts)
				if (this.codes != '点击查看付款码数字') {
					this.codes = '点击查看付款码数字'
				} else {
					this.codes = this.texts
				}
			},
			
			userroleswitch:function(username,token){
				 var _this=this;
				wx.request({
				  url: app.globalData.RequestUrl.baseRequestUrl.switchRole,
				  data: {
				    username: username[1],
				  },
				  header: {
				    'token': token,
				    'content-type': 'application/json' //默认值
				  },
				  method: 'POST',
				  success(res) {
					  _this.usertake=res.data.rows.token;
					    console.log('console----'+   _this.usertake)
					  _this.usercodename=res.data.rows.username;
					  console.log('console'+ _this.usercodename)
					  _this.getString();
				    // if (res.data && res.data.code == 200) {
				    //   let userInfo = res.data.rows; // 1.设置userInfo缓存。
				    //   app.globalData.StorageUtil.set('userInfoCach', userInfo);
				    // } else {
				    //   app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
				    // }
				  },
				
				  fail: function () {
				    app.globalData.ShowMsgUtil.showNoneToastByFail();
				  }
				});
			},
			/**
			 * 获取生成二维码的字符串
			 */
			getString: function() {
				var _this = this;
					const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); // 关闭定时器
				
				var usercode;
				
				if( _this.usertake.length>0){
					     usercode=_this.usertake;
						 console.log('123');
				}else{
					usercode=userInfoCach.token;
					
				}
			
				app.globalData.ShowMsgUtil.netErrNotice();
				app.globalData.ShowMsgUtil.showLoadAndMsgToast();
				wx.request({
					url: app.globalData.RequestUrl.payRequestUrl.getCode,
					header: {
						'token': usercode,
						'content-type': 'application/json' //默认值

					},
					method: 'POST',
					success(res) {
						wx.hideToast({});
						// console.log('获取付款码返回', res.data);

						if (res.data && res.data.code == 200) {
							_this.setData({
								texts: res.data.rows
							})
							if (_this.codes != '点击查看付款码数字') {
								_this.setData({
									codes: res.data.rows
								})
							}
							qrcode('qrcode', res.data.rows, 350, 350);
							barcode('barcode', res.data.rows, 600, 180);
						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
							return;
						}
					},
					fail: function() {
						wx.hideToast({});
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}
				});
			}
		}
	};
</script>
<style>
	@import "./paymentCode.css";
</style>
