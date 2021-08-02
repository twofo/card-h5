<template>
<view>
<view class="weui-cells weui-cells_after-title">
  <view class="weui-cell">
    <view class="weui-cell__hd">
      <image :src="pageObj.statusImage" style="margin-right: 5px;vertical-align: middle;width:23px; height: 25px;"></image>
    </view>
    <view class="weui-cell__bd" style="margin: 0rpx 10rpx;">{{pageObj.statusName}}</view>
  </view>
</view>


<view class="weui-cells weui-cells_after-title" style="font-size:15px;">
  <view class="weui-cell" style="font-size:18px;font-weight:700;">{{pageObj.meetingSubject}}</view>
  <view class="myui-cell">
    <view class="myui-cell__bd">房间号：</view>
    <view class="myui-cell__bf">{{pageObj.meetingRoomName}}</view>
  </view>
  <view class="myui-cell">
    <view class="myui-cell__bd">会议类型：</view>
    <view class="myui-cell__bf">
      <view v-if="pageObj.meetingType==1">
        内部会议
      </view>
      <view v-if="pageObj.meetingType==2">
        开放会议
      </view>
    </view>
  </view>
  <view class="myui-cell">
    <view class="myui-cell__bd">会议时间：</view>
    <view class="myui-cell__bf">{{pageObj.meetingStartTime}}</view>
  </view>
	<view class="myui-cell">
		<view class="myui-cell__bd">考勤时间：</view>
		<view class="myui-cell__bf">{{pageObj.checkTime}}</view>
	</view>
	
  <view class="myui-cell">
    <view class="myui-cell__bd">会议地址：</view>
    <view class="myui-cell__bf">{{pageObj.adress}}</view>
  </view>
  <view class="myui-cell">
    <view class="myui-cell__bd">发起人：</view>
    <view class="myui-cell__bf">{{pageObj.meetingInitiator}}</view>
  </view>
  <view class="myui-cell">
    <view class="myui-cell__bd">参会人员：</view>
    <view class="myui-cell__bf">{{pageObj.meetingAttendee}}</view>
  </view>
 
  <view class="myui-cell">
    <view class="myui-cell__bd">主讲人：</view>
    <view class="myui-cell__bf">{{pageObj.meetingEmcee}}</view>
  </view>
  <view class="myui-cell">
    <view class="myui-cell__bd">记录人：</view>
    <view class="myui-cell__bf">{{pageObj.meetingRecorder}}</view>
  </view>
  <view class="myui-cell" style="margin：0px 0rpx 150rpx;">
    <view class="myui-cell__bd">会议内容：</view>
    <view class="myui-cell__bf">{{pageObj.meetingContent}}</view>
  </view>
  <view class="myui-cell" style="font-size:14px;">
    <view class="weui-cell__bd"></view>
    <view class="weui-cell__ft">发布于 {{pageObj.createTime}}</view>
  </view>

  <!-- 按钮 -->
  <!-- 判断是否是未通过审核的详情页 -->
 <view v-if="!onlyShowMeetingInfo && conflict == 0"> 
    <view class="weui-cells weui-cells_after-title" style="font-size:15px;margin: 25rpx 0rpx 20rpx;" v-if="pageObj.meetingStatus != -1">
      <view class="myui-cell-bottom" style="font-size:16px;">
        <view :class="' myui-center ' + ((pageObj.meetingStatus == 3  || pageObj.meetingStatus == -1)&& index == 0 ? 'dangerNotice ' :'') +  (index == 0? 'myui-cell-bottom__bd ' : 'myui-cell-bottom__fd') + ' '" 
				v-for="(item,index) in pageObj.btn" :key='index'
				:data-mobile="pageObj.mobile"
				@tap="tapClick(item.bindtap,{mobile:pageObj.mobile,id:pageObj.meetingId,checkTime:pageObj.checkTime,planId:pageObj.executePlanId,applyTimes:pageObj.applyTimes,apply:'apply'})" >{{item.name}}</view>
				
				<!-- :data-mobile="pageObj.mobile" :data-id="pageObj.meetingId"
				:data-index="pageObj.attendaceDetailDto.applyTime" -->
       <!-- <view v-if="!pageObj.hideRight" class="myui-cell-bottom__fd myui-center" :data-id="pageObj.meetingId" :data-plan-id="pageObj.executePlanId"  @tap="tapClick(pageObj.btn[1].bindtaps)" :data-checkTime="pageObj.checkTime" data-apply="apply">{{pageObj.btn[1].name}}</view> -->
      </view>
    </view>

  </view>


</view>
<view v-if="!onlyShowMeetingInfo  && conflict == 0"> 

  <view v-if="pageObj.meetingStatus == 1 || pageObj.showEditBtn" class="myui-cell-bottom__bd myui-right"  @tap="editMeeting({id:pageObj.meetingId })">修改会议内容 {{'>>'}}</view>

  <view v-if="pageObj.meetingStatus == -1 && objection != ''">
    <!-- 未通过审核内容 -->
    <view class="manager">
      <text class="myui-cell">管理员</text>
    </view>
    <view class="weui-cells">
      <view class="wyui-cell" style="font-size:14px;padding-top:20rpx;">
        <view class="myui-cell">不通过的原因</view>
        <view class="weui-cell__bf objection">{{objection}}</view>
      </view>
      <view class="myui-cell" style="font-size:14px; padding:30rpx 0">
        <view class="weui-cell__bd"></view>
        <view class="weui-cell__ft">发布于 {{objectionTime}}</view>
      </view>
    </view>
  </view>

  <view class="myui-cell-bottom" v-if="pageObj.meetingStatus == -1">
    <view class="myui-cell-bottom__bd myui-center reSendbtn"  @tap="tapClick(pageObj.btn[1].bindtaps,{id:pageObj.meetingId })">再次发起会议</view>
  </view>
