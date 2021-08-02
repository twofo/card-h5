<template>
<!--components/mineModule/mineHeader/mineHeader.wxml-->

<view class="info-hd">
  <!-- 图像 -->
  
  <view v-if="pic.length<=0" @tap="doUserDetail">
    <image class="user-avatar" src="/static/images/mine/admin-1.png"></image>
  </view>
	<view v-else @tap="doUserDetail">
	  <image class="user-avatar" :src="pic"></image>
	</view>

  <!-- 显示展示 -->
  <view class="info-right" @tap="doUserDetail">

    <view class="user-right-top">
      <text class="user-text username">{{userInfoCach.name}}</text>
    </view>
    <text class="user-text ">{{userInfoCach.username}}</text>
    
    <!-- 根据不同的角色显示不同的信息 -->
    <!-- <block wx:if="{{role==3}}">
      <view class='user-right-top'>
        <text class="user-text username">{{user.xm}}</text>
      </view>
      <text class="user-text">{{user.zgh}}</text>
    </block> -->

  </view>

  <!-- 二维码图 -->
  <block v-if="isMine">
  <view class="QRcode" @tap="toCodeDetail">
    <image src="/static/images/mine/QRCode.png" style="width:60rpx;height:60rpx;"></image>
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
    userInfoCach: {
      type: Object,
      default: () => ({})
    },
    pic: {
      type: String,
      default: ''
    },
    isMine: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toCodeDetail: function () {
      this.$emit('qrcode', {
        detail: {}
      });
    },
    doUserDetail: function () {
      this.$emit('userdetail', {
        detail: {}
      });
    }
  }
};
</script>
<style>
@import "./mineHeader.css";
</style>