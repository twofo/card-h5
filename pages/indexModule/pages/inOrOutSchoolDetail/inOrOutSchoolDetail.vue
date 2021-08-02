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
    <view class="myui-cell__bd">申请时间段：</view>
    <view class="myui-cell__bf">{{pageObj.time}}</view>
  </view>
  <view class="myui-cell">
    <view class="myui-cell__bd">申请原因：</view>
    <view class="myui-cell__bf">{{pageObj.reason}}</view>
  </view>
  <view class="myui-cell">
    <view class="myui-cell__bd">{{pageObj.addressName}}：</view>
    <view class="myui-cell__bf">{{pageObj.address}}</view>
  </view>
	<view class="myui-cell">
		<view class="myui-cell__bd">{{pageObj.phoneName}}：</view>
		<view class="myui-cell__bf">{{pageObj.phone}}</view>
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
      recordId: ''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options && options.recordId) {
      this.handleDetailRecord(options.recordId);
    }
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
    handleDetailRecord: function (recordId) {
      console.log("recordId - ", recordId);
						app.globalData.ShowMsgUtil.netErrNotice();
      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.inOrOutSchoolDetail + '?recordId=' + recordId,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取申请详情返回', res.data);

          if (res.data && res.data.code == 200) {
            let obj = _this.dealPageObj(res.data.data);

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
		
    dealPageObj: function (row) {
		console.log(row)
      let obj = {};
      obj.id = row.id;
	  console.log(row.id);
      obj.title = row.title;
      obj.status = row.status;
      obj.statusName = this.handleStatus(row.status);
      obj.applyTime = row.applyTime;
      obj.applyUserName = row.applyUserName;
      obj.time = row.applyStartTime + ' - ' + row.applyEndTime;
      obj.reason = row.applyReason;

      if (row.applyType == 1) {
        obj.addressName = "家庭地址";
        obj.address = row.address;
        obj.phoneName = "父/母电话";
        obj.phone = row.phone;
      } else {
        obj.addressName = "外宿地址";
        obj.address = row.address;
        obj.phoneName = "房东电话";
        obj.phone = row.phone;
      }
      obj.approvalUserName = row.applyUserName;
      obj.approvalUserPhone = row.approvalUserPhone;
      let approvalInfo = {};
      approvalInfo.approvalUserName = row.approvalUserName;
      approvalInfo.approvalUserPhone = row.approvalUserPhone;
      approvalInfo.refuseReason = row.refuseReason == "" || row.refuseReason == "" ? "暂无" : row.refuseReason;
      approvalInfo.approvalTime = row.approvalTime;
      obj.approvalInfo = approvalInfo;
      console.log("页面显示数据 - ", obj);
	  console.log(typeof(obj));
      return obj;
    },
    handleStatus: function (status) {
      switch (status) {
        case -1:
          return "审核拒绝";

        case 0:
          return "申请中";

        case 1:
          return "审核通过";

        default:
          return "未知";
      }
    }
  }
};
</script>
<style>
@import "./inOrOutSchoolDetail.css";
</style>