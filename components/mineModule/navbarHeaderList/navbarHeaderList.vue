<template>
<!--components/mineModule/navbarHeaderList/navbarHeaderList.wxml-->


<view class="weui-navbar top-box">
  <block v-for="(item, index) in tabs" :key="index">
      <view :id="index" :class="'weui-navbar__item top-box-distance ' + (activeIndex == index ? 'weui-bar__item_on' : '')" @tap="item.click">
          <view class="weui-navbar__title">{{item.name}}</view>
      </view>
  </block>
  <view class="weui-navbar__slider" :style="'left: ' + sliderLeft + 'px; transform: translateX(' + sliderOffset + 'px); -webkit-transform: translateX(' + sliderOffset + 'px);width: ' + sliderLeft + 'px'"></view>
</view>
</template>

<script>
// components/mineModule/navbarHeaderList/navbarHeaderList.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

export default {
  data() {
    return {
      activeIndex: 0,
      //点击顶部哪了一块
      sliderOffset: 0,
      sliderLeft: 0
    };
  },

  components: {},
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  },

  /**
   * 组件的生命周期
   */
  created: function () {
    //空间被创建时触发
    console.log('------------------------navbar组件------------------------');
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log('设备宽度', res.windowWidth);
        that.setData({
          sliderLeft: (res.windowWidth / 6 - sliderWidth) / 2,
          sliderOffset: res.windowWidth / 6 * that.activeIndex
        });
      }
    });
  },
  methods: {
    tabClick: function (e) {
      console.log('点击所获取的值为', e.currentTarget.id);
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
      this.$emit('myevent', {
        detail: {
          deviceTypeId: e.currentTarget.id
        }
      });
    },
    open: function (e) {
      var _this = this;

      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
      wx.showActionSheet({
        itemList: ['电表'],
        success: function (res) {
          if (!res.cancel) {
            if (res.tapIndex == 1) {
              // 将点击值传给引入组件的地方
              _this.$emit('myevent', {
                detail: {
                  deviceTypeId: 5
                }
              });
            }

            if (res.tapIndex == 0) {
              _this.$emit('myevent', {
                detail: {
                  deviceTypeId: 4
                }
              });
            }
          }
        },
        fail: function () {}
      });
    }
  }
};
</script>
<style>
@import "./navbarHeaderList.css";
</style>