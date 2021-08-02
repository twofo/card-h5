<template>
	<view>
		<view class="pageCon">
			<view class="pageConb">
				<!-- <icon  :type="status == 'success' ? 'success_no_circle' : 'cancel'" size='60' :color="status == 'success' ?'#20a4f7' : '#F66C45'"/> -->
				<image :src="reImg" mode="widthFix" class="reImg"></image>
				<view class="remsg">{{reMessage}}</view>
				<!-- <view v-if=" status != 'SUCCESS'" class="remsg">{{errorMessage}}</view>
				<view v-if=" status == 'SUCCESS' && amount!=='-1'" class="payCoumt">
					<text>支付金额: </text>
					<text class="acount">{{amount}}</text>
					<text>元</text>
				</view> -->
			</view>

			<view class="repayBtn">
				<button class="btn" type="primary" @tap="rePay" >返回付款码</button>
				<button class="btn" type="primary" @tap="reHome" v-if="showindex">返回首页</button>
			</view>

		</view>
	</view>
</template>

<script>
	var app = getApp()
	var IndexModuleUrl = require("../../resources/utils/imageUrl.js");
	export default {
		data() {
			return {
				status: '',
				reMessage: '', //如果options中有 errorMessage 值表示显示错误信息,如果没有这个值显示成功信息
				amount: 0.00,
				reImg: '',
				errorMessage: '',
					showindex:true
			};
		},
		onLoad(options) {
			console.log(options);
			console.log("打印出" + options)
			var options = JSON.stringify(options)
			var options = JSON.parse(options)
		console.log(options);
		console.log(options.userindex);
		console.log('----'+ '111111111111111');
		if(options.userindex=='1'){
			this.showindex=false;
		}else{
			this.showindex=true;
		}
		console.log(this.showindex);
			this.status = options.status
			if (options.status == 'SUCCESS') {
				this.reImg = IndexModuleUrl.resultSuccessImg
				wx.setNavigationBarTitle({
					title: '一卡通_缴费_支付成功'
				});
				this.reMessage = "支付成功";
				console.log(this.reMessage)
			} else {
				console.log(this.reMessage)
				this.reImg = IndexModuleUrl.resultFailPayImg
				wx.setNavigationBarTitle({
					title: '一卡通_缴费_支付失败'
				});
				this.reMessage = "支付失败"
			}
			console.log(this.reImg)
			if (options.errorMessage) {
				this.reMessage = options.errorMessage

			}
			if (options.amount) {
				// if (options.amount == 'keep alive time out') {
				// 	this.amount='-1'
				// 	return
				// } else {
				this.amount = options.amount
				// }
			}
		},
		onBackPress: function(event) {
			if(this.showindex==false){
				console.log('111')
				uni.$emit("userindex", {
					value: 1,
				})
			}else{
				console.log('2222');
			}
			console.log(event.from);
			if (event.from) {
				console.log('446');
			}
		},
		mounted() {
			//#ifdef H5
			// document.querySelector('.uni-page-head-hd').style.display = 'none'  
			//#endif 
		},
		methods: {
			rePay() {
				// app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500); // 
				// app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.indexModuleUrl.PagesUrl.walletIndex);
				uni.navigateBack({
					delta:1
				})
			},
			reHome() {
				console.log(111111111111111)
				// if(app.globalData.showOnlyABC){
				app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl + '?noRefresh=1',
				500);

				// }else{

				// app.globalData.PublicUtil.switchTabByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl, 1000);
				// }
			}
		}
	}
</script>

<style>
	.pageCon {
		height: 70vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;



	}

	.payCoumt {
		margin-top: 50rpx;

	}

	.acount {
		font-size: 38rpx;
		font-weight: bold;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}

	.pageConb {
		width: 100%;
		height: 70%;
		text-align: center;
		background-color: #FFFFFF;
		padding-top: 15%;
		padding-left: 2%;
		padding-right: 2%;
		box-sizing: border-box;
	}

	.reImg {
		width: 300rpx;
	}

	.remsg {
		margin-top: 40rpx;
	}

	.repayBtn {
		width: 70%;

	}

	.btn {
		margin-top: 30rpx;
		font-size: 28rpx;
		padding: 10rpx 0;

	}

	.btn:first-child {
		margin-top: 80rpx;

	}
</style>
