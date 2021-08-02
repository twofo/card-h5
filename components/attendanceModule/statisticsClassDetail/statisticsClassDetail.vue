<template>
<view>
<!--components/attendanceModule/statisticsClassDetail/statisticsClassDetail.wxml-->


<view class="weui-cells__title_two">班级详情</view>
<block v-if="list.length==0">
  <view class="weui-cells__box">暂无数据</view>
</block>
<block v-else>
<view v-for="(item, index) in list" :key="index">
  <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="toClassDetail" :data-item="item">
        <view class="weui-cell__bd">
            <view>{{item.className}}</view>
            <view style="font-size: 13px;color: #888888;margin-top:10rpx;">应出勤人数{{item.shouldCheckInCount}} 缺勤人数{{item.classNotCheckInCount}}人</view>
        </view>
        <view class="weui-cell__ft weui-cell__ft_in-access">
          <text class="weui-cell__ft_font">{{item.percentage}}%</text>
        </view>
      </view>
  </view>
  </view>
</block>
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
  methods: {
    toClassDetail: function (e) {
      console.log(e);
      this.$emit('getClassDetail', {
        detail: {
          item: e.currentTarget.dataset.item
        }
      });
    }
  }
};
</script>
<style>
@import "./statisticsClassDetail.css";
</style>