<template>
<view class="page">
  <view class="page__bd">

    <!-- 报修详情 -->
    <view v-if="timeNodes.length==0">
      <view class="weui-cells__box">暂无数据</view>
    </view>
    <view v-else class="weui__bd myui__box">
      <!-- 详情展示 -->
      <repair-detail :pageObj="pageObj"></repair-detail>
      <!-- 时间节点 -->
      <time-nodes :list="timeNodes" @call="bindCallPhone"></time-nodes>

    </view>

  </view>
</view>
</template>

<script>
var app = getApp();
var Util = require("../../resources/utils/utils.js");
var ImageUrl = require("../../resources/utils/imageUrl.js");
import repairDetail from "../../../../components/repairModule/repairDetail/repairDetail";
import timeNodes from "../../resources/components/timeNodes/timeNodes";

export default {
  data() {
    return {
      pageObj: {
				btnObj:{
					name:""
				}
			},
      timeNodes: []
    };
  },

  components: {
    repairDetail,
    timeNodes
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------------------------报修详情------------------------');
    console.log('选中报修单号', options.repairCode);
    this.selectRepairByCode(options.repairCode);
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  methods: {
    /**
     * 查询报修详情
     */
    selectRepairByCode: function (repairCode) {
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
            let data = res.data.rows;
			console.log(data)
            data.deviceName = Util.deviceType(data.deviceTypeId);
            data.statusName = Util.status(data.repairStatus); // 处理时间节点组件显示数据

            _this.dealTimeNodes(data);	
			console.log(data)
            _this.setData({
              pageObj: data
            });
	   console.log(_this.pageObj)
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
     * 处理时间节点组件显示数据
     */
    dealTimeNodes: function (data) {
      let array = [];
      let status = data.repairStatus;
      let timeObj = data.successTime;
      let obj = {}; // 待处理对象
      // let obj2 = {};  // 处理中对象
       console.log(status)
      obj.imgUrl = ImageUrl.icProcessBlue;
      obj.statusName = '待处理';
      obj.msg = '';
      obj.time = data.timeOfRepairApply;
      obj.btnObj = '';
      obj.userNameOfMaintainer = data.userNameOfMaintainer;
      obj.phoneOfMaintainer = data.phoneOfMaintainer;
      obj.repairCode = data.repairCode;
      array[0] = obj;

      if (status == 3 || status == 4 || status == 5) {
        // 处理中
        array[0].imgUrl = ImageUrl.icProcessGray;
        array[0].btnObj = '';
        obj = {};
        obj.imgUrl = ImageUrl.icProcessBlue;
        obj.statusName = '处理中';
        let name = data.userNameOfMaintainer == null ?  data.userNameOfMaintainer : '师傅' ;
        obj.msg = name + '已经开始处理啦，预计' + data.toMaintainTime + '上门维修，请耐心等候 ~ ';
        obj.time = data.timeOfProcess;
        let btnObj = {};
        btnObj.name = '联系Ta';
        btnObj.bindtap = 'toCall';
        obj.btnObj = btnObj;
        obj.userNameOfMaintainer = data.userNameOfMaintainer;
        obj.phoneOfMaintainer = data.phoneOfMaintainer;
        obj.repairCode = data.repairCode;
        array[1] = array[0];
        array[0] = obj;
		console.log('obj',obj)
      }

      if (status == 4 || status == 5) {
        // 已完成
        array[0].imgUrl = ImageUrl.icProcessGray;
        array[0].btnObj = '';
        let obj = {};
        obj.imgUrl = ImageUrl.icProcessBlue;
        obj.statusName = data.statusName;
        let name = data.userNameOfMaintainer == null ? '师傅' : data.userNameOfMaintainer;
        obj.msg = name + '已经完成工单啦，请对本次维修服务作出评价';
        obj.time = data.timeOfSuccess;
        let btnObj = {};
        btnObj.name = '去评价';
        btnObj.bindtap = 'toComment';
        obj.btnObj = btnObj;
        obj.userNameOfMaintainer = data.userNameOfMaintainer;
        obj.phoneOfMaintainer = data.phoneOfMaintainer;
        obj.repairCode = data.repairCode;
	   console.log(obj)
        if (status == 5) {
		   btnObj.statc=1
           btnObj.name = '';
          obj.msg = '已经对本次维修服务作出评价';
        }

        array[2] = array[1];
        array[1] = array[0];
        array[0] = obj;
		console.log(obj)
      }
	console.log('维修单详情',array)
      this.setData({
        timeNodes: array
      });
	  console.log(this.timeNodes)
    },

    /**
     * 组件打电话事件
     */
    bindCallPhone: function (e) {
      let phone = e.detail.phone;
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
    }
  }
};
</script>
<style>
@import "./studentRepairDetail.css";
</style>