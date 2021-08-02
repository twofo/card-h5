<template>
<view class="page">
    <view class="page__bd">

        <view class="weui-tab">
            <view class="myui-navbar">
                <block v-for="(item, index) in tabs" :key="index">					
						<view :id="index" style="margin-left: 10px;" :class="'myui-navbar__item ' + (activeIndex == index ? 'myui-bar__item_on' : '')" @tap="tabClick">
						    <view class="myui-navbar__title">{{item}}</view>
						</view>
                </block>
		
            </view>
            <view class="weui-tab__panel">
                <!-- 月份 navbar -->
                <view :hidden="activeIndex != 0" style="margin-top:-20rpx">
                  <navbar-five :tabs="monthTabs" @clickTabs="bindMonthTabs" :activeIndex="monthActiveIndex"></navbar-five>
                </view>
                
                <!-- 年份 navbar -->
                <view :hidden="activeIndex != 1" style="margin-top:-20rpx;">
                  <navbar-five :tabs="yearTabs" @clickTabs="bindyearTabs" :activeIndex="yearActiveIndex"></navbar-five>
                </view>

                <!-- <view class="weui-tab__content" hidden="{{activeIndex != 0}}">月份 navbar</view> -->
                <!-- <view class="weui-tab__content" hidden="{{activeIndex != 1}}">年份 navbar</view> -->

                
                <!-- 完成工单统计 -->
                <view class="weui-tab__content">
                  <!-- 考勤统计图 -->
                  
                  <view class="list-box">
                    <view class="list-box__text">
                      <text>总单数： {{pageObj.total}}单</text>
                      <text>平均单数： {{pageObj.avager}}单</text>
                    </view>
                    <canvas canvas-id="lineCanvas" disable-scroll="true" class="canvas" @touchstart="touchHandler" @touchmove="moveHandler" @touchend="touchEndHandler"></canvas>
                  </view>
                  <my-statistics :list="deviceStatisticsList"></my-statistics>
                </view>
                <!-- 维修类型统计 -->
               
            </view>
        </view>

    </view>
</view>
</template>

<script>
var app = getApp();
var wxCharts = require("../../../common/resources/utils/wxcharts.js"); //定义记录初始屏幕宽度比例，便于初始化
//定义记录初始屏幕宽度比例，便于初始化
var windowW = 0;
var ImageUrl = require("../../resources/utils/imageUrl.js");
var lineChart = null;
var startPos = null;
import navbarFive from "../../../../components/common/navBarFive/navBarFive";
import myStatistics from "../../resources/components/statistics/statistics";

