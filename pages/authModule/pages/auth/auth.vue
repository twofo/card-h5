<template>
<view>
<view v-if="canIUse">
    <view class="header">
        <image src="/static/pages/authModule/resources/pic/logo.png"></image>
    </view>
    
    <view v-if="getUserInfo">
        <view class="content">
            <view>申请获取以下权限</view>
            <text>获得你的公开信息(昵称，头像等)</text>
        </view>
    
        <button class="bottom" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">
            授权登录
        </button>
    </view>
    <view v-else>
        <view class="content">
            <view>申请获取以下权限</view>
            <text>获得微信绑定手机号码</text>
        </view>
    
        <button class="bottom" type="primary" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getPhoneNumber">
            获取手机号
        </button>
    </view>


     <!-- 弹窗 -->
    <view class="modal-mask" @tap="hideModal" v-if="showModel"></view>
    <view class="modal-dialog" v-if="showModel">
      <view class="modal-title">微信绑定手机号与账户绑定手机号不一致</view>
      <view class="modal-content">
        <view class=" weui-cells_after-title">
          <view class>
            <view class="weui-cell__bd">
              <view>
                  <text>账户绑定手机号:</text>
                  <view class="centerFont">{{moblie}}</view>
              </view>
              <view style="margin-top:10rpx">
                  <text>微信绑定手机号:</text>
                  <view class="centerFont">{{wechatPhone}}</view>
              </view>
              <view style="margin-top:30rpx">
                  是否将账号绑定手机号码 更换成 <text class="fontBlod">微信绑定手机号</text> 
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 按钮 -->
      <view class="myui-cell-bottom" style="font-size:16px;margin-top:10rpx;">
        <view class="myui-cell-bottom__bd myui-center dangerColor" @tap="cancel">取 消</view>
        <view class="myui-cell-bottom__fd myui-center" @tap="confirm">立即更换</view>
      </view>

    </view>
</view>
 
<view v-else>请升级微信版本</view>
</view>
</template>

<script>
const app = getApp();

export default {
  data() {
    return {
      //判断小程序的API，回调，参数，组件等是否在当前版本可用。
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      getUserInfo: true,
      //是否是获取用户信息还是手机号码
      sessionKey: null,
      wechatPhone: null,
      //微信绑定手机号
      moblie: null,
      //账户绑定手机号
      showModel: false
    };
  },

  components: {},
  props: {},
  methods: {
    showNetError: function () {
      var _this = this;

      app.globalData.showNetWorkError('网络异常');
      setTimeout(function () {
        wx.redirectTo({
          url: app.globalData.PageUrl.authPageUrl.loginUrl
        });
        wx.hideNavigationBarLoading();
      }, 5000);
    },
    bindGetUserInfo: function (e) {
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

      if (e.detail.userInfo) {
        var that = this;
        var userInfo = e.detail.userInfo;
        wx.login({
          success: function (res) {
            // console.log(res);
						app.globalData.ShowMsgUtil.netErrNotice();
            wx.request({
              url: app.globalData.RequestUrl.payRequestUrl.getOpenID,
              data: {
                code: res.code
              },
              method: 'POST',
              header: {
                'token': userInfoCach.token
              },
              success: function (res) {
                console.log('请求openId-', res.data);

                if (res.data && res.data.code === 200) {
                  app.globalData.StorageUtil.set('openid', res.data.rows.openId);
                  app.globalData.StorageUtil.set('userInfoByDevice', userInfo); //将openid存入用户表
                  // 判断是否满足前提条件 
                  // wx.navigateBack({
                  //   delta: 1
                  // })
                  // 登陆成功获取手机号码

                  that.setData({
                    getUserInfo: false,
                    sessionKey: res.data.rows.sessionKey
                  });
                } else {
                  app.globalData.ShowMsgUtil.showErrorModal('授权失败', res.data.msg, res.data.code);
                }
              },
              fail: function () {
                app.globalData.ShowMsgUtil.showNoneToastByFail();
                setTimeout(function () {
                  wx.redirectTo({
                    url: app.globalData.PageUrl.authPageUrl.loginUrl
                  });
                }, 2000);
              }
            });
          },
          fail: function () {
            app.globalData.ShowMsgUtil.showNoneToastByFail();
            setTimeout(function () {
              wx.redirectTo({
                url: app.globalData.PageUrl.authPageUrl.loginUrl
              });
            }, 2000);
          }
        });
      } else {
        //用户按了拒绝按钮
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击了“返回授权”');
            }
          }
        });
      }
    },

    getPhoneNumber(e) {
      // console.log(e.detail.errMsg)
      // console.log(e.detail.iv)
      // console.log(e.detail.encryptedData)
      let msg = e.detail.errMsg;
      let iv = e.detail.iv;
      let encryotedData = e.detail.encryptedData;

      let _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      this.setData({
        moblie: userInfoCach.mobile
      });

      if (msg == 'getPhoneNumber:ok') {
        wx.request({
          url: app.globalData.RequestUrl.baseRequestUrl.getUserPhone,
          data: {
            encryptedData: encryotedData,
            iv: iv,
            session_key: this.sessionKey
          },
          method: 'POST',
          header: {
            'token': userInfoCach.token
          },

          success(res) {
            console.log(res);

            if (userInfoCach.mobile != res.data.msg) {
              _this.setData({
                wechatPhone: res.data.msg,
                showModel: true
              });
            } else {
              app.globalData.PublicUtil.switchTabByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl, 1000);
            }
          },

          fail(err) {
            console.log(err);
          }

        });
      } else {
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击了“返回授权”');
            }
          }
        });
      }
    },

    //弹窗
    hideModal() {
      this.setData({
        showModel: false
      });
    },

    cancel(e) {
      this.hideModal();
      app.globalData.PublicUtil.switchTabByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl, 500);
    },

    confirm(e) {
      let _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.updatePhone,
        data: {
          phone: this.wechatPhone
        },
        method: "POST",
        header: {
          'token': userInfoCach.token
        },

        success(res) {
          console.log("更改手机号码");
          console.log(res);

          _this.getUserInfoFn(userInfoCach.token, userInfoCach.username, userInfoCach.role);

          app.globalData.PublicUtil.switchTabByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl, 500);
        },

        fail(err) {}

      });
      this.hideModal();
    },

    getUserInfoFn(token, username, role) {
      let _this = this;

      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.switchRole,
        data: {
          username: username,
          role: role
        },
        header: {
          'token': token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          if (res.data && res.data.code == 200) {
            let userInfo = res.data.rows; // 1.设置userInfo缓存。

            console.log(userInfo);
            app.globalData.StorageUtil.set('userInfoCach', userInfo);
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
@import "./auth.css";
</style>