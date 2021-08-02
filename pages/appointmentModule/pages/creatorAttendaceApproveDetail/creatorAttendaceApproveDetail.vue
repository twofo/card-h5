<template>
<view class="page">
  <view class="page__bd" style="margin: 10rpx 10rpx;">

            <view class="weui-cells weui-cells_after-title" style="margin: 15rpx 0rpx 0rpx;">
                <view class="weui-cell">
                  <view class="weui-cell__bd" style="margin: 0rpx 10rpx;">会议考勤：{{pageObj.applyType}}</view>
                </view>
            </view> 
            <!-- 个人信息 -->
            <view class="weui-cells weui-cells_after-title" style="font-size:15px;padding: 20rpx 0rpx 15rpx;">
                <view class="myui-cell">
                  <view class="myui-cell__title">个人信息</view>
                </view>
                <view class="myui-cell">
                  <view class="myui-cell__bd">申请人：</view>
                  <view class="myui-cell__bf">{{pageObj.applePeople}}</view>
                </view>
                <view class="myui-cell">
                  <view class="myui-cell__bd">学号：</view>
                  <view class="myui-cell__bf">{{pageObj.userCode}}</view>
                </view>
                <!-- <view class="myui-cell">
                  <view class="myui-cell__bd">院系：</view>
                  <view class="myui-cell__bf">{{pageObj.applyPeople}}</view>
                </view>
                <view class="myui-cell">
                  <view class="myui-cell__bd">专业：</view>
                  <view class="myui-cell__bf">{{pageObj.meetingTime}}</view>
                </view> -->
                <view class="myui-cell">
                  <view class="myui-cell__bd">手机号：</view>
                  <view class="myui-cell__bf">{{pageObj.mobile}}</view>
                </view>
                <view class="myui-cell">
                  <view class="myui-cell__bd">申请原因：</view>
                  <view class="myui-cell__bf">{{pageObj.applyReason}}</view>
                </view>
            </view> 
            <!-- 会议信息 -->
            <view class="weui-cells weui-cells_after-title" style="font-size:15px;padding: 20rpx 0rpx 15rpx;">
                <view class="myui-cell">
                  <view class="myui-cell__title">会议信息</view>
                </view>
                <view class="myui-cell">
                  <view class="myui-cell__bd">会议名称：</view>
                  <view class="myui-cell__bf">{{pageObj.meetingName}}</view>
                </view>
                <view class="myui-cell">
                  <view class="myui-cell__bd">房间号：</view>
                  <view class="myui-cell__bf">{{pageObj.roomName}}</view>
                </view>
                <view class="myui-cell">
                  <view class="myui-cell__bd">会议类型：</view>
                  <view class="myui-cell__bf">{{pageObj.meetingType}}</view>
                </view>
                <view class="myui-cell">
                  <view class="myui-cell__bd">会议时间：</view>
                  <view class="myui-cell__bf">{{pageObj.meetingTime}}</view>
                </view>
                <view class="myui-cell" style="margin：45px 15px;font-size:14px;">
                  <view class="weui-cell__bd"></view>
                  <view class="weui-cell__ft">申请于 {{pageObj.applyTime}}</view>
                </view>
                
            </view>
           <!-- 按钮 -->
            <view v-if="pageObj.isPending" class="weui-cells weui-cells_after-title" style="font-size:15px;margin: 0rpx 0rpx 20rpx;">
                <view class="myui-cell-bottom" style="font-size:16px;">
                  <view class="myui-cell-bottom__bd myui-center" :data-id="pageObj.applyId" @tap="pageObj.btn[0].bindtap">{{pageObj.btn[0].name}}</view>
                  <view class="myui-cell-bottom__fd myui-center" :data-id="pageObj.applyId" @tap="pageObj.btn[1].bindtap">{{pageObj.btn[1].name}}</view>
                </view>

            </view>
            <view v-if="!pageObj.isPending" class="weui-cells weui-cells_after-title" style="font-size:15px;margin: 0rpx 0rpx 20rpx;">
                <view class="myui-cell-bottom" style="font-size:16px;">
                 <view class="myui-cell-bottom__bd myui-center" :style="'color:' + pageObj.statusColor">{{pageObj.statusName}}</view>
                </view>
            </view>

            <!-- 管理员拒绝信息 -->
            <!-- <view class="myui-cell" style="margin-top：20rpx;">
              <view class="myui-cell__title">管理员</view>
            </view> -->
            <view v-if="!pageObj.isPending" class="weui-cells weui-cells_after-title" style="font-size:15px;padding: 20rpx 0rpx 15rpx;">
                <!-- <view class="myui-cell">
                  <view class="myui-cell__bd">拒绝原因：</view>
                  <view class="myui-cell__bf">{{pageObj.applyReason}}</view>
                </view> -->
                <view class="myui-cell">
                  <view class="myui-cell__bd">审核人：</view>
                  <view class="myui-cell__bf">{{pageObj.reviewPerson}}</view>
                </view>
                <view class="myui-cell" style="margin：45px 15px;font-size:14px;">
                  <view class="weui-cell__bd"></view>
                  <view class="weui-cell__ft">审核时间 {{pageObj.reviewTime}}</view>
                </view>
                
            </view>



 </view>
