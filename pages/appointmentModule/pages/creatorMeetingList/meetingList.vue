<template>
<view class="page">
  <view class="page__bd">
  
    <!-- navbar导航 -->
    <navbar class="navbor" id="navbor" :tabs="tabs" @clickTabs="bindClickTabs"></navbar>

    <scroll-view scroll-y :style="'height: ' + (windowHeight-statusHeight-h) + 'px;'" @scrolltolower="lower"  @scroll="scroll" lower-threshold="10" upper-threshold="10">

      <view class="myui__bd" v-if="pageObj.creatMeetingList.length==0 || pageObj.creatMeetingList == undefined">
        <msg-no-data msg="暂无数据"></msg-no-data>
      </view>

      <view v-else class="myui__bd">

        <view v-for="(item, index) in pageObj.creatMeetingList" :key="index" style="margin: 9rpx 10rpx;">

          <view class="weui-cells weui-cells_after-title" style="margin: 15rpx 0rpx 0rpx;">
            <view class="weui-cell">
              <view class="weui-cell__hd">
                <image :src="item.statusImage" style="margin-right: 5px;vertical-align: middle;width:23px; height: 25px;"></image>
              </view>
              <view class="weui-cell__bd">{{item.statusName}}</view>
              <view class="weui-cell__ft weui-cell__ft_in-access" @tap="toDetail({id:item.meetingId})"  style="font-size:14px;">详情</view>
            </view>
          </view>


          <view class="weui-cells weui-cells_after-title" style="font-size:15px;">
						<view @tap="toDetail({id:item.meetingId})" >
							<view class="weui-cell meetTitle" style="font-size:18px;font-weight:700;">{{item.meetingSubject}}</view>
							<view class="myui-cell">
								<view class="myui-cell__bd">房间号：</view>
								<view class="myui-cell__bf">{{item.meetingRoomName}}</view>
							</view>
							<view class="myui-cell">
								<view class="myui-cell__bd">会议类型：</view>
								<view class="myui-cell__bf">{{item.meetingType}}</view>
							</view>
							<view class="myui-cell">
								<view class="myui-cell__bd">开始时间：</view>
								<view class="myui-cell__bf">{{item.meetingStartTime}}</view>
							</view>
							<view class="myui-cell">
								<view class="myui-cell__bd">发起人：</view>
								<view class="myui-cell__bf">{{item.meetingInitiator}}</view>
							</view>
							<view class="myui-cell">
								<view class="myui-cell__bd">参会人员：</view>
								<view class="myui-cell__bf">{{item.meetingAttendee}}</view>
							</view>
							<view class="myui-cell" style="font-size:14px;">
								<view class="myui-cell__bd">发布于</view>
								<view class="myui-cell__bf"> {{item.createTime}} </view>
							</view>

						</view>
            <view class="myui-cell-bottom" style="font-size:16px;">
              <!-- 会议处理左边点击事件 -->
              <view :class="' myui-center ' + ((item.meetingStatus == 3 || item.meetingStatus == -1) && index == 0 ? 'dangerNotice ' :'') +  (index == 0? 'myui-cell-bottom__bd ' : 'myui-cell-bottom__fd') + ' '" 
							v-for="(items,index) in item.btn" :key="index"
							 @tap="tapClick(items.bindtap,{id:item.meetingId})"
							
							>{{items.name}}</view>

             <!-- <view class="myui-cell-bottom__fd myui-center" :data-id="item.meetingId" v-if="item.btn[1].name" @tap="item.btn[1].bindtap">{{item.btn[1].name}}</view> -->
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
var app = getApp();
var ImageUrl = require("../../resources/utils/imageUrl.js");
import navbar from "../../../../components/attendanceModule/navbar/navbar";
import msgNoData from "../../../../components/common/msgNoData/msgNoData";

