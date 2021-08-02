<template>
<scroll-view scroll-y :style="'height: ' + height + 'px;'" @scrolltolower="lower" :scroll-top="scrollTop" lower-threshold="1" upper-threshold="10" style="margin-bottom: 50px;">

      <view v-if="list.length==0">
        <view class="weui-cells__box" :style="'height:' + height + 'px'">暂无数据</view>
      </view>
      <view v-else class="myui__bd">

      <view v-for="(item, index) in list" :key="index">
        <view class="myui-cells">

          <view class="myui-cell">
            <view class="weui-cell__hd">
              <image src="/static/pages/repairModule/resources/pic/ic_type_other.png" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
            </view>
            <view class="weui-cell__bd">设备名称： {{item.deviceName}}</view>
            <view class="myui-cell__ft">状态： <text style="color:#20a4f7;">{{item.statusName}}</text></view>
          </view>

          <view class="weui-cell">
            <view class="weui-cell__hd" style="position: relative;margin-right: 10px;width: 50px; height: 50px; display: block;border: 1px #bbb solid;">
              <block v-if="item.image" type="flie">
                <img  class="weui-uploader__img" :src="item.image"  style="width: 50px;height: 50px;"/>
              </block>
            </view>
            <view class="myui-cell__bd" style="margin-left:10rpx;">
              <view style="font-size: 15px;color: #888888;">故障描述:
                <scroll-view scroll-y style="width: 16.6em;height: 3.0em;">
                {{item.repairDesc}}</scroll-view> 
                <!-- <textarea bindinput="bindTextAreaBlur" maxlength="140" value="{{item.repairDesc}}" style="width: 16.6em;height: 3.0em;"  disabled="true"/> -->
              </view>
            </view>
          </view>

         <view class="myui-cell__msg">
            <text class="cell__text">报修编号： {{item.repairCode}}</text>
            <text class="cell__text">创建时间： {{item.createdTime}}</text>
            <!-- 信息提示
            <view class="myui-bd__ft"> -->
              <view>{{item.msg}}</view>
              <!-- <view class v-if="item.callObj.isCall" @tap="item.callObj.bindtap" :data-phone="item.phoneOfMaintainer">
                <image :src="callImage" class="myui-cell-image"></image>
              </view> -->
            </view>
            <!-- 按钮 -->
            <view class="weui-flex">
                <view class="weui-flex__item"><view class="placeholder"></view></view>
              <!--  <view class="call_bn placeholder"  @tap="tapclick"="item.btnList[0].btnBind" :data-code="item.repairCode" :data-status="item.btnList[0].index" :data-name="item.userNameOfMaintainer">{{item.btnList[0].btnName}}</view>
                <view v-if="item.btnList.length==2" class="call_bn placeholder blue-btn" @tap="item.btnList[1].btnBind" :data-code="item.repairCode" :data-name="item.userNameOfMaintainer">{{item.btnList[1].btnName}}</view> -->			
								<view v-for="(items,index) in item.btnList" :key='index'
										class="call_bn placeholder" @tap="tapclick(items.btnBind,{code:item.repairCode, status:items.index,name:item.userNameOfMaintainer})"
									>{{items.btnName}}</view>
									
								
            </view>
          </view>
            
          </view>
        </view>
      </view>
    </scroll-view>
</template>

<script>
var selectFileImage=require("../../../pages/repairModule/resources/utils/uploadImage.js");
var app = getApp();

export default {
  data() {
    return {
			scrollTop:0,
		};
  },

  components: {},
  props: {
    list: {
      type: Array,
      default: () => []
    },
    role: {
      type: String,
      default: ''
    },
    btnList: {
      type: Array,
      default: () => []
    },
    callImage: {
      type: String,
      default:'',
    },
    height: {
      type: Number,
      default: 570
    },
    listLength: {
      type: Number,
      default: 1
    }
  },
  methods: {
	  onLoad:function(){
		  console.log(111111111)
		  this.selectFileImage(img)
	  },
		tapclick(tap,params){
			this[tap](params)
		},
    // 学生端 - 报修详情
    toDetail: function (e) {
			console.log(e)
      let repairCode = e.code;
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.studentRepairDetailUrl + '?repairCode=' + repairCode, 500);
    },
    // 学生端 - 评价
    toComment: function (e) {
      let repairCode = e.code;
      let nameOfMaintainer = e.name;
      console.log('nameOfMaintainer', nameOfMaintainer);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.studentRepairCommentUrl + '?repairCode=' + repairCode + '&nameOfMaintainer=' + nameOfMaintainer, 500);
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
    // 宿管端 - 报修详情
    toDetailOfDormAdmin: function (e) {
      let repairCode = e.code;
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.repairDetailUrl + '?repairCode=' + repairCode, 500);
    },
    //
    toCall: function (e) {
      console.log(e.phone);
      this.$emit('call', {
        detail: {
          phone: e.phone
        }
      });
    },

    // 处理
    toDeal: function (e) {
      let repairCode = e.code;
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.repairDetailOfMaintainUrl + '?repairCode=' + repairCode + '&isRefuse=false', 500);
    },
    // 维修完成
    toFinish: function (e) {
      let repairCode = e.code;
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.maintainFinishUrl + '?repairCode=' + repairCode, 500);
    },
    // 维修端 - 报修详情
    toDetailOfMaintain: function (e) {
			console.log(e)
      let repairCode = e.code;
      if (!status) {
        app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.repairDetailOfMaintainUrl + '?repairCode=' + repairCode, 500); // app.PublicUtil.navigateByUrl(app.PageUrl.repairPageUrl.repairDetailOfMaintainUrl + '?repairCode=' + repairCode + '&status=' + status, 500);
      }
    },
    // 上拉更新
    lower: function () {
      if (this.listLength != this.list.length) {
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
@import "./repairList.css";
</style>