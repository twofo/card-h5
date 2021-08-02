<template>
<view class="page">
    <view class="page__bd">

      <!-- navbar导航 -->
      <navbar-two :tabs="tabs" @clickTabs="bindClickTabs"></navbar-two>
      
      <view style="padding: 0rpx 10rpx 0rpx 10rpx;">
      <!-- 内容头部 -->
      <view class="weui-cells weui-cells_after-title myui-title">
        <view class="weui-cell">
          <view class="weui-cell__bd">会议名称：</view>
          <view class="myui-cell__bf">{{fristObj.title}}</view>
        </view>
        <view class="weui-cell">
          <view class="weui-cell__bd">发起人：</view>
          <view class="myui-cell__bf">{{fristObj.initiatorName}}</view>
        </view>
        <view class="weui-cell">
          <view class="weui-cell__bd">会议时间：</view>
          <view class="myui-cell__bf">{{fristObj.meetingTime}}</view>
        </view>
				<view class="weui-cell">
				  <view class="weui-cell__bd">考勤时间：</view>
				  <view class="myui-cell__bf">{{fristObj.checkTime}}</view>
				</view>
        <view class="myui-cell">
          <view class="myui-cell__bd">参会人员：</view>
          <view class="myui-cell__bf">
            <scroll-view scroll-y style="width: 100%;height: 2.6em;">
              {{fristObj.meetingAttendee}}
            </scroll-view> </view>
        </view>
      </view>

      <!-- 图形统计 -->
      <view v-if="activeIndex==0">
        <!-- 考勤统计图 -->
        <view class="list-box" v-if="isShowStatistics">
          <canvas canvas-id="ringCanvas" disable-scroll="true" class="canvas"></canvas>
					<!-- <ec-canvas id="mychart-dom-pie" canvas-id="mychart-pie" ec="{{ ec }}"></ec-canvas> -->
        </view>
        <view v-else>
          <view class="weui-cells__box">暂无统计数据</view>
        </view>
      </view>

      <!-- 人数统计 -->
      <view v-else-if="activeIndex==1">
        <!-- 考勤记录 -->
        <view class="weui-cells weui-cells_after-title myui-title">
          <view class="weui-cell">
            <view class="weui-cell__hd">考勤记录</view>
          </view>
          
          <scroll-view scroll-y :style="'height: ' + (windowHeight*0.55) + 'rpx;'" lower-threshold="1" upper-threshold="10">
            <view v-if="secondObj.personnels.length>0">
              <view v-for="(item, index) in secondObj.personnels" :key="index" style="margin: 9rpx 10rpx;">

                <view class="myui-two">
                  <view class="myui-cell">
                    <view style="width: 20%;">{{item.personName}}</view>
                    <view style="width: 65%;" class="font-color" :data-mobile="item.mobile" @tap="toCreatorPhone">{{item.mobile}}</view>
                    <view class="weui-cell__ft" :style="'color:' + item.attendanceStatusColor">{{item.attendanceStatus}}</view>
                  </view>
                  <!-- <view class="myui-cell-two" wx:if="{{false}}">备注</view> -->
                </view>   

              </view>
            </view>
            <view v-else>
              <view class="weui-cells__box" style=" height: 330rpx;">暂无考勤记录</view>
            </view>
          </scroll-view>  

        </view>

        
        <!-- 缺卡人 -->
        <view class="weui-cells weui-cells_after-title myui-title">
        <view class="weui-cell">
          <view class="weui-cell__bd">缺卡人</view>
          <view class="weui-cell__ft">{{secondObj.lockOfCardCount}}人</view>
        </view>
        <view class="weui-cell font-color">
          <scroll-view scroll-y style="width: 100%;height: 3.3em;">
              {{secondObj.lockOfCard}}
            </scroll-view>
        </view>
      </view>
      </view>

      
      
      </view>

    </view>
</view>
</template>

<script>
var wxCharts = require("../../../common/resources/utils/wxcharts.js"); // import * as echarts from '../../resources/components/ec-canvas/echarts.js';
// import * as echarts from '../../resources/components/ec-canvas/echarts.js';
var app = getApp(); //定义记录初始屏幕宽度比例，便于初始化
//定义记录初始屏幕宽度比例，便于初始化
var windowW = 0; // var chart = null
// function initChart(canvas, width, height, dpr) {
// 	chart = echarts.init(canvas, null, {
// 		width: width,
// 		height: height,
// 		devicePixelRatio: dpr // new
// 	});
// 	canvas.setChart(chart);
// 	return chart;
// }
import navbarTwo from "../../../../components/common/navBarTwo/navBarTwo";
import ecCanvas from "../../resources/components/ec-canvas/ec-canvas";

