<template>
<view class="container">
  <view class="header">
    <view class="black-cover"></view>
    <image class="logo" :src="mineImageUrl.logo"></image>
  </view>
  <view class="content">
    <view class="version">
      <view class="version-title">
        <text class="title-name">科韵智慧校园</text>
        <text class="version-text">{{version}}</text>
      </view>
    </view>
    <view class="describe" v-if="!showLog">
        <text class="desc-title">简介</text>
        <view class="desc-list">
          <text class="desc-list-item">官网：http:/keyunzhihui.com</text>
        </view>
        <text class="desc-content">广州科韵智慧科技有限公司成立于2018年1月，现拥有10项发明专利。公司致力于把设备信息化、便捷管理、舒适生活带给每位师生，为高校提供基于物联网的校园智慧解决方案。公司拥有资深的软件及硬件队伍，为万物互联提供可能性，为系统的实施提供有力保障，结合学校自身特点量身打造舒适便捷，安全高效的解决方案。</text>
    </view>
  </view>
  <view class="footer">
    <view class="footer-lanshan">
        <image :src="mineImageUrl.lanshan"></image>
        <text>广州科韵智慧科技有限公司</text>
    </view>
    <text>Copyright @ {{year}} All Rights Reserved</text>
  </view>
</view>
</template>

<script>
//获取应用实例
var app = getApp();
var mineImageUrl = require("../../resources/utils/imageUrl.js");

export default {
  data() {
    return {
      mineImageUrl: mineImageUrl,
      version: '',
      year: "",
			showLog:false
    };
  },

  components: {},
  props: {},
  onLoad: function () {
		
    this.setData({
      version: app.globalData.version,
      year: new Date().getFullYear()
    });
  },
  methods: {}
};
</script>
<style>
@import "./about.css";
</style>