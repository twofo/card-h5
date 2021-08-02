<template>
<view class="page">
   
    <view class="page__bd">

      <view class="weui-cells weui-cells_after-title box-top">

        <view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <view class="weui-cell__bd">金额</view>
            <input class="weui-cell__ft" @input="inputMoneyFun" type="digit" maxlength="4"></input> 
            <view class="input-title">元</view>
        </view>

      </view>  

      <view class="weui-cells weui-cells_after-title top">

        <!-- <picker bindchange="bindPickerChangeOfNum" value="{{index}}" range="{{numberList}}">  -->
          <view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="selectNumber">
              <view class="weui-cell__bd">使用次数</view>
              <view class="weui-cell__ft weui-cell__ft_in-access">{{numberList[numId]}}</view>
          </view>
        <!-- </picker> -->

      </view>  

        <view class="weui-cells weui-cells_after-title top">

          <picker @change="bindPickerChangeOfTime" :value="timeId" :range="timeList"> 
            <view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <view class="weui-cell__bd">使用时间</view>
                <view v-if="!timeId">
                  <view class="weui-cell__ft weui-cell__ft_in-access">{{timeList[0]}}</view>
                </view>
                <view v-else>
                  <view class="weui-cell__ft weui-cell__ft_in-access">{{timeList[timeId]}}</view>
                </view>
            </view>
          </picker>

        </view>

        <view class="page__bd page__bd_spacing bottom">
          <button class="weui-btn" type="primary" @tap="confirmSet">确定</button>
        </view>
    </view>

  <view class="page__bd setLimit-view bottom-top">
    <view class="weui-article">
      <view class="weui-article__h1 h1-font">温馨提示</view>
      <view class="weui-article__section">
          <view class="weui-media-box__desc desc-font">1. 分享给他人的代金劵用于消费，每笔消费金额将从分享者本人的账户扣除对应的金额。</view> 
          <view class="weui-media-box__desc desc-font">2. 未消费完的代金劵金额，将于时间结束后失效。</view> 
          <!-- <view class="weui-media-box__desc desc-font">2. 未消费完的代金劵金额，将于时间结束后失效。</view>       -->
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
      numberList: ['一次', '多次'],
      numId: 0,
      timeList: ['当日'],
      timeId: 0,
      inputMoney: '',
      'balance': ''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------------------------代付劵------------------------'); // 数据精度处理

    let balance = parseFloat(options.balance);
    balance = (balance / 100).toFixed(2);
    console.log(balance);
    this.setData({
      'balance': balance
    });
    var time = new Date().getHours();
    this.getTimeListByHours(time);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  methods: {
    // 生成使用时间数组
    getTimeListByHours: function (hours) {
      var length = 24 - hours;

      for (let i = 1; i < length; ++i) {
        this.setData({
          ['timeList[' + i + ']']: i + '小时'
        });
      }
    },
    // 获取输入金额
    inputMoneyFun: function (e) {
      this.setData({
        'inputMoney': e.detail.value
      });
    },
    // 输入金额验证
    verifyMoney: function (money) {
      if (!/(^(([0-9]+\.[0-9]{1,2})|([0-9]*[1-9][0-9]*\.[0-9]{1,2})|([0-9]*[1-9][0-9]*))$)/.test(money)) {
        app.globalData.ShowMsgUtil.showErrorModal('金额输入格式不正确', '请重新输入');
        return false;
      }

      money = parseFloat(money);
      money = money.toFixed(2);

      if (Number(money) > Number(this.balance)) {
        console.log('balance', this.balance);
        app.globalData.ShowMsgUtil.showErrorModal('输入金额不能比余额大', '请重新输入');
        return false;
      }

      return true;
    },
    // 选择时间
    bindPickerChangeOfTime: function (e) {
      this.setData({
        timeId: e.detail.value
      });
    },
    // 选择次数
    selectNumber: function () {
      var _this = this;

      wx.showActionSheet({
        itemList: ['一次', '多次'],
        success: function (res) {
          if (!res.cancel) {
            _this.setData({
              numId: res.tapIndex
            });
          }
        }
      });
    },

    /**
     * 确定设置 
     */
    confirmSet: function () {
      // 临时人员无法使用代付劵
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

      if (userInfoCach.isMortal == 1) {
        app.globalData.ShowMsgUtil.showErrorModal('提醒', '培训人员暂不支持该功能！');
        return;
      }

      var inputMoney = this.inputMoney;
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();
      const userDetailCach = app.globalData.StorageUtil.get('userDetailCach');

      if (inputMoney === '') {
        wx.hideToast({});
        app.globalData.ShowMsgUtil.showErrorModal('请设置金额', '请求失败');
        return;
      }

      if (!this.verifyMoney(inputMoney)) {
        wx.hideToast({});
        return;
      }

      this.requestOfPay(userInfoCach, userDetailCach);
    },
    // 请求代付劵设置
    requestOfPay: function (userInfoCach, userDetailCach) {
      var _this = this;

      var onlyOnce = true;

      if (_this.numId == 1) {
        onlyOnce = false;
      }
						app.globalData.ShowMsgUtil.netErrNotice();
      wx.request({
        url: app.globalData.RequestUrl.payRequestUrl.getShareCode,
        data: {
          'onlyOnce': onlyOnce,
          'timeout': _this.timeId,
          'amountLimit': _this.inputMoney,
          'cardCode': userDetailCach.cardNumber
        },
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          console.log('请求代付劵设置', res.data);

          if (res.data && res.data.code == 200) {
            app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.payRollCode + '?inputMoney=' + _this.inputMoney + '&expireAtTime=' + res.data.rows.expireAtTime + '&authCode=' + res.data.rows.authCode, 500);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
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
@import "./payRoll.css";
</style>