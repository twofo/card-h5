<template>
<view class="page">
  <view class="pianoRoom-content subsection">

    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell weui-cell_input" @tap="selectMeetingRoom">
        <view class="weui-cell__hd">
          <image :src="imageObj.requiredPic" class="image-items"></image>
        </view>
        <view class="weui-cell__bd">房间号</view>
        <view class="weui-cell__ft">
          <view class="weui-input" v-if="roomName">{{roomName}}</view>
          <view class="weui-input" v-if="roomName == ''">请选择房间号</view>
        </view>
      </view>
    </view>

    <view class="weui-cells weui-cells_after-title subsection">
      <view class="weui-cell weui-cell_input" @tap="selectMeetingTime">
        <view class="weui-cell__hd">
            <image :src="imageObj.requiredPic" class="image-items"></image>
        </view>
        <view class="weui-cell__bd">开始时间</view>
        <view class="weui-cell__ft">
          <view class="weui-input" v-if="meetingStartTime != ''">{{meetingStartTime}}</view>
          <view class="weui-input" v-if="meetingStartTime == ''">请选择时间</view>
        </view>
      </view>

      <view class="weui-cell">
        <view class="weui-cell__hd">
          <image :src="imageObj.requiredPic" class="image-items"></image>
        </view>
        <view class="weui-cell__bd">预约人</view>
        <view class="weui-cell__ft">{{founder}}</view>
      </view>

      <view class="weui-cell" v-if="showItem" @tap="selectPerson">
        <view class="weui-cell__hd">
          <image :src="imageObj.requiredPic" class="image-items"></image>
        </view>
        <view class="weui-cell__bd">责任教师</view>
        <view class="weui-cell__ft">{{danceObj.dutyTeacher}}</view>
      </view>

      <!-- <view class="weui-cell weui-cell_input">
        <view class="weui-cell__hd" >
          <image src="{{imageObj.requiredPic}}" class="image-items"></image>
        </view>
        <view class="weui-cell__bd ">会议类型</view>
        <view class="weui-input"> -->
          <!-- <picker bindchange="bindCountryChange" value="{{countryIndex}}" range="{{countries}}">
            <view class="weui-select weui-select_in-select-after">{{countries[countryIndex]}}</view>
          </picker> -->
          <!-- 小型琴房
        </view>
      </view> -->

      <!-- <view class="weui-cell weui-cell_select">
        <view class="weui-cell__hd" style="margin-left: 15px;">
          <image src="{{imageObj.requiredPic}}" class="image-items"></image>
        </view>
        <view class="weui-cell__bd ">考勤时间</view>
        <view class="weui-cell__ft">
          <picker bindchange="bindCountryChange" value="{{countryIndex}}" range="{{countries}}">
            <view class="weui-select weui-select_in-select-after">{{checkingIn[checkIndex]}}</view>
          </picker>
        </view>
      </view> -->

      <view class="weui-cell" style="margin-left:20rpx;">   
        <view class="weui-cell__bd">
          <view class style="margin-bottom:10px;">备 注</view>
          <textarea class="weui-textarea" contentEditable="true"  v-if="!showFreeRule" placeholder="请输入..." :value="textAreaVal" style="min-height: 80px;" auto-height :maxlength="maxlength" @input="meetingConting"></textarea>
					<textarea class="weui-textarea" v-if="showFreeRule" placeholder value style="min-height: 80px;" auto-height :maxlength="maxlength" @input="meetingConting"></textarea>
          <view :class="'weui-textarea-counter ' + (wordsWith?'red':'')">{{contentLength}}/200</view>
        </view>
      </view>

    </view>

    <view v-if="roomName">
    <view class="freeTitle"> 费 用 </view>

    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__bd">收费标准</view>
        <view class="weui-input">
          <text>{{feeStander.unitprice}}元/小时</text>
          <text class="noticeFont noticeDistance " @tap="freeRule">收费说明</text>
          <icon type="warn" size="14" color="#20A4F7" class="iconStyle"></icon>
        </view>
      </view>
    </view>

    <view class="weui-cells weui-cells_after-title subsection">
      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__bd">总计时间</view>
        <view class="weui-input">
          {{sumTime}}小时
        </view>
      </view>

      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__bd">剩余免费时长</view>
        <view class="weui-input">
          {{feeStander.feeTimeLength}}小时
        </view>
      </view>

      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__bd">总计花费</view>
        <view class="weui-input">
          {{feeStander.sumfee}}元
        </view>
      </view>

      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__bd">钱包余额</view>
        <view class="weui-input">
          {{feeStander.balance}}元
        </view>
      </view>

      <view class="weui-cell weui-cell_input">
        <view class="weui-cell__bd"></view>
        <view class="weui-input payfor" @tap="goToWallet">
          <text class="noticeFont">充值金额</text>
          <view class="weui-cell__ft weui-cell__ft_in-access arrow"></view>
        </view>
      </view>
    </view>
		</view>	
    <view class="footer">
      <view class="page__bd page__bd_spacing">
        <button class="weui-btn" type="primary" :disabled="roomName =='' ? true: disabled" @tap="editSubmit">提 交</button>
      </view>
      <view class="warmCont weui-cell weui-cell_input">
        <view class="noticeTitle weui-cell__bd">温馨提示</view>
        <view class="noticeCont">
          <text>1.一天预定最长时长{{timeObj.appiontTimeLen}}小时，周末正常开放。</text>
          <text>2.默认提前{{timeObj.msgAdvanceTime}}分钟给预约人员发送通知。</text>
          <text>3.{{BarTitle}}取消预约在开始时间后的{{timeObj.allowCancelAppointmentTime}}分钟之前都可以。</text>  
          <!-- <text>5.实训室预约需要提前{{timeObj.cancelAdvanceTimes}}分钟开始预约。</text>   -->
          <text>4.关于取消{{BarTitle}}预约的收费，请查阅《收费说明》</text>
	      <text v-if="frequency" >5.每天只能预定{{timeObj.appiontTims}}次。</text>
        </view>
      </view>
    </view>
  </view>
  
  <!-- 弹框 -->
  <toast-cover v-if="showFreeRule" @closeCover="closeCover">

    <view class="coverContent">
      <view class="hasToKnow noticeFont">收退费须知</view>
      <view class="hasToKnowBox">
        <view v-for="(items, index) in hasToKnowArr" :key="index" class="hasToKnowCont">
          <view class="noticeFont hasToKnowTitle">{{items.title}}</view>
          <view class="hasToKnowTxt">{{items.content}}</view>
        </view>      
      </view>

      <view class="isImportantNotice">
        <view>在预约开始时间 24 小时之前取消预约，收取{{rules.twentyfour}}%的手续费；</view>
        <view>在预约开始时间前 12 到 24 小时内取消预约，收取{{rules.twelve}}%的手续费；</view>
        <view>在预约开始时间前 1 到 12 小时内取消预约，收取{{rules.one}}%的手续费；</view>
        <!-- <view>在预约开始时间前 1 小时内，不允许取消预约。</view> -->
      </view>
      
    </view>

  </toast-cover>
