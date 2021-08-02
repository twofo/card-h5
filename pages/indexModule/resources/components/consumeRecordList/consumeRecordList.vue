<template>
<!--pages/indexModule/resources/components/consumeRecordList/consumeRecordList.wxml-->

<scroll-view scroll-y :style="'height: ' + height + 'px;'" @scrolltolower="lower" @scroll="scroll" lower-threshold="5" upper-threshold="5">

<view v-for="(item, index) in alarmNewsList" :key="index">

  <view class="items-box">
    <!--  -->
    <view class="items-top">
      <view class="items-left">
        <span>{{item.status}}
		</span>
          <span style="margin-left: 12px;">{{item.posName}}</span>		
      </view>
      <view class="items-right">
		    <span style='margin-right: 16px;font-size: 16px;'>{{item.consumeChannel}}</span>
        <span class="items-right-money">{{item.money}}</span>
      </view>
    </view>
    <!--  -->
    <view class="items-bottom">
      <view style="width: 80%;">
        <text class="items-left__time">{{item.time}}</text>
        </view>
        <view style="width: 20%;">
        <text class="items-right-name items-left__font">{{item.name}}</text>
      </view>
    </view>
  </view>
</view>  
<view class style="margin-top:-300rpx;" v-if="nomore">
  <msg-no-data msg="到底了"></msg-no-data>
</view>
<view class style="margin-top:-300rpx;" v-else>
  <msg-no-data msg="上拉加载更多"></msg-no-data>
</view>
</scroll-view>
</template>
<script>
import msgNoData from "../../../../../components/common/msgNoData/msgNoData";
export default {
  data() {
    return {};
  },

  components: {
    msgNoData
  },
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
    },
    nomore: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
  	console.log(this.alarmNewsList);
  },
  methods: {
    // 上拉更新
    lower: function (e) {	
      if (this.listLength != this.alarmNewsList.length) {
        this.$emit('pull', {
          detail: {
            listLength:this.listLength
          }
        });
      }
	  console.log('789789');
    },
	scroll(){
		
	}
  }
};
</script>
<style>
@import "./consumeRecordList.css";
</style>