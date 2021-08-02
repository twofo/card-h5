<template>
<view class="page">
  <view class="page__bd" style="padding: 20rpx 30rpx; ">
    <!-- 评价统计头部 -->
    <view class="myui-header" style="font-size: 14px;">
      <!--  -->
      <view class="myui-header__left">
        <view class="header__left-circle">
          <view style="font-size: 17px;"><text style="font-size:25px;font-weight:500;">{{avager}}</text>分</view>
        </view>
        <text style="margin-top:20rpx;">{{totalNumber}}条评论</text>
      </view>
      <!-- 各个星的统计数 -->
      <view class="myui-header__right">

        <view v-for="(item, index) in percentList" :key="index">
          <view class=" page-section-gap" style="font-size: 17px;">
			  
			  
            <view class="progress-box">
              <text>{{item.name}}</text>
              <view class="progress-items">
                <progress :percent="item.percent" color="#20a4f7" show-info active stroke-width="6"></progress>
              </view>
            </view>
          </view>
        </view>
     
      </view>

    </view>
    <!-- 评论列表 -->
    <view style="margin-top:30rpx;">全部评论</view>
    <scroll-view scroll-y style="height: 750rpx;" class="myui-lists" lower-threshold="1" upper-threshold="10">
      <block v-if="list.length==0">
        <view class="weui-cells__box" style="height: 500rpx">暂无数据</view>
      </block>
      <block v-else>
        <view v-for="(item, index) in list" :key="index" class="myui-cells">
          <view class="myui-cell" style="margin-left: 5px;">
            <view class="weui-cell__hd" >{{item.commentName}}</view>
            <view class="weui-cell__bd">
              <!-- 星级 -->
              <view class="myui-center" style="  margin-top: -8rpx;">
                <label v-for="(is, index2) in item.starts" :key="index2">
                    <radio class="weui-check"  :checked="is.checked"></radio>
                    <view class="iconfont">
                      <image :src="is.classname" class="star"></image>
                    </view>
                </label>
              </view>
            </view>
           
          </view>
          <!-- 评论 -->
		
          <view class="myui-cell__msg">
            <view class="cell__text">
             <view  style="width: 100%;height: 2.9em;margin-left: 5px;">
              {{item.commentDesc}}
              </view> 
            </view>
        
            <!-- <textarea class='cell__text' value="{{item.commentDesc}}" style="width: 100%;height: 3.0em;" disabled="true"/> -->
          </view>
      <view class="myui-cell__ft">{{item.createdTime}}</view>
        </view>

      </block>
    </scroll-view>

  </view>
</view>
</template>

<script>
var app = getApp();
var ImageUrl = require("../../resources/utils/imageUrl.js");

export default {
  data() {
    return {
      list: [],
      // 评论列表
      percentList: [{
        name: '五星',
        percent: 0
      }, {
        name: '四星',
        percent: 0
      }, {
        name: '三星',
        percent: 0
      }, {
        name: '二星',
        percent: 0
      }, {
        name: '一星',
        percent: 0
      }],
      avager: 0.0,
      totalNumber: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------------------------评论统计------------------------');
    this.getCommentList(10, 0); // 维修端 - 评论列表

    this.getCommentStatistics(); // 维修端 - 评论统计 
  },
  methods: {
    /**
     *  获取评论列表 
     */
    getCommentList: function (take, skip) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.repairRequestUrl.getCommentStatistics + '?take=' + take + '&skip=' + skip,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取评论列表返回', res.data);

          if (res.data && res.data.code == 200) {
            let data = _this.dealLists(res.data.rows);

            _this.setData({
              list: data
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

    /**
     * 数据处理
     */
    dealLists: function (data) {
      for (let i = 0; i < data.length; i++) {
        let starts = [// 五星的数组
        {
          classname: ImageUrl.starOff,
          value: 1,
          checked: false
        }, {
          classname: ImageUrl.starOff,
          value: 2,
          checked: false
        }, {
          classname: ImageUrl.starOff,
          value: 3,
          checked: false
        }, {
          classname: ImageUrl.starOff,
          value: 4,
          checked: false
        }, {
          classname: ImageUrl.starOff,
          value: 5,
          checked: false
        }];

        for (let j = 0; j < data[i].commentRanks; j++) {
          starts[j].checked = true;
          starts[j].classname = ImageUrl.starOn;
        }

        if (data[i].hidden == 1) {
          data[i].commentName = "匿名";
        } else {
			// console.log(data[i].createdTime.substring(0,10))
          data[i].commentName = data[i].commentName.substring(0, 5);
		  
	
        }
	    data[i].createdTime = data[i].createdTime;
        data[i].starts = starts;
      }

      return data;
    },

    /**
     *  获取评论统计
     */
    getCommentStatistics: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.repairRequestUrl.selectStatisticsOfComment,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取评论统计返回', res.data);

          if (res.data && res.data.code == 200) {
            let data = res.data.rows;

            _this.dealStatistics(data);
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

    /**
     * 
     */
    dealStatistics: function (data) {
      let percentList = this.percentList;
      let total = data.oneStartNumber + data.twoStartNumber + data.threeStartNumber + data.fourStartNumber + data.fiveStartNumber;
      percentList[4].percent = total == 0 ? 0.0 : (data.oneStartNumber / total * 100).toFixed(1);
      percentList[3].percent = total == 0 ? 0.0 : (data.twoStartNumber / total * 100).toFixed(1);
      percentList[2].percent = total == 0 ? 0.0 : (data.threeStartNumber / total * 100).toFixed(1);
      percentList[1].percent = total == 0 ? 0.0 : (data.fourStartNumber / total * 100).toFixed(1);
      percentList[0].percent = total == 0 ? 0.0 : (data.fiveStartNumber / total * 100).toFixed(1);
      let avager = 0.0;

      if (total != 0) {
        avager = ((data.oneStartNumber * 1 + data.twoStartNumber * 2 + data.threeStartNumber * 3 + data.fourStartNumber * 4 + data.fiveStartNumber * 5) / total).toFixed(1);
      }

      this.setData({
        percentList: percentList,
        totalNumber: total,
        avager: avager
      });
    }
  }
};
</script>
<style>
@import "./commentStatistics.css";
</style>