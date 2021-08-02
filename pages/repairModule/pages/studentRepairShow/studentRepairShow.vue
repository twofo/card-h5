<template>
<view class="page">
    <view class="page__bd">
      <!-- navbar导航 -->
      <navbar :tabs="tabs" @clickTabs="bindClickTabs"></navbar>
      <!-- 维修列表 -->
      <repair-list :list="list" role="3" :btnList="btnList" :listLength="listLength" @pull="bindPullUp" :height="windowHeight-65"></repair-list>

    </view>
</view>
</template>

<script>
var app = getApp();
var Util = require("../../resources/utils/utils.js");
var Images = require("../../resources/utils/imageUrl.js");
import navbar from "../../../../components/attendanceModule/navbar/navbar";
import repairList from "../../../../components/repairModule/repairList/repairList";

export default {
  data() {
    return {
      tabs: ["全部", "待处理", "处理中", "已完成", "已评价"],
      activeIndex: '',
      //选中了哪一块
      list: [],
			btnList:[],
      // 1. 定义请求次数（即下拉刷新）
      pullDownNumber: 0,
      listLength: 1,
      // 用于判断是否将所有数据查询出来
      windowHeight: 510
    };
  },

  components: {
    navbar,
    repairList
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isInit = options.isInit;

    if (isInit) {
      let status = [0];
      this.getListByStatus(status, 5, 0);
    }
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    });
  },
  //下拉更新
  onPullDownRefresh: function () {
    var _this = this;

    _this.setData({
      list: [],
      pullDownNumber: 0
    });

    let status = [0];
    this.getListByStatus(status, 5, 0);
  },
  methods: {
    /**
     * 点击navbar
     * 
     * 每请求一次对应的计数加一。当改变activeIndex时，下拉刷新时计数清空。
     */
    bindClickTabs: function (e) {
      let activeIndex = e.detail.activeIndex;
      this.setData({
        list: [],
        pullDownNumber: 0,
        activeIndex: activeIndex
      });
      this.dealStatusByActiveIndex(activeIndex, 5, 0);
    },
    dealStatusByActiveIndex: function (activeIndex, take, skip) {
      let status = []; // 根据点击不同的navbar查询不同

      if (activeIndex == 0) {
        status = [0];
        this.getListByStatus(status, take, skip);
      } else if (activeIndex == 1) {
        status = [1, 2, 6];
        this.getListByStatus(status, take, skip);
      } else if (activeIndex == 2) {
        status = [3];
        this.getListByStatus(status, take, skip);
      } else if (activeIndex == 3) {
        status = [4];
        this.getListByStatus(status, take, skip);
      } else if (activeIndex == 4) {
        status = [5];
        this.getListByStatus(status, take, skip);
      }
    },

    /**
     * 根据状态查询报修列表
     */
    getListByStatus: function (status, take, skip) {
			app.globalData.ShowMsgUtil.netErrNotice();
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let listLength = _this.list.length;
      wx.request({
        url: app.globalData.RequestUrl.repairRequestUrl.selectRepairsList + '?statusType=' + status + '&take=' + take + '&skip=' + skip + '&isSelectMyRepair=1',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('查询报修列表返回', res.data);
          if (res.data && res.data.code == 200) {
            _this.pullDownNumber++;

            let data = _this.deal(res.data.rows.lists);

            console.log('data传给组件的数据', data);

            _this.setData({
              listLength: listLength,
              list: data
            });
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
     * 
     */
    deal: function (data) {
      console.log('data传给组件的数据', data);
      for (var i = 0; i < data.length; i++) {
        // let obj = {};
        data[i].deviceName = Util.deviceType(data[i].deviceTypeId);
        data[i].statusName = Util.status(data[i].repairStatus);
        data[i].image = data[i].images != null && data[i].images.length > 0 ? data[i].images[0] : Images.mineFunRecord ;  //
        let obj = {};
        obj.btnName = '查看详情';
        obj.btnBind = 'toDetail';
        let list = [];
        list[0] = obj;

        if (data[i].repairStatus == 1 || data[i].repairStatus == 2 || data[i].repairStatus == 6) {
          data[i].msg = '正在通知师傅接单中, 不要着急喔 ~ ';
        } else if (data[i].repairStatus == 3) {
          data[i].msg = '师傅已经接单啦，不要着急喔 ~ ';
        } else if (data[i].repairStatus == 4) {
          obj = {};
          obj.btnName = '去评价';
          obj.btnBind = 'toComment';
          list[1] = obj;
          data[i].msg = '师傅已经维修完成 ~ 记得去五星好评 ~ ';
        } else if (data[i].repairStatus == 5) {
          data[i].msg = '已评价 ~ ';
        }

        data[i].btnList = list;
      }

      return data;
    },

    /**
     * 上拉更新 
     */
    bindPullUp: function () {
      this.dealStatusByActiveIndex(this.activeIndex, (this.pullDownNumber + 1) * 5, 0);
    },

    /**
     * 跳转到详情
     */
    toDetail: function (e) {
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.studentRepairDetailUrl + '?repairCode=' + e.currentTarget.dataset.code, 500);
    },

    /**
     * 跳转到评价
     */
    toComment: function (e) {
      app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.repairPageUrl.studentRepairCommentUrl + '?repairCode=' + e.currentTarget.dataset.code, 500);
    }
  }
};
</script>
<style>
@import "./studentRepairShow.css";
</style>