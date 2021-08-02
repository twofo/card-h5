<template>
<view class="page">   
  <view class="page__bd ">

    <view class="weui-cells weui-cells_after-title record-list">
     
      <view class="weui-cell__bd" style="font-size:22px;" >
        {{pageData.showObj.messageTitle}}
      </view>
      <view class="list-box-c" style="margin-top:12px;color:#888888;font-size:12px;">
        <view class="weui-cell__bd">
          <text>{{pageData.showObj.messageSendTime}}</text>
        </view>
        <view class="weui-cell__ft" style="color:#576b95;">{{pageData.showObj.messageTypeName}}</view>
      </view>
      <view class="weui-cell__bd" style="font-size:14px;margin-top:20px;">
        <scroll-view scroll-y style="width: 100%;height: calc(100vh-100rpx);">
					<view  v-html="pageData.showObj.messageContent">{{pageData.showObj.messageContent}}</view>
					</scroll-view> 
      </view>
    <!-- <view class="weui-cell__bd wx-image" v-if="pageData.showObj.imageList.length > 0">
        <view v-for="(item, index) in pageData.showObj.imageList" :key="index">
          <image :src="item" style="width:65px; height:75px;margin-right:20px;"></image>
        </view>
      </view> -->

      <view class="gotomeet" v-if="pageData.showObj.wxMessagePageValue !=null " 
			@tap="goToMeet({msg:pageData.showObj.wxMessagePageValue})" >前往 {{">>"}}</view>
			
    </view>
    

    <view class="button-sp-area" v-if="pageData.btnObj.confirmIsShow || pageData.btnObj.dealIsShow" >
      <button class="weui-btn" type="primary" :disabled="pageData.btnObj.confirmDisabled" 
			v-if="pageData.btnObj.confirmIsShow" 
			@tap="confirmMsg">{{pageData.btnObj.confirmName}}</button>
      <button class="weui-btn" type="primary" :disabled="pageData.btnObj.dealDisabled" 
			v-if="pageData.btnObj.dealIsShow" 
			@tap="dealMsg">{{pageData.btnObj.dealName}}</button>
    </view>

  </view>
</view>
</template>

<script>
var app = getApp();

