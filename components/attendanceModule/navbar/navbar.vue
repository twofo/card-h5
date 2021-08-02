<template>
  <view class="weui-tab">
      <view class="navbar">
          <block v-for="(item, index) in tabs" :key="index">
              <view  :class="'weui-navbar__item ' + (activeIndex == index ? 'weui-bar__item_on' : '')" @tap="tabClick(index)">
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
      activeIndex: 0,
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
  methods: {
    tabClick: function (e) {
			console.log(e)
      this.setData({
        activeIndex: e
      });
      this.$emit('clickTabs', {
        detail: {
          activeIndex: e
        }
      });
    }
  }
};
</script>
<style>
@import "./navbar.css";
</style>