<template>
<view>
<!--pages/indexModule//pages/inOrOutSchoolDetail/inOrOutSchoolDetail.wxml-->
<view class="weui-cells weui-cells_after-title">
  <view class="weui-cell">
    <!-- <view class="weui-cell__hd">
      <image src="{{pageObj.statusImage}}" style="margin-right: 5px;vertical-align: middle;width:23px; height: 25px;"></image>
    </view> -->
    <view class="weui-cell__bd" style="margin: 0rpx 10rpx;color:#20a4f7">{{pageObj.statusName}}</view>
  </view>
</view>


<view class="weui-cells weui-cells_after-title" style="font-size:15px;border: 1px white solid;">
  <view class="weui-cell" style="font-size:18px;font-weight:700;">{{pageObj.title}}</view>
  <view class="myui-cell">
    <view class="myui-cell__bd">申请人：</view>
    <view class="myui-cell__bf">{{pageObj.applyUserName}}</view>
  </view>
  <view class="myui-cell">
    <view class="myui-cell__bd">申请时间：</view>
    <view class="myui-cell__bf">{{pageObj.time}}</view>
  </view>
<!--  <view class="myui-cell">
    <view class="myui-cell__bd">申请原因：</view>
    <view class="myui-cell__bf">{{pageObj.reason}}</view>
  </view> -->
  <view class="myui-cell">
    <view class="myui-cell__bd">银行卡号：</view>
    <view class="myui-cell__bf">{{pageObj.bankCard}}</view>
  </view>
  <view class="myui-cell">
    <view class="myui-cell__bd">退款金额：</view>
    <view class="myui-cell__bf">{{pageObj.money}}元</view>
  </view>
  <view class="myui-cell">
    <view class="myui-cell__bd">退款类型：</view>
    <view class="myui-cell__bf">{{pageObj.stype}}</view>
  </view>
  <view class="myui-cell" style="font-size:14px;">
    <view class="weui-cell__bd"></view>
    <view class="weui-cell__ft">发布于 {{pageObj.applyTime}}</view>
  </view>

</view>
<block v-if="pageObj.status == -1">
  <!-- 未通过审核内容 -->
  <view class="weui-cells">
    <view class="myui-cell" style="font-size:14px;padding-top:20rpx;">
      <view class="myui-cell__bd">审核人：</view>
      <view class="weui-cell__bf objection">{{pageObj.approvalInfo.approvalUserName}}</view>
    </view>
    <view class="myui-cell" style="font-size:14px;">
      <view class="myui-cell__bd">不通过的原因：</view>
      <view class="weui-cell__bf objection">{{pageObj.approvalInfo.refuseReason}}</view>
    </view>
    <view class="myui-cell" style="font-size:14px; ">
      <view class="weui-cell__bd"></view>
      <view class="weui-cell__ft">审核于 {{pageObj.approvalInfo.approvalTime}}</view>
    </view>
  </view>

</block>
</view>
</template>

<script>
// pages/indexModule//pages/inOrOutSchoolDetail/inOrOutSchoolDetail.js
var app = getApp();

export default {
  data() {
    return {
      pageObj: {},
      recordId: '',
	  commentdata:[],
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	     this.commentdata=app.globalData.StorageUtil.get('inOrOut');
		 console.log(this.commentdata);
		 this.pageObj=this.commentdata;
		 this.dealPageObj(this.pageObj)
		 console.log(this.pageObj);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  methods: {
    dealPageObj: function (row) {
		console.log(row)
		console.log(row.name);
      let obj = {};
		  obj.id = row.id;
		  obj.title = row.title;
		  obj.status = row.status;
		  // obj.statusName = this.handleStatus(row.status);
		  obj.statusName = this.handleStatus(row.refundStatus)
		  obj.applyTime = row.createTime;
		  obj.applyUserName = row.name;
		  obj.time = row.createTime;
		  let result=parseFloat(row.money);
		   result = (result / 100.0).toFixed(2);
		   obj.money =result;
		  obj.bankCard=row.bankCard;
		  let stype;
		  
		  if(row.refundType==1){
			   stype='水费'
		  }else{
			  stype='电费'
		  }
		  obj.stype=stype;
		  let approvalInfo = {};
		  obj.approvalInfo = approvalInfo;
		  this.setData({
		    pageObj: obj
		  });  
		  console.log("页面显示数据 - ", obj);
		  return obj;
	  
    },
    handleStatus: function (status) {
		console.log(status);
      switch (status) {
        case 1:
          return "未审批";

        case 2:
          return "审批中";

        case 3:
          return "审批通过";
		  
		  case 4:
		    return "审批拒绝";
        default:
          return "未知";
      }
    }
  }
};
</script>
<style>
@import "./inOrOut.css";
</style>