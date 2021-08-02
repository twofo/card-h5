<template>
<view class="page">
  <view class="page__bd page__bd_spacing">
    
      <!-- navbar导航 -->
      <view class="weui-flex myui-navbar-flex">
        <view class="myui-navbar-left">
          <view class="navbar-left text-center">
            <selects id="select" :options="timeOptions" :defaultOption="timeDefault" keys="query_id" text="query_name" @change="bindClickTabs"></selects>
          </view>
        </view>
        <view class="weui-flex__item myui-navbar-center">
          <view class="navbar-center text-center">
            <selects id="select" :options="queryOptions" :defaultOption="queryDefault" keys="query_id" text="query_name" @change="bindClickTabs"></selects>
          </view>
        </view>
        <view class="myui-navbar-right"><view class="navbar-right text-center" @tap="queryList"> 查询</view></view>
      </view>
      

      <view class="weui-tab__panel myui-tab-items">
        <scroll-view scroll-y :style="'margin-top:-80rpx;height: ' + (windowHeight*1.9-80) + 'rpx;'" @scrolltolower="lower" @scroll="scroll" :scroll-top="scrollTop" lower-threshold="1" upper-threshold="10">
          <!--  -->
          <synthesize-record-list :list="recordList" :windowHeight="windowHeight" :nomore="nomore"></synthesize-record-list>
        </scroll-view>
      </view>
    
  </view>
</view>
</template>

<script>
// pages/indexModule//pages/synthesizeQuery/synthesizeQuery.js
var app = getApp();
var Constant = require("../../resources/constant.js");
const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
var clickTimeObj = '';
import selects from "../../../../components/common/select/select";
import synthesizeRecordList from "../../resources/components/synthesizeRecord/synthesizeRecord";

export default {
  data() {
    return {
      // 导航数据
      queryDefault: Constant.queryDefault,
      queryOptions: Constant.queryOptions,
      timeDefault: Constant.timeDefault,
      timeOptions: Constant.timeOptions,
      pullDownNumber: 0,
      scrollTop: 0,
      windowHeight: 0,
      nomore: false,
      //上拉加载结束提示
      isCanLoad: true,
      //用于控制下滑加载，从后台加载数量
      recordCount: 0,
      recordList: [],
      // 
      selectTimeTypeObj: {},
      selectQueryTypeObj: {}
    };
  },

  components: {
    selects,
    synthesizeRecordList
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    }); // 进入页面请求

    let queryType = Constant.queryDefault.id;
    let timeType = Constant.timeDefault.id;
    this.listsByType(queryType, timeType, 6, 0);
    this.setData({
      selectTimeTypeObj: Constant.timeDefault,
      selectQueryTypeObj: Constant.queryDefault
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      nomore: false //上拉加载结束提示

    }); //进入页面加载

    this.recordCount = 0;
    this.isCanLoad = true;
  },

  /************************************************************** 下拉或上滑 *******************************************************************/
  //下拉更新
  onPullDownRefresh: function () {
    var _this = this;

    _this.setData({
      recordList: [],
      pullDownNumber: 0
    });

    if (this.isCanLoad) {
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();
      let timeType = this.selectTimeTypeObj.id;
      let queryType = this.selectQueryTypeObj.id;
      this.listsByType(queryType, timeType, 6, 0);
    }
  },
  methods: {
    /**
     * 点击下拉选项
     */
    bindClickTabs: function (e) {
      console.log("e - ", e);
      let type = e.detail.type;

      if (type == 1) {
        clickTimeObj = e.detail;
      } else if (type == 2) {
        console.log("e - ", e);
        this.setData({
          selectQueryTypeObj: e.detail
        });
      }
    },

    /**
     * 点击查询
     */
    queryList: function () {
      let timeObj = this.selectTimeTypeObj;

      if (clickTimeObj != '') {
        this.setData({
          selectTimeTypeObj: clickTimeObj
        });
        timeObj = clickTimeObj;
      } else {
        clickTimeObj = '';
      }

      this.setData({
        nomore: false
      });
      this.recordCount = 0;
      this.isCanLoad = true;
      this.setData({
        pullDownNumber: 0,
        recordList: []
      });
      let timeType = timeObj.id;
      let queryType = this.selectQueryTypeObj.id;
			console.log(this.selectQueryTypeObj)
      this.listsByType(queryType, timeType, 6, 0);
    },
    listsByType: function (recordType, timeType, take, skip) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.listsByType + '?recordType=' + recordType + '&timeType=' + timeType + '&take=' + take + '&skip=' + skip,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('综合查询返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.handlePageObj(res.data.data);

            _this.handleRequestReturn(res.data.data);
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
     *  - 后台数据处理
     * @param {*} rows 
     */
    handlePageObj: function (rows) {
      var array = [];

      if (rows == null || rows.length == 0) {
        return;
      }

      let data = rows;

      for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj.recordDate = data[i].recordDate.substring(0, 10);
        obj.recordDateTime = data[i].recordDate.substring(11);
        obj.username = data[i].username;
        obj.userType = data[i].userType == 0 ? '学生' : '教师';
        obj.userCode = data[i].userCode;
        obj.newRoomLocation = data[i].newRoomLocation == null ? '- - -' : data[i].newRoomLocation;
        obj.oldRoomLocation = data[i].oldRoomLocation == null ? '- - -' : data[i].oldRoomLocation;
        array[i] = obj;
      }

      console.log('array-', array); // let arrayRe = array.reverse()

      this.setData({
        recordList: array
      });
    },
    handleRequestReturn: function (rows) {
      var _this = this;

      _this.setData({
        nomore: false
      });

      if (rows.length != _this.recordCount) {
        _this.pullDownNumber++;
        _this.recordCount = rows.length;
        _this.isCanLoad = true;
      } else {
        console.log('没有数据更新');

        _this.setData({
          isCanLoad: false,
          nomore: true
        });
      }
    },
    //上滑加载更多
    lower: function () {
      if (this.isCanLoad) {
        app.globalData.ShowMsgUtil.showLoadAndMsgToast();
        let timeType = this.selectTimeTypeObj.id;
        let queryType = this.selectQueryTypeObj.id;
        this.listsByType(queryType, timeType, (this.pullDownNumber + 1) * 6, 0);
      }
    },
    scroll: function (event) {}
  }
};
</script>
<style>
@import "./synthesizeQuery.css";
</style>