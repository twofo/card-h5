<template>
<view class="page">   
  <view class="page__bd background-content">
    <!-- 上层 -->
    <view class="background-up" :style="'height: ' + (windowHeight*0.77) + 'rpx;'">
      <!--  -->
      <!-- <view class="background-up-top" style="height: 30px;width: {{windowWidth*0.92}}px;border-radius: 10px;"> -->
      <!-- <view class="background-up-top" style="height:96px;width: {{windowWidth*0.92}}px;border-radius: 10px;"> -->
      <!-- TODO -->
        <!-- <view class='box-items items-border'>
          <view class="items-title">周期补贴（元）</view>
          <view class="items-balance">{{pageObj.subsideByRoom}}</view>
        </view>
        <view class='box-items'>
          <view class="items-title">剩余补贴（元）</view>
          <view class="items-balance">{{pageObj.subsideByRoom}}</view>
        </view> -->
      <!-- </view> -->
      <!--  -->
      <view class="background-up-title">
        <view class="myui-cell">
          <view class="weui-cell__hd myui-cell__img"></view>
          <view class="weui-cell__bd" style="margin-left: 5px;">缴费查询</view>
          <!-- <view class="myui-cell__ft myui-cell__ft_in-access" bindtap="bindToMany">更多</view> -->
        </view>
      </view>
      <!-- 缴费人列表 -->
      <!-- <view class="background-up-list" style="height:{{windowHeight*0.45}}px;width: {{windowWidth*0.92}}px;border: 1px #f7f7f7 solid;"> -->
      <view class="background-up-list" :style="'height:' + (windowHeight*0.50) + 'px;width: ' + (windowWidth*0.92) + 'px;border: 1px #f7f7f7 solid;'">

        <view v-if="rechargeRecordList.length>0">
          <!-- <fee-lists alarmNewsList="{{rechargeRecordList}}" height="{{windowHeight*0.47-7}}" itemHeight="106"  bind:pull="bindPullUp" listLength="{{listLength}}"></fee-lists> -->
           <record-lists :alarmNewsList="rechargeRecordList" :height="windowHeight*0.57-7" @pull="bindPullUp" :listLength="listLength"></record-lists>
        </view>
        <view v-else style="margin-top:30%;">
            <view class="weui-loadmore weui-loadmore_line">
                <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
            </view>
            <view class="weui-loadmore weui-loadmore_line weui-loadmore_dot">
                <view class="weui-loadmore__tips weui-loadmore__tips_in-line weui-loadmore__tips_in-dot"></view>
            </view>
        </view>
      </view>
      <!-- 按钮 -->
      <view style="margin-top: 0px">
        <view v-if="isWater==1">
          <button class="weui-btn" style=" top: 140rpx;color: #fff;background-color: #20a4f7;" 
					:disabled="waterDisable" 
					@tap="toPayByZy(1)">水费充值</button>
        </view>
				<view v-if="isWater==15">
				  <button class="weui-btn" style=" top: 140rpx;color: #fff;background-color: #20a4f7;" 
					:disabled="waterDisable" 
					@tap="toPayByZy(15)">水费充值</button>
				</view>
        <view v-if="isWater==0">
          <button class="weui-btn" style=" top: 140rpx;color: #fff;background-color: #20a4f7;" 
					@tap="toPayByZy(2)">电费充值</button>
        </view>
				<view v-if="isWater==4">
				  <button class="weui-btn" style=" top: 80rpx;color: #fff;background-color: #20a4f7;"
					 @tap="toPayByZy(13)">照明电费充值</button>
				</view>
				<view v-if="isWater==5">
				  <button class="weui-btn" style=" top: 80rpx;color: #fff;background-color: #20a4f7;" 
					@tap="toPayByZy(2)">空调电费充值</button>
				</view>
				<view v-if="isWater==2">
					<button class="weui-btn" style=" top: 80rpx;color: #fff;background-color: #20a4f7;"  
					@tap="toPayByZy(9)">热水费充值</button>
					<button class="weui-btn" style=" top: 76rpx;color: #fff;background-color: #20a4f7;"  
					@tap="toWithdrawalByHotWater">热水费提现</button>
				</view>
				<view v-if="isWater == 3">
				  <button class="weui-btn" style=" top: 80rpx;color: #fff;background-color: #20a4f7;" 
					@tap="toPayByZy(12)">直饮水充值</button>
				</view>
      </view>
    </view>
    <!-- 下层 -->
    <!-- <view class="background-top" style="height: {{windowHeight*0.27}}px; width: 100%;background-color: rgb(32,164,247);"> -->
    <view class="background-top" :style="'height: ' + (windowHeight*0.21) + 'px; width: 100%;background-color: rgb(32,164,247);'">
      <view class="box-show-msg">
        <view class="box-show-balance"> 
          <text>当前余额（元）</text>
        </view>
        <view class="box-show-money"> 
          {{pageObj.balanceByRoom}} 
        </view>
      </view>
    </view>

  </view>
