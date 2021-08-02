<template>
<view class="container">


	<!--result-page-->
	<view class="result-page">
		<!--result-userInfo-->
		<view class="result-userInfo result-model">
			<view class="userInfo-basic" style="overflow: hidden">
				<view class="basic-name" style="width: 100%;height: 23px;font-size: 32rpx;color: #333333; font-family: -webkit-body;font-weight: 6000;font-weight: 550;font-family: inherit;">
					<text class="myui-left__title"></text>
					<text v-if="userInfoCach.roomInfo!=null">房间: {{userInfoCach.roomInfo.buildName}}  - {{userInfoCach.roomInfo.floorName}} - {{userInfoCach.roomInfo.roomName}}
					</text>
					<text v-else>（暂未分配寝室）</text>
				</view>
			</view>
			<view class="basic-name" style="width:82%;margin-top: 20rpx;">
				<text class="myui-left__title"></text>
				<text> 截至时间：{{renderData.today}}</text>
			</view>
		</view>
		<!--result-chargeInfo-->
		<view class="result-chargeInfo">
		  	<!-- <view class="chargeInfo-num chargeInfo-model result-model" v-if="renderData.usageColdWaterMouth>0">
				<text class="chargeInfo-model-title">本月冷水用量</text>
				<view class="chargeInfo-model-info">
					<text class="model-info">{{renderData.usageColdWaterMouth}}</text>立方
				</view>
			</view>
			<view class="chargeInfo-num chargeInfo-model result-model" v-if="renderData.usageHotWaterMouth>0">
				<text class="chargeInfo-model-title">本月热水用量</text>
				<view class="chargeInfo-model-info">
					<text class="model-info">{{renderData.usageHotWaterMouth}}</text>立方
				</view>
			</view> -->
			<view class="chargeInfo-cost chargeInfo-model result-model" v-if="renderData.usageEleMouth>0" >
				<text class="chargeInfo-model-title">本月用电量</text>
				<view class="chargeInfo-model-info">
					<text class="model-info">{{renderData.usageEleMouth}}</text>度
				</view>
			</view>
			<view class="chargeInfo-cost chargeInfo-model result-model" v-if="renderData.usageEleMouth>0" >
				<text class="chargeInfo-model-title">本月用电金额</text>
				<view class="chargeInfo-model-info">
					<text class="model-info">{{renderData.usageSumMouth}}</text>元
				</view>
			</view>
		</view>

		<view class="list-box page-cont">
			<view class="page_top-box">
				<block v-for="(item, index) in deviceType" :key="index">
					<view :id="index" v-if="index==0&&renderData.usageTotalColdWater>0" :class="'tabbarItem top-box-distance ' + (deviceIndex == index ? 'activeBar' : '')" @tap="item.click">
						<view class="page_navbar-title ">{{item.name}}</view>
					</view>
					<view :id="index" v-if="index==1&&renderData.usageTotalHotWater>0" :class="'tabbarItem top-box-distance ' + (deviceIndex == index ? 'activeBar' : '')" @tap="item.click">
						<view class="page_navbar-title ">{{item.name}}</view>
					</view>
					<view :id="index" v-if="index==2&&renderData.usageTotalEle>0" :class="'tabbarItem top-box-distance ' + (deviceIndex == index ? 'activeBar' : '')" @tap="item.click">
						<view class="page_navbar-title ">{{item.name}}</view>
					</view>
				</block>
			</view>
			<view class="deviceEcharts">
				<view class="select">
					<picker @change="bindPickerChange" :value="selectTimeInd" :range="selectTime">
						<view class="picker">
							{{selectTime[selectTimeInd]}} <i class="btmArrow"></i>
						</view>
					</picker>
				</view>
				<canvas canvas-id="lineCanvas" disable-scroll="true" class="canvas" @touchstart="touchHandler" @touchmove="moveHandler" @touchend="touchEndHandler"></canvas>

			</view>
		</view>
		<!--result-specificInfo-->
		<view class="result-specificInfo result-model">
				<view class="specificInfo-item" v-if="renderData.usageTotalEle>0">
					<text class="specificInfo-item-label">合计用电</text>
					<text class="specificInfo-item-value">{{renderData.usageTotalEle}}</text>
					<text>度</text>
				</view>
				<view class="specificInfo-item" v-if="renderData.usageTotalColdWater>0">
					<text class="specificInfo-item-label">合计用冷水</text>
					<text class="specificInfo-item-value">{{renderData.usageTotalColdWater}}</text>
					<text>立方</text>
				</view>
					<view class="specificInfo-item" v-if="renderData.usageTotalHotWater>0">
					<text class="specificInfo-item-label">合计用热水</text>
					<text class="specificInfo-item-value">{{renderData.usageTotalHotWater}}</text>
					<text>立方</text>
			  </view>
		</view>

		<!-- 设备操作记录显示 -->
		<view class="list-box">
			<view class="title-box">异常记录</view>
			<!-- 设备异常记录 -->
			<fee-lists v-if="news.length > 0" :alarmNewsList="news" :height="windowHeight*0.43-10" @pull="bindPullUp" :listLength="listLength"></fee-lists>

			<view v-if="news.length==0">
				<text class="content-ending">列表内容为空</text>
			</view>
		</view>

	</view>
