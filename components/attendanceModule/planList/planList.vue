<template>
<view>
<view v-for="(item, index) in planList" :key="index">
  <view class="weui-cells weui-cells_after-title">
    <view class="weui-cell weui-cell_switch">
      <view class="weui-cell__hd" v-if="is_edit" style="position: relative;margin-right: 10px;" :data-id="item.id" @tap="deletePlan">
        <image src="/static/pages/attendanceModule/resources/pic/delete.png" style="width: 20px; height: 20px; display: block; margin: 0 20rpx;"></image>
      </view>
      <view class="weui-cell__bd" @tap="toUpdatePlan" :data-id="item.id">
        <view style="font-size: 18px;">{{item.name}}</view>
        <view style="font-size: 13px;color: #bbb;margin-top: 8rpx;">考勤时间段：{{item.startTime}} ~ {{item.endTime}}</view>
        <view style="font-size: 13px;color: #bbb;margin-top: 8rpx;">考勤周期：星期【{{item.weekCycle}}】</view>
      </view>
      <view class="weui-cell__ft">
        <switch :checked="item.enable" color="#20a4f7" v-if="!is_edit" @change="switchChange" :data-id="item.id"></switch>
        <view class="weui-cell__ft weui-cell__ft_in-access" v-if="is_edit" @tap="toUpdatePlan" :data-id="item.id"></view>
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
    planList: {
      type: Array,
      default: () => []
    },
    is_edit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 删除按钮
    deletePlan: function (e) {
      // console.log('选中的考勤计划id', e);
      this.$emit('myevent', {
        detail: {
          valueType: 1,
          planId: e.currentTarget.dataset.id
        }
      });
    },
    // 开关
    switchChange: function (e) {
      // console.log('启用或禁用', e);
      this.$emit('myevent', {
        detail: {
          valueType: 2,
          planId: e.currentTarget.dataset.id,
          enable: e.detail.value
        }
      });
    },
    // 跳转到更新页面 
    toUpdatePlan: function (e) {
      // console.log('更新', e);
      if (this.is_edit) {
        this.$emit('myevent', {
          detail: {
            valueType: 3,
            planId: e.currentTarget.dataset.id
          }
        });
      }
    }
  }
};
</script>
<style>
@import "./planList.css";
</style>