<template>
<view>
<scroll-view scroll-y :style="'height: ' + height + 'px;'" @scrolltolower="lower" scroll-y="ture" upper-threshold="5"
							lower-threshold="50" scroll-top="1" >
  <view :style="'height: ' + (height + 20) + 'px;'">

  <view v-for="(item, index) in alarmNewsList" :key="index">
    <!-- <navigator url="/pages/indexModule/pages/messageDetail/messageDetail?mid={{item.id}}" > -->
    <view class="weui-cells weui-cells_after-title record-list" @tap="bindDealMsg({index:index, type:item.type})"  
		:style="'height: ' + itemHeight + 'px;'">
      <view class="list-box-c">
        <view class="weui-cell__bd list-box-text">
          <image v-if="item.image" :src="item.image" style="width:8px;height:8px;"></image>
          <text style="margin-left:6px;">类型：{{item.typeName}}</text>
        </view>
        <view class="weui-cell__ft" style="font-size:10px;">{{item.msg}}</view>

      </view>
      <view class="weui-cell__bd item-title">
        {{item.messageTitle}}
      </view>
      <view class="weui-cell__bd list-box-text" v-if="item.type != 5">
        <!-- <scroll-view scroll-y style="width:  20.0em;height: 1.3em;">
            {{item.messageContent}}</scroll-view> -->
        <view class="list-content" v-html="item.messageContent">{{item.messageContent}}</view>
      </view>
      
      <view class="list-box-c" style="margin-top:12px;color:#888888;" v-if="type!=1">
        <view class="weui-cell__bd list-box-text">
          <text>{{item.messageSendTime}}</text>
        </view>
        <view class="weui-cell__ft weui-cell__ft_in-access" style="font-size:10px;" 
					@tap.stop="getMore({index:index, type:item.type})">更多详情</view>
        
      </view>

    </view>
    <!-- </navigator> -->
  </view>
  <view class="nomore"></view>
  </view>

</scroll-view>
</view>
</template>

<script>

export default {
  data() {
    return {
			scrollTop:0
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
    itemHeight: {
      type: Number,
      default: 106
    },
    listLength: {
      type: Number,
      default: 1
    },
    type: {
      type: Number,
      default: 0
    }
  },
  methods: {
    // 上拉更新
    lower: function () {
			// console.log(this.listLength)
      if (this.listLength != this.alarmNewsList.length) {
        uni.$emit('bindPullUp', {
          detail: {
            listLength: this.listLength
          }
        });
      }
    },

    /**
     * 处理指定消息
     * 
     * 根据type与childType进行
     */
    bindDealMsg: function (e) {
      console.log('e--', e);
      uni.$emit('bindDealMsg', {
        detail: {
          index: e.index,
		  type: e.type
        }
      });
    },

    getMore(e) {
      uni.$emit("getMore", {
        detail: e
      });
    }

  }
};
</script>
<style>
@import "./newList.css";
</style>