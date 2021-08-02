<template>
<view class="page">
  <view class="page__bd">

      <view class="weui-cells weui-cells_after-title">
          <view class="weui-cell weui-cell_input" @tap="selectMeetingRoomAndTime">
              <view class="weui-cell__hd">
                  <image :src="imageObj.requiredPic" class="image-items"></image>
              </view>
              <view class="weui-cell__bd">房间号</view>
              <view class="weui-cell__ft">
                  <!-- <input class="weui-input" placeholder="会议室301"/> -->
                  <view class="weui-input">{{pageObj.meetingRoomNumber}}</view>
                  
              </view>
              <view class="weui-cell__ft weui-cell__ft_in-access"></view>
          </view>
      </view>      

       <view class="weui-cells weui-cells_after-title" style="margin-top:6px;">
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__hd">
                    <image :src="imageObj.requiredPic" class="image-items"></image>
                </view>
                <view class="weui-cell__bd">会议主题</view>
                <view class="weui-cell__ft">
                  <input class="weui-input" placeholder="输入会议主题" @blur="meetingNameInp" :value="inpVal"></input>
                </view>
            </view>
            <view class="weui-cell weui-cell_select">
                <view class="weui-cell__hd" style="margin-left: 15px;">
                    <image :src="imageObj.requiredPic" class="image-items"></image>
                </view>
                <view class="weui-cell__bd ">会议类型</view>
                <view class="weui-cell__ft">
                  <picker @change="bindCountryChange" :value="countryIndex" :range="countries">
                        <view class="weui-select weui-select_in-select-after">{{countries[countryIndex]}}</view>
                    </picker>
                </view>
            </view>
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__hd">
                    <image :src="imageObj.requiredPic" class="image-items"></image>
                </view>
                <view class="weui-cell__bd">开始时间</view>
                <view class="weui-input" @tap="selectMeetingRoomAndTime">{{pageObj.startMeetingTime}}</view>
                <view class="weui-cell__ft weui-cell__ft_in-access"></view>
            </view>
            <view class="weui-cell">
                <view class="weui-cell__hd">
                    <image :src="imageObj.requiredPic" class="image-items"></image>
                </view>
                <view class="weui-cell__bd">发起人</view>
                <view class="weui-cell__ft">{{founder}}</view>
                <!-- <view class="weui-cell__ft weui-cell__ft_in-access"></view> -->
            </view>
            <view class="weui-cell" @tap="tapAttendee">
                <view class="weui-cell__hd">
                   <image :src="imageObj.requiredPic" class="image-items"></image>
                </view>
                <view class="weui-cell__bd">参会人员</view>
                <view class="weui-cell__ft attendee">{{attendMeeting}}</view>
                <view class="weui-cell__ft weui-cell__ft_in-access"></view>
            </view>
            <view class="weui-cell">
                <!-- <view class="weui-cell__hd">
                    <image src="{{imageObj.requiredPic}}" class="image-items"></image>
                </view> -->
                <view class="weui-cell__bd">
                <view class style="margin-bottom:10px;dispaly:flex;">
                    <image :src="imageObj.requiredPic" class="image-items"></image>会议内容
                  </view>
                    <textarea class="weui-textarea" placeholder="请输入..." :value="textAreaVal" style="height: 3.3em" :maxlength="maxlength" @input="meetingConting"></textarea>
                    <view :class="'weui-textarea-counter ' + (wordsWith?'red':'')">{{contentLength}}/200</view>
                </view>
            </view>
        </view>

       <view class="weui-cells weui-cells_after-title" style="margin-top:6px;">
          <view class="weui-cell ">
              <view class="weui-cell__hd">
                  <image :src="imageObj.requiredPic" class="image-items"></image>
              </view>
              <view class="weui-cell__bd">会前考勤时间</view>
              <view class="weui-cell__ft checkBox">
                <!-- {{pageObj.checkTime}} -->
                <input type="number" class="checkInp" :value="meetingBeforeTime" @input="meetingBeforeTimeInp"></input>
                <text>分钟</text>

              </view> 
          </view>
          <view class="weui-cell ">
              <view class="weui-cell__hd">
                  <image :src="imageObj.requiredPic" class="image-items"></image>
              </view>
              <view class="weui-cell__bd">会中考勤时间</view>
              <view class="weui-cell__ft checkBox">
                <!-- {{pageObj.checkTime}} -->
                <input type="number" class="checkInp" :value="meetingAfterTime" @input="meetingAfterTimeInp"></input>
                <text>分钟</text>

              </view> 
          </view>
          <view class="weui-cell" @tap="tapHoster">
              <view class="weui-cell__hd">
                   <image :src="imageObj.requiredPic" class="image-items"></image>
                </view>
              <view class="weui-cell__bd">主持人</view>
              <view class="weui-cell__ft attendee">{{hoster}}</view>
              <view class="weui-cell__ft weui-cell__ft_in-access"></view>
          </view>
          <view class="weui-cell" @tap.stop="tapRecoder">
              <view class="weui-cell__hd">
                   <image :src="imageObj.requiredPic" class="image-items"></image>
                </view>
              <view class="weui-cell__bd">记录人</view>
              <view class="weui-cell__ft attendee">{{recoder}}</view>
              <view class="weui-cell__ft weui-cell__ft_in-access"></view>
          </view>
      </view> 

      <view class="page__bd page__bd_spacing button_top">
        <button class="weui-btn" type="primary" :disabled="disabled" @tap="editSubmit">提 交</button>
      </view>
			<view class="weui-cell appiontNotive">
				<view>温馨提示</view>
				<view>1. 默认提前{{timeObj.msgAdvanceTime}}分钟给每位考勤人员发送考勤通知。</view>
				<view>2. 会议召开最短时间不超过30分钟。</view>
				<!-- <view>3. 预约时间距离当前时间需要超{{timeObj.appointmentAdvanceTime}}分钟以上。</view> -->
                <view>3. 会议预约开始时间后不可取消预约。</view>  
                <view>4. 会议开始前考勤时间不能超过会议开始时间30分钟。</view>  
				<view>5. 会议考勤签到区间是会议开始的“前{{meetingBeforeTime}}分钟”和“后{{meetingAfterTime}}分钟”,总共{{meetingCheckSumTime}} 分钟,时间来自创建会议时填写的考勤时间</view>
			</view>
  </view>
