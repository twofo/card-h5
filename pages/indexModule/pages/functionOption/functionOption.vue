<template>
<!--pages/indexModule//pages/FunctionOption/FunctionOption.wxml-->
<view class="page" style="background-color: #fff">
    <view class>
      <option-items :cores="cores" :title="title"> </option-items>
    </view>
</view>
</template>

<script>
// pages/indexModule//pages/FunctionOption/FunctionOption.js
var app = getApp();
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handleGateway(options.optionType);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  methods: {
    handleGateway: function (params) {
      let cores;
      let title;

      switch (params) {
        case app.globalData.Constant.functionOption.dormitoryStudentType:
          cores = app.globalData.Constant.functionOption.dormitoryStudentOption;
          title = '宿舍服务';
          break;

        case app.globalData.Constant.functionOption.dormitoryNotStudentType:
          cores = app.globalData.Constant.functionOption.dormitoryNotStudentOption;
          title = '宿舍服务';
          break;

        default:
          console.log("不存在此路径");
          title = '未知';
          break;
      }

      wx.setNavigationBarTitle({
        title: title +'首页'
      });
      this.setData({
        cores: cores,
        title: title
      });
    }
  }
};
</script>
<style>
@import "./functionOption.css";
</style>