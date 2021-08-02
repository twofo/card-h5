<template>
<view class="page">

    <view class="page__bd">

      <option-items :cores="cores" :title="title"> </option-items>

    </view>

</view>
</template>

<script>
var app = getApp();
import optionItems from "../../../components/indexModule/option/option";

export default {
  data() {
    return {
      cores: [[]],
      title: '我的考勤'
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

    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

    if (userInfoCach.role == null) {
      // 学生 或 教师
      //我的预约列表
      this.setData({
        cores: app.globalData.Constant.arrayConstant.attendanceList
      });
    }
  },
  methods: {}
};
</script>
