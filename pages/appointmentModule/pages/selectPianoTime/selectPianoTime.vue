<template>
<view class="pages">
  <view class="header">
    <view class="arrowBoxL" @tap="beforeArrow">
      <text :class="'arrowLf ' + (unableL ? 'cantTap' : '')"></text>
    </view>
    <text>{{currentDate}}</text>
    <view class="arrowBox" @tap="afterArrow">
      <text :class="'arrowRf ' + (unableR ? 'cantTap' : '')"></text>
    </view>
  </view>
  <view class="content">
    <view class="contTitle">时间预约</view>
    <scroll-view scroll-y :style="'height:' + sHeight + 'px'">
      <view v-for="(item, index) in timeList" :key="index" :class="'timeList ' + (item.status == -1?'noHasAppiont':'')" @tap.stop="selectTime" :data-time="item.time" :data-status="item.status">
        <view>{{item.time}}</view>
        <view>{{item.statusTxt}}</view>
      </view>

    </scroll-view>
   
	 <view >
		 <pick-time v-if="showPicker"
				:pickType="pickType" 
		 		:showPicker='showPicker'
		 		@pickSure="pickSure" :defaultDate="defaultDate" 
		 	   :currentDate="currentDate" :roomType="roomType"></pick-time>
	 </view>
  </view>
</view>
</template>

