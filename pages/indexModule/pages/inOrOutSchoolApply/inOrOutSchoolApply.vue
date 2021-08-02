<template>
<!--pages/indexModule//pages/inOrOutSchoolApply/inOrOutSchoolApply.wxml-->
<view class="page">
  <view class="page__bd" style="padding: 15rpx 10rpx;">

      <view class="weui-cells weui-cells_after-title myui-cells-items">
          <view class="weui-cell ">
              <view class="weui-cell__bd" style="color:#20a4f7">基本信息</view>
          </view>
      </view>      
      <!-- 个人信息 -->
      <view class="weui-cells weui-cells_after-title myui-cells-items" style="margin-top:6px;">

        <view class="weui-cell">
          <view class="weui-cell__hd">姓名</view>
          <view class="weui-cell__bd weui-cell__bdt">{{userInfo.name}}</view>
        </view>
        <view class="weui-cell">
            <view class="weui-cell__hd ">学号</view>
            <view class="weui-cell__bd weui-cell__bdt">{{userInfo.username}}</view>
        </view>
        <view class="weui-cell">
            <view class="weui-cell__hd">手机号</view>
            <view class="weui-cell__bd weui-cell__bdt" style="color:#20a4f7;">{{userInfo.mobile}}</view>
        </view>

      </view>

      <!-- 申请信息 -->
      <view class="weui-cells weui-cells_after-title myui-cells-items" style="margin-top:10px;">
          <view class="weui-cell ">
              <view class="weui-cell__bd" style="color:#20a4f7">申请信息</view>
          </view>
      </view>     

       <view class="weui-cells weui-cells_after-title myui-cells-items" style="margin-top:6px;">

        <view class="weui-cell ">
            <view class="weui-cell__hd">申请类型</view>
            <view class="weui-cell__bd weui-cell__bdt" v-if="applyType==1">留校申请</view>
            <view class="weui-cell__bd weui-cell__bdt" v-if="applyType==2">外宿申请</view>
        </view>
        <view class="weui-cell weui-cell_input">
            <view class="weui-cell__hd">
                <view class="weui-label">开始时间</view>
            </view>
            <view class="weui-cell__bd">
                <picker mode="date" :value="startTime" start="2018-01-01" end="2030-01-01" @change="bindStartTimeDateChange">
                    <view class="weui-input">{{startTime}}</view>
                </picker>
            </view>
            <view class="weui-cell__ft weui-cell__ft_in-access"></view>
        </view>
        <view class="weui-cell weui-cell_input weui-cell_access">
            <view class="weui-cell__hd">
                <view class="weui-label">结束时间</view>
            </view>
            <view class="weui-cell__bd">
                <picker mode="date" :value="endTime" start="2018-01-01" end="2030-01-01" @change="bindEndTimeDateChange">
                    <view class="weui-input">{{endTime}}</view>
                </picker>
            </view>
            <view class="weui-cell__ft weui-cell__ft_in-access"></view>
        </view>
        <view class="weui-cell">
            <!-- <view class="weui-cell__hd">
                <image src="{{imageObj.requiredPic}}" class="image-items"></image>
            </view> -->
            <view class="weui-cell__bd">
                <textarea class="weui-textarea" placeholder="请输入申请原因..." style="height: 3.3em" :maxlength="200" @input="bindInputReason"></textarea>
                <!-- <view class="weui-textarea-counter">0/200</view> -->
            </view>
        </view>
        <view class="weui-cell weui-cell_input">
            <view class="weui-cell__hd">
                <view class="weui-label" v-if="applyType==1">家庭地址</view>
                <view class="weui-label" v-if="applyType==2">外宿地址</view>
            </view>
            <view class="weui-cell__bd">
                <input class="weui-input" placeholder="请输入...." @input="bindInputAddress"></input>
            </view>
        </view>
        <view class="weui-cell weui-cell_input">
            <view class="weui-cell__hd">
                <view class="weui-label" v-if="applyType==1">父/母电话</view>
                <view class="weui-label" v-if="applyType==2">房东电话</view>
            </view>
            <view class="weui-cell__bd">
                <input class="weui-input" placeholder="请输入...." @input="bindInputMobile"></input>
            </view>
        </view>


      </view> 

      <view class="page__bd page__bd_spacing button_top">
        <button class="weui-btn" type="primary" :disabled="disableBtn" form-type="submit" @tap="confirmApply">提交</button>
      </view>

  </view>
</view>
</template>

<script>
// pages/indexModule//pages/inOrOutSchoolApply/inOrOutSchoolApply.js
var app = getApp();
var ImageUrl = require("../../resources/utils/imageUrl.js");

export default {
  data() {
    return {
      startTime: '',
      endTime: '',
      reason: '',
      applyType: '',
      //图片对象
      imageObj: ImageUrl,
      disableBtn: false //点击事件阻止多次点击
      ,
      userInfo: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options && options.applyType) {
      // 设置导航栏为对应导航
      wx.setNavigationBarTitle({
        title: options.applyType == 1 ? "宿舍服务_留校申请" : "宿舍服务_外宿申请"
      });
      this.setData({
        applyType: options.applyType
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    this.setData({
      userInfo: userInfoCach
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  methods: {
    bindStartTimeDateChange: function (e) {
      this.setData({
        startTime: e.detail.value
      });
    },
    bindEndTimeDateChange: function (e) {
      this.setData({
        endTime: e.detail.value
      });
    },
    bindInputReason: function (e) {
      this.reason = e.detail.value;
    },
    bindInputAddress: function (e) {
      this.address = e.detail.value;
    },
    bindInputMobile: function (e) {
      this.mobile = e.detail.value;
    },
    confirmApply: function () {
      var _this = this; //防止多次点击

						app.globalData.ShowMsgUtil.netErrNotice();
      let disableBtn = true;
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.inOrOutSchoolApply,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {
          applyType: this.applyType,
          applyUserId: userInfoCach.userId,
          applyReason: this.reason,
          applyStartTime: new Date(this.startTime).getTime(),
          applyEndTime: new Date(this.endTime).getTime(),
          address: this.address,
          phone: this.mobile
        },
        success: function (res) {
          wx.hideToast({});
          console.log('留校、外宿申请返回', res.data);

          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessToast("申请成功", 2000); //跳转到会议列表

            app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.inOrOutSchoolListUrl, 2000);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);

            _this.setData({
              disableBtn: false
            });

            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();

          _this.setData({
            disableBtn: false
          });
        }
      });
    }
  }
};
</script>
<style>
@import "./inOrOutSchoolApply.css";
</style>