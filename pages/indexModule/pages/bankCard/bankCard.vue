<template>
<view class="page">

  <view v-if="showBankInfo.length>0">
  <view v-for="(item, index) in showBankInfo" :key="index">
    <view class="addBankCard bankCard-box" @tap="deleteCard" :id="index">
      <image :src="indexModuleUrl.bandCardPic" class="bankCard-pic"></image>
      <view class="bank-name">
        <text class="bank-name-1">{{item.bankName}}</text>
        <text style="font-size:15px;">{{item.cardTypeName}}</text>
      </view>
      <view class="cardNumber">{{item.bankCard}}</view>
    </view>
  </view>
  </view>
  <view class="addBankCard center" @tap='goToPage("/pages/indexModule/pages/addBankCard/addBankCard")'>
     
      <text>+ 添加银行卡</text>
   
  </view>

</view>
</template>

<script>
var app = getApp();
var BankUtil = require("../../resources/utils/wallet/bankCard/util.js");
var IndexModuleUrl = require("../../resources/utils/imageUrl.js");

export default {
  data() {
    return {
      indexModuleUrl: IndexModuleUrl,
      showBankInfo: [],
      bankCardList: [],
      count: 0
    };
  },

  components: {},
  props: {},
  onLoad: function () {
    console.log('------------------------银行卡------------------------');
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    this.requestQueryBankCardList(userInfoCach);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let {
      count
    } = this;

    if (count != 0) {
      console.log('------------------------银行卡------------------------');
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      this.requestQueryBankCardList(userInfoCach);
    }

    this.setData({
      count: 1
    });
  },
  methods: {
		goToPage(URL){
			uni.navigateTo({
				url:URL
			})
		},
    //请求查询银行卡列表
    requestQueryBankCardList: function (userInfoCach) {
			app.globalData.ShowMsgUtil.netErrNotice();
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;

      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.listIotBankCard,
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          console.log('银行卡查询列表返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.setData({
              bankCardList: res.data.rows
            }); // 生成页面展示信息


            _this.showBankInfoFun(res.data.rows.bankCardList);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },

        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideToast({});
        }
      });
    },
    // 生成页面展示信息
    showBankInfoFun: function (bankCard) {
      var showBankInfo = [];

      for (let i = 0; i < bankCard.length; ++i) {
        var oneBankInfo = {}; // 根据银行卡号获取信息

        var bankInfo = BankUtil.bankCardAttribution(bankCard[i].cardNumber);

        if (bankInfo === 'error') {
          oneBankInfo.bankName = '未知';
          oneBankInfo.cardTypeName = '无法识别';
          oneBankInfo.bankCard = this.bankCard(bankCard[i].cardNumber);
        } else {
          oneBankInfo.bankName = bankInfo.bankName;
          oneBankInfo.cardTypeName = bankInfo.cardTypeName;
          oneBankInfo.bankCard = this.bankCard(bankCard[i].cardNumber);
        }

        showBankInfo[i] = oneBankInfo;
      }

      this.setData({
        'showBankInfo': showBankInfo
      });
    },
    // 展示带星号的银行卡号
    bankCard: function (bankCard) {
      var newBankCard = '';

      for (let i = 0; i < bankCard.length - 4; ++i) {
        newBankCard = newBankCard + '*';
      }

      newBankCard = newBankCard + bankCard.substring(bankCard.length - 4, bankCard.length);
      return newBankCard;
    },
    deleteCard: function (e) {
      var _this = this;
      let index = e.currentTarget.id;
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.showModal({
        title: '提示',
        content: '是否删除该银行卡?',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.RequestUrl.baseRequestUrl.deleteBankCard,
              data: {
                cardId: _this.bankCardList.bankCardList[index].cardId
              },
              method: 'POST',
              header: {
                'token': userInfoCach.token,
                'content-type': 'application/json' //默认值
              },
              success: function (res) {
                console.log('删除银行卡返回', res.data);
                if (res.data && res.data.code == 200) {
                  app.globalData.ShowMsgUtil.showSuccessToast('删除成功', 2000);

                  _this.requestQueryBankCardList(userInfoCach);
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
      });
    }
  }
};
</script>
<style>
@import "./bankCard.css";
</style>