</view>
</template>

<script>
var app = getApp();
import recordLists from "../../resources/components/recordList/recordList";
export default {
  data() {
    return {
      windowHeight: '',
      windowWidth: '',
      rechargeRecordList: [],
			isWater:-1,
      pageObj: {
				isWater:-1
			},
      // 1. 定义请求次数（即下拉刷新）
      pullDownNumber: 0,
      listLength: 1,
      // 用于判断已经查询所有数据
      waterDisable: false,
			rechargeType:-1
    };
  },

  components: {
    recordLists
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  console.log('4654');
    console.log('iswater的值--------------------------------',options.isWater);
    this.pageObj.isWater = options.isWater;
    this.rechargeType = 110;

    if (options.isWater && options.isWater == 1) {
      wx.setNavigationBarTitle({
        title: '一卡通_冷水费缴费'
      });
      this.rechargeType = 1; // 获取充值记录

      this.getRechargeRecord(1, 5, 0);
    } else if (options.isWater && options.isWater == 0) {
      wx.setNavigationBarTitle({
        title: '一卡通_电费缴费'
      });
      this.rechargeType = 2; // 获取充值记录

      this.getRechargeRecord(2, 5, 0);
    } else if (options.isWater && options.isWater == 2) {
      wx.setNavigationBarTitle({
        title: '一卡通_热水费缴费'
      });
      this.rechargeType = 9; // 获取充值记录

      this.getRechargeRecord(9, 5, 0);
    }	 else if (options.isWater && options.isWater == 3) {
      wx.setNavigationBarTitle({
        title: '一卡通_直饮水缴费'
      });
      this.rechargeType = 12; // 获取充值记录

      this.getRechargeRecord(12, 5, 0);
    } else if(options.isWater && options.isWater == 4){
			wx.setNavigationBarTitle({
			  title: '一卡通_照明电费缴费'
			});
			this.rechargeType = 13; // 获取充值记录
			
			this.getRechargeRecord(13, 5, 0);
		}else if(options.isWater && options.isWater == 5){
			wx.setNavigationBarTitle({
			  title: '一卡通_空调电费缴费'
			});
			this.rechargeType = 2; // 获取充值记录
			
			this.getRechargeRecord(2, 5, 0);
		}else if(options.isWater && options.isWater == 15){
      wx.setNavigationBarTitle({
        title: '一卡通_冷水费缴费'
      });
      this.rechargeType = 15; // 获取充值记录
      
      this.getRechargeRecord(15, 5, 0);
    }else{
			app.globalData.ShowMsgUtil.showNoneToast("数据异常，请稍后再试", 2000);
			app.globalData.PublicUtil.navigateBack();
		}

    this.isWater = options.isWater;	
    this.setData({
      pageObj: this.pageObj,
			isWater: options.isWater,
    });
  },
  onBackPress:function(e){
	  console.log(e);
	  uni.$emit("topaywallent", {
	  	value: 3,
	  })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	  console.log('456');
    var _this = this;
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight,
      windowWidth: wx.getSystemInfoSync().windowWidth
    }); // 获取余额缓存
		
    _this.pageObj.balanceByRoom = this.utilByBalance(0);
    _this.pageObj.subsideByRoom = this.utilByBalance(0);
    const purseBalanceCach = app.globalData.StorageUtil.get('purseBalanceCach');
    // if (purseBalanceCach != null) {
      this.getDeductionModel(userInfoCach);
   //  } else {
   //    if (this.isWater == 1) {
   //      _this.pageObj.balanceByRoom = this.utilByBalance(purseBalanceCach.waterBalanceByRoom);
   //      _this.pageObj.subsideByRoom = this.utilByBalance(purseBalanceCach.waterSubsideByRoom);
   //    } else if (this.isWater == 0) {
   //      _this.pageObj.balanceByRoom = this.utilByBalance(purseBalanceCach.eleBalanceByRoom);
   //      _this.pageObj.subsideByRoom = this.utilByBalance(purseBalanceCach.eleSubsideByRoom);
   //    } else if(this.isWater == 2){
			// 	_this.pageObj.balanceByRoom = this.utilByBalance(purseBalanceCach.hotWaterBalance);
			// 	_this.pageObj.subsideByRoom = this.utilByBalance(purseBalanceCach.hotWaterSubside);
			// }else if(this.isWater == 3){  // 未完成
			// 	_this.pageObj.balanceByRoom = this.utilByBalance(purseBalanceCach.drinkingWaterFee);
			// 	// _this.pageObj.subsideByRoom = this.utilByBalance(purseBalanceCach.hotWaterSubside);
			// }else if(this.isWater == 4){  // 未完成
			// 	_this.pageObj.balanceByRoom = this.utilByBalance(purseBalanceCach.lightingEleFeeByRoom);
			// 	// _this.pageObj.subsideByRoom = this.utilByBalance(purseBalanceCach.hotWaterSubside);
			// }else if(this.isWater == 5){  // 未完成
			// 	_this.pageObj.balanceByRoom = this.utilByBalance(purseBalanceCach.conditionerEleFeeByRoom);
			// 	// _this.pageObj.subsideByRoom = this.utilByBalance(purseBalanceCach.hotWaterSubside);
			// }else if(this.isWater == 15){
			// 	_this.pageObj.balanceByRoom = this.utilByBalance(purseBalanceCach.waterWhsfBalanceByRoom);
			// }
   //  }
		console.log('页面返回获取数据', this.pageObj)
		console.log(this.rechargeType);
		
    this.getRechargeRecord(this.rechargeType, 5, 0);
    this.setData({
      pageObj: _this.pageObj
    });
  },
  //下拉更新
  onPullDownRefresh: function () {
    var _this = this;

    _this.setData({
      rechargeRecordList: [],
      pullDownNumber: 0
    });

    let rechargeType = this.rechargeType;
    this.getRechargeRecord(rechargeType, 5, 0);
	console.log(rechargeType);
  },
  methods: {
    /**
     * 跳转到更多
     */
    bindToMany: function () {
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toPayFeeList, 500);
    },
    /**
     * 去充值水费
     */
    toPayByWater: function () {
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toPay + '?isWater=1', 500);
    },
    toPayByEle: function () {
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toPay + '?isWater=0', 500);
    },
		/**
		 * 去充值热水费
		 */
		toPayByHotWater: function () {
			app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500)
			app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toPay + '?isWater=2', 500);
		},
		toPayByZy: function(e){
			app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500)
			console.log("正在跳转地址:"+app.globalData.PageUrl.indexPageUrl.toPay + '?isWater='+e);
			app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toPay + '?isWater='+e, 500);
		},
		/**
		 * 去热水费提现
		 * chargeType、费用类型。6余额、9热水费
		 */
		toWithdrawalByHotWater: function(){   
			let balan = app.globalData.StorageUtil.get('purseBalanceCach').hotWaterBalance
			let balance = app.globalData.PublicUtil.minuteChanageYuanBalance(balan)
			app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500)
			app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toWithdraw + '?balance='+balance + '&chargeType=9' , 500) ;
		},
    /**
     * 获取指定充值记录返回
     */
    getRechargeRecord: function (rechargeType, take, skip) {
		console.log('7899');
		console.log(rechargeType, take, skip);
      var _this = this;
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let roomInfo = userInfoCach.roomInfo;
	  console.log(roomInfo);
      if (roomInfo == null && (rechargeType == 1 || rechargeType == 12 || rechargeType == 15) ) {
        return;
		var urls = '?rechargeType=' + rechargeType + '&take=' + take + '&skip=' + skip + '&roomId=' + userInfoCach.roomInfo.roomId + '&bodyType=0'
      }else if(rechargeType == 1 || rechargeType == 12 || rechargeType == 15){
				var urls = '?rechargeType=' + rechargeType + '&take=' + take + '&skip=' + skip + '&roomId=' + userInfoCach.roomInfo.roomId + '&bodyType=0'
			}else {
				console.log('7458');
				// if(rechargeType == 9 || rechargeType == 2 || rechargeType == 12)
				var urls = '?rechargeType=' + rechargeType + '&take=' + take + '&skip=' + skip + '&bodyType=1'
				
			}
			console.log(urls)
      this.getChargeList(urls )
    },
		getChargeList(urls){
			var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
			let listLength = _this.rechargeRecordList.length;
			const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
			console.log(userInfoCach);
			wx.request({
			  url: app.globalData.RequestUrl.baseRequestUrl.getRechargeRecord + urls,
			  method: 'GET',
			  header: {
			    'token': userInfoCach.token
			  },
			  success: function (res) {
			    console.log('获取指定充值记录返回', res.data);
				console.log(res.data.rows);
			    if (res.data && res.data.code == 200) {
			      if (res.data.rows.length > 0) {
			        _this.pullDownNumber++;
					console.log(res.data.rows);
			        let rechargeRecordList = _this.dealRecord(res.data.rows);
			                 console.log(rechargeRecordList);
			        _this.setData({
			          listLength: listLength,
			          rechargeRecordList: rechargeRecordList
			        });
			      }
			    } else {
			      // app.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
			      return;
			    }
			  },
			  fail: function () {
			    app.globalData.ShowMsgUtil.showNoneToastByFail();
			  }
			});
		},
    // 处理充值记录
    dealRecord: function (list) {
      let array = [];
      for (let i = 0; i < list.length; i++) {
        let obj = {};
        obj.name = list[i].username;
        obj.time = list[i].rechargeTime;
		obj.refun=false;
		obj.itemsright='itemsright';
		if(list[i].status==6){
			 obj.refun=true;
		}else{
			obj.refun=false;
		}
        obj.status = list[i].status == 1 ? "充值失败" : "充值成功";
        let flag = list[i].status == 1 ? '- ' : '+ ';
        obj.money = flag + this.utilByBalance(list[i].rechargeSum);
		if(obj.refun==true){
		
		}
        obj.reChargeOrderCode = list[i].reChargeOrderCode;
        array[i] = obj;
      } // console.log('rechargeRecordList', array);
      return array;
    },
    // 计算余额
    utilByBalance: function (money) {
      let result = parseFloat(money);
      result = (result / 100.0).toFixed(2);
      return result;
	  
    },

    /**
     * 余额及积分的查询
     */
    queryBalance: function (userInfoCach, deductionModel) {
      var _this = this;
			var data = {}
      let roomInfo = userInfoCach.roomInfo;
      if (roomInfo == null && this.rechargeType != 9) {
        return;
      } else if(this.rechargeType == 9){
				data = {
					 deductionMode: deductionModel
				}
			}else{
				data = {
					roomId: userInfoCach.roomInfo.roomId,
					deductionMode: deductionModel
				}
			}
			this.queryBalanceGet(userInfoCach,data)
    },

		queryBalanceGet(userInfoCach,data){
			let _this = this
			app.globalData.ShowMsgUtil.netErrNotice();
			wx.request({
			  url: app.globalData.RequestUrl.baseRequestUrl.balance,
			  method: 'POST',
			  header: {
			    'token': userInfoCach.token
			  },
			  data: data,
			  success: function (res) {
			    console.log('余额及积分的查询返回', res.data);
			    if (res.data && res.data.code == 200) {
			      app.globalData.StorageUtil.set('purseBalanceCach', res.data.rows.purseBalance);
						let obj = {}, pObj ={};
			      if (_this.isWater == 1) {
			        obj.balanceByRoom = _this.utilByBalance(res.data.rows.purseBalance.waterBalanceByRoom);
			        obj.subsideByRoom = _this.utilByBalance(res.data.rows.purseBalance.waterSubsideByRoom);
			      } else if (_this.isWater == 0) {
			        obj.balanceByRoom = _this.utilByBalance(res.data.rows.purseBalance.eleBalanceByRoom);
			        obj.subsideByRoom = _this.utilByBalance(res.data.rows.purseBalance.eleSubsideByRoom);
			      } else if(_this.isWater == 3){ //直饮水缴费
							obj.balanceByRoom = _this.utilByBalance(res.data.rows.purseBalance.drinkingWaterFee);
						}else if(_this.isWater == 2){ // 热水
							obj.balanceByRoom = _this.utilByBalance(res.data.rows.purseBalance.hotWaterBalance);
							obj.subsideByRoom = _this.utilByBalance(res.data.rows.purseBalance.hotWaterSubside);
						}	else if(_this.isWater == 4){ //照明电费缴费
							obj.balanceByRoom = _this.utilByBalance(res.data.rows.purseBalance.lightingEleFeeByRoom);
						} else if(_this.isWater == 5){ //空调电费缴费
							obj.balanceByRoom = _this.utilByBalance(res.data.rows.purseBalance.eleBalanceByRoom);
						}else if(_this.isWater == 15){ // 盛帆冷水
							obj.balanceByRoom = _this.utilByBalance(res.data.rows.purseBalance.waterWhsfBalanceByRoom);
						}else {
			        obj.balanceByRoom = _this.utilByBalance(0);
			        obj.subsideByRoom = _this.utilByBalance(0);
			      }
			      _this.setData({
			        pageObj: obj
			      });
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
          console.log('获取扣费模式返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.pageObj.deductionModel = res.data.rows.deductionModel;

            _this.setData({
              pageObj: _this.pageObj
            });
						console.log('获取数据余额',res.data.rows.deductionModel)
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
		 * 上拉更新 
		 */
    bindPullUp: function () {
		console.log('7845');
      // let rechargeType = this.pageObj.isWater == 1 ? 1 : 2;
	  console.log(this.rechargeType);
      this.getRechargeRecord(this.rechargeType, (this.pullDownNumber + 1) * 5, 0);
    }
  }
};
</script>
<style>
@import "./toPayFee.css";
</style>