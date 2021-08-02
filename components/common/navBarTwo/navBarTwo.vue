<template>
<!--components/common/navBarTwo/navBarTwo.wxml-->



<view class="myui-navbar">
  <block v-for="(item, index) in tabs" :key="index">
      <view :id="index" :class="'myui-navbar__item ' + (activeIndex == index ? 'myui-bar__item_on' : '')" @tap="tabClick">
          <view class="myui-navbar__title">{{item}}</view>
      </view>
  </block>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    tabClick: function (e) {
      this.setData({
        activeIndex: e.currentTarget.id
      });
      this.$emit('clickTabs', {
        detail: {
          activeIndex: e.currentTarget.id
        }
      });
    }
  }
};
</script>
<style>
@import "./navBarTwo.css";
</style>