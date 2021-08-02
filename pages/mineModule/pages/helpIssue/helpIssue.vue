<template>
<!-- 问题类型 -->

<view class="page page_view"> 

  <!-- 一、无数据展示 -->
  <block v-if="ifIssue">
    <view class="weui-loadmore weui-loadmore_line">
      <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
    </view>
  </block>
   
  <!-- 二、帮助列表 -->
  <view v-for="(item, index) in articleList" :key="index" class="weui-cells weui-cells_after-title" :item="item">
    <navigator :url="src + '?issueId=' + item.id" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
      <view class="weui-cell__bd">{{item.title}}</view>
      <view class="weui-cell__ft weui-cell__ft_in-access"></view>
    </navigator>
  </view>
  
</view>
</template>

<script>
var app = getApp();
import helpList from "../../../../components/mineModule/helpList/helpList";

export default {
  data() {
    return {
      articleList: [],
      ifIssue: false,
      issuelistid: 0,
      src: ""
    };
  },

  components: {
    helpList
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    var _this = this;

    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

    _this.setData({
      src: app.globalData.PageUrl.minePageUrl.issueDetail,
      issuelistid: options.issuelistid
    });

    _this.getIssueList(userInfoCach, options.issuelistid);
  },
  onShow: function () {// const userInfoCach = app.StorageUtil.get('userInfoCach')
    // var articleList = app.StorageUtil.getOfExpire('articleCach');
    // var issuelistid = options.issuelistid;
    // if (articleList) {
    //   _this.setData({
    //     articleList: articleList,
    //   })
    // } else {
    //   _this.getIssueList(userInfoCach, issuelistid);
    // }
  },
  methods: {
    // 获取问题列表
    getIssueList: function (userInfoCach, issuelistid) {
      console.log(userInfoCach, issuelistid);
			app.globalData.ShowMsgUtil.netErrNotice();
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;

      console.log('选择帮助id', issuelistid);
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.articles + issuelistid + '/articles',
        header: {
          'token': userInfoCach.token
        },
        method: 'GET',
        success: function (res) {
          console.log('获取问题列表返回', +res.data);
          var articleList = res.data.rows;

          if (res.data && res.data.code == "200") {
            if (articleList.length == 0) {
              _this.setData({
                ifIssue: true
              });
            }

            if (articleList) {
              // 将该信息放入缓存里，设置过期时间为1个月。因为这个改变的可能性太小。
              app.globalData.StorageUtil.setOfExpire('articleCach', articleList, 720);

              _this.setData({
                articleList: articleList
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
@import "./helpIssue.css";
</style>