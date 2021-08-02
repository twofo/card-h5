<template>
<!--pages/repairModule/resources/components/timeNodes/timeNodes.wxml-->
<view class="myui-cell-top">
  <view v-for="(item, index) in list" :key="index">

    <view class="myui-cell">
        <view class="weui-cell__hd" style="margin-right: 10px;">
            <image :src="item.imgUrl" style="width: 50rpx; height: 50rpx;"></image>
        </view>
        <view class="myui-cell__bd">
            <view>{{item.statusName}}</view>
            <view style="font-size: 13px;color: #999;line-height:30rpx;display: flex;flex-direction: column;">
              <text class="items-text__top" v-if="item.msg!=''" style="width:90%;">{{item.msg}}</text>
              <text class="items-text__top">{{item.time}}</text>
            </view>
        </view>
        <view class="weui-cell__ft" v-if="item.btnObj.statc!==1">
          <view class="call_bn"  v-if="item.btnObj.bindtap== 'toCall'" @tap="toCall" :data-phone="item.phoneOfMaintainer" :data-code="item.repairCode" :data-name="item.userNameOfMaintainer">
            <text>{{item.btnObj.name}}</text>
          </view>
		  <view class="call_bn"  v-if="item.btnObj.bindtap== 'toComment'"  @tap="toComment" :data-phone="item.phoneOfMaintainer" :data-code="item.repairCode" :data-name="item.userNameOfMaintainer">
		    <text>{{item.btnObj.name}}</text>
		  </view>
        </view>
    </view>

  </view>
</view>
</template>

<script>
// pages/repairModule/resources/components/timeNodes/timeNodes.js
var app = getApp();

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    toCall: function (e) {
		console.log(e)
      console.log(e.currentTarget.dataset.phone);
      this.$emit('call', {
        detail: {
          phone: e.currentTarget.dataset.phone
        }
      });
    },
    // 学生端 - 评价
    toComment: function (e) {
	console.log(e)
      let repairCode = e.currentTarget.dataset.code;
      let nameOfMaintainer = e.currentTarget.dataset.name;
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.studentRepairCommentUrl + '?repairCode=' + repairCode + '&nameOfMaintainer=' + nameOfMaintainer, 500);
    }
  }
};
</script>
<style>
@import "./timeNodes.css";
</style>