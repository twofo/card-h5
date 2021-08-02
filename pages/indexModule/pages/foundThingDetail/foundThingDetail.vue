<template>
<view>
<view v-for="(item, index) in lostDetailArr" :key="index" class="lostThingsDetail">
		<swiper :indicator-dots="indicatorDots" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" v-if="item.img.length >0" :autoplay="autoplay">
				<swiper-item>
					<view class="swiper-item ">
						<image v-for="(pic, index2) in item.img" :key="index2" :src="pic" class="lostThingImg"></image>
					</view>
				</swiper-item>
		</swiper>
		<view class="lostThingInfoBox">
			<view class="lostThingInfo">
				<view class="lostList">
					<text class="lostName">物品名称</text>
					<text>{{item.lostName}}</text>
				</view>
				<view class="lostList">
					<text class="lostName">失物类型</text>
					<text>{{item.type}}</text>
				</view>
				<view class="lostList">
					<text class="lostName">联 系 人</text>
					<text>{{item.connection}}</text>
				</view>
				<view class="lostList">
					<text class="lostName">联系方式</text>
					<text class="phoneNum" :data-phone="item.phoneNum" @tap="phoneCell">{{item.phoneNum}}</text>
				</view>
				<view class="lostList">
					<text class="lostName">发布时间</text>
					<text>{{item.postTime}}</text>
				</view>
			</view>
			<view class="lostDesc">
				<text class="lostName">失物详情</text>
				<text class="lostDesction">{{item.lostDesc}}</text>
			</view>
		</view>
</view>
</view>
</template>

<script>
let app = getApp();

export default {
  data() {
    return {
      indicatorDots: true,
      autoplay: false,
      indicatorColor: "#FFFFFF",
      indicatorActiveColor: "#CECECE",
      lostDetailArr: []
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLostFoundDetail(options.id);
  },
  methods: {
    phoneCell(e) {
      let phone = e.currentTarget.dataset.phone;
      console.log(phone);
      wx.makePhoneCall({
        phoneNumber: phone
      });
    },

    getLostFoundDetail: function (lostId) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getLostFoundDetail + '/' + lostId,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('获取失物详情返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.reduceData(res.data.data);
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

    reduceData(data) {
      let lostDetailArr = [];
      let obj = {};
      let type = data.articleType == 1 ? '饭卡' : data.articleType == 2 ? '手机' : data.articleType == 3 ? '身份证' : data.articleType == 4 ? '银行卡' : data.articleType == 5 ? '数码设备' : '其他';
      obj.img = data.arrayArticleImages == null || data.arrayArticleImages == [] ? [] : data.arrayArticleImages, obj.lostName = data.articleName, obj.type = type, obj.connection = data.contactPerson, obj.phoneNum = data.contactInformation, obj.lostDesc = data.articleDescription, obj.postTime = data.releseTime;
      lostDetailArr[0] = obj;
      this.setData({
        lostDetailArr
      });
    }

  }
};
</script>
<style>
@import "./foundThingDetail.css";
</style>