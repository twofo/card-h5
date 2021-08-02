<template>
<view class="page">
    <view class="page__bd">

      <!-- navbar导航 -->
      <navbar-two :tabs="tabs" @clickTabs="bindClickTabs"></navbar-two>
      
      <!-- 内容头部 -->
      <view class="myui-box">
      <statistics-header :showType="headerObj.showType" :showName="planObj.name" :date="headerObj.nowTime" @getData="bindGetData"></statistics-header>
      </view>

      <scroll-view scroll-y style="height: 500px;" lower-threshold="1" upper-threshold="10">
        <!-- 考勤统计图 -->
        <view class="list-box" v-if="isShowStatistics">
          <canvas canvas-id="ringCanvas" disable-scroll="true" class="canvas"></canvas>
        </view>
        <view v-else>
          <view class="weui-cells__box">暂无统计数据</view>
        </view>
        <!-- 班级详情 -->
        <statistics-class-detail :list="classDetailList" @getClassDetail="bindGetClassDetail"></statistics-class-detail>
      </scroll-view>  
         
    </view>
</view>
</template>

<script>
var wxCharts = require("../../../common/resources/utils/wxcharts.js");
var app = getApp(); //定义记录初始屏幕宽度比例，便于初始化
//定义记录初始屏幕宽度比例，便于初始化
var windowW = 0;
import navbarTwo from "../../../../components/common/navBarTwo/navBarTwo";
import statisticsHeader from "../../../../components/attendanceModule/statisticsHeader/statisticsHeader";
import statisticsClassDetail from "../../../../components/attendanceModule/statisticsClassDetail/statisticsClassDetail";

