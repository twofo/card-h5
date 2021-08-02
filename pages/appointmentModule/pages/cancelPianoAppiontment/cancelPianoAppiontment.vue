<template>
<view class="page" v-if="showDate">
  <view>
    <view class="cancelTitle">预约人信息</view>
    <view class="weui-cells">
      <view class="myui-cell  ">
        <view class="myui-cell__bd contTitle">姓 名：</view>
        <view class="myui-cell__bf">{{pageObj.userName}}</view>
      </view>

      <view class="myui-cell  ">
        <view class="myui-cell__bd contTitle">{{pageObj.userCodeTxt}}：</view>
        <view class="myui-cell__bf">{{pageObj.userCode}}</view>
      </view>

      <view class="myui-cell  ">
        <view class="myui-cell__bd contTitle">{{pageObj.departmentTxt}}：</view>
        <view class="myui-cell__bf">{{pageObj.department}}</view>
      </view>

      <view class="myui-cell  ">
        <view class="myui-cell__bd contTitle">{{pageObj.marjorTxt}}：</view>
        <view class="myui-cell__bf">{{pageObj.marjor}}</view>
      </view>

      <view class="myui-cell  ">
        <view class="myui-cell__bd contTitle">手机号：</view>
        <view class="myui-cell__bf">{{pageObj.phoneNumber}}</view>
      </view>
    </view>
  </view>

  <view>
    <view class="cancelTitle">房间信息</view>
    <view class="weui-cells">
      <view class="myui-cell  ">
        <view class="myui-cell__bd contTitle">房间地址：</view>
        <view class="myui-cell__bf">{{pageObj.roomAdress}}</view>
      </view>

      <!-- <view class="myui-cell  ">
        <view class="myui-cell__bd contTitle">房间号：</view>
        <view class="myui-cell__bf"></view>
      </view> -->

      <view class="myui-cell  ">
        <view class="myui-cell__bd contTitle">预约时间：</view>
        <view class="myui-cell__bf">{{pageObj.appiontmentTime}}</view>
      </view>

      
      <view class="myui-cell  ">
        <view class="myui-cell__bd contTitle">备注：</view>
        <view class="myui-cell__bf">{{pageObj.appiontmentReason}}</view>
      </view>

      <!-- <view class="myui-cell reason ">
        <view class="myui-cell__bd contTitle">原 因：</view>
        <textarea class="reasonTxt" placeholder="输入取消预约的原因…" placeholder-style="font-size:15px"></textarea>
      </view> -->

    </view>

    <view class="page__bd page__bd_spacing" style="margin-top:60rpx;" v-if="showNextMsg">
      <button class="weui-btn" type="primary" @tap="nextTap">下 一 步</button>
    </view>

    <view v-if="!showNextMsg">
      <view class="cancelTitle">收费</view>
      <view class="weui-cells">
        <view class="myui-cell  ">
          <view class="myui-cell__bd contTitle">收费标准：</view>
          <view class="myui-cell__bf">{{pageObj.standerFee}} 元 / 小时</view>
        </view>

        <view class="myui-cell  ">
          <view class="myui-cell__bd contTitle">总计时长：</view>
          <view class="myui-cell__bf">{{pageObj.sumTime}} 小时</view>
        </view>

        <view class="myui-cell  ">
          <view class="myui-cell__bd contTitle">消费免费时长：</view>
          <view class="myui-cell__bf">{{pageObj.freeTimeLength}} 小时</view>
        </view>

        <view class="myui-cell  ">
          <view class="myui-cell__bd contTitle">应收金额：</view>
          <view class="myui-cell__bf">{{pageObj.refFee}} 元</view>
        </view>
      </view>

      <view class="cancelTitle">退费</view>
      <view class="weui-cells">
        <view class="myui-cell  ">
          <view class="myui-cell__bd contTitle">应退金额：</view>
          <view class="myui-cell__bf">{{pageObj.shouldRefundCharge}} 元</view>
        </view>

        <view class="myui-cell  ">
          <view class="myui-cell__bd contTitle">手 续 费：</view>
          <view class="myui-cell__bf rightflex"> 
            <text>{{pageObj.serviceCharge}} 元</text>
            <view>
              <text class="noticeFont noticeDistance " @tap="freeRule">扣费说明</text>
              <icon type="warn" size="14" color="#20A4F7" class="iconStyle"></icon>  
            </view>
           
          </view>
        </view>
       

        <view class="myui-cell  ">
          <view class="myui-cell__bd contTitle">实退金额：</view>
          <view class="myui-cell__bf">{{pageObj.realityDeductionMoney}} 元</view>
        </view>

      </view>
      <view class="page__bd page__bd_spacing" style="margin-top:60rpx;margin-bottom:270rpx;">
        <button class="weui-btn" type="primary" :disabled="disabled" @tap="submit">提 交</button>
      </view>
    </view>
  </view>

  <!-- 弹框 -->
  <toast-cover v-if="showFreeRule" @closeCover="closeCover" maxHeight="710" marginTop="120">
    <view class="coverContent">
      <view class="hasToKnow noticeFont">手续费说明</view>
      <view class="hasToKnowBox">
        <view v-for="(items, index) in hasToKnowArr" :key="index" class="hasToKnowCont">
          <view class="hasToKnowTxt">{{items.content}}</view>
        </view>      
      </view>
     
    </view>
  </toast-cover>

</view>
</template>

<script>
var app = getApp();
import toastCover from "../../../../components/common/toastCover/toastCover";

