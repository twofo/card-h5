(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-indexModule-pages-inOrOutSchoolApply-inOrOutSchoolApply"],{"08d5":function(e,t,i){"use strict";var a=i("e0e5"),l=i.n(a);l.a},"0a55":function(e,t,i){"use strict";i.r(t);var a=i("b981"),l=i.n(a);for(var n in a)"default"!==n&&function(e){i.d(t,e,(function(){return a[e]}))}(n);t["default"]=l.a},"19d3":function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,"/* pages/indexModule//pages/inOrOutSchoolApply/inOrOutSchoolApply.wxss */.weui-cell__bdt[data-v-420a4e6f]{margin:0 %?40?%}.page__bd_spacing[data-v-420a4e6f]{margin-top:30px;padding-left:15px;padding-right:15px}.image-items[data-v-420a4e6f]{width:15px;height:20px;vertical-align:middle}.myui-cells-items[data-v-420a4e6f]{padding:0 %?20?%\r\n  /* border: 1px rebeccapurple solid; */}",""]),e.exports=t},"7c10":function(e,t,i){"use strict";var a;i.d(t,"b",(function(){return l})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){return a}));var l=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"page"},[i("v-uni-view",{staticClass:"page__bd",staticStyle:{padding:"15rpx 10rpx"}},[i("v-uni-view",{staticClass:"weui-cells weui-cells_after-title myui-cells-items"},[i("v-uni-view",{staticClass:"weui-cell "},[i("v-uni-view",{staticClass:"weui-cell__bd",staticStyle:{color:"#20a4f7"}},[e._v("基本信息")])],1)],1),i("v-uni-view",{staticClass:"weui-cells weui-cells_after-title myui-cells-items",staticStyle:{"margin-top":"6px"}},[i("v-uni-view",{staticClass:"weui-cell"},[i("v-uni-view",{staticClass:"weui-cell__hd"},[e._v("姓名")]),i("v-uni-view",{staticClass:"weui-cell__bd weui-cell__bdt"},[e._v(e._s(e.userInfo.name))])],1),i("v-uni-view",{staticClass:"weui-cell"},[i("v-uni-view",{staticClass:"weui-cell__hd "},[e._v("学号")]),i("v-uni-view",{staticClass:"weui-cell__bd weui-cell__bdt"},[e._v(e._s(e.userInfo.username))])],1),i("v-uni-view",{staticClass:"weui-cell"},[i("v-uni-view",{staticClass:"weui-cell__hd"},[e._v("手机号")]),i("v-uni-view",{staticClass:"weui-cell__bd weui-cell__bdt",staticStyle:{color:"#20a4f7"}},[e._v(e._s(e.userInfo.mobile))])],1)],1),i("v-uni-view",{staticClass:"weui-cells weui-cells_after-title myui-cells-items",staticStyle:{"margin-top":"10px"}},[i("v-uni-view",{staticClass:"weui-cell "},[i("v-uni-view",{staticClass:"weui-cell__bd",staticStyle:{color:"#20a4f7"}},[e._v("申请信息")])],1)],1),i("v-uni-view",{staticClass:"weui-cells weui-cells_after-title myui-cells-items",staticStyle:{"margin-top":"6px"}},[i("v-uni-view",{staticClass:"weui-cell "},[i("v-uni-view",{staticClass:"weui-cell__hd"},[e._v("申请类型")]),1==e.applyType?i("v-uni-view",{staticClass:"weui-cell__bd weui-cell__bdt"},[e._v("留校申请")]):e._e(),2==e.applyType?i("v-uni-view",{staticClass:"weui-cell__bd weui-cell__bdt"},[e._v("外宿申请")]):e._e()],1),i("v-uni-view",{staticClass:"weui-cell weui-cell_input"},[i("v-uni-view",{staticClass:"weui-cell__hd"},[i("v-uni-view",{staticClass:"weui-label"},[e._v("开始时间")])],1),i("v-uni-view",{staticClass:"weui-cell__bd"},[i("v-uni-picker",{attrs:{mode:"date",value:e.startTime,start:"2018-01-01",end:"2030-01-01"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindStartTimeDateChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"weui-input"},[e._v(e._s(e.startTime))])],1)],1),i("v-uni-view",{staticClass:"weui-cell__ft weui-cell__ft_in-access"})],1),i("v-uni-view",{staticClass:"weui-cell weui-cell_input weui-cell_access"},[i("v-uni-view",{staticClass:"weui-cell__hd"},[i("v-uni-view",{staticClass:"weui-label"},[e._v("结束时间")])],1),i("v-uni-view",{staticClass:"weui-cell__bd"},[i("v-uni-picker",{attrs:{mode:"date",value:e.endTime,start:"2018-01-01",end:"2030-01-01"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindEndTimeDateChange.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"weui-input"},[e._v(e._s(e.endTime))])],1)],1),i("v-uni-view",{staticClass:"weui-cell__ft weui-cell__ft_in-access"})],1),i("v-uni-view",{staticClass:"weui-cell"},[i("v-uni-view",{staticClass:"weui-cell__bd"},[i("v-uni-textarea",{staticClass:"weui-textarea",staticStyle:{height:"3.3em"},attrs:{placeholder:"请输入申请原因...",maxlength:200},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.bindInputReason.apply(void 0,arguments)}}})],1)],1),i("v-uni-view",{staticClass:"weui-cell weui-cell_input"},[i("v-uni-view",{staticClass:"weui-cell__hd"},[1==e.applyType?i("v-uni-view",{staticClass:"weui-label"},[e._v("家庭地址")]):e._e(),2==e.applyType?i("v-uni-view",{staticClass:"weui-label"},[e._v("外宿地址")]):e._e()],1),i("v-uni-view",{staticClass:"weui-cell__bd"},[i("v-uni-input",{staticClass:"weui-input",attrs:{placeholder:"请输入...."},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.bindInputAddress.apply(void 0,arguments)}}})],1)],1),i("v-uni-view",{staticClass:"weui-cell weui-cell_input"},[i("v-uni-view",{staticClass:"weui-cell__hd"},[1==e.applyType?i("v-uni-view",{staticClass:"weui-label"},[e._v("父/母电话")]):e._e(),2==e.applyType?i("v-uni-view",{staticClass:"weui-label"},[e._v("房东电话")]):e._e()],1),i("v-uni-view",{staticClass:"weui-cell__bd"},[i("v-uni-input",{staticClass:"weui-input",attrs:{placeholder:"请输入...."},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.bindInputMobile.apply(void 0,arguments)}}})],1)],1)],1),i("v-uni-view",{staticClass:"page__bd page__bd_spacing button_top"},[i("v-uni-button",{staticClass:"weui-btn",attrs:{type:"primary",disabled:e.disableBtn,"form-type":"submit"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.confirmApply.apply(void 0,arguments)}}},[e._v("提交")])],1)],1)],1)},n=[]},8707:function(e,t){var i="/static/pages/indexModule/resources/pic",a={image:i,wx:"".concat(i,"/wx.png"),cardBg:"".concat(i,"/card-bg.png"),bankCard:"".concat(i,"/bankCard.png"),paymentCode:"".concat(i,"/paymentCode.png"),payroll:"".concat(i,"/payroll.png"),integral:"".concat(i,"/integral.png"),bandCardPic:"".concat(i,"/card-pic.jpg"),deviceOnLine:"".concat(i,"/device_on-line.png"),deviceOffLine:"".concat(i,"/device_off-line.png"),redLine:"".concat(i,"/red-line.png"),blueLine:"".concat(i,"/blue-line.png"),switchOpen:"".concat(i,"/switch_open.png"),switchClose:"".concat(i,"/switch_close.png"),paycode:"".concat(i,"/paycode.png"),switchForbit:"".concat(i,"/switch_forbit.png"),emmterOneWayOff:"".concat(i,"/emmter_one_way_off.png"),emmterOneWayOn:"".concat(i,"/emmter_one_way_on.png"),errIconImg:"".concat(i,"/errorNotice.png"),eleWalletImg:"".concat(i,"/ele-wallet.png"),eleWalletLImg:"".concat(i,"/ele-wallet-l.png"),eleWalletIKmg:"".concat(i,"/ele-wallet-2.png"),waterWalletImg:"".concat(i,"/water-wallet.png"),zywaterImg:"".concat(i,"/zy-water.png"),hotWaterImg:"".concat(i,"/hostwater.png"),yueWalletImg:"".concat(i,"/yue-wallet.png"),returnWalletImg:"".concat(i,"/return-wallet.png"),recordWalletImg:"".concat(i,"/record-wallet.png"),resultSuccessImg:"".concat(i,"/successPay.png"),resultFailPayImg:"".concat(i,"/failPay.png")};e.exports=a},"9fb2":function(e,t,i){"use strict";i.r(t);var a=i("7c10"),l=i("0a55");for(var n in l)"default"!==n&&function(e){i.d(t,e,(function(){return l[e]}))}(n);i("08d5");var s,c=i("f0c5"),u=Object(c["a"])(l["default"],a["b"],a["c"],!1,null,"420a4e6f",null,!1,a["a"],s);t["default"]=u.exports},b981:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=getApp(),l=i("8707"),n={data:function(){return{startTime:"",endTime:"",reason:"",applyType:"",imageObj:l,disableBtn:!1,userInfo:""}},components:{},props:{},onLoad:function(e){e&&e.applyType&&(wx.setNavigationBarTitle({title:1==e.applyType?"宿舍服务_留校申请":"宿舍服务_外宿申请"}),this.setData({applyType:e.applyType}))},onShow:function(){var e=a.globalData.StorageUtil.get("userInfoCach");this.setData({userInfo:e})},onUnload:function(){},methods:{bindStartTimeDateChange:function(e){this.setData({startTime:e.detail.value})},bindEndTimeDateChange:function(e){this.setData({endTime:e.detail.value})},bindInputReason:function(e){this.reason=e.detail.value},bindInputAddress:function(e){this.address=e.detail.value},bindInputMobile:function(e){this.mobile=e.detail.value},confirmApply:function(){var e=this;a.globalData.ShowMsgUtil.netErrNotice();var t=a.globalData.StorageUtil.get("userInfoCach");wx.request({url:a.globalData.RequestUrl.baseRequestUrl.inOrOutSchoolApply,method:"POST",header:{token:t.token},data:{applyType:this.applyType,applyUserId:t.userId,applyReason:this.reason,applyStartTime:new Date(this.startTime).getTime(),applyEndTime:new Date(this.endTime).getTime(),address:this.address,phone:this.mobile},success:function(t){if(wx.hideToast({}),console.log("留校、外宿申请返回",t.data),!t.data||200!=t.data.code)return a.globalData.ShowMsgUtil.showErrorModal("请求失败",t.data.msg,t.data.code),void e.setData({disableBtn:!1});a.globalData.ShowMsgUtil.showSuccessToast("申请成功",2e3),a.globalData.PublicUtil.navigateByUrl(a.globalData.PageUrl.indexPageUrl.inOrOutSchoolListUrl,2e3)},fail:function(){a.globalData.ShowMsgUtil.showNoneToastByFail(),e.setData({disableBtn:!1})}})}}};t.default=n},e0e5:function(e,t,i){var a=i("19d3");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var l=i("4f06").default;l("1e329624",a,!0,{sourceMap:!1,shadowMode:!1})}}]);