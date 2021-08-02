<template>
<view>
<!--components/mineModule/helpList/helpList.wxml-->


<view v-for="(item, index) in helpList" :key="index" class="weui-cells weui-cells_after-title" :item="item">
  <navigator :url="src + '?issuelistid=' + item.id" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
    <view class="weui-cell__bd">{{item.columnName}}</view>
    <view class="weui-cell__ft weui-cell__ft_in-access"></view>
  </navigator>
</view>
</view>
</template>

<script>
// components/mineModule/helpList/helpList.js
var app = getApp();

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    helpList: {
      type: Array,
      default: () => []
    },
    src: {
      type: String,
      default: ''
    }
  },
  methods: {}
};
</script>
<style>
@import "./helpList.css";
</style>