<template>
<view class="page">
  <view class="page__bd list-box">

    <!-- 考勤计划列表 -->
    <scroll-view scroll-y :style="'height: ' + (windowHeight-170) + 'px;'">
      <view v-if="planList!=''">
        <plan-lists :planList="planList" :is_edit="is_edit" @myevent="onMyEvent"></plan-lists>   
      </view>
      <view v-else>
        <view class="remind-box"> 
          <image class="remind-img1" :src="imageUrl.none"></image>
          <text class="remind-text">列表内容为空</text>
        </view>
      </view>
    </scroll-view>
    
  </view> 
  

  <!-- 按钮 -->
  <view class="page__bd weui-btn-area">
    <button class="weui-btn" type="primary" @tap="savePlan">新增考勤计划</button>
    <button class="weui-btn" type="default" @tap="edit">
      <view v-if="is_edit">完成</view>
      <view v-else>编辑</view>  
    </button>
  </view>

</view>
</template>

<script>
var app = getApp();
var AttendanceImageUrl = require("../../resources/utils/imageUrl.js");
import planLists from "../../../../components/attendanceModule/planList/planList";

export default {
  data() {
    return {
      attendanceImageUrl: AttendanceImageUrl,
      imageUrl: app.globalData.ImageUrl,
      planList: [],
      is_edit: false,
      windowHeight: 580
    };
  },

  components: {
    planLists
  },
  props: {},
  onLoad: function () {
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    this.getPlanList(userInfoCach);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('------------------------考勤计划------------------------');
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    this.getPlanList(userInfoCach); // 获取现在手机屏幕高度

    console.log('windowHeight', wx.getSystemInfoSync().windowHeight);
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    }); // 清空数据

    app.globalData.StorageUtil.remove('attendaceWeekCach');
    app.globalData.StorageUtil.remove('departmentCach');
    app.globalData.StorageUtil.remove('majorCach');
    app.globalData.StorageUtil.remove('classCach');
    app.globalData.StorageUtil.remove('sendPageObjCach');
    app.globalData.StorageUtil.remove('toWeekCach');
  },
  methods: {
    /**
     * 获取考勤计划列表
     */
    getPlanList: function (userInfoCach, is) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.getAttendPlanList,
        data: {
          personId: userInfoCach.personId,
          personType: userInfoCach.personType
        },
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          console.log('获取考勤计划列表返回', res.data);

          if (res.data && res.data.code == 200) {
            let data = res.data.rows; // 将时间戳转化为日期

            for (let i = 0; i < data.length; ++i) {
              data[i].startTime = app.globalData.PublicUtil.formatTimeTwo(data[i].startTime, 'h:m');
              data[i].endTime = app.globalData.PublicUtil.formatTimeTwo(data[i].endTime, 'h:m');
            }

            console.log(data);

            _this.setData({
              planList: data
            });
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },

        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          // 不关闭启用或禁止状态的加载
          if (!is) {
            wx.hideToast();
          }
        }
      });
    },

    /**
     * 编辑按钮
     */
    edit: function (e) {
      var _this = this;

      let is_edit = _this.is_edit ? false : true;

      _this.setData({
        is_edit: is_edit
      });
    },

    /**
     * 跳转到考勤发送
     */
    savePlan: function () {
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.attendancePageUrl.attendaceSendUrl, 1000);
    },

    /**
     * 接收组件点击后所传的值
     */
    onMyEvent: function (e) {
      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let valueType = e.detail.valueType;
      let planId = e.detail.planId;
      let enable = e.detail.enable; // valueType=1 组件点击删除 valueType=2 組件点击启用或禁用 valueType=3 組件点击跳转到修改页面

      if (valueType == 1) {
        this.deletePlam(userInfoCach, planId);
      } else if (valueType == 2) {
        this.switchAttendancePlan(userInfoCach, planId, enable);
      } else if (valueType == 3) {
        app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.attendancePageUrl.attendaceSendUrl + '?planId=' + planId, 500);
      }
    },

    /**
     * 删除考勤计划
     */
    deletePlam: function (userInfoCach, planId) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.deleteAttendancePlan + '?teacherId=' + userInfoCach.personId + '&planId=' + planId,
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'DELETE',

        success(res) {
          if (res.data && res.data.code == 200) {
            setTimeout(function () {
              _this.getPlanList(userInfoCach);
            }, 2000);
            app.globalData.ShowMsgUtil.showSuccessToast("删除成功", 2000);
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
     * 启用或关闭 - 考勤计划
     */
    switchAttendancePlan: function (userInfoCach, planId, enable) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.switchAttendancePlan,
        data: {
          teacherId: userInfoCach.personId,
          planId: planId,
          enable: enable
        },
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          console.log('启用或关闭', res.data);

          if (res.data && res.data.code == 0) {
            if (enable) {
              app.globalData.Utils.showMsgUtil.showSuccessToast("启用成功", 2000);
            } else {
              app.globalData.Utils.showMsgUtil.showSuccessToast("关闭成功", 2000);
            }

            _this.getPlanList(userInfoCach, true);
          } else {
            _this.getPlanList(userInfoCach, true);

            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },

        fail: function () {
          _this.getPlanList(userInfoCach, true);

          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    }
  }
};
</script>
<style>
@import "./attendancePlan.css";
</style>