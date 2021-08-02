<template>
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
          <view class="weui-cell__bd">姓名</view>
          <view class="weui-cell__ft">{{pageObj.userName}}</view>
        </view>
        <view class="weui-cell">
            <view class="weui-cell__bd ">学号</view>
            <view class="weui-cell__ft">{{pageObj.userCode}}</view>
        </view>
        <!-- <view class="weui-cell">
            <view class="weui-cell__bd ">院系</view>
            <view class="weui-cell__ft">1412140106</view>
        </view>
        <view class="weui-cell">
            <view class="weui-cell__bd ">专业</view>
            <view class="weui-cell__ft">1412140106</view>
        </view> -->
        <view class="weui-cell">
            <view class="weui-cell__bd">手机号</view>
            <view class="weui-cell__ft" style="color:#20a4f7;">{{pageObj.mobile}}</view>
        </view>

      </view>

      <!-- 会议信息 -->
      <view class="weui-cells weui-cells_after-title myui-cells-items" style="margin-top:3px;">

        <view class="weui-cell">
          <view class="weui-cell__bd">会议名称</view>
          <view class="weui-cell__ft">{{pageObj.meetingSubject}}</view>
        </view>
        <view class="weui-cell">
            <view class="weui-cell__bd ">房间号</view>
            <view class="weui-cell__ft">{{pageObj.meetingRoomName}}</view>
        </view>
          <view class="weui-cell">
            <view class="weui-cell__bd ">会议时间</view>
            <view class="weui-cell__ft">{{pageObj.meetingTime}}</view>
        </view>
        <view class="weui-cell">
            <view class="weui-cell__bd ">发起人</view>
            <view class="weui-cell__ft">{{pageObj.meetingInitiator}}</view>
        </view>
        <view class="weui-cell">
            <view class="weui-cell__bd " style="width: 20%;">参会人</view>
            <view class="weui-cell__ft" style="width: 80%;">{{pageObj.meetingAttendee}}</view>
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
          <view class="weui-cell__hd"></view>
          <view class="weui-cell__bd">申请类型</view>
          <view class="weui-cell__ft">
            <!-- <picker bindchange="bindCountryChange" value="{{countryIndex}}" range="{{countries}}">
                  <view class="weui-select">{{countries[countryIndex]}}</view>
              </picker> -->
              {{meetingTypes}}
             
          </view>
        </view>
        <view class="weui-cell">
            <view class="weui-cell__bd">{{meetingTypes}}时间</view>
            <view class="weui-cell__ft" v-if="meetingTypes == '请假'">{{pageObj.nowTime}}</view>
            <view v-else class="weui-cell__ft pickTimes">
              
              <pick-time :defaultTime="pageObj.meetingStartTime" tType="dataTime" @getTime="getTimeTap"></pick-time>
              <text class="pickTimesArrow">{{'>'}}</text>
            </view>
        </view>

        <view class="weui-cell">
          <view class="weui-cell__bd">
              <textarea class="weui-textarea" :placeholder="'请输入' + meetingTypes + '原因...'" style="height: 3.3em" :maxlength="200" @input="bindInputReason"></textarea>
              <!-- <view class="weui-textarea-counter">0/200</view> -->
          </view>
					
        </view>
				<view class="weui-cell uploadImgBox">
					<view class="weui-cell__bd weui-cell">
						<view class="uploadImg">
							<image :src="imageObj.uploadImgPic" @tap="uploadImgTap"></image>
							<block v-for="(uploadImgs, index) in uploadImgArr" :key="index" v-if="uploadImgArr.length > 0">
								<image :src="uploadImgs" mode="widthFix" :data-src="uploadImgs" @tap.stop="previewImg"></image>
							</block>
						</view>
						<text class="uploadImgTxt">上传照片</text>
					</view>
				</view>

      </view> 

      <view class="weui-cells weui-cells_after-title myui-cells-items" style="margin-top:3px;">

        <view class="weui-cell">
            <view class="weui-cell__bd ">接收人</view>
            <view class="weui-cell__ft">{{pageObj.meetingInitiator}}</view>
        </view>

      </view> 

      <view class="page__bd page__bd_spacing button_top">
        <button class="weui-btn" type="primary" :disabled="disableBtn" form-type="submit" @tap="confirmApply">提交</button>
      </view>

  </view>
</view>
</template>

