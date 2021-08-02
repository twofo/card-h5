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
      title: '公共资源'
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
    //我的预约列表
    this.setData({
      cores: Constant.commonList
    });
  },
  methods: {}
};
</script>
