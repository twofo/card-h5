<template>
<view>
<view v-for="(item, index) in list" :key="index">
  <view class="weui-cells weui-cells_after-title top">
    <view class="weui-cell">
      <view class="weui-cell__bd">入寝考勤： {{item.personName}}的补卡申请</view>
      <view v-if="item.handlerResult == 12">
        <image src="/static/pages/attendanceModule/resources/pic/approval_agree.png" style="width: 50px; height: 50px; display: block; "></image>
      </view>
      <view v-else-if="item.handlerResult == 13">
        <image src="/static/pages/attendanceModule/resources/pic/approval_reject.png" style="width: 50px; height: 50px; display: block; "></image>
      </view>
    </view>
    <view class="bd">
      <view class="weui-cell__bd text-bd">
        <text class="weui-cell__ld">缺卡原因：</text>

        <text class="weui-cell__rd">{{item.reason}}</text>
      </view>
      <view class="weui-cell__bd text-bd">
        <text class="weui-cell__ld">补卡日期：</text>

        <text class="weui-cell__rd">{{item.applyTime}}</text>
      </view>
       <view class="weui-cell__bd text-bd">
        <text class="weui-cell__ld">打卡时间：</text>

        <text class="weui-cell__rd">{{item.startTime}} - {{item.endTime}}</text>
      </view>
      
      <view class="weui-cell__bd text-bd text-date">
        <text>{{item.nowTime}}</text>
      </view>
    </view>

  </view>
</view>
</view>
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
@import "./checkFinishList.css";
</style>