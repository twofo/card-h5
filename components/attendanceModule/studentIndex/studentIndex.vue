<template>
<!--components/attendanceModule/studentIndex/studentIndex.wxml-->

  <scroll-view scroll-y :style="'height: ' + (windowHeight-17) + 'px;padding: 20rpx 0rpx;'">

    <view v-for="(item, index) in list" :key="index" style="padding: 3rpx 10rpx;">

      <view class="weui-cells weui-cells_after-title" @tap="toDetail" :data-id="item.id" :data-name="item.name">
        <view class="weui-cell weui-cell_switch">
          <view class="weui-cell__bd">
              <view style="font-size: 18px;">{{item.name}}</view>
              <view style="font-size: 13px;color: #bbb;margin-top: 8rpx;">考勤时间段：{{item.startTime}} ~ {{item.endTime}}</view>
              <view style="font-size: 13px;color: #bbb;margin-top: 8rpx;">考勤周期：星期【{{item.weekCycle}}】</view>
          </view>
          <view class="weui-cell__ft">
            <view class="weui-cell__ft weui-cell__ft_in-access"></view>
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
    },
    windowHeight: {
      type: Number,
      default: 600
    }
  },
  methods: {
    // 跳转到更新页面 
    toDetail: function (e) {
      // console.log('跳转到', e);
      this.$emit('myevent', {
        detail: {
          id: e.currentTarget.dataset.id,
          name: e.currentTarget.dataset.name
        }
      });
    }
  }
};
</script>
<style>
@import "./studentIndex.css";
</style>