<template>
<!--components/mineModule/setList/setList.wxml-->

<view class="page__bd">
  <view v-for="(item, index) in setList" :key="index">
    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell weui-cell_access box" hover-class="weui-cell_active" @tap="tapClick(item.bindtap)">
        <view class="weui-cell__bd more_bd">{{item.name}}</view>
        <view class="weui-cell__ft">{{item.showFlagName}}</view>
        <view class="weui-cell__ft weui-cell__ft_in-access more_rightIcon"></view>
      </view>
    </view>
  </view>
</view>
</template>

<script>
// components/mineModule/setList/setList.js
var app = getApp();

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    setList: {
      type: Array,
      default: () => []
    },
    showFlag: {
      type: String,
      default: ''
    }
  },
  methods: {
		tapClick(tap){
			this[tap]()
		},
    /**
     * 交易限额
     */
    doSetLimit: function () {
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.minePageUrl.setLimit, 500);
    },
    doSwitchRole: function () {
      app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.authPageUrl.switchRoleUrl, 500);
    },
    selectModel: function () {
      let _this = this;

      wx.showActionSheet({
        itemList: ['不显示', '全显示', '显示余额'],
        success: function (res) {
          if (!res.cancel) {
            _this.$emit('myevent', {
              detail: {
                showFlag: res.tapIndex
              }
            });
          }
        }
      });
    },
    passwordAlter: function () {
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.minePageUrl.passwordAlter, 500);
    },

    /**、
     * 清空缓存
     */
    clearStorage: function () {
      wx.showModal({
        title: '确认退出登录吗？',

        success(res) {
          if (res.confirm) {
            app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.authPageUrl.loginUrl, 500);
          } else if (res.cancel) {
            console.log('清空缓存', '用户点击取消');
          }
        }

      });
    }
  }
};
</script>
<style>
@import "./setList.css";
</style>