<template>
<view>
	<view class="searchBox">
		<select-inp @mysearchValLen="mysearchValLen" placeholder="请输入关键字"></select-inp>
	</view>
  <scroll-view scroll-y lower-threshold="20" :style="'height:' + sHeight + 'px'" @scrolltolower="lower">
    <view class="foundList" :style="'min-height:' + (sHeight+10) + 'px'">
      
      <view v-for="(item, index) in lostArr" :key="index" class="foundItems" :id="item.id" @tap="gotoPage" v-if="lostArr.length>0">
        <image :src="item.img" class="foundImg" mode="aspectFit" v-if="item.img.length>0"></image>
        <view class="foundInfo" :style="'width: ' + ( item.img.length>0 ? sWidth : sWidth +125) + 'px;'">
          <view class="foundThingName">
            <text>物品: </text>
            <text>{{item.lostName}}</text>
          </view>
          <view class="fontSize14">
            <text>发布时间: </text>
            <text>{{item.postTime}}</text>
          </view>
          <view class="fontSize14 foundDesc">
            <text>失物详情: </text>
            <text>{{item.lostDesc}}</text>
          </view>
          <view v-if="item.status" class="lostStatus">{{item.status}}</view>
        </view>
      </view>
      <view class="nomore" v-if="loadMore">----到底了----</view>
      <view v-if="lostArr.length==0" class="nomore">
        暂无数据
      </view>
    </view>
  </scroll-view>
</view>
</template>

<script>
let app = getApp();
import selectInp from "../../../../components/attendanceModule/searchAppiontPerson/searchAppiontPerson";

export default {
  data() {
    return {
      sWidth: 200,
      lostArr: [],
      sHeight: 520,
      curPage: 0,
      loadMore: false
    };
  },

  components: {
    selectInp
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.globalData);
    let sWidth = app.globalData.SystemInfo.screenWidth - 125;
    let sHeight = app.globalData.SystemInfo.screenHeight - app.globalData.SystemInfo.statusBarHeight - 110;
    this.setData({
      sWidth,
      sHeight
    });
    this.getLostFoundList(5, 0);
  },
  methods: {
    mysearchValLen(e) {
      console.log(e);
      let val = e.detail.value;
      let skip = '0&searchName=' + val;
      this.getLostFoundList(5, skip);
    },

    gotoPage(e) {
      let id = e.currentTarget.id;
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.lostAndFoundDetail + "?id=" + id, 500);
    },

    getLostFoundList: function (take, skip) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getLostFoundList + '?take=' + take + '&skip=' + skip,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取失物列表返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.reduceData(res.data.data);

            _this.setData({
              loadMore: false
            });

            if (_this.curPage != res.data.data.length) {
              _this.curPage = res.data.data.length;
            } else if (res.data.data.length == 0) {
              _this.setData({
                loadMore: false
              });
            } else {
              console.log("到底了");

              _this.setData({
                loadMore: true
              });
            }
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
      let lostArr = [];
      data.forEach((val, key) => {
        let obj = {};
        obj.id = val.id;
        obj.img = val.arrayArticleImages == null || data.arrayArticleImages == [] ? [] : val.arrayArticleImages[0];
        obj.lostName = val.articleName;
        obj.postTime = val.releseTime;
        obj.type = val.articleType;
        obj.lostDesc = val.articleDescription;
        lostArr[key] = obj;
      });
      this.setData({
        lostArr
      });
    },

    // 上拉加载
    lower() {
      if (!this.loadMore) {
        this.getLostFoundList(this.curPage * 2, 0);
      }
    }

  }
};
</script>
<style>
@import "./foundThings.css";
</style>