export default {
  data() {
    return {
      pageObj: {},
      showNextMsg: true,
      showFreeRule: false,
      //费用说明弹窗
      hasToKnowArr: [],
      meetingId: 0,
      disabled: false,
      showDate: false,
      //当页面没有数据时不显示
      type: 2 // 琴房 2  练功房 3

    };
  },

  components: {
    toastCover
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.meetingId);
    this.setData({
      meetingId: options.meetingId,
      type: options.roomType
    });
		
		if(options.roomType == 2){
			uni.setNavigationBarTitle({
			  title: "公共资源_琴房记录_取消预约"
			});
		}else{
			uni.setNavigationBarTitle({
			  title: "公共资源_练功房记录_取消预约"
			});
		}
		
    this.getCancelInfo(options.meetingId);
    this.getChargeInfo();
  },
  onUnload: function () {
    clearTimeout();
  },
  methods: {
    // 获取取消用户信息
    getCancelInfo: function (meetingId) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentCancelInfo + meetingId + '/detail',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取预约取消信息', res.data);

          if (res.data && res.data.code == 200) {
            _this.setData({
              showDate: true
            });

            _this.dataReduce(res.data.data.userInfo, res.data.data.appointmentInfo, res.data.data.appointmentChargeInfo, res.data.data.appointmentRefundChargeInfo, userInfoCach.mobile);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              });
            }, 3000);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
    getChargeInfo: function () {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.getChargeDetail + '?roomId=' + this.meetingId + '&chargeType=2' + '&areaType=' + _this.type,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取收费信息', res.data);

          if (res.data && res.data.code == 200) {
            _this.rulesReduce(res.data.data.serviceChargeSettings);
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

    rulesReduce(res) {
      let rules = {};
      rules.twelve = res.rateTwentyFouraAndTwelve;
      rules.one = res.rateTwelveAndOne;
      rules.twentyfour = res.rateOverTwentyFour;
      let arr = [{
        content: `在预约开始时间24小时之前取消预约，收取${rules.twentyfour}%的收手续费；`
      }, {
        content: `在预约开始时间前12～24小时内取消预约，收取${rules.twelve}%的手续费；`
      }, {
        content: `在预约开始时间前1～12小时内取消预约，收取${rules.one}%的手续费； `
      } // { content: "在预约开始时间前1小时内，不允许取消预约。" }
      ];
      this.setData({
        hasToKnowArr: arr
      });
    },

    dataReduce(user, room, charge, refCharge, phone) {
      let obj = {}; // userType 人员类型：1教师 0学生

      if (user) {
        obj.userId = user.id;
        obj.userName = user.name;
        obj.userCode = user.userNo;
        obj.phoneNumber = user.phoneNumber;
        obj.department = user.deptName == null ? '无' : user.deptName;
        obj.marjor = user.majorName == null ? '无' : user.majorName;
        obj.personType = user.userType;
        obj.phone = phone;

        if (obj.personType == 0) {
          obj.userCodeTxt = '学号';
          obj.departmentTxt = '院系';
          obj.marjorTxt = '专业';
        } else if (obj.personType == 1) {
          obj.userCodeTxt = '职工号';
          obj.departmentTxt = '部门';
          obj.marjorTxt = '校区';
        }
      }

      if (room) {
        obj.roomAdress = room.addressStr;
        obj.roomId = room.id;
        obj.appiontmentTime = this.timesToTime(room.startTime).yearMountDay + this.timesToTime(room.startTime).hourM + " - " + this.timesToTime(room.endTime).hourM;
        obj.appiontmentReason = room.remark == '' ? "无" : room.remark;
      }

      if (charge) {
        if (charge.unitPrice == null) {
          obj.standerFee = 0;
        } else {
          obj.standerFee = charge.unitPrice;
        }

        obj.sumTime = charge.totalTimeLength;
        obj.freeTimeLength = charge.feeTimeLength;
        obj.refFee = charge.deductionCharge;
      }

      if (refCharge) {
        obj.shouldRefundCharge = refCharge.shouldRefundCharge;
        obj.serviceCharge = refCharge.serviceCharge;
        obj.realityDeductionMoney = refCharge.realityDeductionMoney;
      }

      this.setData({
        pageObj: obj
      });
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

    submit() {
      let {
        meetingId,
        pageObj,
        disabled
      } = this;
      let data = {
        appointmentId: meetingId,
        realityDeductionMoney: pageObj.realityDeductionMoney,
        serviceCharge: pageObj.serviceCharge
      };
      console.log("提交数据", data);
      this.toCancelPianoAppointment(data);
      this.setData({
        disabled: true
      });
    },

    // 取消预约
    toCancelPianoAppointment: function (data) {
      app.globalData.ShowMsgUtil.showLoadToast("正在取消...");

      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      console.log("点击取消,已经开始");
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.toCancelAppointment,
        method: 'POST',
        header: {
          'token': userInfoCach.token
        },
        data: data,
        success: function (res) {
          console.log(res);
          wx.hideToast({});

          if (res.data && res.data.code == 200) {
            // app.ShowMsgUtil.showSuccessToast("预计在2~3个工作日后退还至你的账户余额中。退费金额为7", 2000);
            let msg = res.data.msg;
            app.globalData.ShowMsgUtil.showSuccessToast("取消成功", 500);
            app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.authPageUrl.successPageUrl + "?cancelMsg=" + msg + '&backPage=3&roomType='+ _this.type, 500);
          } else {
            _this.setData({
              disabled: false
            });

            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          console.log("请求失败");

          _this.setData({
            disabled: false
          });

          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    nextTap() {
      let {
        showNextMsg
      } = this;
      showNextMsg = false;
      this.setData({
        showNextMsg
      });
    },

    freeRule() {
      let {
        showFreeRule
      } = this;
      showFreeRule = true;
      this.setData({
        showFreeRule
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
@import "./cancelPianoAppiontment.css";
</style>