<template>
<view class="page">
  <view class="page__bd">

    <!-- navbar导航 -->
    <navbar :tabs="tabs" @clickTabs="bindClickTabs"></navbar>

    <scroll-view scroll-y :style="'height: ' + (windowHeight*1.9-65) + 'rpx;'" @scrolltolower="lower" :scroll-top="scrollTop" lower-threshold="1" upper-threshold="10">
    
      <view v-if="pageObj.length==0">
        <msg-no-data msg="暂无数据"></msg-no-data>
      </view>
    
      <view v-else class="myui__bd">
      <view v-for="(item, index) in pageObj" :key="index" style="margin: 9rpx 10rpx;">

        <view class="weui-cells weui-cells_after-title" style="margin: 15rpx 0rpx 0rpx;">
            <view class="weui-cell">
              <view class="weui-cell__hd">
                  <image :src="item.statusImage" style="margin-right: 5px;vertical-align: middle;width:23px; height: 25px;"></image>
              </view>
              <view class="weui-cell__bd">{{item.statusName}}</view>
              <view class="weui-cell__ft weui-cell__ft_in-access" 
								@tap="toDetail({id:item.meetingId,status:item.status })"  style="font-size:14px;">查看</view>
            </view>
        </view> 

        <view class="weui-cells weui-cells_after-title" 
						style="font-size:15px;padding: 0rpx 0rpx 20rpx;"
						@tap="toDetail({id:item.meetingId,status:item.status })">
            <view class="weui-cell meetTitle" style="font-size:18px;font-weight:700;">{{item.meetingTitle}}</view>
            <view class="myui-cell">
              <view class="myui-cell__bd">房间号：</view>
              <view class="myui-cell__bf">{{item.meetingRoomName}}</view>
            </view>
            <view class="myui-cell">
              <view class="myui-cell__bd">会议类型：</view>
              <view class="myui-cell__bf">
              <view v-if="item.meetingType==1">
                  内部会议
              </view>
               <view v-if="item.meetingType==2">
                  开放会议
              </view>
              </view>
            </view>
            <view class="myui-cell">
              <view class="myui-cell__bd">会议时间：</view>
              <view class="myui-cell__bf">{{item.meetingTime}}</view>
            </view>
						
            <view class="myui-cell">
              <view class="myui-cell__bd">发起人：</view>
              <view class="myui-cell__bf">{{item.meetingInitiator}}</view>
            </view>
            <view class="myui-cell" style="font-size:14px;margin: 10rpx 0rpx 0rpx;">
              <view class="myui-cell__bf">发布于 {{item.createTime}}</view>
            </view>

        </view> 

      </view>    
      </view> 
      
      
      <view v-if="pageObj.length>0 && nomore" style="margin-top:-300rpx;">
        <msg-no-data msg="到底了"></msg-no-data>
      </view>
    </scroll-view>
     

  </view>
</view>
</template>

<script>
var app = getApp();
var ImageUrl = require("../../resources/utils/imageUrl.js");
import navbar from "../../../../components/attendanceModule/navbar/navbar";
import msgNoData from "../../../../components/common/msgNoData/msgNoData";

