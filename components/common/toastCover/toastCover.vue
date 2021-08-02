<template>
<!--components/common/toastCover/toastCover.wxml-->
<view class="toastCover" @tap="closeCoverFun">
    <view class="toastCont" :style="'max-height:' + maxHeight + 'rpx; margin-top:' + marginTop + 'rpx'" @tap.stop="defaultCover">
      <view style="overflow:hidden">
        <slot></slot>

      </view>
    </view>

</view>
</template>

<script>

export default {
  data() {
    return {
      closeCover: true
    };
  },

  components: {},
  props: {
    maxHeight: {
      //内容高度,超出高度部分滚动
      type: String,
      default: "934"
    },
    marginTop: {
      //距离顶部距离
      type: String,
      default: "0"
    }
  },
  methods: {
    closeCoverFun() {
      let {
        closeCover
      } = this;
      closeCover = !closeCover;
      let data = {
        'closeCover': closeCover
      };
      this.setData({
        closeCover
      });
      this.$emit('closeCover', {
        detail: data
      });
    },

    defaultCover() {
      let {
        closeCover
      } = this;
      let data = {
        'closeCover': true
      };
      this.setData({
        closeCover
      });
      this.$emit('closeCover', {
        detail: data
      });
    }

  }
};
</script>
<style>
@import "./toastCover.css";
</style>