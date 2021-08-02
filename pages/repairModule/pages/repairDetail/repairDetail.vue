<template>
<view class="page">
  <view class="page__bd">
    <!-- 报修详情 -->
    <view v-if=" JSON.stringify(pageObj) == '{}' ">
      <view class="weui-cells__box nomore">暂无数据</view>
    </view>
    <view v-else class="weui__bd myui__box">
      <!-- 已完成 - 维修详情展示 -->
      <view class="weui-cells" style="font-size:15px;" v-if="pageObj.repairStatus == 4 || pageObj.repairStatus == 5 || (pageObj.repairStatus ==2 && pageObj.isAssignUser ==2 )">
          <view class="weui-cell">
            <view class="weui-cell__bd" v-if="pageObj.isAssignUser ==2">维修部门： {{pageObj.userNameOfMaintainer}}</view>
            <view class="weui-cell__bd" v-else>维修人： {{pageObj.userNameOfMaintainer}}</view>
          </view>
          <view class="weui-cell myui-bd__ft" v-if="pageObj.isAssignUser ==1">
            <view class="weui-cell__bd">手机号： {{pageObj.phoneOfMaintainer}}</view>
            <view class="myui-cell__bd" v-if="pageObj.callObj.isCall" @tap="tapClick(pageObj.callObj.bindtap,{phone:pageObj.repairApplyPhone })" >
              <image :src="callImage" class="myui-cell-image"></image>
            </view>
          </view>
          <view class="weui-cell" v-if="pageObj.isAssignUser ==1">
            <view class="weui-cell__bd">维修描述： 
              <textarea :value="pageObj.repairRemarksOfMaintainer" style="width: 100%;height: 3.0em;"></textarea>
            </view>
          </view>
      </view>

      <!-- 处理中 - 维修详情展示 -->
      <view class="weui-cells" style="font-size:15px;" v-if="pageObj.repairStatus == 3">
          <view class="weui-cell">
            <view class="weui-cell__bd">维修人： {{pageObj.userNameOfMaintainer}}</view>
          </view>
          <view class="weui-cell myui-bd__ft">
            <view class="weui-cell__bd">手机号： {{pageObj.phoneOfMaintainer}}</view>
            <view class="myui-cell__bd" v-if="pageObj.callObj.isCall" @tap="tapClick(pageObj.callObj.bindtap,{phone:pageObj.repairApplyPhone })">
              <image :src="callImage" class="myui-cell-image"></image>
            </view>
          </view>
      </view>

      <!-- 报修详情展示 -->
      <repair-detail :pageObj="pageObj" :callImage="callImage" @call="bindCallPhone"></repair-detail>
    </view>

  </view>
</view>
</template>

<script>
var app = getApp();
var Util = require("../../resources/utils/utils.js");
var ImageUrl = require("../../resources/utils/imageUrl.js");
import repairDetail from "../../../../components/repairModule/repairDetail/repairDetail";

export default {
  data() {
    return {
      pageObj: {},
      callImage: ImageUrl.icCall
    };
  },

  components: {
    repairDetail
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------------------------报修详情------------------------');
    console.log('选中报修单号', options.repairCode);
    this.selectRepairByCode(options.repairCode);
  },
  methods: {
		tapClick(tap,params){
			this[tap](params)
		},
    /**
     * 查询报修详情
     */
    selectRepairByCode: function (repairCode) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      app.globalData.ShowMsgUtil.showLoadAndMsgToast("加载中");
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.repairRequestUrl.selectRepairByCode + '?repairCode=' + repairCode,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('查询报修详情返回', res.data);

          if (res.data && res.data.code == 200) {
            let data = res.data.rows; // 处理显示数据

            data = _this.dealShow(data);
            console.log(data);
            _this.setData({
              pageObj: data
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
          wx.hideToast();
        }
      });
    },

    /**
     * 
     */
    dealShow: function (data) {
      data.deviceName = Util.deviceType(data.deviceTypeId);
      data.statusName = Util.status(data.repairStatus);
      let status = data.repairStatus;
      let btnObj = {};
      let callObj = {};

      if (status == 1) {
        // 待分配
        btnObj.name = '分配师傅';
        btnObj.bindtap = 'toDistribute';
      } else if (status == 3) {
        // 处理中
        callObj.isCall = true;
        callObj.bindtap = 'toCall';
      } else if (status == 4 || status == 5) {
        // 已完成
        callObj.isCall = true;
        callObj.bindtap = 'toCall';
      } else if (status == 6) {
        // 已拒绝
        btnObj.name = '重新分配';
        btnObj.bindtap = 'toDistribute';
      }

      data.btnObj = btnObj;
      data.callObj = callObj;
      return data;
    },

    /**
     * 组件打电话事件
     */
    bindCallPhone: function (e) {
      let phone = e.detail.phone;
      this.callPhone(phone);
    },

    /**
     * 点击打电话
     */
    toCall: function (e) {
      let phone = e.phone;
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
    }
  }
};
</script>
<style>
@import "./repairDetail.css";
</style>