export default {
  data() {
    return {
      tabs: ["月", "年"],
      activeIndex: 0,
      monthTabs: [],
      monthActiveIndex: 4, 
      //选中了哪一块
      yearTabs: [],
      yearActiveIndex: 4,
      //选中了哪一块
      pageObj: {},
      deviceStatisticsList:[] // { name: '其它', percent: 60, image: ImageUrl.icRepairLamp, },
   
    };
  },

  components: {
    navbarFive,
    myStatistics
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //计算屏幕宽度比列
    windowW = wx.getSystemInfoSync().windowWidth / 360; // 统计图

    var windowWidth = 320;

    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {} // 处理navbar显示数据


    this.dealPageObj();
    this.dealNavbar(0, 4);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    dealPageObj: function () {
      var timestamp = Date.parse(new Date());
      let nowDate = new Date(timestamp);
      let nowMonth = nowDate.getMonth();
      let nowYear = nowDate.getFullYear();
      let yearTabs = []; // 年 navbar

      for (let i = 0; i < 5; i++) {
        yearTabs[i] = nowYear - (4 - i) + '年';
      }

      let monthTabs = []; // 月 navbar

      for (let i = 0; i < 5; i++) {
        if (nowMonth - (4 - i - 1) > 0) {
          monthTabs[i] = nowMonth - (4 - i - 1) + '月';
        } else {
          monthTabs[i] = 12 - (4 - i - 1) + '月';
        }
      }

      this.setData({
        yearTabs: yearTabs,
        monthTabs: monthTabs
      });
    },
    tabClick: function (e) {
      let activeIndex = e.currentTarget.id;
      this.setData({
        monthActiveIndex: 4,
        yearActiveIndex: 4,
        activeIndex: activeIndex
      });

      if (activeIndex == 0) {
        this.dealNavbar(0, this.monthActiveIndex);
      } else if (activeIndex == 1) {
        this.dealNavbar(1, this.yearActiveIndex);
      }
    },

    /**
     * 点击navbar
     * 
     * 每请求一次对应的计数加一。当改变activeIndex时，下拉刷新时计数清空。
     */
    bindMonthTabs: function (e) {
      console.log('月份 navbar组件点击', e.detail.activeIndex);
      let actionIndex = e.detail.activeIndex;
      this.dealNavbar(0, e.detail.activeIndex);
    },
    bindyearTabs: function (e) {
      console.log('年份 navbar组件点击', e.detail.activeIndex);
      let actionIndex = e.detail.activeIndex;
      this.dealNavbar(1, actionIndex);
    },

    /**
     * 处理两个navbar的点击事件
     * 
     * 处理请求完成工单统计数据
     */
    dealNavbar: function (activeIndexOfOne, activeIndexOfTwo) {
      let nowDate = new Date();
      let nowMonth = nowDate.getMonth(); // let nowMonth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1));

      let nowYear = nowDate.getFullYear();
      let requestData = {};
      let timeType = 0;
      let date = ''; // 年份

      if (activeIndexOfOne == 1) {
        if (activeIndexOfTwo == 4) {
          // 今年
          date = nowYear + '-01';
        } else if (activeIndexOfTwo == 3) {
          // 第前一年
          date = nowYear - 1 + '-01';
        } else if (activeIndexOfTwo == 2) {
          // 第前两年
          date = nowYear - 2 + '-01';
        } else if (activeIndexOfTwo == 1) {
          // 第前三年
          date = nowYear - 3 + '-01';
        } else if (activeIndexOfTwo == 0) {
          // 第前四年
          date = nowYear - 4 + '-01';
        } // 月份 

      } else if (activeIndexOfOne == 0) {
        if (activeIndexOfTwo == 4) {
          // 上一月
          let month = nowMonth + 1 < 10 ? '0' + (nowMonth + 1) : nowMonth + 1;
          date = nowYear + '-' + month;
        } else if (activeIndexOfTwo == 3) {
          if (nowMonth - 1 > 0) {
            nowMonth = nowMonth - 1;
          } else {
            nowYear = nowYear - 1;
            nowMonth = 12 - 1;
          }

          let month = nowMonth + 1 < 10 ? '0' + (nowMonth + 1) : nowMonth + 1;
          date = nowYear + '-' + month;
        } else if (activeIndexOfTwo == 2) {
          if (nowMonth - 2 > 0) {
            nowMonth = nowMonth - 2;
          } else {
            nowYear = nowYear - 1;
            nowMonth = 12 - 2;
          }

          let month = nowMonth + 1 < 10 ? '0' + (nowMonth + 1) : nowMonth + 1;
          date = nowYear + '-' + month;
        } else if (activeIndexOfTwo == 1) {
          if (nowMonth - 3 > 0) {
            nowMonth = nowMonth - 3;
          } else {
            nowYear = nowYear - 1;
            nowMonth = 12 - 3;
          }

          let month = nowMonth + 1 < 10 ? '0' + (nowMonth + 1) : nowMonth + 1;
          date = nowYear + '-' + month;
        } else if (activeIndexOfTwo == 0) {
          if (nowMonth - 4 > 0) {
            nowMonth = nowMonth - 4;
          } else {
            nowYear = nowYear - 1;
            nowMonth = 12 - 4;
          }

          let month = nowMonth + 1 < 10 ? '0' + (nowMonth + 1) : nowMonth + 1;
          date = nowYear + '-' + month;
        }
      }

      timeType = activeIndexOfOne + 1;
      console.log('date-', date);
      this.selectStatisticsOfWorkOrder(timeType, date);
    },

    /**
     * 查询已完成工单统计
     */
    selectStatisticsOfWorkOrder: function (timeType, date) {
			app.globalData.ShowMsgUtil.netErrNotice();
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.repairRequestUrl.selectStatisticsOfWorkOrder + '?timeType=' + timeType + '&date=' + date,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('查询已完成工单统计返回', res.data);
	    
          if (res.data && res.data.code == 200) {
            let data = res.data.rows; // 处理完成工单统计数据显示
	     	_this.setData({
				'deviceStatisticsList':res.data.rows.finishOrderPercent,
			})
            _this.dealStatisticsData(data.repairCounts, timeType); // 处理报修设备类型统计数据显示
          
            _this.dealStatisticsDataOfDevice(data.repairDeviceCounts);
          } else {
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

    /**
     * 处理完成工单统计数据
     */
    dealStatisticsData: function (rows, timeType) {
      var categories = [];
      var data = [];
      let total = 0;
      let nowDate = new Date();
      let nowMonth = nowDate.getMonth() + 1;
      let t = timeType == 1 ? nowMonth + '天' : '月';

      for (let i = 0; i < rows.length; i++) {
        // 页面显示数据
        total = rows[i].countOfOrder + total; // 统计图数据

        let t = timeType == 1 ? nowMonth + '-' + (i + 1) : i + 1 + '月';
        categories.push(t);
        data.push(rows[i].countOfOrder);
      }

      let avager = (total / rows.length).toFixed(1);
      let pageObj = {};
      pageObj.total = total;
      pageObj.avager = avager;
      this.setData({
        pageObj: pageObj
      }); // 线性统计图

      lineChart = new wxCharts({
        canvasId: 'lineCanvas',
        type: 'line',
        categories: categories,
        animation: false,
        series: [{
          name: '完成工单数  可滑动',
          data: data
        }],
        xAxis: {
          disableGrid: false
        },
        yAxis: {
          title: '工单数',
          format: function (val) {
            return val.toFixed(0);
          },
          min: 0
        },
        width: 330 * windowW,
        height: 190 * windowW,
        dataLabel: true,
        dataPointShape: true,
        enableScroll: true,
        extra: {
          lineStyle: 'curve'
        }
      });
    },
    touchHandler: function (e) {
      lineChart.scrollStart(e);
    },
    moveHandler: function (e) {
      lineChart.scroll(e);
    },
    touchEndHandler: function (e) {
      lineChart.scrollEnd(e);
      lineChart.showToolTip(e, {
        format: function (item, category) {
          return category + ' ' + item.name + ':' + item.data;
        }
      });
    },

    /**
     * 处理报修设备类型统计数据
     */
    dealStatisticsDataOfDevice: function (rows) {
		console.log(rows,this.deviceStatisticsList)
      let percentList = this.deviceStatisticsList;
      let total = 0;

      for (let i = 0; i < rows.length; i++) {
        if (rows[i] != 3 && rows[i] != 5) {
          total = total + rows[i].number;
        }
      }
   console.log(percentList)
      percentList.finishOrderPercent[0].percent = total == 0 ? 0.0 : (rows[1].number / total * 100).toFixed(1);
       percentList.finishOrderPercent[1].percent = total == 0 ? 0.0 : (rows[4].number / total * 100).toFixed(1);
       percentList.finishOrderPercent[2].percent = total == 0 ? 0.0 : (rows[2].number / total * 100).toFixed(1);
       percentList.finishOrderPercent[3].percent = total == 0 ? 0.0 : (rows[0].number / total * 100).toFixed(1);
      console.log(percentList);
      this.setData({
        deviceStatisticsList: percentList
      });
    }
  }
};
</script>
<style>
@import "./finishOrderStatistics.css";
</style>