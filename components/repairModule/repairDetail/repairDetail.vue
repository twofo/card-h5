<template>

  <view class="weui-cells" :style="'font-size:' + fontSize + 'px;'">
    <view class="weui-cell">
      <view class="weui-cell__bd">报修编号： {{pageObj.repairCode}}</view>
    </view>
    <view class="weui-cell">
      <view class="weui-cell__bd">创建时间： {{pageObj.createdTime}}</view>
    </view>
    <view class="weui-cell myui-bd__ft">
      <view class="weui-cell__bd">状态： <text style="color:#20a4f7;">{{pageObj.statusName}}</text></view>
			
     <!-- <view v-if=" JSON.stringify(pageObj.btnObj) != '{}'" class="myui-call__btn" 
						@tap="tapClick(pageObj.btnObj.bindtap,{code: pageObj.repairCode})" >{{pageObj.btnObj.name}}</view>
					 -->	
    </view>
    <view class="weui-cell">
      <view class="weui-cell__bd">设备名称： {{pageObj.deviceName}}</view>
    </view>
    <view class="weui-cell">
      <view class="weui-cell__bd">房间： {{pageObj.roomName}}</view>
    </view>
    <view class="weui-cell">
      <view class="weui-cell__bd">报修人： {{pageObj.repairApplyName}}</view>
    </view>
    <view class="weui-cell myui-bd__ft">
      <view class="weui-cell__bd">手机号： {{pageObj.repairApplyPhone}}</view>
			<view class="myui-cell__bd" v-if="JSON.stringify(pageObj.callObj) != '{}'" @tap="tapClick(pageObj.callObj.bindtap,{phone:pageObj.repairApplyPhone })" >
        <image :src="callImage" class="myui-cell-image"></image>
      </view>
    </view>
    <view class="weui-cell">
      <view class="weui-cell__bd">学生报修描述： 
         <scroll-view scroll-y style="width: 100%;height: 2.9em;">
            {{pageObj.repairDesc}}</scroll-view> 
        <!-- <textarea bindinput="bindTextAreaBlur" maxlength="140" value="{{pageObj.repairDesc}}" style="width: 100%;height: 3.3em;"  disabled="true"/> -->
      </view>
    </view>
    <view class="weui-cell text-date img_bd" v-if="pageObj.images" >
		<view v-if="pageObj.images[0] != ''"  @tap="previewImage(0)"><img :src="pageObj.images[0]" class="img" /> </view>
      <view v-if="pageObj.images[1] != ''" @tap="previewImage(1)" ><img :src="pageObj.images[1]" class="img"/> </view>
    </view>
	<view class="weui-cell">
	    <view class="weui-cell__bd">维修工备注： 
		  <textarea :value="pageObj.repairRemarksOfMaintainer" style="width: 100%;height: 3.0em;"></textarea>
	    </view>
	  </view>
	  <view class="weui-cell text-date img_bd"  v-if="pageObj.imagesOfMaintainer!==''&& pageObj.imagesOfMaintainer!==null">
	    <view v-if="pageObj.imagesOfMaintainer[0] != ''" @tap="previewImages(0)"><img :src="pageObj.imagesOfMaintainer[0]" class="img"/> </view>
	    <view v-if="pageObj.imagesOfMaintainer[1] != ''" @tap="previewImages(1)"><img :src="pageObj.imagesOfMaintainer[1]" class="img"/> </view>
	  </view>
	  <view class="weui-cell">
	      <view class="weui-cell__bd" v-if="pageObj.deviceRepairCommentsEntity==null">学生评价描述： 
	         <scroll-view scroll-y style="width: 100%;height: 2.9em;">
	            {{pageObj.commentDesc}}</scroll-view> 
	        <!-- <textarea bindinput="bindTextAreaBlur" maxlength="140" value="{{pageObj.repairDesc}}" style="width: 100%;height: 3.3em;"  disabled="true"/> -->
	      </view>
	    </view>
		<view class="weui-cell text-date img_bd"  v-if="pageObj.commentImglist!==''&& pageObj.commentImglist!==null">
		  <view v-if="pageObj.commentImglist[0] != ''" @tap="previewImagess(0)"><img :src="pageObj.commentImglist[0]" class="img"/></view>
		  <view v-if="pageObj.commentImglist[1]!= ''" @tap="previewImagess(1)"><img :src="pageObj.commentImglist[1]" class="img"/> </view>
		</view>
		  </view>
</view>
</template>

<script>
var app = getApp();

export default {
  data() {
    return {
	};
  },

  components: {},
  props: {
    pageObj: {
      type: Object,
      default: () => ({})
    },
    callImage: {
      type: String,
      default: ""
    },
    fontSize: {
      type: Number,
      default: 15
    }
  },
  methods: {
	  previewImage: function (e) {
		  console.log(this.pageObj.images)
	    wx.previewImage({
			current:e,
	      // 当前显示图片的http链接
	  	   urls:this.pageObj.images
	  	
	      // 需要预览的图片http链接列表
	  
	    });
	  },
	  previewImages: function (e) {
	  		  console.log(this.pageObj.imagesOfMaintainer)
	    wx.previewImage({
	  			current:e,
	      // 当前显示图片的http链接
	  	   urls:this.pageObj.imagesOfMaintainer
	  	
	      // 需要预览的图片http链接列表
	  
	    });
	  },
	  previewImagess: function (e) {
	  		  console.log(this.pageObj.commentImglist)
	    wx.previewImage({
	  			current:e,
	      // 当前显示图片的http链接
	  	   urls:this.pageObj.commentImglist
	  	
	      // 需要预览的图片http链接列表
	  
	    });
	  },
		tapClick(tap,params){
			this[tap](params)
		},
    // 宿管端 - 分配师傅
    toDistribute: function (e) {
      console.log('分配维修师傅---', e);
      let repairCode = e.code;
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.repairDistributeUrl + '?repairCode=' + repairCode, 500);
    },
    // 宿管端 - 重新分配师傅
    toRedistribute: function (e) {
      console.log('重新分配---', e);
      let repairCode = e.code;
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.repairDistributeUrl + '?repairCode=' + repairCode + '&isAgainDistribution=1', 500);
    },

    //
    toCall: function (e) {
      console.log(e.phone);
      this.$emit('call', {
        detail: {
          phone: e.phone
        }
      });
    }
  }
};
</script>
<style>
@import "./repairDetail.css";
</style>