<script>
var app = getApp();
import pickTime from "../../../../components/common/pickTime/pickTime";
export default {
  data() {
    return {
      sHeight: 450,

      /***
       * timeList:
       * time: 时间段
       * status: 当前时间状态 1 可预约  -1不可预约
       */
      timeList: [],
      showPicker: false,
			showChild:false,
      //是否打开弹窗 需要单独传入日期
      pickType: 'startAndEnd',
      defaultDate: [],
      currentDate: '',
      //当前预定时间日期 日期和预约时间段分开传入组件
      weeksData: [],
      //可以选择的所有日期
      currentTimeInd: 0,
      //当前时间的下标
      roomName: '',
      roomId: '',
      unableL: false,
      unableR: false,
      getT: 0,
      //是否是二次选择,直接进入时间

      /***练功房需要字段 */
      roomType: 2 //琴房 2 练功房 3
      ,
      meetingStartTime: "",
      startM: "",
      endM: "",
      currentDay: ""
    };
  },

  components: {
    pickTime
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let currentDate = app.globalData.PublicUtil.formatTimeTwo(parseInt(options.currentDay), "Y-M-D");
    let roomName = options.roomName;
    let roomId = options.roomId;
    let sHeight = app.globalData.SystemInfo.screenHeight - 170;
    this.setData({
      currentDate,
      roomName,
      roomId,
      sHeight,
      roomType: options.roomType
    });
    if (options.getT) {
      this.setData({
        getT: options.getT
      });
    }
		if(options.roomType == 2){
			uni.setNavigationBarTitle({
				title:'公共资源_琴房预约_选择时间'
			})
		}else {
			uni.setNavigationBarTitle({
				title:'公共资源_练功房预约_选择时间'
			})
		}
		
    this.getAppointmentDetail(options.currentDay, roomId, options.roomType);
    this.selectBoxReduce();
  },
  methods: {
    selectTime(e) {
			console.log("选择时间----------------------")
      // console.log(e);
			
      let _this = this;

      let status = e.currentTarget.dataset.status;

      if (status == -1) {
        return;
      }
      let defaultDate = e.currentTarget.dataset.time.split(' - '); 
			// let  defaultDate = ['14:59','21:00']

      this.setData({
        defaultDate,
				showPicker: true
      });
			
			
    },
		
    // 最终选择的时间
    pickSure(e) {
      console.log(e);
      var defaultDate = e.detail.data;
			this.showPicker = false
      this.setData({
        defaultDate,
        // showPicker: false
      });

      if (e.detail.tapBtn === "close") {
        //点击关闭按钮时不跳转页面
        var defaultDate = e.detail.data;
        this.setData({
          defaultDate,
          showPicker: false
        });
        return;
      }

      var defaultDate = e.detail;
      this.setData({
        defaultDate,
        showPicker: false
      });
      console.log(this.currentDate);
      console.log(defaultDate);
      var meetingStartTime = this.currentDate + ' ' + defaultDate[0] + "-" + defaultDate[1];
      var startM = this.currentDate + ' ' + defaultDate[0];
      var endM = this.currentDate + ' ' + defaultDate[1];
      let roomName = this.roomName;
      let roomId = this.roomId;
      let currentDay = new Date(this.currentDate.replace(/-/g, '/') + " 00:00:00").getTime();

      if (app.globalData.SystemInfo.platform == 'ios') {
        var meetingStartTime = this.currentDate.replace(/-/g, '/') + ' ' + defaultDate[0] + "-" + defaultDate[1];
        var startM = this.currentDate.replace(/-/g, '/') + ' ' + defaultDate[0];
        var endM = this.currentDate.replace(/-/g, '/') + ' ' + defaultDate[1];
        currentDay = new Date(this.currentDate.replace(/-/g, '/') + " 00:00:00").getTime();
      }

      console.log(meetingStartTime);
      console.log(startM);
      console.log(endM);
      console.log(roomName);
      console.log(roomId);
      console.log(currentDay);
			
			
			
		
			// #ifdef  H5 || APP-PLUS
			
			uni.$emit('updateData',{
				meetingStartTime:meetingStartTime ,
				roomName:roomName ,
				roomId:roomId ,
				startM:startM ,
				endM: endM,
				currentDay:currentDay
			})
				
			
			
			// #endif
			
			console.log(this.getT)
			if (this.getT == 1) {
			 uni.navigateBack({
			    delta: 1
			  });
			} else {
			 uni.navigateBack({
			    delta: 2
			  });
			}
    },

    //获取类型和时间
    getAppointmentConfigure: function (roomType) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentConfigure + '?roomType=' + roomType,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取预约，所需的配置信息"', res.data);

          if (res.data && res.data.code == 200) {
            let data = res.data.data;

            _this.selectBoxReduce(data);
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

    selectBoxReduce() {
      let e = this.roomType == 2 ? app.globalData.StorageUtil.get('pianoConfigDate') : app.globalData.StorageUtil.get('danceConfigDate');
      console.log(e);
      let weeksData = e.weekDtos;
      let currentT = this.currentDate;
      let weeksT = weeksData;
      console.log(weeksT);

      if (currentT == app.globalData.PublicUtil.formatTimeTwo(weeksT[0].timestamp, "Y-M-D")) {
        this.setData({
          unableL: true
        });
      }

      this.setData({
        weeksData
      });
    },

    // 根据预约房间、预约时间段获取指定的预约情况"
    getAppointmentDetail: function (selectDate, roomId, type) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentDetail + '?areaType=' + type + '&selectDate=' + selectDate + '&selectAreaLayer=3&selectAreaId=' + roomId,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('根据预约房间、预约时间段获取指定的预约情况"', res.data);
          if (res.data && res.data.code == 200) {
            _this.raduceData(res.data.rows.responses);
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

    raduceData(data) {
		console.log(data);
      let arr = [];
      let timeList = data[0].detailOfDayDto;
      if (timeList.length > 0) {
        let len = timeList.length;
        for (let i = 0; i < len; i++) {
          let obj = {};
          obj.time = timeList[i].startTimeStr + ' - ' + timeList[i].endTimeStr;
          obj.status = timeList[i].appointmentStatus == 1 ? 1 : -1;
          obj.appointmentStatus = timeList[i].appointmentStatus;
          obj.statusTxt = timeList[i].appointmentStatus == 1 ? '可预约' : timeList[i].appointmentStatus == 2 ? '不可预约' : '已经预约';
          arr.push(obj);
        }
      }
      let roomName = data[0].buildStr + '>' + data[0].roomStr;
      this.setData({
        roomName,
        timeList: arr
      });
    },

    // 选择时间
    beforeArrow() {
      let currentT = this.currentDate;
      let weeksT = this.weeksData;
      this.setData({
        unableL: false,
        unableR: false
      });

      if (currentT == app.globalData.PublicUtil.formatTimeTwo(weeksT[0].timestamp, "Y-M-D")) {
        this.setData({
          unableL: true
        });
        return;
      }

      let currentTimeInd = this.currentTimeInd;
      --currentTimeInd;
      let time = weeksT[currentTimeInd].timestamp;
      let currentDate = app.globalData.PublicUtil.formatTimeTwo(time, "Y-M-D");
      this.setData({
        currentDate,
        currentTimeInd
      });
      this.getAppointmentDetail(time, this.roomId, this.roomType);
    },

    afterArrow() {
      let currentTimeInd = this.currentTimeInd;
      let currentT = this.currentDate;
      let weeksT = this.weeksData;
      this.setData({
        unableR: false,
        unableL: false
      });

      if (currentT == app.globalData.PublicUtil.formatTimeTwo(weeksT[weeksT.length - 1].timestamp, "Y-M-D")) {
        this.setData({
          unableR: true
        });
        return;
      }

      ++currentTimeInd;
      let time = weeksT[currentTimeInd].timestamp;
      let currentDate = app.globalData.PublicUtil.formatTimeTwo(time, "Y-M-D");
      this.setData({
        currentDate,
        currentTimeInd
      });
      this.getAppointmentDetail(time, this.roomId, this.roomType);
    }

  }
};
</script>
<style>
@import "./selectPianoTime.css";
</style>