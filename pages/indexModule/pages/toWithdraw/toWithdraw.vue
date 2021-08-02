<template>
	<view class="page">

		<view class="page__bd">

			<view class="weui-cells weui-cells_after-title box-top">
	                   <view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
						<view class="weui-cell__bd">退款到</view>
						<view v-if="!PickerChange">
							<view class="weui-cell__ft weui-cell__ft_in-access">{{withdrawMsg}}</view>
						</view>
						<view v-else>
							<view class="weui-cell__ft weui-cell__ft_in-access">{{bankCardList[cardId]}}</view>
						</view>

					</view>
<!-- 				<picker @change="bindPickerChange" :value="cardId" :range="bankCardList">
					<view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
						<view class="weui-cell__bd">退款到</view>
						<view v-if="!PickerChange">
							<view class="weui-cell__ft weui-cell__ft_in-access">{{withdrawMsg}}</view>
						</view>
						<view v-else>
							<view class="weui-cell__ft weui-cell__ft_in-access">{{bankCardList[cardId]}}</view>
						</view>

					</view>
				</picker> -->

			</view>

			<view class="weui-cells weui-cells_after-title box-top">

				<view class="center-box">
					<view class="input-title">退款金额</view>
					<view class="input-box">
						<text class="MonIcon">￥</text><input class="input-value" :value="inputMoney"
							@input="toInputMoney" type="digit" maxlength="6" v-model="inputMoney"></input>
					</view>
				</view>
				<view class="weui-cell errNotices" v-if="errNotice">
					<text class="errNotice">{{errNotice}}</text>
				</view>
				<view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
					<view class="weui-cell__bd">可用余额 {{balance}} 元</view>
					<view class="weui-cell__ft toWithdraw-font" @tap="toAllWithdraw">全部退款</view>
				
				</view>
				
				<view class="input-group" v-show="showphone">
				  <text class="input-label">手机号：</text>
				  <input type="number" name="phone" placeholder="请输入手机号" maxlength="20" cursor-spacing="20" @input="phoneInput" value=""></input>
				</view>
				<view class="reminder" v-if="minder">
				<span>请输入整数不包含小数</span>
				</view>
				
			</view>
			<view class="weui-cell errNotices">
				<p>为了保障财产安全，目前只允许提现至本人的支付宝账号，
                请确保输入的手机号码为本人的支付宝账号绑定的手机号码
</p>
			</view>
		<!-- 	<view class="whetherclick">
				<text>{{listIotBankData.refundTime}}</text>
			</view> -->
			<view class="page__bd page__bd_spacing bottom">
				<button class="weui-btn btn-font" type="primary" @tap="toWithdraw" :disabled="disabled">确认退款</button>
			</view>
		</view>

	</view>
</template>