</view> 
</template>
<script>
//获取应用实例
var app = getApp();
var wxCharts = require("../../../common/resources/utils/wxcharts.js");
var windowW = 0;
var lineChart = null;
import feeLists from "../../resources/components/errList/errList";

export default {
  data() {
    return {
      remind: '加载中',
      renderData: {},
      renderDataOfEle: {},
      userInfoCach: {},
      deviceType: [{
        name: "冷水量统计",
        click: 'deviceClick'
      }, {
        name: "热水量统计",
        click: 'deviceClick'
      }, {
        name: "电量统计",
        click: 'deviceClick'
      }],
	  
      deviceIndex: 0,
      //  设备类型下标
      selectTime: ['近一周', '近一个月'],
      selectTimeInd: 0,
      news: [],
      windowHeight: '',
      listLength: 1,
      // 用于判断已经查询所有数据
      consumeValue: {},
      imageWidth: "",
      windowWidth: ""
    };
  },

  components: {
    feeLists
  },
  props: {},
  onLoad: function () {
	  console.log('142');
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    if (userInfoCach.roomInfo != null) {
      let roomName = userInfoCach.roomInfo.roomName;
      let buildName = userInfoCach.roomInfo.buildName;
	  	let floorName=userInfoCach.roomInfo.floorName;
      // roomName = roomName.length > 4 ? roomName.substring(0, 4) : roomName;
      // buildName = buildName.length > 5 ? buildName.substring(0, 5) : buildName;
      userInfoCach.roomInfo.roomName = roomName;
      userInfoCach.roomInfo.buildName = buildName;
	    userInfoCach.roomInfo.floorName = floorName;
    } // 屏幕宽度


    this.setData({
      userInfoCach: userInfoCach,
      imageWidth: wx.getSystemInfoSync().windowWidth,
      windowHeight: wx.getSystemInfoSync().windowHeight,
      windowWidth: wx.getSystemInfoSync().windowWidth
    }); //计算屏幕宽度比列

    windowW = this.imageWidth / 360;
    this.getUsageByRoom(3);
    this.deviceUseStatistics(3, 4);
    this.errorInform(2, 10, 0);
  },
  methods: {
    bindPickerChange: function (e) {
		  console.log(e);
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let ind = e.detail.value;
	  console.log(this.deviceIndex);
	  let deviceType=4;
      // let deviceType = this.deviceIndex == 0 ? 2 : this.deviceIndex == 1 ? 8 : 4;
      console.log('deviceType - ', deviceType);
	  console.log(ind);
      let timeType = ind == 0 ? 3 : 1;
	  console.log(timeType);
      this.setData({
        selectTimeInd: ind
      });
      this.deviceUseStatistics(timeType, deviceType);
	     this.getUsageByRoom(timeType);
    },
    // 水电费统计
    deviceUseStatistics: function (timeType, deviceType) {
      var _this = this;
	app.globalData.ShowMsgUtil.netErrNotice();
      let times = [],
          datas = [];
		  console.log(deviceType);
      let names = deviceType == 2 ? '用水量' : deviceType == 8 ? '用水量' : '用电量';
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      console.log('timeType - ', timeType);
      console.log('deviceType - ', deviceType);
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.deviceUseStatistics + '?timeType=' + timeType + '&areaType=2' + '&deviceType=' + deviceType,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取用量统计返回 - ', res.data);

          if (res.data && res.data.code == 200) {
            let arr = res.data.data;

            for (let i = 0; i < arr.length; i++) {
              times[i] = arr[i].days; // datas[i] = arr[i].useUsage 

              if (deviceType == 2) {
                // let useUsage = parseFloat(arr[i].useUsage);
                datas[i] = arr[i].useUsage;
              } else {
                // let useUsage = parseFloat(arr[i].useUsage);
                datas[i] = arr[i].useUsage;
              }
            }

            var max = Math.max(...datas);

            if (Math.max(...datas) == 0) {
              max = 0.1;
            }
            _this.lineCharts(times, datas, names, max);
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
    lineCharts: function (time, data, name, max) {
		// name='用电量'
      lineChart = new wxCharts({
        canvasId: 'lineCanvas',
        type: 'column',
        categories: time,
        animation: false,
        series: [{
          name: name,
          data: data,
          format: function (val) {
            return val;
          }
        }],
        yAxis: {
          // title: '',
          format: function (val) {
            return val.toFixed(2);
          },
          min: 0,
          max: max
        },
        xAxis: {
          disableGrid: true
        },
        extra: {
          // lineStyle: 'curve',
          column: {
            width: 20
          }
        },
        width: 330 * windowW,
        height: 230 * windowW,
        dataLabel: true,
        dataPointShape: true,
        enableScroll: true
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
    errorInform: function (deviceTypeId, take, skip) {
      var _this = this;
		app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let listLength = _this.news.length;
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.errorInform + '?deviceTypeId=' + deviceTypeId + '&take=' + take + '&skip=' + skip,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          if (res.data && res.data.code == 200) {
            _this.pullDownNumber++;
            res.data.rows = _this.dealRecord(res.data.data);
            var data = {
              listLength: listLength,
              'news': res.data.rows
            };
            _this.setData(data);
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
    dealRecord: function (list) {
      let array = [];

      for (let i = 0; i < list.length; i++) {
        let obj = {};
        obj.floorName = list[i].buildName;
        obj.roomname = list[i].roomName;
        obj.errTime = list[i].alarmTime;
        obj.deviceType = list[i].deviceTypeId;
        obj.errDesc = list[i].alarmInfo;
        array[i] = obj;
      }

      return array;
    },
    getUsageByRoom: function (timeType) {
      var _this = this;
	 app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      console;

      if (userInfoCach.roomInfo == null) {
        let data = {};
		data.usageSumMouth=0.00;
        data.usageTotalEle = 0;
        data.usageEleMouth = 0;
		  data.usageEleMouth = 0;
        data.usageTotalColdWater = 0;
        data.usageColdWaterMouth = 0;
        data.usageTotalHotWater = 0;
        data.usageHotWaterMouth = 0;
        data.today = app.globalData.PublicUtil.formatTimeTwo(new Date(), 'Y-M-D h:m');

        _this.setData({
          renderData: data
        });
        return;
      }
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getUsageByRoom,
        data: {
          roomId: userInfoCach.roomInfo.roomId,
		  timeType:timeType
        },
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取水电信息返回', res.data);

          if (res.data && res.data.code === 200) {
            data;
            var data = res.data.data;

            if (data) {
              // 数据精度处理
              data.today = data.today.substring(0, 16);
			  console.log(data);

              _this.setData({
                renderData: data
              });
            } else {
              _this.setData({
                remind: '暂无数据'
              });
            }
          } else {
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
    // 水电费切换
    deviceClick: function (e) {
      let ind = e.currentTarget.id;
      let timeType = this.selectTimeInd == 0 ? 3 : 1;
      let deviceType = ind == 0 ? 2 : ind == 1 ? 8 : 4;
      this.setData({
        deviceIndex: ind
      });
      this.deviceUseStatistics(timeType, deviceType);

      if (ind == 1) {
        this.errorInform(4, 10, 0);
      } else {
        this.errorInform(2, 10, 0);
      }
    },
    bindPullUp: function () {
      let deviceType = this.deviceIndex;
      let type;

      if (deviceType == 0) {
        type = 2;
      } else {
        type = 4;
      }

      this.errorInform(type, (this.pullDownNumber + 1) * 10, 0);
    }
  }
};
</script>
<style>
@import "./waterInformation.css";
</style>