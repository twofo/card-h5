<template>
<view>
<view class="page__bd detail-box">

  <view class="weui-cell" v-if="pageObj.isNoCheckMeeting">
    <view class="weui-cell__bd">签到结果</view>
  </view>

  <view class="weui-cell" v-if="!pageObj.isNoCheckMeeting && pageObj.applyType">
    <view class="weui-cell__bd">会议状态</view>
  </view>

  <text v-if="pageObj.isNoCheckMeeting" class="detail-text">打卡时间段：{{pageObj.meetingCheckedTime}}</text>

  <view class="detail-text" v-if="pageObj.showResiss">注:
    迟到补卡时间为会议开始后{{pageObj.meetingCanSupplementTime}}分钟,超时不能补卡,若有需要请联系管理员。</view>


  <!-- 内容信息 -->

  <view class="detail-box-day">

    <!-- 请假信息 start -->
    <view class="leaveInfo" v-if="!pageObj.passRessuie">
      <view class="myui-flex" style="align-items:center;" v-if="pageObj.applyType">
        <icon :type="pageObj.icons" v-if="pageObj.icons" :color="pageObj.statusColors" size="15" style="margin-right:20rpx"></icon>
        <view class="myui-cell__tb" :style="'color:' + pageObj.statusColors">{{pageObj.applyType}} <text class="applyLeaveTimes" v-if="pageObj.applyTimes">({{pageObj.applyStatus}}次数: {{pageObj.applyTimes}})</text> </view>

      </view>
      <view class="myui-flex applyReason" v-if="pageObj.applyType">
        <view class="myui-cell__bd " style="color:#999; ">原因：</view>
        <view class="myui-cell__bf">{{pageObj.applyReason}}</view>
      </view>

      <view class="myui-flex" style="font-size:12px;" v-if="pageObj.applyTime">
        <view class="weui-cell__bd"></view>
        <view class="weui-cell__ft">申请于 {{pageObj.applyTime}}</view>
      </view>

      <view class="myui-flex " v-if="pageObj.fircheckType">
        <icon :type="pageObj.firresicon" :color="pageObj.firresColor" size="15" style="margin-right:20rpx"></icon>
        <view class="myui-cell__bd" :style="'color:' + pageObj.firresColor + ';width: 100%;'">{{pageObj.fircheckType}}</view>
      </view>

      <view v-if="pageObj.handlerTime != null" class="myui-flex" style="font-size:12px;">
        <view class="weui-cell__bd"></view>
        <view class="weui-cell__ft">审核于 {{pageObj.handlerTime}}</view>
      </view>


      <view class="myui-flex ">
        <icon :type="pageObj.Leicon" :color="pageObj.statusLeColor" size="15" style="margin-right:20rpx"></icon>
        <view class="myui-cell__bd" :style="'color:' + pageObj.statusLeColor">{{pageObj.statusLeName}}</view>
      </view>
      <view class="myui-flex" v-if="pageObj.LecheckedTime">
        <view class="myui-cell__bd">打卡时间：</view>
        <view class="myui-cell__bf">{{pageObj.LecheckedTime}}</view>
      </view>
      <view class="myui-flex" v-if="pageObj.LeMeetingRoomName">
        <view class="myui-cell__bd">地 址：</view>
        <view class="myui-cell__bf">{{pageObj.LeMeetingRoomName}}</view>
      </view>
      <view class="center_detail" v-if="pageObj.Lename">
        <view class="box-status">
          <text class="center_text yes" :style="'background:' + pageObj.LemeetingTypeNameColor">{{pageObj.Lename}}</text>
        </view>
      </view>

    </view>
    <!-- 请假信息 end -->

    <!-- 考勤信息 start 请假同意是不显示-->
    <view class="secondApply" v-if="!pageObj.passLeave">
      <view class="myui-cell myui-icon">
        <icon :type="pageObj.finallicon" :color="pageObj.finallColor" size="15" style="margin-right:20rpx"></icon>
        <view class="myui-cell__bd" :style="'color:' + pageObj.finallColor">{{pageObj.finallName}}</view>
      </view>
      <view class="myui-cell">
        <view class="myui-cell__bd">打卡时间：</view>
        <view class="myui-cell__bf">{{pageObj.fircheckedTime || pageObj.checkedTime}}</view>
      </view>
      <view class="myui-cell" v-if="pageObj.finalMeetingRoomName">
        <view class="myui-cell__bd">地 址：</view>
        <view class="myui-cell__bf">{{pageObj.finalMeetingRoomName}}</view>
      </view>
      <view class="center_detail">
        <view class="box-status">
          <text class="center_text yes" :style="'background:' + pageObj.finallmeetingTypeNameColor">{{pageObj.finallname}}</text>
        </view>
        <text v-if="pageObj.refSign" class="box-status-right weui-cell__ft_in-access" :data-id="pageObj.meetingId" :data-plan-id="pageObj.executePlanId" @tap="toSign">{{pageObj.refSign}}</text>

        <text v-if="pageObj.refCard" class="box-status-right weui-cell__ft_in-access" :data-id="pageObj.meetingId" data-apply="refCard" :data-plan-id="pageObj.executePlanId" :data-index="pageObj.ressiueTimes" @tap="toReissueApply">{{pageObj.refCard}}</text>
      </view>
    </view>
    <!-- 考勤信息 end-->

    <!-- 补签信息 start -->
    <view class="leaveInfo">
      <view class="myui-flex" style="align-items:center;" v-if="pageObj.ressiueType">
        <icon :type="pageObj.ressiueicons" v-if="pageObj.ressiueicons" :color="pageObj.ressiueColors" size="15" style="margin-right:20rpx"></icon>
        <view class="myui-cell__tb" :style="'color:' + pageObj.statusColors">{{pageObj.ressiueType}} <text class="applyLeaveTimes" v-if="pageObj.ressiueTimes">({{pageObj.ressiueStatus}}次数: {{pageObj.ressiueTimes}})</text> </view>

      </view>
      <view class="myui-flex applyReason" v-if="pageObj.ressiueType">
        <view class="myui-cell__bd " style="color:#999; ">原因：</view>
        <view class="myui-cell__bf">{{pageObj.ressiueReason}}</view>
      </view>

      <view class="myui-flex" style="font-size:12px;" v-if="pageObj.ressiueTime">
        <view class="weui-cell__bd"></view>
        <view class="weui-cell__ft">申请于 {{pageObj.ressiueTime}}</view>
      </view>

      <view class="myui-flex " v-if="pageObj.ressiuecheckType">
        <icon :type="pageObj.ressiueresicon" :color="pageObj.ressiueresColor" size="15" style="margin-right:20rpx"></icon>
        <view class="myui-cell__bd" :style="'color:' + pageObj.ressiueresColor + ';width: 100%;'">{{pageObj.ressiuecheckType}}
        </view>
      </view>

      <view v-if="pageObj.ressiuehandlerTime != null" class="myui-flex" style="font-size:12px;">
        <view class="weui-cell__bd"></view>
        <view class="weui-cell__ft">审核于 {{pageObj.ressiuehandlerTime}}</view>
      </view>

      <!-- 补卡审批之后 -->
      <view class="myui-flex" v-if="pageObj.finallReName">
        <icon :type="pageObj.finallReicon" :color="pageObj.finallReColor" size="15" style="margin-right:20rpx"></icon>
        <view class="myui-cell__bd" :style="'color:' + pageObj.finallReColor">{{pageObj.finallReName}}</view>
      </view>
      <view class="myui-flex" v-if="pageObj.RecheckedTime">
        <view class="myui-cell__bd">打卡时间：</view>
        <view class="myui-cell__bf">{{pageObj.RecheckedTime}}</view>
      </view>
      <view class="myui-flex" v-if="pageObj.ReMeetingRoomName">
        <view class="myui-cell__bd">地 址：</view>
        <view class="myui-cell__bf">{{pageObj.ReMeetingRoomName}}</view>
      </view>
      <view class="center_detail" v-if="pageObj.finallRename">
        <view class="box-status">
          <text class="center_text yes" :style="'background:' + pageObj.RemeetingTypeNameColor">{{pageObj.finallRename}}</text>
        </view>
      </view>


    </view>
    <!-- 补签信息 end -->

    <!-- 考勤信息 start 补卡成功显示-->
    <view class="secondApply" v-if="pageObj.nopassRessuie">
      <view class="myui-cell myui-icon">
        <icon :type="pageObj.finallicon" :color="pageObj.finallColor" size="15" style="margin-right:20rpx"></icon>
        <view class="myui-cell__bd" :style="'color:' + pageObj.finallColor">{{pageObj.finallName}}</view>
      </view>
      <view class="myui-cell">
        <view class="myui-cell__bd">打卡时间：</view>
        <view class="myui-cell__bf">{{pageObj.fircheckedTime || pageObj.checkedTime}}</view>
      </view>
      <view class="myui-cell" v-if="pageObj.finalMeetingRoomName">
        <view class="myui-cell__bd">地 址：</view>
        <view class="myui-cell__bf">{{pageObj.finalMeetingRoomName}}</view>
      </view>
      <view class="center_detail">
        <view class="box-status">
          <text class="center_text yes" :style="'background:' + pageObj.finallmeetingTypeNameColor">{{pageObj.finallname}}</text>
        </view>
        <text v-if="pageObj.refSign" class="box-status-right weui-cell__ft_in-access" :data-id="pageObj.meetingId" :data-plan-id="pageObj.executePlanId" @tap="toSign">{{pageObj.refSign}}</text>

        <text v-if="pageObj.refCard" class="box-status-right weui-cell__ft_in-access" :data-id="pageObj.meetingId" :data-plan-id="pageObj.executePlanId" :data-index="pageObj.ressiueTimes" @tap="toReissueApply">{{pageObj.refCard}}</text>
      </view>
    </view>
    <!-- 考勤信息 end-->

   

  </view>
