<template>
<view>
<scroll-view scroll-y :style="'height: ' + height + 'px;'" @scrolltolower="lower" :scroll-top="scrollTop" lower-threshold="1" upper-threshold="10">


<view class="errBox">
	<view v-for="(item, index) in alarmNewsList" :key="index" class="errList">
		<view class="noticeIncon">
			<image class="image-css" src="/static/pages/indexModule/resources/pic/errorNotice.png" width="40" mode="widthFix"></image>
			<!-- <icon class='redIcon' type='warn' color='#FA5555' size="32" ></icon> -->
		</view>
		<view class="errInfo">
			<view class="errAdree">
				<text>{{item.floorName}}</text> <text>{{"->"}}</text>
				<text>{{item.roomname}}</text> <text>{{"->"}}</text>
				<text>{{item.deviceType}}</text>
			</view>
			<view class="errInfoTxt">
				<text>预警描述：</text>
				<text>{{item.errDesc}}</text>
			</view>
			<view class="errInfoTxt">
				<text>预警时间：</text>
				<text>{{item.errTime}}</text>
			</view>
		</view>
	</view>

    
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
    listLength: {
      type: Number,
      default: 1
    }
  },
  methods: {
    lower: function () {
      if (this.listLength != this.alarmNewsList.length) {
        this.$emit('pull', {
          detail: {
            listLength: this.listLength
          }
        });
      }
    }
  }
};
</script>
<style>
@import "./errList.css";
</style>