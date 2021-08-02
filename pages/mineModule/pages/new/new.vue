<template>
<view class="page">
  <!--列表-->
  <view class="content">
    <new-all-lists :allAlarmNews="active.data"></new-all-lists>
  </view>

  <!--提醒消息-->
  <view class="content-ending">
    <text>{{active.remind}}</text>
  </view>
  
</view>
</template>

<script>
var app = getApp();
import newAllLists from "../../../../components/tarbarModule/newAllList/newAllList";

export default {
  data() {
    return {
      'active': {
        data: [],
        showMore: true,
        remind: '上滑加载更多'
      },
      data: [],
      pullDownNumber: 0,
      deviceTypeId: '',
      loading: false
    };
  },

  components: {
    newAllLists
  },
  props: {},
  onLoad: function (options) {
    var devicetypeid = options.devicetypeid;

    if (devicetypeid == 3) {
      devicetypeid = 4;
    } else if (devicetypeid == 4) {
      devicetypeid = 5;
    } else if (devicetypeid == 5) {
      devicetypeid = 21;
    }

    this.setData({
      'active.data': [],
      'active.showMore': true,
      'active.remind': '上滑加载更多',
      'deviceTypeId': devicetypeid
    });
    this.getNewsList(0, 10);
  },
  //下拉更新
  onPullDownRefresh: function () {
    var _this = this;

    _this.setData({
      'active.data': [],
      'active.showMore': true,
      'active.remind': '上滑加载更多'
    });

    this.getNewsList(0, 10);
  },
  //上滑加载更多
  onReachBottom: function () {
    var _this = this;

    setTimeout(function () {
      if (_this.active.showMore) {
        _this.getNewsList(0, (_this.pullDownNumber + 1) * 10);
      }
    }, 1000);

    _this.setData({
      'active.remind': '正在加载中'
    });
  },
  methods: {
    //获取新闻列表
    getNewsList: function (skip, take) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      _this.setData({
        'active.remind': '正在加载中'
      });

      wx.showNavigationBarLoading();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getAlarmByUserId + '?skip=' + skip + '&take=' + take + '&deviceTypeId=' + _this.deviceTypeId,
        header: {
          'token': userInfoCach.token
        },
        method: 'GET',
        success: function (res) {
          console.log('查询所有告警信息', res.data);
          wx.stopPullDownRefresh();

          if (res.data && res.data.code === 200) {
            if (res.data.rows.length == 0) {
              _this.setData({
                'active.showMore': false,
                'active.remind': '没有更多啦'
              });

              return false;
            } else {
              //3. 请求成功则次数加1
              _this.pullDownNumber++;
              let remind = '上滑加载更多';

              if (res.data.rows.length < 10) {
                remind = '';
              }

              _this.setData({
                'page': _this.page + 1,
                'active.data': res.data.rows,
                'active.showMore': true,
                'active.remind': remind
              });
            }
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('加载失败', res.data.msg);

            _this.setData({
              'active.remind': '加载失败'
            });
          }
        },
        fail: function (res) {
          app.globalData.ShowMsgUtil.showNoneToastByFail();

          _this.setData({
            'active.remind': '网络错误'
          });
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
@import "./new.css";
</style>