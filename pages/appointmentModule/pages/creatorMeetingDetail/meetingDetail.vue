<template>
<view class="page">
    <view class="page__bd" style="margin: 15rpx 10rpx;">

      <meeting-detail :pageObj="pageObj" @myEventLeft="leftBtnTap" @myEventRight="rigthBtnTap" :conflict="conflict"></meeting-detail>   

  </view>
</view>
</template>

<script>
var app = getApp();
var ImageUrl = require("../../resources/utils/imageUrl.js");
import meetingDetail from "../../resources/components/meetingDetail/meetingDetail";

export default {
  data() {
    return {
      //页面数据显示对象
      pageObj: {},
      timeObj: {},
      //图片对象
      imageObj: ImageUrl,
      meetingType: ["内部会议", "开放式会议"],
      conflict: 0 //是否是从冲突页面进入 1为 true

    };
  },

  components: {
    meetingDetail
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('会议详情',options);
    this.getAppointmentConfigure();
    this.getMeetingDetail(options.meetingId);
		
    if (options.conflict) {
      this.setData({
        conflict: options.conflict
      });
			uni.setNavigationBarTitle({
				title:'待办_冲突列表_会议详情'
			})
    }
  },
  // reSendMeeting(e){
  //   let { status } = this.data.pageObj
  //   if(status == -1){
  //     console.log('再次创建会议')
  //   }
  // },
  onUnload: function () {
    wx.hideToast();
  },
  methods: {
    getAppointmentConfigure: function (roomType) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentConfigure + '?areaType=1',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取预约，所需的配置信息"', res.data);

          if (res.data && res.data.code == 200) {
            let data = res.data.rows;

            _this.contralTime(data.configureDtos);
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

    // 可配置时间处理函数
    contralTime(data) {
      if (data) {
        let timeObj = {};
        timeObj.appointmentAdvanceTime = data.appointmentAdvanceTime == null ? 0 : data.appointmentAdvanceTime;
        timeObj.cancelAdvanceTimes = data.cancelAdvanceTime == null ? 0 : data.cancelAdvanceTime;
        timeObj.msgAdvanceTime = data.msgAdvanceTime == null ? 0 : data.msgAdvanceTime;
        this.setData({
          timeObj
        });
      }
    },

    /**
     * 获取会议详情
     */
    getMeetingDetail: function (meetingId) {
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.meetingDetail + '?meetingId=' + meetingId,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取会议详情返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.dealPageObj(res.data.rows);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
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

    /**
     * 处理页面对象
     */
    dealPageObj: function (data) {
      let {
        meetingType
      } = this;
      let meetingTypeIndex = data.meetingType - 1;
      var obj = {};
      obj.meetingId = data.meetingId;
      obj.meetingSubject = data.meetingSubject;
      obj.meetingRoomName = data.meetingRoomName;
      obj.meetingType = data.meetingType;
      obj.meetingStartTime = app.globalData.PublicUtil.formatTimeTwo(data.meetingStartTime, 'Y-M-D h:m') + '-' + app.globalData.PublicUtil.formatTimeTwo(data.meetingEndTime, 'h:m');
      var sTime = data.meetingStartTime + ":00";
      var meetingStartTime = app.globalData.PublicUtil.formatTimeTwo(data.meetingStartTime, 'Y-M-D h:m');
      let platform = app.globalData.SystemInfo.platform;

      if (platform == 'ios') {
        let endtime = data.meetingEndTime.replace(/-/g, '-').split(" ");
        obj.meetingStartTime = data.meetingStartTime.replace(/-/g, '-') + '-' + endtime[1];
        var sTime = data.meetingStartTime.replace(/-/g, '/') + ":00";
        var meetingStartTime = data.meetingStartTime.replace(/-/g, '-');
      }

      obj.meetingInitiator = data.meetingInitiator;
      obj.meetingEmcee = data.meetingEmcee;
      obj.meetingRecorder = data.meetingRecorder;
      obj.meetingContent = data.meetingContent;
      obj.createTime = data.createTime;
      obj.meetingStatus = data.meetingStatus;
      obj.adress = data.meetingRoomAddress;
      obj.checkTime = this.checkFn(sTime, data.meetingInitiatorId, data.attenceBeforeTimeNumber, data.attenceAfterTimeNumber); //会议状态

      var status = data.meetingStatus;

      if (status == -1) {
        //审核不通过//已拒绝
        obj.statusName = '审核不通过';
        obj.statusImage = ImageUrl.unapprovePic;
        obj.btn = [{
          name: "删除会议",
          bindtap: "deleteMeeting"
        }, {
          name: "重新发起",
          bindtap: "createMeeting"
        }];
      } else if (status == 0) {
        //待审核//处理中
        obj.statusName = '待审核';
        obj.statusImage = ImageUrl.checkPendingPic;
        obj.btn = [{
          name: "取消会议",
          bindtap: "cancelMeeting"
        }, {
          name: "编辑会议",
          bindtap: "editMeeting"
        }];
      } else if (status == 1) {
        obj.statusName = '未开始';
        obj.statusImage = ImageUrl.nostartPic;
        obj.btn = [{
          name: "取消会议",
          bindtap: "cancelMeeting"
        }, {
          name: "开始签到",
          bindtap: "signIn"
        }];
      } else if (status == 2) {
        obj.statusName = '进行中';
        obj.statusImage = ImageUrl.readyStartingPic;
        obj.btn = [{
          name: "取消会议",
          bindtap: "cancelMeeting"
        }, {
          name: "开始签到",
          bindtap: "signIn"
        }];
        obj.showEditBtn = true;
        let startTTT = new Date(sTime).getTime();
        let nowTTT = new Date().getTime();
        console.log(startTTT, nowTTT);
        console.log(nowTTT <= startTTT);

        if (nowTTT >= startTTT) {
          obj.showEditBtn = false;
          obj.btn = [{
            name: "开始签到",
            bindtap: "signIn"
          }];
        }
      } else if (status == -2) {
        obj.statusName = '已过期';
        obj.statusImage = ImageUrl.meetingOutPic;
      } else {
        //审核通过
        obj.statusName = '审核通过';
        obj.statusImage = ImageUrl.approvePic;

        if (status == 3) {
          //已完成
          obj.statusName = '已结束';
          obj.btn = [{
            name: "删除会议",
            bindtap: "deleteMeeting"
          }, {
            name: "查看统计",
            bindtap: "viewStatistics"
          }];
        } else {
          //未完成 
          console.log("未完成的会议---------------");
          obj.btn = [{
            name: "取消会议",
            bindtap: "cancelMeeting"
          }, {
            name: "开始签到",
            bindtap: "signIn"
          }];
        }
      } //参会人员


      obj.meetingAttendee = '';  // console.log('data.meetingAttendee-', data.meetingAttendee);

      for (let i = 0; i < data.meetingAttendee.length; i++) {
        if (i == data.meetingAttendee.length - 1) {
          obj.meetingAttendee = obj.meetingAttendee + data.meetingAttendee[i].userName;
        } else {
          obj.meetingAttendee = obj.meetingAttendee + data.meetingAttendee[i].userName + '、';
        }
      }

      console.log('页面数据-', obj);
      this.setData({
        pageObj: obj
      });
    },

    // 考勤时间
    checkFn(time, userId, meetingBeforeTime, meetingingTime) {
      // console.log("考勤时间");
      // console.log(meetingBeforeTime, meetingingTime);
      let d = new Date(time);
      let t = d.getTime(d);
      let cS = t - 1000 * 60 * meetingBeforeTime; //会议开始前考勤时间点
      // 判断当前用户是否为会议创建者
      // const userInfoCach = app.StorageUtil.get('userInfoCach');
      // if(userInfoCach.userId == userId){

      var cE = t + 1000 * 60 * meetingingTime; //会议开始后考勤时间点
      // }else{
      // var cE = t
      // }

      let checkTime = app.globalData.PublicUtil.formatTimeTwo(cS, "Y-M-D h:m") + ' - ' + app.globalData.PublicUtil.formatTimeTwo(cE, "h:m");
      return checkTime;
    }

  }
};
</script>
