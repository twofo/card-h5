<template>
<view class="page">
    <view class="weui-msg">
        <view class="weui-msg__icon-area">
            <icon type="success" size="93" color="#20A4F7"></icon>
        </view>
        <view class="weui-msg__text-area">
            <view class="weui-msg__title">操作成功</view>
            <view class="weui-msg__desc myui-text">
              {{title}}
              <text>{{value}}</text>
            </view>
        </view>
        <view class="weui-msg__opr-area">
            <view class="weui-btn-area">
                <button class="weui-btn" :disabled="disabled" type="primary" @tap="confirm">完成</button>
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
      disabled: false,
      title: "",
      value: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.title) {
      this.setData({
        title: options.title
      });
			if(options.title.indexOf('报修编号') != -1){
				uni.setNavigationBarTitle({
					title:'报修_我的维修_操作成功'
				})
			}
    }

    if (options.value) {
      this.setData({
        value: options.value
      });
    }
  },
  methods: {
    /**
     * 
     */
    confirm: function () {
      this.setData({
        disabled: true
      });
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl + '?isInit=true'+'&noRefresh=1', 500);
    }
  }
};
</script>
<style>
@import "./successPage.css";
</style>