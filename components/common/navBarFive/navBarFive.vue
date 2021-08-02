<template>
<!--components/common/navBarTwo/navBarTwo.wxml-->
 <view class="weui-tab">
      <view class="myui-navbar">
          <block v-for="(item, index) in tabs" :key="index">
              <view :id="index" :class="'myui-navbar__item ' + (activeIndex == index ? 'myui-bar__item_on' : '')" @tap="tabClick">
                  <view class="weui-navbar__title">{{item}}</view>
              </view>
          </block>
      </view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      sliderOffset: 0,
      sliderLeft: 0
    };
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
@import "./navBarFive.css";
</style>