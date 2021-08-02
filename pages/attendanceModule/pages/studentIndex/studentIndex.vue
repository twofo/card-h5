<template>
<view class="page">

    <view class="page__bd">
  
      <option-items :cores="cores" :title="title"> </option-items>

    </view>

</view>
</template>

<script>
var app = getApp();
var AttendanceImageUrl = require("../../resources/utils/imageUrl.js");
import optionItems from "../../../../components/indexModule/option/option";

export default {
  data() {
    return {
      cores: [[{
        image: AttendanceImageUrl.clock,
        url: app.globalData.PageUrl.attendancePageUrl.studentClockIndexUrl,
        name: '考勤打卡'
      }, {
        image: AttendanceImageUrl.attendaceStatistics,
        url: app.globalData.PageUrl.attendancePageUrl.studentStatisticsIndexUrl,
        name: '考勤统计'
      }]],
      title: '归寝考勤'
    };
  },

  components: {
    optionItems
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  methods: {}
};
</script>
