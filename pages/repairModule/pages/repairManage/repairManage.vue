<template>
<view class="page">
  <view class="page__bd">
    <!-- navbar导航 -->
    <navbar :tabs="tabs" @clickTabs="bindClickTabs"></navbar>
    <!-- 维修列表 -->
    <repair-list :list="list" :btnList="btnList" :callImage="callImage" @call="bindCallPhone" :listLength="listLength" @pull="bindPullUp" :height="windowHeight-70"></repair-list>
  </view>
</view>
</template>

<script>
var app = getApp();
var Util = require("../../resources/utils/utils.js");
var ImageUrl = require("../../resources/utils/imageUrl.js");
import navbar from "../../../../components/attendanceModule/navbar/navbar";
import repairList from "../../../../components/repairModule/repairList/repairList";

export default {
  data() {
    return {
      callImage: ImageUrl.icCall,
      tabs: ["全部", "待分配", "待接单", "处理中", "已完成", "已拒绝"],
      activeIndex: 0,
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
    console.log(options);
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
        status = [1];
        this.getListByStatus(status, take, skip);
      } else if (activeIndex == 2) {
        status = [2];
        this.getListByStatus(status, take, skip);
      } else if (activeIndex == 3) {
        status = [3];
        this.getListByStatus(status, take, skip);
      } else if (activeIndex == 4) {
        status = [4, 5];
        this.getListByStatus(status, take, skip);
      } else if (activeIndex == 5) {
        status = [6];
        this.getListByStatus(status, take, skip);
      }
    },

    /**
     * 根据状态查询报修列表
     */
    getListByStatus: function (status, take, skip) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let listLength = _this.list.length;
      wx.request({
        url: app.globalData.RequestUrl.repairRequestUrl.selectRepairsList + '?statusType=' + status + '&take=' + take + '&skip=' + skip,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('查询报修列表返回', res.data);
          if (res.data && res.data.code == 200) {
            _this.pullDownNumber++;

            let data = _this.deal(res.data.rows.lists);
					
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
        }
      });
    },
    deal: function (data) {
      for (var i = 0; i < data.length; i++) {
        data[i].deviceName = Util.deviceType(data[i].deviceTypeId);
        data[i].statusName = Util.status(data[i].repairStatus);
        data[i].image = data[i].images != null && data[i].images.length > 0 ? data[i].images[0] : '';
        data[i].isCall = false;
        let obj = {};
        obj.btnName = '查看详情';
        obj.btnBind = 'toDetailOfDormAdmin';
        let list = [];
        list[0] = obj;

        if (data[i].repairStatus == 1) {
          obj = {};
          obj.btnName = '分配师傅';
          obj.btnBind = 'toDistribute';
          list[1] = obj;
          data[i].msg = '学生已经等不及啦 ~ 尽快分配喔 ~ ';
        } else if (data[i].repairStatus == 2) {
          let callObj = {};
          callObj.isCall = true;

          if (data[i].userNameOfMaintainer == null) {
            data[i].userNameOfMaintainer = '暂无';
          }

          console.log(data[i].isAssignUser);

          if (data[i].isAssignUser != 1) {
            data[i].phoneOfMaintainer = '';
            callObj.isCall = false;
          }

          data[i].msg = data[i].userNameOfMaintainer + ' ' + data[i].phoneOfMaintainer;
          callObj.bindtap = 'toCall';
          data[i].callObj = callObj;
          console.log(callObj.isCall);
        } else if (data[i].repairStatus == 3) {
          let callObj = {};
          callObj.isCall = true;

          if (data[i].userNameOfMaintainer == null) {
            data[i].userNameOfMaintainer = '暂无';
          }

          if (data[i].isAssignUser == 2) {
            data[i].phoneOfMaintainer = '';
            callObj.isCall = false;
          }

          data[i].msg = data[i].userNameOfMaintainer + ' ' + data[i].phoneOfMaintainer;
          callObj.bindtap = 'toCall';
          data[i].callObj = callObj;
          console.log(callObj.isCall);
        } else if (data[i].repairStatus == 5 || data[i].repairStatus == 4) {
          data[i].msg = '师傅已经维修完成 ~ ';
        } else if (data[i].repairStatus == 6) {
          data[i].msg = '拒绝原因：' + data[i].repairRemarksOfMaintainer;
          obj = {};
          obj.btnName = '重新分配';
          obj.btnBind = 'toRedistribute';
          list[1] = obj;
        }

        data[i].btnList = list;
      }

      return data;
    },

    /**
     * 组件打电话事件
     */
    bindCallPhone: function (e) {
      let phone = e.detail.phone;
      this.callPhone(phone);
    },
    callPhone: function (phone) {
      wx.showModal({
        title: '呼叫',
        content: '拨打' + phone,

        success(res) {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: phone //仅为示例，并非真实的电话号码

            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }

      });
    },

    /**
     * 上拉更新 
     */
    bindPullUp: function () {
      this.dealStatusByActiveIndex(this.activeIndex, (this.pullDownNumber + 1) * 5, 0);
    }
  }
};
</script>
