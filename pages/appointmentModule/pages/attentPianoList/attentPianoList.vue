<template>
<view class="page">
  <view class="page_bd">
    <view>
      <navbar class="navbor" :tabs="tabs" @clickTabs="bindClickTabs"></navbar>
    </view>
    <view class="contFlex">
      <meeting-list class="meetingList" @toDetail="toDetail" @lowers="lower" :windowHeight="scrollHeight-65" :listArr="attendPianoListArr" :nomore="nomore" :titleTxtArr="titleTxtArr"></meeting-list>
    </view>
  </view>
</view>
</template>
<script>
var app = getApp();
var ImageUrl = require("../../resources/utils/imageUrl.js");
import meetingList from "../../../../components/attendanceModule/attenList/attenList";
import navbar from "../../../../components/attendanceModule/navbar/navbar";
import msgNoData from "../../../../components/common/msgNoData/msgNoData";
export default {
  data() {
    return {
      tabs: ["全部", "未完成", "已完成"],
      activeIndex: 0,
      titleTxtArr: ['订单号', '预约时间', '预约人'],
      //列表中每个字段的标题
      attendPianoListArr: [],
      //数据 
      nomore: false,
      //加载更多
      scrollTop: 0,
      windowHeight: 510,
      h: 0,
      scrollHeight: 0,
      pullDownNumber: 0,
      attanceCount: 0,
      isCanLoad: true,
      //用于控制下滑加载，从后台加载数量

      /***
       * 练功房需要字段
       */
      type: 2,
      //练功房 3  琴房 2
      idType: null // 学生 0 

    };
  },

  components: {
    meetingList,
    navbar,
    msgNoData
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  console.log(options);
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    console.log(options);
    if (options.type && options.type == '3') {
      //  判断是否是学生身份 学生 0 
      let idType = userInfoCach.personType;
      let tabs = this.tabs;

      if (idType == 0) {
        tabs = ["全部", "处理中", "未完成", "已完成", "已拒绝"];
      }
      uni.setNavigationBarTitle({
        title: "公共资源_练功房预约记录"
      });
      this.setData({
        type: options.type,
        tabs,
        idType
      });
    }else{
			uni.setNavigationBarTitle({
			  title: "公共资源_琴房预约记录"
			});
		}			
    this.setData({
      windowHeight: app.globalData.SystemInfo.windowHeight - 50
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      nomore: false
    }); //进入页面加载

    this.attanceCount = 0;
    this.isCanLoad = true;
    let status = [];
    let {
      activeIndex
    } = this;
    if (this.type === '3' && this.idType == 0) {
      if (activeIndex == 0) {
        //0申请中、1未开始、2使用中、3已结束、-1退费、-2已取消、-3已过期、-4已拒绝
        status = [-1, -2, -3, -4, 0, 1, 2, 3];
      } else if (activeIndex == 1) {
        status = [0];
      } else if (activeIndex == 2) {
        status = [1, 2];
      } else if (activeIndex == 3) {
        status = [3, -1, -2, -3];
      } else if (activeIndex == 4) {
        status = [-4];
      }
      this.getList(status, 3);
    } else {
      if (activeIndex == 0) {
        status = [-1, -2, 0, 1, 2, 3];
      } else if (activeIndex == 1) {
        status = [0, 1, 2];
      } else if (activeIndex == 2) {
        status = [-2, -1, 3];
      }

      this.getList(status, 4);
    }

    // var que = wx.createSelectorQuery();
    let _this = this;
    let statusHeight = app.globalData.SystemInfo.statusBarHeight;
	console.log(statusHeight);
    // que.select('.navbor').boundingClientRect(function (res) {
      let scrollHeight = _this.windowHeight - statusHeight;
      _this.setData({
        scrollHeight
      });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
	  console.log('78979');
    this.attendPianoListArr = [];
    this.setData({
      nomore: false,
      attanceCount:0,
      pullDownNumber:0
    });
    let status = [];
    let {
      activeIndex,
      type
    } = this;

    if (type === '3' && this.idType == 0) {
      if (activeIndex == 0) {
        //0申请中、1未开始、2使用中、3已结束、-1退费、-2已取消、-3已过期、-4已拒绝
        status = [-1, -2, -3, -4, 0, 1, 2, 3];
      } else if (activeIndex == 1) {
        status = [0];
      } else if (activeIndex == 2) {
        status = [1, 2];
      } else if (activeIndex == 3) {
        status = [3, -1, -2, -3];
      } else if (activeIndex == 4) {
        status = [-4];
      }

      this.getList(status, 3);
    } else {
      if (activeIndex == 0) {
        status = [-1, -2, 0, 1, 2, 3];
      } else if (activeIndex == 1) {
        status = [0, 1, 2];
      } else if (activeIndex == 2) {
        status = [-2, -1, 3];
      }
      this.getList(status, 4);
    }
  },
  methods: {
	  
    // 状态点击事件
    bindClickTabs(e) {
			console.log("点击时触发")
      this.setData({
        nomore: false,
				attanceCount:0,
				pullDownNumber:0
      });
      let activeIndex = e.detail.activeIndex; // console.log(activeIndex)

      var status = [];

      if (this.type === '3' && this.idType == 0) {
        if (activeIndex == 0) {
          //0申请中、1未开始、2使用中、3已结束、-1退费、-2已取消、-3已过期、-4已拒绝
          status = [-1, -2, -3, -4, 0, 1, 2, 3];
        } else if (activeIndex == 1) {
          status = [0];
        } else if (activeIndex == 2) {
          status = [1, 2];
        } else if (activeIndex == 3) {
          status = [3, -1, -2, -3];
        } else if (activeIndex == 4) {
          status = [-4];
        }

        this.getList(status, 3);
      } else {
        if (activeIndex == 0) {
          status = [-1, -2, 0, 1, 2, 3];
        } else if (activeIndex == 1) {
          status = [0, 1, 2];
        } else if (activeIndex == 2) {
          status = [-2, -1, 3];
        }

        this.getList(status, 4);
      }

      this.setData({
        activeIndex
      });
    },

    toDetail(e) {
		console.log(e);
      let meetingId = e.detail.meetingId;
      let type = this.type;
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl + "?meetingId=" + meetingId + '&type=' + type, 500);
    },

    // 时间戳转换日期方法
    timesToTime(times) {
      var date = new Date(times);
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      let timeObj = {
        yearMountDay: Y + M + D,
        hourM: h + m
      };
      return timeObj;
    },

    dataReduce(data) {
      //0申请中、1未开始、2使用中、3已结束、-1退费、-2已取消  已拒绝
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj.id = data[i].id;
        obj.founder = data[i].appointmentUserName;
        obj.startTime = data[i].applyTime;
        obj.adress = data[i].pianoAddress;
        let startTime = data[i].startTime;
        let endTime = data[i].endTime;
        obj.appiontmentTime = this.timesToTime(startTime).yearMountDay + this.timesToTime(startTime).hourM + '-' + this.timesToTime(endTime).hourM;
        var status = data[i].status;
        if (status == 0) {
          obj.listType = '申请中';
          obj.listTypeImg = ImageUrl.checkPendingPic;
        } else if (status == 1) {
          obj.listType = '未开始';
          obj.listTypeImg = ImageUrl.nostartPic;
        } else if (status == 2) {
          obj.listType = '进行中';
          obj.listTypeImg = ImageUrl.readyStartPic;
        } else if (status == -2) {
          obj.listType = '已取消';
          obj.listTypeImg = ImageUrl.unapprovePic;
        } else if (status == -1) {
          obj.listType = '取消中';
          obj.listTypeImg = ImageUrl.checkPendingPic;
        } else if (status == 3) {
          obj.listType = '已完成';
          obj.listTypeImg = ImageUrl.approvePic;
        } else if (status == -3) {
          obj.listType = '已过期';
          obj.listTypeImg = ImageUrl.meetingOutPic;
        } else if (status == -4) {
          obj.listType = '已拒绝';
          obj.listTypeImg = ImageUrl.unapprovePic;
        }
        arr[i] = obj;
      }
      this.setData({
        attendPianoListArr: arr
      });
    },
    // 获取琴房列表
    getList: function (status, take) {
		console.log(status,take);
      let areaType = this.type;
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAreaAppointmentList,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: {
          areaType: areaType,
          status: status,
          take: take,
          skip: 0
        },
        success: function (res) {
			console.log(res);
		 uni.stopPullDownRefresh()
          if (res.data && res.data.code == 200) {
            _this.dataReduce(res.data.data);

            if (res.data.data.length == _this.attanceCount) {
              _this.setData({
                isCanLoad: false,
                nomore: true
              });
            } else {
              _this.pullDownNumber++;
              _this.attanceCount = res.data.data.length;
              _this.isCanLoad = true;
              _this.setData({
                nomore: false
              });
            }
						console.log(_this.nomore)
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
					uni.stopPullDownRefresh()
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideToast({});
        }
      });
    },

    //获取练功房列表
    getDancingList(status, take) {},
    lower: function () {
      let _this = this;
      let status = [];
      let {
        activeIndex,
        type
      } = this;
      if (type === '3' && this.idType == 0) {
        if (activeIndex == 0) {
          //0申请中、1未开始、2使用中、3已结束、-1退费、-2已取消、-3已过期、-4已拒绝
          status = [-1, -2, -3, -4, 0, 1, 2, 3];
        } else if (activeIndex == 1) {
          status = [0];
        } else if (activeIndex == 2) {
          status = [1, 2];
        } else if (activeIndex == 3) {
          status = [3, -1, -2, -3];
        } else if (activeIndex == 4) {
          status = [-4];
        }
        this.getList(status, (this.pullDownNumber + 1) * 3);
      } else {
        if (activeIndex == 0) {
          status = [-1, -2, 0, 1, 2, 3];
        } else if (activeIndex == 1) {
          status = [0, 1, 2];
        } else if (activeIndex == 2) {
          status = [-2, -1, 3];
        }
        if (this.isCanLoad) {
          this.getList(status, (this.pullDownNumber + 1) * 3);
        }
      }
    },
  }
};
</script>
<style>
@import "./attentPianoList.css";
</style>