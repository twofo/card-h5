<template>
<view>
  <conflict-item :list="list" :sHeight="sHeight" 
			@lower="lower" :loadingMore="loadingMore" 
			@comfirmThisMeet="comfirmThisMeet" 
			@cancelThisMeet="cancelThisMeet" 
			@cancelRefuse="cancelRefuse" 
			@comfirmRefuse="comfirmRefuse"></conflict-item> 
</view>
</template>

<script>
let app = getApp();
import conflictItem from "../../resources/components/conflictList/conflictList";

export default {
  data() {
    return {
      list: [],
      sHeight: 600,
      loadingMore: '',
      //下拉加载更多
      ids: [],
      //
      applyId: '',
      //最终想要同意的会议id
      areaType: 1 //会议室 1 练功房 3
      ,
      reloadApprovePage: false
    };
  },

  components: {
    conflictItem
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sHeight: wx.getSystemInfoSync().windowHeight - 10
    });
    let areaType = 1;

    if (options.appiontType == '6') {
      //练功房6 会议室 5
      areaType = 3;
    }

    this.setData({
      areaType
    });
    this.getMeetingRoomAppointmentApprovalList(-1, areaType, 5, 0);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  onUnload() {
    wx.removeStorage({
      key: 'conflictList'
    });
  },

  methods: {
    /**
    * 获取会议室预约审核列表
    * status 状态。0未审核 1已审核  *** -1冲突 
    * ids 冲突id数组
    */
    getMeetingRoomAppointmentApprovalList: function (status, areaType, take, skip) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      const ids = app.globalData.StorageUtil.get('conflictList');
      this.setData({
        ids
      });
      console.log(ids);
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getApprovalAppointmentList + status + '/list' + '?take=' + take + '&skip=' + skip + '&ids=' + ids + '&areaType=' + areaType,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取会议室预约审核列表', res.data);

          if (res.data && res.data.code == 200) {
            if (areaType == 1) {
              _this.reduceData(res.data.rows);
            } else if (areaType == 3) {
              _this.reduceData1(res.data.rows);
            }
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

    /***  会议室
     * applyId:'1234',
          approvalType:1,
          titleStr:'会议室预约审核',
          name:'开会名称',
          applyName:"小艾",
          timeStr:"会议时间",
          time:'2020-02-26 09:00-11:30',
          reasonStr:'申请地址',
          applyReason:'B2>1层>105',
          applyTime:'2020-02-26 09:00-11:30'
      */
    reduceData(data) {
      let arr = [];

      for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj.areaType = this.areaType;
        obj.applyId = data[i].id;
        obj.name = data[i].meetingTitle;
        obj.approvalType = data[i].status;
        obj.applyName = data[i].initiatorName;
        obj.timeStr = "会议时间";
        obj.reasonStr = "申请地址";
				obj.showBtn = true;
        obj.applyReason = data[i].meetingAddress == null ? '无' : data[i].meetingAddress;
        obj.applyTime = app.globalData.PublicUtil.formatTimeTwo(data[i].applyTime, 'Y-M-D h:m');
        obj.time = app.globalData.PublicUtil.formatTimeTwo(data[i].meetingStartTime, 'Y-M-D h:m') + "-" + app.globalData.PublicUtil.formatTimeTwo(data[i].meetingEndTime, 'h:m');

        if (app.globalData.SystemInfo.platform == 'ios') {
          obj.applyTime = app.globalData.PublicUtil.formatTimeTwo(data[i].applyTime.replace(/-/g, '/'), 'Y/M/D h:m');
          obj.time = app.globalData.PublicUtil.formatTimeTwo(data[i].meetingStartTime.replace(/-/g, '/'), 'Y/M/D h:m') + "-" + app.globalData.PublicUtil.formatTimeTwo(data[i].meetingEndTime.replace(/-/g, '/'), 'h:m');
        }

        if (data[i].status == 0) {
          obj.titleStr = "会议室预约审核";
        }

        arr.push(obj);
      }
			console.log("arr",arr)
      this.setData({
        list: arr
      });
    },

    /**练功房数据 */
    reduceData1(data) {
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let arr = [];

      for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj.applyId = data[i].id;
        obj.areaType = this.areaType;
        obj.approvalType = data[i].status;
        obj.showBtn = false;

        if (userInfoCach.userId == data[i].responsibleTeacherId && data[i].status == 0) {
          obj.showBtn = true;
        }

        obj.applyName = data[i].createUserName;
        obj.timeStr = "预约时间";
        obj.reasonStr = "预约地址";
        obj.otherStr = '责任教师';
        obj.other = data[i].responsibleTeacher == null ? "无" : data[i].responsibleTeacher;
        obj.applyReason = data[i].appointmentAddress == null ? '无' : data[i].appointmentAddress;
        obj.applyTime = app.globalData.PublicUtil.formatTimeTwo(data[i].applyTime, 'Y-M-D h:m');
        obj.time = app.globalData.PublicUtil.formatTimeTwo(data[i].startTime, 'Y-M-D h:m') + "-" + app.globalData.PublicUtil.formatTimeTwo(data[i].endTime, 'h:m');

        if (app.globalData.SystemInfo.platform == 'ios') {
          obj.applyTime = app.globalData.PublicUtil.formatTimeTwo(data[i].applyTime.replace(/-/g, '/'), 'Y/M/D h:m');
          obj.time = app.globalData.PublicUtil.formatTimeTwo(data[i].startTime.replace(/-/g, '/'), 'Y/M/D h:m') + "-" + app.globalData.PublicUtil.formatTimeTwo(data[i].endTime.replace(/-/g, '/'), 'h:m');
        }

        if (data[i].status == 0) {
          obj.titleStr = "练功房预约审核";
        }
				
        arr.push(obj);
      }
			console.log(arr)
      this.setData({
        list: arr
      });
    },

    // 上拉刷新
    lower() {
      console.log("上拉刷新");
      this.setData({
        loadingMore: '已到底'
      });
    },

    // 同意某一个会议
    comfirmThisMeet(e) {
      console.log(e);
      let applyId = e.detail.applyId;

      if (this.areaType == 1) {
        let refuseMeeting = this.removeIndEle(this.ids, applyId);
        console.log(applyId, refuseMeeting);
        let data = {
          meetingId: applyId,
          status: 1,
          refuseMeetingArray: refuseMeeting
        };
        this.finalComfirmMeet(data, 12);
      } else if (this.areaType == 3) {
        this.toDanceRoomApproval(applyId, 12);
      }
    },

    // 取消同意某一个会议
    cancelThisMeet() {
      // 未同意通过会议时需要将删除掉的id恢复
      const ids = app.globalData.StorageUtil.get('conflictList');
      this.setData({
        ids
      });
    },

    // 取消拒绝某一个会议
    cancelRefuse(e) {},

    //同意拒绝某一个会议
    comfirmRefuse(e) {
      console.log(e);
      let applyId = e.detail.applyId;
      let approvalReason = e.detail.inputReason;

      if (this.areaType == 1) {
        let data = {
          meetingId: applyId,
          status: 0,
          approvalComments: approvalReason
        };
        this.finalComfirmMeet(data, 13);
      } else if (this.areaType == 3) {
        this.toDanceRoomApproval(applyId, 13, approvalReason);
      }
    },

    // 从冲突列表中除去通过的申请
    removeIndEle(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          return arr;
        }
      }
    },

    /**
     * 
     * @param { {
          meetingId: meetingId,
          status: type == 13 ? 0 : 1,
          approvalComments: approvalReason,
          refuseMeetingArray: refuseMeeting
        }} 
     */
    finalComfirmMeet: function (data, type) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
			app.globalData.ShowMsgUtil.showSuccessToast("审核中", 1500);
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.approvalMeetingRoomAppointment,
        data: data,
        method: 'POST',
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        success: function (res) {
          console.log('审核处理返回', res.data);

          if (res.data && res.data.code == 0) {
            
              app.globalData.ShowMsgUtil.showSuccessToast("审核成功", 2000);
            // 更新页面
            // app.PublicUtil.redirectByUrl(app.PageUrl.indexPageUrl.approvalInfoUrl, 500);


            uni.$emit("reload",{
              reloadApprovePage: true
            });
            uni.navigateBack({
              delta: 1
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

    /***
     * 练功房
     */
    toDanceRoomApproval: function (appointmentId, approvalStatus, reason) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.approvalDanceRoomAppointment,
        data: {
          appointmentId: appointmentId,
          approvalStatus: approvalStatus,
          reason: reason,
          isConflictHandle: true
        },
        method: 'POST',
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        success: function (res) {
          console.log('审核处理返回', res.data);

          if (res.data && res.data.code == 200) {
          
            app.globalData.ShowMsgUtil.showSuccessToast("审核成功", 2000);
           // 更新页面
            // app.PublicUtil.redirectByUrl(app.PageUrl.indexPageUrl.approvalInfoUrl, 500);


						uni.$emit("reload",{
							reloadApprovePage: true
						});
						uni.navigateBack({
							delta: 1
						});
          } else if (res.data.code == 500 && JSON.stringify(res.data.rows) != '{}') {} else {
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
