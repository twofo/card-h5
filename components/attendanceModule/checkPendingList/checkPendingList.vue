<template>
<view>
<view v-for="(item, index) in list" :key="index">
  <view class="weui-cells weui-cells_after-title top">
    <view class="weui-cell">
        <view class="weui-cell__bd">入寝考勤： {{item.personName}}的补卡申请</view>
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
      <view class="weui-cell__bd text-date img_bd" v-if="item.images != ''">
        <view v-if="item.images[0] != ''"><image :src="item.images[0]" class="img"> </image></view>
        <view v-if="item.images[1] != ''"><image :src="item.images[1]" class="img"> </image></view>
      </view>
      <view class="weui-cell__bd text-bd text-date">
        <text>{{item.nowTime}}</text>
      </view>
    </view>

    <view class="button-sp-area">
      <button class="mini-btn danger" @tap="bindRefuse" :data-id="item.applyId">拒绝</button>
      <button class="mini-btn primary" @tap="bindAgree" :data-id="item.applyId">同意</button>
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
  methods: {
    bindRefuse: function (e) {
      console.log(e.currentTarget.dataset.id);
      this.$emit('refuse', {
        detail: {
          applyId: e.currentTarget.dataset.id,
          type: 13
        }
      });
    },
    bindAgree: function (e) {
      this.$emit('agree', {
        detail: {
          applyId: e.currentTarget.dataset.id,
          type: 12
        }
      });
    }
  }
};
</script>
<style>
@import "./checkPendingList.css";
</style>