</view>
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
    },
    objection: {
      //审核未通过的理由
      type: String,
      default: ''
    },
    objectionTime: {
      //发布审核未通过的时间
      type: String,
      default: ''
    },
    onlyShowMeetingInfo: {
      //是否只显示会议内容
      type: Boolean,
      default: false
    },
    conflict: {
      type: Number,
      default: 0
    }
  },
  methods: {
		tapClick(tap,params){
			console.log(tap)
			console.log(params)
			this[tap](params)
		},
		
    // 联系创建会议的人
    toCreatorPhone: function (e) {
      console.log(e);
      let phone = e.mobile;
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
    },
    // 请假申请
    askForLeaveApply: function (e) {
       console.log(e);
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendAskForLeaveApplyUrl + '?meetingId=' + e.id + '&executePlanId=' + e.planId + '&applyTimes=' + e.applyTimes + '&apply=' + e.apply, 500);
    },

    /**
     this.dealStatusByActiveIndex(0,2,0)
    * 取消,删除操作成功之后更新数据
    */
    //取消会议
    cancelMeeting: function (e) {
			console.log('第一个按钮',e);
      let meetingId = e.id;
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

      let _this = this;

      wx.showModal({
        title: '提示',
        content: '是否取消预约信息',
        cancelText: '否',
        confirmText: '是',
        confirmColor: '#20a4f7',

        success(res) {
          if (res.confirm) {
            //请求后台取消会议
						app.globalData.ShowMsgUtil.netErrNotice();
            app.globalData.ShowMsgUtil.showLoadToast("正在取消...");
            wx.request({
              url: app.globalData.RequestUrl.appointmentRequestUrl.cancelMeeting + '?meetingId=' + meetingId,
              method: 'POST',
              header: {
                'token': userInfoCach.token
              },
              data: {},
              success: function (res) {
                console.log('取消会议返回', res.data);
                wx.hideToast({});

                if (res.data && res.data.code == 200) {
                  console.log('已取消该会议,回到会议列表页');
                  app.globalData.ShowMsgUtil.showSuccessAndReturn('取消会议成功', 1500);
                  app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.appointmentPageUrl.meetingListUrl, 1500);
                } else {
                  console.log("取消失败", res.data.code);
                  app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
                  return;
                }
              },
              fail: function () {
                app.globalData.ShowMsgUtil.showNoneToastByFail();
              }
            });
          } else if (res.cancel) {}
        }

      });
    },
    //编辑会议 
    editMeeting: function (e) {
      //是否需要编辑预约信息
      wx.showModal({
        title: '提示',
        content: '是否编辑预约信息',
        cancelText: '否',
        confirmText: '是',
        confirmColor: '#20a4f7',

        success(res) {
          if (res.confirm) {
            //跳转到编辑预约界面
            app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
            app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.meetingOperationUrl + '?meetingId=' + e.id, 500);
          } else if (res.cancel) {
            //留在当前页面
            app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.meetingOperationUrl + '?meetingId=' + e.id, 500);
          }
        }

      });
    },
    //创建会议
    createMeeting: function (e) {
      console.log("重新创建会议", e);
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      let meetingId = e.id; //跳转到预约会议室界面。创建会议
      // app.PublicUtil.navigateByUrl(app.PageUrl.appointmentPageUrl.appointmentRoomUrl + '?meetingId=' + meetingId, 500);

      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.meetingOperationUrl + '?meetingId=' + meetingId + '&isAgainApply=1', 500);
    },
    //删除会议
    deleteMeeting: function (e) {
      let meetingId = e.id;
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

      let _this = this;

      wx.showModal({
        title: '提示',
        content: '是否删除预约信息',
        cancelText: '再想想',
        confirmText: '删除',
        confirmColor: '#ff6f6f',

        success(res) {
          if (res.confirm) {
            //请求后台，删除会议
						app.globalData.ShowMsgUtil.netErrNotice();
            app.globalData.ShowMsgUtil.showLoadToast("正在删除...");
            wx.request({
              url: app.globalData.RequestUrl.appointmentRequestUrl.cancelMeeting + '?meetingId=' + meetingId,
              method: 'POST',
              header: {
                'token': userInfoCach.token
              },
              data: {},
              success: function (res) {
                wx.hideToast({});

                if (res.data && res.data.code == 200) {
                  app.globalData.ShowMsgUtil.showSuccessAndReturn('删除成功', 1500);
                  app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.appointmentPageUrl.meetingListUrl, 1500);
                } else {
                  // app.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
                  app.globalData.ShowMsgUtil.showErrorModal('请求失败', '警告,只能删除拒绝或预约中的会议!', res.data.code);
                  return;
                }
              },
              fail: function () {
                app.globalData.ShowMsgUtil.showNoneToastByFail();
              }
            });
          } else if (res.cancel) {}
        }

      });
    },
    //查看统计
    viewStatistics: function (e) {
      console.log(e);
      let meetingId = e.id;
      let checkTime = e.checktime;
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500); //跳转到会议考勤统计界面 

      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendaceStatisticsUrl + "?meetingId=" + meetingId + '&checkTime=' + checkTime, 500);
    },
    //开始签到
    signIn: function (e) {
      //考勤，打卡签到
      let meetingId = e.id;
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500); //跳转到打卡页面  attendAttendaceSignUrl

      app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.appointmentPageUrl.attendAttendaceSignUrl + "?meetingId=" + meetingId+"&type=kqdk", 500);
    }
  }
};
</script>
<style>
@import "./meetingDetail.css";
</style>