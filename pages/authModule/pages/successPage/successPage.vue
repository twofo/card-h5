<template>
<view class="page">
    <view class="weui-msg">
        <view class="weui-msg__icon-area">
            <icon type="success" size="75" :color="color"></icon>
        </view>
        <view class="weui-msg__text-area">
            <view class="weui-msg__title">{{successNotice}}</view>
            <view class="weui-msg__desc myui-text">
              {{title}}
              <text>{{value}}</text>
            </view>
        </view>
        <view class="weui-msg__opr-area" v-if="showFinish">
            <view class="weui-btn-area">
                <button class="weui-btn" :disabled="disabled" type="primary" @tap="confirm">完 成</button>
            </view>
        </view>

        <view class="weui-msg__text-area" v-if="orderNotice">
          <view class="line"></view>
          <view class="weui-msg__title">{{orderNotice}}</view>

          <view class="myui-cell">
            <view class="myui-cell__bd contTitle">订单号：</view>
            <view class="myui-cell__bf">{{appointmentId}}</view>
          </view>

          <view class="myui-cell">
            <view class="myui-cell__bd contTitle">预约人：</view>
            <view class="myui-cell__bf">{{appiontmentUserName}}</view>
          </view>

          <view class="myui-cell">
            <view class="myui-cell__bd contTitle">预约时间：</view>
            <view class="myui-cell__bf">{{appointmentTime}}</view>
          </view>

          <!-- <view class="myui-cell">
            <view class="myui-cell__bd contTitle">支付金额：</view>
            <view class="myui-cell__bf">{{deductionMoney}}元</view>
          </view> -->

          <view class="myui-cell orderBtnBox">
            <!-- <view class="orderBtn" bindtap="gotoList">取消预约</view> -->
            <view class="orderBtn" @tap="gotoList">回到首页</view>
          </view>

        </view>

        


    </view>
</view>
</template>

<script>
var app = getApp();

export default {
  data() {
    return {
      pageUrl: '',
      color: '#10aeff',
      successNotice: "操作成功",
      showFinish: true,
      orderNotice: false,
      disabled: false,
      //阻止多次点击事件
      backPage: "",
      roomType: 2 //琴房 2 练功房 3
      ,
      appiontmentUserName: "",
      appointmentId: "",
      appointmentTime: "",
      deductionMoney: "",
      title: "",
      value: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    if (options.appointmentId) {
			
      this.setData({
        successNotice: "预约成功",
        showFinish: false,
        orderNotice: true,
        orderNotice: '订单信息',
        appiontmentUserName: options.appointmentUserName,
        appointmentId: options.appointmentId,
        appointmentTime: options.appointmentTime,
        deductionMoney: options.deductionMoney,
        roomType: options.roomType
      });
			if(options.roomType == 2 ){
				uni.setNavigationBarTitle({
				  title: "公共资源_琴房预约_预约成功"
				});
			}else{
				uni.setNavigationBarTitle({
				  title: "公共资源_练功房预约_预约成功"
				});
			}
    }

    if (options.cancelMsg) {
      this.setData({
        successNotice: "提交成功",
        title: options.cancelMsg,
        backPage: options.backPage
      });
			if(options.roomType == 2){
				uni.setNavigationBarTitle({
				  title: "公共资源_琴房预约记录_取消成功"
				});
			}else{
				uni.setNavigationBarTitle({
				  title: "公共资源_练功房预约记录_取消成功"
				});
			}
    }

    if (options.title) {
      this.setData({
        title: options.title,
        value: options.value,
        pageUrl: options.pageUrl
      });
			
    }
  },
  methods: {
    /**
     * 
     */
    confirm: function () {
      this.setData({
        disabled: true
      });
			console.log(this.pageUrl)
			console.log(this.backPage)

      if (this.pageUrl == '') {
        let deltas = this.backPage == '' ? 1 : parseInt(this.backPage);
				console.log(deltas)
        uni.navigateBack({
          delta: deltas
        });
      } else {
        app.globalData.PublicUtil.reLaunchByUrl(this.pageUrl, 500);
      }
    },

    gotoList() {
		
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500); // 

      // app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoListUrl + "?type=" + this.roomType, 500);
			uni.reLaunch({
				url:"../../../tarBarModule/index/index"
			})
    }
   
  }
};
</script>
<style>
@import "./successPage.css";
</style>