</view>
<view class="relations" :data-phone="pageObj.mobile" @tap="toCreatorPhone"> 如有疑问，请联系 <text>管理员</text> </view>






<!-- <view wx:if="{{!pageObj.isApply}}" class="secondApply"> -->
<!-- <view style="font-size:15px; margin-top: 10rpx;"> -->
<!-- <view class="myui-cell myui-icon">
          <icon type="{{pageObj.icon}}" color="{{pageObj.statusColor}}" size="15" style="margin-right:20rpx"></icon>
          <view class="myui-cell__bd" style="color:{{pageObj.statusColor}}">{{pageObj.statusName}}</view>
          <view class="myui-cell__bf"></view>
        </view>
        <view class="myui-cell" wx:if='{{pageObj.fircheckTime}}'>
          <view class="myui-cell__bd">打卡时间：</view>
          <view class="myui-cell__bf">{{pageObj.fircheckTime}}</view>
        </view>
        <view class='center_detail'>
          <view class='box-status'>
            <text class="center_text yes" style="background:{{pageObj.meetingTypeNameColor}}">{{pageObj.name}}</text>
            <text wx:if="{{pageObj.refCard}}" class="box-status-right weui-cell__ft_in-access" data-id="{{pageObj.meetingId}}" data-plan-id="{{pageObj.executePlanId}}" data-index="0" bindtap="toReissueApply">{{pageObj.refCard}}</text>
          
					<text wx:if="{{pageObj.refSign}}" class="box-status-right weui-cell__ft_in-access" data-id="{{pageObj.meetingId}}" data-plan-id="{{pageObj.executePlanId}}" bindtap="toSign">{{pageObj.refSign}}</text>
					</view>
        </view> -->

