<template>
<view class="page">
    <view class="page__bd">
      <!-- navbar导航 -->
      <navbar :tabs="tabs" @clickTabs="bindClickTabs"></navbar>
      <!-- 消费记录列表 -->
      <view v-if="consumeList.length>0" class="background-up-list">
       <!-- <meeting-list class="meetingList" @toDetail="toDetail" @lowers="lower" :windowHeight="scrollHeight" :listArr="attendPianoListArr" :nomore="nomore" :titleTxtArr="titleTxtArr"></meeting-list> -->
		<record-lists :alarmNewsList="consumeList" @lowers="lower" :height="windowHeight-65" @pull="bindPullUp" :listLength="listLength" :nomore="nomore" ></record-lists>
      </view>
      <view v-else style="margin-top:30%;">
          <view class="weui-loadmore weui-loadmore_line">
              <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无消费记录</view>
          </view>
          <view class="weui-loadmore weui-loadmore_line weui-loadmore_dot">
              <view class="weui-loadmore__tips weui-loadmore__tips_in-line weui-loadmore__tips_in-dot"></view>
          </view>
      </view>
    </view>
</view>
</template>
<script>
var app = getApp();
import navbar from "../../../../components/attendanceModule/navbar/navbar";
import recordLists from "../../resources/components/consumeRecordList/consumeRecordList";
import msgNoData from "../../../../components/common/msgNoData/msgNoData";
export default {
  data() {
    return {
      tabs: ["全部", "支出", "收入"],
      activeIndex: 0,
      //选中了哪一块
      consumeList: [],
      // 1. 定义请求次数（即下拉刷新）
      pullDownNumber: 0,
      listLength: 1,
      // 用于判断已经查询所有数据
      windowHeight: 510,
      nomore: false,
      //上拉加载结束提示
      isCanLoad: true,
      //用于控制下滑加载，从后台加载数量
      recordCount: 0,
      scrollTop: 0
    };
  },
  components: {
    navbar,
    recordLists,
    msgNoData
  },
  props: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------------------------钱包消费记录查询------------------------');
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    });
  },
  onShow: function () {
    this.setData({
      nomore: false //上拉加载结束提示

    }); //进入页面加载

    this.recordCount = 0;
    this.isCanLoad = true;
    this.getListByType(0, 7, 0);
  },
  //下拉更新
  onPullDownRefresh: function () {
    var _this = this;
    _this.setData({
      consumeList: [],
      pullDownNumber: 0
    });

    this.getListByType(this.activeIndex, 7, 0);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onPullDownRefresh: function () {
    var _this = this;
    _this.setData({
      consumeList: [],
      pullDownNumber: 0
    });
    this.getListByType(this.activeIndex, 5, 0);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    /**
     * 点击navbar
     * 
     * 每请求一次对应的计数加一。当改变activeIndex时，下拉刷新时计数清空。
     */
    bindClickTabs: function (e) {
      this.setData({
        nomore: false
      });
      let activeIndex = e.detail.activeIndex;
      this.consumeList = [];
      this.pullDownNumber = 0;
      this.recordCount = 0;
      this.isCanLoad = true;
      this.setData({
        consumeList: [],
        pullDownNumber: 0,
        activeIndex: activeIndex
      });
      this.getListByType(activeIndex, 7, 0);
    },
    /**
      * 根据状态查询消费记录
      */
    getListByType: function (transActionType, take, skip) {
		console.log(skip,take)
		console.log(transActionType);
      var _this = this;
	  app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let listLength = _this.consumeList.length;
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getTransActionRecords,
        data: {
          transActionType: transActionType,
          take: take,
          skip: skip
        },
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('查询消费记录返回', res.data);

          if (res.data && res.data.code == 200) {
            let data = _this.dealPageObj(res.data.rows); // console.log('data传给组件的数据', res.data.rows.lists);
            _this.setData({
              listLength: listLength,
              consumeList: data
            });
            _this.setData({
              nomore: false
            });

            if (res.data.rows.length != _this.recordCount) {
              _this.pullDownNumber++;
              _this.recordCount = res.data.rows.length;
              _this.isCanLoad = true;
            } else {
              console.log('没有数据更新');

              _this.setData({
                isCanLoad: false,
                nomore: true
              });

              console.log(_this.nomore);
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
    dealPageObj: function (list) {
      let array = [];
	  console.log(list);
      for (let i = 0; i < list.length; i++) {
        let obj = {};
        obj.name = list[i].transactionStatus;
        obj.time = list[i].transactionTime;
        obj.status = list[i].transactionType;
		if(list[i].parentType==1){
			if(list[i].consumeChannel==-1){
				obj.posName=''
			}
			else{
				obj.posName=list[i].posName;
			}
			if(list[i].consumeChannel!==4||5){
					obj.consumeChannel=''
			}
			if(list[i].consumeChannel==4){
					obj.consumeChannel='二维码'
			}else if(list[i].consumeChannel==5){
				obj.consumeChannel='卡'
			}
		}
	
	
        let flag = '- ';
        if (list[i].parentType == 3 || list[i].parentType == 5) {
          flag = '+ ';
        }
        obj.money = flag + this.utilByBalance(list[i].transactionSum);
        array[i] = obj;
      }
      console.log('rechargeRecordList', array);
      return array;
    },
    // 计算余额
    utilByBalance: function (money) {
      let result = parseFloat(money);
      result = (result / 100.0).toFixed(2);
      return result;
    },

    /**
     * 上拉更新 
     */
  //   lower: function () {
		// console.log('7897');
		// var _this = this;
		// alert('123');
  //     if (this.isCanLoad) {
  //       app.globalData.ShowMsgUtil.showLoadAndMsgToast();
  //       this.getListByType(this.activeIndex, (this.pullDownNumber + 1) * 7, 0);
  //     }
  //   },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    bindPullUp:function () {
		console.log('1111');
      if (this.isCanLoad) {
        app.globalData.ShowMsgUtil.showLoadAndMsgToast();
        this.getListByType(this.activeIndex, (this.pullDownNumber + 1) * 7, 0);
      }
    }
  }
};
</script>
<style>
@import "./toConsumeRecord.css";
</style>