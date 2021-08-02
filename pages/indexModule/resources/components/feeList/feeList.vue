<template>
<scroll-view scroll-y :style="'height: ' + height + 'px;'"  :scroll-top="1" lower-threshold="1" upper-threshold="10">

<view v-for="(item, index) in alarmNewsList" :key="index">
    <view class="items-box">
      <view class="items-left">
        <text class="items-left__font">{{item.name}}</text>
        <text class="items-left__time">{{item.time}}</text>
      </view>
      <view class="items-right">
        <text>{{item.money}}</text>
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
    alarmNewsList: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 100
    },
    listLength: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // 上拉更新
    lower: function () {
      if (this.listLength != this.alarmNewsList.length) {
        this.$emit('pull', {
          detail: {
            listLength: this.data.listLength
          }
        });
      }
    }
  }
};
</script>
<style>
@import "./feeList.css";
</style>