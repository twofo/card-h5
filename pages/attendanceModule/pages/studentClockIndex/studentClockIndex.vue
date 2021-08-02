<template>
<view class="page">
  <view class="page__bd list-box" style="padding: 10rpx 20rpx;">
    <view class="list-box" v-if="pageObj.length!=0">
       <view v-for="(item, index) in pageObj" :key="index">

        <view class="weui-cells weui-cells_after-title">
          <view class="weui-cell weui-cell_switch" @tap="toClock" :data-planid="item.planId" :data-executeplanid="item.executePlanId">
            <view class="weui-cell__bd">
                <view style="font-size: 18px;">{{item.name}}</view>
                <view style="font-size: 13px;color: #bbb;margin-top: 8rpx;">考勤时间段：{{item.startTime}} ~ {{item.endTime}}</view>
            </view>
            <view class="weui-cell__ft">
              <view class="weui-cell__ft weui-cell__ft_in-access"></view>
            </view>
          </view>
        </view>
      
      </view>

    </view>
    <view v-else>
      <view class="weui-cells__box">暂无考勤打卡</view>
    </view>
    

  </view>
</view>
</template>

<script>
var app = getApp();
import attendanceStudentIndexLists from "../../../../components/attendanceModule/studentIndex/studentIndex";

export default {
  data() {
    return {
      pageObj: []
    };
  },

  components: {
    attendanceStudentIndexLists
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClockList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('------------------------考勤打卡列表------------------------');
    wx.stopBeaconDiscovery({
      success: function () {
        console.log('停止扫描');
        wx.hideToast();
      }
    });
  },
  methods: {
    /**
     * 获取打卡列表
     */
    getClockList: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let limitDate = new Date().getTime();
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.signInStatusDetail,
        data: {
          userId: userInfoCach.userId,
          personType: userInfoCach.personType,
          type: 1,
          limitDate: limitDate
        },
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          console.log('获取打卡列表返回', res.data);

          if (res.data && res.data.code == 200) {
            wx.hideToast();
            let data = res.data.rows;

            _this.dealPageObj(data);
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
    dealPageObj: function (data) {
      let list = [];

      for (let i = 0, t = 0; i < data.length; i++) {
        if (data[i].status != 25) {
          let obj = {};
          obj.startTime = app.globalData.PublicUtil.formatTimeTwo(data[i].startTime, 'h:m');
          obj.endTime = app.globalData.PublicUtil.formatTimeTwo(data[i].endTime, 'h:m');
          obj.name = data[i].planName;
          obj.planId = data[i].planId;
          obj.executePlanId = data[i].executePlanId;
          list[t] = obj;
          t++;
        }
      }

      this.setData({
        pageObj: list
      });
    },

    /**
     * 去打卡
     */
    toClock: function (e) {
      let executePlanId = e.currentTarget.dataset.executeplanid == null ? '' : e.currentTarget.dataset.executeplanid;
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.attendancePageUrl.studentClockUrl + '?planId=' + e.currentTarget.dataset.planid + '&executePlanId=' + executePlanId, 500);
    }
  }
};
</script>
<style>
@import "./studentClockIndex.css";
</style>