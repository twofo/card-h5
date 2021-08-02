<template>
<view class="page ">

  <view class="box"> 
    <view class="box-show">
      <view class="box-show-msg">
        <view class="box-show-balance"> 
          <text>余额（元）</text>
        </view>
        <view class="box-show-money"> 
          ￥{{pageObj.balance}}
        </view>
        <view v-if="userInfoCach.personType==1">
          <view class="box-show-integral"> 
            <image :src="indexModuleUrl.integral" class="integral-pic"></image>
            <text>积分：{{pageObj.integral}}</text> 
          </view>
        </view>
      </view>
    </view>
    <view class="box-module">
        <view class="box-items items-border">
        <navigator url="/pages/indexModule/pages/bankCard/bankCard">
          <view class="box-items-select">
            <image :src="indexModuleUrl.bankCard" class="items-select-pic"></image>
          </view>
          </navigator>
        </view>
      <view class="box-items">
        <navigator url="/pages/indexModule/pages/paymentCode/paymentCode"> 
        <view class="box-items-select">
          <image :src="indexModuleUrl.paymentCode" class="items-select-pic"></image>
        </view>
        </navigator>
      </view>
      <!-- <view class="box-items">
        <navigator :url="'/pages/indexModule/pages/payRoll/payRoll?balance=' + pageObj.balance">  
        <view class="box-items-select">
          <image :src="indexModuleUrl.payroll" class="items-select-pic"></image>
        </view>
        </navigator>
      </view> -->
    </view>
  </view>

  <!-- 按钮 -->
  <view class="btnBox">
		<view v-for="(item, index) in pageObj.btnList" :key="index">
			<view>
				<view class="page__bd">
					<view class="page__bd page__bd_spacing title__bd walltBtnBox"  @tap="showApplyType(index)">
						<button class="weui-btn walltBtn applyType">{{item.name}}</button>
						<view :class="[' arrowPosition' , showApply&& (showInd == index) ? 'topArrow' : 'bottomArrow']"></view>
					</view>
				</view>
			</view>
			<!-- :style="{height: typeHeight + 'px'}" -->
			<view  class="walllteListBox" v-if="showApply && (showInd == index)"  >
				<view v-for="(items, ind) in item.children" :key="ind"  class="walllteList">
					<view class="page__bd">
						<view class="page__bd page__bd_spacing title__bd walltBtnBox">
							<image :src="items.imgUrl" class="walletImg"></image>
							<button class="weui-btn walltBtn" @tap="tapClick(items.bindtap)">{{items.name}}</button>
							<view class="rightArrow arrowPosition"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
    
  </view>
  
</view>
</template>

