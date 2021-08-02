<template>
<!--pages/indexModule/resources/components/consumeRecordList/consumeRecordList.wxml-->

<scroll-view :style="'height: ' + height + 'px;'" @scrolltolower="lower"  scroll-y="ture"   upper-threshold="5" lower-threshold="50" scroll-top="1">
<!--  <view class="attenListPage">
	  <view class="myui__bd">
	  	  <msg-no-data msg="暂无数据"></msg-no-data>
	  </view>
    </view> -->
 <view v-for="(item, index) in roomList" :key="index" class="roomList"  :data-ind="item.roomId" @click="toDetail" >
       <!-- <view class="weui-cell__ft weui-cell__ft_in-access"  style="font-size:14px;">详情</view> -->
	  <view class="roomName">
        {{item.roomName}}
      </view> 
      <view class="appiontRace">
        预约率{{item.race}}%
      </view>
      <view class="roomType" v-if="item.roomType">
        {{item.roomType}}
      </view>
    </view>
<view class style="margin-top:-350rpx;" v-if="nomore">
  <msg-no-data msg=""></msg-no-data>
</view>
<view class="virtual" v-if="virtual">
	</view>
<view class="load">
		{{load}}
	</view>
</scroll-view>
</template>
<script>
	var app = getApp();
import msgNoData from "../msgNoData/msgNoData.vue";
export default {
  data() {
    return {
		 load:'上拉加载更多',
		 virtual:false
	};
  },
  components: {
    msgNoData,
  },
  props: {
    roomList: {
      type: Array,
      default: () => []
    },
    listLength: {
      type: Number,
      default: 1
    },
	list: {
	  type: Number,
	  default: 1
	},
    nomore: {
      type: Boolean,
      default: true
    },
  height: {
    type: Number,
    default: 1
  },
  },
  
  methods: {
	  toDetail(e) {
		  let id = e.currentTarget.dataset.ind;
		  let d=this.load;
		  let data = {
		    meetingId: id,
		  };
	    this.$emit('toDetail', {
			  detail: data,
			 
	    });
	  },
    // 上拉更新
    lower(e) {	
		  let d=this.load;
        this.$emit('pull', {
			d:d
          // detail: {
          //   listLength:this.listLength
          // }
        });
    },

  },

  mounted(){
	
	 uni.$on("set", (options) => {
		 console.log(options.roomList)
	   if(options.roomList<options.totalPage){
		   	 console.log(options.totalPage)
	 		 this.load='上拉加载更多';
	   }else{
		   this.load='到底了'
	   }
	 		 
	 }) 
	
	// uni.$on("sele", (options) => {
	//   if(options){
	// 		 this.load='上拉加载更多';
	//   }
	 
	// }) 
	uni.$on("evennumber", (options) => {
	  if(options){
		  if(options){
			 this.setData({
			 virtual:false
			 });
		  }
	  }
	 
	}) 
	 var _this=this;
	 uni.$on("virtual", (options) => {
	  if(options){
		 _this.setData({
			 virtual:true
		 });
		
	  }
	
	 })
	 
  },
  onReachBottom() {
  	
  },
  onUnload(){
	   uni.$off('virtual');  
	     uni.$off('evennumber'); 
		   uni.$off('sele');  
		    uni.$off('selectOption'); 
			uni.$off('select');	
				 uni.$off('set');	
		 
  }
  
};
</script>
<style>
@import "./consumeRecordList.css";
</style>