export default {
  data() {
    return {
      tabs: ["日统计", "月统计"],
      activeIndex: 0,
      headerObj: {},
      planObj: '',
      classDetailList: [],
      isShowStatistics: true,
      //是否显示统计图
      selectData: ''
    };
  },

  components: {
    navbarTwo,
    statisticsHeader,
    statisticsClassDetail
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //计算屏幕宽度比列
    windowW = wx.getSystemInfoSync().windowWidth / 360;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('------------------------考勤统计------------------------'); // 选考勤规则后进入页面，不再初始化数据

    if (this.planObj != '') {
      // 选择日期、选择规则再查询考勤月统计
      // if (this.data.selectData != ''){
      var data = this.selectData == '' ? app.globalData.PublicUtil.formatTimeTwo(new Date().getTime(), 'Y-M-D') : this.selectData;
      var activeIndex = this.activeIndex;
      console.log('this.data.planObj.id---', this.planObj.id);

      if (this.planObj.id) {
        if (activeIndex == 0) {
          // 获取统计图显示与班级详情 - 当获取考勤planId成功后
          this.getStatistics(this.planObj.id, new Date(data.split('-')).getTime(), 0);
        } else if (activeIndex == 1) {
          // 获取统计图显示与班级详情 - 当获取考勤planId成功后
          this.getStatistics(this.planObj.id, new Date(data.split('-')).getTime(), 1);
        }
      } // } 


      return;
    }

    var headerObj = {}; // 获取考勤时间，默认为当前时间

    headerObj.nowTime = app.globalData.PublicUtil.formatTimeTwo(new Date().getTime(), 'Y-M-D');
    headerObj.showType = ''; //选择年月日

    headerObj.isDayStatistics = true; //是日统计标志位
    // 获取考勤规则、

    this.getPlanList(0); //查询日统计
    // 获取统计图显示与班级详情 - 当获取考勤planId成功后

    this.setData({
      headerObj: headerObj
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  methods: {
    /**
     * 点击navbar
     * 
     * 每请求一次对应的计数加一。当改变activeIndex时，下拉刷新时计数清空。
     */
    bindClickTabs: function (e) {
      var activeIndex = e.detail.activeIndex; // 根据activeIndex的值获取显示信息

      var headerObj = {};

      if (activeIndex == 0) {
        // 获取考勤时间，默认为当前时间
        headerObj.nowTime = app.globalData.PublicUtil.formatTimeTwo(new Date().getTime(), 'Y-M-D');
        headerObj.showType = ''; //选择年月日

        headerObj.isDayStatistics = true; //是日统计标志位
        // 获取考勤规则、

        this.getPlanList(0); //查询日统计
        // 获取统计图显示与班级详情 - 当获取考勤planId成功后
      } else if (activeIndex == 1) {
        headerObj.nowTime = app.globalData.PublicUtil.formatTimeTwo(new Date().getTime(), 'Y-M');
        headerObj.showType = 'month'; //只选择年月

        headerObj.isDayStatistics = false; //是日统计标志位
        // 获取考勤规则、

        this.getPlanList(1); //查询月统计
        // 获取统计图显示与班级详情 - 当获取考勤planId成功后
      }

      this.setData({
        isShowStatistics: true,
        activeIndex: activeIndex,
        headerObj: headerObj
      });
    },

    /**
     * 获取考勤计划列表
     */
    getPlanList: function (type) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
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
          wx.hideToast();
          console.log('获取考勤计划列表返回', res.data);

          if (res.data && res.data.code == 200) {
            let data = res.data.rows; // 获取统计图显示与班级详情 - 进入日统计页面初始数据

            if (data.length != 0) {
              _this.setData({
                planObj: data[0]
              });

              console.log(data[0].id);

              if (data[0].id) {
                _this.getStatistics(data[0].id, new Date().getTime(), type);
              }
            } else {
              _this.setData({
                isShowStatistics: false
              });
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
     * 获取统计图信息
     */
    getStatistics: function (planId, limitDate, type) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.getAttendStatistics + '?teacherId=' + userInfoCach.personId + '&planId=' + planId + '&limitDate=' + limitDate + '&type=' + type,
        header: {
          'token': userInfoCach.token
        },
        method: 'GET',

        success(res) {
          console.log('获取统计图信息返回', res.data);

          if (res.data && res.data.code == 200) {
            let data = res.data.rows; // 处理统计图数据

            _this.dealStatisticsData(data);

            let array = res.data.rows.classSummaryDetail;

            for (let i = 0; i < array.length; i++) {
              let shouldCheckInCount = parseFloat(array[i].shouldCheckInCount); // 应考勤人数

              let classNotCheckInCount = parseFloat(array[i].classNotCheckInCount); // 缺勤人数

              if (classNotCheckInCount != 0) {
                array[i].percentage = ((shouldCheckInCount - classNotCheckInCount) / shouldCheckInCount * 100).toFixed(2);
              } else {
                array[i].percentage = 0.00.toFixed(2);
              }

              array[i].shouldCheckInCount = shouldCheckInCount + '人'; // 应考勤人数

              if (_this.activeIndex == 1) {
                array[i].shouldCheckInCount = shouldCheckInCount + '次'; // 应考勤人数
              }
            }

            _this.setData({
              classDetailList: array
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
     * 
     */
    dealStatisticsData: function (data) {
      let series = [];
      let obj = {};
      obj.name = '打卡人员' + (data.shouldCheckInCount - data.notCheckInSumCount) + '人';
      obj.data = data.shouldCheckInCount - data.notCheckInSumCount;
      series[0] = obj;
      let obj1 = {};
      obj1.name = '缺勤人员' + data.notCheckInSumCount + '人';
      obj1.data = data.notCheckInSumCount;
      series[1] = obj1;
      console.log(series[0].data == 0 && series[1].data == 0);

      if (series[0].data == 0 && series[1].data == 0) {
        this.setData({
          isShowStatistics: false
        });
        return;
      } else {
        this.setData({
          isShowStatistics: true
        });
      }

      let race = Math.floor((100 - data.percentage) * 100) / 100;
      new wxCharts({
        animation: true,
        //是否有动画
        canvasId: 'ringCanvas',
        type: 'ring',
        series: series,
        width: 290 * windowW,
        height: 300 * windowW,
        dataLabel: true,
        extra: {
          ringWidth: 20,
          pie: {
            offsetAngle: 1
          }
        },
        subtitle: {
          name: "出勤率",
          color: '#666666',
          fontSize: 18
        },
        title: {
          name: race + '%',
          color: '#7cb5ec',
          fontSize: 32
        },
        dataLabel: true,
        padding: 0
      });
    },

    /**
     * 点击选择时间
     */
    bindGetData: function (e) {
      var data = e.detail.data;
      this.setData({
        selectData: e.detail.data
      });
      var activeIndex = this.activeIndex;
      console.log('this.data.planObj.id---', this.planObj.id);

      if (this.planObj.id) {
        this.headerObj.nowTime = data;
        this.setData({
          headerObj: this.headerObj
        });

        if (activeIndex == 0) {
          // 获取统计图显示与班级详情 - 当获取考勤planId成功后
          this.getStatistics(this.planObj.id, new Date(data.split('-')).getTime(), 0);
        } else if (activeIndex == 1) {
          // 获取统计图显示与班级详情 - 当获取考勤planId成功后
          this.getStatistics(this.planObj.id, new Date(data.split('-')).getTime(), 1);
        }
      }
    },
    // 班级详情组件返回选中查看详情班级
    bindGetClassDetail: function (e) {
      console.log('this.data.headerObj.nowTime.split(' - ')).getTime()', this.headerObj.nowTime.split('-'));
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.attendancePageUrl.classDetailUrl + '?classId=' + e.detail.item.classId + '&planId=' + e.detail.item.planId + '&classPersonCount=' + e.detail.item.classPersonCount + '&className=' + e.detail.item.className + '&limitDate=' + new Date(this.headerObj.nowTime.split('-')).getTime() + '&activeIndex=' + this.activeIndex, 500);
    }
  }
};
</script>
<style>
@import "./attendanceStatistics.css";
</style>