export default {
  data() {
    return {
      //页面数据显示对象
      pageObj: {},
      //图片对象
      imageObj: ImageUrl,
      tabs: ["全部", "未开始", "进行中", "已完成"],
      activeIndex: 0,
      //选中了哪一块
      countries: ["内部会议", "开放式会议"],
      // 1. 定义请求次数（即下拉刷新）
      pullDownNumber: 0,
      windowHeight: 0,
      //用于控制下滑加载，从后台加载数量
      isCanLoad: true,
      attanceCount: 0,
      nomore: false,
			scrollTop:0,
			type:-1,
    };
  },

  components: {
    navbar,
    msgNoData
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log(options)
		if(options.type){
			if(options.type == 'kqlb'){
				uni.setNavigationBarTitle({
				  title: "考勤_会议考勤_列表"
				});
				
			}else{
				uni.setNavigationBarTitle({
				  title: "考勤_会议考勤_参会记录"
				});
			}
			this.setData({
				type: options.type
			})
		}
		
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    });
    this.attanceCount = 0;
    this.isCanLoad = true;

    if (this.activeIndex == 3) {
      let meetingStatus = [3];
      this.listByStatus(meetingStatus, 3, 0);
    } else if (this.activeIndex == 2) {
      let meetingStatus = [2];
      this.listByStatus(meetingStatus, 3, 0);
    } else if (this.activeIndex == 1) {
      let meetingStatus = [1];
      this.listByStatus(meetingStatus, 3, 0);
    } else if (this.activeIndex == 0) {
      let meetingStatus = [1, 2, 3];
      this.listByStatus(meetingStatus, 3, 0);
    }

    this.setData({
      nomore: false
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},
  methods: {
    /**
       * 会议列表
       * -1 "拒绝", 0 "申请中",
       *  1 "准备中", 2 "正在进行", 3 "已结束";
       * 
       * 未开始 0 审批未通过的会议不给予请假  即将开始1 -->申请请假  进行中 2 --->申请补卡  已结束 3 --->请假同意  补签状态 同意 拒绝  
       */
    listByStatus: function (meetingStatus, take, skip) {
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.listByStatus + '?take=' + take + '&skip=' + skip + '&userRole=2&meetingStatus=' + meetingStatus,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('会议列表', res.data);

          if (res.data && res.data.code == 200) {
            _this.dealPageObj(res.data.rows);

            if (res.data.rows.length == _this.attanceCount) {
              //没有新的数据
              _this.setData({
                isCanLoad: false,
                nomore: true
              });
            } else {
              _this.pullDownNumber++;
              _this.attanceCount = res.data.rows.length;
              _this.isCanLoad = true;
            }
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideToast({});
        }
      });
    },

    /**
     * 处理页面数据
     */
    dealPageObj: function (rows) {
      let {
        countries
      } = this;
      let array = [];

      for (let i = 0; i < rows.length; i++) {
        let obj = {};
        obj.meetingId = rows[i].meetingId;
        obj.meetingTitle = rows[i].meetingSubject;
        obj.meetingRoomName = rows[i].meetingRoomName;
        obj.meetingType = rows[i].meetingType;
        obj.meetingTime = app.globalData.PublicUtil.formatTimeTwo(rows[i].meetingStartTime, 'Y-M-D h:m') + '-' + app.globalData.PublicUtil.formatTimeTwo(rows[i].meetingEndTime, 'h:m');
        obj.meetingInitiator = rows[i].meetingInitiator;
        obj.createTime = rows[i].createTime; // rows[i].meetingStatus = 2

        if (rows[i].meetingStatus == 3) {
          obj.statusName = '已结束';
          obj.statusImage = ImageUrl.approvePic;
          obj.status = 4;
        } else if (rows[i].meetingStatus == 2) {
          obj.statusName = '会议进行中';
          obj.statusImage = ImageUrl.readyStartPic;
          obj.status = 3;
        } else if (rows[i].meetingStatus == 1) {
          obj.statusName = '即将开始';
          obj.statusImage = ImageUrl.readyStartingPic;
          obj.status = 2;
        } else if (rows[i].meetingStatus == 0) {
          obj.statusName = '正在审批中';
          obj.statusImage = ImageUrl.checkPendingPic;
          obj.status = 1;
        } else {
          obj.statusName = '预约审核失败';
          obj.statusImage = ImageUrl.unapprovePic;
          obj.status = 0;
        }

        array[i] = obj;
      }

      console.log('array-', array);
      this.setData({
        pageObj: array
      });
    },

    /**
       * 点击navbar
       * 
       * 每请求一次对应的计数加一。当改变activeIndex时，下拉刷新时计数清空。
       */
    bindClickTabs: function (e) {
      this.attanceCount = 0;
      this.pullDownNumber = 0;
      let activeIndex = e.detail.activeIndex;
      this.pageObj.creatMeetingList = [];
      this.setData({
        isCanLoad: true,
        pageObj: [],
        activeIndex: activeIndex,
        nomore: false
      });

      if (activeIndex == 3) {
        let meetingStatus = [3];
        this.listByStatus(meetingStatus, 3, 0);
      } else if (activeIndex == 2) {
        let meetingStatus = [2];
        this.listByStatus(meetingStatus, 3, 0);
      } else if (activeIndex == 1) {
        let meetingStatus = [1];
        this.listByStatus(meetingStatus, 3, 0);
      } else {
        let meetingStatus = [1, 2, 3];
        this.listByStatus(meetingStatus, 3, 0);
      }
    },
    //上滑加载更多
    lower: function () {
      var _this = this;

      let meetingStatus = [];

      if (_this.activeIndex == 3) {
        meetingStatus = [3];
      } else if (_this.activeIndex == 2) {
        meetingStatus = [2];
      } else if (_this.activeIndex == 1) {
        meetingStatus = [1];
      } else {
        meetingStatus = [1, 2, 3];
      }

      if (this.isCanLoad) {
        this.listByStatus(meetingStatus, (_this.pullDownNumber + 1) * 3, 0);
      }
    },
    scroll: function (event) {// this.setData({
      //   scrollTop: event.detail.scrollTop
      // });
    },
    toDetail: function (e) {
      // e.target.dataset.id = 1
      console.log(e); //跳转到会议考勤详情

      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendMeetingDetailUrl + '?meetingId=' + e.id + '&status=' + e.status +"&type="+this.type, 500);
    }
  }
};
</script>
<style>
@import "./attendMeetingList.css";
</style>