<template>
<!--pages/repairModule/resources/components/statistics/statistics.wxml-->

<scroll-view scroll-y style="height: 430rpx;" class="myui-lists" lower-threshold="1" upper-threshold="10">

  <!-- <view class="page-body">
    <view class="page-section-gap">

      <view style="color:#20a4f7;font-size:14px;">报修原因统计</view>
      <view wx:for="{{list}}" wx:key="index" wx:for-item="item" >
        <view class='myui-items'>
          <view class='margin-top:0rpx;'>
            <image src='{{item.image}}' class="myui-items__iamge"></image>
          </view>
          <text style='margin-top:10rpx;'>{{item.name}}</text>
          <view class="progress-box">
            <progress percent="{{item.percent}}" color="#10AEFF" show-info active stroke-width="7"/>
          </view>
        </view>
      </view>
      
    </view>
  </view> -->

  <view class="page-body">
    <view class="page-section-gap">

      <view style="color:#20a4f7;font-size:14px;">维修设备统计</view>
      <view v-for="(item, index) in list" :key="index">
        <view class="myui-items">
          <text style="margin-top:10rpx;">{{item.name}}</text>
          <view class="progress-box">
            <progress :percent="item.percent"  color="#10AEFF" show-info active stroke-width="7"></progress>
          </view>
        </view>
      </view>
      
    </view>
  </view>

</scroll-view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
};
</script>
<style>
@import "./statistics.css";
</style>