<!-- 请假补签申请 -->
<!-- <block wx:if="{{pageObj.checkStatus}}">
          <view class="myui-cell myui-icon">
            <icon type="{{pageObj.applyicon}}" color="{{pageObj.applyColor}}" size="15" style="margin-right:20rpx"></icon>
            <view class="myui-cell__bd" style="color:{{pageObj.applyColor}}">{{pageObj.checkStatus}}</view>
            <text class="applyLeaveTimes" wx:if="{{pageObj.makeCardTimes > 0 }}">(补卡次数: {{pageObj.makeCardTimes}})</text>
          </view>
          <view class="myui-cell applyReason">
            <view class="myui-cell__bd">原因：</view>
            <view class="myui-cell__bf">{{pageObj.checkReason}}</view>
          </view>
          <view class="myui-cell" style="font-size:12px;">
            <view class="weui-cell__bd"></view>
            <view class="weui-cell__ft">申请于 {{pageObj.seccheckTime}}</view>
          </view>
        </block> -->

<!-- 请假补签申请结果 -->
<!-- <block wx:if="{{pageObj.checkType}}">
          <view class="myui-cell myui-icon">
            <icon type="{{pageObj.resicon}}" color="{{pageObj.resColor}}" size="15" style="margin-right:20rpx"></icon>
            <view class="myui-cell__bd" style="color:{{pageObj.resColor}}">{{pageObj.checkType}}</view>
            <text wx:if="{{(4 > pageObj.makeCardTimes > 0) && pageObj.remarkCard}}" class="box-status-right weui-cell__ft_in-access  redFOnt" 
              data-id="{{pageObj.meetingId}}" data-plan-id="{{pageObj.executePlanId}}" 
              data-index="{{pageObj.makeCardTimes }}" bindtap="toReissueApply">补卡申请</text>
              
          </view>
          <view wx:if="{{pageObj.reviewTime}}" class="myui-cell" style="font-size:12px;">
            <view class="weui-cell__bd"></view>
            <view class="weui-cell__ft">审核于 {{pageObj.reviewTime}}</view>
          </view>
        </block> -->

