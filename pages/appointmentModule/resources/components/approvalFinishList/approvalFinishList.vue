<template>
<view>
<!--pages/appointmentModule/resources/components/checkFinishList/checkFinishList.wxml-->
<view v-if="list.length==0">
  <msg-no-data msg="暂无数据"></msg-no-data>
</view>

<view v-else class="myui__bd">

  <view v-for="(item, index) in list" :key="index" style="margin-top:10rpx;">

    <view class="weui-cells weui-cells_after-title" style="margin: 6rpx 0rpx 0rpx;">
        <view class="weui-cell">
          <view class="weui-cell__bd" :style="'margin: 0rpx 10rpx;color:' + item.statusColor">{{item.statusName}}</view>
          <!-- <view class="weui-cell__ft" style="font-size:14px;">处理于 {{item.dealTime}}</view> -->
        </view>
    </view> 

    <view class="weui-cells weui-cells_after-title" style="font-size:15px;padding: 20rpx 0rpx;">
        <view class="myui-cell">
          <view class="myui-cell__bd">申请类型：</view>
          <view class="myui-cell__bf">{{item.applyType}}</view>
          <view class="weui-cell__ft weui-cell__ft_in-access" @tap="toDetail" :data-id="item.applyId">详情</view>
        </view>
        <view class="myui-cell">
          <view class="myui-cell__bd">会议名称：</view>
          <view class="myui-cell__bf">{{item.meetingName}}</view>
        </view>
        <view class="myui-cell">
          <view class="myui-cell__bd">申请人：</view>
          <view class="myui-cell__bf">{{item.applyName}}</view>
        </view>
        <view class="myui-cell">
          <view class="myui-cell__bd">会议时间：</view>
          <view class="myui-cell__bf">{{item.meetingTime}}</view>
        </view>
        <view class="myui-cell">
          <view class="myui-cell__bd">申请原因：</view>
          <view class="myui-cell__bf">{{item.applyReason}}</view>
        </view>
        <view class="myui-cell" style="margin：45px 15px;font-size:14px;">
          <view class="weui-cell__bd"></view>
          <view class="weui-cell__ft">申请于 {{item.applyTime}}</view>
        </view>

    </view> 

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
    }
  },
  methods: {
    toDetail: function (e) {
      console.log(e.currentTarget.dataset.id);
      this.$emit('detail', {
        detail: {
          applyId: e.currentTarget.dataset.id
        }
      });
    }
  }
};
</script>
<style>
@import "./approvalFinishList.css";
</style>