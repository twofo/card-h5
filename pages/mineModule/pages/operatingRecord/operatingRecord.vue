<template>
<view class="page">
  <view class="page__bd">
    <view class="weui-tab">
      <!-- 内容 -->
      <view class="content">
          <view v-if="recordList.length>0">
            <block v-for="(item, index) in recordList" :key="index">
              <view class="weui-cells weui-cells_after-title record-list">
                <view class="list-box-c">
                    <view class="weui-cell__bd">{{item.roomId}}</view>
                    <view class="weui-cell__ft">{{item.operateAction}}[{{item.operateType}}]</view>
                </view>
                <view class="list-box-detail">{{item.operateTime}}</view>
              </view>
            </block>
          </view>
          
          <view v-else style="margin-top:30%;">
            <view class="weui-loadmore weui-loadmore_line">
                <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无操作记录</view>
            </view>
            <view class="weui-loadmore weui-loadmore_line weui-loadmore_dot">
                <view class="weui-loadmore__tips weui-loadmore__tips_in-line weui-loadmore__tips_in-dot"></view>
            </view>
          </view>

      
      </view>

    </view>
  </view>
</view>
</template>

<script>
/**
 * 待完善
 * 友好提示语
 * 加载
 */
var app = getApp();
import navbarHeaderList from "../../../../components/mineModule/navbarHeaderList/navbarHeaderList";

export default {
  data() {
    return {
      tabs: app.globalData.Constant.arrayConstant.operatingRecordTabs,
      deviceTypeId: 0,
      deviceCach: [],
      userInfoCach: {},
      userDetailCach: {},
      recordList: [],
      operateType: '',
      //操作设备类型
      remind: '上滑加载更多',
      pullDownNumber: 0,
      windowHeight: ""
    };
  },

  components: {
    navbarHeaderList
  },
  props: {},

  /**
   * 生命周期函数--监听页面显示
   * 每进入一次页面，就判断user对象缓存及设备缓存是否存在？
   */
  onLoad: function () {
    console.log('------------------------操作记录------------------------');

    var _this = this;

    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    const deviceCach = app.globalData.StorageUtil.get('deviceCach'); // 设备缓存是否存在

    if (deviceCach != undefined && deviceCach != '') {
      _this.setData({
        deviceCach: deviceCach,
        windowHeight: wx.getSystemInfoSync().windowHeight
      });
    }

    _this.setData({
      userInfoCach: userInfoCach
    }); // 用户详情缓存是否存在


    const userDetailCach = app.globalData.StorageUtil.get('userDetailCach');

    if (userDetailCach) {
      _this.setData({
        userDetailCach: userDetailCach
      });
    } else {
      _this.getUserDetail();
    } // 进入页面默认查询10条数据


    _this.getOperateRecord(0, 0, 10);
  },
  //下拉更新
  onPullDownRefresh: function () {
    var _this = this;

    _this.setData({
      'loading': true,
      'remind': '上滑加载更多'
    });

    _this.getOperateRecord(0, 0, 10);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this; // TOMO 待完善，给请求响应留时间
  console.log('123');

    setTimeout(function () {
      if (_this.active.showMore) {
        _this.getOperateRecord(_this.deviceTypeId, 0, (_this.pullDownNumber + 1) * 10);
      }
    }, 1000);

    _this.setData({
      'active.remind': '正在加载中'
    });
  },
  methods: {
    /**
     * 接收组件点击后所传的值
     */
    onMyEvent: function (e) {
      var _this = this;

      var deviceTypeId = e.detail.deviceTypeId;

      _this.setData({
        deviceTypeId: deviceTypeId
      });

      _this.getOperateRecord(deviceTypeId, 0, 10);
    },

    /**
     * 获取操作记录
     * 根据不同的类型（电、水表）进行查询
     */
    getOperateRecord: function (deviceTypeId, skip, take) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      let userCode;
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getUserOperateDeviceRecords,
        data: {
          // 'userCode': userCode,
          'deviceTypeId': deviceTypeId,
          'take': take,
          'skip': skip
        },
        header: {
          'token': _this.userInfoCach.token,
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          console.log('获取设备操作记录返回', res.data);

          if (res.data && res.data.code == 200) {
            if (!res.data.rows) {
              _this.setData({
                'remind': '没有更多啦'
              });

              return false;
            }

            _this.pullDownNumber++;
            var data = {
              'remind': '上滑加载更多'
            };

            _this.setData(data); // for (let i = 0; i < res.data.rows.length; ++i) { 
            //   if (!app.getDeviceStatus(res.data.rows[i].operateAction)){
            //     res.data.rows[i].operateAction = app.getDeviceStatusS(res.data.rows[i].type);
            //   } else{
            //     res.data.rows[i].operateAction = app.getDeviceStatus(res.data.rows[i].operateAction);
            //   }  
            // }


            _this.setData({
              recordList: res.data.rows
            });
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
				complete:function(){
					uni.stopPullDownRefresh()
				}
      });
    },
    // 获取用户信息
    getUserDetail: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getUserDetail,
        data: {},
        header: {
          'token': _this.userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          console.log('用户详情返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.setData({
              userDetailCach: res.data.rows
            });

            app.globalData.StorageUtil.set('userDetailCach', res.data.rows);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败！', res.data.msg, res.data.code);
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
@import "./operatingRecord.css";
</style>