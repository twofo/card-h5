<template>
<view class="page">
  <view class="selectBox">
		<view class="selectTypeHead">
			<selects :selectBox="selectBox" @bindValue="bindValue"></selects>
		</view>
		<view class="timeWeek">
			<scroll-view scroll-x="true" :scroll-left="moveWidth" scroll-with-animation="true">
				<view class="sroll">
					<view v-for="(item, index) in weeks" :key="index" :class="'weeks ' + (currentDay == index? 'activeWeeks':'')" 
						@tap="selectDays({id:index, day:item.dateStr, stamp:item.timestamp})">
						{{item.dayWeek}}({{item.dateStr}})
						<text v-if="isfull" class="fullBox">满</text>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="roomSelect">
			<area-time :timeList="timeList" :aheadTime="aheadTime" :roomList="roomList" @getTime="getTime" @tapSelectRef="tapSelectRef"></area-time>
		</view>
	</view>

</view>
</template>

<script>
var app = getApp();
import selects from "../../../../components/common/wxPicker/wxPicker";
import areaTime from "../../../../components/attendanceModule/areaAndTime/areaAndTime";

export default {
  data() {
    return {
      roomType: -1,
      //房间类型：1会议室 2实训室
      selectBox: [],
      //
      roomLevel: "",
      //当前选择的类型
      builds: "",
      //当前选择的楼栋
      weeks: [],
      //今天往后一个星期
      currentDay: 0,
      wk: '',
      //当前时间 年-月-日
      isfull: false,
      //true 当前日期已经没有可选房间和时间段,,暂不显示
      moveWidth: 0,
      //时间轴数据
      timeList: [],

      /**isSelected: 可预选数组， 必须有id id为下标
       * isFull: 是否可以预选
       * isCheck： 当前时间段的状态， 2：可预选  1：不可预选， 3当前选择
       * time: 当前状态所在的时间段 这里是一段时间 06：00-06：30
       * */
      roomList: [],
      allRoomList: [],
      aheadTime: 20,
      currentStamp: "",
      pageObj: ""
    };
  },

  components: {
    selects,
    areaTime
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    if (options && options != "") {
      this.setData({
        roomType: options.roomType
      });
      this.getAppointmentConfigure(options.roomType);
      let now = new Date().getTime();
    }
  },
  methods: {
    //获取类型和时间
    getAppointmentConfigure: function (roomType) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentConfigure + '?areaType=' + roomType,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取预约，所需的配置信息"', res.data);

          if (res.data && res.data.code == 200) {
            let data = res.data.rows;

            _this.selectBoxReduce(data);

            _this.getWeeks(data.weekDtos);

            if (data.configureDtos.msgAdvanceTime && data.configureDtos.msgAdvanceTime != null) {
              _this.setData({
                aheadTime: data.configureDtos.msgAdvanceTime
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

    // {
    // 	roomType:"楼栋选择",
    // 	array:['一号楼','二号楼','三号楼'],
    // }
    selectBoxReduce(data) {
      let arr = [];

      if (data.areaTypeDtos) {
        let obj = {};

        if (data.areaTypeDtos[0].name.indexOf("会议") != -1) {
          obj.roomType = "会议室类型";
        } else if (data.areaTypeDtos[0].name.indexOf("琴房") != -1) {
          obj.roomType = "琴房类型";
        }

        let array = [];

        for (let i = 0; i < data.areaTypeDtos.length; i++) {
          let ar = {};
          ar.name = data.areaTypeDtos[i].name;
          ar.id = data.areaTypeDtos[i].type;
          array.push(ar);
        }

        obj.array = array;
        arr.push(obj);
      }

      if (data.buildInfoDtos) {
        let obj = {};
        obj.roomType = "楼栋选择";
        let array = [];

        for (let i = 0; i < data.buildInfoDtos.length; i++) {
          let ar = {};
          ar.name = data.buildInfoDtos[i].buildName;
          ar.id = data.buildInfoDtos[i].buildId;
          array.push(ar);
        }

        obj.array = array;
        arr.push(obj);
      }

      this.setData({
        selectBox: arr
      });
    },

    // 点击类型
    bindValue(e) {
			console.log(e)
      let type = e.detail.type;

      if (type == 0) {
        this.roomLevel = e.detail.val;
      } else {
        this.builds = e.detail.val;
      }

      console.log(this.roomLevel);
      console.log(this.builds);
      let url = "";

      if (this.roomLevel && this.builds) {
        url = '?areaType=' + this.roomType + '&selectDate=' + this.currentStamp + '&selectAreaId=' + this.builds.id + '&selectType=' + this.roomLevel.id;
      } else if (this.roomLevel) {
        url = '?areaType=' + this.roomType + '&selectDate=' + this.currentStamp + '&selectType=' + this.roomLevel.id;
      } else if (this.builds) {
        url = '?areaType=' + this.roomType + '&selectDate=' + this.currentStamp + '&selectAreaId=' + this.builds.id;
      } else if (!this.roomLevel && !this.builds) {
        url = '?areaType=' + this.roomType + '&selectDate=' + this.currentStamp;
      }

      this.getDetail(url);
    },

    // 获取今天往后的一个星期
    getWeeks(days) {
      let weeks = days;
      let url = '?areaType=' + this.roomType + '&selectDate=' + weeks[0].timestamp;
      this.getDetail(url);
      let wk = app.globalData.PublicUtil.formatTimeTwo(weeks[0].timestamp, 'Y-M-D');
      console.log(wk);
      this.setData({
        weeks,
        currentStamp: weeks[0].timestamp,
        wk
      });
    },

    //选择日期
    selectDays(e) {
      let currentDay = e.id;
      let day = e.day;
      let currentStamp = e.stamp;
      let moveWidth;

      if (currentDay < 2) {
        moveWidth = currentDay * 20;
      } else if (currentDay < 4) {
        moveWidth = currentDay * 110;
      } else {
        moveWidth = currentDay * 130;
      }

      let url = "";

      if (this.roomLevel && this.builds) {
        url = '?areaType=' + this.roomType + '&selectDate=' + currentStamp + '&selectAreaId=' + this.builds.id + '&selectType=' + this.roomLevel.id;
      } else if (this.roomLevel) {
        url = '?areaType=' + this.roomType + '&selectDate=' + currentStamp + '&selectType=' + this.roomLevel.id;
      } else if (this.builds) {
        url = '?areaType=' + this.roomType + '&selectDate=' + currentStamp + '&selectAreaId=' + this.builds.id;
      } else if (!this.roomLevel && !this.builds) {
        url = '?areaType=' + this.roomType + '&selectDate=' + currentStamp;
      }

      this.getDetail(url);
      let wk = app.globalData.PublicUtil.formatTimeTwo(currentStamp, 'Y-M-D');
      console.log(wk);
      this.setData({
        currentDay,
        moveWidth,
        currentStamp,
        wk
      });
    },

    /**
     * 根据预约房间、预约时间段获取指定的预约情况"
     */
    getDetail: function (urls) {
		console.log(urls);
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentDetail + urls,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('根据预约房间、预约时间段获取指定的预约情况"', res.data.rows.response);

          if (res.data && res.data.code == 200) {
            _this.roomAndTime(res.data.rows.responses);

            _this.setData({
              allRoomList: res.data.rows.responses
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

    roomAndTime(data) {
      // console.log(data)
      // 左侧时间段获取
      if (data.length > 0) {
        let timeList = [];

        for (let i of data[0].detailOfDayDto) {
          let obj = {};
          obj.time = i.startTimeStr;
          obj.timeStamp = i.startTime;
          timeList.push(obj);
        }

        let lastObj = {
          time: data[0].detailOfDayDto[data[0].detailOfDayDto.length - 1].endTimeStr,
          timeStamp: data[0].detailOfDayDto[data[0].detailOfDayDto.length - 1].endTime
        };
        timeList.push(lastObj);
        let currentDate = new Date().getTime() + 1000 * 60 * this.aheadTime; //当前时间的后二十分钟之后 才可以开始预约
        // 房间列表详情

        let roomList = [];

        for (let j of data) {
          let obj = {};
          obj.roomName = j.buildStr;
          obj.id = j.roomId;
          obj.number = j.roomStr;
          obj.size = j.areaType == '大型会议室' ? '大' : j.areaType == '中型会议室' ? '中' : '小';
          obj.isSelected = [];
          j.detailOfDayDto.forEach((key, a) => {
            let list = {};
            list.id = a;
            list.time = key.startTimeStr + '-' + key.endTimeStr;
            list.startTime = key.startTime;
            list.endTime = key.endTime; // if(currentDate <  key.startTime){

            switch (parseInt(key.appointmentStatus)) {
              case 1:
                list.isCheck = 2;
                list.isFull = "可预选";
                break;

              case 2:
                list.isCheck = 1;
                list.isFull = "不可预选";
                break;

              case 3:
                list.isCheck = 1;
                list.isFull = "已预选";
                break;

              default:
                list.isCheck = 1;
                list.isFull = "未知";
                break;
            } // }else{
            // list.isCheck = 1,
            // list.isFull = "不可预选" 
            // }


            obj.isSelected.push(list);
          });
          roomList.push(obj);
        }

        this.setData({
          timeList,
          roomList
        });
        console.log(roomList);
      } else {
        this.setData({
          timeList: [],
          roomList: []
        });
      }
    },

    // 最后确定时间和房间
    getTime(e) {
      let obj = e.detail;
      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

      let prevPage = pages[pages.length - 2];

     
			var pageObj = {
				meetingRoomId: obj.meetingRoomId,
				meetingRoomNumber: obj.meetingRoomNumber,
				startTime: obj.startTime,
				endTime: obj.endTime,
				startMeetingTime: this.wk + ' ' + obj.time,
				endMeetingTime: this.wk + ' ' + obj.time.split('-')[1],
				checkT: this.wk + ' ' + obj.time.split('-')[0]
			};
     
			
			uni.$emit('updMeetPageObj',{
				pageObj:pageObj ,
			})
     
      uni.navigateBack({
        delta: 1
      });
    }

  }
};
</script>
<style>
@import "./appointmentTime.css";
</style>