<template>
<view>
<!--components/common/msgNoData/msgNoData.wxml-->

<view class="weui-loadmore weui-loadmore_line" style="margin-top:50%;">
    <view class="weui-loadmore__tips weui-loadmore__tips_in-line">{{msg}}</view>
</view>
<view class="weui-loadmore weui-loadmore_line weui-loadmore_dot">
    <view class="weui-loadmore__tips weui-loadmore__tips_in-line weui-loadmore__tips_in-dot"></view>
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
    msg: {
      type: String,
      default: ''
    }
  },
  methods: {}
};
</script>
<style>
@import "./msgNoData.css";
</style>