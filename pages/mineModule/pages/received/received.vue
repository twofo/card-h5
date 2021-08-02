<template>
<view class="page">

  <view class="weui-cells weui-cells_after-title top">
      <navigator url="/pages/mineModule/pages/selectDepartmentOrBuild/selectDepartmentOrBuild?selectId=1" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
          <view class="weui-cell__bd">按组织架选择</view>
          <view class="weui-cell__ft weui-cell__ft_in-access"></view>
      </navigator>
      <navigator url="/pages/mineModule/pages/selectDepartmentOrBuild/selectDepartmentOrBuild?selectId=2" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
          <view class="weui-cell__bd">按楼栋选择</view>
          <view class="weui-cell__ft weui-cell__ft_in-access"></view>
      </navigator>
  </view>

</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  methods: {}
};
</script>
<style>
@import "./received.css";
</style>