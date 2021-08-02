<template>
<view class="pages">
	<view class="page__bd">
		<view class="page-tab">

			<view class="page_top-box">
				<block v-for="(item, index) in tabs" :key="index">
					<view  :class="'page_navbar-item  top-box-distance ' + (activeIndex == index ? 'weui-bar__item_on' : '')" @tap="tapClick(item.click,{id: index})">
						<view class="page_navbar-title">{{item.name}}</view>
					</view>
				</block>
			</view>

			<view class="content " v-if="activeIndex==0">
				<view class="tap-panel">
					<view class="deviceInfo page-cont">
						<view class="weui-title">信息总览</view>
						<view class="deviceInfoDesc">
							<view v-for="(item, index) in deviceInfoArr" :key="index" class="deciveInfoItem">
								<view>{{item.title}}</view>
								<view :style="'color:' + ( item.noticeColor ? '#20A4F7':'#333')">{{item.cont}}</view>
							</view>
						</view>
					</view>
					
					<view class="list-box page-cont">
						<view class="page_top-box">
							<block v-for="(item, index) in deviceType" :key="index">
								<view :class="'tabbarItem  top-box-distance ' + (deviceIndex == index ? 'activeBar' : '')" @tap="tapClick(item.click,{id:index})">
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
				<!-- <text class="content-ending">{{remind}}</text> -->
			</view>


			<!-- 设备查询 -->
			<view class="content box-select" v-if="activeIndex==1">

				<view class="left">
					<scroll-view scroll-y style="height: 90%;">
						<!-- <view class='active'>1号楼</view> -->
						<block v-for="(item, index) in builds" :key="index">
							<view :id="index" :class="'left-item ' + (selectBuildIndex == index ? 'active' : '')" @tap="selectBuild">
								<view class="left-title">{{item.name}}</view>
							</view>
						</block>
					</scroll-view>
				</view>

				<view class="right">
					<view class="right-box">

						<view class="search-box">
							<image :src="indexImageUrl.search" class="search-pic"></image>
							<input class="search-input" placeholder="请输入房间号" @input="searchRoom"></input>
						</view>

						<!-- 楼层与房间模块 -->
						<view class="floor">
							<!-- <scroll-view scroll-y scroll-with-animation scroll-left="{{scrollLength}}" :scroll-into-view="toView" class='scrollY' style='height: {{winHeight}}px'> -->
							<scroll-view scroll-y style="height: 484px;"  >
								<!-- 如果没有进行搜索 -->
								<view v-if="roomList.length == 0 && inputVlue == ''">
									<!-- 循环楼层 -->
									<block v-for="(item, index) in rooms" :key="index">
										<view class="floor-box">
											<text class="floor-title">第 {{item.floorName}} </text>

											<!-- 循环房间 -->
											<view class="room-box">
												<block v-for="(is, index2) in item.rooms" :key="index2">
													<view class="room-item" @tap="clickRoomBox" :id="is.id" :data-roomCode="is.roomCode">
														<text>{{is.name}}</text>
													</view>
												</block>
											</view>

										</view>
									</block>

								</view>

								<!-- 若进行了搜素 -->
								<view v-if="roomList.length > 0">

									<!-- 循环楼层 -->
									<!-- <block wx:for="{{rooms}}" wx:key="this"> -->
									<view class="floor-box">
										<text class="floor-title">搜素结果</text>
										<!-- 循环房间 -->
										<view class="room-box">
											<block v-for="(is, index) in roomList" :key="index">
												<view class="room-item" @tap="clickRoomBox" :id="is.id" :data-roomCode="is.roomCode">
													<text>{{is.name}}</text>
												</view>
											</block>
										</view>
									</view>
									<!-- </block> -->

								</view>

								<view v-if="roomList.length == 0 && inputVlue">
									<view class="floor-box">
										<text class="floor-title">未搜素到房间</text>
									</view>
								</view>

							</scroll-view>

						</view>

					</view>
				</view>

			</view>

		</view>
	</view>
</view>
</template>

