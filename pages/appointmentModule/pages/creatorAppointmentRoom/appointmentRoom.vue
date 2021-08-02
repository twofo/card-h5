<template>
<view class="pages">
  <view class="roomsList">
		<view class="roomsTitle">场所预约</view>
		<view v-for="(item, index) in builds" :key="index" class="roomsItem" v-if="builds.length > 0">
			<view class="leftItem">
				<image :src="item.imgUrl" style="width: 80rpx;" mode="widthFix"></image>
				<view class="roomsInfo">
					<text>{{item.name}}</text>
					<text class="roomsDesc">{{item.dect}}</text>
				</view>
			</view>
			<view class="right" :data-type="item.id" @tap="bindConfirm">
				<text>预定</text>
			</view>
		</view>
		<view v-if="builds.length == 0" class="nomore">
			暂无可选场所
		</view>
  </view>
</view>
</template>

<script>
var app = getApp();
var ImageUrl = require("../../resources/utils/imageUrl.js");
import msgSelect from "../../../../components/common/msgSelect/msgSelect";
import searchInp from "../../../../components/attendanceModule/searchAppiontPerson/searchAppiontPerson";

export default {
  data() {
    return {
      //页面数据显示对象
      pageObj: {},
      //查询所有房间集合
      //图片对象
      imageObj: ImageUrl,
      selectBuildIndex: 1,
      builds: [//房间类型
      {
        id: 1,
        name: '会议室',
        imgUrl: ImageUrl.meetingRoomPic,
        dect: "预定个人或团地开会场所",
      }, {
        id: 2,
        name: '琴房',
        imgUrl: ImageUrl.pianoRoomPic,
        dect: "个人预定练琴房场所"
      }
	  
	  , {
        id: 3,
        name: '练功房',
        imgUrl: ImageUrl.dancingPic,
        dect: "个人预定练功场所"
      },
	  
	  ]
    };
  },

  components: {
    msgSelect,
    searchInp
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  onShow:function(){
  	 const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
	 console.log(userInfoCach.personType);
	 if(userInfoCach.personType==1){
		 this.builds=[
			 
				 {
				   id: 1,
				   name: '会议室',
				   imgUrl: ImageUrl.meetingRoomPic,
				   dect: "预定个人或团地开会场所"
				 }, {
				   id: 2,
				   name: '琴房',
				   imgUrl: ImageUrl.pianoRoomPic,
				   dect: "个人预定练琴房场所"
				 }, {
				   id: 3,
				   name: '练功房',
				   imgUrl: ImageUrl.dancingPic,
				   dect: "个人预定练功场所"
				 },
			 
		 ]
	 }else{
		 this.builds=[
		 			 
		 			 {
		 				   id: 2,
		 				   name: '琴房',
		 				   imgUrl: ImageUrl.pianoRoomPic,
		 				   dect: "个人预定练琴房场所"
		 				 }
						 // , {
		 				//    id: 3,
		 				//    name: '练功房',
		 				//    imgUrl: ImageUrl.dancingPic,
		 				//    dect: "个人预定练功场所"
		 				//  },
		 			 
		 ]
	 }
	 console.log(this.builds);
  },
  methods: {
    getAllRoomByType: function (roomType) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAllRoomByType + '?roomType=' + roomType,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('根据区域类型获取所有房间', res.data);

          if (res.data && res.data.code == 200) {
            _this.setData({
              'pageObj': res.data.rows
            });
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
    //点击确认
    bindConfirm: function (e) {
      //跳转到预约时间页面 1 会议室  2琴房   3练功房
      // console.log(e.currentTarget.dataset.type)
      let type = e.currentTarget.dataset.type;

      if (type == 1) {
        app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.meetingOperationUrl, 500);
      } else {
        app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.appiontPianoRoomUrl + "?type=" + type, 500);
      } // app.PublicUtil.navigateByUrl(app.PageUrl.appointmentPageUrl.appointmentTimeUrl + "&type=" + this.data.Editype, 500);

    }
  }
};
</script>
<style>
@import "./appointmentRoom.css";
</style>