<template>
<!--components/mineModule/student/mineList.wxml-->

<view class="page__bd">
    <view v-for="(item, index) in mineList" :key="index">
      <view class="weui-cells weui-cells_after-title">
        <navigator :url="item.url" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <view class="weui-cell__hd">
              <image :src="item.imageSrc" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px"></image>
            </view>
            <view class="weui-cell__bd more_bd">{{item.name}}</view>
            <view class="weui-cell__ft weui-cell__ft_in-access more_rightIcon"></view>
        </navigator>
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
    mineList: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
};
</script>
<style>
@import "./mineList.css";
</style>