<script>
var app = getApp();
var ImageUrl = require("../../resources/utils/imageUrl.js");
import pickTime from "../../resources/components/pickTime/pickTime";

export default {
  data() {
    return {
      //页面数据显示对象
      pageObj: {},
      //图片对象
      imageObj: ImageUrl,
      disableBtn: false,
      //点击事件阻止多次点击
      countries: ["补签", "请假"],
      countryIndex: 0,
      meetingTypes: "请假",
      executePlanId: 0,
      reason: '',
      uploadImgArr: [],
      //上传图片
      imageBase64Arr: [],
      //将图片转换成base64
      applyLeave: 0,
      apply: '',
      supplementTime: '' //补签时间

    };
  },

  components: {
    pickTime
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //进入页面加载
    console.log("------------------------请假申请--------------------------");
    console.log(options);
    app.globalData.ShowMsgUtil.showLoadAndMsgToast();
    if (options.applyTimes != null) {
      let times = parseInt(options.applyTimes);
	  let timess= parseInt(options.applyTimess)
      let applyLeave = this.applyLeave;
       console.log(applyLeave)
      if (times > 0 ||timess>0) {
        applyLeave = 1;
      }
   console.log(applyLeave)
      this.setData({
        applyLeave:applyLeave
      });
    }

    if (options.apply == 'apply') {
      uni.setNavigationBarTitle({
        title: "考勤_会议考勤_请假申请"
      });
    } else {
      uni.setNavigationBarTitle({
        title: "考勤_会议考勤_补签申请"
      });
    }

    this.getMeetingDetail(options.meetingId);
    this.setData({
      executePlanId: options.executePlanId,
      apply: options.apply
    });
  },
  methods: {
    bindCountryChange(e) {
      let countryIndex = e.detail.value;
      this.setData({
        countryIndex
      });
    },

    //上传图片
    uploadImgTap() {
      let {
        uploadImgArr,
        imageBase64Arr
      } = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album'],
        success: res => {
          console.log(res);
          let imgSrc = res.tempFilePaths[0];
          uploadImgArr.push(imgSrc);
          this.setData({
            uploadImgArr
          });
          wx.getFileSystemManager().readFile({
            filePath: imgSrc,
            //选择图片返回的相对路径
            encoding: 'base64',
            //编码格式
            success: res => {
              console.log(res);
              let imgBase64 = res.data;
              imageBase64Arr.push(imgBase64);
              this.setData({
                imageBase64Arr
              });
            },
            fail: err => {
              console.error(err);
            }
          });
        }
      });
    },

    //预览上传的照片
    previewImg(e) {
      console.log(e);
      let url = e.currentTarget.dataset.src;
      wx.previewImage({
        urls: [url],
        current: url
      });
    },
    /**
     * 获取会议详情
     */
    getMeetingDetail: function (meetingId) {
			app.globalData.ShowMsgUtil.netErrNotice();
			
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.meetingDetail + '?meetingId=' + meetingId,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取会议详情返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.dealPageObj(res.data.rows);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideToast({});
        }
      });
    },

    /**
     * 处理页面对象
     */
    dealPageObj: function (data) {
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      var obj = {};
      obj.userName = userInfoCach.name;
      obj.userCode = userInfoCach.username;
      obj.mobile = userInfoCach.mobile;
      obj.meetingId = data.meetingId;
      obj.meetingSubject = data.meetingSubject;
      obj.meetingRoomName = data.meetingRoomName;
      obj.meetingInitiator = data.meetingInitiator;
      obj.nowTime = app.globalData.PublicUtil.formatTimeTwo(new Date(), 'Y-M-D h:m');
      obj.meetingTime = app.globalData.PublicUtil.formatTimeTwo(data.meetingStartTime, 'Y-M-D h:m') + '-' + app.globalData.PublicUtil.formatTimeTwo(data.meetingEndTime, 'h:m');
      obj.meetingStartTime = app.globalData.PublicUtil.formatTimeTwo(data.meetingStartTime, 'Y-M-D h:m');
      let platform = app.globalData.SystemInfo.platform;

      if (platform == 'ios') {
        console.log(data.meetingStartTime, data.meetingEndTime);
        let endtime = data.meetingEndTime.replace(/-/g, '-').split(" ");
        obj.meetingTime = data.meetingStartTime.replace(/-/g, '-') + '-' + endtime[1];
        obj.meetingStartTime = data.meetingStartTime.replace(/-/g, '-');
      } //参会人员


      obj.meetingAttendee = '';

      for (let i = 0; i < data.meetingAttendee.length; i++) {
        if (i == data.meetingAttendee.length - 1) {
          obj.meetingAttendee = obj.meetingAttendee + data.meetingAttendee[i].userName;
        } else {
          obj.meetingAttendee = obj.meetingAttendee + data.meetingAttendee[i].userName + '、';
        }
      } // if(data.meetingStatus != 1){
      //   var meetingTypes = '补签'
      //   var countryIndex = 0
      // 	wx.setNavigationBarTitle({
      // 		title:"补签申请"
      // 	})
      // }


      if (this.apply == 'apply') {
        var meetingTypes = "请假";
        var countryIndex = 1;
        wx.setNavigationBarTitle({
          title: "考勤_会议考勤_请假申请"
        });
      } else {
        var meetingTypes = '补签';
        var countryIndex = 0;
        wx.setNavigationBarTitle({
          title: "考勤_会议考勤_补签申请"
        });
      }

      console.log('页面数据-', obj);
      this.setData({
        pageObj: obj,
        meetingTypes,
        countryIndex,
        supplementTime: obj.meetingStartTime
      });
    },
    bindInputReason: function (e) {
      this.reason = e.detail.value;
    },

    // 获取补卡时间
    getTimeTap(e) {
      console.log('获取补卡时间', e);
      this.setData({
        supplementTime: e.detail.time
      });
    },

    confirmApply: function () {
      let obj = {};
      let data = {};
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); //防止多次点击

      let disableBtn = true;

      if (this.countryIndex == 1) {
		  console.log(222222222222)
        obj.applyTime = new Date().getTime();
		console.log( obj.applyTime)
      } else {
        //补签
        var suTime = this.supplementTime + ':00';
        let platform = app.globalData.SystemInfo.platform;

        if (platform == 'ios') {
          var suTime = this.supplementTime.replace(/-/g, '/') + ":00";
        }

        console.log(suTime);
        obj.applyTime = new Date(suTime).getTime(); // obj.applyTime = new Date(this.pageObj.meetingStartTime).getTime()
      }

      obj.executePlanId = this.executePlanId;
      obj.reason = this.reason;
   console.log(suTime)
      if (obj.reason == '') {
		  var myDate = new Date();

		  var mytime=myDate.toLocaleTimeString();  
		  
		      console.log(obj.applyTime,mytime)
        app.globalData.ShowMsgUtil.showErrorModal('申请失败', '申请原因不能为空！');
        disableBtn = false;
        return;
      }
    console.log(obj.applyTime)
      data.applyTime = obj.applyTime;
      data.reason = obj.reason;
      data.executePlanId = this.executePlanId;
      data.personId = userInfoCach.personId;
      data.personType = userInfoCach.personType;
      data.files = this.imageBase64Arr;
      data.isAgainApply = this.applyLeave;

      if (this.countryIndex == 0) {
        obj.type = 30;
      } else if (this.countryIndex == 1) {
        obj.type = 31;
      } else {
        app.globalData.ShowMsgUtil.showErrorModal('申请失败', '申请类型错误！');
        disableBtn = false;
        return;
      }

      data.type = obj.type;

      if (obj.executePlanId == '' || obj.executePlanId == null) {
        app.globalData.ShowMsgUtil.showErrorModal('申请失败', '会议考勤获取计划错误！');
        disableBtn = false;
        return;
      }

      this.setData({
        disableBtn
      });
      console.log(data);
      this.cancelMeeting(data);
    },

    /**
      * 提交补卡申请
      */
    cancelMeeting: function (data) {
      let {
        imageBase64Arr,
        disableBtn
      } = this;
      app.globalData.ShowMsgUtil.showLoadToast("正在申请...");
      var _this = this;

      _this.setData({
        disableBtn: true
      });
			app.globalData.ShowMsgUtil.netErrNotice();
			
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.attenceApply,
        method: 'POST',
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        data: data,
        success: function (res) {
          wx.hideToast({});
          console.log('返回', res.data);

          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessToast("申请成功", 2000); //

            app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl, 2000);
          } else {
            _this.setData({
              disableBtn: false
            });
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
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
@import "./attendAskForLeaveApply.css";
</style>