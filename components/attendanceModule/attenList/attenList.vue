<template>
<view>
<scroll-view scroll-y :style="'height: ' + windowHeight + 'px;'" @scrolltolower="lower"  @scroll="scroll" lower-threshold="10" upper-threshold="10">
  <view class="attenListPage">
    <view class="myui__bd" v-if="listArr.length == 0 || listArr == undefined">
      <msg-no-data msg="暂无数据"></msg-no-data>
    </view>
    <block v-for="(item, index) in listArr" :key="index">
      <view class="attendBox" v-if="listArr.length > 0">
        <view class="attend-title myui__bd">
          <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell attent-type">
              <view cZlass="weui-cell__hd attent-type">
                <image :src="item.listTypeImg" class="typeImage"></image>
                <text>{{item.listType}}</text>
              </view>
              <view class="weui-cell__ft weui-cell__ft_in-access" @tap.stop="toDetail" :data-id="item.id" style="font-size:14px;">详情</view>
            </view>
          </view>
        </view>
        <view class="attend-content " @tap.stop="toDetail" :data-id="item.id">
          <!-- <view class="weui-cell">
            <text class="meetingRoomName">{{item.roomName}}</text>
          </view> -->
          <view class="myui-cell" v-if="item.adress">
            <view class="pin-solid icons"></view>
            <view class="myui-cell__bf adress">{{item.adress}} </view>
          </view>
          <!-- <view class="myui-cell">
            <view class="myui-cell__bd contTitle">{{titleTxtArr[0]}}：</view>
            <view class="myui-cell__bf">{{item.orderId}}</view>
          </view> -->
          <view class="myui-cell">
            <view class="myui-cell__bd contTitle">{{titleTxtArr[1]}}：</view>
            <view class="myui-cell__bf">{{item.appiontmentTime}}</view>
          </view>
          <view class="myui-cell">
            <view class="myui-cell__bd contTitle">{{titleTxtArr[2]}}：</view>
            <view class="myui-cell__bf">{{item.founder}}</view>
          </view>
          <view class="myui-cell">
            <view class="myui-cell__bf"> 发布于 {{item.startTime}}</view>
          </view>
        </view>

      </view>
    </block>
    <view class="myui__bd" style="margin-top:-300rpx;" v-if="nomore && listArr.length >0">
      <msg-no-data msg="到底了"></msg-no-data>
    </view>
  </view>
</scroll-view>
</view>
</template>
<script>
import msgNoData from "../../common/msgNoData/msgNoData";
export default {
  data() {
    return {};
  },
  components: {
    msgNoData
  },
  props: {
    listArr: {
      //列表数据
      type: Array,
      default: () => []
    },
    titleTxtArr: {
      //页面标题存放
      type: Array,
      default: () => []
    },
    nomore: {
      type: Boolean,
      default: false
    },
    windowHeight: {
      type: Number,
      default: '0'
    }
  },
  methods: {
    toDetail(e) {
      let id = e.currentTarget.dataset.id;
      let data = {
        meetingId: id
      };
      this.$emit('toDetail', {
        detail: data
      });
    },
    lower(e) {
		console.log(e);
      let data = {
        msg: "上拉加载"
      };
      this.$emit("lowers", {
        detail: data
      });
    },

    scroll() {// console.log("组件页面滚动")
    }

  }
};
</script>
<style>
@import "./attenList.css";
</style>