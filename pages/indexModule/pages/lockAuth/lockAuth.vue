<template>
<view class="page">
   
    <view class="page__bd">

        <view class="weui-cells weui-cells_after-title top">

          <view v-if="radioItems.length > 0">
            <radio-group @change="radioChange">
                <label v-for="(item, index) in radioItems" :key="index" class="weui-cell weui-check__label">
                    <radio class="weui-check" :value="item.value" :checked="item.checked"></radio>
                    <view v-if="!item.imageSrc">
                      <image class="admin-pic" src="/static/images/mine/admin-1.png"></image>
                    </view>
                     <view v-else>
                      <image :src="item.imageSrc" class="admin-pic"></image>
                    </view>
                    <view class="weui-cell__bd name">{{item.name}}</view>
                    <view class="weui-cell__ft weui-cell__ft_in-radio" v-if="item.checked">
                        <icon class="weui-icon-radio" type="success_no_circle" size="16"></icon>
                    </view>
                </label>
            </radio-group>
          </view>
          <view v-if="radioItems.length == 0">
            <view class="person-box">
              <text class="content-ending">该房间暂无人员</text>
            </view>
          </view>

        </view>

        <view class="weui-cells weui-cells_after-title top">
          <picker @change="bindPickerChange" :value="index" :range="itemList"> 
            <view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <view class="weui-cell__bd">有效时间</view>
                <view class="weui-cell__ft weui-cell__ft_in-access">{{itemList[index]}}</view>
            </view>
          </picker>
        </view>

        <view class="page__bd page__bd_spacing bottom">
          <button class="weui-btn" type="primary" @tap="confirmAuth">确定</button>
        </view>
    </view>
</view>
</template>

<script>
var app = getApp();

export default {
  data() {
    return {
      radioItems: [],
      roomCode: '',
      roomId: '',
      deviceCode: '',
      itemList: [],
      index: 0,
      radioId: 0
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------------------------门锁授权------------------------'); // console.log('接收到房间编号', options.roomCode);
    // console.log('接收到设备编号', options.deviceCode);
    // 根据房间编号与门锁编号获取房间里人员

    this.getPersonByRoomId(options.roomCode, options.deviceCode);
    app.globalData.ShowMsgUtil.showLoadAndMsgToast();
    this.setData({
      'roomCode': options.roomCode,
      'roomId': options.roomId,
      'deviceCode': options.deviceCode
    });
    this.getAuthTime();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  methods: {
    /**
     * 门锁授权 - 获取房间人员信息
     */
    getPersonByRoomId: function (roomCode, deviceCode) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      var radioItems = [];
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.roomPersonnels + '?roomCode=' + roomCode + '&deviceCode=' + deviceCode,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取房间人员信息返回', res.data);

          if (res.data && res.data.code == 200) {
            for (let i = 0; i < res.data.rows.length; ++i) {
              var items = {};

              if (i == 0) {
                items.checked = true;
              } else {
                items.checked = '';
              }

              items.name = res.data.rows[i].personnelName;
              items.imageSrc = res.data.rows[i].avatar;
              items.personnelCode = res.data.rows[i].personnelCode;
              items.value = i;
              radioItems.push(items);
            }

            _this.setData({
              'radioItems': radioItems
            });
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
    radioChange: function (e) {
      this.setData({
        'radioId': e.detail.value
      });
      var radioItems = this.radioItems;

      for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
      }

      this.setData({
        radioItems: radioItems
      });
    },
    bindPickerChange: function (e) {
      this.setData({
        index: e.detail.value
      });
    },

    /**
     * 门锁授权 - 查询到可配置的可授权时间信息
     */
    getAuthTime: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); // 查询可授权时间

      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.authorityTime,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('查询到可配置的可授权时间信息返回', res.data);

          if (res.data && res.data.code == 200) {
            for (let i = 0; i < res.data.rows.authorityTime.length - 1; ++i) {
              for (let j = 0; j < res.data.rows.authorityTime.length - i - 1; ++j) {
                if (res.data.rows.authorityTime[j] > res.data.rows.authorityTime[j + 1]) {
                  var hand = res.data.rows.authorityTime[j];
                  res.data.rows.authorityTime[j] = res.data.rows.authorityTime[j + 1];
                  res.data.rows.authorityTime[j + 1] = hand;
                }
              }
            }

            _this.setData({
              'itemList': res.data.rows.authorityTime
            });
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
    // 确定授权
    confirmAuth: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      app.globalData.ShowMsgUtil.showLoadAndMsgToast('授权加载中', 2000);

      if (!_this.radioItems[_this.radioId]) {
        app.globalData.ShowMsgUtil.showErrorModal('授权失败', '请先选择授权的人');
        return;
      }

      if (!_this.itemList[_this.index]) {
        app.globalData.ShowMsgUtil.showErrorModal('授权失败', '请先授权时间');
        return;
      }

      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.limitTimeAuthorization,
        data: {
          'userCode': _this.radioItems[_this.radioId].personnelCode,
          'roomId': _this.roomId,
          'deviceCode': _this.deviceCode,
          'time': _this.itemList[_this.index]
        },
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          console.log('门锁授权返回', res.data.code);
          wx.hideToast();

          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessAndReturn('门锁授权成功！', 2000);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('授权失败', res.data.msg, res.data.code);
          }
        },

        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideToast({});
        }
      });
    }
  }
};
</script>
<style>
@import "./lockAuth.css";
</style>