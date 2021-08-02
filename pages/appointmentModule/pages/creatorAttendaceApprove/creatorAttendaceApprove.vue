<template>
<view class="page">
  <view class="page__bd">
    <view class="weui-tab">
    
      <!-- navbar导航 -->
      <navbar-two :tabs="tabs" @clickTabs="bindClickTabs"></navbar-two>

      <view class=" weui-tab__panel">
        <scroll-view scroll-y :style="'height: ' + (windowHeight*1.9-65) + 'rpx;'" @scrolltolower="lower" @scroll="scroll" :scroll-top="scrollTop" lower-threshold="1" upper-threshold="10">
          <!-- 待办 -->
          <view :hidden="activeIndex != 0" style="margin: 0rpx 10rpx;">
            <approval-pending-list :list="waitList" @detail="bindDetail" @refuse="bindRefuse" @agree="bindAgree" :windowHeight="windowHeight"></approval-pending-list>
          </view>

          <!-- 已处理 -->
          <view class :hidden="activeIndex != 1" style="margin: 0rpx 10rpx;">
            <approval-finish-list :list="finishList" @detail="bindDetail" :windowHeight="windowHeight"></approval-finish-list>
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
import approvalPendingList from "../../resources/components/approvalPendingList/approvalPendingList";
import approvalFinishList from "../../resources/components/approvalFinishList/approvalFinishList";

export default {
  data() {
    return {
      tabs: ["待办（0）", "已处理（0）"],
      activeIndex: 0,
      //选中了哪一块
      windowHeight: 0,
      //获取屏幕高度
      waitList: [],
      finishList: [],
      // 定义请求次数（即下拉刷新）
      pullDownNumberOfWait: 0,
      pullDownNumberOfFinish: 0,
      scrollTop: 0
    };
  },

  components: {
    navbarTwo,
    approvalPendingList,
    approvalFinishList
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //进入页面加载
    if (this.activeIndex == 1) {
      //已处理列表
      this.approvalApplyList(-1, 3, 0);
    } else {
      //待处理列表
      this.approvalApplyList(0, 3, 0);
    }
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
      this.approvalApplyList(0, 3, 0);
    } else if (_this.activeIndex == 1) {
      this.approvalApplyList(-1, 3, 0);
    }
  },
  methods: {
    /**
     * 获取审核列表
     * type=0 未审核列表 type！=0审核列表
     */
    approvalApplyList: function (type, take, skip) {
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.approvalApplyList + '?type=' + type + '&take=' + take + '&skip=' + skip,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取审核列表', res.data);

          if (res.data && res.data.code == 200) {
            _this.dealPageObj(res.data.rows);

            if (_this.activeIndex == 1) {
              _this.pullDownNumberOfFinish++;
              applyCountOfFinish = res.data.rows.applyCount;
            } else {
              _this.pullDownNumberOfWait++;
              applyCountOfWait = res.data.rows.applyCount;
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
    dealPageObj: function (rows) {
      var array = [];

      if (rows == null || rows.length == 0) {
        return;
      }

      let data = rows.responseList;

      for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj.applyId = data[i].id;
        obj.meetingId = data[i].planId;
        obj.applyType = this.dealType(data[i].type);
        obj.meetingName = data[i].meetingTitle;
        obj.applyName = data[i].personName;
        obj.meetingTime = app.globalData.PublicUtil.formatTimeTwo(data[i].executeTime, 'Y-M-D') + ' ' + data[i].startTime + '-' + data[i].endTime;
        obj.applyReason = data[i].reason;
        obj.applyTime = app.globalData.PublicUtil.formatTimeTwo(data[i].applyTime, 'Y-M-D h:m');

        if (data[i].handlerResult == 12) {
          obj.statusName = '已同意';
          obj.statusColor = 'rgb(101,213,128)';
        } else if (data[i].handlerResult == 13) {
          obj.statusName = '已拒绝';
          obj.statusColor = 'rgb(234,25,50)';
        } else {
          obj.statusName = '未知';
        }

        array[i] = obj;
      }

      console.log('array-', array); // let arrayRe = array.reverse()

      let tabs = [];

      if (this.activeIndex == 1) {
        this.tabs[1] = '已处理（' + rows.applyCount + '）';
        this.setData({
          finishList: array
        });
      } else {
        this.tabs[0] = '待办（' + rows.applyCount + '）';
        this.setData({
          waitList: array
        });
      }

      this.setData({
        tabs: this.tabs
      });
    },
    dealType: function (type) {
      let str = '';

      switch (type) {
        case 30:
          str = '补签';
          break;

        case 31:
          str = '请假';
          break;

        default:
          str = '暂无';
          break;
      }

      return str;
    },

    /**
     * 跳转到详情
     */
    bindDetail: function (e) {
      // console.log('点击详情', e.detail);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.creatorAttendaceApproveDetailUrl + '?applyId=' + e.detail.applyId, 500);
    },

    /**
     * 同意申请
     */
    bindAgree: function (e) {
      console.log(e);
      this.approvalRatify(e.detail.applyId, e.detail.type);
    },

    /**
       * 拒绝申请
       */
    bindRefuse: function (e) {
      console.log(e);
      this.approvalRatify(e.detail.applyId, e.detail.type);
    },

    /**
      * 同意或拒绝申请
      */
    approvalRatify: function (applyId, type) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.approvalRatify,
        method: 'POST',
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        data: {
          'applyId': applyId,
          'type': type
        },
        success: function (res) {
          console.log('同意或拒绝申请返回', res.data);

          if (res.data && res.data.code == 200) {
            if (type == 13) {
              app.globalData.ShowMsgUtil.showSuccessToast("拒绝成功", 2000);
            } else if (type == 12) {
              app.globalData.ShowMsgUtil.showSuccessToast("同意成功", 2000);
            } else {
              app.globalData.ShowMsgUtil.showSuccessToast("操作成功", 2000);
            } // 更新页面


            setTimeout(function () {
              _this.approvalApplyList(0, 3, 0);
            }, 2000);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {}
      });
    },

    /**
     * 点击navbar
     * 
     * 每请求一次对应的计数加一。当改变activeIndex时，下拉刷新时计数清空。
     */
    bindClickTabs: function (e) {
      // console.log('navbar组件点击', e.detail.activeIndex);
      let actionIndex = e.detail.activeIndex;
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      this.setData({
        activeIndex: actionIndex
      });

      if (actionIndex == 0) {
        //待处理列表
        this.approvalApplyList(0, 3, 0); // 已处理的上拉计数清0

        this.setData({
          pullDownNumberOfFinish: 0
        });
      } else if (actionIndex == 1) {
        //已处理列表
        this.approvalApplyList(-1, 3, 0); // 待办的上拉技术清0

        this.setData({
          pullDownNumberOfWait: 0
        });
      }
    },
    //上滑加载更多
    lower: function () {
      var _this = this;

      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      if (_this.activeIndex == 0) {
        if (applyCountOfWait > _this.waitList.length) {
          this.approvalApplyList(0, (_this.pullDownNumberOfWait + 1) * 3, 0);
        }
      } else if (_this.activeIndex == 1) {
        if (applyCountOfFinish > _this.finishList.length) {
          this.approvalApplyList(-1, (_this.pullDownNumberOfFinish + 1) * 3, 0);
        }
      }
    },
    scroll: function (event) {// this.setData({
      //   scrollTop: event.detail.scrollTop
      // });
    }
  }
};
</script>
<style>
@import "./creatorAttendaceApprove.css";
</style>