export default {
  data() {
    return {
		statc:'',
      windowHeight: 0,
      //获取屏幕高度
      windowWidth: 0,
      pageData: {
				showObj:{
					messageTitle:'',
					messageSendTime:'',
					messageTypeName:'',
					messageContent:'',
					wxMessagePageValue:null,
					imageList:[]
				},
				btnObj:{
					confirmIsShow:false,
					dealIsShow:false
				}
			},
      //页面显示数据
      disabled: true,
	  extras:''
    };
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log(options)
    // 确保缓存里的设备数据存在
    var mid = options.mid;

    if (mid == '' || mid == null || mid == 'undefined') {
      app.globalData.ShowMsgUtil.showErrorModal('显示失败', '详情显示失败！');
      setTimeout(function () {
        wx.hideToast();
        wx.navigateBack({
          delta: 1
        });
      }, 200);
      return;
    }

     console.log('mid', mid); // 1. 查询消息详情

    this.getMsgDetail(mid); // 2. 将该条消息修改为已读
    // app.ShowMsgUtil.showLoadToast();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		// require('../../resources/utils/events').EventEmitter.prototype._maxListeners = 100;
	},
  methods: {
    /**
     * 获取消息详情
     */
    getMsgDetail: function (mid) {
		console.log(mid)
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
        const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appoprRequestUrl.getMsgDetail + '/' + mid,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取消息详情', res.data);
          if (res.data && res.data.code == 200) {
			  //判断消息接口的extras是否为空
			  if(res.data.rows.extras!==''){
			  console.log(JSON.parse(res.data.rows.extras))
			    var extras=JSON.parse(res.data.rows.extras)
				console.log(extras)
			   // var   repairCode=JSON.parse(res.data.rows.extras)
			   // console.log(repairCode.repairCode)
			   _this.setData({
				   extras:extras
			   })
			   }
			  if(res.data.rows.wxMessagePageValue.childMsgType==6){
				  _this.setData({
					  statc:2
				  })
			  }
            if (res.data.rows.messageRead == 0) {
              // _this.markRead(mid);
            }

            _this.dealShowNewDetail(res.data.rows);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        // complete: function () {
        //   wx.hideNavigationBarLoading();
        // }
      });
    },

    goToMeet(e) {
      console.log(e);
	  console.log(this.extras)
	  let extras=this.extras
	    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let navigeteData = e.msg;
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
            app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.attendancePageUrl.studentStatisticsUrl + "?planId=" + navigeteData.id, 500);
          }
        } else if(navigeteData.msgType == 4){ //报修
			  if(userInfoCach.role==5){
				  console.log(11111111)
				   app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.repairDetailOfMaintainUrl + '?repairCode=' + extras.repairCode, 500);
			  }else{
				      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.studentRepairDetailUrl + '?repairCode=' + extras.repairCode, 500);
			  }
  
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
      		}else if(navigeteData.childMsgType == 7){
      			//练功房审批结果
      			 app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl + "?meetingId=" + navigeteData.id + '&type=3', 500);
      		}else if(navigeteData.childMsgType == 8){
      			//练功房取消预约
      			app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl + "?meetingId=" + navigeteData.id + '&type=3', 500);
      		}
        }
      }
    },

    dealShowNewDetail: function (data) {
      if (data === '' || data == null) {
        this.pageData = [];
        this.setData({
          pageData: this.pageData
        });
        return;
      }

      var obj = {};
      obj.mid = data.id;
      obj.messageTitle = data.messageTitle == '' ? '无' : data.messageTitle;
      obj.messageContent = data.messageContent;
      obj.messageSendTime = data.messageSendTime;
      obj.wxMessagePageValue = data.wxMessagePageValue.msgType == 0 ? null : data.wxMessagePageValue;

      if (data.extras != '') {
        if (JSON.parse(data.extras).department != null) {
          obj.messageTypeName = JSON.parse(data.extras).department[0];
        }

        if (JSON.parse(data.extras).images != null) {
          obj.imageList = JSON.parse(data.extras).images;
        }
      } // 处理按钮对象

			obj.messageContent = obj.messageContent.replace(/<img/g,"<img style='max-width:100%;height:auto;'");
      var btnObj = this.dealBtnObj(data);
      this.pageData.btnObj = btnObj;
      this.pageData.showObj = obj;
      this.setData({
        pageData: this.pageData
      });
    },
    dealBtnObj: function (data) {
      // 测试数据
      // data.messageNeedAffirm = 1;
      // data.messageAffirm = 1;
      // data.messageNeedDispose = 1;
      // data.messageDispose = 1;
      var btnObj = {};
      btnObj.dealIsShow = data.messageNeedDispose == 0 ? false : true;
      btnObj.confirmIsShow = data.messageNeedAffirm == 0 ? false : true;

      if (data.messageNeedAffirm == 1) {
        //需要确认
        if (data.messageAffirm == 0) {
          //没有确认
          btnObj.confirmName = '点击确认';
          btnObj.confirmDisabled = false;
          btnObj.dealIsShow = false;
          btnObj.dealName = '等待确认';
          btnObj.dealDisabled = true;
        } else {
          //已确认
          btnObj.confirmName = '已确认';
          btnObj.confirmDisabled = true;

          if (data.messageNeedDispose == 0) {
            //不需要处理
            btnObj.dealName = '无需处理';
            btnObj.dealDisabled = true;
          } else {
            // 需要处理
            if (data.messageDispose == 0) {
              //没有处理
              btnObj.dealName = '点击处理';
              btnObj.dealDisabled = false;
            } else {
              //已处理
              btnObj.dealName = '已处理';
              btnObj.dealDisabled = true;
            }
          }
        }
      } else {
        //不需要确认
        btnObj.confirmName = '无需确认';
        btnObj.confirmDisabled = true;

        if (data.messageNeedDispose == 0) {
          //不需要处理
          btnObj.dealName = '无需处理';
          btnObj.dealDisabled = true;
        } else {
          // 需要处理
          if (data.messageDispose == 0) {
            //没有处理
            btnObj.dealName = '点击处理';
            btnObj.dealDisabled = false;
          } else {
            //已处理
            btnObj.dealName = '点击处理';
            btnObj.dealDisabled = true;
          }
        }
      }

      return btnObj;
    },

    /**
     * 将对应的消息设置为已读
     */
    markRead: function (mid) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appoprRequestUrl.markRead,
        data: {
          mid: mid
        },
        header: {
          'token': userInfoCach.token
        },
        method: 'POST',
        success: function (res) {
          console.log('将消息设为已读', res.data);
          if (res.data && res.data.code == 200) {} else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToast('后台连接失败', 2000);
        }
      });
    },

    /**
     * 
     * 消息确认及处理
     */
    confirmMsg: function () {
      if (this.pageData.btnObj.confirmDisabled) {
        return;
      }

      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      var mid = this.pageData.showObj.mid;
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appoprRequestUrl.confirmedMsg + '/' + mid,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('确认消息', res.data);

          if (res.data && res.data.code == 200) {
            // 1. 更新页面按钮数据
            // _this.getMsgDetail(mid);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('1111', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
    dealMsg: function () {
      if (this.pageData.btnObj.dealDisabled) {
        return;
      }

      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      var mid = this.pageData.showObj.mid;
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appoprRequestUrl.handledMsg + '/' + mid,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('处理消息', res.data);

          if (res.data && res.data.code == 200) {
            // 1. 更新页面按钮数据
            // _this.getMsgDetail(mid);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
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
@import "./messageDetail.css";
</style>