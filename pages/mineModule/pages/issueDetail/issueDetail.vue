<template>
<view>
<!--富文本编辑代码解析开始-->
<!--<import src="../../resources/utils/wxParse/wxParse.wxml"></import>-->

<view class="page">

    <block v-if="ifIssue">
      <view class="weui-loadmore weui-loadmore_line">
        <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
      </view>
    </block>

    <view class="page__bd article-box">
        <view class="weui-article">
            <view class="weui-article__h1 article-title">{{issue.title}}</view>
            <view class="weui-article__section">
                
              <!-- 富文本解析后结果 -->
              <view class="wxParse font">
                <jyf-parser :html="article_article_content"></jyf-parser>
              </view>

            </view>
        </view>
    </view>

</view>
</view>
</template>

<script>

/**
 * 解析富文本编辑代码
 * @type Module wxParse|Module wxParse
 */
var app = getApp();

export default {
  data() {
    return {
      userInfoCach: {},
      issue: '',
      ifIssue: false,
      issueId: 0,
      article_content: '',
      article_article_content: "",
      article_article_content: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    var issueId = options.issueId;

    _this.setData({
      userInfoCach: userInfoCach,
      issueId: options.issueId
    }); // 将该信息放入缓存里，设置过期时间为1个月。因为这个改变的可能性太小。


    var issue = app.globalData.StorageUtil.getOfExpire('issueCach');

    if (issue && issue.id == options.id) {
      var article_content = issue.content;
      setTimeout(() => {
        _this.article_article_content = article_content;
      }, 200), //解析富文本编辑代码
      _this.setData({
        issue: issue // article_content: WxParse.wxParse('article_content', 'html', article_content, _this, 5),

      });
    } else {
      _this.getIssueDetail(userInfoCach, issueId);
    }
  },
  onShow: function () {
    var _this = this;

    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
  },
  methods: {
    // 获取问题详情
    getIssueDetail: function (userInfoCach, issueId) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.article + issueId + '/article',
        header: {
          'token': userInfoCach.token
        },
        method: 'GET',
        success: function (res) {
          // console.log('获取问题详情返回', +res.data);
          var issue = res.data.rows;

          if (res.data && res.data.code == "200") {
            if (issue == '' || issue == null) {
              _this.setData({
                ifIssue: true
              });
            }

            if (issue) {
              let article_content = issue.content; // 将该信息放入缓存里，设置过期时间为1个月。因为这个改变的可能性太小。
							let article_content1 = article_content.replace(/<img/g,"<img style='max-width:100%;height:auto;'");
              app.globalData.StorageUtil.setOfExpire('issueCach', issue, 720);
              setTimeout(() => {
                _this.article_article_content = article_content1;
              }, 200), //解析富文本编辑代码
              _this.setData({
                issue: issue
              });
            }
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    }
  }
};
</script>
<style>
@import "./issueDetail.css";
</style>