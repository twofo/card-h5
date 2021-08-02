<template>
<view class="picktime">
  <view :class="'mask ' + (showPicker ? 'maskShow':'')" @tap="hidePicker">  </view>

  <view :class="'pick-cont ' + (showPicker ? 'showPickCont' : '' )" @tap.stop="showPickers">
    <!-- 头部 -->
    <view class="pick-head">
      <icon type="clear" class="closeIcon" size="20" color="#ccc" @tap.stop="hidePicker"></icon>
      <view class="pick-head-title">{{pickHead}}</view>
      <view class="sureBtn" @tap.stop="tapSure">确定</view>
    </view>
    <!-- 选择菜单 -->
    <scroll-view class="pick-nav-bar" scroll-x scroll-with-animation>
      <view class="pick-box">
        <view v-for="(item, index) in pickNavBar" :key="index" 
						:class="'nav-item ' + ('tab'+ index) + ' ' + (currentInd === index && hasTapPicker ? 'currentNav' : '')"  
						@tap.stop="selectNavItem(index)">
          <text class="nav-item-txt">{{item.text}}</text>
        </view>
      </view>
    </scroll-view>

    <!-- 选择内容 -->
    <view class="pick-select-cont">
      <view>
        <picker-view :value="pickVal" class="panel-picker" indicator-style="height: 70rpx;" style="width: 100%; height: 500rpx;" 
										 @change="pickerChange" @pickstart="pickerStart" @pickend="pickerEnd">
          <!-- <block v-for="(items, index) in pickDate" :key="index"> -->
						
          <picker-view-column >
              <view v-for="(item, index2) in pickDate[0]" :key="index2" class="picker-item">{{item}}</view>
          </picker-view-column>
					<picker-view-column >
						 <view v-for="(item, index2) in pickDate[1]" :key="index2" class="picker-item">{{item}}</view>
					 </picker-view-column>
					 <picker-view-column >
							<view v-for="(item, index2) in pickDate[2]" :key="index2" class="picker-item">{{item}}</view>
					</picker-view-column>
					<picker-view-column >
						 <view v-for="(item, index2) in pickDate[3]" :key="index2" class="picker-item">{{item}}</view>
					</picker-view-column>
					<picker-view-column >
							<view v-for="(item, index2) in pickDate[4]" :key="index2" class="picker-item">{{item}}</view>
					</picker-view-column>
          <!-- </block> -->
        </picker-view>
      </view>
    </view>
  </view>
</view>
</template>

<script>
const {
  showNoneToast
} = require("../../../pages/common/resources/utils/showMsgUtil");
var app = getApp();

