<template>
<view class="page">
  <view class="page__bd box">

  <!-- 
  * 日历选择组件
  * selected [Arrey] 那些日期被选中
  * bindselect [function] 日历是否被打开 
  * bindgetdate [function] 当前选择的日期
  * is-open [Boolean} 是否开启插入模式
    -->
  <!-- <view class='other'>我是其他元素</view> --> 
  <!-- <calendar selected="{{selected}}" is-open="true" bindselect="bindselect" bindgetdate="bindgetdate" /> -->
  <calendar :selected="selected" :selectedOfException="selectedOfException" :class="[selected ?'date-current': '']" :is-open="true" @select="bindselect" @getdate="bindgetdate" @getmonthrecord="bindMonthRecord" :isShow="isShow" :updateDate="updateDate"></calendar>

    <!-- 底部模块 -->
    <view class="page__bd detail-box">

      <view class="detail-box-day" v-if="signInDay != ''">
        <text class="detail-text">打卡时间段：{{signInDay.startTime}} - {{signInDay.endTime}}</text>
        <view class="center_start">
          <image v-if="signInDay.status!=21" class="center_image" :src="attendanceImageUrl.right"></image>
          <image v-else class="center_image" :src="attendanceImageUrl.error"></image>
          <text class="center_image_right center_text">打卡时间：{{signInDay.checkTime}}</text>
        </view>
        <view class="center_detail">
          <view class="center_detail_box">
            <image class="center_detail_image" :src="attendanceImageUrl.position"></image>
            <text class="detail_right">{{signInDay.checkInLocation}}</text>
          </view>
         
          <view class="box-status">
            <text :class="'center_text ' + (signInDay.status!=21?'yes':'no')">{{signInDay.statusName}}</text>
            <text v-if="signInDay.status==21 && signInDay.hideAllpy" class="box-status-right" @tap="toReissueApply">补卡申请</text>
          </view>
           <view class="box-status">
            <text class="center_text fontGray">{{signInDay.leaveApplyStatus}}</text>
            <text v-if="signInDay.againApply" class="box-status-right" @tap="toReissueApply">再次补卡申请</text>
          </view>
        </view>
      </view>

      <view v-else class="detail-box-day">
        <!-- <text class='detail-text'>打开时间段：无</text> -->
        <view class="msg-box">
          <image class="msg-box-image" :src="attendanceImageUrl.msg"></image>
          <text class="msg-box-text">尊敬的用户，你今天没有考勤任务！</text>
        </view>
      </view>

    </view>

  </view>
</view>
</template>

<script>
var app = getApp();
var AttendanceImageUrl = require("../../resources/utils/imageUrl.js");
var dataOfMonthRecord = ''; //指定月记录
import calendar from "../../../../components/attendanceModule/calendar/calendar";

