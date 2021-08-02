<template>
	<view class="page">

		<view class="page__bd">

			<view class="weui-cells weui-cells_after-title box-top">
				<!-- <picker bindchange="bindPickerChange" value="{{index}}" range="{{itemList}}">  -->
				<view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="selectNumber">
					<view class="weui-cell__bd fontSize16">充值方式</view>
					<view v-if="!isPayWay">
						<view class="weui-cell__ft fontSize16">暂无支付方式</view>
					</view>
					<view v-else>
						<view v-if="showOnlyABC" class="weui-cell__ft fontSize16">农行快E付</view>
						<picker v-else mode="selector" :range="payMeths" :value="payInd" @change="pickChange">
							<view>{{payMeths[payInd]}}</view>
						</picker>
					</view>
				</view>
				<!-- </picker> -->
			</view>
			<view class="weui-cells weui-cells_after-title box-top">

				<view class="center-box">
					<view class="input-title fontSize16">充值金额</view>
					<view class="input-box">
						<text class="MonIcon">￥</text><input @input="inputMoney" :value="total_fee" class="input-value"
							type="digit" maxlength="6" v-model="total_fee"></input>
					</view>
				</view>
			</view>

			<view>
				<view class="moneyList">
					<view class="moneyItem" @tap="getMonVal" :data-value="item" v-for="(item,index) in moneyList"
						:key='item'> <text>{{item}}
							元</text> </view>
                      <view class="reminder" v-if="minder">
					  <span>请输入整数不包含小数</span>
				</view>
				</view>
			</view>

			<view class="page__bd bottom">
				
				<button class="weui-btn btn-font" type="number" @tap="toPay" :disabled="disablePay">确认充值</button>
			</view>
		</view>

		<!-- //弹窗 -->
		<view v-if="!reToPay" class="model_box">
			<view class="model_cont">
				<view class="cells Mtitle">
					请确认微信支付是否已完成
				</view>
				<view class="cells dangeColor" @tap="wxResSeccess">
					已完成支付
				</view>
				<view class="cells" @tap="rePayAgain">
					支付遇到问题,重新支付
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var app = getApp();
	var parseHtml = require('../../resources/utils/html-parst.js')
	export default {
		data() {
			return {
				'isPayWay': false,
				'disablePay': true,
				'total_fee': '',
				pageObj: {},
				toPayType: '',
				//琴房充值
				payObj: '', //预支付接口返回参数
				moneyList: ['5', '10', '20', '30', '50', '100'], //充值指定金额
				payMeths: ["农行支付","微信支付", "支付宝支付" ],
				payMethArr: [],
				payInd: 0,
				selectMeth: {}, //选择的支付方式
				reToPay: true,
				showWeb: '',
				pay: '',
				//银行app需要内容
				showOnlyABC: app.globalData.showOnlyABC,

				val: "",
				minder:false

			};
		},
		mounted() {
			console.log('7987');
			window.onbeforeunload = function() {

			}
			window.addEventListener("onbeforeunload", function(e) {
				//根据自己的需求实现自己的功能
				//window.location.href = 'https://www.baidu.com'
				// this.$router.go(0);
				console.log('4564');
				alert("监听到的事件是这样的吗啊");
			}, false);
		},
		onLoad: function(options) {
			console.log('------------------------充值------------------------');
			console.log('options.isWater', options);
			// app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.payResult + '?status=' + 'SUCCESS' + '&amount=0.01', 500);

			//农行回调
			// http://app-h5.keyunzhihui.com/#/pages/indexModule/pages/payResult/payResult?status=SUCCESS&amount=0.01
			// app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.payResult+"?status=success&amount=100", 500);
			if (options.isWater && options.isWater == 1) { // 公司冷水
				wx.setNavigationBarTitle({
					title: '一卡通_水费充值_缴费'
				});
				this.pageObj.rechargeType = 1;
				this.pageObj.bodyName = '水费缴费';
			} else if (options.isWater && options.isWater == 15) { // 盛帆冷水
				wx.setNavigationBarTitle({
					title: '一卡通_水费充值_缴费'
				});
				this.pageObj.rechargeType = 15;
				this.pageObj.bodyName = '盛帆冷水缴费';
			} else if (options.isWater && options.isWater == 2) {
				wx.setNavigationBarTitle({
					title: '一卡通_空调电费充值_缴费'
				});
				this.pageObj.rechargeType = 2;
				this.pageObj.bodyName = '空调电费缴费';
			}
			/* else if (options.isWater && options.isWater == 14) {  2为空调电费,14暂无使用
				wx.setNavigationBarTitle({
					title: '一卡通_空调电费充值_缴费'
				});
				this.pageObj.rechargeType = 14;
				this.pageObj.bodyName = '空调电费缴费';
			} */
			else if (options.isWater && options.isWater == 13) {
				wx.setNavigationBarTitle({
					title: '一卡通_照明电费充值_缴费'
				});
				this.pageObj.rechargeType = 13;
				this.pageObj.bodyName = '照明电费缴费';
			} else if (options.isWater && options.isWater == 9) {
				wx.setNavigationBarTitle({
					title: '一卡通_热水费充值_缴费'
				});
				this.pageObj.rechargeType = 9;
				this.pageObj.bodyName = '热水费缴费';
			} else if (options.isWater && options.isWater == 12) {
				wx.setNavigationBarTitle({
					title: '一卡通_直饮水充值_缴费'
				});
				this.pageObj.rechargeType = 12;
				this.pageObj.bodyName = '直饮水费缴费';
			} else {
				wx.setNavigationBarTitle({
					title: '一卡通_余额充值_缴费'
				});
				this.pageObj.rechargeType = 6;
				this.pageObj.bodyName = '钱包充值';
			}

			this.pageObj.isWater = options.isWater;

			if (options.toPayType) {
				this.setData({
					toPayType: options.toPayType
				});
			}

			this.setData({
				pageObj: this.pageObj
			});
			const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); // 获取支付方式. 只能用微信支付

			this.getPayWay(userInfoCach);

			if (options.getResult && options.getResult == 1) { // 获取微信支付结果回调
				//添加弹窗 
				this.setData({
					reToPay: false
				})

			}
		},
		// onUnload:function(){
		// 	 this.$router.go(0);
		// },

		onShow() {
			if (this.total_fee == '') {

				let val = ''
				this.isHidden(val);

			}

		},
		methods: {
			pickChange: function(e) {
				console.log(e)
				let payInd = e.detail.value
				let selectMeth = this.payMethArr[payInd]
				console.log(selectMeth)
				this.setData({
					payInd,
					selectMeth
				})
			},
			// 获取支付方式. 只能用微信支付
			getPayWay: function(userInfoCach) {
				var _this = this; // console.log('--' + app.RequestUrl.baseRequestUrl.payMethod);

				app.globalData.ShowMsgUtil.netErrNotice();
				wx.request({
					url: app.globalData.RequestUrl.baseRequestUrl.payMethod,
					method: 'GET',
					header: {
						'token': userInfoCach.token
					},
					success: function(res) {
						console.log('获取支付方式返回', res.data);
						if (res.data && res.data.code == 200) {
							var is_payWay = false;
							var payMeths = [],
								payMethArr = [],
								selectMeth = {};
							if (res.data.rows.length > 0) {
								is_payWay = true
								payMethArr = res.data.rows
								selectMeth = res.data.rows[0]
								for (let i = 0; i < res.data.rows.length; i++) {
									[res.data.rows[0],res.data.rows[2]] = [res.data.rows[2],res.data.rows[0]];
									payMeths.push(res.data.rows[i].name)
								}

							}
							if (_this.pageObj.rechargeType !== 6) {
								payMeths.push('余额支付')
								payMethArr.push({
									name: "余额支付",
									value: "YUEPay"
								})
							}

							_this.setData({
								'isPayWay': is_payWay,
								payMeths,
								payMethArr,
								selectMeth
							});

						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);

							if (_this.total_fee) {
								_this.isHidden(_this.total_fee);
							}

							return;
						}
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}
				});
			},
			// 判断按钮是否禁用的条件
			isHidden: function(value) {
				// console.log(value)
				if (value > 0 && this.isPayWay) {
					this.setData({
						'disablePay': false
					});
				} else {
					this.setData({
						'disablePay': true
					});
				}
			},
			// 获取充值金额	
			inputMoney: function(e) {
				// console.log(e.detail.value);
				let s = e.detail.value;
				let a=s.toString().split(".");
				console.log(a);
				if(s.indexOf())
			      var reg=/^[1-9]{1}[0-9]*$/;
			 if(reg.test(s)){ 
			      this.minder=false;
			      this.setData({   
			       	'disablePay':false	
			       });
			    } 
					  else{
						this.minder=true;
						this.setData({
						 	'disablePay':true	
						 });
						 return;
					  }
				
				  //  }
				// if (r.test(s)) {
				// 	//符合规则缓存起来
				// 	this.total_fee = e;
				// 	this.minder=false;
				// } else {
				// 	this.minder=true;
				// 	this.setData({
				// 		'disablePay': true	
				// 	});
				// 	return false;
				// 	// console.log('456');
				// 	// //不加Timeout this.inputKey的值能改变，但是input显示值没有改变
				// 	// setTimeout(() => {
				// 	// 	//不符合规则，把上一次缓存起来的值重新赋给input双向绑定的变量
				// 	// 	this.total_fee = s.replace(/^(\-)*(\d+)\.(\d).*$/,'$1');
				// 	// }, 0)
				// }
				this.setData({
					'total_fee': e.detail.value
				});
				this.isHidden(e.detail.value);
			},
			getMonVal(e) {
				let val = e.currentTarget.dataset.value

				console.log(val);
				this.setData({
					'total_fee': val
				})
				this.isHidden(val);
			},
			selectNumber() {},
			/**
			 * 确定充值 - 预支付接口
			 */
			myoninput: function() {
				console.log('456445');
			},
			toPay: function() {
				var _this = this; // 临时人员无法充值
				console.log('去充值')
				console.log(this.selectMeth)

				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

				if (userInfoCach.isMortal == 1) {
					app.globalData.ShowMsgUtil.showErrorModal('提醒', '培训人员暂不支持该功能！');
					return;
				}
				app.globalData.ShowMsgUtil.showLoadToast('加载中');
				var total_fee = _this.total_fee;
				const platform = app.globalData.SystemInfo.platform;
				if (!app.globalData.CheckUtil.verifyMoney(total_fee)) {
					app.globalData.ShowMsgUtil.showErrorModal('提醒', '暂不支持该功能！');
					return;
				}
				console.log(total_fee)
				console.log(platform)
				if (this.showOnlyABC) {
					this.selectMeth.value = 'ABCHINA'
				}
				// this.getPayData(total_fee, this.pageObj.rechargeType, this.pageObj.bodyName);
				if (this.selectMeth.value == 'WXPAY') { //微信支付
					this.getWXPay(total_fee, platform)
				} else if (this.selectMeth.value == 'ZFBPAY') { //支付宝支付
					this.getZFBPay(total_fee, platform)
				} else if (this.selectMeth.value == 'ABCHINA') { //农行支付
					this.getABCPay(total_fee, platform)
				} else { //余额支付
					this.getYEPay(total_fee, platform)
				}
			},
			getWXPay(total_fee, platform) {
				let urls = window.location.href;
				app.globalData.ShowMsgUtil.netErrNotice();
				let paycode = total_fee * 100;
				let result = app.globalData.CryptoJS.EncryptBASE64(paycode);
				if (urls.indexOf("?") == -1) {
					urls = urls + '?getResult=1';
				} else {
					urls = urls + '&getResult=1';
				}
				console.log("微信支付回调地址:" + urls)

				let _this = this
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				uni.request({
					url: app.globalData.RequestUrl.payRequestUrl.payforUrl,
					data: {
						payAmount: result,
						body: _this.pageObj.bodyName,
						rechargeType: _this.pageObj.rechargeType,
						h5Type: platform
					},
					header: {
						'token': userInfoCach.token,
						'content-type': 'application/json'
					},
					method: 'POST',
					success(res) {
						uni.hideToast()
						if (res.data.code == 200) {
							let url = res.data.rows.mweb_url +
								'&redirect_url=' + encodeURIComponent(urls)
							console.log("即将拉起微信支付:" + url);
							let payforInfo = {
								outTradeNo: res.data.rows.out_trade_no,
								total_fee: total_fee,
								body: _this.pageObj.bodyName,
								rechargeType: _this.pageObj.rechargeType,
								h5Type: platform,
								url: url
							}
							app.globalData.StorageUtil.set('payforInfo', payforInfo)

							// 拉起微信支付
							location.href = url;
							// let payView = _this.webview.created(url, 'pay-url', {
							//   top: '1000px',bottom: '1000px',
							//   additionalHttpHeaders:{referer:'http://xidengdui.com'}
							// })
							// _this.append(payView);

						} else {
							app.globalData.ShowMsgUtil.showErrorModal('充值失败', res.data.msg);
						}
					},
					fail(err) {
						_this.setData({
							'disablePay': false
						});
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}

				})
			},
			//支付遇到问题,重新支付,直接调起上次支付时的地址信息
			// repayType again 重新发起  destory 已完成(订单结束)
			rePayAgain() {
				let repayType = 'again'
				this.getWXPayResult(repayType)
			},

			// 微信支付已完成 查询微信支付结果
			wxResSeccess() {
				let repayType = 'destory'
				this.getWXPayResult(repayType)
			},
			//获取微信支付结果
			/**
			 * 未支付："NOTPAY" ，
			 * 支付成功："SUCCESS"，
			 * 支付中："USERPAYING"，
			 * 支付失败："PAYERROR"，
			 * 已关闭："CLOSED"
			 * */
			getWXPayResult(repayType) {
				app.globalData.ShowMsgUtil.netErrNotice();
				app.globalData.ShowMsgUtil.showLoadToast("正在处理...", 500);
				let _this = this
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				const payforInfo = app.globalData.StorageUtil.get('payforInfo');
				uni.request({
					url: app.globalData.RequestUrl.payRequestUrl.payforwxUrl,
					data: {
						outTradeNo: payforInfo.outTradeNo,
						totalFee: payforInfo.total_fee,
						transactionId: ""
					},
					header: {
						'token': userInfoCach.token,
						'content-type': 'application/json'
					},

					method: 'POST',
					success(res) {
						console.log(res)
						uni.hideToast()
						if (res.data.code == 200) {
							let msg = res.data.msg
							// app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.payResult + "?status=success&amount=100", 500);
							if (msg == 'USERPAYING') { //支付中
								setTimeout(() => {
									wx.removeStorage({
										key: 'payforInfo'
									})
								}, 500)
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl
									.payResult + "?status=" + res.data.msg, 500);
								clearTimeout()

							} else if (msg == 'NOTPAY' || msg == 'PAYERROR' || msg == 'CLOSED') {
								// 支付失败
								if (repayType == 'again') {
									// 再次拉起支付(链接5分钟有效)
									location.href = payforInfo.url
								} else {
									uni.hideToast()
									_this.setData({
										reToPay: true
									})
									wx.showModal({
										title: "提示",
										content: "订单未完成请确认关闭订单",
										showCancel: false,
										confirmText: '确定关闭',
										confirmColor: '#EA1932',
										success: () => {
											//发起请求关闭订单
											_this.closeOrder()
											app.globalData.PublicUtil.navigateByUrl(app.globalData
												.PageUrl.indexPageUrl.payResult + "?status=" + res
												.data.msg + '&errorMessage=取消支付', 500);
										}

									})
								}

							} else if (msg == 'SUCCESS') {
								//支付成功
								setTimeout(() => {
									wx.removeStorage({
										key: 'payforInfo'
									})
								}, 500)
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl
									.payResult + "?status=" + msg + "&amount=" + payforInfo.total_fee,
									500);
							}


						} else {
							uni.hideToast()
							_this.setData({
								reToPay: true
							})
							app.globalData.ShowMsgUtil.showErrorModal('充值失败', res.data.msg);
						}
					},
					fail(err) {
						uni.hideToast()
						_this.setData({
							reToPay: true
						})
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}

				})
			},
			// 微信支付并未完成但是点击已完成支付时关闭订单
			closeOrder() {
				app.globalData.ShowMsgUtil.netErrNotice();
				let _this = this
				const payforInfo = app.globalData.StorageUtil.get('payforInfo');
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				uni.request({
					url: app.globalData.RequestUrl.payRequestUrl.closewWxOrder,
					data: {
						outTradeNo: payforInfo.outTradeNo,
					},
					header: {
						'token': userInfoCach.token,
						'content-type': 'application/json'
					},
					method: 'POST',
					success(res) {
						uni.hideToast()
						wx.removeStorage({
							key: 'payforInfo'
						})
						if (res.data.code == 200) {

						} else {
							app.globalData.ShowMsgUtil.showErrorModal('充值失败', '订单关闭失败，请稍后再试！');
						}
					},
					fail(err) {
						_this.setData({
							'disablePay': false
						});
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}

				})
			},

			getZFBPay(total_fee, platform) {
				console.log('进入支付宝支付')
				let _this = this
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				let paycode = total_fee * 100;
				let result = app.globalData.CryptoJS.EncryptBASE64(paycode);
				uni.request({
					url: app.globalData.RequestUrl.payRequestUrl.payforZFBUrl,
					data: {
						payAmount: result,
						body: _this.pageObj.bodyName,
						rechargeType: _this.pageObj.rechargeType,
						h5Type: platform
					},
					header: {
						'token': userInfoCach.token,
						'content-type': 'application/json'
					},
					method: 'POST',
					success(res) {
						console.log(res);
						if (res.data.code == 200) {

							let temp = document.createElement("div");
							//2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
							temp.innerHTML = res.data.rows.formHtml;
							let output = temp.innerText || temp.textContent;
							temp = null;
							document.querySelector('body').innerHTML = output;
							//调用 submit 方法
							document.forms[0].submit();

						} else {
							app.globalData.ShowMsgUtil.showErrorModal(res.data.msg, '请稍后再试！');
						}
					},
					fail(err) {
						_this.setData({
							'disablePay': false
						});
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}

				})

			},

			getABCPay(total_fee, platform) {
				console.log('进入农行支付')
				let paycode = total_fee * 100;
				let result = app.globalData.CryptoJS.EncryptBASE64(paycode);
				app.globalData.ShowMsgUtil.netErrNotice();
				let _this = this
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				uni.request({
					url: app.globalData.RequestUrl.payRequestUrl.payforABCUrl,
					data: {
						payAmount: result,
						body: _this.pageObj.bodyName,
						rechargeType: _this.pageObj.rechargeType
					},
					header: {
						'token': userInfoCach.token,
						'content-type': 'application/json'
					},
					method: 'POST',
					success(res) {
						uni.hideToast()
						if (res.data.code == 200) {
							// let url = res.data.msg
							let url = res.data.rows.url;
							console.log(url)
							location.href = url
						} else {
							app.globalData.ShowMsgUtil.showErrorModal(res.data.msg, '请稍后再试！');
						}

					},
					fail(err) {
						_this.setData({
							'disablePay': false
						});
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}

				})

			},
			getYEPay(total_fee, platform) {
				console.log('进入余额支付')
				console.log(total_fee);
				let paycode = total_fee * 100;
				let result = app.globalData.CryptoJS.EncryptBASE64(paycode);
				app.globalData.ShowMsgUtil.netErrNotice();
				let _this = this
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				console.log(total_fee);
				app.globalData.ShowMsgUtil.showLoadToast("正在充值...", 500);
				uni.request({
					url: app.globalData.RequestUrl.payRequestUrl.YEPayUrl,
					data: {
						payAmount: result,
						body: _this.pageObj.bodyName,
						rechargeType: _this.pageObj.rechargeType,
						h5Type: platform
					},
					header: {
						'token': userInfoCach.token,
						'content-type': 'application/json'
					},
					method: 'POST',
					success(res) {
						console.log(res);
						uni.hideToast()
						if (res.data.code == 200) {
							//支付成功
							_this.setData({
								'disablePay': true
							});
							app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.indexPageUrl
								.payResult + "?status=SUCCESS&amount=" + total_fee,
								500);


						} else {

							//支付失败
							// app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.indexPageUrl
							// 	.payResult + "?status=FAILED", 500);
							app.globalData.ShowMsgUtil.showErrorModal('充值失败', res.data.msg);
							_this.setData({
								'disablePay': false
							});
						}
					},
					fail(err) {
						_this.setData({
							'disablePay': false
						});
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}

				})

			},
			/**
			 * 获取去充值的参数
			 */
			getPayData: function(total_fee, rechargeType, bodyName) {
				var _this = this;
				app.globalData.ShowMsgUtil.netErrNotice();
				this.setData({
					'disablePay': true
				}); // 临时人员无法充值

				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				const openid = app.globalData.StorageUtil.get('openid');
				let paycode = total_fee * 100;
				let result = app.globalData.CryptoJS.EncryptBASE64(paycode);
				wx.request({
					url: app.globalData.RequestUrl.payRequestUrl.cxcOrder,
					data: {
						'recharge_type': rechargeType,
						'total_fee': result,
						'body': bodyName,
						'openid': openid,
						'identifier': userInfoCach.username
					},
					header: {
						'token': userInfoCach.token,
						'content-type': 'application/json'
					},
					method: 'POST',

					success(res) {
						wx.hideToast({});
						console.log('校园通充值返回', res.data);

						if (res.data && res.data.code == 200) {
							if (Object.keys(res.data.rows).length > 0) {
								// 调用微信支付api
								_this.toWXPay(res.data.rows);

								_this.setData({
									payObj: res.data.rows
								});
							} else {
								_this.setData({
									'disablePay': false
								});

								app.globalData.ShowMsgUtil.showErrorModal('充值失败', '请稍后再试！');
							} // webSocte获取返回支付成功	
							// 跳转支付成功页面

						} else {
							_this.setData({
								'disablePay': false
							});

							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
							return;
						}
					},

					fail: function() {
						wx.hideToast({});

						_this.setData({
							'disablePay': false
						});

						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}
				});
			},
			// 调用微信支付接口
			toWXPay: function(obj) {
				let _this = this;
				wx.hideToast();
				wx.requestPayment({
					'timeStamp': obj.timeStamp,
					'nonceStr': obj.nonceStr,
					'package': obj.package,
					'signType': obj.signType,
					'paySign': obj.sign,
					'success': function(res) {
						console.log('success', res.data);
						if (res.errMsg === 'requestPayment:ok') {
							if (_this.toPayType == 'piano') {
								app.globalData.ShowMsgUtil.showSuccessToast('充值成功', 1500);
								setTimeout(function() {
									wx.navigateBack({
										delta: 1
									});
								}, 1500);
							} else {
								app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.authPageUrl
									.successPageUrl + '?title=支付成功&pageUrl=' + app.globalData.PageUrl
									.taBarPageUrl.indexUrl, 500);
							}
						}
					},
					'fail': function(res) {
						console.log('fail', res.data);

						_this.setData({
							'disablePay': false
						});

						if (res.errMsg === 'requestPayment:fail cancel') {
							wx.hideToast(); // 关闭充值充值订单

							_this
								.closeWxRechargeOrder(); // app.ShowMsgUtil.showErrorModal('支付失败', '已取消支付');

						} else if (res.errMsg === 'requestPayment:fail') {
							app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.authPageUrl
								.failPageUrl + '?title=支付失败&pageUrl=' + app.globalData.PageUrl
								.indexPageUrl.toPay, 500);
						} else {
							app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.authPageUrl
								.failPageUrl + '?title=支付失败&pageUrl=' + app.globalData.PageUrl
								.indexPageUrl.toPay, 500);
						}
					}
				});
			},
			closeWxRechargeOrder: function() {
				app.globalData.ShowMsgUtil.netErrNotice();
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				wx.request({
					url: app.globalData.RequestUrl.payRequestUrl.cxcClose,
					data: {
						'outTradeNo': this.payObj.outTradeNo
					},
					header: {
						'token': userInfoCach.token,
						'content-type': 'application/json'
					},
					method: 'POST',

					success(res) {
						wx.hideToast({});
						console.log('校园通充值返回', res.data);

						if (res.data && res.data.code ==
							200) { //app.ShowMsgUtil.showErrorModal('充值失败', '请稍后再试！');
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
	@import "./toPay.css";
</style>
