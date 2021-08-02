<template>
<view class="page">
  <view class="page__bd">
    <view class="weui-tab">
          
      <!-- 头部 -->
      <navbar-header-list :tabs="tabs" @myevent="onMyEvent"></navbar-header-list>
    </view>
  </view>
</view>
</template>

<script>
var app = getApp();
import navbarHeaderList from "../../../components/mineModule/navbarHeaderList/navbarHeaderList";

export default {
  data() {
    return {
      userInfoCach: {},
      tabs: app.globalData.Constant.arrayConstant.operatingRecordTabs,
      deviceTypeId: ""
    };
  },

  components: {
    navbarHeaderList
  },
  props: {},

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
    console.log('------------------------操作记录------------------------');

    var _this = this;

    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

    _this.setData({
      userInfoCach: userInfoCach
    });
  },
  methods: {
    /**
     * 接收组件点击后所传的值
     */
    onMyEvent: function (e) {
      var _this = this;

      var deviceTypeId = e.detail.deviceTypeId;

      _this.setData({
        deviceTypeId: deviceTypeId
      });

      _this.getOperateRecord(deviceTypeId, 0, 10);
    }
  }
};
</script>
