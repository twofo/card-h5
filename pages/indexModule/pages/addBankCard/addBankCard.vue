<template>
<view class="page" xmlns:wx="http://www.w3.org/1999/xhtml">

    <view class="page__bd">
        
        <view class="weui-cells__tips top">请绑定持卡人本人的银行卡</view>
        <view class="weui-cells weui-cells_after-title top">
            
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__hd">
                    <view class="weui-label">&nbsp;持卡人：</view>
                </view>
                <view class="weui-cell__bd">
                    <input class="weui-input"  maxlength="19" @input="inputName" type="text"></input>
                </view>
            </view>
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__hd ">
                    <view class="weui-label ">卡&nbsp;&nbsp;&nbsp;&nbsp;号：</view>
                </view>
                <view class="weui-cell__bd weui-leftss">
              <input class="weui-input " maxlength="19" @input="inputCardNumber" type="text"></input>
                </view>
            </view>
            
        </view>
        <view class="weui-cells__tips bottom-top">银行卡号只能为13-19位数字</view>

        <view class="weui-btn-area bottom-box">
            <button class="weui-btn" type="primary" @tap="addBankCard">确定</button>
        </view>
    </view>
</view>
</template>

<script>
var app = getApp();

export default {
  data() {
    return {
      userName: '',
      cardNumber: ''
    };
  },

  components: {},
  props: {},
  methods: {
    /**
     * 持卡人
     */
    inputName: function (e) {
      this.setData({
        'userName': e.detail.value
      });
    },

    /**
     * 卡号
     */
    inputCardNumber: function (e) {
      this.setData({
        'cardNumber': e.detail.value
      });
    },

    /**
     * 新增银行卡
     */
    addBankCard: function () {
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      var userName = this.userName;
      var cardNumber = this.cardNumber;
      app.globalData.ShowMsgUtil.showLoadToast();

      if (app.globalData.CheckUtil.verifyName(userName)) {
        if (app.globalData.CheckUtil.verifyCardNumber(cardNumber)) {
          this.requestAddBankCard(userInfoCach, userName, cardNumber);
        }
      }
    },
    //新增银行卡请求
    requestAddBankCard: function (userInfoCach, userName, cardNumber) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.saveBankCard,
        data: {
          'cardHolder': userName,
          'cardNumber': cardNumber
        },
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          console.log('新增银行卡请求返回', res.data);

          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessAndReturn('新增成功', 2000);
						
						
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
@import "./addBankCard.css";
</style>