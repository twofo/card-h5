<template>
<view class="page">
  <view class="page__bd">
    <view class="weui-tab">

      <view class="content">
    
        <view class="list-box">
          <block v-for="(item, index) in recordList" :key="index">
            <view class="weui-cells weui-cells_after-title record-list">
              <view class="list-box-c">
                  <view class="weui-cell__bd">{{item.deviceName}}</view>
                  <view class="weui-cell__ft" style="color: rgb(32,164,247);">{{item.action}}</view>
              </view>
              <view class="list-box-detail">{{item.time}}</view>
            </view>
          </block>         
        </view>

      <text class="content-ending">{{active.remind}}</text>

      </view>
    </view>
  </view>
</view>
</template>

<script>
var app = getApp();
import recordLists from "../../resources/components/recordList/recordList";

export default {
  data() {
    return {
      recordList: [],
      roomId: '',
      'active': {
        data: [],
        showMore: true,
        remind: '上滑加载更多'
      },
      data: [],
      pullDownNumber: 0,
      loading: false
    };
  },

  components: {
    recordLists
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'roomId': options.roomId
    });
    this.setData({
      'loading': true,
      'active.data': [],
      'active.showMore': true,
      'active.remind': '上滑加载更多',
      'page': 0
    });
    this.getRecordByDevice(1, 10);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('------------------------门锁授权 - 操作记录------------------------');
  },
  //下拉更新
  onPullDownRefresh: function () {
    var _this = this;

    _this.setData({
      'loading': true,
      'active.data': [],
      'active.showMore': true,
      'active.remind': '上滑加载更多',
      'page': 0
    });

    this.getRecordByDevice(0, 10);
  },
  //上滑加载更多
  onReachBottom: function () {
    var _this = this;

    setTimeout(function () {
      if (_this.active.showMore) {
        console.log("-下拉--");

        _this.getRecordByDevice(0, (_this.pullDownNumber + 1) * 10);
      }
    }, 1000);

    _this.setData({
      'active.remind': '正在加载中'
    });
  },
  methods: {
    getRecordByDevice: function (skip, take) {
      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

      if (app.globalData.g_status) {
        _this.setData({
          'active.showMore': false,
          'active.remind': app.globalData.g_status,
          loading: false
        });

        wx.stopPullDownRefresh();
        return;
      }

      _this.setData({
        'active.remind': '正在加载中',
        'role': userInfoCach.role
      });
						app.globalData.ShowMsgUtil.netErrNotice();
      console.log("发起请求", app.globalData.RequestUrl.baseRequestUrl.getRoomOprRecored + '?roomId=' + _this.roomId + '&take=' + take + '&skip=' + skip);
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getRoomOprRecored + '?roomId=' + _this.roomId + '&take=' + take + '&skip=' + skip,
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'GET',

        success(res) {
          wx.stopPullDownRefresh();
          console.log('获取操作记录返回', res.data.rows);

          if (res.data && res.data.code == 200) {
            if (res.data.rows.length == 0) {
              _this.setData({
                'active.showMore': false,
                'active.remind': '没有更多啦'
              });

              return false;
            } else {
              _this.pullDownNumber++;
              var data = {
                'page': _this.page + 1,
                'active.showMore': true,
                'active.remind': '上滑加载更多'
              };

              _this.setData(data);

              for (let i = 0; i < res.data.rows.length; ++i) {
                res.data.rows[i].operateAction = app.globalData.Utils.publicUtil.getDeviceStatusS(res.data.rows[i].operateAction);
              }

              _this.setData({
                recordList: res.data.rows
              });
            }
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);

            _this.setData({
              'active.remind': '加载失败'
            });
          }
        },

        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideNavigationBarLoading();
          wx.stopPullDownRefresh();

          _this.setData({
            loading: false
          });
        }
      });
    }
  }
};
</script>
<style>
@import "./deviceOperationRecord.css";
</style>