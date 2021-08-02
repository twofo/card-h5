<template>
<view class="page">   
  <view class="page__bd background-content">
    <!-- 上层 -->
    <view class="background-up">
      <view class="background-up-top" :style="'width: ' + (windowWidth*0.92) + 'px;border-radius: 10px;'">
        <!-- 功能导航 -->
        <view class="wx-items">
          <view v-for="(item, index) in pageData.showOptions" :key="index">
            <navigator :url="'/pages/indexModule/pages/messageListOfType/messageListOfType?type=' + item.type">
              <view class="wx-item" v-if="index<5" :style="'height:60px;width: 32px;margin:' + (windowHeight*0.30*0.08) + 'px ' + (windowWidth*0.99*0.05) + 'px;'">
                <image :src="item.image" class="item-image"></image>
                <image :src="item.allUnreadImage" class="item-red-point"></image>
                <text class="item-name">{{item.name}}</text>
              </view>
            </navigator>
          </view>
        </view>
      </view>

      <!-- 标题 -->
      <view class="msg-title">
        <view class="myui-cell">
            <view class="weui-cell__bd">
              今日消息（{{pageData.todayNewNumber}}/5）
            </view>
            <view class="weui-cell__ft myui-read" @tap="bindToAllRead">
              <view style="display:flex;justify-content: center;">
                <image :src="ImageUrl.msgUnread" style="width:18px;height:15px;margin:0px 8px;"></image>
              </view>
              <view>一键全部已读</view>
            </view>
          </view>
      </view>
      <!-- 消息列表 -->
      <view v-if="pageData.showOfNewest.length>0">
        <new-lists  :alarmNewsList="pageData.showOfNewest" 
										:height="windowHeight-200" 
										:itemHeight="106" 
										@bindDealMsg="bindDealMsg" 
										@getMore="getMore" ></new-lists>
      </view>
      <view v-else style="margin-top:30%;">
          <view class="weui-loadmore weui-loadmore_line">
              <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
          </view>
          <view class="weui-loadmore weui-loadmore_line weui-loadmore_dot">
              <view class="weui-loadmore__tips weui-loadmore__tips_in-line weui-loadmore__tips_in-dot"></view>
          </view>
      </view>

    </view>


    <!-- 下层 -->
    <view class="background-top" :style="'height: ' + (windowHeight*0.12) + 'px; width: 100%;background-color: rgb(32,164,247);'"></view>

    <view class="background-bottom" :style="'height: ' + (windowHeight*0.88-7) + 'px; width: 100%;'">
      

    </view>


  </view>
	
	<mp-tabbar v-if="!showOnlyABC" style="position:fixed;bottom:0;width:100%;left:0;right:0;"
			:list="tabBarList" 
			:current="current"
			@change="tabChange" 
			></mp-tabbar>
</view>
</template>

<script>
var app = getApp();
var ImageUrl = app.globalData.ImageUrl; //获取应用实例