</view>
</template>

<script>
var app = getApp();
var ImageUrl = require("../../resources/utils/imageUrl.js");

export default {
  data() {
    return {
      //页面数据显示对象
      pageObj: {},
      timeObj: {},
      //图片对象
      imageObj: ImageUrl,
      disabled: false,
      countries: ["内部会议", "开放式会议"],
      countryIndex: 0,
      contentLength: 0,
      //输入内容长度
      maxlength: 200,
      //输入内容最大长度
      wordsWith: false,
      userId: 0,
      founder: '',
      meetingName: '',
      meetingCont: '',
      inpVal: '',
      //输入框的初始值
      attendMeeting: '请添加',
      hoster: '请添加',
      recoder: "请添加",
      meetingRoomNumber: '请选择会议室',
      meetingRoomId: '',
      startMeetingTime: '',
      endTime: '',
      appiontTimeDate: '',
      checkTime: "",
      type: 1,
      //会议编辑 2
      meetingId: '',
      //会议编辑传入数据,作为会议编辑标识
      meetingInitiatorId: '',
      meetingRecorderId: '',
      meetingEmceeId: '',
      isAgainApply: 0,
      meetingBeforeTime: 0,
      //会议开始前考勤时间
      meetingAfterTime: 0,
      //会议进行中考勤时间
      meetingCheckSumTime: 20 //会议考勤总长
      ,
      textAreaVal: "",
      meetingAttendee: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAppointmentConfigure();
    console.log('------------------------会议考勤 - 会议编辑------------------------');
    let {
      meetingRoomNumber,
      meetingRoomId,
      startMeetingTime,
      endTime
    } = this;

    if (JSON.stringify(options) != '{}') {
      console.log(options);

      if (options.meetingId != null) {
        console.log(options.meetingId);
        wx.setNavigationBarTitle({
          title: '公共资源_会议记录_会议编辑'
        });
        app.globalData.StorageUtil.set("meetingId", options.meetingId);
        this.getEditMeetingData(options.meetingId);

        if (options.isAgainApply != null) {
          this.setData({
            isAgainApply: options.isAgainApply
          });
        }

        this.setData({
          meetingId: options.meetingId
        });
      } else {
        wx.setNavigationBarTitle({
          title: '会议申请'
        }); // let sTime = options.appiontTimeDate+" "+ options.startTime+":00"
        // let checkStartTime = this.checkFn(sTime)
        // console.log(checkStartTime)
        // this.setData({
        //   meetingRoomNumber: options.roomName,
        //   meetingRoomId: options.meetingRoomId,
        //   type:options.type,
        //   startMeetingTime: options.appiontTimeDate+" "+ options.startTime,
        //   endTime: options.appiontTimeDate + " " + options.endTime,
        // 	checkTime: checkStartTime
        // })
        // let appiontInfoCach = app.StorageUtil.get('appiontInfoCach')
        // console.log(appiontInfoCach)
        // if (appiontInfoCach == '' || appiontInfoCach == null || Object.keys(appiontInfoCach).length == 0){
        //   let obj = {};
        //   obj.meetingRoomNumber = options.roomName;
        //   obj.meetingRoomId = options.meetingRoomId;
        //   obj.startMeetingTime = options.appiontTimeDate + ' ' + options.startTime;
        //   obj.endTime = options.appiontTimeDate + ' ' + options.endTime;
        //   console.log('obj-', obj);
        //   app.StorageUtil.set('appiontInfoCach', obj);
        // }
        // app.StorageUtil.remove('appiontInfoCach')
      }
    } //进入页面加载
    // app.ShowMsgUtil.showLoadAndMsgToast();
    // app.StorageUtil.remove('receiveCach')

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.pageObj); 
		uni.$on('updMeetPageObj',this.updMeetPageObj)

    if (this.pageObj.checkT) {
      let checkTime = this.checkFn(this.pageObj.checkT);
      console.log(checkTime);
      this.pageObj.checkTime = checkTime;
      this.setData({
        pageObj: this.pageObj
      });
    } else {
      let obj = {
        meetingRoomNumber: "请选择房间号",
        startMeetingTime: "请选择时间"
      };
      this.setData({
        pageObj: obj
      });
    } 
		
    // 获取会议编辑的用户基本信息
    let userInfoCash = app.globalData.StorageUtil.get('userInfoCach');
    let {
      userId,
      name
    } = userInfoCash;
    let {
      hoster,
      recoder,
      meetingId
    } = this; 
		//获取参加会议的人数
    // app.StorageUtil.remove('attendeeStudentCach')

    let stuAttendeeArr = app.globalData.StorageUtil.get('attendeeStudentCach');
    let staffhosoterArr = app.globalData.StorageUtil.get('hosterCach');
    let staffRecoderArr = app.globalData.StorageUtil.get('recoderCach');
    let attendArr = this.attendReduce(stuAttendeeArr, staffhosoterArr, staffRecoderArr);
    app.globalData.StorageUtil.set('attendeeStudentCach', attendArr);

    if (attendArr.length > 0) {
      this.concatArr(attendArr);
    } else {
      this.setData({
        attendMeeting: "请添加"
      });
    }

    if (staffhosoterArr.length > 0) {
      hoster = staffhosoterArr[0].name;

      if (hoster) {
        this.setData({
          hoster
        });
      }
    } else {
      hoster = '请添加';
    }

    if (staffRecoderArr.length > 0) {
      recoder = staffRecoderArr[0].name;

      if (recoder) {
        this.setData({
          recoder
        });
      }
    } else {
      recoder = '请添加';
    }

    this.setData({
      founder: name,
      userId,
      meetingId,
      hoster,
      recoder
    });
  },
  onUnload: function () {
    wx.hideLoading();
    this.clearStorageData();
		uni.$off('updMeetPageObj',this.updMeetPageObj)
  },
  methods: {
		updMeetPageObj(e){
			this.setData({
				pageObj: e.pageObj
			})
		},
    // 获取可配置时间
    getAppointmentConfigure: function (roomType) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentConfigure + '?areaType=1',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取预约，所需的配置信息"', res.data);

          if (res.data && res.data.code == 200) {
            let data = res.data.rows;

            _this.contralTime(data.configureDtos);
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

    // 可配置时间处理函数
    contralTime(data) {
      if (data) {
        let timeObj = {};
        timeObj.appointmentAdvanceTime = data.appointmentAdvanceTime == null ? 0 : data.appointmentAdvanceTime;
        timeObj.cancelAdvanceTime = data.cancelAdvanceTime == null ? 0 : data.cancelAdvanceTime;
        timeObj.msgAdvanceTime = data.msgAdvanceTime == null ? 0 : data.msgAdvanceTime;
        let meetingBeforeTime = data.meetingStartCheckInTime == null ? 0 : data.meetingStartCheckInTime;
        let meetingAfterTime = data.meetingEndCheckInTime == null ? 0 : data.meetingEndCheckInTime;
        this.setData({
          timeObj,
          meetingBeforeTime,
          meetingAfterTime
        });
      }
    },

    // 考勤时间
    checkFn(time) {
      if (app.globalData.SystemInfo.platform == 'ios') {
        var times = time.replace(/-/g, "/");
      }

      let d = new Date(times);
      let t = d.getTime(d);
      let cS = t - 1000 * 60 * this.timeObj.msgAdvanceTime;
      let cE = t + 1000 * 60 * this.timeObj.msgAdvanceTime;
      let checkTime = app.globalData.PublicUtil.formatTimeTwo(cS, "Y-M-D h:m") + ' - ' + app.globalData.PublicUtil.formatTimeTwo(cE, "h:m");
      return checkTime;
    },

    meetingBeforeTimeInp(e) {
      let val = e.detail.value == '' ? 0 : e.detail.value;
      let meetingBeforeTime = parseInt(val);
      let meetingCheckSumTime = meetingBeforeTime + parseInt(this.meetingAfterTime);

      if (meetingBeforeTime <= 30 && meetingBeforeTime >= 0) {
        this.setData({
          meetingBeforeTime,
          meetingCheckSumTime
        });
      } else if (e.detail.value.length == 0) {} else {
        app.globalData.ShowMsgUtil.showNoneToast("会前考勤时间不能大于30分钟", 2000);
        this.setData({
          meetingBeforeTime: 30
        });
      }
    },

    meetingAfterTimeInp(e) {
      let val = e.detail.value == '' ? 0 : e.detail.value;
      let meetingAfterTime = parseInt(val);
      let meetingCheckSumTime = parseInt(this.meetingBeforeTime) + parseInt(meetingAfterTime);

      if (meetingAfterTime <= 30 && meetingAfterTime >= 0) {
        this.setData({
          meetingAfterTime,
          meetingCheckSumTime
        });
      } else if (e.detail.value.length == 0) {} else {
        app.globalData.ShowMsgUtil.showNoneToast("会中考勤时间不能大于30分钟", 2000);
        this.setData({
          meetingAfterTime: 10,
          meetingCheckSumTime
        });
      }
    },

    // 人员选择跳转  /pages/attendanceModule/pages/selectPersonnel/selectPersonnel
    tapAttendee() {
      let limitSelectPerson = 'attendee';
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.selectDepartmentUrl + '?limitSelectPerson=' + limitSelectPerson, 500);
    },

    tapHoster() {
      let limitSelectPerson = 'hoster';
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.selectDepartmentUrl + '?limitSelectPerson=' + limitSelectPerson, 500);
    },

    tapRecoder() {
      let limitSelectPerson = 'recoder';
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.selectDepartmentUrl + '?limitSelectPerson=' + limitSelectPerson, 500);
    },

    // 数组字段拼接
    concatArr(arr) {
      let attendMeeting = '';

      if (arr.length > 0) {
        if (arr[0].name) {
          let attendMeeting = '';

          for (let i = 0; i < arr.length; i++) {
            if (i == arr.length - 1) {
              attendMeeting = attendMeeting + arr[i].name;
            } else {
              attendMeeting = attendMeeting + arr[i].name + '、';
            }
          }

          this.setData({
            attendMeeting
          });
        }
      }
    },

    /**
     * 处理页面对象
     */
    dealPageObj: function (data) {
      var obj = {};
      obj.meetingId = data.meetingId;
      obj.meetingSubject = data.meetingSubject;
      obj.meetingRoomName = data.meetingRoomName;
      obj.meetingType = data.meetingType;
      obj.meetingStartTime = data.meetingStartTime;
      obj.meetingInitiator = data.meetingInitiator;
      obj.meetingEmcee = data.meetingEmcee;
      obj.meetingRecorder = data.meetingRecorder;
      obj.meetingContent = data.meetingContent;
      obj.createTime = data.createTime; //会议状态

      var status = data.meetingStatus; //参会人员

      obj.meetingAttendee = '';

      for (let i = 0; i < data.meetingAttendee.length; i++) {
        if (i == data.meetingAttendee.length - 1) {
          obj.meetingAttendee = obj.meetingAttendee + data.meetingAttendee[i].userName;
        } else {
          obj.meetingAttendee = obj.meetingAttendee + data.meetingAttendee[i].userName + '、';
        }
      } // console.log('页面数据-', obj);


      this.setData({
        pageObj: obj
      });
    },

    selectMeetingRoomAndTime() {
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.appointmentTimeUrl + "?roomType=1", 500);
    },

    // 会议类型选择
    bindCountryChange(e) {
      console.log(e);
      let id = e.detail.value;
      this.setData({
        countryIndex: id
      });
    },

    // 会议名称INP
    meetingNameInp(e) {
      let meetingName = e.detail.value;
      this.setData({
        meetingName
      });
    },

    meetingConting(e) {
      //计算输入长度
      let content = e.detail.value;
      let contentLength = content.length;

      if (contentLength >= 200) {
        contentLength = 200;
        this.setData({
          contentLength,
          wordsWith: true,
          meetingCont: content
        });
      } else {
        this.setData({
          contentLength,
          wordsWith: false,
          meetingCont: content
        });
      }
    },

    // 处理参会人,主持人,记录人的显示
    showStorageData(data, name) {
      let arr = [];

      for (let i = 0; i < data.length; i++) {
        let tem = {};
        tem.name = data[i].selectName;
        tem.id = data[i].selectId;
        tem.checked = true;
        tem.selectRole = data[i].selectRole;
        tem.selectType = data[i].selectType;
        tem.isHasChild = data[i].isHasChild;
        arr[i] = tem;
      }

      return arr;
    },

    // 会议编辑会议信详情
    getEditMeetingData(meetingId) {
      app.globalData.ShowMsgUtil.showLoadToast("正在加载...");
			app.globalData.ShowMsgUtil.netErrNotice();
      let _this = this;

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
            //meetingInitiatorId 发起人 
            //处理选择人员回显数据
            _this.dealSelectShow(res.data.rows);

            var {
              meetingRoomId,
              meetingRoomName,
              meetingInitiatorId,
              meetingInitiator,
              meetingEmceeId,
              meetingEmcee,
              meetingRecorderId,
              meetingRecorder,
              meetingStartTime,
              meetingEndTime,
              meetingType,
              meetingContent,
              meetingAttendee,
              meetingAttendeeR,
              meetingEmceeR,
              meetingRecorderR,
              meetingSubject,
              meetingRoomAddress,
              meetingRoomType,
              attenceBeforeTimeNumber,
              attenceAfterTimeNumber
            } = res.data.rows; // 缓存会议编辑页面所有人员数据

            let meetingAtten = _this.showStorageData(meetingAttendeeR, '');

            let hosterData = _this.showStorageData(meetingEmceeR, meetingEmcee);

            let recoderData = _this.showStorageData(meetingRecorderR, meetingRecorder);

            app.globalData.StorageUtil.set('attendeeStudentCach', meetingAtten);
            app.globalData.StorageUtil.set('hosterCach', hosterData);
            app.globalData.StorageUtil.set('recoderCach', recoderData);

            _this.concatArr(meetingAtten);

            var checkT = meetingStartTime;
            let platform = app.globalData.SystemInfo.platform;

            if (platform == 'ios') {
              var meetingEndTime = meetingEndTime.replace(/-/g, "/");
              var meetingStartTime = meetingStartTime.replace(/-/g, "/");
              var checkT = meetingStartTime;
            }

            var checkTime = _this.checkFn(checkT);

            console.log(checkTime);
            let size = '';

            if (meetingRoomType.indexOf('大型')) {
              size = '大';
            } else if (meetingRoomType.indexOf('中型')) {
              size = '中';
            } else if (meetingRoomType.indexOf('小型')) {
              size = '小';
            }

            let pageObj = {
              meetingRoomNumber: meetingRoomAddress.split('->')[0] + '-->' + meetingRoomAddress.split('->')[meetingRoomAddress.split('->').length - 1] + '(' + size + ')',
              checkTime: checkTime,
              startMeetingTime: meetingStartTime + '-' + meetingEndTime.split(' ')[1],
              endMeetingTime: meetingEndTime,
              checkT: meetingStartTime,
              meetingRoomId: meetingRoomId
            };

            _this.setData({
              meetingRoomId,
              meetingCont: meetingContent,
              textAreaVal: meetingContent,
              inpVal: meetingSubject,
              meetingName: meetingSubject,
              countryIndex: meetingType - 1,
              endTime: meetingEndTime,
              meetingAttendee,
              founder: meetingInitiator,
              meetingInitiatorId,
              recoder: recoderData[0].name,
              meetingRecorderId,
              hoster: hosterData[0].name,
              meetingEmceeId,
              pageObj,
              meetingBeforeTime: attenceBeforeTimeNumber,
              meetingAfterTime: attenceAfterTimeNumber
            });
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideToast();
        }
      });
    },

    dealSelectShow: function (rows) {
      let attendeeR = rows.meetingAttendeeR;
      let emceeR = rows.meetingEmceeR;
      let initiatorR = rows.meetingInitiatorR;
      let recorderR = rows.meetingRecorderR;
      app.globalData.StorageUtil.set('recoderCach', this.handlerUpdate(recorderR));
      app.globalData.StorageUtil.set('hosterCach', this.handlerUpdate(emceeR));
      let x = 0;
      let y = 0;
      let attendeeStudent = [];
      let attendeeTeacher = [];

      for (let i = 0; i < attendeeR.length; i++) {
        if (attendeeR[i].selectRole == 0) {
          attendeeStudent[x] = attendeeR[i];
          x++;
        } else if (attendeeR[i].selectRole == 1) {
          attendeeTeacher[y] = attendeeR[i];
          y++;
        }
      }

      app.globalData.StorageUtil.set('attendeeCach', this.handlerUpdate(attendeeTeacher));
      app.globalData.StorageUtil.set('attendeeStudentCach', this.handlerUpdate(attendeeStudent));
    },
    handlerUpdate: function (data) {
      for (let i = 0; i < data.length; i++) {
        data[i].isUpdate = 1;
      }

      return data;
    },

    // 提交参会人格式
    attendeeArrRule(data, type) {
      // console.log(data)
      let arr = [];

      if (type == 'edit') {
        for (let i = 0; i < data.length; i++) {
          let tem = {};
          tem.selectId = data[i].id;
          tem.selectRole = data[i].selectRole;
          tem.selectType = data[i].selectType;
          arr[i] = tem;
        }
      }

      if (type == 'creat') {
        for (let i = 0; i < data.length; i++) {
          let tem = {};
          tem.selectId = data[i].id;
          tem.selectRole = data[i].selectRole;
          tem.selectType = data[i].selectType;
          arr[i] = tem;
        }
      }

      console.log(arr);
      return arr;
    },

    // 提交点击事件
    editSubmit() {
      let {
        // meetingId,
        meetingRoomId,
        userId,
        countryIndex,
        founder,
        startMeetingTime,
        endTime,
        meetingName,
        meetingCont,
        disabled,
        meetingEmceeId,
        meetingRecorderId,
        meetingAttendee,
        meetingInitiatorId,
        pageObj
      } = this;
      let obj = {};
      let sAttendeeCach = app.globalData.StorageUtil.get('attendeeStudentCach'); //学生参会人

      let hosterCach = app.globalData.StorageUtil.get('hosterCach'); //主持人,教职工和学生共用一个缓存

      let recoderCach = app.globalData.StorageUtil.get("recoderCach"); //记录人,教职工和学生共用一个缓存

      let meetingId = app.globalData.StorageUtil.get("meetingId");
      console.log(hosterCach, recoderCach, sAttendeeCach);

      if (meetingName.length <= 0 || meetingCont.length <= 0 || sAttendeeCach.length <= 0 || hosterCach.length <= 0 || recoderCach.length <= 0) {
        app.globalData.ShowMsgUtil.showNoneToast('请填写完整信息', 3000);
        this.setData({
          //恢复点击功能
          disabled: false
        });
        return;
      }

      this.setData({
        //阻止多次触发点击事件
        disabled: true
      }); // 发送请求  编辑

      if (meetingId != '') {
        console.log(pageObj); // let startT = pageObj.checkT ? pageObj.checkT : pageObj.startMeetingTime.
        // 会议时间
			
        if (app.globalData.SystemInfo.platform == 'ios') {
          pageObj.checkT = pageObj.checkT.replace(/-/g, "/");
          pageObj.endMeetingTime = pageObj.endMeetingTime.replace(/-/g, "/");
					
        }
				let meetingStartTime = new Date(pageObj.checkT + ':00').getTime();
        let meetingEndTime = new Date(pageObj.endMeetingTime + ':00').getTime();
       
        console.log("创建会议的时间检测");
        console.log(meetingStartTime);
        console.log(meetingEndTime); // 主持人,记录人ID

        let meetingEmceeIds = hosterCach[0].id;
        let meetingRecorderIds = recoderCach[0].id;

        if (meetingInitiatorId == 0) {
          meetingInitiatorId = userId;
        }

        let meetingAttendees = this.attendReduce(sAttendeeCach, hosterCach, recoderCach);
        let meetingAttendArr = this.attendeeArrRule(meetingAttendees, 'edit');
        let meetingAttendee = meetingAttendArr;
        let data1 = {
          'meetingId': meetingId,
          'meetingRoomId': pageObj.meetingRoomId,
          'meetingSubject': meetingName,
          'meetingContent': meetingCont,
          'meetingType': parseInt(countryIndex) + 1,
          'meetingInitiatorId': meetingInitiatorId,
          'meetingEmceeId': meetingEmceeIds,
          'meetingRecorderId': meetingRecorderIds,
          'meetingAttendee': meetingAttendee,
          'meetingStartTime': meetingStartTime,
          'meetingEndTime': meetingEndTime,
          'isAgainApply': this.isAgainApply,
          'attenceStartTime': this.meetingBeforeTime,
          'attenceEndTime': this.meetingAfterTime
        };
        console.log('data1-', data1);
        let updateMeeting = app.globalData.RequestUrl.appointmentRequestUrl.updateMeeting;
        this.creactAndUploadMeeting(data1, updateMeeting, 'PUT', '修改');
      } else {
        //申请
        if (app.globalData.SystemInfo.platform == 'ios') {
          pageObj.checkT = pageObj.checkT.replace(/-/g, "/");
          pageObj.endMeetingTime = pageObj.endMeetingTime.replace(/-/g, "/");
        }

        let meetingStartTime = new Date(pageObj.checkT + ':00').getTime();
        let meetingEndTime = new Date(pageObj.endMeetingTime + ':00').getTime();
        console.log(meetingStartTime);
        console.log(meetingEndTime);
        let meetingTypeIndex = parseInt(countryIndex) + 1;
        obj.meetingRoomId = pageObj.meetingRoomId;
        obj.meetingSubject = meetingName;
        obj.meetingContent = meetingCont;
        obj.meetingType = meetingTypeIndex;
        obj.meetingStartTime = meetingStartTime;
        obj.meetingEndTime = meetingEndTime; // 创建会议人，主持人,记录人ID

        obj.meetingInitiatorId = userId;
        obj.meetingEmceeId = hosterCach[0].id;
        obj.meetingRecorderId = recoderCach[0].id; // 参会人员

        let meetingAttendnew = this.attendReduce(sAttendeeCach, hosterCach, recoderCach);
        obj.meetingAttendee = this.attendeeArrRule(meetingAttendnew, 'creat');
        let data = {
          'meetingRoomId': obj.meetingRoomId,
          'meetingSubject': obj.meetingSubject,
          'meetingContent': obj.meetingContent,
          'meetingType': obj.meetingType,
          'meetingInitiatorId': obj.meetingInitiatorId,
          'meetingEmceeId': obj.meetingEmceeId,
          'meetingRecorderId': obj.meetingRecorderId,
          'meetingAttendee': obj.meetingAttendee,
          'meetingStartTime': obj.meetingStartTime,
          'meetingEndTime': obj.meetingEndTime,
          'isAgainApply': this.isAgainApply,
          'attenceStartTime': this.meetingBeforeTime,
          'attenceEndTime': this.meetingAfterTime
        };
        console.log('data', data);
        let creatMeeting = app.globalData.RequestUrl.appointmentRequestUrl.creatMeeting;
        this.creactAndUploadMeeting(data, creatMeeting, 'POST', '创建');
      }
    },

    // 参会人去重 包括记录人和主持人
    attendReduce(sAttendeeCach, hosterCach, recoderCach) {
      let newAttendeeArr = [...sAttendeeCach, ...hosterCach, ...recoderCach];
      console.log(newAttendeeArr);
      let len = newAttendeeArr.length;
      let tempJson = {};
      let res = [];

      for (let i = 0; i < len; i++) {
        //取出每一个对象
        tempJson[JSON.stringify(newAttendeeArr[i])] = true;
      }

      let keyItems = Object.keys(tempJson);

      for (let j = 0; j < keyItems.length; j++) {
        res.push(JSON.parse(keyItems[j]));
      }

      return res;
    },

    // 取消选中，删除缓存中的对应的数据
    cancelChecked(cach, nocheck) {
      console.log(cach, nocheck);
      let nocheckArr = [];

      if (cach && nocheck) {
        for (var i = 0, lenA = cach.length; i < lenA; i++) {
          for (var b = 0, lenB = nocheck.length; b < lenB; b++) {
            if (cach[i].id == nocheck[b].id && cach[i].selectRole == nocheck[b].selectRole) {
              cach.splice(i, 1);
              nocheckArr = cach;
              return nocheckArr;
            }
          }
        }
      }
    },

    // 申请,更新会议
    creactAndUploadMeeting(data, url, method, typeName) {
      console.log('创建或编辑会议-', data);
      app.globalData.ShowMsgUtil.showLoadToast("正在创建..."); // 发送请求

      let _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

      _this.setData({
        //阻止多次触发点击事件
        disabled: true
      });
			app.globalData.ShowMsgUtil.netErrNotice();
      wx.request({
        url: url,
        method: method,
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        data: data,
        success: function (res) {
          wx.hideToast({});
          console.log('创建会议返回', res.data);

          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessToast("会议" + typeName + "成功", 2000);

						clearTimeout()
						setTimeout(()=>{
							_this.clearStorageData(); //跳转到会议列表
							// uni.reLaunch({
							// 	url:"pages/tarBarModule/index/index"
							// })
							app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl, 500)
						},2000)

						
            // app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.appointmentPageUrl.meetingListUrl, 2000);
					
          } else {
            _this.setData({
              //阻止多次触发点击事件
              disabled: false
            });

            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          _this.setData({
            //阻止多次触发点击事件
            disabled: false
          });

          wx.hideToast({});
          app.globalData.ShowMsgUtil.showErrorModal('请求失败', '网络有误');
          return;
        }
      });
    },

    //  日期 时间戳 转换
    timesToTime(date) {
      let d = new Date(date);
      let t = d.getTime(d);
      return t;
    },

    // 清除缓存数据
    clearStorageData() {
      app.globalData.StorageUtil.remove('hosterCach');
      app.globalData.StorageUtil.remove('recoderCach');
      app.globalData.StorageUtil.remove('attendeeCach');
      app.globalData.StorageUtil.remove('attendeeStudentCach');
      app.globalData.StorageUtil.remove('attendeeCach');
      app.globalData.StorageUtil.remove('appiontInfoCach');
      app.globalData.StorageUtil.remove('meetingId');
    }

  }
};
</script>
<style>
@import "./meetingOperation.css";
</style>