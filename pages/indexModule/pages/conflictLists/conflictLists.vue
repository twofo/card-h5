<template>
<!--pages/indexModule//pages/inOrOutSchoolApply/inOrOutSchoolApply.wxml-->
<view class="page">
  <view class="page__bd" style="padding: 15rpx 10rpx;">

      <view class="weui-cells weui-cells_after-title myui-cells-items">
          <view class="weui-cell ">
              <view class="weui-cell__bd" style="color:#20a4f7">基本信息</view>
          </view>
      </view>      
      <!-- 个人信息 -->
      <view class="weui-cells weui-cells_after-title myui-cells-items" style="margin-top:6px;">
        <view class="weui-cell">
          <view class="weui-cell__hd">姓名</view>
          <view class="weui-cell__bd weui-cell__bdt">{{userInfo.name}}</view>
        </view>
        <view class="weui-cell">
            <view class="weui-cell__hd ">学号</view>
            <view class="weui-cell__bd weui-cell__bdt">{{userInfo.username}}</view>
        </view>
        <view class="weui-cell">
            <view class="weui-cell__hd">手机号</view>
            <view class="weui-cell__bd weui-cell__bdt" style="color:#20a4f7;">{{userInfo.mobile}}</view>
        </view>

      </view>

      <!-- 申请信息 -->
      <view class="weui-cells weui-cells_after-title myui-cells-items" style="margin-top:10px;">
          <view class="weui-cell ">
              <view class="weui-cell__bd" style="color:#20a4f7">申请信息</view>
          </view>
      </view>     

       <view class="weui-cells weui-cells_after-title myui-cells-items" style="margin-top:6px;">

        <view class="weui-cell ">
            <view class="weui-cell__hd">申请类型</view>
            <view class="weui-cell__bd weui-cell__bdt" v-if="applyType==1">留校申请</view>
            <view class="weui-cell__bd weui-cell__bdt" v-if="applyType==2">外宿申请</view>
			   <view class="weui-cell__bd weui-cell__bdt">退宿申请</view>
        </view>
        <view class="weui-cell">
			<view class="weui-cell__hd">退宿房间</view>
			   <view class="weui-cell__bd weui-cell__bdt">
				   <text v-if="userInfoCach.roomInfo!=null" style="font-size: 32rpx;">{{userInfoCach.roomInfo.buildName}}  - {{userInfoCach.roomInfo.floorName}} - {{userInfoCach.roomInfo.roomName}}</text>
				   <text v-else>（暂未分配寝室）</text>
			   </view>
        </view>
		<view class="weui-cells weui-cells_after-title box-top">
			<picker @change="bindPickerChange" :value="cardId" :range="bankCardList"  style="margin-top: 10rpx;">
				<view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
					<view class="weui-cell__bd">退款到</view>
					<view v-if="!PickerChange">
						<view class="weui-cell__ft weui-cell__ft_in-access">{{withdrawMsg}}</view>
					</view>
					<view v-else>
						<view class="weui-cell__ft weui-cell__ft_in-access">{{bankCardList[cardId]}}</view>
					</view>
		
				</view>
			</picker>
		
		</view>
		
		</view>
      </view> 
      <view class="page__bd page__bd_spacing button_top">
        <button class="weui-btn" type="primary" :disabled="disableBtn" form-type="submit" @tap="confirmApply">提交</button>
      </view>

  </view>
</view>
</template>

