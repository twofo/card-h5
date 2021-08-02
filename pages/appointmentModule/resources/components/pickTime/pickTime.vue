<template>
<view>
<picker mode="multiSelector" :value="dateTime" @change="changeDateTime" @columnchange="changeDateTimeColumn" @cancel="bindcancel" :range="dateTimeArray">
    <view class="tui-picker-detail">
      {{currentSeleteTime}}
    </view>
</picker>
</view>
</template>

<script>
// 时间插件,精确到分  年月日时分
let dateTimePicker = require("../../utils/pickTime");

export default {
  data() {
    return {
      dateTimeArray: null,
      dateTime: null,
      // startYear: 2000,
      // endYear: 2050
      lastSelectTime: null,
      currentSeleteTime: null
    };
  },

  components: {},
  props: {
    defaultTime: {
      type: String,
      default: null
    },
    tType: {
      //选择的时间的格式    dataTime 年-月-日 时分秒  timeEO  时-分 - 时-分  
      type: String,
      default: 'dataTime'
    }
  },

  beforeMount() {
    this.initData();
    this.setData({
      currentSeleteTime: this.defaultTime
    });
  },

  methods: {
    /**
     * changeDateTime() 这个时间是在点击确定的时候触发的
     * 为了不让每次滚动选择的时候都将内容刷新到页面去
     * 所以将页面显示的时间放在了这里进行显示
     */
    changeDateTime(e) {
      let ind = e.detail.value;
      let currentSeleteTime = this.dateTimeArray[0][ind[0]] + '-' + this.dateTimeArray[1][ind[1]] + '-' + this.dateTimeArray[2][ind[2]] + ' ' + this.dateTimeArray[3][ind[3]] + ':' + this.dateTimeArray[4][ind[4]];
      this.setData({
        dateTime: e.detail.value,
        lastSelectTime: currentSeleteTime,
        currentSeleteTime
      });
      this.$emit('getTime', {
        detail: {
          time: currentSeleteTime
        }
      });
    },

    changeDateTimeColumn(e) {
      var arr = this.dateTime,
          dateArr = this.dateTimeArray;
      arr[e.detail.column] = e.detail.value;
      dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
      this.setData({
        dateTimeArray: dateArr,
        dateTime: arr
      });
    },

    initData() {
      let t = new Date();
      let year = t.getFullYear();
      let month = t.getMonth() + 1; //只有需求问题,所以年份限定当前时间的年份,当2月的时候可以选择上一年的年份其余不行

      if (month <= 2) {
        var startYear = year - 1;
        var endYear = year;
      } else {
        var startYear = year;
        var endYear = year;
      }

      let date = this.lastSelectTime ? this.lastSelectTime : this.defaultTime;
      var obj = dateTimePicker.dateTimePicker(startYear, endYear, date);
      this.setData({
        dateTimeArray: obj.dateTimeArray,
        dateTime: obj.dateTime
      });
    },

    bindcancel() {
      //点击取消按钮时将时间停留在上一次点击的时间或者将时间停留在刚刚进入页面时传入的默认时间
      this.initData();
      let date = this.lastSelectTime ? this.lastSelectTime : this.defaultTime;
      this.$emit('getTime', {
        detail: {
          time: date
        }
      });
    }

  }
};
</script>
<style>
@import "./pickTime.css";
</style>