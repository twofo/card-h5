<template>
<view class="appiontmentlist">
  <view class="appiontmentlist-head">
    <text>个人考勤</text>
  </view>
  <view class="appiontList">
    <view v-for="(item, index) in appiontList" :key="index" class="appiontItem">
      <navigator :url="item.url">
        <view class="appiontBox">
          <view class="appiontItem-img">
            <image :src="item.image"></image>
          </view>
          <view class="appiontTxt">
            <text>{{item.content}}</text>
          </view>
        </view>
       
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
    appiontList: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
};
</script>
<style>
@import "./appiontList.css";
</style>