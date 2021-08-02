<template>
<view class="page">
  <view class="page__bd list-box">
    <view class="list-box" v-if="planList.length!=0">
      <attendance-student-index-lists :list="planList" @myevent="onMyEvent" :windowHeight="windowHeight"> </attendance-student-index-lists>
    </view>
    <view v-else>
      <view class="weui-cells__box">暂无统计数据</view>
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
      planList: [],
      isStudent: true,
      windowHeight: 600,
      planObj: ""
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
		console.log(options)
    // 若传送有值并且值为0
    if (options.isStudent == 0) {
      // 表示是辅导员端统计的考勤规则跳转过来的
      this.setData({
        isStudent: false
      });
    }
		if(options.type){
			if(options.type == 'kqtj'){
				uni.setNavigationBarTitle({
					title:'考勤统计_考勤规则'
				})
			}
		}

    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    this.getPlanList(userInfoCach);
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('------------------------考勤统计------------------------');
  },
  methods: {
    /**
     * 获取考勤计划列表
     */
    getPlanList: function (userInfoCach) {
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
        }
      });
    },

    /**
     * 接收组件点击后所传的值
     */
    onMyEvent: function (e) {
      var _this = this;

      var id = e.detail.id;
      var name = e.detail.name;

      if (this.isStudent) {
        // 获取id，再跳转到指定页面
        app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.attendancePageUrl.studentStatisticsUrl + '?planId=' + id, 500);
      } else {
        //获取当前页面js里面的pages里的所有信息。
        let pages = getCurrentPages(); //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

        let prevPage = pages[pages.length - 2]; // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

        let planObj = {};
        planObj.id = id;
        planObj.name = name;
        prevPage.setData({
          planObj: planObj
        });
        wx.navigateBack({
          delta: 1
        });
      }
    }
  }
};
</script>
<style>
@import "./studentStatisticsIndex.css";
</style>