export default {
  data() {
    return {
      planId: '',
      attendanceImageUrl: AttendanceImageUrl,
      canlender: {
        "weeks": [// {
          //   date: '10',
          //   month: '5',
          // }
        ]
      },
      // 显示签到正常
      selected: [],
      // 显示签到异常
      selectedOfException: [],
      // 用于显示考勤正常与异常的日期
      isShow: false,
      updateDate: '',
      // 日签到信息显示
      signInDay: '',
      executePlanId: ""
    };
  },

  components: {
    calendar
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    // var time = app.PublicUtil.formatTime(new Date(), 'Y/M/D h:m:s');
    // 获取当前时间的时间戳
    var time = new Date().getTime();
    console.log('------------------------学生考勤统计------------------------');
    this.setData({
      planId: options.planId
    }); // console.log('planId', this.data.planId);

    this.getMonthRecord(options.planId, time, false);
  },
  methods: {
    /**
     * 获取月统计
     */
    getMonthRecord: function (planId, limitDate, isGetDetail, time) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); // TODO
      // IOS获取的是秒的时间戳、安卓获取的是毫秒的时间戳

      wx.getSystemInfo({
        success: function (res) {
          // console.log('用户设备信息-', res);
          if (res.platform == "ios") {// limitDate = limitDate * 1000;
          }
        }
      });
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.getStuMonthRecord,
        data: {
          userId: userInfoCach.userId,
          planId: planId,
          attendanceType: 1,
          limitDate: limitDate
        },
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          console.log('获取月统计返回', res.data);

          if (res.data && res.data.code == 200) {
            dataOfMonthRecord = res.data.rows; // console.log('dataOfMonthRecord-----------', dataOfMonthRecord);
            // 获取指定签到日的详情

            if (isGetDetail) {
              _this.setData({
                signInDay: ''
              }); // 获取请求参数


              let executePlanId = _this.dealDetailOfDay(dataOfMonthRecord, time); // console.log('executePlanId==', executePlanId);
              // console.log('time==', time);


              if (executePlanId) {
                _this.getDetailOfDay(executePlanId, limitDate);
              }
            } else {
              // 处理数据， 用于显示  selected数组存的对象
              let obj = _this.dealDataShow(dataOfMonthRecord); // console.log('------------------data.dataX', obj.dataY);


              _this.setData({
                selected: obj.dataX,
                selectedOfException: obj.dataY
              }); // console.log('------------------data.selected', _this.data.selectedOfException);

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

    /**
     * 处理数据，显示一月正常与异常签到
     * 
     * 返回[{updateDate:'xxxx-xx-xx'}]格式
     */
    dealDataShow: function (dataObj) {
      let obj = {};
      let x = 0; //签到异常计数

      let y = 0; //签到正常计数

      let dataX = [];
      let dataY = []; // console.log('-----------------dataObj', dataObj);

      for (let i = 0; i < dataObj.length; ++i) {
        let selectedDate = app.globalData.PublicUtil.formatTimeTwo(dataObj[i].currentDate, 'Y-M-D');
        let selectObj = {};
        let selectedOfExceptionObj = {}; //正常

        if (dataObj[i].status == app.globalData.Constant.signInStatusConstant.SIGN_STATUS_NORMAL || dataObj[i].status == app.globalData.Constant.signInStatusConstant.SING_STATUS_SUPPLE) {
          selectObj.date = selectedDate;
          dataX[x] = selectObj;
          x++;
        } else if (dataObj[i].status == app.globalData.Constant.signInStatusConstant.SIGN_STATUS_UN_SIGN) {
          // console.log('selectedDate-------------------------', selectedDate);
          selectedOfExceptionObj.date = selectedDate;
          dataY[y] = selectedOfExceptionObj;
          y++;
        }
      } // if (dataX.length > 0){
      //   this.setData({
      //     updateDate: app.PublicUtil.formatTimeTwo(new Date().getTime(), 'Y-M-D'),
      //   })
      // }


      obj.dataX = dataX.length > 0 ? dataX : '';
      obj.dataY = dataY.length > 0 ? dataY : '';
      return obj;
    },
    dealDetailOfDay: function (dataOfMonthRecord, time) {
      for (let i = 0; i < dataOfMonthRecord.length; ++i) {
        let t = '';
        t = app.globalData.PublicUtil.formatTimeTwo(dataOfMonthRecord[i].currentDate, 'Y-M-D');

        if (t === time) {
          return dataOfMonthRecord[i].executePlanId;
        }
      }

      return '';
    },

    /**
     * 处理data数据。用于显示点击日签到详情显示
     */
    dealShowSign: function (data) {
      // console.log('data', data);
      let obj = {};
      obj.checkInLocation = data.checkInLocation;
      obj.startTime = app.globalData.PublicUtil.formatTimeTwo(data.startTime, 'h:m');
      obj.endTime = app.globalData.PublicUtil.formatTimeTwo(data.endTime, 'h:m');
      obj.checkTime = data.checkTime == null ? '无' : app.globalData.PublicUtil.formatTimeTwo(data.checkTime, 'h:m');

      if (data.status == app.globalData.Constant.signInStatusConstant.SIGN_STATUS_NORMAL) {
        obj.statusName = '正常';
      } else if (data.status == app.globalData.Constant.signInStatusConstant.SIGN_STATUS_UN_SIGN) {
        obj.statusName = '补卡';
      } else if (data.status == app.globalData.Constant.signInStatusConstant.SING_STATUS_SUPPLE) {
        obj.statusName = '补签';
      }

      obj.againApply = false;

      if (data.leaveApplyStatus != null) {
        if (data.leaveApplyStatus == 10) {
          obj.leaveApplyStatus = "申请中...";
          obj.hideAllpy = false;
        } else if (data.leaveApplyStatus == 12) {
          obj.leaveApplyStatus = "补卡成功";
          obj.hideAllpy = false;
        } else if (data.leaveApplyStatus == 13) {
          obj.leaveApplyStatus = "补卡失败";
          obj.againApply = true;
          obj.hideAllpy = false;
        }
      } else {
        obj.hideAllpy = true;
      }

      obj.status = data.status; // console.log('日签到详情数据-----------------', obj);

      return obj;
    },

    /**
     * 获取日签到详情
     */
    getDetailOfDay: function (executePlanId, limitDate) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.getDaySignDetail,
        data: {
          userId: userInfoCach.userId,
          planId: _this.planId,
          executePlanId: executePlanId,
          type: 1,
          limitDate: limitDate
        },
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          console.log('获取日签到详情返回', res.data);

          if (res.data && res.data.code == 200) {
            let data = res.data.rows; // 处理data数据。用于显示点击日签到详情显示

            data = _this.dealShowSign(data);

            _this.setData({
              executePlanId: executePlanId,
              signInDay: data
            });

            console.log(data);
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
    * 日历是否被打开
    */
    bindselect(e) {// console.log(e.detail.ischeck)
    },

    /**
     * 获取选择日期
     */
    bindgetdate(e) {
      let time = e.detail.year + '-' + e.detail.month + '-' + e.detail.date; // console.log('获取选择日期', time);
      // let limitDate = new Date(time.split('-')).getTime();

      let limitDate = new Date(time.replace(/-/g, "/")).getTime();
      console.log('获取选择日期', limitDate);
      this.getMonthRecord(this.planId, limitDate, true, time);
    },

    /**
     * 切换月份
     */
    bindMonthRecord: function (e) {
      let date = e.detail.dateOfMonth + ' 01:01:01';
      let time = new Date(date.replace(/-/g, "/")).getTime(); // console.log('--------------选择年月', e.detail.dateOfMonth);

      this.setData({
        isShow: true,
        // 用于切换月份  true是表示切换月份  
        updateDate: e.detail.dateOfMonth
      });
      this.getMonthRecord(this.planId, time, false);
    },

    /**
     * 跳转到补卡申请
     */
    toReissueApply: function () {
      let isAgainApply = this.signInDay.againApply ? 1 : 0;
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.attendancePageUrl.studentReissueApplyUrl + '?executePlanId=' + this.executePlanId + '&isAgainApply=' + isAgainApply, 500);
    }
  }
};
</script>
<style>
@import "./studentStatistics.css";
</style>