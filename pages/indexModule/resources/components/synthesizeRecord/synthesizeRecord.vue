<template>
<view>
<!--pages/indexModule/resources/components/synthesizeRecord/synthesizeRecord.wxml-->

<view v-if="list.length==0" class="myui__bd">
  <msg-no-data msg="暂无数据"></msg-no-data>
</view>
  
<view v-else class="myui__bd">

  <view class="weui-flex myui-item-header">
      <view class="weui-flex__item myui-item-1 text-center_line"><view class="placeholder">时间</view></view>
      <view class="weui-flex__item myui-item-2 text-center"><view class="placeholder">用户类型</view></view>
      <view class="weui-flex__item myui-item-3 text-center"><view class="placeholder">姓名/学号</view></view>
      <view class="weui-flex__item myui-item-4 text-center_line"><view class="placeholder">位置信息</view></view>
  </view> 
  <view v-for="(item, index) in list" :key="index" class="myui-items">
    <view class="weui-flex myui-item-up">
        <view class="weui-flex__item myui-item-1"><view class="placeholder">{{item.recordDate}}</view></view>
        <view class="weui-flex__item myui-item-2 text-center"><view class="placeholder">{{item.userType}}</view></view>
        <view class="weui-flex__item myui-item-3 text-center"><view class="placeholder">{{item.username}}</view></view>
        <view class="weui-flex__item myui-item-4"><view class="placeholder">{{item.newRoomLocation}}</view></view>
    </view> 
    <view class="weui-flex myui-item-down">
        <view class="weui-flex__item myui-item-1"><view class="placeholder">{{item.recordDateTime}}</view></view>
        <view class="weui-flex__item myui-item-2"><view class="placeholder"></view></view>
        <view class="weui-flex__item myui-item-3"><view class="placeholder">{{item.userCode}}</view></view>
        <view class="weui-flex__item myui-item-4"><view class="placeholder">{{item.oldRoomLocation}}</view></view>
    </view>
  </view> 

  <view class style="margin-top:-200rpx;" v-if="nomore">
    <msg-no-data msg="到底了"></msg-no-data>
  </view>
  <view class style="margin-top:-200rpx;" v-else>
    <msg-no-data msg="上拉加载更多"></msg-no-data>
  </view>

</view>
</view>
</template>

<script>
import msgNoData from "../../../../../components/common/msgNoData/msgNoData";

export default {
  data() {
    return {};
  },

  components: {
    msgNoData
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    windowHeight: {
      type: Number,
      default: 0
    },
    nomore: {
      type: Boolean,
      default: true
    }
  },
  methods: {}
};
</script>
<style>
@import "./synthesizeRecord.css";
</style>