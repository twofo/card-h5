<template>
<view class="page">

  <!-- 一、头部 -->
  <view class="reporter-user">
    <text class="reporter-detail-title">持卡人信息</text>
  </view>

  <!-- 二、用户信息列表 -->
  <view class="page__bd">
    <user-detail-list :userDetailCach="userDetailCach" :userInfoCach="userInfoCach" :isUserDetail="1"></user-detail-list>
  </view>

  <!-- 提交申请按钮 -->
  <view class="page__bd page__bd_spacing">
    <button class="weui-btn page_submit" type="primary" :disabled="disabled" @tap="submitApply">提交申请</button>
  </view>

</view>
</template>

<script>
//获取应用实例
var app = getApp();
import userDetailList from "../../../../components/mineModule/userDetailList/userDetailList";

export default {
  data() {
    return {
      userDetailCach: {},
      userInfoCach: {},
      cardState: '',
      disabled: false
    };
  },

  components: {
    userDetailList
  },
  props: {},
  onLoad: function () {
    console.log('------------------------卡挂失申请------------------------');

    var _this = this;

    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

    _this.setData({
      userInfoCach: userInfoCach
    }); // 用户详情缓存是否存在


    const userDetailCach = app.globalData.StorageUtil.get('userDetailCach');

    if (userDetailCach) {
      // 将null值转化为暂无
      let userDetail = app.globalData.PublicUtil.isNullDeal(userInfoCach, userDetailCach);

      _this.setData({
        userDetailCach: userDetail
      });
    } else {
      // 提高用户体验。获取数据时，先弹窗加载。加载成功后则取消
      _this.getUserDetail();
    }
  },
  methods: {
    /**
     * 获取用户信息
     */
    getUserDetail: function () {
			app.globalData.ShowMsgUtil.netErrNotice();
      app.globalData.ShowMsgUtil.showLoadToast();

      var _this = this;

      var userInfoCach = _this.userInfoCach;
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getUserDetail,
        data: {},
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          console.log('用户详情返回', res.data); // 取消加载弹窗

          wx.hideToast();

          if (res.data && res.data.code == 200) {
            // 将null值转化为暂无
            let userDetail = app.globalData.PublicUtil.isNullDeal(userInfoCach, res.data.rows);

            _this.setData({
              userDetailCach: userDetail
            });

            app.globalData.StorageUtil.set('userDetailCach', res.data.rows);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },

        fail: function () {
          wx.hideToast();
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    /**
     * 未连接后台提示
     */
    // showNetError: function () {
    //   var _this = this;
    //   app.showNetWorkError('网络异常');
    //   setTimeout(function () {
    //     _this.setData({
    //       msg: '后台开小差了，请稍后再试！'
    //     })
    //     wx.hideNavigationBarLoading()
    //   }, 5000)
    // },

    /**
     * 提交挂失申请
     */
    submitApply: function (e) {
      var _this = this;

      wx.showModal({
        title: '提示',
        content: '是否确认提交申请？',
        confirmColor: '#20a4f7',
        success: function (res) {
          if (res.confirm) {
            _this.getCard();
          }
        }
      });
    },

    /**
     * 获取卡的状态
     */
    getCard: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getCardInfo,
        header: {
          'token': _this.userInfoCach.token
        },
        method: 'GET',
        success: function (res) {
          console.log('获取卡状态返回', res.data);

          if (res.data && res.data.code == 200) {
            if (res.data.rows.cardState == 1) {
              app.globalData.ShowMsgUtil.showErrorModal('挂失失败！', '该卡号未激活');
              return;
            }

            if (res.data.rows.cardStatus == 3) {
              app.globalData.ShowMsgUtil.showErrorModal('挂失失败！', '该卡号已挂失');
              return;
            }

            if (res.data.rows.cardStatus == 4) {
              app.globalData.ShowMsgUtil.showErrorModal('挂失失败！', '该卡号已被冻结');
              return;
            }

            if (res.data.rows.cardStatus == 2) {
              console.log('卡挂失申请提交');

              _this.submitRequest();
            }
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    /**
     * 提交挂失向后台请求
     */
    submitRequest: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      var token = _this.userInfoCach.token;
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.cardLossApply,
        data: {},
        header: {
          'token': token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',
        success: function (res) {
          console.log('挂失申请返回', res.data);

          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessAndReturn('挂失申请成功！', 2000);
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
@import "./lossApply.css";
</style>