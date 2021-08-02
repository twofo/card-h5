<template>
<view class="page">
  <view class="page__bd page__bd_spacing">
    
      <!-- navbar导航 -->
      <view class="weui-flex myui-navbar-flex">
        <view class="myui-navbar-left">
          <view class="navbar-left text-center">  
					<!--  -->
           <selects id="select" 
						:options="approvalStatusOptions" 
						:defaultOption="approvalStatusDefault" 
						keys="approval_id" text="approval_name" @change="bindClickTabs">
						</selects>
						 
          </view>
        </view>
        <view class="weui-flex__item myui-navbar-center">
          <view class="navbar-center text-center">
           <selects id="select" 
								:options="approvalTypeOptions" 
								:defaultOption="approvalTypeDefault" 
								keys="approval_id" text="approval_name" @change="bindClickTabs"></selects>
          </view>
        </view>
        <!-- <view class="myui-navbar-right"><view class="navbar-right text-center" bindtap="queryList"> 查询</view></view> -->
      </view>
      

      <view class="weui-tab__panel myui-tab-items">
        <scroll-view scroll-y :style="'margin-top:-0rpx;height: ' + (windowHeight-80) + 'px;'" @scrolltolower="lower" @scroll="scroll" :scroll-top="scrollTop" lower-threshold="1" upper-threshold="10">
          <!-- 会议请假、留校、外宿申请、归寝请假 -->
          <block>
              <!-- 待办 -->
              <view class :hidden="selectApprovalStatusObj.id != 0" style="margin: 0rpx 10rpx 20rpx;">
                <approval-pending-list :list="waitList" @detail="bindDetail" @refuse="bindRefuse" @agree="bindAgree" :windowHeight="windowHeight" :nomore="nomore"></approval-pending-list>
              </view>
              <!-- 已处理 -->
              <view class :hidden="selectApprovalStatusObj.id != 1" style="margin: 0rpx 10rpx 20rpx;">
                <approval-finish-list :list="finishList" @detail="bindDetail" :windowHeight="windowHeight" :nomore="nomore"></approval-finish-list>
              </view>
          </block>

        </scroll-view>
        
      </view>
    
  </view>
</view>
</template>

<script>
var app = getApp();
var Constant = require("../../resources/constant.js"); // var clickApprovalStatusObj = '';
import select from "../../../../components/common/select/select";
import approvalPendingList from "../../resources/components/approvalPendingList/approvalPendingList";
import approvalFinishList from "../../resources/components/approvalFinishList/approvalFinishList";

