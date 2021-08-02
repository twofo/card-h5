<template>
<view class="page">
    <view class="weui-msg">
        <view class="weui-msg__icon-area">
            <icon type="warn" size="93"></icon>
        </view>
        <view class="weui-msg__text-area">
            <view class="weui-msg__title">操作失败</view>
            <view class="weui-msg__desc myui-text">
              {{title}}
              <text>{{value}}</text>
            </view>
        </view>
        
        <view class="weui-msg__opr-area">
            <view class="weui-btn-area">
                <button class="weui-btn" type="primary" @tap="confirm">确定</button>
            </view>
        </view>
        
    </view>
</view>
</template>

<script>
var app = getApp();

export default {
  data() {
    return {
      pageUrl: '',
      value: "",
      title: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.value != null) {
      this.setData({
        value: options.value
      });
    }

    this.setData({
      title: options.title,
      pageUrl: options.pageUrl
    });
  },
  methods: {
    /**
     * 
     */
    confirm: function () {
      if (this.pageUrl == '') {
        wx.navigateBack({
          delta: 1
        });
      } else {
        app.globalData.PublicUtil.navigateByUrl(this.pageUrl); // 不能返回
      }
    }
  }
};
</script>
<style>
@import "./failPage.css";
</style>