import newLists from "../../../components/tarbarModule/newList/newList";
import mpTabbar from "../../../components/common/tarbBar/tarbBar";
export default {
  data() {
    return {
      windowHeight: 0,
      //获取屏幕高度
      windowWidth: 0,
      pageData: {
				showOfNewest:[]
			},
      //页面显示数据
      ImageUrl: ImageUrl,
      //  TOMD
      // 1. 根据type、childType处理不同的业务
      // （1）公告确认、处理。 公告详情显示
      alarmNewsTypeList: [],
      page: 0,
      'active': {
        data: [],
        showMore: true,
        remind: '上滑加载更多'
      },
      data: [],
      loading: false,
      disabledRemind: false,
      // 1. 定义请求次数（即下拉刷新）
      pullDownNumber: 0,
      role: '',
      count: 0,
      userInfoCach: "",
			
			// 自定义tabBar
			current:1,
			tabBarList:[
				{
				  text: "首页",
				  iconPath: '/static/images/tabBar/index.png',
				  selectedIconPath: "/static/images/tabBar/index@active.png",
					pagePath: "/pages/tarBarModule/index/index"
				}, {
				  text: "消息",
				  iconPath: "/static/images/tabBar/news.png",
				  selectedIconPath: "/static/images/tabBar/news@active.png",
				  pagePath: "/pages/tarBarModule/message/message"
				}, {
				  text: "我的",
				  iconPath: "/static/images/tabBar/more.png",
				  selectedIconPath: "/static/images/tabBar/more@active.png",
				  pagePath: "/pages/tarBarModule/mine/mine"
				}
			],
			showOnlyABC: app.globalData.showOnlyABC
    };
  },

  components: {
    newLists,
		mpTabbar
  },
	mounted(){  
	      //#ifdef H5  
	      if(!this.showOnlyABC){
	      	document.querySelector('.uni-page-head-hd').style.display = 'none'
	      }
	      //#endif  
	},
  onLoad: function () {
    console.log('------------------------消息模块------------------------');
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight,
      windowWidth: wx.getSystemInfoSync().windowWidth,
      userInfoCach: userInfoCach
    }); // 获取消息功能

    this.getOptions(); // 获取当日最新消息

    this.getNewest();
	
  },
  onShow: function () {
		uni.$on('bindDealMsg',this.bindDealMsg)
		uni.$on('getMore',this.getMore)
    let {
      count
    } = this;

    if (count != 0) {
      // 获取消息功能
      this.getOptions(); // 获取当日最新消息

      this.getNewest();
    }

    this.setData({
      count: 1
    });
  },
  //下拉更新
	onHide: function() {
		uni.$off('bindDealMsg',this.bindDealMsg)
		uni.$off('getMore',this.getMore)
	},
	onUnload: function() {
		uni.$off('bindDealMsg',this.bindDealMsg)
		uni.$off('getMore',this.getMore)
	},
  onPullDownRefresh: function () {
    // 获取消息功能
    this.getOptions(); // 获取当日最新消息

    this.getNewest();
  },
  methods: {
		
		tabChange(e){
			console.log(e)
			let ind = e.detail.index
			
			if(ind != 1){
				let url = e.detail.item.pagePath
				console.log(url)
				uni.reLaunch({
					url: url
				})
			}
		},
    /**
     * 获取功能选项
     */
    getOptions: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appoprRequestUrl.unreadStatistics,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取消息功能选项', res.data.rows);

          if (res.data && res.data.code == 200) {
            _this.dealShowOfOptions(res.data.rows);
          } else {
            let data = [{
              type: 1,
              allRead: true
            }, {
              type: 2,
              allRead: true
            }, {
              type: 3,
							
              allRead: true
            }];

            _this.dealShowOfOptions(data);

            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code); // app.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          let data = [{
            type: 1,
            allRead: true
          }, {
            type: 2,
            allRead: true
          }, {
            type: 3,
            allRead: true
          }];

          _this.dealShowOfOptions(data);

          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
					uni.stopPullDownRefresh()
				}
      });
    },

    getMore(e) {
      console.log('消息页面点击详情  ------------',e);
      console.log(this.pageData);
      var index = e.detail.index;
      var type = this.type;
			if(this.pageData.showOfNewest.length > 0){
				
				var childType = this.pageData.showOfNewest[index].childType;
				var mid = this.pageData.showOfNewest[index].id;
				var msg = this.pageData.showOfNewest[index].msg;
				if (msg != '已读') {
					this.markRead({mid: mid});
				}
				console.log(mid)
				app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.messageDetailUrl + '?mid=' + mid, 500);
			}
    },

    // 处理拖布功能选择 - 显示数据
    dealShowOfOptions: function (data) {
      console.log('>>>>>>>>>>>>data', data);

      if (data.length == 0) {
        this.pageData.showOptions = [];
        this.setData({
          pageData: this.pageData
        });
        return;
      }

      const image = [ImageUrl.msgPay, ImageUrl.msgAttendance, ImageUrl.msgAlarm, ImageUrl.msgOther, ImageUrl.msgNotice, ImageUrl.msgRepair];

      for (let i = 0; i < data.length; i++) {
        data[i].image = image[data[i].type - 1];

        if (!data[i].allRead) {
          data[i].allUnreadImage = ImageUrl.msgClue;
        }
      }

      this.pageData.showOptions = data;
      this.setData({
        pageData: this.pageData
      });
    },

    /**
     * 获取当日最新消息
     */
    getNewest: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appoprRequestUrl.getNewest + '/5',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取当日最新消息', res.data);

          if (res.data && res.data.code == 200) {
            let todayNewNumber = res.data.rows.length;
						
						// console.log(todayNewNumber)
            _this.pageData.todayNewNumber = todayNewNumber;

            _this.setData({
              pageData: _this.pageData
            });

            _this.dealShowOfNewest(res.data.rows);
          } else {
            _this.handleError();

            app.globalData.ShowMsgUtil.showNoneToastByFail(); // app.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          _this.handleError();

          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
    // 处理今日消息
    dealShowOfNewest: function (data) {
      if (data.length == 0) {
        this.pageData.showOfNewest = [];
        this.setData({
          pageData: this.pageData
        });
        return;
      }

      let array = [];

      for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj.id = data[i].id;
        obj.typeName = this.dealMsgType(data[i].type);
        obj.messageTitle = data[i].messageTitle;
        obj.messageContent = data[i].messageContent;
        obj.messageSendTime = data[i].messageSendTime;
        obj.msg = data[i].messageRead == 0 ? '未读' : '已读';
        obj.type = data[i].type;
        obj.childType = data[i].childType;
        obj.wxMessagePageValue = data[i].wxMessagePageValue;
        obj.extras = data[i].extras;
       console.log(obj.extras)
        if (data[i].messageRead == 0) {
          obj.image = ImageUrl.msgClue;
        }

        array[i] = obj;
      }

      this.pageData.showOfNewest = array;
      this.setData({
        pageData: this.pageData
      });
    },
    dealMsgType: function (type) {
      var name = '';

      switch (type) {
        case 1:
          name = '支付';
          break;

        case 2:
          name = '考勤';
          break;

        case 3:
          name = '告警';
          break;

        case 4:
          name = '其他';
          break;

        case 5:
          name = '公告';
          break;

        case 6:
          name = '报修';
          break;

        default:
          name: '未知';

          break;
      }

      return name;
    },
    handleError: function (params) {
      this.pageData.todayNewNumber = 0;
      this.pageData.showOfNewest = [];
      this.setData({
        pageData: this.pageData
      });
    },

    /**
     * 将消息设为已读
     */
    bindToAllRead: function () {
      let flag = false;
      var pageData = this.pageData; // 判读所有大类型的公告是否未读

      if (pageData.showOptions.length > 0) {
        for (let i = 0; i < pageData.showOptions.length; i++) {
          if (!pageData.showOptions[i].allRead) {
            flag = true;
          }
        }
      } // 判断今日信息的最新公告是否未读


      if (pageData.showOfNewest.length > 0) {
        for (let i = 0; i < pageData.showOfNewest.length; i++) {
          if (pageData.showOfNewest[i].msg === '未读') {
            flag = true;
          }
        }
      }

      if (flag) {
        let data = {
          markAll: true
        };
        this.markRead(data);
      }
    },
    markRead: function (data) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appoprRequestUrl.markRead,
        data: data,
        header: {
          'token': userInfoCach.token
        },
        method: 'POST',
        success: function (res) {
          // console.log('将消息设为已读', res.data);
          if (res.data && res.data.code == 200) {
            // 更新页面数据
            _this.getOptions();

            _this.getNewest();
          } else {// app.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideNavigationBarLoading();
        }
      });
    },

    /**
     * 根据不同的type、childtype。
     * 对指定消息进行不同的处理
     */
    bindDealMsg: function (e) {
	console.log('父组件点击',e)
    console.log(this.pageData.showOfNewest[2])
      var index = e.detail.index;
      var type =  e.detail.type;
      var childType = this.pageData.showOfNewest[index].childType;
      var mid = this.pageData.showOfNewest[index].id;
      var msg = this.pageData.showOfNewest[index].msg;
	  var extra=this.pageData.showOfNewest[index].extras;
	  var extra=JSON.parse(extra)
      var extras = this.pageData.showOfNewest[index].extras == "" ? null : this.pageData.showOfNewest[index].wxMessagePageValue;
      this.dealMsg(type, childType, mid, msg, extras,extra);
    },
    // 对指定消息进行不同的处理
   dealMsg: function (type, childType, mid, msg, extras,extra) {
       console.log(type, childType, mid, msg, extras);
       let navigeteData = extras; //消息跳转数据
 
       const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); // 考勤大类 - 考勤通知
 
       // if (type == app.globalData.Constant.messageTypeConstant.ATTENDANCE_TYPE && childType == app.globalData.Constant.messageTypeConstant.ATTENDANCE_INFORM_CHILD_TYPE && userInfoCach.role == null) {
 	if(type == 2  || userInfoCach.role !== null || userInfoCach.role!==''){
         // 消息已读
         let data = {
           mid: mid
         };
 
         if (msg != '已读') {
           this.markRead(data);
         } // 跳转到考勤打卡页面
 
 
         if (navigeteData) {
           app.globalData.ShowMsgUtil.showLoadToast("正在跳转", 500);
 
           if (navigeteData.msgType == 1) {  //琴房
             if (navigeteData.childMsgType == 1 || navigeteData.childMsgType == 2 || navigeteData.childMsgType == 3 || navigeteData.childMsgType == 4 ) {
               //琴房详情
               app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl + '?meetingId=' + navigeteData.id + '&type=2', 500);
             }else if(navigeteData.childMsgType == 6 ){ //琴房预约通知（资源管理员
 							 app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl + '?meetingId=' + navigeteData.id + '&type=2&conflict=1', 500);
 						}else if(navigeteData.childMsgType == 5){ //琴房预约取消通知（资源管理员）
 							app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl + '?meetingId=' + navigeteData.id + '&type=2&conflict=1', 500);
 						}
 						
           } else if (navigeteData.msgType == 2) { //会议室
             if (navigeteData.childMsgType == 1) {
               //预约开始(即需考勤)
               app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendMeetingDetailUrl + '?meetingId=' + navigeteData.id, 500);
             } else if (navigeteData.childMsgType == 2) {
               //会议室申请 未审核 -->前往审批页面
               app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.approvalInfoUrl, 500);
             } else if (navigeteData.childMsgType == 3) {
               // 审核结果
               // app.PublicUtil.navigateByUrl(app.PageUrl.appointmentPageUrl.attendMeetingDetailUrl+'?meetingId='+navigeteData.id,500)
               // 会议室审核失败  -->前往会议详情页面
               app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.meetingDetailUrl + '?meetingId=' + navigeteData.id, 500);
             } else if (navigeteData.childMsgType == 4) {
               //请假/补卡预约  -->前往审批页
               app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.approvalInfoUrl, 500);
             } else if (navigeteData.childMsgType == 5) {
               //请假/补卡审核  -->前往考勤详情页
               app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendMeetingDetailUrl + '?meetingId=' + navigeteData.id, 500);
             } else if (navigeteData.childMsgType == 6) {  //会议取消 不跳转
               wx.hideToast();
             } else if (navigeteData.childMsgType == 7) {
               //会议修改  -->前往考勤详情
               app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendMeetingDetailUrl + '?meetingId=' + navigeteData.id, 500);
             }
           } else if (navigeteData.msgType == 3) {   //归寝
             if (navigeteData.childMsgType == 1) {
 							// 归寝开始
               app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.attendancePageUrl.studentClockUrl + "?planId=" + navigeteData.id + "&executePlanId=" + navigeteData.executePlanId, 500);
             } else if (navigeteData.childMsgType == 2) {
 							// 归寝请假/补卡
               app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.approvalInfoUrl, 500);
             } else if (navigeteData.childMsgType == 3) {
 							//请假/补卡审批结果
               app.globalData.PublicUtil.navigateByUrl( app.globalData.PageUrl.repairPageUrl.repairManageUrl + "?planId=" + navigeteData.id, 500);
             }
           } else if(navigeteData.msgType == 4){ //报修
          app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.studentRepairDetailUrl + '?repairCode=' + extra.repairCode, 500);
 					}else if (navigeteData.msgType == 5) { //练功房
             if (navigeteData.childMsgType == 1 || navigeteData.childMsgType == 2 || navigeteData.childMsgType == 3 || navigeteData.childMsgType == 4 ) {
               //练功房详情
               app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl + "?meetingId=" + navigeteData.id + '&type=3', 500);
             }else if(navigeteData.childMsgType == 5){
 						//练功房预约(资源管理员)
 						 app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl + "?meetingId=" + navigeteData.id + '&type=3&conflict=1', 500);
 						}else if(navigeteData.childMsgType == 6){
 							//审批
 							app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.approvalInfoUrl, 500);
 						}else if(navigeteData.childMsgType == 7 ){
 							//练功房审批结果
 							 app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl + "?meetingId=" + navigeteData.id + '&type=3', 500);
 						}else if(navigeteData.childMsgType == 8){
 							//练功房取消预约
 							app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl + "?meetingId=" + navigeteData.id + '&type=3', 500);
 						}
           }
         }
       } else if (type == app.globalData.Constant.messageTypeConstant.REPAIR_TYPE && childType == app.globalData.Constant.messageTypeConstant.REPAIR_STATUS_CHILD_TYPE) {
        
       } else {
 				if (msg != '已读') {
 				  this.markRead({
 						mid: mid
 					});
 				}
         // 跳转到详情页面
         app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.messageDetailUrl + '?mid=' + mid, 500);
       }
     }
   }
 };
</script>
<style>
@import "./message.css";
</style>