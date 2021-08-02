<template>
<view class="page">
  <view class="page__bd">
    <view class="weui-tab">
    
      <!-- navbar导航 -->
      <navbar-two :tabs="tabs" @clickTabs="bindClickTabs"></navbar-two>

      <view class=" weui-tab__panel">
        <scroll-view scroll-y :style="'height: ' + (scrollHeight-60) + 'px;'" @scrolltolower="lower" @scroll="scroll" :scroll-top="scrollTop" lower-threshold="1" upper-threshold="10">
          <view :hidden="activeIndex != 0" style="margin: 0rpx 10rpx;">
            <check-pending-list :list="waitList" @refuse="bindRefuse" @agree="bindAgree"></check-pending-list>
            <view v-if="waitList.length <= 0" style="width:100%; text-align:center;margin-top:30rpx">暂无数据</view>

          </view>
          <view class :hidden="activeIndex != 1" style="margin: 0rpx 10rpx;">
            <check-finish-list :list="finishList"></check-finish-list>
            <view v-if="finishList.length <= 0" style="width:100%; text-align:center;margin-top:30rpx">暂无数据</view>
          </view>
        </scroll-view>
      </view>
    
    </view>
  </view>
</view>
</template>

<script>
var app = getApp();
var applyCountOfWait = 0;
var applyCountOfFinish = 1;
import navbarTwo from "../../../../components/common/navBarTwo/navBarTwo";
import checkPendingList from "../../../../components/attendanceModule/checkPendingList/checkPendingList";
import checkFinishList from "../../../../components/attendanceModule/checkFinishList/checkFinishList";

export default {
  data() {
    return {
      tabs: ["待办（0）", "已处理（0）"],
      activeIndex: '',
      //选中了哪一块
      waitList: [],
      finishList: [],
      // 1. 定义请求次数（即下拉刷新）
      pullDownNumberOfWait: 0,
      pullDownNumberOfFinish: 0,
      scrollTop: 0,
      windowHeight: 0 //获取屏幕高度
      ,
      scrollHeight: ""
    };
  },

  components: {
    navbarTwo,
    checkPendingList,
    checkFinishList
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    });
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    this.getWaitingApproval(3, 0);
    this.getProcessedApproval(3, 0);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('------------------------审核管理------------------------');
    this.getWaitingApproval(3, 0);
    this.getProcessedApproval(3, 0);
  },
  //下拉更新
  onPullDownRefresh: function () {
    var _this = this;

    _this.setData({
      waitList: [],
      finishList: [],
      pullDownNumberOfFinish: 0,
      pullDownNumberOfWait: 0
    });

    if (_this.activeIndex == 0) {
      this.getWaitingApproval(3, 0);
    } else if (_this.activeIndex == 1) {
      this.getProcessedApproval(3, 0);
    }
  },
  methods: {
    /**
     * 请求待办
     */
    getWaitingApproval: function (take, skip) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.getWaitingApproval,
        data: {
          teacherId: userInfoCach.personId,
          take: take,
          skip: skip
        },
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('请求待办列表查询返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.pullDownNumberOfWait++;

            let array = _this.dealShowWait(res.data.rows.responseList);

            applyCountOfWait = res.data.rows.applyCount;

            _this.setData({
              ['tabs[' + 0 + ']']: '待办（' + res.data.rows.applyCount + '）',
              waitList: array
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
    // 处理待办显示数据
    dealShowWait: function (data) {
      let array = [];
      let obj = {};

      for (var i = 0; i < data.length; i++) {
        obj.personName = data[i].personName;
        obj.reason = data[i].reason;
        obj.startTime = data[i].startTime;
        obj.endTime = data[i].endTime;
        obj.images = data[i].images;
        obj.applyTime = app.globalData.PublicUtil.formatTimeTwo(data[i].executeTime, 'Y-M-D');
        obj.nowTime = app.globalData.PublicUtil.formatTimeTwo(data[i].applyTime, 'Y-M-D h:m');
        obj.applyId = data[i].id;
        obj.handlerResult = data[i].handlerResult;
        array[i] = obj;
      }

      return array;
    },

    /**
     * 点击navbar
     * 
     * 每请求一次对应的计数加一。当改变activeIndex时，下拉刷新时计数清空。
     */
    bindClickTabs: function (e) {
      console.log('navbar组件点击', e.detail.activeIndex);
      let actionIndex = e.detail.activeIndex;
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      this.setData({
        activeIndex: actionIndex
      });

      if (actionIndex == 0) {
        this.getWaitingApproval(3, 0); // 已处理的上拉计数清0

        this.setData({
          pullDownNumberOfFinish: 0
        });
      } else if (actionIndex == 1) {
        this.getProcessedApproval(3, 0); // 待办的上拉技术清0

        this.setData({
          pullDownNumberOfWait: 0
        });
      }
    },

    /**
     * 点击拒绝 
     */
    bindRefuse: function (e) {
      // console.log('点击拒绝', e);
      let applyId = e.detail.applyId;
      let type = e.detail.type;
      this.handleApproval(applyId, type);
    },

    /**
     * 点击同意
     */
    bindAgree: function (e) {
      // console.log('点击同意', e);
      let applyId = e.detail.applyId;
      let type = e.detail.type;
      this.handleApproval(applyId, type);
    },

    /**
     * 审核处理
     */
    handleApproval: function (applyId, type) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      console.log('applyId', applyId);
      console.log('type', type);
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.handleApproval,
        data: {
          personId: userInfoCach.personId,
          personType: userInfoCach.personType,
          applyId: applyId,
          type: type
        },
        method: 'PUT',
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        success: function (res) {
          console.log('审核处理返回', res.data);

          if (res.data && res.data.code == 200) {
            if (type == 13) {
              app.globalData.ShowMsgUtil.showSuccessToast("拒绝成功", 2000);
            } else if (type == 12) {
              app.globalData.ShowMsgUtil.showSuccessToast("同意成功", 2000);
            } // 更新页面


            setTimeout(function () {
              _this.getWaitingApproval(3, 0);
            }, 2000);
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

    /**
     * 获取已处理
     */
    getProcessedApproval: function (take, skip) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.getProcessedApproval,
        data: {
          teacherId: userInfoCach.personId,
          take: take,
          skip: skip
        },
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取已处理列表查询返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.pullDownNumberOfFinish++;

            let array = _this.dealShowWait(res.data.rows.responseList);

            applyCountOfFinish = res.data.rows.applyCount;

            _this.setData({
              ['tabs[' + 1 + ']']: '已处理（' + res.data.rows.applyCount + '）',
              finishList: array
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
    //上滑加载更多
    lower: function () {
      var _this = this;

      if (_this.activeIndex == 0) {
        if (applyCountOfWait > _this.waitList.length) {
          this.getWaitingApproval((_this.pullDownNumberOfWait + 1) * 3, 0);
        }
      } else if (_this.activeIndex == 1) {
        if (applyCountOfFinish > _this.finishList.length) {
          this.getProcessedApproval((_this.pullDownNumberOfFinish + 1) * 3, 0);
        }
      }
    },
    scroll: function (event) {
      this.setData({
        scrollTop: event.detail.scrollTop
      });
    }
  }
};
</script>
<style>
@import "./approveManage.css";
</style>