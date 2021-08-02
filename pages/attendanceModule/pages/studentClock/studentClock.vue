<template>
<view class="page">

  <view class="user-info" @tap="doUserDetail">
    <header-pic :pic="pic" :userInfoCach="userInfoCach"></header-pic> 
  </view>

  <view class="page__bd center_box">
    <view class="center">

      <view class="center_start">
        <image class="center_image" :src="attendanceImageUrl.start"></image>
        <text class="center_image_right center_text">开始时间：{{pageObj.startTimeO}}</text>
      </view>

      <view class="center_detail">
        <view class="center_detail_box">
          <text id="center_detail_text" v-if="pageObj.checkTimeD != ''">打卡时间：{{pageObj.checkTimeD}}</text>
          <text id="center_detail_text" v-else>{{pageObj.statusMsg}}</text>
          <view class="center_detail_position ">
            <image class="center_detail_image" :src="attendanceImageUrl.position"></image>
            <text id="center_detail_right">{{pageObj.checkInLocation}}</text>
          </view>
        </view>
      </view>

      <view class="center_start">
        <image class="center_image" :src="attendanceImageUrl.end"></image>
        <text class="center_image_right center_text">结束时间：{{pageObj.endTimeO}}</text>
      </view>

      <!-- <text class='center_start'>后台返回信标：{{showUuid}}</text>
      <text class='center_start'>扫描到的信标：{{successShowUuid}}</text> -->

    </view>
  </view>

  <view class="page__bd bottom_box page_view center_text">
    
    <view class="bottom_box_top center_text" :style="'background-color:' + pageObj.clockColor" @tap="toClock">
      <text class="bottom_top_text">{{pageObj.buttonMsg}}</text>
      <text class="bottom_time">{{nowTime}}</text>
    </view>

    <view class="bottom_box_bottom center_text">
      <view v-if="(pageObj.isInTime && pageObj.isNotClock && pageObj.isInRange) || pageObj.isClocked">
        <image class="bottom_image" :src="attendanceImageUrl.right"></image>
      </view>
      <view v-else>
        <image class="bottom_image" :src="attendanceImageUrl.error"></image>
      </view>
      <text class="bottom_text center_text">{{pageObj.msg}}</text>
    </view>
    
  </view>    
  

</view>
</template>

<script>
//获取应用实例
var app = getApp();
var attendanceImageUrl = require("../../resources/utils/imageUrl.js");
import headerPic from "../../../../components/mineModule/mineHeader/mineHeader";