export default {
  data() {
    return {
      tabs: ["图形统计", "人数统计"],
      activeIndex: 0,
      windowHeight: 0,
      meetingId: '',
      fristObj: [],
      secondObj: [],
      isShowStatistics: true,
      //是否显示统计图
      // ec: {
      // 	onInit:initChart
      // },
      series: {},
      checkTime: ''
    };
  },

  components: {
    navbarTwo,
    ecCanvas
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options); //进入页面加载

    app.globalData.ShowMsgUtil.showLoadAndMsgToast(); //计算屏幕宽度比列

    windowW = wx.getSystemInfoSync().windowWidth / 360;
    this.setData({
      meetingId: options.meetingId,
      windowHeight: wx.getSystemInfoSync().windowHeight
    }); // let _this = this
    // this.statistics(options.meetingId);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let {
      meetingId
    } = this;
    this.statistics(meetingId);
  },
  methods: {
    /**
      * 会议考勤统计 - 图形统计
      */
    statistics: function (meetingId) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.statistics + '?meetingId=' + meetingId,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('会议考勤统计 - 图形统计', res.data);

          if (res.data && res.data.code == 200) {
            _this.dealFristObj(res.data.rows);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideToast({});
        }
      });
    },
    dealFristObj: function (rows) {
      let obj = {};
      obj.title = rows.title;
      obj.initiatorName = rows.initiatorName;
      obj.meetingTime = app.globalData.PublicUtil.formatTimeTwo(rows.startTime, 'Y-M-D h:m') + '-' + app.globalData.PublicUtil.formatTimeTwo(rows.endTime, 'h:m');
      obj.checkTime = app.globalData.PublicUtil.formatTimeTwo(rows.startTime - 1000 * 60 * rows.attenceBeforeTimeNumber, 'Y-M-D h:m') + '-' + app.globalData.PublicUtil.formatTimeTwo(rows.startTime + 1000 * 60 * rows.attenceAfterTimeNumber, 'h:m'); //参会人员

      obj.meetingAttendee = '';

      for (let j = 0; j < rows.attendance.length; j++) {
        if (j == rows.attendance.length - 1) {
          obj.meetingAttendee = obj.meetingAttendee + rows.attendance[j];
        } else {
          obj.meetingAttendee = obj.meetingAttendee + rows.attendance[j] + '、';
        }
      }

      obj.sumPersonCount = rows.sumPersonCount;
      obj.checkInPersonCount = rows.checkInPersonCount;
      obj.notCheckInPersonCount = rows.notCheckInPersonCount;
      obj.checkInPercentage = rows.checkInPercentage;
      this.setData({
        fristObj: obj
      }); // 处理统计图数据

      this.dealStatisticsData(obj);
    },

    /**
     * 
     */
    dealStatisticsData: function (data) {
      let labelOption1 = {
        normal: {
          show: true,
          formatter: '打卡\n' + (data.sumPersonCount - data.notCheckInPersonCount) + '人',
          fontSize: 14
        }
      };
      let labelOption2 = {
        normal: {
          show: true,
          formatter: '缺勤\n' + data.notCheckInPersonCount + '人',
          fontSize: 14
        }
      };
      let series = [];
      let obj = {};
      obj.name = "出勤人数";
      let count = data.sumPersonCount - data.notCheckInPersonCount;
      obj.data = count == 0 ? 0.00001 : count;
      obj.label = labelOption1;
      series[0] = obj;
      let obj1 = {};
      obj1.name = "缺勤人数";
      obj1.data = data.notCheckInPersonCount == 0 ? 0.00001 : data.notCheckInPersonCount;
      series[1] = obj1;
      obj1.label = labelOption2; // console.log(series[0].data == 0 && series[1].data == 0);

      if (series[0].data == 0 && series[1].data == 0) {
        this.setData({
          isShowStatistics: false
        });
        return;
      } else {
        this.setData({
          isShowStatistics: true
        });
      } //保留两位小数点


      let race = Math.floor(data.checkInPercentage * 100 * 100) / 100; // let name = series[0].name
      // this.setData({
      // 	series
      // })
      // console.log(this.data.isShowStatistics)
      // console.log(series)
      // let _this = this
      //如果是第一次绘制
      // this.setInitOptions( series , race)

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

    setInitOptions(series, race) {
      let graphictext = race;
      var option = {
        legend: {
          orient: 'vertical',
          left: 10,
          selectedMode: false,
          data: ['出勤人数', '缺勤人数']
        },
        backgroundColor: "#fff",
        color: ["#37A2DA", "#84CDFB"],
        graphic: [{
          //环形图中间添加文字
          type: 'text',
          //通过不同top值可以设置上下显示
          left: 'center',
          top: '52%',
          style: {
            text: graphictext + '%',
            //自己设置显示内容
            textAlign: 'center',
            fill: '#000',
            //文字的颜色
            width: 30,
            height: 30,
            fontSize: 18
          }
        }, {
          type: 'text',
          left: 'center',
          top: '45%',
          style: {
            text: '出勤率',
            textAlign: 'center',
            fill: '#000',
            width: 30,
            height: 30,
            fontSize: 18
          }
        }],
        series: [{
          label: {
            show: true,
            position: 'outside'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true,
            length: 5,
            length2: 5
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['40%', '60%'],
          clickable: false,
          hoverAnimation: false,
          legendHoverLink: false,
          data: series
        }]
      };
      setTimeout(() => {
        // chart.clear()
        chart.setOption(option);
      }, 1500);
    },

    /*
       * 会议考勤统计 - 人数统计
       */
    checkInDetail: function (meetingId) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.checkInDetail + '?meetingId=' + meetingId,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('会议考勤统计 - 人数统计', res.data);

          if (res.data && res.data.code == 200) {
            _this.dealSecondObj(res.data.rows.personnel);
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
    dealSecondObj: function (rows) {
      let secondObj = {};
      let array = [];
      let t = 0; //参会人员

      let lockOfCard = '';

      for (let i = 0; i < rows.length; i++) {
        let obj = {};
        obj.personName = rows[i].name;
        obj.mobile = rows[i].mobile == null ? '暂无' : rows[i].mobile;
        obj.attendanceStatus = '正常';

        if (rows[i].status != 20) {
          obj.attendanceStatusColor = 'rgb(234, 25, 50)';

          if (rows[i].status == 21 || rows[i].status == 23) {
            t++;

            if (i == rows.length - 1) {
              lockOfCard = lockOfCard + rows[i].name;
            } else {
              lockOfCard = lockOfCard + rows[i].name + '、';
            }
          }

          if (rows[i].status == 21) {
            obj.attendanceStatus = '缺席';
          } else if (rows[i].status == 22) {
            obj.attendanceStatus = '迟到';
          } else if (rows[i].status == 23) {
            obj.attendanceStatus = '请假';
          } else if (rows[i].status == 24) {
            obj.attendanceStatus = '补签';
          } else {
            obj.attendanceStatus = '未知';
          }
        }

        array[i] = obj;
      }

      secondObj.personnels = array;
      secondObj.lockOfCardCount = t;
      secondObj.lockOfCard = lockOfCard;
      this.setData({
        secondObj: secondObj
      });
    },

    /**
     * 点击navbar
     * 
     * 每请求一次对应的计数加一。当改变activeIndex时，下拉刷新时计数清空。
     */
    bindClickTabs: function (e) {
      var activeIndex = e.detail.activeIndex;

      if (activeIndex == 1) {
        this.checkInDetail(this.meetingId);
      } else {
        this.statistics(this.meetingId);
      }

      this.setData({
        isShowStatistics: true,
        activeIndex: activeIndex
      });
    },
    toUserDetail: function () {
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendaceUserDetailUrl, 500);
    },
    // 联系创建会议的人
    toCreatorPhone: function (e) {
      console.log(e.currentTarget.dataset.mobile);

      if (e.currentTarget.dataset.mobile == "暂无") {
        return;
      }

      let phone = e.currentTarget.dataset.mobile;
      this.callPhone(phone);
    },
    callPhone: function (phone) {
      wx.showModal({
        title: '呼叫',
        content: '拨打' + phone,
        cancelText: '取消',
        confirmText: '拨打',
        confirmColor: '#20a4f7',

        success(res) {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: phone //仅为示例，并非真实的电话号码

            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }

      });
    }
  }
};
</script>
<style>
@import "./attendaceStatistics.css";
</style>