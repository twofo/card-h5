<template>
<!--pages/indexModule//pages/inOrOutSchoolList/inOrOutSchoolList.wxml-->
<view class="page">
  <view class="page__bd">
    <!-- navbar导航 -->
    <navbar class="navbor" :tabs="tabs" @clickTabs="bindClickTabs"></navbar>
    <scroll-view scroll-y :style="'height: ' + (windowHeight-statusHeight-h) + 'px;'" 
			@scrolltolower="lower" :scroll-top="scrollTop" @scroll="scroll" lower-threshold="10" upper-threshold="10">
      <view class="myui__bd" v-if="pageObj.list.length==0 || pageObj.list == undefined">
        <msg-no-data msg="暂无数据"></msg-no-data>
      </view>
      <view v-else class="myui__bd">
        <view v-for="(item, index) in pageObj.list" :key="index" style="margin: 9rpx 10rpx;">
          <view class="weui-cells weui-cells_after-title" style="margin: 15rpx 0rpx 0rpx;">
            <view class="weui-cell">
              <!-- <view class="weui-cell__hd">
                <image src="{{item.statusImage}}" style="margin-right: 5px;vertical-align: middle;width:23px; height: 25px;"></image>
              </view> -->
              <view class="weui-cell__bd" style="color:#20a4f7">{{item.statusName}}</view>
              <view class="weui-cell__ft weui-cell__ft_in-access" @tap="toDetail" :data-id="item.id" style="font-size:14px;" v-if="messagecontent">详情</view>
			    <view class="weui-cell__ft weui-cell__ft_in-access" @tap="toDeta":data-ind="index" style="font-size:14px;" v-if="messagecon">详情</view>
            </view>
          </view>
          <view class="weui-cells weui-cells_after-title myui-cells" style="font-size:15px;">
            <view class="weui-cell" style="font-size:18px;font-weight:700;">{{item.title}}</view>
            <view class="myui-cell" v-if="timeshow">
              <view class="myui-cell__bd" >申请时间段：</view>
              <view class="myui-cell__bf">{{item.time}}</view>
            </view>
			<view class="myui-cell" v-if="timesh">
			  <view class="myui-cell__bd" >申请时间：</view>
			  <view class="myui-cell__bf">{{item.time}}</view>
			</view>
            <view class="myui-cell" v-if='fudaotelpjone'>
              <view class="myui-cell__bd">铺导员：</view>
              <view class="myui-cell__bf">{{item.approvalUserName}}</view>
            </view>
			<view class="myui-cell" v-if='username'>
			  <view class="myui-cell__bd">用户姓名</view>
			  <view class="myui-cell__bf">{{item.approvalUserName}}</view>
			</view>
            <view class="myui-cell" v-if="fudaotelpjone">
              <view class="myui-cell__bd">铺导员电话：</view>
              <view class="myui-cell__bf" style="color:#20a4f7" @tap="makePhoneCall" :data-mobile="item.approvalUserPhone" :data-name="item.approvalUserName">{{item.approvalUserPhone}}</view>
            </view>
            <view class="myui-cell myui-time" style>
              <view class="myui-cell__bd">发布于</view>
              <view class="myui-cell__bf"> {{item.applyTime}} </view>
            </view>
          </view>
        </view>
        <view class="myui__bd" style="margin-top:-300rpx;" v-if="nomore">
          <msg-no-data msg="到底了"></msg-no-data>
        </view>
      </view>
    </scroll-view>
  </view>