export default {
  data() {
    return {
			// showPicker:false,
      //picker的内容,内容有pickType的值决定
      pickNavBar: [],
      currentInd: 0,
      //nav选择下标
      scrollTop: 0,
      startHourList: [],
      pickVal: [0, 0, 0, 0, 0],
      //时间默认的数字
      nPickVal: [],
      //时间选择的数字,点击确认后上面默认数字将被此数字替换,点击取消或者关闭弹窗,上面默认数字不改
      pickDate: [],
      //picker选择数据,每一次选择即为一个数组
      hasTapPicker: false,
      //piker是否需要点击才能进行选择,默认不需要点击
      pickTime: {},
      //最终选择时间
      isTapSure: true,
      //是否点击确认按钮,点击取消将时间恢复上一次选择并确认的时间
      isScroll: true,
      //是否滚动结束,未结束点击确认将使用上一次确认选中的时间
      notap: true //首次进来并未滑动时间时使用,滑动选择时间后该值为false

    };
  },

  props: {
		showChild:{  //打开的时候用
			type: Boolean,
			default: false
		},
    showPicker: {
      //打开弹窗
      type: Boolean,
      default: false
    },
    pickHead: {
      //picker头部文字
      type: String,
      default: "时间选择"
    },

    /**pickType
     * 
     * picker的展现格式 
     *    dates 年月日时分秒 
     *    date 年月日 
     *    times 时分秒  
     *    time 时分  
     *    startAndEnd 时分-时分 
     *    dataTime 先选年月日再选时分
     * 
     */
    pickType: {
      type: String,
      default: "startAndEnd"
    },
    defaultDate: {
      //默认时间
      type: Array,
      default: () => []
    },
    currentDate: {
      type: String,
      default: ''
    },
    roomType: {
      //房间类型 琴房 2 练功房 3
      type: String,
      default: '2'
    }
  },
  watch: {
    'defaultDate': function (e) {
      console.log('监听', e);

      if (e.length > 0) {
        this.initColumnData();
      }
    },
		'showPicker': function(e){
			console.log('组件更新', e)
			if(e){
				this.showPickers()
			}
		}
  },

	mounted() {
		// console.log('子组件生成')
		// console.log(this.defaultDate)
		// console.log(this.pickType)
		// console.log(this.roomType)
		// console.log(this.currentDate)
		this.initColumnData()
	},
  updated() {// this.initColumnData()
	// console.log('组件updated')
	// 	console.log(this.showPicker)
  },

	destroyed() {
		console.log('子组件销毁')
	},
	
  methods: {
    /***
    * 数据处理方法 start
    */
    withData(param) {
      return param < 10 ? '0' + param : '' + param;
    },

    getLoopArray(start, end) {
      var start = parseInt(start) || 0;
      var end = parseInt(end) || 1;
      var array = [];

      for (var i = start; i <= end; i++) {
        array.push(this.withData(i));
      }

      return array;
    },

    getHourMin(params) {
      var array = [];
      let defaultS = [...this.defaultDate[0].split(":"), ...this.defaultDate[1].split(":")];
      let startH = defaultS[0];
      let endH = defaultS[2];
      let startM = parseInt(defaultS[1]);
      let endM = parseInt(defaultS[3]); // console.log(params)
      // console.log(startH, startM,endH,  endM)

      if (startH == endH) {
        array.push(...this.getLoopArray(startM, endM));
      } else {
        if (params == startH) {
          array.push(...this.getLoopArray(startM, 59));
        } else if (params == endH) {
          array.push(...this.getLoopArray(0, endM));
        } else {
          array.push(...this.getLoopArray(0, 59));
        }
      } // console.log(array)


      return array;
    },

    getNewDateArry() {
      // 当前时间的处理
      var newDate = new Date();
      var year = this.withData(newDate.getFullYear()),
          mont = this.withData(newDate.getMonth() + 1),
          date = this.withData(newDate.getDate()),
          hour = this.withData(newDate.getHours()),
          minu = this.withData(newDate.getMinutes()),
          seco = this.withData(newDate.getSeconds());
      return [year, mont, date, hour, minu, seco];
    },

    //end
    initColumnData() {
			
			
      let pickType = this.pickType;
      this.iniStartAndEnd(pickType);
    },

    //end
    async hidePicker() {
			let _this = this
      //关闭弹窗
      _this.setData({
        showPicker: false
      });
      await this.defaultTime();
      let obj = {
        tapBtn: 'close',
        data: this.pickTime
      };
			console.log(obj)
      _this.$emit("pickSure", {
        detail: obj
      });
    },

    // 界面显示数据初始化
    async iniStartAndEnd(pickType) {
      let _this = this;

      let pickDate = [],
          pickNavBar = []; //开始时间-结束时间 start

      let defaulArr = [...this.defaultDate];
      let pickVal = [],
          defaultT = []; //时间默认选中的位置
      // console.log(defaulArr)

      if (pickType === 'startAndEnd') {
        defaultT = [...defaulArr[0].split(":"), 0, ...defaulArr[1].split(":")]; // console.log(defaultT)

        let startH = defaultT[0];
        let endH = defaultT[3];
        console.log(_this.currentDate, '----------------', _this.defaultDate[0]);
        let nextMin = new Date(_this.currentDate.replace(/-/g, '/') + ' ' + _this.defaultDate[0]).getTime() + 1000 * 60 * 6;
        let endMin = new Date(_this.currentDate.replace(/-/g, '/') + ' ' + _this.defaultDate[1]).getTime();
        console.log("延迟六分钟", nextMin);

        if (nextMin < endMin) {
          defaultT[0] = app.globalData.PublicUtil.formatTimeTwo(nextMin, 'h');
          defaultT[1] = app.globalData.PublicUtil.formatTimeTwo(nextMin, 'm');
        }

        pickDate[0] = this.getLoopArray(startH, endH);
        pickDate[1] = await this.getHourMin(defaultT[0]);
        pickDate[2] = ["——"];
        pickDate[3] = this.getLoopArray(startH, endH);
        pickDate[4] = await this.getHourMin(endH);
        pickNavBar = [{
          id: 0,
          text: "开始时间"
        }, {
          id: 1,
          text: "结束时间"
        }];
      }

      if (pickType === "dates") {
        defaultT = [...defaulArr[0].split(' ')[0].split('-'), ...defaulArr[0].split(' ')[1].split(':')];
        console.log(defaultT);
        pickDate[0] = this.getLoopArray(2020, 2025);
        pickDate[1] = this.getLoopArray(1, 12);
        pickDate[2] = this.getMonthDay(defaultT[0], defaultT[1]);
        pickDate[3] = this.getLoopArray(0, 59);
        pickDate[4] = this.getLoopArray(0, 59);
        pickDate[5] = this.getLoopArray(0, 59);
      }

      console.log(defaultT);
      console.log(pickDate);
      pickDate.forEach((cur, ind) => {
        pickVal.push(cur.indexOf(defaultT[ind]));
      }); // console.log(pickDate)
      // console.log(pickVal)
      //开始时间-结束时间 end

      setTimeout(() => {
        this.setData({
          pickVal
        });
      }, 0);
      this.setData({
        pickNavBar,
        pickDate
      });
    },

    // 时间选中时间方式
    defaultTime(data) {
      console.log('选中时间',data);
      let pickVal = [],
          nPickVal = [],
          pickTime = [];
      let type = this.pickType;

      if (data) {
        // 出现了滚动, startAndEnd 开始时间不能大于结束时间
        nPickVal = data;
        let pickDate = this.pickDate;
				this.isScroll = false
				
        switch (type) {
          case "startAndEnd":
            pickTime[0] = pickDate[0][nPickVal[0]] + ":" + pickDate[1][nPickVal[1]];
            pickTime[1] = pickDate[3][nPickVal[3]] + ":" + pickDate[4][nPickVal[4]];
            break;

          case "dates":
            pickTime[0] = pickDate[0][nPickVal[0]] + "-" + pickDate[1][nPickVal[1]] + "-" + pickDate[2][nPickVal[2]] + " " + pickDate[3][nPickVal[3]] + ":" + pickDate[4][nPickVal[4]] + ":" + pickDate[5][nPickVal[5]];
            break;

          default:
            return;
        }
				
      } else {
        // console.log(this.data.pickVal)
        pickVal = this.pickVal;
        let pickDate = this.pickDate;

        switch (type) {
          case "startAndEnd":
            pickTime[0] = pickDate[0][pickVal[0]] + ":" + pickDate[1][pickVal[1]];
            pickTime[1] = pickDate[3][pickVal[3]] + ":" + pickDate[4][pickVal[4]];
            break;

          case "dates":
            pickTime[0] = pickDate[0][pickVal[0]] + "-" + pickDate[1][pickVal[1]] + "-" + pickDate[2][pickVal[2]] + " " + pickDate[3][pickVal[3]] + ":" + pickDate[4][pickVal[4]] + ":" + pickDate[5][pickVal[5]];
            break;

          default:
            return;
        }

        this.setData({
          pickVal
					
        });
      }

      // console.log(pickTime);
      // console.log(nPickVal);
      this.setData({
        pickTime,
        nPickVal
      });
    },

    showPickers() {
      this.setData({
        showPicker: true
      });
			this.$emit('showPickers',{
				showPicker: true
			})
    },

    selectNavItem(e) {
      let currentInd = e;
      this.setData({
        currentInd
      });
    },

    getHour(s1, s2) {
      // console.log(s1, s2);
      s1 = new Date(s1.replace(/-/g, '/'));
      s2 = new Date(s2.replace(/-/g, '/'));
      var ms = Math.abs(s1.getTime() - s2.getTime());
      return (ms / 1000 / 60 / 60).toFixed(2);
    },

    // 点击确认按钮
    async tapSure() {
			// console.log('点击确定',this.pickTime)
      if (!this.isScroll) {
        //判断是否有滚动结束,滚动未结束就按点击按未滚动处理
        if (this.pickType === "startAndEnd") {
          let platform = wx.getSystemInfoSync().platform;
          var startT = this.currentDate + ' ' + this.pickTime[0];
          var endT = this.currentDate + ' ' + this.pickTime[1];

          if (platform == 'ios') {
            var startT = this.currentDate.replace(/-/g, '-') + ' ' + this.pickTime[0];
            var endT = this.currentDate.replace(/-/g, '-') + ' ' + this.pickTime[1];
          }

          var startTimes = new Date(startT).getTime();
          var endTimes = new Date(endT).getTime();
          console.log(startTimes);
          console.log(endTimes);

          if (startTimes >= endTimes) {
            //startAndEnd 开始时间不能大于结束时间
            wx.showToast({
              title: '开始时间不能大于等于结束时间',
              duration: 1500,
              icon: "none",
              mask: true
            });
            return;
          }

          let hours = this.getHour(startT, endT);
          let limitTime = this.roomType == 2 ? app.globalData.StorageUtil.get('pianoConfigDate') : app.globalData.StorageUtil.get('danceConfigDate');
          console.log(hours);
          console.log(limitTime.configureDtos.allowAppointmentDuration);
          let titles = `单次预约不能大于${limitTime.configureDtos.allowAppointmentDuration}小时`;

          if (hours > limitTime.configureDtos.allowAppointmentDuration) {
            wx.showToast({
              title: titles,
              duration: 1500,
              icon: "none",
              mask: true
            });
            return;
          }
        }

        this.setData({
          showPicker: false
        });
        this.$emit("pickSure", {
          detail: this.pickTime
        });
        let nPickVal = this.nPickVal;
        this.setData({
          pickVal: nPickVal
        });
      } else {
        //滚动未结束组织点击,未滚动直接选择时间可以点击
        if (this.notap) {
					console.log('滚动未结束或者未进行滚动')
          await this.defaultTime(); // console.log(this.data.pickTime)

          var startT = this.currentDate + ' ' + this.pickTime[0];
          var endT = this.currentDate + ' ' + this.pickTime[1];
          let hours = this.getHour(startT, endT);
          let limitTime = this.roomType == 2 ? app.globalData.StorageUtil.get('pianoConfigDate') : app.globalData.StorageUtil.get('danceConfigDate');
          console.log(startT)
          console.log(endT)
					console.log(hours);
          console.log(limitTime.configureDtos.allowAppointmentDuration);
					// limitTime.configureDtos.allowAppointmentDuration = 0.5
          let titles = `单次预约不能大于${limitTime.configureDtos.allowAppointmentDuration}小时`;

          if (hours > limitTime.configureDtos.allowAppointmentDuration) {
            uni.showToast({
              title: titles,
              duration: 1500,
              icon: "none",
              mask: true
            });
            return;
          }

          this.setData({
            showPicker: false
          });
          this.$emit("pickSure", {
            detail: this.pickTime
          });
        }
      }
    },

    // 滚动选择
    async pickerChange(e) {
      let nPickVal = e.detail.value;
      let type = this.pickType;
      let pickDate = this.pickDate;

      switch (type) {
        case "startAndEnd":
          pickDate[1] = await this.getHourMin(pickDate[0][nPickVal[0]]);
          pickDate[4] = await this.getHourMin(pickDate[3][nPickVal[3]]);
          // this.setData({
          //   pickDate
          // });
					this.$set(this.pickDate,1,pickDate[1])
					this.$set(this.pickDate,4,pickDate[4]) 
          this.defaultTime(nPickVal);
          break;

        case "dates":
          pickDate[2] = await this.getMonthDay(pickDate[0][nPickVal[0]], pickDate[1][nPickVal[1]]);
          // this.setData({
          //   pickDate
          // });
					this.$set(this.pickDate,2,pickDate[2])
          this.defaultTime(nPickVal);
          break;

        default:
          this.defaultTime(nPickVal);
      } 
			console.log(pickDate)
			

    },

    pickerStart(e) {
      // console.log("start", e)
      this.setData({
        isScroll: true,
        notap: false
      });
    },

    pickerEnd(e) {
			
      console.log("end", e)
      // console.log( this.data.pickTime)
      this.$emit("pickTap", {
        detail: this.data.pickTime
      });
      this.setData({
        isScroll: false
      });
	
    }

  }
};
</script>
<style>
@import "./pickTime.css";
</style>