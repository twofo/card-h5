<template>
<!--pages/indexModule/resources/components/recordList/recordList.wxml-->
<scroll-view scroll-y :style="'height: ' + height + 'px;'" @scrolltolower="lower" :scroll-top="scrollTop" scroll-y="ture" upper-threshold="5" lower-threshold="50" scroll-top="1">

<view v-for="(item, index) in alarmNewsList" :key="index">
  <view class="items-box">
    <!--  -->
		<view class="items-left__time">
		  <text>订单号：</text><text>{{item.reChargeOrderCode}}</text>
		</view>
    <view class="items-top">
      <view class="items-left">
        <text class="items-left__font">{{item.status}}</text>
		<view class="item-refund" v-if="item.refun">
			<span>({{refund}})</span> 
		</view>
      </view>
      <view class="items-right">
		  {{item.color}}
        <text :class="[item.refun==true ?'items-right-money-gray':'items-right-money']">{{item.money}}</text> 
      </view>
    </view>
    <!--  -->
    <view class="items-bottom">
      <view style="width: 65%;">
        <text class="items-left__time">{{item.time}}</text>
        </view>
        <view style="width: 35%;">
        <text class="items-right-name items-left__font">缴费人：{{item.name}}</text>
      </view>
    </view>

  </view>
    
</view>

</scroll-view>
</template>

<script>

export default {
  data() {
    return {
			scrollTop:0,
			refund:'已退款',
			list:'',
			refun:true
		};
  },

  components: {},
  props: {
    alarmNewsList: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 100
    },
    listLength: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // 上拉更新
    lower: function () {
      if (this.listLength != this.alarmNewsList.length) {
        this.$emit('pull', {
          detail: {
            listLength: this.listLength
          }
        });
      }
    }
  },
};
</script>
<style>
@import "./recordList.css";
</style>