</view>
</template>

<script>
var app = getApp();
import msgNoData from "../../../../components/common/msgNoData/msgNoData";

export default {
  data() {
    return {
      pageObj: {}
    };
  },

  components: {
    msgNoData
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('applyId', options.applyId);
    this.approvalApplyList(options.applyId);
  },
  methods: {
    /**
     * 获取审核详情
     */
    approvalApplyList: function (applyId) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.approvalApplyDetail + '?applyId=' + applyId,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取审核详情', res.data);

          if (res.data && res.data.code == 200) {
            _this.dealPageObj(res.data.rows);
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
    dealPageObj: function (rows) {
      let obj = {};
      obj.applyId = rows.applyId;
      obj.applyType = this.dealType(rows.applyType);
      obj.applePeople = rows.personName;
      obj.userCode = rows.username;
      obj.mobile = rows.mobile;
      obj.applyReason = rows.reason;
      obj.meetingName = rows.meetingTitle;
      obj.roomName = rows.meetingRoomAddress;
      obj.meetingType = this.dealMeetingType(rows.meetingType);
      obj.meetingTime = app.globalData.PublicUtil.formatTimeTwo(rows.startTime, 'Y-M-D h:m') + '-' + app.globalData.PublicUtil.formatTimeTwo(rows.endTime, 'h:m');
      obj.applyTime = app.globalData.PublicUtil.formatTimeTwo(rows.applyTime, 'Y-M-D h:m');
      let status = rows.handlerResult;

      if (status == 10) {
        obj.isPending = true;
        obj.btn = [{
          name: "拒绝",
          bindtap: "bindRefuse"
        }, {
          name: "同意",
          bindtap: "bindAgree"
        }];
      } else if (status == 12) {
        obj.isPending = false;
        obj.statusName = '已同意';
        obj.statusColor = 'rgb(101,213,128)';
        obj.reviewPerson = rows.reviewPersonName;
        obj.reviewTime = app.globalData.PublicUtil.formatTimeTwo(rows.reviewTime, 'Y-M-D h:m');
      } else if (status == 13) {
        obj.isPending = false;
        obj.statusName = '已拒绝';
        obj.statusColor = 'rgb(234,25,50)';
        obj.reviewPerson = rows.reviewPersonName;
        obj.reviewTime = app.globalData.PublicUtil.formatTimeTwo(rows.reviewTime, 'Y-M-D h:m');
      } else {
        obj.isPending = false;
        obj.statusName = '未知';
      }

      console.log('obj-', obj);
      this.setData({
        pageObj: obj
      });
    },
    dealType: function (type) {
      let str = '';

      switch (type) {
        case 30:
          str = '补签';
          wx.setNavigationBarTitle({
            title: "补签详情"
          });
          break;

        case 31:
          str = '请假';
          wx.setNavigationBarTitle({
            title: "请假详情"
          });
          break;

        default:
          str = '暂无';
          break;
      }

      return str;
    },
    dealMeetingType: function (meetingType) {
      let str = '';

      switch (meetingType) {
        case 1:
          str = '专用会议';
          break;

        case 2:
          str = '公开会议';
          break;

        default:
          str = '暂无';
          break;
      }

      return str;
    },

    /**
       * 同意申请
       */
    bindAgree: function (e) {
      this.approvalRatify(e.target.dataset.id, 12);
    },

    /**
       * 拒绝申请
       */
    bindRefuse: function (e) {
      this.approvalRatify(e.target.dataset.id, 13);
    },

    /**
      * 同意或拒绝申请
      */
    approvalRatify: function (applyId, type) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.approvalRatify,
        method: 'POST',
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        data: {
          'applyId': applyId,
          'type': type
        },
        success: function (res) {
          console.log('同意或拒绝申请返回', res.data);

          if (res.data && res.data.code == 200) {
            if (type == 13) {
              app.globalData.ShowMsgUtil.showSuccessToast("拒绝成功", 2000);
            } else if (type == 12) {
              app.globalData.ShowMsgUtil.showSuccessToast("同意成功", 2000);
            } else {
              app.globalData.ShowMsgUtil.showSuccessToast("操作成功", 2000);
            } // 更新页面


            setTimeout(function () {
              _this.approvalApplyList(applyId);
            }, 2000);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    }
  }
};
</script>
<style>
@import "./creatorAttendaceApproveDetail.css";
</style>