<!-- 补签成功之后显示考勤状态 -->
<!-- <block wx:if="{{pageObj.finallName }}">
					<view class="myui-cell myui-icon">
					  <icon type="{{pageObj.finallicon}}" color="{{pageObj.finallColor}}" size="15" style="margin-right:20rpx"></icon>
					  <view class="myui-cell__bd" style="color:{{pageObj.finallColor}}">{{pageObj.finallName}}</view>
					</view>
					<view class="myui-cell">
					  <view class="myui-cell__bd">打卡时间：</view>
					  <view class="myui-cell__bf">{{pageObj.finallreviewTime}}</view>
					</view>
					<view class="myui-cell" wx:if="{{pageObj.finallAdress}}">
					  <view class="myui-cell__bd">地 址：</view>
					  <view class="myui-cell__bf">{{pageObj.finallAdress}}</view>
					</view>
					<view class='center_detail'>
					  <view class='box-status'>
					    <text class="center_text yes" style="background:{{pageObj.finallmeetingTypeNameColor}}">{{pageObj.finallname}}</text>
					  </view>
					</view>
				</block> -->

<!-- </view>

    </view> -->

<!-- 补卡申请是否通过 -->
<!-- <view wx:if="{{pageObj.isApply}}" style="font-size:15px; margin-top: 10rpx;"> -->

<!-- 补签成功,考勤成功  请假失败,进行考勤 -->
<!-- <block wx:if='{{pageObj.resultType}}'>
			  <view class="myui-cell myui-icon">
			    <icon type="{{pageObj.resicon}}" color="{{pageObj.resultColor}}" size="15" style="margin-right:20rpx"></icon>
			    <view class="myui-cell__bd" style="color:{{pageObj.resultColor}}">{{pageObj.resultType}}</view>
			  </view>
			  <view class="myui-cell">
			    <view class="myui-cell__bd">打卡时间：</view>
			    <view class="myui-cell__bf">{{pageObj.checkTime}}</view>
			  </view>
			  <view class="myui-cell">
			    <view class="myui-cell__bd">地 址：</view>
			    <view class="myui-cell__bf">{{pageObj.finallAdress}}</view>
			  </view>
			  <view class='center_detail'>
			    <view class='box-status'>
			      <text class="center_text yes" style="background:{{pageObj.resultColor}}">{{pageObj.name}}</text>

            <text wx:if="{{pageObj.refCard}}" class="box-status-right weui-cell__ft_in-access" 
            data-id="{{pageObj.meetingId}}" data-plan-id="{{pageObj.executePlanId}}" bindtap="toReissueApply">{{pageObj.refCard}}</text>
			    </view>
			  </view>
      </block> -->

<!-- <view class="" style="font-size:15px;"> -->

