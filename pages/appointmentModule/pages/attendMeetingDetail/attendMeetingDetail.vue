<template>
<view class="page">
  <view class="page__bd" style="margin: 15rpx 10rpx;">

    <!-- 一、会议详情 -->
    <meeting-detail :pageObj="pageObj"></meeting-detail> 
    <!-- 二、根据会议考勤状态显示 -->

    <view v-if="pageObj.attendaceDetailDto != null ">
      <!-- 底部模块 -->
      <attendace-detail-tarbar :pageObj="pageObj.attendaceDetailDto"></attendace-detail-tarbar>
    </view>

  </view>
</view>
</template>

<script>
var app = getApp();
var ImageUrl = require("../../resources/utils/imageUrl.js");
import meetingDetail from "../../resources/components/meetingDetail/meetingDetail";
import attendaceDetailTarbar from "../../resources/components/attendaceDetailTarbar/attendaceDetailTarbar";

export default {
  data() {
    return {
      //页面数据显示对象
      pageObj: {},
      timeObj: {},
      //图片对象
      imageObj: ImageUrl,
      countries: ["内部会议", "开放式会议"],
      status: 0,
      meetingId: null,
      reflesh: false
    };
  },

  components: {
    meetingDetail,
    attendaceDetailTarbar
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getAppointmentConfigure()
    //进入页面加载
    console.log('-------------考勤会议详情-----------');
    console.log(options);
		if(options.type){
			if(options.type == 'kqlb'){
				uni.setNavigationBarTitle({
				  title: "考勤_会议考勤_详情"
				});
			}else if(options.type == 'newsTo'){
				uni.setNavigationBarTitle({
				  title: "消息_会议考勤详情"
				});
			}else{
				uni.setNavigationBarTitle({
				  title: "考勤_参会记录_详情"
				});
			}
		}
    this.setData({
      status: options.status,
      meetingId: options.meetingId,
      reflesh: true
    });
    this.getMeetingDetail(options.meetingId);
  },

  onShow() {
    if (this.reflesh) {
      this.getMeetingDetail(this.meetingId);
    }
  },

  methods: {
    // 获取可配置时间
    getAppointmentConfigure: function (roomType) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentConfigure + '?roomType=1',
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
        timeObj.cancelAdvanceTimes = data.cancelAdvanceTime == null ? 0 : data.cancelAdvanceTime; // timeObj.msgAdvanceTime = data.msgAdvanceTime == null ? 0 : data.msgAdvanceTime

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
     * 未开始 0 审批未通过的会议不给予请假  即将开始1 -->申请请假  
     * 进行中 2 --->申请补卡  已结束 3 --->请假同意  补签状态 同意 拒绝
     */
    dealPageObj: function (data) {
		console.log("data",data)
      let {
        countries
      } = this;
      var obj = {};
      obj.meetingId = data.meetingId;
      obj.executePlanId = data.executePlanId;
      obj.meetingSubject = data.meetingSubject;
      obj.meetingRoomName = data.meetingRoomName;
      obj.meetingType = data.meetingType;
      obj.meetingStartTime = app.globalData.PublicUtil.formatTimeTwo(data.meetingStartTime, 'Y-M-D h:m') + '-' + app.globalData.PublicUtil.formatTimeTwo(data.meetingEndTime, 'h:m');
      obj.meetingInitiator = data.meetingInitiator;
      obj.meetingEmcee = data.meetingEmcee;
      obj.meetingRecorder = data.meetingRecorder;
      obj.meetingContent = data.meetingContent;
      obj.createTime = data.createTime;
      obj.mobile = data.mobile;
      obj.adress = data.meetingRoomAddress;
      obj.status = data.meetingStatus;
      obj.isShowNodeInfo = data.isShowNodeInfo;
      obj.showattendaceDetailDto = false;
	  obj.applyTimes=data.attendaceDetailDto.leaveInfo.applyTimes
	  obj.applyTimess=data.attendaceDetailDto.supplementInfo.applyTimes
      var sTime = data.meetingStartTime + ":00";
      let platform = app.globalData.SystemInfo.platform;

      if (platform == 'ios') {
        let endtime = data.meetingEndTime.replace(/-/g, '-').split(" ");
        obj.meetingStartTime = data.meetingStartTime.replace(/-/g, '-') + '-' + endtime[1];
        var sTime = data.meetingStartTime.replace(/-/g, '/') + ":00";
      } // 补卡指定时间参数


      let reissueTime = {
        startTime: sTime,
        reTime: data.meetingCanSupplementTime
      };
      obj.checkTime = this.checkFn(sTime, data.attenceBeforeTimeNumber, data.attenceAfterTimeNumber, data.meetingInitiatorId); //会议考勤状态

      var status = data.meetingStatus; // var status = 2

      if (status == 3) {
        //会议已结束
        obj.statusName = '已结束';
        obj.statusImage = ImageUrl.approvePic;
        obj.hideRight = true;
        obj.btn = [{
          name: "联系发起人",
          bindtap: "toCreatorPhone"
        } // {
        // 	name: "请假申请",
        // 	bindtap: "askForLeaveApply"
        // }
        ];
      } else if (status == 2) {
        //会议进行中
        obj.statusName = '会议进行中';
        obj.statusImage = ImageUrl.readyStartPic;
        obj.hideRight = false;
        obj.btn = [{
          name: "联系发起人",
          bindtap: "toCreatorPhone"
        }, {
          name: "请假申请",
          bindtap: "askForLeaveApply"
        }];
        let startTTT = new Date(sTime).getTime();
        let nowTTT = new Date().getTime();
        console.log(startTTT);

        if (nowTTT >= startTTT) {
          obj.hideRight = true;
          obj.btn = [{
            name: "联系发起人",
            bindtap: "toCreatorPhone"
          }];
        }
      } else if (status == 1) {
        //会议未开始
        obj.statusName = '即将开始';
        obj.hideRight = false;
        obj.statusImage = ImageUrl.readyStartingPic;
        obj.btn = [{
          name: "联系发起人",
          bindtap: "toCreatorPhone"
        }, {
          name: "请假申请",
          bindtap: "askForLeaveApply"
        }];
      } else if (status == 0) {
        //正在审核会议
        obj.statusName = '正在审核中';
        obj.hideRight = false;
        obj.statusImage = ImageUrl.checkPendingPic;
        obj.btn = [{
          name: "联系发起人",
          bindtap: "toCreatorPhone"
        }, {
          name: "请假申请",
          bindtap: "askForLeaveApply"
        }];
      } else {
        //距离会议举行挺远
        obj.statusName = '预约审核失败';
        obj.hideRight = true;
        obj.statusImage = ImageUrl.unapprovePic;
        obj.btn = [{
          name: "联系发起人",
          bindtap: "toCreatorPhone"
        }];
      } //参会人员


      obj.meetingAttendee = '';

      for (let i = 0; i < data.meetingAttendee.length; i++) {
        if (i == data.meetingAttendee.length - 1) {
          obj.meetingAttendee = obj.meetingAttendee + data.meetingAttendee[i].userName;
        } else {
          obj.meetingAttendee = obj.meetingAttendee + data.meetingAttendee[i].userName + '、';
        }
      } //会议各个时间段状态的信息


      if (data.attendaceDetailDto != null) {
        let attendaceDetailDto = this.dealDetailObj(data.attendaceDetailDto, obj.mobile, reissueTime);
        obj.attendaceDetailDto = attendaceDetailDto;
        attendaceDetailDto.meetingCheckedTime = obj.checkTime;
        attendaceDetailDto.meetingCanSupplementTime = data.meetingCanSupplementTime; //补卡指定时间长度(分钟)

        attendaceDetailDto.mobile = obj.mobile;
        attendaceDetailDto.meetingId = obj.meetingId; // console.log(attendaceDetailDto)
        // obj.showattendaceDetailDto = attendaceDetailDto.showattendaceDetailDto
        // obj.applyLeaveTimes = attendaceDetailDto.applyLeaveTimes
        // if(attendaceDetailDto.hasNostart){
        // 	obj.hideRight = true
        // 	obj.btn = [{
        // 		name: "联系发起人",
        // 		bindtap: "toCreatorPhone"
        // 	}];
        // }
        // if (status != 2){
        //   attendaceDetailDto.remarkCard = false
        // }
      }

      console.log('页面数据-', obj);
      this.setData({
        pageObj: obj
      });
    },

    // 考勤时间
    checkFn(time, attenceBeforeTimeNumber, attenceAfterTimeNumber, userId) {
      let d = new Date(time);
      let t = d.getTime(d);
      let cS = t - 1000 * 60 * attenceBeforeTimeNumber; // 判断当前用户是否为会议创建者
      // const userInfoCach = app.StorageUtil.get('userInfoCach');
      // if(userInfoCach.userId == userId){

      var cE = t + 1000 * 60 * attenceAfterTimeNumber; // }else{
      // var cE = t
      // }

      let checkTime = app.globalData.PublicUtil.formatTimeTwo(cS, "Y-M-D h:m") + ' - ' + app.globalData.PublicUtil.formatTimeTwo(cE, "h:m");
      return checkTime;
    },

    dealDetailObj: function (data, phone, reissueTime, checkTime) {
      console.log("-------------------------------------------------------------------------------------------------------------");
      console.log(data);
      let obj = {}; // 	// 补卡指定时间间隔

      let nowTimes = new Date().getTime();
      let meetingStartTime = new Date(reissueTime.startTime).getTime() + 1000 * 60 * reissueTime.reTime;
      let isShowResiss = meetingStartTime - nowTimes <= 0 ? -1 : 1; // 请假的所有信息

      let leaveInfo = data.leaveInfo;

      if (data.leaveInfo) {
        obj.applyReason = leaveInfo.applyReason != null ? leaveInfo.applyReason : "无";
        obj.applyTime = leaveInfo.applyTime != null ? app.globalData.PublicUtil.formatTimeTwo(leaveInfo.applyTime, 'Y-M-D h:m') : null;
        obj.handlerTime = leaveInfo.handlerTime != null ? app.globalData.PublicUtil.formatTimeTwo(leaveInfo.handlerTime, 'Y-M-D h:m') : null;
        obj.handlerResult = leaveInfo.handlerResult;
        obj.applyTimes = leaveInfo.applyTimes;
        obj.applyType = leaveInfo.applyType;

        if (leaveInfo.applyType == 30) {
          //补卡30、请假31、预约会议室0
          obj.applyType = "已补签";
          obj.isNoCheckMeeting = true;
          obj.showattendaceDetailDto = true;
          obj.hasNostart = true;
          obj.applyStatus = '补签';
          obj.icons = 'warn';
          obj.statusColors = '#404E57';

          if (leaveInfo.handlerResult == 10) {
            //10未处理（或申请汇总） 12同意 13拒绝
            obj.fircheckType = "处理中...";
            obj.firresicon = 'warn';
            obj.firresColor = '#F39827';
          } else if (leaveInfo.handlerResult == 12) {
            obj.fircheckType = "请假成功";
            obj.firresColor = '#20A4F7';
            obj.firresicon = 'success';
            obj.passLeave = true;
          } else if (leaveInfo.handlerResult == 13) {
            obj.fircheckType = "请假失败";
            obj.firresicon = 'clear';
            obj.firresColor = '#FF4747';
          }
        } else if (leaveInfo.applyType == 31) {
          obj.hasNostart = true;
          obj.applyType = "已请假";
          obj.icons = 'warn';
          obj.statusColors = '#404E57';
          obj.isNoCheckMeeting = true;
          obj.showattendaceDetailDto = true;
          obj.applyStatus = '请假';

          if (leaveInfo.handlerResult == 10) {
            //10未处理（或申请汇总） 12同意 13拒绝
            obj.fircheckType = "处理中...";
            obj.firresicon = 'warn';
            obj.firresColor = '#F39827';
          } else if (leaveInfo.handlerResult == 12) {
            obj.fircheckType = "请假成功";
            obj.firresColor = '#20A4F7';
            obj.firresicon = 'success';
            obj.passLeave = true;
          } else if (leaveInfo.handlerResult == 13) {
            obj.fircheckType = "请假失败";
            obj.firresicon = 'clear';
            obj.firresColor = '#FF4747';
          }
        } else if (leaveInfo.applyType == 0) {
          obj.showattendaceDetailDto = true;
          obj.firapplyReason = null;
          obj.applyType = "预约会议室";
          obj.statusColors = '#333';
          obj.isNoCheckMeeting = false;

          if (leaveInfo.handlerResult == 10) {
            //10未处理（或申请汇总） 12同意 13拒绝
            obj.fircheckType = "处理中...";
            obj.firresicon = 'warn';
            obj.firresColor = '#F39827';
          } else if (leaveInfo.handlerResult == 12) {
            obj.fircheckType = "已同意";
            obj.firresColor = '#20A4F7';
            obj.firresicon = 'success';
          } else if (leaveInfo.handlerResult == 13) {
            obj.fircheckType = "已拒绝";
            obj.firresicon = 'clear';
            obj.firresColor = '#FF4747';
          }
        }

        if (leaveInfo.attenceStatusInfo) {
          //考勤状态信息
          obj.executePlanId = leaveInfo.attenceStatusInfo.executePlanId;
          obj.LeMeetingRoomName = leaveInfo.attenceStatusInfo.checkInRoomName;
          obj.LecheckedTime = leaveInfo.attenceStatusInfo.checkInTime != null ? app.globalData.PublicUtil.formatTimeTwo(leaveInfo.attenceStatusInfo.checkInTime, 'Y-M-D h:m') : null;
          let cases = leaveInfo.attenceStatusInfo.status;

          switch (cases) {
            case 20:
              obj.statusLeColor = 'rgb(101,213,128)';
              obj.statusLeName = '打卡成功';
              obj.Leicon = 'success';
              obj.isApply = false;
              obj.Lename = '正常';
              obj.LemeetingTypeNameColor = '#20A4F7';
              break;

            case 21:
              obj.statusLeColor = 'rgb(234, 25, 50)';
              obj.statusLeName = '未签到';
              obj.Leicon = 'cancel';
              obj.isApply = false;
              obj.Lename = '未签到';
              obj.refSigns = data.length <= 1 ? "前去签到" : "";
              obj.firresColor = '#999';
              obj.LemeetingTypeNameColor = '#999';
              break;

            case 22:
              obj.statusLeColor = '#FF9200';
              obj.statusLeName = '迟到';
              obj.Leicon = 'warn';
              obj.isApply = false;
              obj.Lename = '缺卡';
              obj.LemeetingTypeNameColor = '#F39827';
              obj.refCards = isShowResiss == 1 ? "补卡申请" : "";
              obj.firresColor = '#999', obj.showResiss = true;
              obj.LemeetingTypeNameColor = '#F39827';
              break;

            case 23:
              obj.statusLeName = '无需考勤';
              obj.statusLeColor = '#20A4F7';
              obj.Lename = '请假';
              obj.Leicon = 'warn';
              obj.isApply = false;
              obj.LemeetingTypeNameColor = '#20A4F7';
              break;

            case 24:
              obj.statusLeName = '考勤成功';
              obj.statusLeColor = '#20A4F7';
              obj.Leicon = 'cancel';
              obj.Lename = '补签';
              obj.isApply = false;
              obj.LemeetingTypeNameColor = '#20A4F7';
			  
              break;

            case 30:
              obj.firresColor = '#999';
              obj.statusLeColors = '#999';
              obj.statusColor = 'rgb(234, 25, 50)';
              obj.statusLeName = '缺席';
              obj.Leicon = 'cancel';
              obj.Lename = '缺卡';
              obj.isApply = false;
              obj.LemeetingTypeNameColor = '#F39827';
              obj.showResiss = true; //缺席不显示补卡,但是显示补卡提示信息

              break;

            default:
              obj.statusLeName = '未知';
              obj.isApply = false;
              break;
          }
        }
      } // 考勤信息


      let checkedInfo = data.checkInInfo;

      if (checkedInfo) {
        obj.meetingId = checkedInfo.meetingId;
        obj.executePlanId = checkedInfo.executePlanId;
        obj.finalMeetingRoomName = checkedInfo.checkInRoomName;
        obj.checkedTime = checkedInfo.checkInTime != null ? app.globalData.PublicUtil.formatTimeTwo(checkedInfo.checkInTime, 'Y-M-D h:m') : '无';
        obj.isNoCheckMeeting = true;
        obj.showResiss = true;
        let cases = checkedInfo.status;

        switch (cases) {
          //20正常 21未签到 22迟到 30缺席 23请假 24补签
          case 20:
            obj.finallColor = '#20A4F7';
            obj.finallName = '考勤成功';
            obj.finallicon = 'success';
            obj.isApply = false;
            obj.finallname = '正常';
            obj.finallmeetingTypeNameColor = '#20A4F7';
            break;

          case 21:
            obj.finallColor = 'rgb(234, 25, 50)';
            obj.finallName = '未签到';
            obj.finallicon = 'cancel';
            obj.isApply = false;
            obj.finallname = '未签到';
            obj.refSign = "前去签到";
            obj.finallmeetingTypeNameColor = '#999';
            break;

          case 22:
            obj.firresColor = '#999';
            obj.finallColor = 'red';
            obj.finallName = '迟到';
            obj.finallicon = 'cancel';
            obj.finallname = '缺卡';
            obj.isApply = false;
            obj.refCard = isShowResiss == 1 ? "补卡申请" : "";
            obj.finallmeetingTypeNameColor = '#F39827';
            break;

          case 23:
            obj.finallName = '考勤成功';
            obj.finallColor = '#20A4F7';
            obj.finallicon = 'success';
            obj.finallname = '请假';
            obj.isApply = false;
            obj.finallmeetingTypeNameColor = '#20A4F7';
            break;

          case 24:
            obj.finallName = '考勤成功';
            obj.finallColor = '#20A4F7';
            obj.finallicon = 'success';
            obj.finallname = '补签';
            obj.isApply = false;
            obj.finallmeetingTypeNameColor = '#20A4F7';
            break;

          case 30:
            obj.firresColor = '#999';
            obj.finallColor = 'red';
            obj.finallName = '缺席';
            obj.finallicon = 'cancel';
            obj.finallname = '缺卡';
            obj.isApply = false;
            obj.finallmeetingTypeNameColor = '#F39827';
            break;

          default:
            obj.finallName = '未知';
            obj.isApply = false;
            break;
        }
      } // 补签信息


      let reissueInfo = data.supplementInfo;

      if (reissueInfo) {
        obj.ressiueReason = reissueInfo.applyReason != null ? reissueInfo.applyReason : "无";
        obj.ressiueTime = reissueInfo.applyTime != null ? app.globalData.PublicUtil.formatTimeTwo(reissueInfo.applyTime, 'Y-M-D h:m') : null;
        obj.ressiuehandlerTime = reissueInfo.handlerTime != null ? app.globalData.PublicUtil.formatTimeTwo(reissueInfo.handlerTime, 'Y-M-D h:m') : null;
        obj.handlerResult = reissueInfo.handlerResult;
        obj.ressiueTimes = reissueInfo.applyTimes;
        obj.ressiueType = reissueInfo.applyType;

        if (reissueInfo.applyType == 30) {
          //补卡30、请假31、预约会议室0
          obj.ressiueType = "已补签";
          obj.isNoCheckMeeting = true;
          obj.ressiueColors = '#333';
          obj.ressiueicons = 'warn';
          obj.showattendaceDetailDto = true;
          obj.hasNostart = true;
          obj.ressiueStatus = '补签';

          if (reissueInfo.handlerResult == 10) {
            //10未处理（或申请汇总） 12同意 13拒绝
            obj.ressiuecheckType = "处理中...";
            obj.ressiueresicon = 'warn';
            obj.ressiueresColor = '#F39827';
            obj.finallColor = '#999';
            obj.finallmeetingTypeNameColor = '#999';

            if (reissueInfo.applyTimes > 1) {
              obj.passLeave = true;
              obj.nopassRessuie = true;
              obj.finallColor = 'red';
              obj.finallmeetingTypeNameColor = '#F39827';
            }
          } else if (reissueInfo.handlerResult == 12) {
            obj.ressiuecheckType = "补签成功";
            obj.ressiueresColor = '#20A4F7';
            obj.ressiueresicon = 'success';
            obj.passLeave = true;
            obj.passRessuie = true;
            obj.finallColor = '#999';
            obj.finallmeetingTypeNameColor = '#999';
          } else if (reissueInfo.handlerResult == 13) {
            obj.ressiuecheckType = "补签失败";
            obj.ressiueresicon = 'clear';
            obj.ressiueresColor = '#FF4747';
            obj.nopassRessuie = true;
            obj.passLeave = true;
          }
        } else if (reissueInfo.applyType == 31) {
          obj.hasNostart = true;
          obj.ressiueType = "已请假";
          obj.ressiueicons = 'warn';
          obj.ressiueColors = '#333';
          obj.isNoCheckMeeting = true;
          obj.showattendaceDetailDto = true;
          obj.ressiueStatus = '请假';
          obj.finallColor = '#999';
          obj.finallmeetingTypeNameColor = '#999';

          if (reissueInfo.handlerResult == 10) {
            //10未处理（或申请汇总） 12同意 13拒绝
            obj.ressiuecheckType = "处理中...";
            obj.ressiueresicon = 'warn';
            obj.ressiueresColor = '#F39827';
          } else if (reissueInfo.handlerResult == 12) {
            obj.ressiuecheckType = "请假成功";
            obj.ressiueresColor = '#20A4F7';
            obj.ressiueresicon = 'success';
            obj.passLeave = true;
          } else if (reissueInfo.handlerResult == 13) {
            obj.ressiuecheckType = "请假失败";
            obj.ressiueresicon = 'clear';
            obj.ressiueresColor = '#FF4747';
          }
        } else if (reissueInfo.applyType == 0) {
          obj.showattendaceDetailDto = true;
          obj.firapplyReason = null;
          obj.ressiueType = "预约会议室";
          obj.ressiueColors = '#333';
          obj.isNoCheckMeeting = false;
          obj.finallColor = '#999';
          obj.finallmeetingTypeNameColor = '#999';

          if (reissueInfo.handlerResult == 10) {
            //10未处理（或申请汇总） 12同意 13拒绝
            obj.ressiuecheckType = "处理中";
            obj.ressiueresicon = 'warn';
            obj.ressiueresColor = '#F39827';
          } else if (reissueInfo.handlerResult == 12) {
            obj.ressiuecheckType = "已同意";
            obj.ressiueresColor = '#20A4F7';
            obj.ressiueresicon = 'success';
          } else if (reissueInfo.handlerResult == 13) {
            obj.ressiuecheckType = "已拒绝";
            obj.ressiueresicon = 'clear';
            obj.ressiueresColor = '#FF4747';
          }
        }

        if (reissueInfo.attenceStatusInfo) {
          //考勤状态信息
          obj.RecheckedTime = reissueInfo.attenceStatusInfo.checkInTime != null ? app.globalData.PublicUtil.formatTimeTwo(reissueInfo.attenceStatusInfo.checkInTime, 'Y-M-D h:m') : null;
          obj.ReMeetingRoomName = reissueInfo.attenceStatusInfo.checkInRoomName;
          let cases = reissueInfo.attenceStatusInfo.status;

          switch (cases) {
            case 20:
              obj.finallReColor = '#20A4F7';
              obj.finallReName = '考勤成功';
              obj.finallReicon = 'success';
              obj.isApply = false;
              obj.finallRename = '正常';
              obj.RemeetingTypeNameColor = '#20A4F7';
              break;

            case 22:
              obj.finallReColor = '#999';
              obj.finallColor = 'red';
              obj.finallReName = '迟到';
              obj.finallReicon = 'cancel';
              obj.finallRename = '缺卡';
              obj.refCard = isShowResiss == 1 ? "补卡申请" : "";
              obj.RemeetingTypeNameColor = '#F39827';
              break;

            case 23:
              obj.finallReName = '考勤成功';
              obj.finallReColor = '#20A4F7';
              obj.finallReicon = 'success';
              obj.finallRename = '请假';
              obj.RemeetingTypeNameColor = '#20A4F7';
              break;

            case 24:
              obj.finallReName = '考勤成功';
              obj.finallReColor = '#20A4F7';
              obj.finallReicon = 'success';
              obj.finallRename = '补签';
              obj.RemeetingTypeNameColor = '#20A4F7';
              break;

            case 30:
              obj.firresColor = '#999';
              obj.finallReColor = 'red';
              obj.finallReName = '缺席';
              obj.finallReicon = 'cancel';
              obj.finallRename = '缺卡';
              obj.RemeetingTypeNameColor = '#F39827';
              break;

            default:
              obj.finallReName = '未知';
              obj.isApply = false;
              break;
          }
        }
      }

      return obj; // if (data.length > 0) {
      // 	let statusApply = data[0]
      // 	let checkApply = data[1]
      // 	obj.appStatus = statusApply.applyType != null ? statusApply.applyType : -1;
      // 	obj.mobile = phone
      // 	obj.attendaceDetailDto = false
      // 	obj.firapplyTime =statusApply.applyTime !=null ? app.PublicUtil.formatTimeTwo(statusApply.applyTime, 'Y-M-D h:m') : null
      // 	obj.firapplyReason = statusApply.applyReason != null ? statusApply.applyReason : "无"
      // 	obj.firreviewTime =statusApply.handlerTime != null ? app.PublicUtil.formatTimeTwo(statusApply.handlerTime, 'Y-M-D h:m'): null
      // 	obj.hasFirApply = true
      //   obj.applyLeaveTimes = statusApply.applyTimes
      // 	if (obj.appStatus == 0) {
      // 		obj.showattendaceDetailDto = true
      // 		obj.firapplyReason = null
      // 		obj.applyType = "预约会议室"
      // 		obj.statusColors = '#333'
      // 		if (statusApply.handlerResult == 10) {
      // 			obj.fircheckType = "正在预约会议室"
      // 			obj.isNoCheckMeeting = false
      // 			obj.firresicon = 'warn';
      // 			obj.firresColor = '#F39827';
      // 		} else if (statusApply.handlerResult == 12) {
      // 			obj.fircheckType = "预约会议室成功"
      // 			obj.isNoCheckMeeting = true
      // 			obj.firresicon = '#20A4F7';
      // 			obj.firresColor = 'success'
      // 		} else if (statusApply.handlerResult == 13) {
      // 			obj.fircheckType = "预约会议室失败"
      // 			obj.isNoCheckMeeting = false
      // 			obj.firresicon = 'clear';
      // 			obj.firresColor = '#FF4747';
      // 		}
      // 	} else if (obj.appStatus == 30) {
      // 		obj.applyType = "已申请补卡"
      // 		obj.isNoCheckMeeting = true
      // 		obj.showattendaceDetailDto = true
      // 		obj.hasNostart = true
      // 	} else if (obj.appStatus == 31) {
      // 		obj.hasNostart = true
      // 		obj.applyType = "已请假"
      // 		obj.statusColors = '#333'
      // 		obj.isNoCheckMeeting = true
      // 		obj.showattendaceDetailDto = true
      // 		if (statusApply.handlerResult == 10) {
      // 			obj.fircheckType = "审核中..."
      // 			obj.isNoCheckMeeting = true
      // 			obj.firresicon = 'warn'
      // 			obj.firresColor = '#F39827'
      // 		} else if (statusApply.handlerResult == 12) {
      // 			obj.fircheckType = "已同意"
      // 			obj.isNoCheckMeeting = true
      // 			obj.firresColor = '#20A4F7'
      // 			obj.firresicon = 'success'
      // 			statusApply.attenceStatusInfo = null
      // 		} else if (statusApply.handlerResult == 13) {
      // 			obj.fircheckType = "请假失败"
      // 			obj.isNoCheckMeeting = true
      // 			obj.firresicon = 'clear'
      // 			obj.firresColor = '#FF4747'
      //       obj.hasNostart = false
      // 		}
      // 	} else {
      // 		obj.showattendaceDetailDto = false
      // 		obj.isNoCheckMeeting = true
      // 		obj.hasFirApply = false
      // 		console.log('没有请假,决定出席')
      // 	}
      // 	console.log()
      // 	if (statusApply.attenceStatusInfo != null) { //第一次考勤状态 
      // 		let attenceStatusInfos = statusApply.attenceStatusInfo
      // 		obj.meetingTime = app.PublicUtil.formatTimeTwo(attenceStatusInfos.startTime, 'Y-M-D h:m') + '-' + app.PublicUtil.formatTimeTwo(attenceStatusInfos.endTime, 'h:m');
      // 		obj.fircheckTime = attenceStatusInfos.checkTime == null ? '无' : app.PublicUtil.formatTimeTwo(attenceStatusInfos.checkTime,'Y-M-D h:m');
      // 		obj.meetingId = attenceStatusInfos.meetingId;
      // 		obj.executePlanId = attenceStatusInfos.executePlanId;
      // 		obj.showattendaceDetailDto = true
      // 		let cases = attenceStatusInfos.status
      // 		switch (cases) {
      // 			case 20:
      // 				obj.statusColor = 'rgb(101,213,128)';
      // 				obj.statusName = '打卡成功';
      // 				obj.icon = 'success';
      // 				obj.isApply = false;
      // 				obj.name = '正常';
      // 				break;
      // 			case 21:
      // 				obj.statusColor = 'rgb(234, 25, 50)';
      // 				obj.statusName = '未签到';
      // 				obj.icon = 'cancel';
      // 				obj.isApply = false;
      // 				obj.name = '未签到';
      // 				obj.refSign = data.length <= 1 ? "前去签到" : "";
      // 				obj.firresColor = '#999';
      // 				break;
      // 			case 22:
      // 				obj.statusColor = '#FF9200';
      // 				obj.statusName = '迟到';
      // 				obj.icon = 'warn';
      // 				obj.isApply = false;
      // 				obj.name = '缺卡';
      // 				obj.meetingTypeNameColor = '#F39827'
      // 				obj.refCard = data.length <= 1  && isShowResiss == 1 ? "补卡申请" : ""
      // 				// obj.refCard = data.length <= 1? "补卡申请" : ""
      // 				obj.firresColor = '#999',
      // 				obj.showResiss =  true 
      // 				break;
      // 			case 23:
      // 				obj.statusName = '请假';
      // 				obj.statusColor = '#20A4F7';
      // 				obj.icon = 'warn';
      // 				obj.isApply = false;
      // 				break;
      // 			case 24:
      // 				obj.statusName = '补签';
      // 				obj.icon = 'cancel';
      // 				obj.name = '缺卡'
      // 				obj.isApply = false;
      // 				break;
      // 			case 30:
      // 				obj.firresColor = '#999'
      // 				obj.statusColors = '#999'
      // 				obj.statusColor = 'rgb(234, 25, 50)';
      // 				obj.statusName = '缺席';
      // 				obj.icon = 'cancel';
      // 				obj.name = '缺卡'
      // 				obj.isApply = false;
      // 				obj.meetingTypeNameColor = '#F39827'
      // 				// obj.refCard = data.length <= 1 ? "补卡申请" : ""
      // 				// obj.firresColor = '#999'
      // 				obj.showResiss =   true ;  //缺席不显示补卡,但是显示补卡提示信息
      // 				break;
      // 			default:
      // 				obj.statusName = '未知';
      // 				obj.isApply = false;
      // 				break;
      // 		}
      // 	}
      // 	// 第二次审核
      // 	if (checkApply) {
      // 		obj.checkReason = checkApply.applyReason != null ? checkApply.applyReason : '无'
      // 		obj.seccheckTime =checkApply.applyTime != null ? app.PublicUtil.formatTimeTwo(checkApply.applyTime, 'Y-M-D h:m') : null;
      // 		obj.reviewTime = checkApply.handlerTime != null ? app.PublicUtil.formatTimeTwo(checkApply.handlerTime, 'Y-M-D h:m') : null;
      // 		obj.meetingAdress = checkApply.attenceStatusInfo.meetingRoomName
      // 		obj.applyicon = 'info'
      // 		obj.applyColor = 'rgba(32,164,247,.4)'
      // 		obj.showattendaceDetailDto = true	
      // 		obj.isNoCheckMeeting = true
      // 		obj.firresColor = '#999'
      // 		obj.statusColors = '#999'
      // 		if (checkApply.applyType == 30) {
      // 			obj.checkStatus = "补卡申请"
      // 			obj.statusColor = '#999'
      //       obj.makeCardTimes = checkApply.applyTimes != null ? checkApply.applyTimes : ''
      // 			obj.meetingTypeNameColor = '#999'
      // 			if (checkApply.handlerResult == 10) {
      // 				obj.checkType = "正在处理中..."
      // 				obj.resicon = 'warn'
      // 				obj.applyColor = '#999'
      // 				obj.resColor = '#333333'
      // 			} else if (checkApply.handlerResult == 12) {
      // 				obj.checkType = "补卡成功"
      // 				obj.resicon = 'success'
      // 				obj.resColor = '#999'
      // 				obj.applyColor = '#999'
      // 				obj.resultColor = '#20A4F7'
      // 			} else if (checkApply.handlerResult == 13) {
      // 				obj.checkType = "补卡失败"
      // 				obj.resicon = 'cancel'
      // 				obj.applyColor = '#999'
      // 				obj.resColor = 'red'
      //         obj.remarkCard =  isShowResiss == 1 ? true : false 
      // 			}
      // 		} else if (checkApply.applyType == 31) {
      // 			obj.checkStatus = "请假"
      // 			if (checkApply.handlerResult == 10) {
      // 				obj.checkType = "正在处理中..."
      // 				obj.resicon = 'warn'
      // 				obj.resColor = '#333333'
      // 			} else if (checkApply.handlerResult == 12) {
      // 				obj.checkType = "请假成功"
      // 				obj.resicon = 'success'
      // 				obj.resColor = '#20A4F7'
      // 			} else if (checkApply.handlerResult == 13) {
      // 				obj.checkType = "请假失败"
      // 				obj.resicon = 'cancel'
      // 				obj.resColor = 'red'
      // 			}
      // 		}
      // 		if(checkApply.attenceStatusInfo !=null){
      // 			obj.finallcheckTime = checkApply.attenceStatusInfo.startTime != null ? app.PublicUtil.formatTimeTwo(checkApply.attenceStatusInfo.startTime, 'Y-M-D h:m')  : "无"
      // 			obj.finallreviewTime = checkApply.attenceStatusInfo.checkTime == null ?  "无" : app.PublicUtil.formatTimeTwo(checkApply.attenceStatusInfo.checkTime,'Y-M-D h:m');
      // 			obj.finallAdress = checkApply.attenceStatusInfo.meetingRoomName != null ? checkApply.attenceStatusInfo.meetingRoomName : null
      // 			let cases = checkApply.attenceStatusInfo.status
      // 			obj.resColor = '#999'
      // 			switch (cases) {
      // 				case 20:
      // 					obj.finallColor = '#20A4F7';
      // 					obj.finallName = '考勤成功';
      // 					obj.finallicon = 'success';
      // 					obj.isApply = false;
      // 					obj.finallname = '正常';
      // 					obj.finallmeetingTypeNameColor = '#20A4F7'
      // 					break;
      // 				case 22:
      // 					obj.firresColor = '#999'
      // 					obj.finallColor = 'red';
      // 					obj.finallName = '迟到';
      // 					obj.finallicon = 'cancel';
      // 					obj.finallname = '缺卡'	
      // 					obj.isApply = false;
      // 					obj.finallmeetingTypeNameColor = '#F39827'
      // 					break;
      // 				case 23:
      // 					obj.finallName = '考勤成功';
      // 					obj.finallColor = '#20A4F7';
      // 					obj.finallicon = 'success';
      // 					obj.finallname = '请假';
      // 					obj.isApply = false;
      // 					obj.finallmeetingTypeNameColor = '#20A4F7'
      // 					break;
      // 				case 24:
      // 					obj.finallName = '考勤成功';
      // 					obj.finallColor = '#20A4F7';
      // 					obj.finallicon = 'success';
      // 					obj.finallname = '补签'
      // 					obj.isApply = false;
      // 					obj.finallmeetingTypeNameColor = '#20A4F7'
      // 					break;
      // 				case 30:
      // 					obj.firresColor = '#999'
      // 					obj.finallColor = 'red';
      // 					obj.finallName = '缺席';
      // 					obj.finallicon = 'cancel';
      // 					obj.finallname = '缺卡'	
      // 					obj.isApply = false;
      // 					obj.finallmeetingTypeNameColor = '#F39827'
      // 					break;
      // 				default:
      // 					obj.firresColor = '#999'
      // 					obj.finallColor = 'red';
      // 					obj.finallName = '缺席';
      // 					obj.finallicon = 'cancel';
      // 					obj.finallname = '缺卡'	
      // 					obj.isApply = false;
      // 					obj.finallmeetingTypeNameColor = '#F39827'
      // 					break;
      // 			}
      // 		}
      // 	}
      // 	return obj;
      // } else {
      // 	obj.showattendaceDetailDto = false
      // 	obj.mobile = phone
      // }
    },
    dealHandler: function (data) {
      let obj = {};
      obj.applyTime = app.globalData.PublicUtil.formatTimeTwo(data.applyTime, 'Y-M-D h:m');
      obj.applyReason = data.applyReason;

      if (data.handlerResult == 10) {
        obj.handlerName = '未处理';
        obj.handlerResult = data.handlerResult;
        obj.handlerTime = app.globalData.PublicUtil.formatTimeTwo(data.handlerTime, 'Y-M-D h:m');
      } else if (data.handlerResult == 12) {
        obj.handlerName = '已同意';
        obj.handlerTime = app.globalData.PublicUtil.formatTimeTwo(data.handlerTime, 'Y-M-D h:m');
      } else if (data.handlerResult == 13) {
        obj.handlerName = '已拒绝';
        obj.handlerTime = app.globalData.PublicUtil.formatTimeTwo(data.handlerTime, 'Y-M-D h:m');
      } else {
        obj.handlerName = '未知';
        obj.handlerTime = app.globalData.PublicUtil.formatTimeTwo(data.handlerTime, 'Y-M-D h:m');
      }

      return obj;
    },
    // 联系创建会议的人
    // toCreatorPhone: function(){
    // },
    // 请假申请
    askForLeaveApply: function (e) {
      console.log(e);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendAskForLeaveApplyUrl + '?meetingId=' + e.currentTarget.dataset.id + '&executePlanId=' + e.currentTarget.dataset.planId + '&applyTimes=' + e.currentTarget.dataset.index, 500);
    },
    // 签到
    toSignIn: function () {
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendAttendaceSignUrl +"?type=kqdk", 500);
    }
  }
};
</script>
<style>
@import "./attendMeetingDetail.css";
</style>