<script>
var app = getApp();
var IndexModuleUrl = require("../../resources/utils/imageUrl.js");
export default {
  data() {
    return {
      indexModuleUrl: IndexModuleUrl,
      userInfoCach: '',
	  balance:false,
	  yearstring:'',
	  usersplite:'',
	  usermonth:'',
	  usermon:'',
	  refundSwitch:'',
      pageObj: {
				balance:0.00,
				integral:0.00,
				btnList:[]
			},
      walletImg: [IndexModuleUrl.waterWalletImg,IndexModuleUrl.waterWalletImg, IndexModuleUrl.eleWalletImg, IndexModuleUrl.yueWalletImg, IndexModuleUrl.returnWalletImg, IndexModuleUrl.recordWalletImg],
			showApply:false,  //显示充值方式
			typeHeight:300,
			showInd:-1, 
    };
  },
  onShow:function(){
  	 this.getDeductionModel();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
	  uni.$on("topaywallent", (options) => {
	    if(options){
		  this.getDeductionModel();
	    }
	  })
		  console.log('797');
		let windowHeight = app.globalData.SystemInfo.windowHeight;
		let typeHeight = windowHeight - 88 - 270
		console.log()
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
	var date = new Date();
	 this.usermonth=date.getMonth(); 
	var useryear=date.getFullYear();//进来获取的年份
	console.log(userInfoCach.username);
	var usercode=userInfoCach.username.substring(0,2);//截取学号的前面两位先去计算
	console.log(usercode);
	console.log(typeof(usercode));
	var usery=userInfoCach.username.substring(0,4);//截取学号前面4位把算出来的替换掉学号的后面两位再去和获取到的年份作比较.
	var usersend=parseInt(usercode)+3;//转换为数字类型加3
	console.log(usersend);
	console.log(typeof(usersend));
	var userstring=usersend.toString();//转换为字符串类型才好使用replace方法去替换
	var usercade=userInfoCach.username.substring(2,4);
	console.log(usercade);
	 this.usersplite=usery.replace(usercade,userstring); //算出来的学号替换掉原先学号的后面两位。
	 console.log(typeof(useryear));
	   console.log(this.usersplite);
	   this.yearstring=useryear.toString();//年份转换为字符串类型和算出来的学号作比较.
	   console.log(this.yearstring);
	   console.log(typeof(this.yearstring));
	   if(this.usersplite==this.yearstring){  //如果算出来的学号等于获取到的年份就做下一步操作。再去计算月份是否是6,7月份
		   console.log('123')
	   }else{
		   console.log('245');
	   }
		console.log(userInfoCach.username);
	// if(usersend==userye){
	// 	console.log('121')
	// }else{
	// 	console.log('245');
	// }
	//如果学号等于获取的年份
	// var tMonth = date.getMonth();
	// console.log(tMonth+1);

   
    this.setData({
      'userInfoCach': userInfoCach,
			typeHeight
    });
  },
 onBackPress: function(event) {
 	console.log(event.from);
 	if (event.from) {
 		console.log('446');
		 app.globalData.PublicUtil.switchTabByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl, 2000);
 	}
 },
  methods: {
		tapClick(tap){   //循环使用不同点击事件
			this[tap]()
		},
		showApplyType(ind){
			if(ind==2){
				console.log(this.pageObj.btnList[ind].children);
			}
			// console.log(ind)
			 console.log(ind);
			if(this.showInd == ind){
				var showApply = !this.showApply
			}else{
				var showApply = true
			}
			
			this.setData({
				showApply,
				showInd: ind
			})
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
            _this.dealPageObj(res.data.rows);
				_this.requestQueryBankCardList(userInfoCach);
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
	 * 可提取组件
	 */
	//请求查询银行卡列表
	requestQueryBankCardList:function(userInfoCach) {
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
		     console.log(res);
				if (res.data && res.data.code == 200) {
					console.log(res.data.rows.refundSwitch);
					  this.refundSwitch=res.data.rows.refundSwitch;
					console.log(this.refundSwitch);
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
	onBackPress: function(event) {
		console.log(event.from);
		if (event.from) {
			console.log('446');
			 app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl+'?noRefresh=1',100);
		}
	},
    dealPageObj: function (data) {
	var _this=this;
	
	
      this.pageObj.deductionModel = data.deductionModel;
	  
      if (data.deductionModel == 0) {
        this.pageObj.btnList = [
					{
						name:'水费',
						children:[
							{
							  name: '冷水费',
							  bindtap: 'toPayWaterFee1',
								imgUrl: IndexModuleUrl.waterWalletImg
							},
						]
					},
					{
						name:'电费', 
						children:[
							{
							  name: '照明电费',
							  bindtap: 'toPayLightEleFee',
								imgUrl: IndexModuleUrl.eleWalletLImg
							},
							{
							  name: '空调电费',
							  bindtap: 'toPayKtEleFee',
								imgUrl: IndexModuleUrl.eleWalletImg
							}, 
						]
					},
					{
						name:'余额',
						children:[
							{
							  name: '余额充值',
							  bindtap: 'toPay',
								imgUrl: IndexModuleUrl.yueWalletImg
							}
							// , {
							//   name: '余额提现',
							//   bindtap: 'toWithdraw',
							// 	imgUrl: IndexModuleUrl.returnWalletImg,
							// 	show:false
								
							// }
							, {
							  name: '消费记录',
							  bindtap: 'toConsumeRecord',
								imgUrl: IndexModuleUrl.recordWalletImg
							}
						]
					},
				
				
				
				];
      } else {
        this.pageObj.btnList = [
					{
						name:'余额',
						children:[
							{
								name: '余额充值',
								bindtap: 'toPay',
								imgUrl: IndexModuleUrl.yueWalletImg
							}
							// , 
							// {
							// 	name: '余额提现',
							// 	bindtap: 'toWithdraw',
							// 	imgUrl: IndexModuleUrl.returnWalletImg,
							// 	// show:false
							// }
							, 
							{
								name: '消费记录',
								bindtap: 'toConsumeRecord',
								imgUrl: IndexModuleUrl.recordWalletImg
							}
						]
					}
				];
      }
	  console.log( this.usermonth);
	  this.yearstring.toString();
	  // _this.yearstring=2023;
	  // console.log(this.yearstring)
	  // this.usersplite=2023
	  // this.usermonth=5;
	  // this.refundSwitch=1;
	  console.log(this.refundSwitch);
	  
	  // &&_this.refundSwitch==1&&(_this.usermonth==5)||(_this.usermonth==6)
	  	console.log(this.usersplite,this.yearstring)
		let splite  //+3
			let year //现在
		splite=this.usersplite.substring(2,4);
		year=this.yearstring.substring(2,4);
	     console.log(splite);
		 console.log(year);
		 if(year==splite){
			 console.log('11111');
		 }else{
			 console.log('22222');
		 }
		 console.log(_this.refundSwitch);
	  if((year==splite)&&(_this.usermonth==5||_this.usermonth==6)){
	  	this.pageObj.btnList = [
	  				{
	  					name:'水费',
	  					children:[
	  						{
	  						  name: '冷水费',
	  						  bindtap: 'toPayWaterFee1',
	  							imgUrl: IndexModuleUrl.waterWalletImg
	  						},
	  					]
	  				},
	  				{
	  					name:'电费', 
	  					children:[
	  						{
	  						  name: '照明电费',
	  						  bindtap: 'toPayLightEleFee',
	  							imgUrl: IndexModuleUrl.eleWalletLImg
	  						},
	  						{
	  						  name: '空调电费',
	  						  bindtap: 'toPayKtEleFee',
	  							imgUrl: IndexModuleUrl.eleWalletImg
	  						}, 
	  					]
	  				},
	  				{
	  					name:'余额',
	  					children:[
	  						{
	  						  name: '余额充值',
	  						  bindtap: 'toPay',
	  							imgUrl: IndexModuleUrl.yueWalletImg
	  						}
	  						, {
	  						  name: '余额提现',
	  						  bindtap: 'toWithdraw',
	  							imgUrl: IndexModuleUrl.returnWalletImg,
	  							show:false
	  							
	  						}
	  						, {
	  						  name: '消费记录',
	  						  bindtap: 'toConsumeRecord',
	  							imgUrl: IndexModuleUrl.recordWalletImg
	  						}
	  					]
	  				},
	  			
	  			];
	  }
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
            _this.pageObj.balance = app.globalData.PublicUtil.minuteChanageYuanBalance(res.data.rows.purseBalance.balance);
			console.log(_this.pageObj.balance);
            _this.pageObj.integral = app.globalData.PublicUtil.minuteChanageYuanBalance(res.data.rows.purseBalance.integral);
              _this.pageObj = _this.pageObj
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
    // 跳转到充值页面
    toPay:function () {
		let s=6
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toPay + '?isBalance=' + s,500);
    },
    // 跳转到退款页面
    toWithdraw: function () {
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toWithdraw +'?chargeType=6', 500);
    },
    // 跳到水费页面
    toPayWaterFee: function () {
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toPayFee + '?isWater=1', 500);
    },
		toPayWaterFee1: function(){
			app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
			app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toPayFee + '?isWater=15', 500);
		},
		// 跳到热水费缴费页面
		toPayHotWaterFee: function(){
			app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500)
			app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toPayFee + '?isWater=2', 500);
		},
			// 跳到直饮水缴费页面
		toPayzyWaterFee: function(){
			app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500)
			app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toPayFee + '?isWater=3', 500);
		},
    // 跳到电费缴费页面
    toPayComEleFee: function () {
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toPayFee + '?isWater=0', 500);
			
    },
		toPayLightEleFee: function(){
			app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
			app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toPayFee + '?isWater=4', 500);
		},
		toPayKtEleFee:function(){
			app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
			app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toPayFee + '?isWater=5', 500);
		},
    //
    toConsumeRecord: function () {
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toConsumeRecord + '?isWater=0', 500);
    }
  }
};
</script>
<style>
@import "./walletIndex.css";
</style>