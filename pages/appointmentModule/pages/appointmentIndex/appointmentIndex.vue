<template>
<view class="page" style="background-color: #fff">
    <view class>
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
      cores: [],
      title: '区域预约'
    };
  },

  components: {
    optionItems
  },
  props: {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;

    this.clearStorageData();
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

    if (userInfoCach.role == null) {
      // 学生 或教师
      //我的预约列表
      this.setData({
        cores: Constant.appiontList
      });
    }
  },
  methods: {
    // 清除缓存数据
    clearStorageData() {
      app.globalData.StorageUtil.remove('hosterCach');
      app.globalData.StorageUtil.remove('recoderCach');
      app.globalData.StorageUtil.remove('attendeeCach');
      app.globalData.StorageUtil.remove('attendeeStudentCach');
      app.globalData.StorageUtil.remove('attendeeCach');
      app.globalData.StorageUtil.remove('appiontInfoCach');
      app.globalData.StorageUtil.remove('meetingId');
    }

  }
};
</script>
