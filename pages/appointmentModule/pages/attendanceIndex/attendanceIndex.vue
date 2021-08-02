<template>
<view class="page">

    <view class="page__bd">

      <option-items :cores="cores" :title="title"> </option-items>

    </view>

</view>
</template>

<script>
var app = getApp();
var Constant = require("../../resources/constant/arrayConstant.js");
import optionItems from "../../../../components/indexModule/option/option";

export default {
  data() {
    return {
      cores: [[]],
      title: '会议考勤'
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
  onShow: function () {
    //我的预约列表
    this.setData({
      cores: Constant.meetingAttendanceList
    });
  },
  methods: {}
};
</script>
