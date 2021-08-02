<template>
<!--pages/appointmentModule//pages/test/test.wxml-->
<text>pages/appointmentModule//pages/test/test.wxml</text>
</template>

<script>
var app = getApp();
var ImageUrl = require("../../resources/utils/imageUrl.js");

export default {
  data() {
    return {};
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 会议考勤
    // this.toTest();
    // this.getAllRoomByType();
    // this.getDetail();
    // this.selectPersonnel();
    // this.creatMeeting();
    // this.createListByStatus();
    // this.meetingDetail();
    // this.updateMeeting();
    // this.cancelMeeting();
    // this.checkInDetail();
    // this.statistics();
    // this.searchPersonnel();
    // this.getMeetingRoomAppointmentApprovalList(-1, 5, 0);
    //琴房
    // this.getAppointmentConfigure();
    // this.getAppointmentDetail();
    // this.getChargeInfo();
    // this.createPiano();
    // this.getCancelInfo();
    // this.toCancelPianoAppointment();
    // this.getList();
    // this.getDetailById();
    // this.getAllRoomByType();
    // 会议与练功房   V2.0
    // this.getAppointmentConfigure();
    // this.getAppointmentDetail(1, 721);
    // this.getAppointmentDetail(3, 1481);
    // this.searchPersonnel();
    // this.createAppointment();
    // this.getAppointmentList();
    // this.getAppointmentDetailById();
    // this.getChargeDetail();
    // this.getApprovalAppointmentList(0, 5, 0);
    // this.toDanceRoomApproval(5411, 12, '123');
    // this.getAppointmentCancelInfo();
    // this.toCancelAppointment();
    this.toUpdateAppointment(); // for(let i = 0; i < 10; i++){
    //   this.handlerWaterReport();
    // }
  },
  methods: {
    /************************************ 接口V2.0 琴房与练功房 */

    /**
     * TODO 更新
     * 获取预约，所需的配置信息
     * - 请求数据
     * areaType 房间类型：1会议室 2实训室 3练功房
     * 
     * - 返回数据
     * buildInfoDtos{ 筛选 - 楼栋
     *    buildId 楼栋Id
     *    buildName 楼栋名
     * }
     * areaTypeDtos{ 筛选 - 区域类型
     *    name 名称
     *    type 琴房，1-普通琴房、2-专用琴房、3-公共琴房、4-专业琴房；会议，1-大会议室、2-中会议室、3-小会议室
     * }
     * weekDtos{
     *    dateStr 时间字符串
     *    dayWeek 星期几
     *    timestamp 时间戳
     * }
     * AppAppointmentConfigureDto{
     *    appointmentAdvanceTime 预约提前时间
     *    cancelAdvanceTime 取消提前时间
     *    msgAdvanceTime 预约开始提示信息提前时间。会议里还包括提前考勤时间
     *    isRefundFeeTimeLength 是否退还免费时间 1退 0不退【琴房专用】
     * }
     * 
     * 
     */
    getAppointmentConfigure: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentConfigure + '?areaType=3',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取预约，所需的配置信息"', res.data);

          if (res.data && res.data.code == 200) {} else {
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
      * TODO 更新
     * 根据区域类型获取所有房间
     * - 请求数据
     * areaType 房间类型：1会议室 2实训室 3练功房   【必填】
     * selectDate 需查询的日期，时间戳    【必填】
     * selectAreaLayer 筛选条件。1楼栋、3房间。会议只能选择楼栋、琴房有楼栋、房间两种选择   【必填】
     * selectAreaId 筛选条件。楼栋ID（会议）、房间ID（琴房）    【可选填 】  
     * selectType 筛选条件。琴房类型或会议类型    【可选填】
     * 
     * - 返回数据
     * AppAppointmentDetailV2Response{ 
     *    roomId 房间ID
     *    roomStr 房间名
     *    buildStr 楼栋名
     *    areaType 区域类型
     *    detailOfDayDto{ 预约详情
     *      startTimeStr 开始时间字符串
     *      endTimeStr 结束时间字符串
     *      startTime 开始时间
     *      endTime 结束时间
     *      appointmentStatus 预约状态。1可预约、2不可预约、3已经预约
     *      
     *      appointmentCount 已预约计数
     *      appointmentRate 琴房预约率
     *      pianoTypeName 琴房类型名
     *    }
     * }
     * 
     */
    getAppointmentDetail: function (selectAreaLayer, selectAreaId) {
      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentDetail + '?areaType=3' + '&selectDate=1608102085000' + '&selectAreaLayer=' + selectAreaLayer + '&selectAreaId=' + selectAreaId,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('根据预约房间、预约时间段获取指定的预约情况"', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * 人员搜素
     * - 请求数据
     * searchType 搜素类型。1全部 2个体查询-教师学生 3群体查询-专业部门 4角色查询   【必填，2、3用于会议搜素】
     * nameStr 根据名称（学生、教师、班级等）搜素   【可选填】
     * roleType 角色类型   【可选填，用于练功房】16-舞蹈房管理员
     * skip 跳过记录条数    【可选填，默认是0】
     * take 筛选条件 一次读取记录条数   【可选填，默认是10】
     * 
     * - 返回数据
     * AppSearchPersonsResponse{ 
     *    selectRole 人员角色：1学生 2教师
     *    selectType 选择类型：1院系 2专业 3班级 4学生 1部门 4教师
     *    selectName 名称
     *    selectId 选择人员：Id
     *    isHasChild 是否可展开：1可以 0不可以
     * 
     */
    searchPersonnel: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.searchPersonnel + '?searchType=4&roleType=16',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('人员搜素返回"', res.data);

          if (res.data && res.data.code == 200) {} else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
    // /**
    //  * 创建琴房预约
    //  * - 请求参数
    //  * areaType 房间类型：1会议室 2琴房 3练功房   【必填】
    //  * areaId 实训室Id    【必填】
    //  * startTime 预约开始时间   【必填】
    //  * endTime 预约结束时间   【必填】
    //  * createUserName 预约创建人姓名    【必填】
    //  * remark 备注
    //  * consumeChannel 消费渠道
    //  * responsibleTeacherId 责任教师id    【选填，练功房所需】
    //  * - 成功后，返回参数
    //  * appointmentId 预约id
    //  * appointmentUserName 预约 用户姓名
    //  * appointmentTime 预约时间
    //  * deductionMoney 支付金额
    //  */
    createAppointment: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.createAreaAppointment,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {
          areaType: 3,
          responsibleTeacherId: 4141,
          roomId: 1481,
          //1121
          startTime: 1608076800000,
          endTime: 1608080400000,
          createUserName: '浩',
          remark: '练习',
          consumeChannel: 1
        },
        success: function (res) {
          wx.hideToast({});
          console.log('创建琴房预约', res.data);

          if (res.data && res.data.code == 200) {} else if (res.data && res.data.code == 201) {
            return;
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
     * 获取琴房预约列表
     * 已完成 -1退费 2已结束 3已取消
     * 未完成 0未开始 1使用中
     * - 请求参数
     * areaType 房间类型：1会议室 2琴房 3练功房 
     * status 会议状态数组。0申请中、1未开始、2使用中、3已结束、-1退费、-2已取消、-3已过期、-4已拒绝
     * take 读取记录条数    【可选填，默认是0】
     * skip 跳过记录条数    【可选填，默认是10】
     * - 返回参数
     * id id
     * status 状态
     * pianoAddress 琴房位置
     * startTime 预约开始时间
     * endTime 预约结束时间
     * appointmentUserName 预约人姓名
     * applyTime 申请时间
     */
    getAppointmentList: function () {
      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let status = [-1, 2, 3, 0, 1];
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAreaAppointmentList,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {
          areaType: 3,
          status: status,
          take: 6,
          skip: 0
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取琴房预约列表', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * 获取琴房预约详情
     * 
     * - 请求参数
     * areaType 房间类型：1会议室 2琴房 3练功房
     * appointmentId 琴房预约id
     * - 返回参数
     * appointmentInfo 琴房/练功房预约信息
     * {
     *    timeLength 预约使用时长
     *    status 状态
     *    pianoAddress 琴房位置
     *    startTime 预约开始时间
     *    endTime 预约结束时间
     *    appointmentUserName 预约人姓名
     *    applyTime 申请时间
     *    reremark 备注
     *    appiontCancelTime   允许取消预约的时间
     * } 
     * appointmentChargeInfo 琴房/练功房预约费用信息
     * {
     *    totalTimeLength 总计时长
     *    feeTimeLength 免费时长
     *    totalConsume 总共花费
     *    realityConsume 实际花费
     *    payMethod 支付方式：0系统代扣，1微信支付，2支付宝支付，3银联支付  -1无
     * }
     * buildManagerInfo 琴房/练功房管理信息
     * {
     *    pianoManagerName 琴房管理员姓名姓名
     *    pianoManagerPhoneNumber 琴房管理员电话号码 
     * }
     * AppPianoDetailCancelNode 取消预约节点信息
     * {
     *    appointmentStatus 琴房预约状态 - 取消预约 -1
     *    cancelAppointmentTime 取消预约时间
     *    refundStatus 退款状态。   2-审核中  3-审核通过 4-审核拒绝
     *    approveRefundTime 退款审批时间
     *    pianoRefundChargeInfo 退款成功后的 - 费用信息
     *    pianoRefundChargeInfo
     *    {
     *        shouldRefundCharge 应退费用
     *        serviceCharge 手续费
     *        realityDeductionMoney 实退费用   
     *    }
     * }
     * attendanceInfo 预约考勤信息
     * {
     *    checkInInfo{
     *      appointmentId 预约ID
     *      checkInRoomName 打卡地址
     *      status 状态 20正常签到 21签到 22正常签退 30自动签退
     *      startTime 开始时间 时间戳
     *      endTime 结束时间 时间戳
     *      checkInTime 打卡时间
     *    }
     *    checkOutInfo{
     *      与上面一致
     *    }
     * }
     */
    getAppointmentDetailById: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAreaAppointmentDetail + 4811 + '/detail?areaType=3',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取琴房预约详情', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * 获取收费信息
     * - 请求参数
     * areaType 房间类型：1会议室 2琴房 3练功房
     * roomId 琴房/练功房Id
     * chargeType 费用类型。1收费 2退款手续费
     * - 返回参数
     * chargeSettings 琴房预约信息
     * {
     *    feeTimeLength 免费剩余时长
     *    unitPrice 每小时收费单价
     *    balance 余额
     * } 
     * serviceChargeSettings 琴房/练功房预约手续费费用信息 - 单位%
     * {
     *    rateOverTwentyFour 超过24小时的费用率 
     *    rateTwentyFouraAndTwelve 24小时到12小时之间的费用率
     *    rateTwelveAndOne 12小时到1小时的费用率
     * }
     */
    getChargeDetail: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getChargeDetail + '?areaType=3&roomId=' + 1091 + '&chargeType=2',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取收费信息', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * 获取预约会议室/练功房审核列表
     * approvalType 状态。0未审核 1已审核 -1冲突  【必填】
     * areaType 房间类型：1会议室 2琴房 3练功房   【必填】
     * take 一次读取记录条数  【选填，默认10】
     * skip 开始位置    【选填，默认0】
     * ids 冲突ids    【选填，只有冲突查询时所需】
     */
    getApprovalAppointmentList: function (status, take, skip) {
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      var ids = [4441, 4461, 4451];
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getApprovalAppointmentList + status + '/list' + '?areaType=3&take=' + take + '&skip=' + skip,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取区域预约审核列表', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * 审核练功房预约
     * isConflictHandle 是否进行冲突处理    【选填，只是在需要查询冲突列表时为true，其他为false】
     * appointmentId 审核预约Id不能为空   【必填】
     * approvalStatus 审核状态。10申请 12同意 13拒绝    【必填】
     * reason 原因    【选填】
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

          if (res.data && res.data.code == 0) {} else if (res.data.code == 500 && JSON.stringify(res.data.rows) != '{}') {} else {
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
     * 获取预约取消信息
     * 
     * - 请求参数
     * appointmentId 预约id
     * - 返回参数
     * appointmentInfo 预约信息
     * {
     *    addressStr 琴房位置
     *    startTime 预约开始时间
     *    endTime 预约结束时间
     *    appointmentUserName 预约人姓名
     *    applyTime 申请时间
     *    reremark 备注
     * } 
     * userInfo 预约用户信息
     * {
     *    name 姓名
     *    userNo 学号/职工号
     *    majorName 专业名称（学生）/校区名称（教师）
     *    deptName 院系名称（学生）/部门名称（教师）
     *    personType 人员类型：1教师 0学生
     * }
     * appointmentChargeInfo 预约费用信息
     * {
     *    unitPrice 收费标准
     *    totalTimeLength 总计时长
     *    feeTimeLength 免费时长
     *    deductionMoney 总计 - 预约费用 （应收金额）
     *    deductionBalance 除免费时长后 - 扣除个人余额的费用
     * }
     * appointmentRefundChargeInfo 预约退款手续费信息
     * {
     *    shouldRefundCharge 应退费用
     *    serviceCharge 手续费
     *    realityDeductionMoney 实退费用
     * }
     */
    getAppointmentCancelInfo: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentCancelInfo + 3181 + '/detail',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取预约取消信息', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * 取消实训室预约
     * 
     * - 请求参数
     * appointmentId 琴房预约id
     * realityDeductionMoney 实退费用
     * serviceCharge 手续费
     * - 返回参数
     * msg
     */
    toCancelAppointment: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.toCancelAppointment,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {
          appointmentId: 3181,
          realityDeductionMoney: 7,
          serviceCharge: 3
        },
        success: function (res) {
          wx.hideToast({});
          console.log('取消琴房预约', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * 编辑实训室预约
     * - 请求参数
     * areaType 房间类型：1会议室 2琴房 3练功房   【必填】
     * appointmentId 预约实训室id   【必填】
     * roomId 实训室Id    【选填】
     * startTime 预约开始时间   【选填】
     * endTime 预约结束时间   【选填】
     * createUserName 预约创建人姓名    【选填】
     * remark 备注    【选填】
     * consumeChannel 消费渠道    【选填】
     * responsibleTeacherId 责任教师id    【选填】
     * - 成功后，返回参数
     * msg
     */
    toUpdateAppointment: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.toUpdateAppointment,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {
          areaType: 3,
          appointmentId: 1561,
          responsibleTeacherId: 4141,
          roomId: 1481,
          //1121
          startTime: 1608076800000,
          endTime: 1608080400000,
          createUserName: '浩',
          remark: '练习',
          consumeChannel: 1
        },
        success: function (res) {
          wx.hideToast({});
          console.log('创建琴房预约', res.data);

          if (res.data && res.data.code == 200) {} else if (res.data && res.data.code == 201) {
            return;
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

    /************************************ 旧接口 */
    toTest: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.meetingDetail + '?meetingId=' + 1,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取会议详情返回', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * TODO 更新
     * 获取预约，所需的配置信息
     * - 请求数据
     * areaType 房间类型：1会议室 2实训室 3练功房
     * 
     * - 返回数据
     * buildInfoDtos{ 筛选 - 楼栋
     *    buildId 楼栋Id
     *    buildName 楼栋名
     * }
     * areaTypeDtos{ 筛选 - 区域类型
     *    name 名称
     *    type 琴房，1-普通琴房、2-专用琴房、3-公共琴房、4-专业琴房；会议，1-大会议室、2-中会议室、3-小会议室
     * }
     * weekDtos{
     *    dateStr 时间字符串
     *    dayWeek 星期几
     *    timestamp 时间戳
     * }
     * AppAppointmentConfigureDto{
     *    appointmentAdvanceTime 预约提前时间
     *    cancelAdvanceTime 取消提前时间
     *    msgAdvanceTime 预约开始提示信息提前时间。会议里还包括提前考勤时间
     *    isRefundFeeTimeLength 是否退还免费时间 1退 0不退【琴房专用】
     * }
     * 
     * 
     */
    getAppointmentConfigureV1: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentConfigure + '?areaType=3',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取预约，所需的配置信息"', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * TODO 更新
    * 根据区域类型获取所有房间
    * - 请求数据
    * roomType 房间类型：1会议室 2实训室   必填
    * selectDate 需查询的日期，时间戳    必填
    * selectAreaLayer 筛选条件。1楼栋、3房间。会议只能选择楼栋、琴房有楼栋、房间两种选择   必填
    * selectAreaId 筛选条件。楼栋ID（会议）、房间ID（琴房）    可选填   
    * selectType 筛选条件。琴房类型或会议类型    可选填
    * 
    * - 返回数据
    * AppAppointmentDetailV2Response{ 
    *    roomId 房间ID
    *    roomStr 房间名
    *    buildStr 楼栋名
    *    areaType 区域类型
    *    detailOfDayDto{ 预约详情
    *      startTimeStr 开始时间字符串
    *      endTimeStr 结束时间字符串
    *      startTime 开始时间
    *      endTime 结束时间
    *      appointmentStatus 预约状态。1可预约、2不可预约、3已经预约
    *      
    *      appointmentCount 已预约计数
    *      appointmentRate 琴房预约率
    *      pianoTypeName 琴房类型名
    *    }
    * }
    * 
    */
    getAppointmentDetailV1: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentDetail + '?roomType=2' + '&selectDate=1605225000000' + '&selectAreaLayer=1&selectAreaId=721',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('根据预约房间、预约时间段获取指定的预约情况"', res.data);

          if (res.data && res.data.code == 200) {} else {
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
    * 根据区域类型获取所有房间
    * roomType 房间类型：1会议室 2琴房
    */
    getAllRoomByType: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAllRoomByType + '?roomType=' + 2,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('根据区域类型获取所有房间', res.data);

          if (res.data && res.data.code == 200) {} else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    /************************************ 会议接口 会议与练功房 */

    /**
      * 创建会议
      */
    creatMeeting: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.creatMeeting,
        method: 'POST',
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        data: {
          'meetingRoomId': 91,
          'meetingSubject': '好好学习天天向上',
          'meetingContent': '消耗',
          'meetingType': 2,
          'meetingInitiatorId': 4131,
          'meetingEmceeId': 4131,
          'meetingRecorderId': 4131,
          'meetingAttendee': [{
            selectRole: 1,
            selectType: 4,
            selectId: 4131
          }],
          'meetingStartTime': 1604392846000,
          'meetingEndTime': 1604395246000
        },
        success: function (res) {
          wx.hideToast({});
          console.log('创建会议返回', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * TODO 更新
      * 修改会议
      */
    updateMeeting: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.updateMeeting,
        method: 'PUT',
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        data: {
          'meetingId': 91,
          'meetingRoomId': 1,
          'meetingSubject': '疫情复工的问题',
          'meetingContent': '加快必需品企业的复工进度',
          'meetingType': 2,
          'meetingInitiatorId': 3321,
          'meetingEmceeId': 3321,
          'meetingRecorderId': 3321,
          'meetingAttendee': [3321],
          'meetingStartTime': 1584099548000,
          'meetingEndTime': 1584106748000
        },
        success: function (res) {
          wx.hideToast({});
          console.log('修改会议返回', res.data);

          if (res.data && res.data.code == 200) {} else {
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
      * 人员选择（学生）数据获取  
      */
    selectPersonnel: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.selectPersonnel + '?selectType=' + 0 + '&parentId=1',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('人员选择（学生）"', res.data);

          if (res.data && res.data.code == 200) {} else {
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
      * 会议列表
      * -1 "拒绝", 0 "申请中",
      *  1 "准备中", 2 "正在进行", 3 "已结束";
      */
    createListByStatus: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.listByStatus + '?take=5&skip=0&userRole=1&meetingStatus=' + [0],
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('会议列表', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * TODO 更新
      * 会议详情
      * - 请求参数
      * meetingId 会议id
      * - 返回参数
      * meetingId 会议id
      * executePlanId 会议考勤执行记录Id
      * meetingStatus 会议审核状态。,-1:拒绝 0:预约审核中,1:即将开始,2:正在进行,3:已结束
      * meetingCheckStatus 会议审核状态。-1审核不通过；0待审核；1审核通过
      * meetingSubject 会议主题
      * meetingRoomId 会议室Id
      * meetingRoomName 会议室名称
      * meetingRoomAddress 会议室地址
      * meetingType 会议室类型    1:表示内部会议 2:表示开放式会议
      * meetingStartTime 会议开始时间
      * meetingEndTime 会议结束时间
      * meetingInitiatorId 会议发起人用户id
      * meetingInitiator 会议发起人
      * meetingEmceeId 会议主持人用户id
      * meetingEmcee 会议主持人
      * meetingRecorderId 会议记录人用户id
      * meetingRecorder 会议记录人
      * mobile 参会人手机号
      * meetingAttendee 会议参会人
      * meetingContent 会议内容
      * createTime 会议创建时间
      * meetingInitiatorR 会议发起人回显数据
      * {
      *   selectRole 人员角色：1学生 2教师
      *   selectType 选择类型：1院系 2专业 3班级 4学生 1部门 4教师
      *   selectName 名称
      *   selectId 选择人员：Id
      *   isHasChild 是否可展开：1可以 0不可以
      * }
      * meetingEmceeR 会议主持人回显数据
      * meetingRecorderR 会议记录人人回显数据
      * meetingAttendeeR 会议参会人回显数据
      * attendaceDetailDto 会议考勤详情信息
      * {
      *   leaveInfo{
      *     applyType 补卡30、请假31、预约会议室0
      *     applyReason 申请原因
      *     applyTime 申请时间
      *     handlerTime 处理时间
      *     handlerResult 处理结果：10未处理（或申请汇总） 12同意 13拒绝
      *     applyTimes 请假/补卡申请次数
      *     attenceStatusInfo 考勤状态信息
      *     {
      *       meetingId 会议Id
      *       meetingRoomName 会议室名称
      *       status 目前签到状态。20正常 21未签到 22迟到 30缺席 23请假 24补签
      *       checkTime 签到时间,只有已经签到的情况下,才会出现此字段
      *     }
      *   }
      *   checkInInfo{
      *     meetingId 会议Id    改为    appointmentId
      *     executePlanId 会议执行记录Id
      *     meetingRoomName 会议室名称    改为    checkInRoomName
      *     status 目前签到状态。20正常 21未签到 22迟到 30缺席 23请假 24补签 
      *     startTime 签到开始时间
      *     endTime 签到结束时间
      *     checkTime 签到时间,只有已经签到的情况下,才会出现此字段    改为    checkInTime
      *   }
      *   supplementInfo{
      *     与请假一致
      *   }
      *   
      * }
      */
    meetingDetail: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.meetingDetail + '?meetingId=' + 5271,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('会议详情', res.data);

          if (res.data && res.data.code == 200) {} else {
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
      * 取消会议
      */
    cancelMeeting: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.cancelMeeting + '?meetingId=221',
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {},
        success: function (res) {
          wx.hideToast({});
          console.log('取消会议返回', res.data);

          if (res.data && res.data.code == 200) {} else {
            if (res.data.msg == "警告,只能取消在现在的20分钟以后的会议！") {
              app.globalData.ShowMsgUtil.showErrorModal('请求失败', "警告,只能删除在现在的20分钟以后的会议！", res.data.code);
            } else {
              app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            }

            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    /**
      * 会议考勤统计 - 人数统计
      */
    checkInDetail: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.checkInDetail + '?meetingId=' + 11,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('会议考勤统计 - 人数统计', res.data);

          if (res.data && res.data.code == 200) {} else {
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
      * 会议考勤统计 - 图形统计
      */
    statistics: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.statistics + '?meetingId=' + 11,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('会议考勤统计 - 图形统计', res.data);

          if (res.data && res.data.code == 200) {} else {
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
        * 搜素选择人员
        * personType 选择的类型：0学生、1教师
        * userCode 根据用户编号搜素
        * userName 根据姓名搜素
        */
    searchPersonnelV1: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.searchPersonnel + '?personType=0' + '&userName=' + '浩',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('搜素选择人员', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * 获取会议室预约审核列表
     * status 状态。0未审核 1已审核 -1冲突 
     * ids 冲突id数组
     */
    getMeetingRoomAppointmentApprovalList: function (status, take, skip) {
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      var ids = [4441, 4461, 4451];
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentMeetingRoomList + status + '/list' + '?take=' + take + '&skip=' + skip + '&ids=' + ids,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取会议室预约审核列表', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * 审核会议室预约
     * 审核处理
     */
    toMeetingRoomApproval: function (meetingId, type, approvalReason) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      var meetingId = meetingId;
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.approvalMeetingRoomAppointment,
        data: {
          meetingId: meetingId,
          status: type == 13 ? 0 : 1,
          approvalComments: approvalReason
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

    /**************************************************** 琴房 *********************************************************/

    /**
     * 获取收费信息
     * - 请求参数
     * roomId 琴房Id
     * chargeType 费用类型。1收费 2退款手续费
     * - 返回参数
     * chargeSettings 琴房预约信息
     * {
     *    feeTimeLength 免费剩余时长
     *    unitPrice 每小时收费单价
     *    balance 余额
     * } 
     * serviceChargeSettings 琴房预约手续费费用信息 - 单位%
     * {
     *    rateOverTwentyFour 超过24小时的费用率 
     *    rateTwentyFouraAndTwelve 24小时到12小时之间的费用率
     *    rateTwelveAndOne 12小时到1小时的费用率
     * }
     */
    getChargeInfo: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getChargeInfo + '?roomId=' + 1091 + '&chargeType=2',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取收费信息', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * 创建琴房预约
     * - 请求参数
     * roomId 琴房Id
     * startTime 预约开始时间
     * endTime 预约结束时间
     * createUserName 预约创建人姓名
     * remark 备注
     * consumeChannel 消费渠道
     * - 成功后，返回参数
     * appointmentId 预约id
     * appointmentUserName 预约 用户姓名
     * appointmentTime 预约时间
     * deductionMoney 支付金额
     */
    createPiano: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.createPianoRoomAppointment,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {
          roomId: 1081,
          //1121
          startTime: 1607077800000,
          endTime: 1607079600000,
          createUserName: '浩',
          remark: '练习',
          consumeChannel: 1
        },
        success: function (res) {
          wx.hideToast({});
          console.log('创建琴房预约', res.data);

          if (res.data && res.data.code == 200) {} else if (res.data && res.data.code == 201) {
            return;
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
     * 获取琴房预约列表
     * 已完成 -1退费 2已结束 3已取消
     * 未完成 0未开始 1使用中
     * - 请求参数
     * status 会议状态数组。0未开始  1使用中 -1退费 2已结束 3已取消
     * take 读取记录条数
     * skip 跳过记录条数
     * - 返回参数
     * id id
     * status 状态
     * pianoAddress 琴房位置
     * startTime 预约开始时间
     * endTime 预约结束时间
     * appointmentUserName 预约人姓名
     * applyTime 申请时间
     */
    getList: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let status = [-1, 2, 3, 0, 1];
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getPianoRoomAppointmentList + '?status=' + status + '&take=5&skip=0',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取琴房预约列表', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * 获取琴房预约详情
     * 
     * - 请求参数
     * appointmentId 琴房预约id
     * - 返回参数
     * appointmentInfo 琴房预约信息
     * {
     *    timeLength 预约使用时长
     *    status 状态
     *    pianoAddress 琴房位置
     *    startTime 预约开始时间
     *    endTime 预约结束时间
     *    appointmentUserName 预约人姓名
     *    applyTime 申请时间
     *    reremark 备注
     *    appiontCancelTime   允许取消预约的时间
     * } 
     * appointmentChargeInfo 琴房预约费用信息
     * {
     *    totalTimeLength 总计时长
     *    feeTimeLength 免费时长
     *    totalConsume 总共花费
     *    realityConsume 实际花费
     *    payMethod 支付方式：0系统代扣，1微信支付，2支付宝支付，3银联支付  -1无
     * }
     * buildManagerInfo 琴房管理信息
     * {
     *    pianoManagerName 琴房管理员姓名姓名
     *    pianoManagerPhoneNumber 琴房管理员电话号码 
     * }
     * AppPianoDetailCancelNode 取消预约节点信息
     * {
     *    appointmentStatus 琴房预约状态 - 取消预约 -1
     *    cancelAppointmentTime 取消预约时间
     *    refundStatus 退款状态。0申请退费中  1清算退款成功  -1拒绝
     *    approveRefundTime 退款审批时间
     *    pianoRefundChargeInfo 退款成功后的 - 费用信息
     *    pianoRefundChargeInfo
     *    {
     *        shouldRefundCharge 应退费用
     *        serviceCharge 手续费
     *        realityDeductionMoney 实退费用   
     *    }
     * }
     * attendanceInfo 预约考勤信息
     * {
     *    checkInInfo{
     *      appointmentId 预约ID
     *      checkInRoomName 打卡地址
     *      status 状态 20正常签到 21签到 22正常签退 30自动签退
     *      startTime 开始时间 时间戳
     *      endTime 结束时间 时间戳
     *      checkInTime 打卡时间
     *    }
     *    checkOutInfo{
     *      与上面一致
     *    }
     * }
     */
    getDetailById: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getPianoRoomAppointmentDetail + '?appointmentId=' + 3171,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取琴房预约详情', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * 获取预约取消信息
     * 
     * - 请求参数
     * appointmentId 琴房预约id
     * - 返回参数
     * pianoRoomInfo 预约琴房信息
     * {
     *    pianoAddress 琴房位置
     *    startTime 预约开始时间
     *    endTime 预约结束时间
     *    appointmentUserName 预约人姓名
     *    applyTime 申请时间
     *    reremark 备注
     * } 
     * userInfo 预约用户信息
     * {
     *    name 姓名
     *    userNo 学号/职工号
     *    majorName 专业名称（学生）/校区名称（教师）
     *    deptName 院系名称（学生）/部门名称（教师）
     *    personType 人员类型：1教师 0学生
     * }
     * appointmentChargeInfo 预约费用信息
     * {
     *    unitPrice 收费标准
     *    totalTimeLength 总计时长
     *    feeTimeLength 免费时长
     *    deductionMoney 总计 - 预约费用 （应收金额）
     *    deductionBalance 除免费时长后 - 扣除个人余额的费用
     * }
     * pianoRefundChargeInfo 预约退款手续费信息
     * {
     *    shouldRefundCharge 应退费用
     *    serviceCharge 手续费
     *    realityDeductionMoney 实退费用
     * }
     */
    getCancelInfo: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getPianoRoomAppointmentCancelInfo + '?appointmentId=' + 3181,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取预约取消信息', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * 取消琴房预约
     * 
     * - 请求参数
     * appointmentId 琴房预约id
     * realityDeductionMoney 实退费用
     * serviceCharge 手续费
     * - 返回参数
     * msg
     */
    toCancelPianoAppointment: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.cancelPianoRoomAppointment,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {
          appointmentId: 3181,
          realityDeductionMoney: 7,
          serviceCharge: 3
        },
        success: function (res) {
          wx.hideToast({});
          console.log('取消琴房预约', res.data);

          if (res.data && res.data.code == 200) {} else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    /*************************************************** 归寝考勤 *********************************************************/
    repeatDataCorrection: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.repeatDataCorrection,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {},
        success: function (res) {
          wx.hideToast({});
          console.log('水量上报数据重复提交修正', res.data);

          if (res.data && res.data.code == 200) {} else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
    handlerWaterReport: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      let waterReportHexStr = "080300001023197001010945531970010109461001f4ab39d79800000000000000000000000200";
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.handlerWaterReport,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {
          waterReportHexStr: waterReportHexStr
        },
        success: function (res) {
          console.log('用水上报处理', res.data);

          if (res.data && res.data.code == 200) {} else if (res.data && res.data.code == 201) {
            console.log('请求失败,重复提交');
            return;
          } else {
            wx.hideToast({});
            console.log('请求失败,' + res.data.msg);
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          wx.hideToast({});
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    /************************************ 接口V2.0 会议与练功房 */

    /**
     * TODO 更新
     * 获取预约，所需的配置信息
     * - 请求数据
     * areaType 房间类型：1会议室 2实训室  3练功房 【修改】
     * 
     * - 返回数据
     * buildInfoDtos{ 筛选 - 楼栋
     *    buildId 楼栋Id
     *    buildName 楼栋名
     * }
     * areaTypeDtos{ 筛选 - 区域类型
     *    name 名称
     *    type 琴房，1-普通琴房、2-专用琴房、3-公共琴房、4-专业琴房；会议，1-大会议室、2-中会议室、3-小会议室
     * }
     * weekDtos{
     *    dateStr 时间字符串
     *    dayWeek 星期几
     *    timestamp 时间戳
     * }
     * AppAppointmentConfigureDto{
     *    appointmentAdvanceTime 预约提前时间
     *    cancelAdvanceTime 取消提前时间
     *    msgAdvanceTime 预约开始提示信息提前时间。会议里还包括提前考勤时间
     *    isRefundFeeTimeLength 是否退还免费时间 1退 0不退【琴房专用】
     * }
     * 
     * 
     */
    getAppointmentConfigure: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentConfigure + '?areaType=3',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取预约，所需的配置信息"', res.data);

          if (res.data && res.data.code == 200) {} else {
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
      * TODO 更新
     * 根据区域类型获取所有房间
     * - 请求数据
     * areaType 房间类型：1会议室 2实训室 3练功房   必填  【修改】
     * selectDate 需查询的日期，时间戳    必填
     * selectAreaLayer 筛选条件。1楼栋、3房间。会议只能选择楼栋、琴房有楼栋、房间两种选择   必填
     * selectAreaId 筛选条件。楼栋ID（会议）、房间ID（琴房）    可选填   
     * selectType 筛选条件。琴房类型或会议类型    可选填
     * 
     * - 返回数据
     * AppAppointmentDetailV2Response{ 
     *    roomId 房间ID
     *    roomStr 房间名
     *    buildStr 楼栋名
     *    areaType 区域类型
     *    detailOfDayDto{ 预约详情
     *      startTimeStr 开始时间字符串
     *      endTimeStr 结束时间字符串
     *      startTime 开始时间
     *      endTime 结束时间
     *      appointmentStatus 预约状态。1可预约、2不可预约、3已经预约
     *      
     *      appointmentCount 已预约计数
     *      appointmentRate 琴房预约率
     *      pianoTypeName 琴房类型名
     *    }
     * }
     * 
     */
    getAppointmentDetail: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentDetail + '?areaType=3' + '&selectDate=1605225000000' + '&selectAreaLayer=1&selectAreaId=721',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('根据预约房间、预约时间段获取指定的预约情况"', res.data);

          if (res.data && res.data.code == 200) {} else {
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
     * 创建琴房预约
     * - 请求参数
     * roomId   //areaId(暂不用)  实训室Id
     * startTime 预约开始时间
     * endTime 预约结束时间
     * createUserName 预约创建人姓名
     * remark 备注
     * consumeChannel 消费渠道
     * areaType 房间类型：1会议室 2琴房 3练功房
     * responsibleTeacherId 责任教师id
     * - 成功后，返回参数
     * appointmentId 预约id
     * appointmentUserName 预约 用户姓名
     * appointmentTime 预约时间
     * deductionMoney 支付金额
     */
    createAppointment: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.createAreaAppointment,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {
          areaType: 3,
          responsibleTeacherId: 4141,
          roomId: 1081,
          //1121
          startTime: 1607680800000,
          endTime: 1607684400000,
          createUserName: '浩',
          remark: '练习',
          consumeChannel: 1
        },
        success: function (res) {
          wx.hideToast({});
          console.log('创建琴房预约', res.data);

          if (res.data && res.data.code == 200) {} else if (res.data && res.data.code == 201) {
            return;
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
@import "./test.css";
</style>