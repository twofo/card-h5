(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-repairModule-pages-repairDetail-repairDetail"],{"0f79":function(e,a,i){var t=i("24fb");a=t(!1),a.push([e.i,".myui__box[data-v-93d97f38]{padding:%?10?% %?20?%}.myui-bd__ft[data-v-93d97f38]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}.myui-cell-image[data-v-93d97f38]{width:%?50?%;height:%?50?%}\r\n/* 图片 */.text-date[data-v-93d97f38]{padding:%?20?% %?30?% %?10?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background:#fff}.img[data-v-93d97f38]{width:%?120?%}.nomore[data-v-93d97f38]{margin:%?30?% auto 0;text-align:center}",""]),e.exports=a},"205f":function(e,a,i){"use strict";i.r(a);var t=i("7dff"),n=i.n(t);for(var c in t)"default"!==c&&function(e){i.d(a,e,(function(){return t[e]}))}(c);a["default"]=n.a},"493e":function(e,a,i){"use strict";var t;i.d(a,"b",(function(){return n})),i.d(a,"c",(function(){return c})),i.d(a,"a",(function(){return t}));var n=function(){var e=this,a=e.$createElement,i=e._self._c||a;return i("v-uni-view",{staticClass:"page"},[i("v-uni-view",{staticClass:"page__bd"},["{}"==JSON.stringify(e.pageObj)?i("v-uni-view",[i("v-uni-view",{staticClass:"weui-cells__box nomore"},[e._v("暂无数据")])],1):i("v-uni-view",{staticClass:"weui__bd myui__box"},[4==e.pageObj.repairStatus||5==e.pageObj.repairStatus||2==e.pageObj.repairStatus&&2==e.pageObj.isAssignUser?i("v-uni-view",{staticClass:"weui-cells",staticStyle:{"font-size":"15px"}},[i("v-uni-view",{staticClass:"weui-cell"},[2==e.pageObj.isAssignUser?i("v-uni-view",{staticClass:"weui-cell__bd"},[e._v("维修部门： "+e._s(e.pageObj.userNameOfMaintainer))]):i("v-uni-view",{staticClass:"weui-cell__bd"},[e._v("维修人： "+e._s(e.pageObj.userNameOfMaintainer))])],1),1==e.pageObj.isAssignUser?i("v-uni-view",{staticClass:"weui-cell myui-bd__ft"},[i("v-uni-view",{staticClass:"weui-cell__bd"},[e._v("手机号： "+e._s(e.pageObj.phoneOfMaintainer))]),e.pageObj.callObj.isCall?i("v-uni-view",{staticClass:"myui-cell__bd",on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.tapClick(e.pageObj.callObj.bindtap,{phone:e.pageObj.repairApplyPhone})}}},[i("v-uni-image",{staticClass:"myui-cell-image",attrs:{src:e.callImage}})],1):e._e()],1):e._e(),1==e.pageObj.isAssignUser?i("v-uni-view",{staticClass:"weui-cell"},[i("v-uni-view",{staticClass:"weui-cell__bd"},[e._v("维修描述："),i("v-uni-textarea",{staticStyle:{width:"100%",height:"3.0em"},attrs:{value:e.pageObj.repairRemarksOfMaintainer}})],1)],1):e._e()],1):e._e(),3==e.pageObj.repairStatus?i("v-uni-view",{staticClass:"weui-cells",staticStyle:{"font-size":"15px"}},[i("v-uni-view",{staticClass:"weui-cell"},[i("v-uni-view",{staticClass:"weui-cell__bd"},[e._v("维修人： "+e._s(e.pageObj.userNameOfMaintainer))])],1),i("v-uni-view",{staticClass:"weui-cell myui-bd__ft"},[i("v-uni-view",{staticClass:"weui-cell__bd"},[e._v("手机号： "+e._s(e.pageObj.phoneOfMaintainer))]),e.pageObj.callObj.isCall?i("v-uni-view",{staticClass:"myui-cell__bd",on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.tapClick(e.pageObj.callObj.bindtap,{phone:e.pageObj.repairApplyPhone})}}},[i("v-uni-image",{staticClass:"myui-cell-image",attrs:{src:e.callImage}})],1):e._e()],1)],1):e._e(),i("repair-detail",{attrs:{pageObj:e.pageObj,callImage:e.callImage},on:{call:function(a){arguments[0]=a=e.$handleEvent(a),e.bindCallPhone.apply(void 0,arguments)}}})],1)],1)],1)},c=[]},"498f":function(e,a,i){var t=i("0f79");"string"===typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);var n=i("4f06").default;n("67e4c51a",t,!0,{sourceMap:!1,shadowMode:!1})},"7dff":function(e,a,i){"use strict";var t=i("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=t(i("3fb6")),c=getApp(),r=i("ddc5"),s=i("c2d6"),l={data:function(){return{pageObj:{},callImage:s.icCall}},components:{repairDetail:n.default},props:{},onLoad:function(e){console.log("------------------------报修详情------------------------"),console.log("选中报修单号",e.repairCode),this.selectRepairByCode(e.repairCode)},methods:{tapClick:function(e,a){this[e](a)},selectRepairByCode:function(e){var a=this;c.globalData.ShowMsgUtil.netErrNotice(),c.globalData.ShowMsgUtil.showLoadAndMsgToast("加载中");var i=c.globalData.StorageUtil.get("userInfoCach");wx.request({url:c.globalData.RequestUrl.repairRequestUrl.selectRepairByCode+"?repairCode="+e,method:"GET",header:{token:i.token},success:function(e){if(console.log("查询报修详情返回",e.data),e.data&&200==e.data.code){var i=e.data.rows;i=a.dealShow(i),console.log(i),a.setData({pageObj:i})}else c.globalData.ShowMsgUtil.showErrorModal("请求失败",e.data.msg,e.data.code)},fail:function(){c.globalData.ShowMsgUtil.showNoneToastByFail()},complete:function(){wx.hideToast()}})},dealShow:function(e){e.deviceName=r.deviceType(e.deviceTypeId),e.statusName=r.status(e.repairStatus);var a=e.repairStatus,i={},t={};return 1==a?(i.name="分配师傅",i.bindtap="toDistribute"):3==a||4==a||5==a?(t.isCall=!0,t.bindtap="toCall"):6==a&&(i.name="重新分配",i.bindtap="toDistribute"),e.btnObj=i,e.callObj=t,e},bindCallPhone:function(e){var a=e.detail.phone;this.callPhone(a)},toCall:function(e){var a=e.phone;this.callPhone(a)},callPhone:function(e){wx.showModal({title:"呼叫",content:"拨打"+e,success:function(a){a.confirm?wx.makePhoneCall({phoneNumber:e}):a.cancel&&console.log("用户点击取消")}})}}};a.default=l},b4a7:function(e,a,i){"use strict";var t=i("498f"),n=i.n(t);n.a},c2d6:function(e,a){var i="/static/pages/repairModule/resources/pic",t={image:i,repairApplyPic:"".concat(i,"/repair_apply.png"),myRepairPic:"".concat(i,"/repair_my.png"),starOn:"".concat(i,"/star_on.png"),starOff:"".concat(i,"/star_off.png"),icCall:"".concat(i,"/ic_call.png"),icProcessBlue:"".concat(i,"/ic_process_blue.png"),icProcessGray:"".concat(i,"/ic_process_gray.png"),navHomePage:"".concat(i,"/nav_home_page.png"),navHomePagePressed:"".concat(i,"/nav_home_page_pressed.png"),navMine:"".concat(i,"/nav_mine.png"),navMinePressed:"".concat(i,"/nav_mine_pressed.png"),navWorkerOrder:"".concat(i,"/nav_worker_order.png"),navWorkerOrderPressed:"".concat(i,"/nav_worker_order_pressed.png"),navNew:"".concat(i,"/nav_new.png"),navNewPressed:"".concat(i,"/nav_new_pressed.png"),bgRepairHeader:"".concat(i,"/bg_repair_header.png"),mineFunRecord:"".concat(i,"/mine_fun_record.png"),icStars:"".concat(i,"/ic_stars.png"),icTypeOther:"".concat(i,"/ic_type_other.png"),icRepairLock:"".concat(i,"/ic_repair_lock.png"),icRepairAmmeter:"".concat(i,"/ic_repair_ammeter.png"),icRepairWatermeter:"".concat(i,"/ic_repair_watermeter.png"),icRepairLamp:"".concat(i,"/ic_repair_lamp.png"),icClose:"".concat(i,"/close.png")};e.exports=t},dc94:function(e,a,i){"use strict";i.r(a);var t=i("493e"),n=i("205f");for(var c in n)"default"!==c&&function(e){i.d(a,e,(function(){return n[e]}))}(c);i("b4a7");var r,s=i("f0c5"),l=Object(s["a"])(n["default"],t["b"],t["c"],!1,null,"93d97f38",null,!1,t["a"],r);a["default"]=l.exports},ddc5:function(e,a){getApp().globalData;function i(e){var a="";return 0==e?a="其它":1==e?a="门锁":2==e?a="水表":3==e?a="消费机":4==e?a="电表":5==e&&(a="空调电表"),a}function t(e){var a="";return 1==e?a="待分配":2==e?a="待接单":3==e?a="处理中":4==e?a="已完成":5==e?a="已评价":6==e&&(a="已拒绝"),a}e.exports={status:t,deviceType:i}}}]);