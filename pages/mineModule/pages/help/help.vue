<template>
<view class="page page_view">

  <!-- 一、无数据展示 -->
  <block v-if="ifIssue">
    <view class="weui-loadmore weui-loadmore_line">
      <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
    </view>
  </block>
    
  <!-- 二、帮助列表 -->
  <help-list :helpList="helpList" :src="src"> </help-list>
  
</view>
</template>

<script>
/**
 * 1. 优化缓存过期时间。过期时间为一个月
 */
// var Storage = require('../../utils/storage.js')
var app = getApp();
import helpList from "../../../../components/mineModule/helpList/helpList";

export default {
  data() {
    return {
      helpList: [],
      ifIssue: false,
      src: ''
    };
  },

  components: {
    helpList
  },
  props: {},
  onLoad: function () {
    var _this = this;

    console.log('------------------------帮助------------------------');
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); // 将该信息放入缓存里，设置过期时间为1个月。因为这个改变的可能性太小。

    var helpList = app.globalData.StorageUtil.getOfExpire('helpCach');

    if (helpList) {
      wx.hideToast();

      _this.setData({
        helpList: helpList
      });
    } else {
      _this.helpListData(userInfoCach);
    }

    _this.setData({
      src: app.globalData.PageUrl.minePageUrl.helpIssue
    });
  },
  methods: {
    /**、
     * 从后台获取问题数组
     */
    helpListData: function (userInfoCach) {
			app.globalData.ShowMsgUtil.netErrNotice();
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;

      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.helpList,
        header: {
          'token': userInfoCach.token
        },
        method: 'GET',
        success: function (res) {
          console.log('帮助列表数据返回', res.data);
          var info = res.data.rows;

          if (res.data && res.data.code == "200") {
            if (info.length == 0) {
              _this.setData({
                ifIssue: true
              });
            }

            if (info) {
              // 将该信息放入缓存里，设置过期时间为1个月。因为这个改变的可能性太小。
              app.globalData.StorageUtil.setOfExpire('helpCach', info, 720);

              _this.setData({
                helpList: info
              });
            }
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideToast();
        }
      });
    }
  }
};
</script>
<style>
@import "./help.css";
</style>