<script>
// pages/indexModule//pages/inOrOutSchoolApply/inOrOutSchoolApply.js
var app = getApp();
var ImageUrl = require("../../resources/utils/imageUrl.js");
var BankUtil = require("../../resources/utils/wallet/bankCard/util.js");
export default {
  data() {
    return {
      startTime: '',
      endTime: '',
      reason: '',
      applyType: '',
	   userInfoCach: {},
      //图片对象
      imageObj: ImageUrl,
	  PickerChange: false,
	  arrlist:[],
      disableBtn: false //点击事件阻止多次点击
      ,
	  listIotBankData: [],
      userInfo: "",
	'bankCardList': [],
	'listIotBankCard': [],
	'withdrawMsg': '请选择',
	'balance': '',
	'inputMoney': '',
	'cardId': '',
	'selectCardNumber': '',
	'disabled': true,
	  consumeValue: '0.00',
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
	  if(userInfoCach.roomInfo==null){
		 this.setData({
		 	'disableBtn': true
		 });
		 return
	  }else{
		  this.setData({
		  	'disableBtn': false
		  });
	  }
	   // this.requestQueryBankCardList(userInfoCach);
	var data = {}
	console.log(userInfoCach.roomInfo.roomId);
	var deductionModel=0;
	console.log(deductionModel);
	data = {
		roomId: userInfoCach.roomInfo.roomId,
		deductionMode: deductionModel
	}
         // this.queryBalanceGet(userInfoCach,data);
	  console.log(userInfoCach.roomInfo);
	  if (userInfoCach.roomInfo != null) {
	    let roomName = userInfoCach.roomInfo.roomName;
	    let buildName = userInfoCach.roomInfo.buildName;
		let floorName=userInfoCach.roomInfo.floorName;
	    console.log(userInfoCach);
	    console.log(roomName);
	    // roomName = roomName.length > 4 ? roomName.substring(0, 4) : roomName;
	    // buildName = buildName.length > 5 ? buildName.substring(0, 5) : buildName;
	    userInfoCach.roomInfo.roomName = roomName;
	    userInfoCach.roomInfo.buildName = buildName;
		  userInfoCach.roomInfo.floorName = floorName;
	  } // 屏幕宽度
	  this.setData({
	    userInfoCach: userInfoCach,
	   
	  }); //计算屏幕宽度比列
    if (options && options.applyType) {
      // 设置导航栏为对应导航
      // wx.setNavigationBarTitle({
      //   title: options.applyType == 1 ? "宿舍服务_留校申请" : "宿舍服务_外宿申请"
      // });
      this.setData({
        applyType: options.applyType
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	  console.log('412')
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
	 this.requestQueryBankCardList(userInfoCach);
    this.setData({
      userInfo: userInfoCach
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  methods: {
    bindStartTimeDateChange: function (e) {
      this.setData({
        startTime: e.detail.value
      });
    },
    bindEndTimeDateChange: function (e) {
      this.setData({
        endTime: e.detail.value
      });
    },
	bindPickerChange: function(e) {
		console.log(e)
		this.setData({
			'cardId': e.detail.value,
			'selectCardNumber': this.listIotBankCard[e.detail.value],
			PickerChange: true
		});
	
		this.cardId = e.detail.value
		console.log(this.listIotBankCard[e.detail.value], this.inputMoney)
	
		if (this.inputMoney > 0 && this.selectCardNumber) {
			this.setData({
				'disabled': false
			});
		} else {
			this.setData({
				'disabled': true
			});
		}
	},
	requestQueryBankCardList: function (userInfoCach) {
			app.globalData.ShowMsgUtil.netErrNotice();
	  app.globalData.ShowMsgUtil.showLoadAndMsgToast();
	  var _this = this;
	  wx.request({
	    url: app.globalData.RequestUrl.baseRequestUrl.listIotBankCard,
	    header: {
	      'token': userInfoCach.token,
	      'content-type': 'application/json' //默认值
	    },
	    method: 'POST',
	    success(res) {
	      console.log('银行卡查询列表返回', res.data);
		  if(res.data.code==200 &&userInfoCach.roomInfo!=null){
			  // console.log('res',res.data)
			  // _this.showBankInfo(res.data.rows.bankCardList)
			  _this.arrlist=res.data.rows.bankCardList;
		  if(res.data.rows.bankCardList==''){
			   wx.showModal({
			                 title: '请先绑定银行卡',
			                 success: function (res) {
			                   if (res.cancel) {
			                     //点击取消隐藏弹框停留在当前页面
			                   } else {
			                     wx.navigateTo({
			                     	url: '../bankCard/bankCard'
			                     })
			   
			                   }
			                 }
			               })
		  }
		  _this.listIotBankData = res.data.rows;
		     if (res.data.rows.bankCardList.length >= 0) {
		             // console.log(res.data.rows.bankCardList)
		             _this.setData({
		               'listIotBankCard': res.data.rows.bankCardList,
		               'withdrawMsg': '请选择'
		             }); // 生成页面展示信息
		             console.log(_this.listIotBankCard)
		             _this.showBankInfo(res.data.rows.bankCardList);
		           } else {
		  	_this.setData({
		  		'withdrawMsg': '暂无银行卡'
		  	});
		  }
			    
		  }
	    },
	
	    fail: function () {
	      app.globalData.ShowMsgUtil.showNoneToastByFail();
	    },
	    complete: function () {
	      wx.hideToast({});
	    }
	  });
	},
	toBankcard:function(){
		       
	// 		app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500)
	// app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.tobankCard);
	},
    bindInputReason: function (e) {
      this.reason = e.detail.value;
    },
	
	// queryBalanceGet:function(userInfoCach,data){
	// 	let _this=this;
	// 	console.log(data);
	// 	app.globalData.ShowMsgUtil.netErrNotice();
	// 	wx.request({
	// 	   url: app.globalData.RequestUrl.baseRequestUrl.balance,
	// 	  method: 'POST',
	// 	  header: {
	// 	    'token': userInfoCach.token
	// 	  },
	// 	  data:data,
	// 	  success: function (res) {
	// 		   let obj
	// 		  obj=res.data.rows.purseBalance.eleBalanceByRoom;
	// 		  let result = parseFloat(obj);
	// 		  result = (result / 100.0).toFixed(2);
	// 		  console.log(result);
	// 		  _this.setData({
	// 		  	consumeValue:result,
	// 		  });
	// 		  return result;
	// 	    console.log(res.data.rows.purseBalance.eleBalanceByRoom);
			   
	// 	  },
	// 	  fail: function () {
		    
	// 	  }
	// 	});
		
	// },
	// 生成页面展示信息
		showBankInfo: function(bankCard) {
				var showBankInfo = [];

				for (let i = 0; i < bankCard.length; ++i) {
					var oneBankInfo = ''; // 根据银行卡号获取信息

					var bankInfo = BankUtil.bankCardAttribution(bankCard[i].cardNumber);
					console.log('bankInfo', bankInfo)
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
			},
    bindInputAddress: function (e) {
      this.address = e.detail.value;
    },
    bindInputMobile: function (e) {
      this.mobile = e.detail.value;
    },
    confirmApply: function () {
		
      var _this = this; //防止多次点击
          console.log(_this.arrlist);
		  console.log(_this.arrlist);
		  if(_this.arrlist.length<1){
			wx.showModal({
			              title: '请先绑定银行卡',
						     confirmColor: '#20a4f7',
							 confirmText:"确定",
							 cancelText:'取消',
			              success: function (res) {
			                if (res.cancel) {
			                  //点击取消隐藏弹框停留在当前页面
			                } else {
			                  wx.navigateTo({
			                  	url: '../bankCard/bankCard'
			                  })
			
			                }
			              }
			            }) 
						return;
		  }
	app.globalData.ShowMsgUtil.netErrNotice();
      let disableBtn = true;
	  console.log(_this.selectCardNumber.cardNumber);
	  if(_this.selectCardNumber.cardNumber==undefined){
		  	app.globalData.ShowMsgUtil.showNoneToast("请先选择银行卡", 500);
		   return;
	  }
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.refundSchoolApply,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {
		  roomId:userInfoCach.roomInfo.roomId,
          username: userInfoCach.username,
          bankCard: _this.selectCardNumber.cardNumber,
		  name:userInfoCach.name,
        },
        success: function (res) {
          wx.hideToast({});
          console.log('留校、外宿申请返回', res.data);

          if (res.data && (res.data.code == 200 || res.data.code==0)) {
            app.globalData.ShowMsgUtil.showSuccessToast("申请成功", 2000); //跳转到会议列表
           app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl+'?noRefresh=1', 1000);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            _this.setData({
              disableBtn: false
            });

            return;
          }
        },
		bankCard: function(bankCard) {
			var newBankCard = bankCard.substring(bankCard.length - 4, bankCard.length);
			return newBankCard;
		}
      });
    }
  }
};
</script>
<style>
@import "./conflictLists.css";
</style>