<script>
var app = getApp();
var wxCharts = require("../../../common/resources/utils/wxcharts.js");
var indexImageUrl = app.globalData.ImageUrl;
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
//定义记录初始屏幕宽度比例，便于初始化
// 需要设置slider的宽度，用于计算中间位置
//定义记录初始屏幕宽度比例，便于初始化
var windowW = 0;
var lineChart = null;
import Select from "../../../../components/indexModule/select/select";
import feeLists from "../../resources/components/errList/errList";

export default {
  data() {
    return {
      windowHeight: '',
      windowWidth: '',
      // 1. 定义请求次数（即下拉刷新）
      pullDownNumber: 0,
      listLength: 1,
      // 用于判断已经查询所有数据
      indexImageUrl: indexImageUrl,
      tabs: [{
        name: "宿舍概览",
        click: 'tabClick'
      }, {
        name: "房间管理",
        click: 'tabClick'
      }],
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
      activeIndex: 0,
      //点击顶部哪了一块
      // 设备总览数据
      deviceInfoArr: [],
      noticeColor: false,
      //信息总览提醒字体颜色 
      deviceIndex: 0,
      //  设备类型下标
      selectTime: ['近一周', '近一个月'],
      selectTimeInd: 0,
      sliderOffset: 0,
      sliderLeft: 0,
      news: [],
      deviceId: '',
      builds: [],
      rooms: [],
      allBuils: [],
      selectBuildIndex: 0,
      userInfoCach: {},
      roomList: [],
      inputVlue: '',
      floors: [],
      roomByFloor: [],
      buildNum: '',
      floorNum: '',
      roomNum: '' // remind: '上滑加载更多',
      ,
      imageWidth: ""
    };
  },

  components: {
    Select,
    feeLists
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.tabs.length - sliderWidth) / 2
        });
      }
    }); // 屏幕宽度

    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    }); //计算屏幕宽度比列

    windowW = this.imageWidth / 360;
    this.dormInfoTotalStatistics();
    this.deviceUseStatistics(3, 2);
    this.errorInform(2, 10, 0);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('------------------------设备管理------------------------');
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

    var _this = this;

    _this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight,
      windowWidth: wx.getSystemInfoSync().windowWidth,
      'userInfoCach': userInfoCach
    });
  },
  //下拉更新
  onPullDownRefresh: function () {
    var _this = this;

    let deviceType = this.deviceIndex;
    let type;

    if (deviceType == 0) {
      type = 2;
    } else {
      type = 4;
    }

    _this.setData({
      news: [],
      pullDownNumber: 0
    });

    this.errorInform(type, 10, 0);
  },

  /**
  * 生命周期函数--监听页面隐藏
  */
  onUnload: function () {
    app.globalData.StorageUtil.remove('deviceAdminEleDetailCach');
  },
  methods: {
		tapClick(tap,params){
			this[tap](params)
		},
    tabClick: function (e) {
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let ind = e.id;
      this.setData({
        activeIndex: ind
      });

      if (ind == 1) {
        this.getBuilds(userInfoCach);
      } else {
        this.deviceUseStatistics(3, 2);
      }
    },
    deviceClick: function (e) {
      let ind = e.id;
      let timeType = this.selectTimeInd == 0 ? 3 : 1;
      let deviceType = ind == 0 ? 2 : ind == 1 ? 8 : 4;
      this.setData({
        deviceIndex: ind
      });
      this.deviceUseStatistics(timeType, deviceType);

      if (ind == 2) {
        this.errorInform(4, 10, 0);
      } else if (ind == 1) {
        this.errorInform(8, 10, 0);
      } else {
        this.errorInform(2, 10, 0);
      }
    },
    bindPickerChange: function (e) {
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let ind = e.detail.value;
      let deviceType = this.deviceIndex == 0 ? 2 : ind == 1 ? 8 : 4;
      let timeType = ind == 0 ? 3 : 1;
      this.setData({
        selectTimeInd: ind
      });
      this.deviceUseStatistics(timeType, deviceType);
    },
    // 信息总览
    dormInfoTotalStatistics: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.dormInfoTotalStatistics,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('宿舍信息返回', res.data);

          if (res.data && res.data.code == 200) {
            let deviceInfoArr = _this.reducedevice(res.data.data);

            _this.setData({
              deviceInfoArr
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
    reducedevice: function (data) {
      var arr = [];
      var dat = [data.buildNumber, data.roomNumber, data.roomOfFullNumber, data.roomUnderNumber, data.roomFreeNumber, data.totalBedNumber, data.assignedBedNumber, data.freeBedNumber];
      var titleS = ["管理楼栋", "房间总数", "满员房间", "零星房间", "空闲房间", "总床位数", "已分床位数", "空闲床位数"];

      for (let i = 0; i < dat.length; i++) {
        var obj = {};
        obj.title = titleS[i];
        obj.cont = dat[i];

        if (String(titleS[i]).indexOf('空闲') != -1) {
          obj.noticeColor = true;
        } else {
          obj.noticeColor = false;
        }

        arr[i] = obj;
      }

      return arr;
      console.log(arr);
    },
    // 水电费统计
    deviceUseStatistics: function (timeType, deviceType) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      let times = [],
          datas = [];
      let names = deviceType == 2 ? '用水量' : deviceType == 8 ? '用水量' : '用电量';
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.deviceUseStatistics + '?timeType=' + timeType + '&areaType=1' + '&deviceType=' + deviceType,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('设备（水/电）使用量统计返回', res.data);

          if (res.data && res.data.code == 200) {
            let arr = res.data.data;

            for (let i = 0; i < arr.length; i++) {
              times[i] = arr[i].days;
              datas[i] = arr[i].useUsage;
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
          title: '',
          format: function (val) {
            return val;
          },
          min: 0,
          max: max
        },
        xAxis: {
          disableGrid: true
        },
        extra: {
          lineStyle: 'curve',
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

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let listLength = _this.news.length;
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.errorInform + '?deviceTypeId=' + deviceTypeId + '&take=' + take + '&skip=' + skip,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('异常统计信息返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.pullDownNumber++;
            res.data.data = _this.dealRecord(res.data.data);
            var data = {
              listLength: listLength,
              'news': res.data.data
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
    dealRecord: function (rows) {
      let array = [];
      console.log("row - ", rows);

      for (let i = 0; i < rows.length; i++) {
        let obj = {};
        obj.floorName = rows[i].buildName;
        obj.roomname = rows[i].roomName;
        obj.errTime = rows[i].alarmTime;
        obj.deviceType = rows[i].deviceTypeId;
        obj.errDesc = rows[i].alarmInfo;
        array[i] = obj;
      }

      return array;
    },
    // 获取楼栋信息
    getBuilds: function (user) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getBuildList,
        method: 'GET',
        header: {
          'token': user.token
        },
        success: function (res) {
          console.log('获取楼栋信息返回', res.data);

          if (res.data && res.data.code == 200) {
            for (let i = 0; i < res.data.rows.length; i++) {
              res.data.rows[i].name = res.data.rows[i].name.substring(0, 5);
            }

            _this.setData({
              'builds': res.data.rows
            });

            if (res.data.rows.length < 1) {
              app.globalData.ShowMsgUtil.showErrorModal('请求失败', '当前账号未分配楼栋管理权限');
              return;
            }

            app.globalData.StorageUtil.set('buildsByAdminId', res.data.rows); // 获取该楼栋的所有房间即楼层

            _this.getRoomsByBuildId(res.data.rows[0].id);
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
    selectBuild: function (e) {
      var _this = this;

      const builds = app.globalData.StorageUtil.get('buildsByAdminId');
      this.setData({
        'selectBuildIndex': e.currentTarget.id
      }); // 根据楼栋id获取楼层与房间

      var selectBuildIndex = this.builds[e.currentTarget.id].id;

      if (_this.builds.length == 0) {
        app.globalData.ShowMsgUtil.showErrorModal('查询失败', "未负责楼栋");
      } else {
        this.getRoomsByBuildId(selectBuildIndex);
      }
    },
    getRoomsByBuildId: function (selectBuildIndex) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      var floors = [];
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getRoomByBuildId + selectBuildIndex + '/rooms',
        method: 'GET',
        header: {
          'token': _this.userInfoCach.token
        },
        success: function (res) {
          // console.log('根据楼栋获取房间返回', res.data);
          if (res.data && res.data.code == 200) {
            for (let i = 0; i < res.data.rows.length; i++) {
              let floor = {};
              floor.id = res.data.rows[i].floorId;
              floor.name = res.data.rows[i].floorName.length > 4 ? res.data.rows[i].floorName.substring(0, 4) : res.data.rows[i].floorName; // 设置楼栋标志位

              floor.byFloor = 2;
              floors[i] = floor;
            } // 设置楼栋标志为1


            for (let i = 0; i < res.data.rows.length; i++) {
              let room = {};
              room = res.data.rows[i]; // for (let j = 0; j < res.data.rows[i].rooms.length; j++){
              //   res.data.rows[i].rooms[j].name = res.data.rows[i].rooms[j].name.length > 4 ? res.data.rows[i].rooms[j].name.substring(0, 4) : res.data.rows[i].rooms[j].name;
              // }

              room.byRoom = 3;
              res.data.rows[i] = room;
            }

            _this.setData({
              'floors': floors,
              'rooms': res.data.rows
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
    // 点击房间
    clickRoomBox: function (e) {
      var roomId = e.currentTarget.id;
      var roomCode = e.currentTarget.dataset.roomcode;
      console.log('选择的房间编号', roomCode); // 根据房间id获取设备

      this.getDeviceByRoomId(roomId, roomCode);
    },
    getDeviceByRoomId: function (roomId, roomCode) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getDeviceByRoomId + roomId + '/devices?roomId=' + roomId,
        method: 'GET',
        header: {
          'token': _this.userInfoCach.token
        },
        success: function (res) {
          console.log("根据房间获取设备返回", res.data);

          if (res.data && res.data.code == 200) {
            if (res.data.rows.length == 0) {
              app.globalData.ShowMsgUtil.showNoneToast('当前房间未安装物联设备!', 1000);
            }

            _this.handleDeviceByRoom(res.data.rows, roomId, roomCode);
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
    handleDeviceByRoom: function (rows, roomId, roomCode) {
      let menu = [];
      let isHavaOperateRecord = false;
      let isHavaRoomDetail = false;
      let roomDetailOfDevices = [];
      let t = 0;

      for (let i = 0; i < rows.length; ++i) {
        var device = rows[i];

        if (device.deviceType == 6 || device.deviceType == 1 || device.deviceType == 2 || device.deviceType == 4 || device.deviceType == 8) {
          isHavaOperateRecord = true;
        }

        if (device.deviceType == 2 || device.deviceType == 4 || device.deviceType == 8) {
          app.globalData.StorageUtil.set("roomDevices", rows);
          isHavaRoomDetail = true;
          roomDetailOfDevices[t++] = device.deviceType;
        }

        if (device.deviceType == 4) {
          app.globalData.StorageUtil.set('deviceAdminEleDetailCach', rows[i]);
        }
      }

      roomDetailOfDevices = app.globalData.PublicUtil.arrayUnique(roomDetailOfDevices); // console.log('roomDetailOfDevices - ', roomDetailOfDevices);

      if (isHavaOperateRecord) {
        menu[0] = '操作记录';
        menu[1] = '房间详情';
      } // if (isHavaRoomDetail) {
      //   menu[1] = '房间详情';
      // }


      if (menu.length == 0) {
        app.globalData.ShowMsgUtil.showNoneToast('当前房间未安装物联设备!', 1000);
      }

      this.handleShowActionSheet(roomId, menu, roomDetailOfDevices);
    },
    handleShowActionSheet: function (roomId, menu, roomDetailOfDevices) {
      wx.showActionSheet({
        itemList: menu,
        success: function (res) {
          if (!res.cancel) {
            if (menu.length == 1) {
              if (res.tapIndex == 0) {
                app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.deviceOperationRecordUrl + '?roomId=' + roomId, 500);
              }
            }

            if (menu.length == 2) {
              if (res.tapIndex == 0) {
                // 跳转到该设备操作记录页面  
                app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.deviceOperationRecordUrl + '?roomId=' + roomId, 500);
              }

              if (res.tapIndex == 1) {
                app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.totalMeterOfWaterUrl + "?roomId=" + roomId, 500);
              }
            }
          }
        }
      });
    },
    // 操作灯
    operationLamp: function () {
      app.globalData.ShowMsgUtil.showErrorModal('提示', '暂时无法操作灯！');
    },
    // 搜素房间号
    searchRoom: function (e) {
      var inputVlue = e.detail.value;
      var roomList = [];
      var t = 0;

      for (let i = 0; i < this.rooms.length; ++i) {
        for (let j = 0; j < this.rooms[i].rooms.length; ++j) {
          if (this.rooms[i].rooms[j].name.indexOf(inputVlue) >= 0) {
            roomList[t] = this.rooms[i].rooms[j];
            t++;
          }
        }
      }

      this.setData({
        'roomList': roomList,
        'inputVlue': inputVlue
      });

      if (inputVlue.length == 0) {
        this.setData({
          'roomList': [],
          'inputVlue': ''
        });
      }
    },
    getBuildDate: function (e) {
      var _this = this;

      _this.setData({
        'buildNum': e.detail.id
      }); // 根据选择的楼栋获取楼层及房间


      this.getRoomsByBuildId(_this.allBuils[e.detail.id].id);
    },
    getFloorDate: function (e) {
      var _this = this;

      var roomByFloor = []; // 根据选择的楼栋获取楼层及房间

      let floorNum = _this.buildNum == '' ? 0 : e.detail.id + 1;

      for (let i = 0; i < _this.rooms[floorNum].rooms.length; ++i) {
        let room = {};
        room.code = _this.rooms[floorNum].rooms[i].id, room.name = _this.rooms[floorNum].rooms[i].name;
        roomByFloor[i] = room;
      }

      _this.setData({
        'floorNum': e.detail.id,
        'roomByFloor': roomByFloor
      });
    },
    getRoomDate: function (e) {
      var _this = this;

      _this.setData({
        'roomNum': e.detail.id
      });
    },
    // 获取所有栋楼
    getAllBuilds: function (user) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getBuildList,
        method: 'GET',
        header: {
          'token': user.token
        },
        success: function (res) {
          if (res.data && res.data.code == 200) {
            // console.log('获取楼栋信息返回', res.data);
            // 设置楼栋标志为1
            for (let i = 0; i < res.data.rows.length; ++i) {
              var allBuild = {};
              allBuild = res.data.rows[i];
              allBuild.byBuild = 1;
              res.data.rows[i] = allBuild;
            }

            _this.setData({
              'allBuils': res.data.rows
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
    // 灯控自检
    selfCheck: function () {
      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

      if (this.buildNum == '' && this.buildNum != 0 || this.floorNum == '' && this.floorNum != 0 || this.roomNum == '' && this.roomNum != 0) {
        app.globalData.ShowMsgUtil.showErrorModal('操作失败!', '请先确定房间!');
        return;
      }

      app.globalData.ShowMsgUtil.showErrorModal('提示', '暂时无法操作灯！');
      return; // var buildId = this.data.allBuils[this.data.buildNum].id;
      // var floorId = this.data.rooms[this.data.floorNum].id;
      // var roomId = this.data.rooms[this.data.floorNum].rooms[this.data.roomNum].id;
      // var timestamp = Date.parse(new Date());
      // timestamp = timestamp / 1000;
      // app.ShowMsgUtil.showLoadAndMsgToast('自检中', 6000);
      // wx.request({
      //   url: app._server + '/rest/iot/device/sendDeviceCheck?buildId=' + buildId + '&buildId=' + floorId + '&roomID' + roomId + '&deviceTypeId=5&userId=' + userInfoCach.userId + '&time=' + timestamp,
      //   method: 'GET',
      //   header: {
      //     'token': userInfoCach.token,
      //   },
      //   success: function (res) {
      //     console.log('灯控自检返回', res.data);
      //     if (res.data && res.data.code == 200) {
      //       wx.hideToast({});
      //       app.ShowMsgUtil.showSuccessToast('自检成功', 2000);
      //     } else {
      //       app.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
      //       wx.hideToast({});
      //       return;
      //     }
      //   },
      //   fail: function () { 
      //     app.ShowMsgUtil.showErrorModal('请求失败', '后台连接失败！');
      //   }
      // });
    },

    /**
      * 上拉更新 
      */
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
@import "./deviceManage.css";
</style>