<!-- <view class="myui-cell" style="padding: 0 35rpx 0 26rpx; align-items:center;">
        <icon type="{{pageObj.icon}}" color="{{pageObj.statusColor}}" size="15" style="margin-right:20rpx"></icon>
        <view class="myui-cell__bd" style="color:{{pageObj.statusColor}}">{{pageObj.statusName}}</view>
      </view>
      <view class="myui-cell">
        <view class="myui-cell__bd">打卡时间：</view>
        <view class="myui-cell__bf">{{pageObj.checkTime}}</view>
      </view>
      <view class="myui-cell">
        <view class="myui-cell__bd">原因：</view>
        <view class="myui-cell__bf">{{pageObj.applyReason}}</view>
      </view>
      <view class="myui-cell" style="font-size:12px;">
        <view class="weui-cell__bd"></view>
        <view class="weui-cell__ft">申请于 {{pageObj.applyTime}}</view>
      </view> -->

<!-- </view> -->

<!-- <view class="myui-cell" style="margin-top: 30rpx; color: rgb(234, 25, 50)">
        <view class="myui-cell__bd">{{pageObj.handlerName}}</view>
      </view>
  
      <view wx:if="{{pageObj.handlerResult!=10}}" class="myui-cell" style="font-size:12px;">
        <view class="weui-cell__bd"></view>
        <view class="weui-cell__ft">审核于 {{pageObj.handlerTime}}</view>
      </view>

    </view>

  </view> -->


<!-- </view> -->



<!-- 第一次操作 -->
<!-- <view style="font-size:15px; margin-top: 10rpx;" wx:if="{{!pageObj.isNoCheckMeeting || pageObj.hasFirApply}}">
    <view class="myui-cell"  style="padding: 0 35rpx 0 26rpx; align-items:center;">
      <icon type="{{pageObj.icons}}" wx:if="{{pageObj.icons}}" color="{{pageObj.statusColors}}" size="15" style="margin-right:20rpx"></icon>
      <view class="myui-cell__tb" style="color:{{pageObj.statusColors}}">{{pageObj.applyType}} <text class="applyLeaveTimes" wx:if="{{pageObj.applyLeaveTimes > 0 }}">(请假次数: {{pageObj.applyLeaveTimes}})</text> </view>
    </view>
		<view class="myui-cell applyReason" wx:if="{{pageObj.firapplyReason}}">
		  <view class="myui-cell__bd " style="color:#999; ">原因：</view>
		  <view class="myui-cell__bf">{{pageObj.firapplyReason}}</view>
		</view>
		
		<view class="myui-cell" style="font-size:12px;" wx:if=" {{pageObj.firapplyTime != null}}">
		  <view class="weui-cell__bd"></view>
		  <view class="weui-cell__ft">申请于 {{pageObj.firapplyTime}}</view>
		</view>
		
		<view class="myui-cell myui-icon">
		  <icon type="{{pageObj.firresicon}}" color="{{pageObj.firresColor}}" size="15" style="margin-right:20rpx"></icon>
		  <view class="myui-cell__bd" style="color:{{pageObj.firresColor}};width: 100%;">{{pageObj.fircheckType}}</view>
		</view>
	
		<view wx:if="{{pageObj.firreviewTime != null }}" class="myui-cell" style="font-size:12px;">
		  <view class="weui-cell__bd"></view>
		  <view class="weui-cell__ft">审核于 {{pageObj.firreviewTime}}</view>
    </view>
    
  </view> -->
</view>
</template>

<script>
var app = getApp();

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    pageObj: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    toReissueApply: function (e) {
      console.log('e',e);
	  console.log(1111111111111)
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendAskForLeaveApplyUrl + '?meetingId=' + e.currentTarget.dataset.id + '&executePlanId=' + e.currentTarget.dataset.planId + '&applyTimes=' + e.currentTarget.dataset.index, 500);
    },

    toSign() {
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendAttendaceSignUrl+"?type=kqdk", 500);
    },

    toCreatorPhone: function (e) {
      console.log(e);
      let phone = e.currentTarget.dataset.phone;
      this.callPhone(phone);
    },
    callPhone: function (phone) {
      wx.showModal({
        title: '呼叫',
        content: '拨打' + phone,
        cancelText: '取消',
        confirmText: '拨打',
        confirmColor: '#20a4f7',

        success(res) {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: phone //仅为示例，并非真实的电话号码

            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }

      });
    }
  }
};
</script>
<style>
@import "./attendaceDetailTarbar.css";
</style>