export default {
  data() {
    return {
      attendanceImageUrl: attendanceImageUrl,
      pic: '',
      userInfoCach: '',
      pageObj: {},
      nowTime: '',
      // 显示当前时间
      title: '不能打卡',
      // clockColor: '#4fc08d',
      // clockColor: '#86CDAD',
      clockColor: '#dddddd',
      is_rang: true,
      msg: '',
      showUuid: '',
      successShowUuid: '',
      searching: false
    };
  },

  components: {
    headerPic
  },
  props: {},
  onLoad: function (options) {
    console.log('------------------------考勤打卡------------------------');

    if (options.executePlanId != '') {
      this.getClockList(options.planId, options.executePlanId);
    } else {
      this.getClockList(options.planId);
    }
  },
  onShow: function () {
    var _this = this;

    if (!app.globalData.getNet) {
      this.setData({
        msg: '加载失败，请检查网络后重试！'
      });
    }

    if (this.mag != '') {
      this.setData({
        msg: ''
      });
    } // 检查是否开启蓝牙


    this.checkBooth(); // let nowTime = app.PublicUtil.formatTimeTwo(new Date().getTime(), 'h:m:s'); 
    // this.myTime = setInterval(function () {
    //   _this.setData({
    //     nowTime: nowTime,
    //   })
    // }, 1000)

    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    this.getPicData(userInfoCach);
    this.setData({
      userInfoCach: userInfoCach
    });
  },

  /**
     * 退出改页面是关闭定时
     */
  onUnload: function () {
    clearInterval(this.myTime);
  },
  methods: {
    /**
     * 获取打卡详情
     */
    getClockList: function (planId, executePlanId) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let limitDate = new Date().getTime();
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.signInStatusDetail,
        data: {
          userId: userInfoCach.userId,
          type: 1,
          limitDate: limitDate,
          planId: planId,
          executePlanId: executePlanId
        },
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          console.log('获取打卡详情返回', res.data);

          if (res.data && res.data.code == 200) {
            let data = res.data.rows[0];
            data = _this.deal(data);
            console.log('data', data);

            _this.setData({
              pageObj: data
            }); // TODO


            let showUuid = _this.dealStr(data.bluetooth);

            _this.setData({
              showUuid: showUuid
            });

            if (data.isInTime && data.isNotClock) {
              //未打卡、在指定的打卡时间内
              // 根据获取得蓝牙信标数组，定时器去连信标
              // 获取是否范围内/外？
              _this.pageObj.msg = '不在指定范围';
              _this.pageObj.isInRange = false;

              _this.setData({
                pageObj: _this.pageObj
              });

              if (data.attendanceMode == 0 && data.bluetooths != null) {
                console.log('去连信标---', data.bluetooths);
                var uuids = []; // 处理信标数组的uuid格式

                for (let i = 0; i < data.bluetooths.length; i++) {
                  let uuid = _this.dealStr(data.bluetooths[i]);

                  uuids.push(uuid);
                }

                _this.searchBooth(uuids); // }, 5 * 60000)

              } else if (data.attendanceMode == 1 && data.bluetooth != null) {
                var romd = data.random;
                var qianz1 = data.bluetooth.substring(0, data.bluetooth.length - 1);
                var qianz2 = data.bluetooth.substring(0, data.bluetooth.length - 2);
                console.log('去连信标---', data.bluetooths);
                var uuids = [];
                let uuidStr = ""; // 处理信标数组的uuid格式

                for (let i = romd; i > 0; i--) {
                  if (i < 10) {
                    uuidStr = qianz1 + i;
                  } else {
                    uuidStr = qianz2 + i;
                  }

                  let uuid = _this.dealStr(uuidStr);

                  uuids.push(uuid);
                }

                console.log('去连信标---', uuids);

                _this.searchBooth(uuids);
              } // TODO V1
              // else{
              //   if (data.bluetooth != null) {
              //     var romd = data.random;
              //     var qianz1 = data.bluetooth.substring(0, data.bluetooth.length - 1);
              //     var qianz2 = data.bluetooth.substring(0, data.bluetooth.length - 2);
              //     var uuids = new Array();
              //     // 处理信标数组的uuid格式
              //     for (let i = romd; i > 0; i--) {
              //       if (i < 10) {
              //         let uuid = qianz1 + i;
              //         uuids.push(uuid);
              //       } else {
              //         let uuid = qianz2 + i;
              //         uuids.push(uuid);
              //       }
              //     }
              //     console.log('去连信标---', uuids);
              //     _this.searchBooth(uuids);
              //     // }, 5 * 60000)
              //   }
              // }

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
    dealStr: function (str) {
      let strArray = [];

      if (str != null && str != '' && str.length == 32) {
        strArray[0] = str.substring(0, 8);
        strArray[1] = str.substring(8, 12);
        strArray[2] = str.substring(12, 16);
        strArray[3] = str.substring(16, 20);
        strArray[4] = str.substring(20, str.length);
        return strArray.join('-');
      }

      return null;
    },
    deal: function (data) {
      data.startTimeO = app.globalData.PublicUtil.formatTimeTwo(Number(data.startTime), 'h:m');
      data.endTimeO = app.globalData.PublicUtil.formatTimeTwo(Number(data.endTime), 'h:m'); // 根据状态编号获取状态名

      data = this.getStatusName(data); // 显示页面提示信息

      data = this.getShowMsg(data);
      return data;
    },
    getStatusName: function (data) {
      if (data.status == 20) {
        data.checkStatusName = '正常';
      } else if (data.status == 21) {
        data.checkStatusName = '未签到';
      } else if (data.status == 22) {
        data.checkStatusName = '迟到';
      } else if (data.status == 23) {
        data.checkStatusName = '请假';
      } else if (data.status == 24) {
        data.checkStatusName = '补签';
      } else if (data.status == 25) {
        data.checkStatusName = '无需签到';
      } else if (data.status == 26) {
        data.checkStatusName = '可能签到';
      }

      return data;
    },
    getShowMsg: function (data) {
      data.clockColor = '#dddddd'; // 颜色初始化为不能打卡

      data.isClocked = false; //是否已经打卡

      data.checkTimeD = '';

      if (data.status == 20 || data.status == 22 || data.status == 23 || data.status == 24) {
        wx.hideToast();
        data.statusMsg = '已打卡';
        data.buttonMsg = '已打卡';
        data.isNotClock = false; // 是否可以打卡

        data.clockColor = '#86CDAD'; // 颜色已打卡

        data.msg = '你已打卡成功！';
        data.isInTime = false;
        data.isClocked = true;
        data.checkTimeD = app.globalData.PublicUtil.formatTimeTwo(Number(data.checkTime), 'Y-M-D h:m');
        return data;
      } else if (data.status == 21 || data.status == 25 || data.status == null || data.status == 26) {
        data.statusMsg = '未打卡';
        data.buttonMsg = '不能打卡';
        data.isNotClock = true;
      } else {
        wx.hideToast();
        data.statusMsg = '未知';
        data.isNotClock = false;
        data.buttonMsg = '未知';
        data.msg = '未知情况';
        data.isInTime = false;
        return data;
      }

      let nowTime = new Date().getTime(); // 获取时间范围
      //1.获取当前日期

      let endTimeO = new Date(data.endTime); //2. 获取当前分钟

      let min = endTimeO.getMinutes(); //3. 设置当前时间+5分钟：把当前分钟数+5后的值重新设置为date对象的分钟数

      endTimeO.setMinutes(min + data.floatTime);
      endTimeO = app.globalData.PublicUtil.formatTimeTwo(Number(endTimeO), 'h:m'); // console.log('data.startTime', app.PublicUtil.formatTimeTwo(Number(nowTime), 'h:m') < endTimeO);
      // console.log('data.startTime', app.PublicUtil.formatTimeTwo(Number(nowTime), 'h:m') > app.PublicUtil.formatTimeTwo(Number(data.startTime), 'h:m'));

      if (app.globalData.PublicUtil.formatTimeTwo(Number(nowTime), 'h:m') <= endTimeO && app.globalData.PublicUtil.formatTimeTwo(Number(nowTime), 'h:m') >= app.globalData.PublicUtil.formatTimeTwo(Number(data.startTime), 'h:m')) {
        data.msg = '在指定的时间内';
        data.isInTime = true;
      } else {
        data.msg = '不在指定的时间内';
        data.isInTime = false;
      }

      return data;
    },

    /**
     * 搜素蓝牙信标
     */
    searchBooth: function (uuids) {
      var _this = this;

      console.log('------------------------------------------------------------------------------------------------------');
      console.log('蓝牙信标扫描uuid', uuids); // 开始扫描

      wx.startBeaconDiscovery({
        uuids: uuids,
        success: function () {
          wx.hideToast();
          console.log('扫描到');
          app.globalData.ShowMsgUtil.showLoadAndMsgToast('扫描设备中！', 10 * 60000);
          console.log("开始扫描设备..."); // 监听iBeacon信号

          wx.onBeaconUpdate(function (res) {
            console.log(res.beacons); // 请注意，官方文档此处又有BUG，是res.beacons，不是beacons。

            if (res && res.beacons && res.beacons.length > 0) {
              // 此处最好检测rssi是否等于0，等于0的话信号强度等信息不准确。我是5秒内重复扫描排重。
              wx.hideToast();
              _this.pageObj.msg = '在指定范围';
              _this.pageObj.isInRange = true;
              _this.pageObj.buttonMsg = '立即打卡';
              _this.pageObj.clockColor = '#4fc08d'; // 颜色已打卡

              _this.setData({
                successShowUuid: res.beacons[0].uuid
              });

              let bluetoothId = _this.dealStrReturn(res.beacons[0].uuid);

              console.log('res.beacons', res.beacons);
              console.log('bluetoothId', bluetoothId.toLowerCase());
              console.log('------------------------------------------------------------------------------------------------------');
              _this.pageObj.bluetoothId = bluetoothId.toLowerCase();

              _this.setData({
                pageObj: _this.pageObj // title: '能打卡',

              }); // 考勤打卡
              // _this.requestClock(); 


              return;
            }
          });
        },
        fail: function () {
          console.log('未扫描到');
        }
      }); // 超时停止扫描
      // _this.myTime = setInterval(function () {
      //   wx.stopBeaconDiscovery({
      //     success: function () {
      //       wx.hideToast();
      //       app.ShowMsgUtil.showErrorModal('扫描失败', '扫描蓝牙超时！');
      //     }
      //   });
      // }, 10 * 60000)

      setTimeout(function () {
        wx.stopBeaconDiscovery({
          success: function () {
            wx.hideToast();
            app.globalData.ShowMsgUtil.showErrorModal('扫描失败', '扫描蓝牙超时！');
          }
        });
      }, 10 * 60000);
    },

    /**
     * 考勤打卡请求
     */
    toClock: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let terminalIdentification = new Date().getTime();
      var obj = _this.pageObj; // let bluetoothId = this.dealStrReturn(obj.bluetoothId);

      if (obj.isInTime && obj.isNotClock && obj.isInRange) {
        wx.request({
          url: app.globalData.RequestUrl.attendanceRequestUrl.signIn,
          data: {
            personId: userInfoCach.personId,
            //人员id
            personType: userInfoCach.personType,
            //人员类型
            planId: obj.planId,
            //计划id
            executePlanId: obj.executePlanId,
            //执行计划Id
            terminalIdentification: terminalIdentification,
            //终端标识
            type: 1,
            //归寝考勤类型
            terminalType: 38,
            //终端类型 30：APP 31：人脸 32：指纹 33：老师补卡, 系统帮助签到
            roomId: obj.roomId,
            //房间id
            bluetoothId: obj.bluetoothId //蓝牙信标id

          },
          method: 'POST',
          header: {
            'token': userInfoCach.token,
            'content-type': 'application/json' //默认值

          },
          success: function (res) {
            console.log('考勤打卡请求返回', res.data);

            if (res.data && res.data.code == 200) {
              console.log('考勤打卡成功');
              app.globalData.ShowMsgUtil.showSuccessToast("打卡成功", 2000); // 跳转到首页页面

              app.globalData.PublicUtil.switchTabByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl, 2000); //app.PublicUtil.redirectByUrl(app.PageUrl.attendancePageUrl.studentStatisticsUrl + '?planId=' + obj.planId, 2000);
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
    },

    /**
     * 获取图片
     */
    getPicData: function (userInfoCach) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getImage,
        header: {
          'token': userInfoCach.token
        },
        method: 'GET',
        success: function (res) {
          console.log('获取头像', res.data);

          if (res.data && res.data.code === 200) {
            _this.setData({
              pic: res.data.rows.url
            });
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
    dealStrReturn: function (str) {
      let strArray = [];

      if (str != null && str != '' && str.length == 36) {
        strArray[0] = str.substring(0, 8);
        strArray[1] = str.substring(9, 13);
        strArray[2] = str.substring(14, 18);
        strArray[3] = str.substring(19, 23);
        strArray[4] = str.substring(24, str.length);
        return strArray[0] + strArray[1] + strArray[2] + strArray[3] + strArray[4];
      }

      return null;
    },

    /**
     * 检查手机是否打开蓝牙
     */

    /**
     * 搜素蓝牙设备
     */
    checkBooth: function () {
      var that = this;

      if (!that.searching) {
        // 关闭蓝牙模块（不该放在这）
        wx.closeBluetoothAdapter({
          complete: function (res) {
            // 打开蓝牙适配器
            wx.openBluetoothAdapter({
              success: function (res) {
                // 获取本机蓝牙适配器的状态：判断蓝牙是否
                wx.getBluetoothAdapterState({
                  success: function (res) {
                    console.log('已打开蓝牙');
                  }
                });
              },
              // 在打开蓝牙适配器中：提示手机蓝牙未打开
              fail: function (res) {
                wx.hideToast({});
                wx.showModal({
                  title: '提示',
                  content: '请检查手机蓝牙是否打开',
                  showCancel: false,
                  confirmColor: '#20a4f7',
                  success: function (res) {
                    console.log('没有打开蓝牙');
                  }
                });
              }
            });
          }
        });
      } else {
        wx.stopBluetoothDevicesDiscovery({
          success: function (res) {
            console.log(res);
            that.setData({
              searching: false
            });
          }
        });
      }
    }
  }
};
</script>
<style>
@import "./studentClock.css";
</style>