</view>
</template>

<script>
var app = getApp();
var ImageUrl = require("../../resources/utils/imageUrl.js");
import toastCover from "../../../../components/common/toastCover/toastCover";

export default {
  data() {
    return {
      pageObj: {},
      timeObj: {},
      imageObj: ImageUrl,
      founder: "",
      checkingIn: ['前30分钟', '前1小时'],
      checkIndex: 0,
      contentLength: 0,
      //备注字数
      textAreaVal: '',
      //备注内容
			wordsWith:false,
			frequency:'',//限制预约次数
      maxlength: 200,
      disabled: false,
      roomName: '',
      meetingStartTime: '',
      roomId: '',
      endM: '',
      startM: '',
      currentDay: '',
      appiontTimeDate: '',
      feeStander: {},
      sumTime: 0,
      showFreeRule: false,
      //费用说明弹窗
      rules: {},
	  pinodata:[{}],
      hasToKnowArr: [{
        title: "免费时长",
        content: "学校每个学期为全体师生们提供一定的免费时长去使用琴房。"
      }, {
        title: '收费时长',
        content: '使用琴房超过每学期提供的一定的免费时长，按照对应的标准收取相关费用。'
      }, {
        title: '取消预约',
        content: "对于已经完成缴费的，因为个别原因取消预约的，可以按照指定规则扣除一定比例的费用，并将剩余的费用返还给到用户账户，供用户下次使用，实现系统的灵活管理。"
      }],
			loadSuceess:false,   //获取房间配置信息是否成功

      /***
       * 练功房需要字段
       */
      showItem: false,
      //当教师角色下隐藏,学生角色显示内容
      danceObj: {
        dutyTeacher: '请选择' //责任教师

      },
      BarTitle: "琴房",
      type: 2,
      //练功房 3

      /***
       * 练功房 编辑需要字段
       */
      meetingId: null //预约id

    };
  },

  components: {
    toastCover
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let userInfoCash = app.globalData.StorageUtil.get('userInfoCach');
    let {
      userId,
      name
    } = userInfoCash;
    this.setData({
      founder: name
    }); //  判断是否是学生身份   type为3 练功房

    if (options.type && options.type == '3') {
      uni.setNavigationBarTitle({
        title: "公共资源_场所_练功房预约"
      });

      if (options.meetingId) {
        uni.setNavigationBarTitle({
          title: "公共资源_场所预约_练功房编辑"
        });
        this.getDetailById(options.meetingId, options.type);
      }

      let hasToKnowArr = [{
        title: "免费时长",
        content: "学校每个学期为全体师生们提供一定的免费时长去使用练功房。"
      }, {
        title: '收费时长',
        content: '使用练功房超过每学期提供的一定的免费时长，按照对应的标准收取相关费用。'
      }, {
        title: '取消预约',
        content: "对于已经完成缴费的，因为个别原因取消预约的，可以按照指定规则扣除一定比例的费用，并将剩余的费用返还给到用户账户，供用户下次使用，实现系统的灵活管理。"
      }]; 
			// if(idType != 0){

      this.setData({
        showItem: false,
        BarTitle: "练功房",
        hasToKnowArr,
        type: options.type
      }); 
			// }else{
      // this.setData({
      //   showItem: true,
      //   BarTitle:"练功房",
      //   hasToKnowArr,
      //   type: options.type
      // })
      // }
    }

    var roomType = this.type;
    this.getAppointmentConfigure(roomType);
  },

  onShow() {
    console.log(this.startM);
    console.log(this.endM);
		// #ifdef H5 ||  APP-PLUS
		uni.$on('updateData',this.updateData)  
		uni.$on('updateDutyteacher',this.updateDutyteacher)
		// #endif
    let userInfoCash = app.globalData.StorageUtil.get('userInfoCach');
    let idType = userInfoCash.personType;

    if (this.startM) {
      //  let obj = this.data.pageObj
      let sumTime = this.getHour(this.startM, this.endM); //  console.log(sumTime)

      this.setData({
        // 	 meetingRoomId: obj.meetingRoomId,
        // 	 roomName: obj.meetingRoomNumber,
        // 	 meetingStartTime: obj.startMeetingTime,
        // 	 startTime: obj.checkT,
        // 	 endTime: obj.endMeetingTime,
        sumTime
      });

      if (this.type == '3') {
        if (idType == 0) {
          this.setData({
            showItem: true
          });
        }
      }

      console.log("加载房间费用信息");
      console.log(this.roomId);
      this.getChargeInfo(this.roomId, 1);
    }
  },

  methods: {
		// #ifdef H5 || APP-PLUS
		updateData(e){
			console.log("层高",e)
			this.setData({
				meetingStartTime:e.meetingStartTime ,
				roomName:e.roomName ,
				roomId:e.roomId ,
				startM:e.startM ,
				endM:e. endM,
				currentDay:e.currentDay
			})
		},
		updateDutyteacher(e){
			console.log("层高",e)
			this.setData({
				danceObj: e.danceObj
			})
		},
		// #endif
	
    // 获取可配置时间
    getAppointmentConfigure: function (roomType) {
      var _this = this;
	  if(roomType==2){//限制预约次数
	  	   _this.setData({
			   frequency:true,
		   })
	   }
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentConfigure + '?areaType=' + roomType,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取预约，所需的配置信息"', res.data);

          if (res.data && res.data.code == 200) {
			  console.log(res.data);
            let data = res.data.rows;
			console.log(data);
			_this.pinodata=res.data.rows;
            if (_this.type == 2) {
              app.globalData.StorageUtil.set('pianoConfigDate', data);
            } else if (_this.type == 3) {
              app.globalData.StorageUtil.set('danceConfigDate', data);
            }

            _this.contralTime(data.configureDtos);
						_this.setData({
							loadSuceess:true
						})
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
        timeObj.cancelAdvanceTimes = data.cancelAdvanceTime == null ? 0 : data.cancelAdvanceTime;
        timeObj.msgAdvanceTime = data.msgAdvanceTime == null ? 0 : data.msgAdvanceTime;
        timeObj.appiontTimeLen = data.allowAppointmentDuration == null ? 0 : data.allowAppointmentDuration;
        timeObj.appiontTims = data.allowAppointmentCount == null ? 0 : data.allowAppointmentCount;
        timeObj.allowCancelAppointmentTime = data.allowCancelAppointmentTime == null ? 0 : data.allowCancelAppointmentTime;
        this.setData({
          timeObj
        });
      }
    },

    // 选择责任教师
    selectPerson() {
      let limitSelectPerson = 'dutyTeacher';
      let roomType = this.type;
      let startTime = new Date(this.startM.replace(/-/g, '/')).getTime();
      let endTime = new Date(this.endM.replace(/-/g, '/')).getTime();

      if (this.danceObj.id) {
        //再次进入选择责任教师
        let id = this.danceObj.id;
        app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.attendancePageUrl.dutyTeacherUrl + '?limitSelectPerson=' + limitSelectPerson + '&roomType=' + roomType + "&startTime=" + startTime + '&endTime=' + endTime + '&id=' + id, 500);
      } else {
        app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.attendancePageUrl.dutyTeacherUrl + '?limitSelectPerson=' + limitSelectPerson + '&roomType=' + roomType + "&startTime=" + startTime + '&endTime=' + endTime, 500);
      }
    },

    selectMeetingRoom() {
			let loadSuceess = this.loadSuceess
			if(loadSuceess){
				
				let type = this.type;
				console.log(this.pinodata);
				let s=JSON.stringify(this.pinodata);
			
				app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.selsectPianoRoomUrl + "?roomType=" + type, 500);
			}else{
				app.globalData.ShowMsgUtil.showNoneToast('配置信息获取失败,请稍后再试', 1000);
			}
     
    },

    selectMeetingTime() {
			let loadSuceess = this.loadSuceess
			if(loadSuceess){
				console.log(this.currentDay);
				let type = this.type;

				if (this.roomId != '' && this.meetingId == null) {
					app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.selectPianoTimeUrl + "?roomId=" + this.roomId + "&currentDay=" + this.currentDay + '&getT=1' + '&roomType=' + type, 500);
				} else {
					app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.selsectPianoRoomUrl + "?roomType=" + type, 500);
				}
			}else{
				app.globalData.ShowMsgUtil.showNoneToast('配置信息获取失败,请稍后再试', 1000);
			}
    },

    // 编辑预约时 获取预约详情
    getDetailById: function (appointmentId, type) {
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAreaAppointmentDetail + appointmentId + "/detail?areaType=" + type,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log("琴房详情", res.data);

          if (res.data && res.data.code == 200) {
            _this.eidtReduce(res.data.data);
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

    eidtReduce(data) {
      if (data.appointmentInfo) {
        let roomName = data.appointmentInfo.addressStr;
        let meetingStartTime = app.globalData.PublicUtil.formatTimeTwo(data.appointmentInfo.startTime, 'Y-M-D h:m') + '-' + app.globalData.PublicUtil.formatTimeTwo(data.appointmentInfo.endTime, 'h:m');
        let currentDay = data.appointmentInfo.startTime;
        let danceObj = {};

        if (data.appointmentInfo.approvalTeacherR.length > 0) {
          danceObj.dutyTeacher = data.appointmentInfo.approvalTeacherR[0].selectName;
          danceObj.id = data.appointmentInfo.approvalTeacherR[0].selectId;
          this.setData({
            showItem: true
          });
        }

        let textAreaVal = data.appointmentInfo.remark;
        let showFreeRule = false;
        let roomId = data.appointmentInfo.roomId;
        let meetingId = data.appointmentInfo.id;
        let startM = app.globalData.PublicUtil.formatTimeTwo(data.appointmentInfo.startTime, 'Y-M-D h:m:s');
        let endM = app.globalData.PublicUtil.formatTimeTwo(data.appointmentInfo.endTime, 'Y-M-D h:m:s');
        let sumTime = this.getHour(startM, endM);
        this.getChargeInfo(data.appointmentInfo.roomId, 1);
        this.setData({
          roomName,
          meetingStartTime,
          danceObj,
          textAreaVal,
          showFreeRule,
          sumTime,
          roomId,
          meetingId,
          startM,
          endM,
          currentDay
        });
      }
    },

    // 获取数据
    getChargeInfo: function (meetingRoomId, chargeType) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getChargeDetail + '?roomId=' + meetingRoomId + '&chargeType=' + chargeType + '&areaType=' + _this.type,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取收费信息', res.data);

          if (res.data && res.data.code == 200) {
            if (chargeType == 1) {
              _this.dataReduce(res.data.data.chargeSettings, _this.sumTime);
            } else {
              _this.feeRules(res.data.data.serviceChargeSettings);
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

    // 数据处理
    dataReduce(data, sumTime) {
      let obj = {};
      obj.unitprice = data.unitPrice;
      obj.isFee = data.isFee;
      obj.balance = data.balance;
      obj.feeTimeLength = data.feeTimeLength;
      obj.sumfee = (obj.unitprice * sumTime).toFixed(2);
      this.setData({
        feeStander: obj
      });
    },

    feeRules(res) {
      let rules = {};
      rules.twelve = res.rateTwentyFouraAndTwelve;
      rules.one = res.rateTwelveAndOne;
      rules.twentyfour = res.rateOverTwentyFour;
      this.setData({
        rules
      });
    },

    getHour(s1, s2) {
      s1 = new Date(s1.replace(/-/g, '/'));
      s2 = new Date(s2.replace(/-/g, '/'));
      var ms = Math.abs(s1.getTime() - s2.getTime());
      return (ms / 1000 / 60 / 60).toFixed(2);
    },

    // 备注输入
    meetingConting(e) {
       console.log(e)
      let meetingValue = e.detail.value;
      let meetingValueLength = meetingValue.length;
      let {
        contentLength,
        textAreaVal,
        disabled
      } = this;
      contentLength = meetingValueLength;
      textAreaVal = meetingValue;

      if (contentLength > 0) {
        disabled = false;
      } else {
        disabled = true;
      }

      this.setData({
        contentLength,
        textAreaVal,
        disabled
      });
    },

    // 收费说明
    freeRule() {
      let {
        showFreeRule,
        roomId
      } = this;
      this.getChargeInfo(roomId, 2);
      showFreeRule = true;
      this.setData({
        showFreeRule
      });
    },

    goToWallet() {
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toPay + "?isWater=20&toPayType=piano", 500);
    },

    editSubmit() {
      let {
        disabled,
        contentLength,
        type,
        danceObj,
        textAreaVal,
        startM,
        endM,
        roomId,
        founder,
        showItem
      } = this;
      this.setData({
        disabled: true
      });
      let startTimeE = new Date(startM.replace(/-/g, "/")).getTime();
      let endTimeE = new Date(endM.replace(/-/g, "/")).getTime();
      console.log(startTimeE);
      let data = {};

      if (type === '3') {
        //练功房数据
        if (showItem) {
          if (danceObj.dutyTeacher === '请选择') {
            app.globalData.ShowMsgUtil.showNoneToast('请选择责任教师', 2000);
            this.setData({
              disabled: false
            });
            return;
          }

          console.log("获取责任教师id", danceObj.id);
          data.responsibleTeacherId = danceObj.id;
        }

        data.roomId = roomId;
				data.startTime = startTimeE; 
				data.endTime = endTimeE;
				data.createUserName = founder
				data.remark = textAreaVal
				data.consumeChannel = 1;
        data.areaType = type;
        console.log('练功房预约成功');

        if (this.meetingId) {
          //预约编辑 需要的特殊字段
          console.log("编辑成功");
          data.appointmentId = this.meetingId;
          console.log(data);
          this.toUpdateAppointment(data);
          return;
        } else {
          console.log(data);
          this.createPiano(data);
        }

        return;
      } else {
        // 琴房数据
        data = {
          roomId: roomId,
          startTime: startTimeE,
          endTime: endTimeE,
          createUserName: founder,
          remark: textAreaVal,
          consumeChannel: 1,
          areaType: type
        };
        this.createPiano(data);
      }

      app.globalData.ShowMsgUtil.showLoadAndMsgToast();
    },

    createPiano: function (data) {
      app.globalData.ShowMsgUtil.showLoadToast("正在创建...");

      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        // url: app.RequestUrl.appointmentRequestUrl.createPianoRoomAppointment,
        url: app.globalData.RequestUrl.appointmentRequestUrl.createAreaAppointment,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: data,
        success: function (res) {
          console.log('琴房预约返回', res.data);

          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessToast("创建成功", 500);
            console.log(_this.type);
            app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.authPageUrl.successPageUrl + "?appointmentUserName=" + res.data.data.appointmentUserName + "&appointmentTime=" + res.data.data.appointmentTime + "&deductionMoney=" + res.data.data.deductionMoney + "&appointmentId=" + res.data.data.appointmentId + "&roomType=" + _this.type, 500);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);

            if (res.data.msg.indexOf('余额不足') != -1) {
              app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toPay + "?isWater=20&toPayType=piano", 1500);
            }

            _this.setData({
              disabled: false
            });

            return;
          }
        },
        fail: function () {
          _this.setData({
            disabled: false
          });

          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideToast({});
        }
      });
    },
    toUpdateAppointment: function (data) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.toUpdateAppointment,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: data,
        success: function (res) {
          wx.hideToast({});
          console.log('创建琴房预约', res.data);

          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessToast("修改成功", 500);
            console.log(_this.type);
            app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoListUrl + '?type=' + _this.type, 500);
          } else if (res.data && res.data.code == 201) {
            return;
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);

            if (res.data.msg.indexOf('余额不足') != -1) {
              app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.toPay + "?isWater=20&toPayType=piano", 1500);
            }

            _this.setData({
              disabled: false
            });

            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    closeCover(e) {
      let closecover = e.detail.closeCover;
      let showFreeRule = closecover;
      this.setData({
        showFreeRule
      });
    }

  }
};
</script>
<style>
@import "./appiontPianoRoom.css";
</style>