</view>
</template>
<script>
// pages/indexModule//pages/inOrOutSchoolList/inOrOutSchoolList.js
var app = getApp();
var ImageUrl = require("../../resources/utils/imageUrl.js");
import navbar from "../../../../components/attendanceModule/navbar/navbar";
import msgNoData from "../../../../components/common/msgNoData/msgNoData";
export default {
  data() {
    return {
      //页面数据显示对象
      pageObj: {
				list:[]
			},
      //图片对象
      imageObj: ImageUrl,
	  //1 2 3 
      // tabs: ["留校", "外宿","退宿"],
	  tabs: [ "退宿","外宿","留校"],
      activeIndex: 0,
      //选中了哪一块
      // 1. 定义请求次数（即下拉刷新）
      pullDownNumber: 0,
      windowHeight: 0,
	  fudaotelpjone:true,
      h: 0,
      statusHeight: 23,
      nomore: false,
      //上拉加载结束提示
      isCanLoad: true,
      //用于控制下滑加载，从后台加载数量
      recordCount: 0,
      scrollTop: 0,
	  commlist:'',
	  timeshow:false,
	  timesh:true,
	  username:true,
	  messagecontent:false,
	  messagecon:true,
	  refundmessage:[],
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
	   this.handleListRecord(3, 0, 10);
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	    app.globalData.StorageUtil.remove('inOrOut');
    this.setData({
      nomore: false //上拉加载结束提示

    }); //进入页面加载
    this.recordCount = 0;
    this.isCanLoad = true;
	console.log('4412');
    var que = wx.createSelectorQuery();
    let _this = this;
    let statusHeight = app.globalData.SystemInfo.statusBarHeight;
    this.setData({
      statusHeight
    });
    // que.select('.navbor').boundingClientRect(function (res) {
    //   console.log(res.height);

      _this.setData({
        h: 50
      });
    // }).exec();
  },
  //下拉更新
  onPullDownRefresh: function () {
    var _this = this;
    this.pageObj.list = [];
    _this.setData({
      // list: [],
      pullDownNumber: 0
    });
	let artlist;
	console.log(this.commlist);
	if(this.commlist==0){
		artlist=3;
	};
	if(this.commlist==1){
		artlist=2;
	}
	if(this.commlist==2){
		artlist=1;
	}
   console.log(this.commlist);
    this.handleListRecord(artlist,0, 2);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    /**
     * 点击navbar
     * 
     * 每请求一次对应的计数加一。当改变activeIndex时，下拉刷新时计数清空。
     */
    bindClickTabs: function (e) {
      this.setData({
        nomore: false
      });
      let activeIndex = e.detail.activeIndex;
	  this.commlist=e.detail.activeIndex;
	  console.log(this.commlist);
      this.pageObj.list = [];
      this.pullDownNumber = 0;
      this.recordCount = 0;
      this.isCanLoad = true;
      this.setData({
        pullDownNumber: 0,
        activeIndex: activeIndex
      });
      this.dealStatusByActiveIndex(activeIndex, 2, 0);
    },
    dealStatusByActiveIndex: function (activeIndex, take, skip) {
      let applyType = []; // 根据点击不同的navbar查询不同
      if (activeIndex == 0) {
        applyType = 3;
      } else if (activeIndex == 1) {
        applyType = 2;
      } else if (activeIndex == 2) {
        applyType = 1;
      } 
	  // if(this.data.isCanLoad){
      this.handleListRecord(applyType, skip, take); // }
    },
    handleListRecord: function (applyType, skip, take) {
      var _this = this;
	 app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.inOrOutSchoolLists + '?applyType=' + applyType + '&skip=' + skip + '&take=' + take,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取申请列表返回', res.data);
		  _this.refundmessage=res.data;
		  
          if (res.data && res.data.code == 200) {
            let pageObj = _this.dealPageObj(res.data.data);

            _this.setData({
              pageObj: pageObj
            });

            _this.setData({
              nomore: false
            });

            if (res.data.data.length != _this.recordCount) {
              _this.pullDownNumber++;
              _this.recordCount = res.data.data.length;
              _this.isCanLoad = true;
            } else {
              console.log('没有数据更新');
              _this.setData({
                isCanLoad: false,
                nomore: true
              });

              console.log(_this.nomore);
            }
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
				complete:function(){
					uni.stopPullDownRefresh()
				}
      });
    },
	
    dealPageObj: function (rows) {
      let pageObj = {};
      let list = [];
	  console.log(this.commlist);
       console.log(rows.length);
      for (let i = 0; i < rows.length; i++) {
        let obj = {};
        obj.id = rows[i].id;
        obj.title = rows[i].title;
        obj.status = rows[i].status;
        obj.statusName = this.handleStatus(rows[i].status);
        obj.applyTime = rows[i].applyTime;
        obj.time = rows[i].applyStartTime + ' - ' + rows[i].applyEndTime;
        obj.approvalUserName = rows[i].approvalUserName;
        obj.approvalUserPhone = rows[i].approvalUserPhone;
		obj.userName=rows[i].userName;
		if(this.commlist==0){
		  obj.statusName = '退宿申请';
		  obj.applyTime = rows[i].createTime
		    obj.time =rows[i].createTime;
			  obj.approvalUserName=rows[i].name;
			  this.timesh=true
			 this.fudaotelpjone=false;
			 this.timeshow=false;
			 this.username=true;
			 this.messagecon=true;
			 	this.messagecontent=false;
		}else{
			 this.messagecon=false;
			  this.timesh=false;
			   this.timeshow=true;
			this.fudaotelpjone=true;
			this.username=false;
			this.messagecontent=true;
		}
        list[i] = obj;
      }
      pageObj.list = list;
      console.log("页面显示数据 - ", list);
      return pageObj;
    },
    handleStatus: function (status) {
      switch (status) {
        case -1:
          return "审核拒绝";

        case 0:
          return "申请中";

        case 1:
          return "审核通过";

        default:
          return "未知";
      }
    },

    makePhoneCall(e) {
      let phone = e.currentTarget.dataset.mobile;
      let name = e.currentTarget.dataset.name;
      wx.showModal({
        title: '呼叫',
        content: '拨打' + name + '的电话' + phone,
        cancelText: '取消',
        confirmText: '拨打',
        confirmColor: '#20a4f7',

        success(res) {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: phone
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }

      });
    },

    //会议详情显示
    toDetail: function (e) {
		console.log(e);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.inOrOutSchoolDetailUrl + '?recordId=' + e.target.dataset.id, 500);
    },
	toDeta:function(e){
		console.log(e);
		let index = e.currentTarget.dataset.ind;
		console.log(index);
		// let refundeindex;
		// refundeindex=e.target.dataset.ind;
		// console.log(refundeindex);
		console.log(this.refundmessage.data[index])
		 app.globalData.StorageUtil.set('inOrOut', this.refundmessage.data[index]);
		 app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.inOrOut ,500);    
	},
    // 刷新页面数据
    reflesh(that) {
      let _this = that;
      let applyType = 0;

      if (_this.activeIndex == 2) {
        applyType = 3;
      } else if (_this.activeIndex == 1) {
        applyType = 2;
      } else if (_this.activeIndex == 0) {
        applyType = 1;
      }
      this.handleListRecord(applyType, 0, 2);
    },
    /**
     * 上拉更新 
     */
    lower: function () {
		console.log('41');
      let _this = this;
       console.log(_this.activeIndex)
      let applyType = 0;
      if (_this.activeIndex == 2) {
        applyType = 1;
      } else if (_this.activeIndex == 1) {
        applyType = 2;
      } else if (_this.activeIndex == 0) {
        applyType = 3;
      }
      if (this.isCanLoad) {
        app.globalData.ShowMsgUtil.showLoadAndMsgToast();
        this.handleListRecord(applyType, 0, (this.pullDownNumber + 1) * 2);
      }
    },

    scroll(event) {// this.setData({
      //   scrollTop: event.detail.scrollTop
      // })
    }

  }
};
</script>
<style>
@import "./inOrOutSchoolList.css";
</style>