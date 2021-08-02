<template>
<view class="page">   
  <view class="page__bd">
    <view class="myui-list" :style="'height:' + (windowHeight-30) + 'px;width: ' + (windowWidth*0.96) + 'px;'">

      <view v-if="false">
        <fee-lists :alarmNewsList="pageData.showOfNewest" :height="windowHeight-40" @dealMsg="bindDealMsg"></fee-lists>
      </view>
      <view v-else style="margin-top:30%;">
          <view class="weui-loadmore weui-loadmore_line">
              <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
          </view>
          <view class="weui-loadmore weui-loadmore_line weui-loadmore_dot">
              <view class="weui-loadmore__tips weui-loadmore__tips_in-line weui-loadmore__tips_in-dot"></view>
          </view>
      </view>

    </view>
  </view>
</view>
</template>

<script>
var app = getApp();
import feeLists from "../../resources/components/feeList/feeList";

export default {
  data() {
    return {
      windowHeight: 667,
      windowWidth: 375
    };
  },

  components: {
    feeLists
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight,
      windowWidth: wx.getSystemInfoSync().windowWidth
    });
  },
  methods: {}
};
</script>
<style>
@import "./toPayFeeList.css";
</style>