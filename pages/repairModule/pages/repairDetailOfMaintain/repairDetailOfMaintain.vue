<template>
<view class="page">
  <view class="page__bd">
    <view >
      
      <!-- 报修详情展示 -->
      <repair-detail :pageObj="pageObj"  :callImage="callImage" @call="bindCallPhone" ></repair-detail>
      <!-- 维修时间 -->
      <view v-if="!btnObj.isRefuse" class="weui-cell weui-cell_access" hover-class="weui-cell_active" style="background-color:#fff;margin-top:10rpx;">
        <view class="weui-cell__bd">约定维修时间</view>
        <view class="weui-cell__ft weui-cell__ft_in-access">
          <picker mode="date" :value="date" :start="startTime" end="2030-09-01" @change="bindDateChange"  :disabled="aaa">
            <view>{{date}}</view>
          </picker>
        </view>
      </view>
      <!-- 拒绝原因 -->
      <view v-else-if="btnObj.isRefuse!='' && btnObj.isRefuse" class="weui-cells weui-cells_after-title" style="margin-top:10rpx;">
          <view class="weui-cell">
              <view class="weui-cell__bd">
                  <textarea class="weui-textarea" placeholder="请填写拒绝原因" style="height: 3.6em" maxlength="200" @input="inputReasonFun"></textarea>
                  <view class="weui-textarea-counter">{{cursor}}/200</view>
              </view>
          </view>
      </view>
      <!-- 按钮 -->
      <view class="weui-cells" style="font-size:15px;" v-if="btnObj.isFinish">
        <view class="weui-cell">
          
        <!--  <view class="weui-cell__bd">维修备注： 
            <textarea :value="pageObj.repairRemarksOfMaintainer" style="width: 100%;height: 3.0em;"></textarea>
          </view> -->
        </view>
     <!--   <view class="weui-cell text-date img_bd" @tap="previewImage" v-if="pageObj.imagesOfMaintainer!==''&& pageObj.imagesOfMaintainer!==null">
          <view v-if="pageObj.imagesOfMaintainer[0] != ''" @tap="previewImage" ><image :src="pageObj.imagesOfMaintainer[0]" class="img"> </image></view>
          <view v-if="pageObj.imagesOfMaintainer[1] != ''"><image :src="pageObj.imagesOfMaintainer[1]" class="img"> </image></view>
        </view> -->
      </view>
      <view class="page__bd page__bd_spacing button_top" v-if="pageObj.repairStatus!==5 && pageObj.repairStatus!==4">
	     <!--  <button class="weui-btn" type="primary" :disabled="disabled" form-type="submit"   @tap="handleClick">{{btnObj.name}}</button> -->
		<view class=""  v-if="btnObj.bind== 'confirmFinish'&& personType!==0">
		  	<button class="weui-btn" type="primary" :disabled="disabled" form-type="submit"  @tap="confirmFinish">{{btnObj.name}}</button>
		  </view>
          <view class="" v-if="btnObj.bind== 'confirmRefuse' &&personType!==0">
          		<button class="weui-btn" type="primary"  :disabled="disabled" form-type="submit" @tap="confirmRefuse">{{btnObj.name}}</button>
          </view>
	<view class="" v-if="btnObj.bind== 'confirmDeal' &&personType!==0">
			<button class="weui-btn" type="primary"  :disabled="disabled" form-type="submit" @tap="confirmDeal">{{btnObj.name}}</button>
	</view>
      </view>
    </view>

  </view>
</view>
</template>

<script>
var app = getApp();
var Util = require("../../resources/utils/utils.js");
var ImageUrl = require("../../resources/utils/imageUrl.js");
import repairDetail from "../../../../components/repairModule/repairDetail/repairDetail";

