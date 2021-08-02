<template>
<view class="page">
  <view class="page__bd">

    <!-- 考勤详情 -->
    <view class="weui-cells weui-cells_after-title page__top">
        <view class="weui-cell">
            <view class="weui-cell__bd">班级名称</view>
            <view class="weui-cell__ft">{{headerObj.className}}</view>
        </view>
        <view class="weui-cell">
            <view class="weui-cell__bd">考勤日期</view>
            <view class="weui-cell__ft">{{headerObj.date}}</view>
        </view>
        <view class="weui-cell">
            <view class="weui-cell__bd">班级人数</view>
            <view class="weui-cell__ft">{{headerObj.classPersonCount}}人</view>
        </view>
    </view>

    <!-- 缺卡详情 -->
    <view class="weui-panel weui-panel_access page__top">
      <view class="weui-cells weui-cells_after-title">
        <view class="weui-cell">
            <view class="weui-cell__bd">缺卡人</view>
            <view class="weui-cell__ft">{{obj.notCheckInCount}}人</view>
        </view>
      </view>
      <view class="weui-panel__bd">
        <view v-if="obj.notCheckInPersons.length==0" class="weui-panel__box">暂无</view>
        <view v-else class="weui-media-box weui-media-box_text">
          <view class="weui-media-box__desc">{{obj.notCheckInPersons}}</view>
        </view>
      </view>
    </view>
      
    <!-- 班级学生详情 -->
    <view class="weui-cells weui-cells_after-title page__top">
      <view class="weui-cell">
          <view class="weui-cell__bd">学生详情</view>
      </view>
    </view>
    <scroll-view scroll-y style="height: 270px;" lower-threshold="1" upper-threshold="10">
    <block v-if="obj.students.length==0">
      <view class="weui-cells__box ">暂无数据</view>
    </block>
    <block v-else>
    <view v-for="(item, index) in obj.students" :key="index">
      <view class="weui-cells weui-cells_after-title ">
          <view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <view class="weui-cell__bd">
                <view>{{item.name}}
                  <text class="weui-cell__bd_font">{{item.phone}}</text>
                </view>
                <view style="font-size: 13px;color: #888888;margin-top:10rpx;" v-if="item.remarks != null">
                  {{item.remarks}}
                </view>
            </view>
            <view class="weui-cell__ft">
              <text class="weui-cell__ft_font">{{item.checkTime}}</text>
            </view>
          </view>
      </view>
      </view>
    </block>
    </scroll-view>

  </view>
</view>
</template>

<script>
var app = getApp();

export default {
  data() {
    return {
      isDayStatistics: '',
      //是日统计标志位
      obj: {},
      headerObj: {} //

    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let classId = options.classId;
    let planId = options.planId;
    var date = options.limitDate;

    if (options.activeIndex == 0) {
      this.getClassDayStatistics(classId, planId, date);
    } else if (options.activeIndex == 1) {
      this.getClassMonthStatistics(classId, planId, date);
    }

    let headerObj = {};
    headerObj.classPersonCount = options.classPersonCount;
    headerObj.className = options.className;
    headerObj.date = app.globalData.PublicUtil.formatTimeTwo(Number(date), 'Y-M-D');
    this.setData({
      headerObj: headerObj
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  methods: {
    /**
     * 获取班级日统计
     */
    getClassDayStatistics: function (classId, planId, limitDate) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.getClassDayStatistics + '?teacherId=' + userInfoCach.personId + '&planId=' + planId + '&limitDate=' + limitDate + '&classId=' + classId,
        header: {
          'token': userInfoCach.token
        },
        method: 'GET',

        success(res) {
          console.log('获取班级日统计返回', res.data);

          if (res.data && res.data.code == 200) {
            let data = res.data.rows;

            for (let i = 0; i < data.students.length; i++) {
              if (data.students[i].checkTime != null) {
                data.students[i].checkTime = app.globalData.PublicUtil.formatTimeTwo(data.students[i].checkTime, 'h:m');
              } else {
                data.students[i].checkTime = '无';
              }
            }

            _this.setData({
              obj: data
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

    /**
     * 获取班级月统计
     */
    getClassMonthStatistics: function (classId, planId, limitDate) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.getClassMonthStatistics + '?teacherId=' + userInfoCach.personId + '&planId=' + planId + '&limitDate=' + limitDate + '&classId=' + classId,
        header: {
          'token': userInfoCach.token
        },
        method: 'GET',

        success(res) {
          console.log('获取班级月统计返回', res.data);

          if (res.data && res.data.code == 200) {
            let data = res.data.rows;

            for (let i = 0; i < data.students.length; i++) {
              if (data.students[i].checkTime != null) {
                data.students[i].checkTime = app.globalData.PublicUtil.formatTimeTwo(data.students[i].checkTime, 'h:m');
              } else {
                data.students[i].checkTime = '无';
              }
            }

            _this.setData({
              obj: data
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
    }
  }
};
</script>
<style>
@import "./attendanceStatisticsClassDetail.css";
</style>