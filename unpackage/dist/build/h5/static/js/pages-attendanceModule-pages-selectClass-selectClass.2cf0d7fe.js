(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-attendanceModule-pages-selectClass-selectClass"],{3443:function(e,t,a){"use strict";var o=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=o(a("e8d7")),n=getApp(),s={data:function(){return{checkboxItems:[],checkAll:{name:"全选",value:"00",checked:!1}}},components:{selectRecevice:l.default},props:{},onLoad:function(e){console.log("------------------------选择班级------------------------");var t=n.globalData.StorageUtil.get("userInfoCach");1==e.type?this.selectPersonnel(t,e.parentId):this.getAttendOrg(t,e.parentId)},onShow:function(){},methods:{getAttendOrg:function(e,t){n.globalData.ShowMsgUtil.netErrNotice(),n.globalData.ShowMsgUtil.showLoadAndMsgToast();var a=this;wx.request({url:n.globalData.RequestUrl.attendanceRequestUrl.getAttendOrg+"?type=3&teacherId="+e.personId+"&id="+t,method:"GET",header:{token:e.token},success:function(e){if(console.log("获取考勤组织",e.data),e.data&&200==e.data.code){for(var t=0;t<e.data.rows.length;++t){e.data.rows[t].value=t,e.data.rows[t].enable=!0;var o=n.globalData.StorageUtil.get("classCach");e.data.rows[t]=a.dealSelectPerson(o,e.data.rows[t])}a.setData({checkboxItems:e.data.rows})}else n.globalData.ShowMsgUtil.showErrorModal("请求失败",e.data.msg,e.data.code)},fail:function(){n.globalData.ShowMsgUtil.showNoneToastByFail()},complete:function(){wx.hideToast()}})},selectPersonnel:function(e,t){n.globalData.ShowMsgUtil.showLoadAndMsgToast();var a=this;wx.request({url:n.globalData.RequestUrl.appointmentRequestUrl.selectPersonnel+"?selectType=3&parentId="+t,method:"GET",header:{token:e.token},success:function(e){if(console.log('人员选择（学生）"',e.data),e.data&&200==e.data.code){for(var t=0;t<e.data.rows.length;++t){e.data.rows[t].value=t,e.data.rows[t].enable=!0;var o=n.globalData.StorageUtil.get("departmentCach");e.data.rows[t]=a.dealSelectPerson(o,e.data.rows[t])}a.setData({checkboxItems:e.data.rows})}else n.globalData.ShowMsgUtil.showErrorModal("请求失败",e.data.msg,e.data.code)},fail:function(){n.globalData.ShowMsgUtil.showNoneToastByFail()},complete:function(){wx.hideToast()}})},dealSelectPerson:function(e,t){for(var a=0;a<e.length;++a)e[a].isDetail?t.id==e[a].childId&&(t.checked=!0,t.enable=!1):t.value==e[a].value&&(t.checked=!0,t.enable=!1);return t},onMyEvent:function(e){var t=e.detail.valueType,a=e.detail.parentId,o=e.detail.checkboxItems;o&&(console.log("选中的班级----",o),n.globalData.StorageUtil.set("classCach",o)),1==t?n.globalData.PublicUtil.navigateByUrl(n.globalData.PageUrl.attendancePageUrl.selectStudentUrl+"?parentId="+a,500):2==t&&wx.navigateBack({delta:3})}}};t.default=s},"41e4":function(e,t,a){"use strict";a.r(t);var o=a("eb0d"),l=a("f573");for(var n in l)"default"!==n&&function(e){a.d(t,e,(function(){return l[e]}))}(n);var s,r=a("f0c5"),c=Object(r["a"])(l["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);t["default"]=c.exports},eb0d:function(e,t,a){"use strict";var o;a.d(t,"b",(function(){return l})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return o}));var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"page",attrs:{"xmlns:wx":"http://www.w3.org/1999/xhtml"}},[a("v-uni-view",{staticClass:"page__bd"},[a("select-recevice",{attrs:{disableds:e.disableds,checkboxItems:e.checkboxItems,checkAll:e.checkAll},on:{myevent:function(t){arguments[0]=t=e.$handleEvent(t),e.onMyEvent.apply(void 0,arguments)}}})],1)],1)},n=[]},f573:function(e,t,a){"use strict";a.r(t);var o=a("3443"),l=a.n(o);for(var n in o)"default"!==n&&function(e){a.d(t,e,(function(){return o[e]}))}(n);t["default"]=l.a}}]);