export default {
  data() {
    return {
      pageObj: {},
      callImage: ImageUrl.icCall,
      repairCode: '',
      startTime: '',
      date: '',
      // 预定的维修时间
      btnObj: {
		 
	  },
      // 按钮对象
      inputReason: '',
      // 拒绝原因
      cursor: 0,
      // 拒绝原因的输入字数
      disabled: false,
	  aaa:false,
	  personType:''
    };
  },

  components: {
    repairDetail
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------------------------报修详情------------------------');
    console.log('选中报修单号', options.repairCode);
	 const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
	 console.log(userInfoCach)
	 this.setData({
		 personType:userInfoCach.personType
	 })
    let obj = {};
    if (options.isRefuse === 'true') {
      obj.isRefuse = true;
      obj.name = '确认拒绝';
      obj.bind = 'confirmRefuse';
    } else {
      obj.isRefuse = false;
      obj.name = '确认处理';
      obj.bind = 'confirmDeal';
    }

    console.log('obj', obj.isRefuse != ''); // 当前时间

    let startTime = app.globalData.PublicUtil.formatTimeTwo(new Date(), 'Y-M-D');
    this.setData({
      date: startTime,
      startTime: startTime,
      repairCode: options.repairCode
    });
    this.selectRepairByCode(options.repairCode, obj);
  },
  
  methods: {
    /**
     * 查询报修详情
     */
    selectRepairByCode: function (repairCode, obj) {

      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.repairRequestUrl.selectRepairByCode + '?repairCode=' + repairCode,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('查询报修详情返回', res.data);

          if (res.data && res.data.code == 200) {
            let data = res.data.rows; // 处理显示数据
               if(data.repairStatus==4||data.repairStatus==5){
				   _this.setData({
					   aaa:true
				   })
			   }
            data = _this.dealShow(data, obj);

            _this.setData({
              pageObj: data
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
    dealShow: function (data, obj) {
      data.deviceName = Util.deviceType(data.deviceTypeId);
      data.statusName = Util.status(data.repairStatus);
      let status = data.repairStatus;
      let callObj = {};
      callObj.isCall = true;
      callObj.bindtap = 'toCall';
      let addObj = obj;

      if (status == 3) {
        obj.name = '确认完成';
        obj.bind = 'confirmFinish';
		console.log(obj)
      } else if (status == 4) {
        obj.isFinish = true;
      }

      this.setData({
        btnObj: obj
      });
	  		
	  console.log(this.btnObj.bind)
	  // console.log( this[btnObj.bind]())
      data.callObj = callObj;
      return data;
    },
	
    /**
     * 组件打电话事件
     */
    bindCallPhone: function (e) {
      let phone = e.detail.phone;
      this.callPhone(phone);
    },

    /**
     * 点击打电话
     */
    toCall: function (e) {
      let phone = e.currentTarget.dataset.phone;
      this.callPhone(phone);
    },
    callPhone: function (phone) {
      wx.showModal({
        title: '呼叫',
        content: '拨打' + phone,

        success(res) {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: phone //仅为示例，并非真实的电话号码

            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }

      });
    },
	
    bindDateChange: function (e) {
      this.setData({
        date: e.detail.value
      });
    },

    /**
     * 确认处理
     */
    confirmDeal: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

      if (_this.repairCode == '') {
        app.globalData.ShowMsgUtil.showErrorModal('请求失败', '该报修订单不存在！');

        _this.setData({
          disabled: false
        });

        return;
      }

      if (_this.date == '') {
        app.globalData.ShowMsgUtil.showErrorModal('请求失败', '约定维修时间不能为空！');

        _this.setData({
          disabled: false
        });

        return;
      }

      _this.setData({
        disabled: true
      });

      app.globalData.ShowMsgUtil.showLoadToast("正在处理...");
      wx.request({
        url: app.globalData.RequestUrl.repairRequestUrl.confirmDeal,
        data: {
          repairCode: _this.repairCode,
          maintainTime: _this.date
        },
        method: 'POST',
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        success: function (res) {
          console.log('确认处理返回', res.data);
          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessToast("确认处理成功", 2000);
            app.globalData.StorageUtil.set('tabBarIndex', 1);
            app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.index, 2000);
          } else {
            _this.setData({
              disabled: false
            });

            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
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
          wx.hideToast();
        }
      });
    },

    /**
     * 确认拒绝
     */
    confirmRefuse: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

      if (_this.inputReason == '') {
        app.globalData.ShowMsgUtil.showErrorModal('请求失败', '拒绝原因不能为空！');

        _this.setData({
          disabled: false
        });

        return;
      }

      _this.setData({
        disabled: true
      });

      app.globalData.ShowMsgUtil.showLoadToast("正在申请...");
      wx.request({
        url: app.globalData.RequestUrl.repairRequestUrl.confirmRefuse,
        data: {
          repairCode: _this.repairCode,
          repairRemarks: _this.inputReason
        },
        method: 'POST',
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        success: function (res) {
          console.log('确认拒绝返回', res.data);

          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessToast("确认拒绝成功", 2000);
            app.globalData.StorageUtil.set('tabBarIndex', 1);
            app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.repairPageUrl.index, 2000);
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
    inputReasonFun: function (e) {
      this.setData({
        cursor: e.detail.cursor,
        inputReason: e.detail.value
      });
    },

    /**
     * 
     */
    confirmFinish: function (e) {
		console.log(e)
      let repairCode = this.repairCode;
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.maintainFinishUrl + '?repairCode=' + repairCode, 500);
    },
	handleClick:function(){
		console.log(btnObj)
		console.log(this.$data.btnObj.bind)
		let btnObj=this.$data.btnObj.bind
		let confirmFinish='confirmFinish'
		let confirmRefuse='confirmRefuse'
		let confirmDeal='confirmDeal'
         if(btnObj==confirmFinish){
			 console.log(1111111)
			 this.confirmFinish()
		 }
		 if(btnObj==confirmRefuse){
			 this.confirmRefuse()
		 }
		 if(btnObj==confirmDeal){
			 this.confirmDeal()
		 }
	},
  },

};
</script>
<style>
@import "./repairDetailOfMaintain.css";
</style>