export default {
  data() {
    return {
      //页面数据显示对象
      pageObj: {
				creatMeetingList:[]
			},
      //图片对象
      imageObj: ImageUrl,
      tabs: ["全部", "处理中", "未完成", "已完成", "已拒绝"],
      activeIndex: 0,
      //选中了哪一块
      // 1. 定义请求次数（即下拉刷新）
      pullDownNumber: 0,
      windowHeight: 0,
      h: 0,
      statusHeight: 23,
      nomore: false,
      //上拉加载结束提示
      isCanLoad: true,
      //用于控制下滑加载，从后台加载数量
      attanceCount: 0,
      scrollTop: 0,
      meetingType: ["内部会议", "开放式会议"]
    };
  },

  components: {
    navbar,
    msgNoData
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		let statusHeight = app.globalData.SystemInfo.statusBarHeight;
		console.log(statusHeight)
		
		uni.setNavigationBarTitle({
			title:"公共资源_会议记录"
		})
		
    this.setData({
			statusHeight,
      windowHeight: wx.getSystemInfoSync().windowHeight
    });
		
		var que = uni.createSelectorQuery().in(this);
		que.select('#navbor').boundingClientRect( (res)=> {
			console.log('获取元素高度',res);

			this.setData({
			  h: 50
			});
		}).exec();

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      nomore: false //上拉加载结束提示

    }); //进入页面加载

    this.attanceCount = 0;
    this.isCanLoad = true;
    let status = [];

    if (this.activeIndex == 4) {
      status = [-1];
    } else if (this.activeIndex == 3) {
      status = [3, -2];
    } else if (this.activeIndex == 2) {
      status = [1, 2];
    } else if (this.activeIndex == 1) {
      status = [0];
    } else {
      status = [0, 1, 2, 3, -1, -2];
    }

    this.getMeetingDetail(status, 2, 0);
    

    let _this = this;

   
  },
  //下拉更新
  onPullDownRefresh: function () {
    var _this = this;

    this.pageObj.creatMeetingList = [];

    _this.setData({
      // list: [],
      pullDownNumber: 0
    });

    let status = [];
    
    if (this.activeIndex == 4) {
      status = [-1];
    } else if (this.activeIndex == 3) {
      status = [3, -2];
    } else if (this.activeIndex == 2) {
      status = [1, 2];
    } else if (this.activeIndex == 1) {
      status = [0];
    } else {
      status = [0, 1, 2, 3, -1, -2];
    }
    
    this.getMeetingDetail(status, 2, 0);
  },
  onUnload: function () {
    wx.hideToast();
  },
  methods: {
		tapClick(tap,params){
			this[tap](params)
		},
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
      this.pageObj.creatMeetingList = [];
      this.pullDownNumber = 0;
      this.attanceCount = 0;
      this.isCanLoad = true;
      this.setData({
        pullDownNumber: 0,
        activeIndex: activeIndex
      });
      this.dealStatusByActiveIndex(activeIndex, 2, 0);
    },
    dealStatusByActiveIndex: function (activeIndex, take, skip) {
      let status = []; // 根据点击不同的navbar查询不同

      if (activeIndex == 0) {
        status = [0, 1, 2, 3, -1, -2];
      } else if (activeIndex == 1) {
        status = [0];
      } else if (activeIndex == 2) {
        status = [1, 2];
      } else if (activeIndex == 3) {
        status = [3, -2];
      } else if (activeIndex == 4) {
        status = [-1];
      } // if(this.data.isCanLoad){


      this.getMeetingDetail(status, take, skip); // }
    },

    /**
     * 获取会议列表
     */
    getMeetingDetail: function (status, take, skip) {
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.listByStatus + '?meetingStatus=' + status + '&userRole=1' + '&take=' + take + '&skip=' + skip,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取会议列表返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.dealPageObj(res.data.rows);

            _this.setData({
              nomore: false
            });
					
            if (res.data.rows.length != _this.attanceCount) {
              _this.pullDownNumber++;
              _this.attanceCount = res.data.rows.length;
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
        complete: function () {
          wx.hideToast({});
					uni.stopPullDownRefresh()
        }
      });
    },

    /**
     * 处理页面对象
     */
    dealPageObj: function (data) {
      let creatMeetingList = this.dealCreatMeeting(data);
      this.pageObj.creatMeetingList = creatMeetingList;
      console.log('页面数据-', this.pageObj);
      this.setData({
        pageObj: this.pageObj
      });
    },
    dealCreatMeeting: function (data) {
      let {
        meetingType
      } = this;
      var array = [];
      for (let i = 0; i < data.length; i++) {
        var obj = {};
        let meetingTypeIndex = data[i].meetingType - 1;
        obj.meetingId = data[i].meetingId;
        obj.meetingSubject = data[i].meetingSubject;
        obj.meetingRoomName = data[i].meetingRoomName;
        obj.meetingType = meetingType[meetingTypeIndex];
        obj.meetingStartTime = app.globalData.PublicUtil.formatTimeTwo(data[i].meetingStartTime, "Y-M-D h:m");
        obj.meetingInitiator = data[i].meetingInitiator;
        obj.createTime = data[i].createTime;
        obj.meetingStatus = data[i].meetingStatus; //会议状态
        // let btn = [];
        // let status = 2

        var status = data[i].meetingStatus;

        if (status == -1) {
          //审核不通过//已拒绝
          obj.statusName = '审核不通过';
          obj.statusImage = ImageUrl.unapprovePic;
          obj.btn = [{
            name: "删除会议",
            bindtap: "deleteMeeting"
          }, {
            name: "重新发起",
            bindtap: "createMeeting"
          }];
        } else if (status == 0) {
          //待审核//处理中
          obj.statusName = '待审核';
          obj.statusImage = ImageUrl.checkPendingPic;
          obj.btn = [{
            name: "取消会议",
            bindtap: "cancelMeeting"
          }, {
            name: "编辑会议",
            bindtap: "editMeeting"
          }];
        } else if (status == 1) {
          obj.statusName = '未开始';
          obj.statusImage = ImageUrl.nostartPic;
          obj.btn = [{
            name: "取消会议",
            bindtap: "cancelMeeting"
          }, {
            name: "开始签到",
            bindtap: "signIn"
          }];
        } else if (status == 2) {
          obj.statusName = '进行中';
          obj.statusImage = ImageUrl.readyStartingPic;
          let nowTimes = new Date().getTime();
          obj.btn = [{
            name: "取消会议",
            bindtap: "cancelMeeting"
          }, {
            name: "开始签到",
            bindtap: "signIn"
          }];
          console.log(nowTimes >= data[i].meetingStartTime);

          if (nowTimes >= data[i].meetingStartTime) {
            obj.btn = [{
              name: "开始签到",
              bindtap: "signIn"
            }];
          }
        } else if (status == -2) {
          obj.statusName = '已过期';
          obj.statusImage = ImageUrl.meetingOutPic;
        } else {
          //审核通过
          obj.statusName = '审核通过';
          obj.statusImage = ImageUrl.approvePic;

          if (status == 3) {
            //已完成
            obj.statusName = '已结束';
            obj.btn = [{
              name: "删除会议",
              bindtap: "deleteMeeting"
            }, {
              name: "查看统计",
              bindtap: "viewStatistics"
            }];
          } else {
            //未完成 
            console.log("未完成的会议---------------");
            obj.btn = [{
              name: "取消会议",
              bindtap: "cancelMeeting"
            }, {
              name: "开始签到",
              bindtap: "signIn"
            }];
          }
        } //参会人员


        obj.meetingAttendee = '';
        for (let j = 0; j < data[i].meetingAttendee.length; j++) {
          if (j == data[i].meetingAttendee.length - 1) {
            obj.meetingAttendee = obj.meetingAttendee + data[i].meetingAttendee[j].userName;
          } else {
            obj.meetingAttendee = obj.meetingAttendee + data[i].meetingAttendee[j].userName + '、';
          }
        }

        array[i] = obj;
      }

      return array;
    },
    //会议详情显示
    toDetail: function (e) {
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.meetingDetailUrl + '?meetingId=' + e.id, 500);
    },

    /**
      this.dealStatusByActiveIndex(0,2,0)
     * 取消,删除操作成功之后更新数据
     */
    //取消会议
    cancelMeeting: function (e) {
      let meetingId = e.id;

      let _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.showModal({
        title: '提示',
        content: '是否取消预约信息',
        cancelText: '否',
        confirmText: '是',
        confirmColor: '#20a4f7',

        success(res) {
          if (res.confirm) {
            //请求后台取消会议
            app.globalData.ShowMsgUtil.showLoadToast("正在取消...");
						app.globalData.ShowMsgUtil.netErrNotice();
            wx.request({
              url: app.globalData.RequestUrl.appointmentRequestUrl.cancelMeeting + '?meetingId=' + meetingId,
              method: 'POST',
              header: {
                'token': userInfoCach.token
              },
              data: {},
              success: function (res) {
                console.log('取消会议返回', res.data);

                if (res.data && res.data.code == 200) {
                  console.log('已取消该会议,刷新页面');
                  app.globalData.ShowMsgUtil.showSuccessToast("取消成功", 2000);

                  _this.reflesh(_this);
                } else {
                  app.globalData.ShowMsgUtil.showErrorModal('取消失败', res.data.msg, res.data.code);
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
          } else if (res.cancel) {}
        }

      });
    },
    //编辑会议 
    editMeeting: function (e) {
      //是否需要编辑预约信息
      wx.showModal({
        title: '提示',
        content: '是否编辑预约信息',
        cancelText: '否',
        confirmText: '是',
        confirmColor: '#20a4f7',

        success(res) {
          if (res.confirm) {
            //跳转到编辑预约界面
            app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
            app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.meetingOperationUrl + '?meetingId=' + e.id, 500); // 缓存当前信息
            // app.StorageUtil.set('',)
          } else if (res.cancel) {
            //跳转到编辑会议界面
            return;
          }
        }

      });
    },
    //创建会议
    createMeeting: function (e) {
      console.log("重新创建会议");
      let meetingId = e.id;
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500); //跳转到预约会议室界面。创建会议
      // app.PublicUtil.navigateByUrl(app.PageUrl.appointmentPageUrl.appointmentRoomUrl + '?meetingId=' + meetingId, 500); 

      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.meetingOperationUrl + '?meetingId=' + meetingId + '&isAgainApply=1', 500);
    },
    //删除会议
    deleteMeeting: function (e) {
      let meetingId = e.id;
      console.log(meetingId);

      let _this = this;

      wx.showModal({
        title: '提示',
        content: '是否删除预约信息',
        cancelText: '再想想',
        confirmText: '删除',
        confirmColor: '#20a4f7',

        success(res) {
          if (res.confirm) {
            //请求后台，删除会议
            const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
            wx.request({
              url: app.globalData.RequestUrl.appointmentRequestUrl.cancelMeeting + '?meetingId=' + meetingId,
              method: 'POST',
              header: {
                'token': userInfoCach.token
              },
              data: {},
              success: function (res) {
                console.log('删除会议返回', res.data);

                if (res.data && res.data.code == 200) {
                  console.log('已取删除会议,刷新页面');
                  app.globalData.ShowMsgUtil.showSuccessToast("删除成功", 2000);

                  _this.reflesh(_this);
                } else {
                  app.globalData.ShowMsgUtil.showErrorModal('删除失败', res.data.msg, res.data.code);
                  return;
                }
              },
              fail: function () {
                app.globalData.ShowMsgUtil.showNoneToastByFail();
              }
            });
          } else if (res.cancel) {}
        }

      });
    },

    // 刷新页面数据
    reflesh(that) {
      let _this = that;
      let status = [];

      if (_this.activeIndex == 4) {
        status = [-1];
      } else if (_this.activeIndex == 3) {
        status = [3, -3];
      } else if (_this.activeIndex == 2) {
        status = [1, 2];
      } else if (_this.activeIndex == 1) {
        status = [0];
      } else {
        status = [0, 1, 2, 3, -1, -3];
      }

      _this.getMeetingDetail(status, 2, 0);
    },

    //查看统计
    viewStatistics: function (e) {
			console.log(e)
      // console.log(e.currentTarget.dataset.id);
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500); //跳转到会议考勤统计界面 

      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendaceStatisticsUrl + '?meetingId=' + e.id, 500);
    },
    //开始签到
    signIn: function () {
      //考勤，打卡签到
      //跳转到打卡页面  attendAttendaceSignUrl
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendAttendaceSignUrl, 500);
    },

    /**
     * 上拉更新 
     */
    lower: function () {
      let _this = this;

      let status = [];

      if (_this.activeIndex == 4) {
        status = [-1];
      } else if (_this.activeIndex == 3) {
        status = [3, -2];
      } else if (_this.activeIndex == 2) {
        status = [1, 2];
      } else if (_this.activeIndex == 1) {
        status = [0];
      } else {
        status = [0, 1, 2, 3, -1, -2];
      }

      if (this.isCanLoad) {
        app.globalData.ShowMsgUtil.showLoadAndMsgToast();
		console.log(this.pullDownNumber);
        this.getMeetingDetail(status, (this.pullDownNumber + 1) * 2, 0);
		console.log(this.pullDownNumber);
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
@import "./meetingList.css";
</style>