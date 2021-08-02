<template>
<!--pages/indexModule//pages/test/test.wxml-->
<text>pages/indexModule//pages/test/test.wxml</text>
</template>

<script>
var app = getApp();

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
    /************************微信小程序操作水表************************/
    //1. 下发授权额度
    // let data = {
    //   deviceId: 542511,
    //   isFrist: true
    // };
    // let data = {};
    // this.issueAuthorizationMoney();
    //2. 用水上报处理
    //this.handlerWaterReport();
    //3. 关闭水表后业务处理
    // let data = {};
    // this.unfreeze();

    /************************留校、外宿等记录************************/
    //1. 申请
    // this.handleApply();
    //2. 查询
    // this.handleListRecord();
    //3. 详情
    // this.handleDetailRecord();
    //3. 审核 
    // this.handleApproval();

    /************************宿管 - 综合查询、宿舍管理信息查询************************/
    //1. 综合查询
    // this.listsByType();
    //2. 宿舍信息
    // this.dormInfoTotalStatistics();
    //3. 设备（水/电）使用量统计
    // this.deviceUseStatistics();
    //4. 获取房间用水、用电信息
    // this.getUsageByRoom();
    //5. 异常统计信息
    // this.errorInform();

    /************************铺导员 - 班级、学生管理信息查询************************/
    // 1. 班级管理
    // this.getClassInfo();
    // 2. 学生管理信息
    // this.getStudentInfo();
    // 3. 学生详情信息
    // this.getStudentDetail();

    /************************失物招领************************/
    //1. 失物列表
    this.getLostFoundList(); //2. 失物详情
    // this.getLostFoundDetail();
  },
  methods: {
    /************************************************************** 微信小程序操作水表 ****************************************************************/

    /**
     * 微信蓝牙操作水表 - 获取下发授权额度
     * - 请求参数
     * deviceId 设备Id
     * isFrist 是否是，开启水表时下发的授权额度。是：true、 否、false
     * - 返回参数
     * issueMoney 下发额度
     */
    issueAuthorizationMoney: function (data) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.issueAuthorizationMoney,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: data,
        success: function (res) {
          wx.hideToast({});
          console.log('获取下发授权额度', res.data);

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
     * 微信蓝牙操作水表 - 用水上报处理
     * - 请求参数
     * IotWaterReportRequest{
     *    userId 用户Id
     *    startTime 开始时间
     *    endTime 结束时间
     *    reportType 0刷卡 1小程序
     *    deviceId 设备ID
     *    waterAmount 用水量
     *    consumeMoney 消费额度
     *    waterStatus 水表状态
     *    frozenRecordId 冻结记录ID
     * }
     * - 返回参数
     * 返回信息
     */
    handlerWaterReport: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.handlerWaterReport,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {
          userId: 3381,
          startTime: 1589769965000,
          endTime: 1589770025000,
          reportType: 1,
          deviceId: 542511,
          waterAmount: 100,
          consumeMoney: 50,
          waterStatus: 1,
          frozenRecordId: 2201
        },
        success: function (res) {
          wx.hideToast({});
          console.log('用水上报处理', res.data);

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
     * 微信蓝牙操作水表 - 关闭水表后业务处理
     * - 请求参数
     * deviceId 设备ID
     * frozenRecordId 冻结记录ID
     * - 返回参数
     * 返回信息
     */
    unfreeze: function (data) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.unfreeze,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: data,
        success: function (res) {
          wx.hideToast({});
          console.log('关闭水表后业务处理', res.data);

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

    /************************************************************** 留校、外宿等记录 *******************************************************************/

    /**
     * 留校、外宿等记录申请
     * - 请求参数
     * BusApplyRecordRequest{
     *    applyType 申请类型。1留校申请记录  2外宿申请记录
     *    applyUserId 申请人用户id
     *    applyReason 申请原因 
     *    applyStartTime 申请开始时间
     *    applyEndTime 申请结束时间
     *    address 家庭地址、或外宿地址
     *    phone 如果失联，可以联系到的电话号码。（父母电话或外宿房东电话）
     * }
     * - 返回参数
     * 返回信息
     */
    handleApply: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.inOrOutSchoolApply,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {
          applyType: 1,
          applyUserId: userInfoCach.userId,
          applyReason: '321',
          applyStartTime: new Date('2020-07-10 12:12:12').getTime(),
          applyEndTime: new Date('2020-09-07 12:12:12').getTime(),
          address: '西北街',
          phone: '18007310336'
        },
        success: function (res) {
          wx.hideToast({});
          console.log('留校、外宿申请返回', res.data);

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
     * 留校、外宿等记录 - 查询列表
     * - 请求参数
     *  applyType 1留校 2外宿 0全部
     *  approvalType 待办0 已处理1 
     * - 返回参数
     * 返回信息
     *  BusApplyRecordRequest{
     *    id 
     *    title 标题。留校申请、外宿申请
     *    status 申请状态
     *    applyUserName 申请人姓名
     *    applyUserPhone 申请人电话 
     *    applyStartTime 申请开始时间
     *    applyEndTime 申请结束时间
     *    applyTime 申请时间
     *    approvalUserName 审核人姓名
     *    approvalUserPhone 审核人电话
     * }
     */
    handleListRecord: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.inOrOutSchoolLists + '?applyType=' + 1 + '&approvalType=' + 0 + '&skip=0&take=10',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取申请列表返回', res.data);

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
     * 留校、外宿等记录 - 查询详情
     * - 请求参数
     *  recordId 记录Id
     * - 返回参数
     * 返回信息
     *  BusApplyRecordRequest{
     *    id 
     *    title 标题。留校申请、外宿申请
     *    status 申请状态
     *    applyUserName 申请人姓名
     *    applyUserPhone 申请人电话 
     *    applyStartTime 申请开始时间
     *    applyEndTime 申请结束时间
     *    applyTime 申请时间
     *    approvalUserName 审核人姓名
     *    approvalUserPhone 审核人电话
     *    applyReason 申请原因
     *    phone 备用电话
     *    address 家庭地址/外宿地址
     *    approvalInfo{
     *      approvalUserName 审核人姓名
     *      approvalUserPhone 审核人电话
     *      refuseReason 审核拒绝原因
     *      approvalTime 审核时间
     *      approvalStatus 审核状态
     *    } 
     * }
     */
    handleDetailRecord: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.inOrOutSchoolDetail + '?recordId=' + 1,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取申请详情返回', res.data);

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
     * 留校、外宿等记录 - 审核
     * - 请求参数
     * BusApplyApprovalRequest{
     *    recordId 记录Id
     *    approvalType 审核类型。1同意 -1拒绝
     *    approvalReason 审核原因 
     * }
     * - 返回参数
     * 返回信息
     */
    handleApproval: function () {
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
          recordId: 1,
          approvalType: -1,
          approvalReason: '321'
        },
        success: function (res) {
          wx.hideToast({});
          console.log('留校、外宿审核返回', res.data);

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

    /*********************************************************** 宿管 - 综合查询、宿舍管理信息查询 ***************************************************************/

    /**
     * 综合查询
     * - 请求参数
     * recordType 记录类型。留校申请记录 - 1、外宿申请记录 - 2、调宿记录 - 3、退宿记录 - 4、归寝记录 - 5
     * take 一次读取记录条数
     * skip 开始位置
     * - 返回参数
     * BusSynthesizeRecordResponse{
     *    id
     *    username 用户姓名
     *    userCode 用户编号
     *    userType 用户类型。1教师 0学生
     *    recordDate 记录日期
     *    newRoomLocation 新房间位置
     *    oldRoomLocation 原先房间位置
     * }
     */
    listsByType: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.listsByType + '?recordType=' + 5 + '&take=10' + '&skip=0',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('综合查询返回', res.data);

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
     * 宿舍信息
     * - 请求参数
     *    无
     * - 返回参数
     * BusDormTotalStatisticsResponse{
     *    buildNumber 楼栋数量
     *    roomNumber 房间数量
     *    roomOfFullNumber 满员房间数量
     *    roomUnderNumber 未满房间数量
     *    roomFreeNumber 空闲房间数量
     *    totalBedNumber 总床位数量
     *    freeBedNumber 空闲床位数量
     *    assignedBedNumber 已分配床位数量
     * }
     */
    dormInfoTotalStatistics: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getTransActionRecords,
        data: {
          transActionType: transActionType,
          take: take,
          skip: skip
        },
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('查询消费记录返回', res.data);
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    /**
     * 设备（水/电）使用量统计
     * - 请求参数
     *    timeType 时间类型。3近一周  1近一个月
     *    areaType 区域类型。1管理的楼栋 2宿舍房间
     *    deviceType 设备类型。2冷水 4电 8热水
     * - 返回参数
     * IotUsegeCountVO{
     *    useUsage 用量
     *    days 时间
     * }
     */
    deviceUseStatistics: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.deviceUseStatistics + '?timeType=3' + '&areaType=2' + '&deviceType=2',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('设备（水/电）使用量统计返回', res.data);

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
     * 获取房间的用水、用电信息
     * - 请求参数
     *    roomId 可以不传。不传则查自己房间的；传值则查询传的房间用量信息
     * - 返回参数
     * IotRoomUseResponse{
     *    usageTotalEle 电 - 总用电量
     *    usageEleMouth 电 - 当月用电量
     *    usageTotalColdWater 冷水 - 总用水量
     *    usageColdWaterMouth 冷水 - 当月用水/电量
     *    usageTotalHotWater  热水 - 总用水量
     *    usageHotWaterMouth  热水 - 当月用水/电量
     *    today 统计时间
     * }
     */
    getUsageByRoom: function () {
      wx.showNavigationBarLoading();
      var data = {};
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getUsageByRoom,
        method: 'GET',
        data: data,
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取水电信息返回', res.data);

          if (res.data && res.data.code === 200) {} else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function (res) {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideNavigationBarLoading();
        }
      });
    },

    /**
     * 异常统计信息
     * - 请求参数
     *    deviceType 设备类型。1门 2冷水表 3消费机 4电 8热水表
     *    take 一次读取记录条数
     *    skip 开始位置
     * - 返回参数
     * IotDeviceAlarmVO{
     *    id 
     *    alarmInfo 告警信息
     *    alarmTime 告警时间
     *    deviceTypeId 设备类型
     *    roomName 房间名称
     *    buildName 楼栋名称
     *    isConfirm 是否需要确认(0 否 1 是)
     *    confirmState 确认状态(0 未确认 1 已确认)
     * }
     */
    errorInform: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.errorInform + '?deviceTypeId=8' + '&take=10' + '&skip=0',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('异常统计信息返回', res.data);

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

    /*********************************************************** 铺导员 - 班级、学生管理信息查询 ***************************************************************/

    /**
     * 班级管理
     * - 请求参数
     *    无
     * - 返回参数
     * schoolName 学校名称
     * classInfos{
     *    classId 班级ID 
     *    className 班级名称
     *    StudentNumberStr 班级里的学生数量
     *    isHaveChild 是否有下一级。0没有 1有
     * }
     */
    getClassInfo: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getClassInfo,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('班级管理返回', res.data);

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
     * 学生管理信息
     * - 请求参数
     *    classId 班级ID。有值查班级下的学生，没有值查询铺导员班级下的所有学生
     * - 返回参数
     * BusStudentAdminResponse{
     *    username 用户姓名 
     *    userCode 用户编号
     *    mobile 电话
     * }
     */
    getStudentInfo: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getStudentInfo + '?classId=491',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('学生管理信息返回', res.data);

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
     * 学生详情信息
     * - 请求参数
     *    studentId 学生id
     * - 返回参数
     * BusStudentDetailAdminResponse{
     *    username 用户姓名 
     *    userCode 用户编号
     *    mobile 电话
     *    sex 性别
     *    className 班级姓名
     *    majorName 专业姓名
     *    collegeName 院系名称
     *    address 地址
     * }
     */
    getStudentDetail: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getStudentDetail + '?studentId=1701',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('学生详情信息返回', res.data);

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

    /*********************************************************** 失物招领 ***************************************************************/

    /**
     * 获取失物列表
     * - 请求数据
     * take 查几个 
     * skip 从哪开始查
     * searchName 搜素
     * 
     * - 返回数据
     * AppBusLostFoundResponse{
     *    id
     *    articleName 物品名称
     *    articleType 物品类型
     *    articleImages 发布的物品图片, 使用","隔开
     *    releseTime 发布时间
     *    articleDescription 发布的物品描述
     * }
     */
    getLostFoundList: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getLostFoundList + '?take=5&skip=0',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取失物列表返回', res.data);

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
     * 获取失物详情
     * - 请求数据
     * id  
     * 
     * - 返回数据
     * AppBusLostFoundDetailResponse{
     *    articleName 物品名称
     *    articleType 物品类型
     *    articleImages 发布的物品图片, 使用","隔开
     *    releseTime 发布时间
     *    articleDescription 发布的物品描述
     *    contactPerson 联系人
     *    contactInformation 联系方式
     * }
     * 
     */
    getLostFoundDetail: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getLostFoundDetail + '/91',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取失物详情返回', res.data);

          if (res.data && res.data.code == 200) {} else {
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