<script>

	var code = ''

	//authorize();
  
	var app = getApp();
	var BankUtil = require("../../resources/utils/wallet/bankCard/util.js");
	var parseHtml = require('../../resources/utils/html-parst.js')
	export default {
		data() {
			return {
				listIotBankData: [],
				'bankCardList': [],
				'listIotBankCard': [],
				'withdrawMsg': '支付宝',
				'balance': '',
				'inputMoney': '',
				'cardId': '',
				'selectCardNumber': '',
				'disabled': true,
				phonevalue:'',
				errNotice: '', //金额错误提示
				PickerChange: false,
				chargeType: -1,
				showphone:false,
				phoneNum:'',
				inputmoney:'',
				minder:false,
				pageObj: {
								balance:0.00,
								integral:0.00,
								btnList:[]
							},
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			console.log('------------------------退款------------------------');
			console.log(options); // 数据精度处理
               this.getDeductionModel();
			// let balance = parseFloat(options.balance);
			// balance = balance.toFixed(2);
			// this.setData({
			// 	'balance': balance,
			// 	chargeType: options.chargeType
			// }); // 获取当前用户银行卡

			if (options.chargeType == 9) {
				uni.setNavigationBarTitle({
					title: '热水费提现'
				})
			} else if (options.chargeType == 6) {
				uni.setNavigationBarTitle({
					title: '余额提现'
				})
			}
			const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
			this.requestQueryBankCardList(userInfoCach);
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			
			 this.getDeductionModel();
		},
		methods: {
			/**
			 * 开始授权
			 */
			 authorize:function() {
			
				alert(location.href)
			  code = this.getQueryString('auth_code');
			  if(code == '' || code === ''){
			    var redirect_uri = encodeURIComponent("kyzh://kyzhiot:8888/home?"+location.href);
				  //支付宝应用ID
				  var APPID = "2018121862586361";
				  //接口权限值，目前只支持auth_userinfo和auth_base两个值
				  var SCOPE = "auth_userinfo";
				  // 静默授权
				  var url = "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id="+APPID+"&scope="+SCOPE+"&redirect_uri="+redirect_uri
				  //+"&state="+STATE;
				  const certifyUrl = "alipays://platformapi/startapp?appId=20000067&url="+encodeURIComponent(url);
			    location.href = certifyUrl;
			  }else{
				  alert(code) 
			      this.getOpenId(code);
			  }
			},
			
			/**
			 * 获取URL参数
			 */
			 getQueryString:function(name) {
				 console.log(name);
			  var url = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
			  var newUrl = window.location.search.substr(1).match(url)
			  if (newUrl != null) {
			    return unescape(newUrl[2]);
			  } else {
			    return false;
			  }
			},
			
      /**
       * 获取用户openId
       */
      getOpenId: function (code) {
        wx.request({
          url: app.globalData.RequestUrl.payRequestUrl.AliPayGetOpenID,
          data: {
            code: code
          },
          method: 'POST',
          header: {
            'token': userInfoCach.token
          },
          success: function (res) {
            console.log(res);
            console.log('请求openId-', res.data);
            if (res.data && res.data.code === 200) {
              // 发送退款请求
			  this.requestToWithdraw(userInfoCach);
            } else {
              app.globalData.ShowMsgUtil.showErrorModal('授权失败', res.data.msg, res.data.code);
            }
          },
          fail: function () {
            app.globalData.ShowMsgUtil.showNoneToastByFail();
            /*setTimeout(function () {
              wx.redirectTo({
                url: app.globalData.PageUrl.authPageUrl.loginUrl
              });
            }, 2000);*/                                                                                                                                                                                                                                                                                                      
          }
        });
      },
			// 全部退款功能实现
			toAllWithdraw: function() {
				this.setData({
					'inputMoney': this.balance
				});
              
				 if(this.balance.length>0){
					 this.showphone=true;
				 }
				// if (this.cardId >= 0 && this.inputMoney > 0 && this.selectCardNumber) {
				// 	this.setData({
				// 		'disabled': false
				// 	});
				// } else {
				// 	this.setData({
				// 		'disabled': true
				// 	});
				// }
			},
			//校验手机号码的格式
			checkPhone: function (phoneNum) {
				
			  let str = /^1\d{10}$/;
			
			  if (str.test(phoneNum)) {
			    return true;
			  } else {
			    return false;
			  }
			},
			phoneInput: function (e) {
				
			  var _this = this;	
			  _this.phonevalue=e.detail.value;
			  
			  let balance = parseFloat(this.balance);
			
			  if(_this.phonevalue.length>0&&balance>=this.inputmoney){
				  this.setData({
					  disabled:false
				  })
			  }else{
				  this.setData({
					  disabled:true
				  })
			  }
			  let phoneNum = e.detail.value;
	
			//   let checkPhoneNum = this.checkPhone(phoneNum);
			},
			// 选择银行卡
			// bindPickerChange: function(e) {
			// 	console.log(e)
			// 	this.setData({
			// 		'cardId': e.detail.value,
			// 		'selectCardNumber': this.listIotBankCard[e.detail.value],
			// 		PickerChange: true
			// 	});

			// 	this.cardId = e.detail.value

			// 	console.log(this.listIotBankCard[e.detail.value], this.inputMoney)

			// 	if (this.inputMoney > 0 && this.selectCardNumber) {
			// 		this.setData({
			// 			'disabled': false
			// 		});
			// 	} else {
			// 		this.setData({
			// 			'disabled': true
			// 		});
			// 	}
			// },
			// 输入金额
			toInputMoney: function(e) {
				var money = e.detail.value;
				var reg=/^[1-9]{1}[0-9]*$/;
				// if(reg.test(money)){
				//      this.minder=false;
				//      this.setData({   
				//       	'disabled':false	
				//       });
				//    } 
				// 					  else{
				// 						this.minder=true;
				// 						this.setData({
				// 						 	'disabled':true	
				// 						 });
				// 						 return;
				// 					  }
				  this.inputmoney=money;
			
				if(money.length>0){
					this.showphone=true;
					 // this.phonevalue='';
				}else{
					this.showphone=false
				}
			var reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/;
				if (reg.test(money) ) {
				       //符合规则缓存起来
				      this.inputMoney=e;
				   } else {
				       //不加Timeout this.inputKey的值能改变，但是input显示值没有改变
				     setTimeout(()=>{
				       //不符合规则，把上一次缓存起来的值重新赋给input双向绑定的变量
				       this.inputMoney=money.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
				     },0)
				   }
				   this.setData({
					   "inputMoney":e.detail.value
				   })
				let balance = parseFloat(this.balance);
				this.inputmoney=money;
				if (money > balance) {
					this.errNotice = '请输入可提现余额'
					this.setData({
						'disabled': true,
						
					});
					return
				} else {
					this.errNotice = ''
				}
			},

			/**
			 * 点击 - 退款
			 */
			toWithdraw: function() { 
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				var _this=this;
				_this.setData({
					disabled:true
				}) 
			
			 // 临时人员无法退款
			 			
			 if (userInfoCach.isMortal == 1) {
			 	app.globalData.ShowMsgUtil.showErrorModal('提醒', '培训人员暂不支持该功能！');
			 	return;
			 }
				if (!_this.checkPhone(_this.phonevalue)) {
				  app.globalData.ShowMsgUtil.showErrorModal('格式不正确', '请输入正确的手机号！');
				  this.setData({
				  disabled:true
				  })
				  return;
				}else{
					  this.requestToWithdraw(userInfoCach)
				}
					// this.authorize();
			},
			 /**
			  * 获取扣费模式返回
			  */
			 getDeductionModel: function () {
			   var _this = this;
			 	app.globalData.ShowMsgUtil.netErrNotice();
			   const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
			   wx.request({
			     url: app.globalData.RequestUrl.baseRequestUrl.getDeductionModel,
			     method: 'GET',
			     header: {
			       'token': userInfoCach.token
			     },
			     success: function (res) {
			   
			       if (res.data && res.data.code == 200) {
			       
			         _this.queryBalance(userInfoCach, res.data.rows.deductionModel);
			       } else {
			         app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
			         return;
			       }
			     },
			     fail: function () {
			       app.globalData.ShowMsgUtil.showNoneToastByFail();
			     }
			   });
			 },
			
			/**
			 * 余额及积分的查询
			 */
			queryBalance: function (userInfoCach, deductionModel) {
			  var _this = this;
			  app.globalData.ShowMsgUtil.netErrNotice();
			  wx.request({
			    url: app.globalData.RequestUrl.baseRequestUrl.balance,
			    method: 'POST',
			    header: {
			      'token': userInfoCach.token
			    },
			    data: {
			      deductionMode: deductionModel
			    },
			    success: function (res) {
			      if (res.data && res.data.code == 200) {
			        app.globalData.StorageUtil.set('purseBalanceCach', res.data.rows.purseBalance);
			        _this.balance = app.globalData.PublicUtil.minuteChanageYuanBalance(res.data.rows.purseBalance.balance);
			      } else {
			        app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
			        return;
			      }
			    },
			    fail: function () {
			      app.globalData.ShowMsgUtil.showNoneToastByFail();
			    }
			  });
			},
			
			// 发起退款请求
			requestToWithdraw: function(userInfoCach) {
				
				var _this = this;
				// console.log(paycode);
				let paycode= _this.inputMoney * 100;
					let result = app.globalData.CryptoJS.EncryptBASE64(paycode);
				app.globalData.ShowMsgUtil.netErrNotice();
				wx.request({
					url: app.globalData.RequestUrl.baseRequestUrl.payRefund,
					data: {
						money:result,
						// cardNumber: _this.selectCardNumber.cardNumber,
						openId:_this.phonevalue,
						chargeType: 6
					},
					method: 'POST',
					header: {
						'token': userInfoCach.token,
						'content-type': 'application/json' //默认值

					},
					success: function(res) {
						console.log('退款申请后返回', res.data);
						if (res.data &&(res.data.code == 200||res.data.code==0)) {
						
		                   wx.showModal({
		              title: '提现申请',
		         content: res.data.msg,
		         showCancel: false,//是否显示取消按钮
		         cancelText:"否",//默认是“取消”
		         confirmText:"确定",//默认是“确定”
		         confirmColor: 'skyblue',//确定文字的颜色
		         success: function (res) {
		            if (res.cancel) {
		               //点击取消,默认隐藏弹框
		            } else {
		               //点击确定
					   app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.walletIndexUrl,500);
		            }
		         },
		      
		      })
							
						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
							return;
						}
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}
				});
			},

			/**
			 * 可提取组件
			 */
			//请求查询银行卡列表
			requestQueryBankCardList: function(userInfoCach) {
				var _this = this;
				app.globalData.ShowMsgUtil.netErrNotice();
				wx.request({
					url: app.globalData.RequestUrl.baseRequestUrl.listIotBankCard,
					header: {
						'token': userInfoCach.token,
						'content-type': 'application/json' //默认值

					},
					method: 'POST',

					success(res) {
						
						if (res.data && res.data.code == 200) {
							   if (res.data.rows.refundSwitch == 1) {//显示退款时间
							            _this.setData({
							              amount: true,
							              listIoBankData: res.data.rows.refundTime
							            })
							          }
							_this.listIotBankData = res.data.rows;
							if (res.data.rows.bankCardList.length > 0) {
								_this.setData({
									'listIotBankCard': res.data.rows.bankCardList,
									'withdrawMsg': '支付宝'
								}); // 生成页面展示信息

								_this.showBankInfo(res.data.rows.bankCardList);
							} else {
								_this.setData({
									'withdrawMsg': '支付宝'
								});
							}
						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
							return;
						}
					},

					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}
				});
			},
			// 生成页面展示信息
			showBankInfo: function(bankCard) {
				var showBankInfo = [];

				for (let i = 0; i < bankCard.length; ++i) {
					var oneBankInfo = ''; // 根据银行卡号获取信息

					var bankInfo = BankUtil.bankCardAttribution(bankCard[i].cardNumber);
				
					if (bankInfo === 'error') {
						oneBankInfo = '未知（' + this.bankCard(bankCard[i].cardNumber) + '）';
					} else {
						oneBankInfo = bankInfo.bankName + '（' + this.bankCard(bankCard[i].cardNumber) + '）';
					}

					showBankInfo[i] = oneBankInfo;
				}

				this.setData({
					'bankCardList': showBankInfo
				});
			},
			// 展示带星号的银行卡号
			bankCard: function(bankCard) {
				var newBankCard = bankCard.substring(bankCard.length - 4, bankCard.length);
				return newBankCard;
			}
		}
	};
</script>
<style>
	@import "./toWithdraw.css";
</style>