export default {
  data() {
    return {
      // 导航数据
      approvalStatusOptions: Constant.approvalStatusOptions,
      approvalStatusDefault: Constant.approvalStatusDefault,
      approvalTypeDefault: Constant.approvalTypeDefault,
      approvalTypeOptions: {},
      userInfoCach: {},
      pullDownNumber: 0,
      scrollTop: 0,
      windowHeight: 0,
      nomore: false,
      //上拉加载结束提示
      isCanLoad: true,
      //用于控制下滑加载，从后台加载数量
      recordCount: 0,
      finishList: [],
      waitList: [],
      selectApprovalStatusObj: {},
      selectApprovalTypeObj: {},
      clickApprovalStatusObj: '',
      reloadApprovePage: false,
			
			
			//选择器
			selectVal1:""
    };
  },

  components: {
    "selects": select,
    approvalPendingList,
    approvalFinishList,
	
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   * 
   * 公有的 - 会议请假、会议室预约审核、
   * 铺导员 - 归寝请假、外校申请、留宿申请、
   */
  onLoad: function (options) {
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
		
		console.log(wx.getSystemInfoSync())
    this.setData({
      userInfoCach: app.globalData.StorageUtil.get('userInfoCach'),
      windowHeight: wx.getSystemInfoSync().screenHeight - 45
    });
    this.handleSelectData(userInfoCach); // 进入页面请求

    let approvalType = Constant.approvalTypeDefault.id;
    let approvalStatus = Constant.approvalStatusDefault.id;
    this.getApprovalList(approvalType, approvalStatus, 2, 0);
    this.setData({
      selectApprovalStatusObj: Constant.approvalStatusDefault,
      selectApprovalTypeObj: Constant.approvalTypeDefault
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		uni.$on('reload',this.reload)
    this.setData({
      nomore: false //上拉加载结束提示

    }); //进入页面加载

    this.recordCount = 0;
    this.isCanLoad = true; // this.showNotice()

    if (this.reloadApprovePage) {
      this.refush();
    }
  },

  /************************************************************** 下拉或上滑 *******************************************************************/
  //下拉更新
  onPullDownRefresh: function () {
    var _this = this;

    _this.setData({
      waitList: [],
      finishList: [],
      pullDownNumber: 0
    });

    if (this.isCanLoad) {
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();
      let approvalType = this.selectApprovalTypeObj.id;
      let approvalStatus = this.selectApprovalStatusObj.id;
      this.getApprovalList(approvalType, approvalStatus, 2, 0);
    }
  },

  onUnload() {
    wx.removeStorage({
      key: 'conflictList'
    });
  },

  methods: {
		reload(e){
			this.reloadApprovePage =  e.reloadApprovePage
			// this.refush();
		},
    handleSelectData: function (userInfoCach) {
      let publicApprovalTypeOptions = [];
      let counsellorApprovalTypeOptions = [{
        approval_id: '2',
        approval_name: '留校申请'
      }, {
        approval_id: '3',
        approval_name: '外宿申请'
      }, {
        approval_id: '4',
        approval_name: '归寝请假'
      }];
      let resourceAdminApprovalTypeOptions = [{
        approval_id: '5',
        approval_name: '会议室预约审核'
      }];
      let approvalTypeOptions = []; // 铺导员

      if (parseInt(userInfoCach.role) == app.globalData.Constant.roleTypeConstant.COUNSELOR) {
        approvalTypeOptions = counsellorApprovalTypeOptions;
      } else if (this.isResourcesAdmin()) {
        // 资源管理员
        approvalTypeOptions = resourceAdminApprovalTypeOptions;
      } else {
        approvalTypeOptions = publicApprovalTypeOptions;
      } // 练功房责任教师


      if (this.isDutyTeacher()) {
        approvalTypeOptions = approvalTypeOptions.concat(Constant.dutyteacherApprovalTypeOptions);
      }

      this.setData({
        approvalTypeOptions: approvalTypeOptions
      }); // let approvalTypeOptions = [];
      // // 根据不同的角色，设置不同的审核类型数据
      // if (userInfoCach.role == null && (userInfoCach.personType == 0 || userInfoCach.personType == 2) ) {
      //   // 学生
      //   approvalTypeOptions = Constant.publicApprovalTypeOptions;
      // } else if (userInfoCach.role == null && userInfoCach.personType == 1) {
      //   // 教师
      //   approvalTypeOptions = Constant.publicApprovalTypeOptions;
      // } else if (userInfoCach.role == app.Constant.roleTypeConstant.DORMADMIN) {
      //   // 功能选项组件 - 宿管
      //   approvalTypeOptions = Constant.publicApprovalTypeOptions;
      // } else if (userInfoCach.role == app.Constant.roleTypeConstant.COUNSELOR) {
      //   // 功能选项组件 - 辅导员
      //   console.log("功能选项组件 - 辅导员");
      //   approvalTypeOptions = Constant.counsellorApprovalTypeOptions;
      // } else{
      //   approvalTypeOptions = Constant.publicApprovalTypeOptions;
      // }
      // this.setData({
      //   approvalTypeOptions
      // })
    },
    // 判断是否存在资源管理员
    isResourcesAdmin: function () {
      const loginObjCach = app.globalData.StorageUtil.get('loginObjCach');

      if (loginObjCach.roleList != null) {
        for (let i = 0; i < loginObjCach.roleList.length; i++) {
          if (app.globalData.Constant.roleTypeConstant.RESOURCES_ADMIN == parseInt(loginObjCach.roleList[i])) {
            return true;
          }
        }
      }

      return false;
    },

    // 判断是否存在练功房责任教师
    isDutyTeacher() {
      const loginObjCach = app.globalData.StorageUtil.get('loginObjCach');

      if (loginObjCach.roleList != null) {
        for (let i = 0; i < loginObjCach.roleList.length; i++) {
          if (app.globalData.Constant.roleTypeConstant.DUTYTEACHER == parseInt(loginObjCach.roleList[i])) {
            return true;
          }
        }
      }

      return false;
    },

    /**
     * 点击下拉选项
     */
    bindClickTabs: function (e) {
			console.log(e)
      let type = e.detail.type;
			this.setData({
			  nomore: false //上拉加载结束提示
			
			});
      if (type == 1) {
        console.log('点击下拉选项');
        this.clickApprovalStatusObj = e.detail;
        this.queryList();
      } else if (type == 2) {
        this.setData({
          selectApprovalTypeObj: e.detail
        });
        this.queryList();
      }
    },

    /**
     * 点击查询
     */
    queryList: function () {
      let statusObj = this.selectApprovalStatusObj;
      let clickApprovalStatusObj = this.clickApprovalStatusObj;

      if (clickApprovalStatusObj != '') {
        this.setData({
          selectApprovalStatusObj: clickApprovalStatusObj
        });
        statusObj = clickApprovalStatusObj;
      } else {
        clickApprovalStatusObj = '';
      }

      this.setData({
        nomore: false
      });
      this.recordCount = 0;
      this.isCanLoad = true;
      this.setData({
        pullDownNumber: 0,
        finishList: [],
        waitList: []
      });
      let approvalType = this.selectApprovalTypeObj.id;
      let approvalStatus = statusObj.id;
      console.log("选中的会议状态");
      console.log(statusObj);
      console.log("type", approvalType);
      console.log("status", approvalStatus);
      this.getApprovalList(approvalType, approvalStatus, 2, 0);
    },

    /************************************************************** 逻辑代码 *******************************************************************/
    handleNavbarObj: function (obj) {},

    /**
     * 获取审核列表
     * 
     * approvalType 审核类型。1-会议请假 2-留校申请 3-外宿申请 4-归寝请假
     * approvalStatus 0-待审核 1-已完成
     * take 一次读取记录条数
     * skip 开始位置
     */
    getApprovalList: function (approvalType, approvalStatus, take, skip) {
      approvalType = parseInt(approvalType);

      switch (approvalType) {
        case 1:
          // 会议请假 
          this.getMeetingLeaveList(approvalStatus, take, skip);
          break;

        case 2: // 留校申请

        case 3:
          // 外宿申请
          this.getInOrOutSchoolList(approvalType, approvalStatus, take, skip);
          break;

        case 4:
          // 归寝请假
          if (approvalStatus == 0) {
            this.getDormLeaveWaitList(take, skip);
          } else {
            this.getDormLeaveProcessedList(take, skip);
          }

          break;

        case 5:
          // 会议室预约审核
          this.getMeetingRoomAppointmentApprovalList(approvalStatus, take, skip);
          break;

        case 6:
          // 练功房预约审批
          this.dancingAppiontList(approvalStatus, take, skip);
          break;

        default:
          console.warn("无此审核类型");
          break;
      }
    },

    /**
     * 进行审核
     * 
     * approvalType 审核类型。1会议请假 2留校申请 3外宿申请 4归寝请假
     * approvalValue 同意或拒绝
     */
    toApproval: function (approvalType, approvalId, approvalValue, approvalReason) {
      switch (parseInt(approvalType)) {
        case 1:
          // 会议请假 - 审核处理
          this.toMeetingLeaveApproval(approvalId, approvalValue);
          break;

        case 2: // 留校申请 - 审核处理

        case 3:
          // 外宿申请 - 审核处理
          let type = approvalValue == 12 ? 1 : -1;
          this.toInOrOutSchoolApproval(approvalId, type, approvalReason);
          break;

        case 4:
          // 归寝请假 - 审核处理
          this.toDormLeaveApproval(approvalId, approvalValue);
          break;

        case 5:
          // 会议室预约 - 审核处理
          this.toMeetingRoomApproval(approvalId, approvalValue, approvalReason);
          break;

        case 6:
          // 练功房预约 - 审核处理
          this.toDanceRoomApproval(approvalId, approvalValue, approvalReason, false);
          break;

        default:
          console.warn("无此审核类型");
          break;
      }
    },

    /**
    * 跳转到详情
    */
    bindDetail: function (e) {
      console.log('点击详情', e.detail); // app.PublicUtil.navigateByUrl(app.PageUrl.appointmentPageUrl.creatorAttendaceApproveDetailUrl + '?applyId=' + e.detail.applyId, 500);
    },

    /**
     * 同意申请
     */
    bindAgree: function (e) {
		var _this=this;
      let approvalType = e.detail.approvalType;
      let applyId = e.detail.applyId;
      let approvalValue = e.detail.type;
      let approvalReason = e.detail.inputReason;
      console.log('同意申请 - ', e);
	              wx.showModal({
	  					  title: '审批',
	  					  content: '是否确定审批',
	  					  confirmColor: '#20a4f7',
	  					  confirmText:"确定",
	  					  cancelText:'取消',
	  					  success: function (res) {
	  					    if (res.cancel) {
								console.log('1234');
	  					    }else{
	  					     _this.toApproval(approvalType, applyId, approvalValue, approvalReason);
							 console.log('1422');
	  						}
	  					  }
	  					});
      
    },

    showNotice(meetingId, ids, type) {
      let _this = this;
			console.log(type)
      wx.showModal({
        title: '',
        confirmText: "查看",
        cancelText: "不查看",
        confirmColor: "#20A4F7",
        content: '该预约与其他预约申请存在时间或其他冲突,可跳转至冲突列表查看,\r\n点击不查看则该预约通过审批,其他预约自动拒绝',

        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.conflictListUrl + '?appiontType=' + type, 500);
          } else if (res.cancel) {
            if (type == 6) {
              //type存在,则为练功房冲突
              let appointmentId = meetingId;
              let approvalStatus = '12';
              let approvalReason = '';
              _this.toDanceRoomApproval(appointmentId, approvalStatus, approvalReason, true);
            } else {
              let refuseMeetingArray = _this.removeIndEle(ids, meetingId);

              let data = {
                meetingId: meetingId,
                status: 1,
                refuseMeetingArray: refuseMeetingArray
              };
              console.log('用户点击取消');

              _this.finalComfirmMeet(data, 12);
            }

            return;
          }
        }

      });
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
       * 拒绝申请
       */
    bindRefuse: function (e) {
      console.log('拒绝申请- ', e);
      let approvalType = e.detail.approvalType;
      let applyId = e.detail.applyId;
      let approvalValue = e.detail.type;
      let approvalReason = e.detail.inputReason;
      this.toApproval(approvalType, applyId, approvalValue, approvalReason);
    },
    refush: function () {
      this.setData({
        finishList: [],
        waitList: []
      });
      let approvalType = this.selectApprovalTypeObj.id;
      let approvalStatus = this.selectApprovalStatusObj.id;
      console.log('查询状态');
      console.log(approvalStatus);
      this.getApprovalList(approvalType, approvalStatus, this.pullDownNumber * 2, 0);
    },

    /************************************************************** 获取审核列表 *******************************************************************/

    /**
     * 获取留校、外宿申请列表
     */
    getInOrOutSchoolList: function (approvalType, approvalStatus, take, skip) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      let applyType = approvalType == 2 ? 1 : 2;
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.inOrOutSchoolLists + '?applyType=' + applyType + '&approvalStatus=' + approvalStatus + '&skip=' + skip + '&take=' + take,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取留校、外宿申请列表返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.handlePageObj(approvalType, res.data.data);

            _this.handleRequestReturn(res.data.data);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
				complete:function(){
					uni.stopPullDownRefresh()
				}
      });
    },
    handleRequestReturn: function (rows) {
      var _this = this;

      _this.setData({
        nomore: false
      });

      if (rows.length != _this.recordCount) {
        _this.pullDownNumber++;
        _this.recordCount = rows.length;
        _this.isCanLoad = true;
      } else {
        _this.setData({
          isCanLoad: false,
          nomore: true
        });

        console.log(_this.nomore);
      }
    },

    /**
     * 获取会议请假审核列表
     * type=0 未审核列表 type！=0审核列表
     */
    getMeetingLeaveList: function (type, take, skip) {
			app.globalData.ShowMsgUtil.netErrNotice();
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.approvalApplyList + '?type=' + type + '&take=' + take + '&skip=' + skip,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('会议请假 - 获取审核列表', res.data);

          if (res.data && res.data.code == 200) {
            _this.handlePageObj(1, res.data.rows);

            _this.handleRequestReturn(res.data.rows);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
				complete:function(){
					uni.stopPullDownRefresh()
				}
      });
    },

    /**
     * 获取会议室预约审核列表
     * 
     */
    getMeetingRoomAppointmentApprovalList: function (type, take, skip) {
			app.globalData.ShowMsgUtil.netErrNotice();
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        // url: app.RequestUrl.appointmentRequestUrl.getAppointmentMeetingRoomList + '/'+type +'/list' + '?take=' + take + '&skip=' + skip,
        url: app.globalData.RequestUrl.appointmentRequestUrl.getApprovalAppointmentList + type + '/list' + '?areaType=1&take=' + take + '&skip=' + skip,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取会议室预约审核列表', res.data);

          if (res.data && res.data.code == 200) {
            _this.handlePageObj(5, res.data.rows);

            _this.handleRequestReturn(res.data.rows);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
				complete:function(){
					uni.stopPullDownRefresh()
				}
      });
    },

    /**
     * 获取归寝请假审核列表
     * 请求待办
     */
    getDormLeaveWaitList: function (take, skip) {
			app.globalData.ShowMsgUtil.netErrNotice();
      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.getWaitingApproval,
        data: {
          teacherId: userInfoCach.personId,
          take: take,
          skip: skip
        },
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取归寝请假审核列表返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.handlePageObj(4, res.data.rows);

            _this.handleRequestReturn(res.data.rows);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
				complete:function(){
					uni.stopPullDownRefresh()
				}
      });
    },

    /**
     * 获取归寝请假审核列表
     * 获取已处理
     */
    getDormLeaveProcessedList: function (take, skip) {
			app.globalData.ShowMsgUtil.netErrNotice();
      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.getProcessedApproval,
        data: {
          teacherId: userInfoCach.personId,
          take: take,
          skip: skip
        },
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取已处理列表查询返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.handlePageObj(4, res.data.rows);

            _this.handleRequestReturn(res.data.rows);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
				complete:function(){
					uni.stopPullDownRefresh()
				}
      });
    },

    /**
     * 获取练功房审批列表
     *
     */
    dancingAppiontList(status, take, skip) {
			app.globalData.ShowMsgUtil.netErrNotice();
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      // var ids = [4441, 4461, 4451];
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getApprovalAppointmentList + status + '/list' + '?areaType=3&take=' + take + '&skip=' + skip,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取区域预约审核列表', res.data);

          if (res.data && res.data.code == 200) {
            _this.handlePageObj(6, res.data.rows);

            _this.handleRequestReturn(res.data.rows);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
				complete:function(){
					uni.stopPullDownRefresh()
				}
      });
    },

    /**
     * 处理成页面显示数据
     */
    handlePageObj: function (approvalType, rows) {
      console.log("approvalType - ", approvalType);

      switch (parseInt(approvalType)) {
        case 1:
          // 会议请假 - 后台数据处理
          this.dealMeetingLeaveListPageObj(rows);
          break;

        case 2: // 留校申请 - 后台数据处理

        case 3:
          // 外宿申请 - 后台数据处理
          this.dealInOrOutSchoolApplyListPageObj(approvalType, rows);
          break;

        case 4:
          // 归寝请假 - 后台数据处理
          this.dealDormLeaveListPageObj(rows);
          break;

        case 5:
          // 其它 - 后台数据处理
          this.dealMeetingRoomAppointmentListPageObj(rows);
          break;

        case 6:
          this.dealDancingListPageObj(rows);
          break;

        default:
          console.warn("无此审核类型");
          break;
      }
    },
    dealMeetingRoomAppointmentListPageObj: function (data) {
      let array = [];

      if (data == null || data.length == 0) {
        return;
      }

      for (var i = 0; i < data.length; i++) {
        let obj = {};
        obj.approvalType = 5;
        obj.timeStr = "会议时间";
        obj.reasonStr = "会议标题";
        obj.time = app.globalData.PublicUtil.formatTimeTwo(data[i].meetingStartTime, 'Y-M-D') + '  ' + app.globalData.PublicUtil.formatTimeTwo(data[i].meetingStartTime, 'h:m') + '-' + app.globalData.PublicUtil.formatTimeTwo(data[i].meetingEndTime, 'h:m');
        obj.applyTime = app.globalData.PublicUtil.formatTimeTwo(data[i].applyTime, 'Y-M-D h:m:s');

        if (app.globalData.SystemInfo.platform == 'ios') {
          obj.time = app.globalData.PublicUtil.formatTimeTwo(data[i].meetingStartTime.replace(/-/g, "/"), 'Y-M-D') + '  ' + app.globalData.PublicUtil.formatTimeTwo(data[i].meetingStartTime.replace(/-/g, "/"), 'h:m') + '-' + app.globalData.PublicUtil.formatTimeTwo(data[i].meetingEndTime.replace(/-/g, "/"), 'h:m');
          obj.applyTime = app.globalData.PublicUtil.formatTimeTwo(data[i].applyTime.replace(/-/g, "/"), 'Y-M-D h:m:s');
        }

        obj.applyReason = data[i].meetingTitle;
        obj.applyName = data[i].initiatorName;
        obj.applyId = data[i].id;
        obj.titleStr = '会议室预约审核';
        obj.otherStr = '会议地址';
        obj.other = data[i].meetingAddress == null ? "无" : data[i].meetingAddress;
        obj.applyType = '会议室预约审核'; // obj.startTime = data[i].startTime;
        // obj.endTime = data[i].endTime;
        // obj.images = data[i].images;

        if (data[i].status == 1 || data[i].status == 2 || data[i].status == 3) {
          obj.statusName = '已审核';
          obj.statusColor = 'rgb(101,213,128)';
        } else if (data[i].status == -1) {
          obj.statusName = '已拒绝';
          obj.statusColor = 'rgb(234,25,50)';
        } else {
          obj.statusName = '未知';
        }

        array[i] = obj;
      }

      console.log('array-', array);

      if (this.selectApprovalStatusObj.id == 1) {
        this.setData({
          finishList: array
        });
      } else {
        this.setData({
          waitList: array
        });
      }

      return array;
    },

    dealDancingListPageObj(data) {
      let array = [];

      if (data == null || data.length == 0) {
        return;
      }

      for (var i = 0; i < data.length; i++) {
        let obj = {};
        obj.approvalType = 6;
        obj.timeStr = "预约时间";
        obj.reasonStr = "预约地址";
        obj.time = app.globalData.PublicUtil.formatTimeTwo(data[i].startTime, 'Y-M-D h:m') + '-' + app.globalData.PublicUtil.formatTimeTwo(data[i].endTime, 'h:m');
        obj.applyTime = app.globalData.PublicUtil.formatTimeTwo(data[i].applyTime, 'Y-M-D h:m:s');

        if (app.globalData.SystemInfo.platform == 'ios') {
          obj.time = app.globalData.PublicUtil.formatTimeTwo(data[i].startTime.replace(/-/g, "/"), 'Y-M-D h:m') + '-' + app.globalData.PublicUtil.formatTimeTwo(data[i].endTime.replace(/-/g, "/"), 'h:m');
          obj.applyTime = app.globalData.PublicUtil.formatTimeTwo(data[i].applyTime.replace(/-/g, "/"), 'Y-M-D h:m:s');
        }

        obj.applyReason = data[i].appointmentAddress == null ? "无" : data[i].appointmentAddress;
        obj.applyName = data[i].createUserName;
        obj.applyId = data[i].id;
        obj.titleStr = '练功房预约审核';
        obj.otherStr = '责任教师';
        obj.other = data[i].responsibleTeacher == null ? "无" : data[i].responsibleTeacher;
        obj.applyType = '练功房预约审核'; // obj.startTime = data[i].startTime;
        // obj.endTime = data[i].endTime;
        // obj.images = data[i].images;

        if (data[i].status == 1 || data[i].status == 2 || data[i].status == 3) {
          obj.statusName = '已审核';
          obj.statusColor = 'rgb(101,213,128)';
        } else if (data[i].status == -4) {
          obj.statusName = '已拒绝';
          obj.statusColor = 'rgb(234,25,50)';
        } else if (data[i].status == -3) {
          obj.statusName = '已过期';
          obj.statusColor = '#F39827';
        } else if (data[i].status == -2) {
          obj.statusName = '已取消';
          obj.statusColor = '#F39827';
        } else {
          obj.statusName = '未知';
        }

        array[i] = obj;
      }

      console.log('array-', array);

      if (this.selectApprovalStatusObj.id == 1) {
        this.setData({
          finishList: array
        });
      } else {
        this.setData({
          waitList: array
        });
      }

      return array;
    },

    dealInOrOutSchoolApplyListPageObj: function (approvalType, rows) {
      var array = [];

      if (rows == null || rows.length == 0) {
        return;
      }

      for (let i = 0; i < rows.length; i++) {
        let obj = {};
        obj.approvalType = approvalType;
        obj.applyId = rows[i].id;
        obj.titleStr = rows[i].title;
        obj.timeStr = "申请时间";
        obj.reasonStr = "申请原因";
        obj.name = rows[i].title;
        obj.applyName = rows[i].applyUserName;
        obj.time = app.globalData.PublicUtil.formatTimeTwo(rows[i].applyStartTime, 'Y-M-D') + ' -> ' + app.globalData.PublicUtil.formatTimeTwo(rows[i].applyEndTime, 'Y-M-D');
        obj.applyReason = rows[i].applyReason;
        obj.applyTime = rows[i].applyTime;

        if (rows[i].status == 1) {
          obj.statusName = '已同意';
          obj.statusColor = 'rgb(101,213,128)';
        } else if (rows[i].status == -1) {
          obj.statusName = '已拒绝';
          obj.statusColor = 'rgb(234,25,50)';
        } else {
          obj.statusName = '未知';
        }

        obj.applyType = rows[i].title;
        array[i] = obj;
      }

      console.log('array-', array);

      if (this.selectApprovalStatusObj.id == 1) {
        this.setData({
          finishList: array
        });
      } else {
        this.setData({
          waitList: array
        });
      } // this.setData({
      //   approvalList: array,
      // })

    },

    /**
     * 会议请假 - 后台数据处理
     * @param {*} rows 
     */
    dealMeetingLeaveListPageObj: function (rows) {
      var array = [];

      if (rows == null || rows.length == 0) {
        return;
      }

      let data = rows;

      for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj.approvalType = 1;
        obj.timeStr = "会议时间";
        obj.reasonStr = "申请原因";
        obj.applyId = data[i].id;
        obj.time = app.globalData.PublicUtil.formatTimeTwo(data[i].meetingTime, 'Y-M-D') + ' ' + data[i].startTime + '-' + data[i].endTime; // obj.applyTime = app.PublicUtil.formatTimeTwo(data[i].applyTime, 'Y-M-D h:m');

        obj.applyTime = app.globalData.PublicUtil.formatTimeTwo(data[i].applyTime, 'Y-M-D h:m');
        obj.applyReason = data[i].reason;
        obj.applyName = data[i].personName;
        obj.name = data[i].meetingTitle;
        obj.meetingId = data[i].planId;
        obj.applyType = this.dealType(data[i].type);

        if (data[i].handlerResult == 12) {
          obj.statusName = '已同意';
          obj.statusColor = 'rgb(101,213,128)';
        } else if (data[i].handlerResult == 13) {
          obj.statusName = '已拒绝';
          obj.statusColor = 'rgb(234,25,50)';
        } else {
          obj.statusName = '未知';
        }

        array[i] = obj;
      }

      console.log('array-', array); // let arrayRe = array.reverse()

      if (this.selectApprovalStatusObj.id == 1) {
        this.setData({
          finishList: array
        });
      } else {
        this.setData({
          waitList: array
        });
      } // this.setData({
      //   approvalList: array,
      // })

    },
    dealType: function (type) {
      let str = '';

      switch (type) {
        case 30:
          str = '补签';
          break;

        case 31:
          str = '请假';
          break;

        default:
          str = '暂无';
          break;
      }

      return str;
    },

    /**
     * 归寝请假 - 后台数据处理
     * @param {*} data 
     */
    dealDormLeaveListPageObj: function (data) {
      let array = [];

      for (var i = 0; i < data.length; i++) {
        let obj = {};
        obj.approvalType = 4;
        obj.timeStr = "打卡时间";
        obj.reasonStr = "补卡原因";
        obj.applyId = data[i].id;
        obj.time = app.globalData.PublicUtil.formatTimeTwo(data[i].executeTime, 'Y-M-D') + '  ' + data[i].startTime + '-' + data[i].endTime;
        obj.applyTime = app.globalData.PublicUtil.formatTimeTwo(data[i].applyTime, 'Y-M-D h:m');
        obj.applyReason = data[i].reason;
        obj.applyName = data[i].personName;
        obj.applyId = data[i].id;
        obj.titleStr = '归寝考勤';
        obj.applyType = this.dealType(data[i].type); // obj.startTime = data[i].startTime;
        // obj.endTime = data[i].endTime;

        obj.images = data[i].images;

        if (data[i].handlerResult == 12) {
          obj.statusName = '已同意';
          obj.statusColor = 'rgb(101,213,128)';
        } else if (data[i].handlerResult == 13) {
          obj.statusName = '已拒绝';
          obj.statusColor = 'rgb(234,25,50)';
        } else {
          obj.statusName = '未知';
        }

        array[i] = obj;
      }

      console.log('array-', array);

      if (this.selectApprovalStatusObj.id == 1) {
        this.setData({
          finishList: array
        });
      } else {
        this.setData({
          waitList: array
        });
      }

      return array;
    },

    /************************************************************** 同意或拒绝处理 *******************************************************************/

    /**
     * 留校、外宿等记录 - 审核
     */
    toInOrOutSchoolApproval: function (recordId, approvalType, approvalReason) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.inOrOutSchoolApproval,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {
          recordId: recordId,
          approvalType: approvalType,
          approvalReason: approvalReason
        },
        success: function (res) {
          wx.hideToast({});
          console.log('留校、外宿审核返回', res.data);

          if (res.data && res.data.code == 200) {
            if (approvalType == -1) {
              app.globalData.ShowMsgUtil.showSuccessToast("拒绝成功", 2000);
            } else if (approvalType == 1) {
              app.globalData.ShowMsgUtil.showSuccessToast("同意成功", 2000);
            } else {
              app.globalData.ShowMsgUtil.showSuccessToast("操作成功", 2000);
            } // 更新页面


            setTimeout(function () {
              _this.refush();
            }, 2000);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
				complete:function(){
					uni.stopPullDownRefresh()
				}
      });
    },

    /**
      * 会议请假审核处理
      * 同意或拒绝申请
      */
    toMeetingLeaveApproval: function (applyId, type) {
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
              _this.refush();
            }, 2000);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
					uni.stopPullDownRefresh()
				}
      });
    },

    /**
     * 归寝请假审核
     * 审核处理
     */
    toDormLeaveApproval: function (applyId, type) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); // console.log('applyId', applyId);
      // console.log('type', type);

      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.handleApproval,
        data: {
          personId: userInfoCach.personId,
          personType: userInfoCach.personType,
          applyId: applyId,
          type: type
        },
        method: 'PUT',
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        success: function (res) {
          console.log('审核处理返回', res.data);

          if (res.data && res.data.code == 200) {
            if (type == 13) {
              app.globalData.ShowMsgUtil.showSuccessToast("拒绝成功", 2000);
            } else if (type == 12) {
              app.globalData.ShowMsgUtil.showSuccessToast("同意成功", 2000);
            } // 更新页面


            setTimeout(function () {
              _this.refush();
            }, 2000);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
				
      });
    },

    /**
     * 审核会议室预约
     * 审核处理
     */
    toMeetingRoomApproval: function (meetingId, type, approvalReason) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.approvalMeetingRoomAppointment,
        data: {
          meetingId: meetingId,
          status: type == 13 ? 0 : 1,
          approvalComments: approvalReason,
          refuseMeetingArray: []
        },
        method: 'POST',
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        success: function (res) {
          console.log('审核处理返回', res.data);

          if (res.data && res.data.code == 0) {
            if (type == 13) {
              app.globalData.ShowMsgUtil.showSuccessToast("拒绝成功", 2000);
            } else if (type == 12) {
              app.globalData.ShowMsgUtil.showSuccessToast("同意成功", 2000);
            } // 更新页面


            setTimeout(function () {
              _this.refush();
            }, 2000);
          } else if (res.data.code == 500 && JSON.stringify(res.data.rows) != '{}') {
            let len = res.data.rows.length;
            let Ids = [];
            console.log(len);

            for (let i = 0; i < len; i++) {
              console.log(res.data.rows[i]);
              Ids.push(res.data.rows[i].id);
            }

            app.globalData.StorageUtil.set('conflictList', Ids);

            _this.showNotice(meetingId, Ids, "5");
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
     * 会议室审批最后审批,不查看 会议冲突列表 和直接 拒绝 该会议时使用
     * 
     */
    finalComfirmMeet: function (data, type) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
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
          

            setTimeout(function () {
              _this.refush();

              _this.onUnload();
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
    },

    /**
     * 练功房预约  审批处理
     * @param {*} approvalId 
     * @param {*} approvalValue 
     * @param {*} approvalReason 
     */
    toDanceRoomApproval: function (appointmentId, approvalStatus, reason, isConflictHandle) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.approvalDanceRoomAppointment,
        data: {
          appointmentId: appointmentId,
          approvalStatus: approvalStatus,
          reason: reason,
          isConflictHandle: isConflictHandle
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
          

            setTimeout(function () {
              _this.refush();
							// #ifdef APP-PLUS || H5
								wx.removeStorage({
									key: 'conflictList'
								});
							// #endif
							// #ifdef MP-WEIXIN
							_this.onUnload();
							// #endif
            }, 2000);
          } else if (res.data.code == 500 && JSON.stringify(res.data.rows) != '{}') {
            let Ids = [],
                appiontType = "6";
            let len = res.data.data.length;
            console.log(len);

            for (let i = 0; i < len; i++) {
              console.log(res.data.data[i]);
              Ids.push(res.data.data[i].id);
            }

            app.globalData.StorageUtil.set('conflictList', Ids);

            _this.showNotice(appointmentId, Ids, appiontType);
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
    //上滑加载更多
    lower: function () {
      var _this = this;

      if (this.isCanLoad) {
        app.globalData.ShowMsgUtil.showLoadAndMsgToast();
        let approvalType = this.selectApprovalTypeObj.id;
        let approvalStatus = this.selectApprovalStatusObj.id;
        this.getApprovalList(approvalType, approvalStatus, (this.pullDownNumber + 1) * 2, 0);
      }
    },
    scroll: function (event) {}
  }
};
</script>
<style>
@import "./approvalInfo.css";
</style>