(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-attendanceModule-pages-selectPersonnel-selectPersonnel"],{"0491":function(e,a,t){"use strict";t.r(a);var o=t("49ac"),l=t.n(o);for(var n in o)"default"!==n&&function(e){t.d(a,e,(function(){return o[e]}))}(n);a["default"]=l.a},"0ec9":function(e,a,t){var o=t("4b39");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var l=t("4f06").default;l("ff8c8a32",o,!0,{sourceMap:!1,shadowMode:!1})},"37a9":function(e,a,t){"use strict";t.r(a);var o=t("9fd3"),l=t("0491");for(var n in l)"default"!==n&&function(e){t.d(a,e,(function(){return l[e]}))}(n);t("d8f1");var s,r=t("f0c5"),c=Object(r["a"])(l["default"],o["b"],o["c"],!1,null,"1174a1de",null,!1,o["a"],s);a["default"]=c.exports},"49ac":function(e,a,t){"use strict";var o=t("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=o(t("e8d7")),n=o(t("fa13")),s=getApp(),r={data:function(){return{checkboxItems:[],checkAll:{name:"全选",value:"00",checked:!1},disableds:!0}},components:{selectRecevice:l.default,searchInp:n.default},props:{},onLoad:function(){console.log("------------------------选择组织------------------------");var e=s.globalData.StorageUtil.get("userInfoCach");this.getAttendOrg(e,1)},methods:{singleChecked:function(e){console.log(e),this.setData({disableds:!1})},getAttendOrg:function(e,a,t){s.globalData.ShowMsgUtil.netErrNotice(),s.globalData.ShowMsgUtil.showLoadAndMsgToast();var o=this;wx.request({url:s.globalData.RequestUrl.attendanceRequestUrl.getAttendOrg+"?type="+a+"&teacherId="+e.personId,method:"GET",header:{token:e.token},success:function(e){if(console.log("获取考勤组织",e.data),e.data&&200==e.data.code){for(var a=0;a<e.data.rows.length;++a){var t=e.data.rows[a].id+e.data.rows[a].level;e.data.rows[a].value=String(t),e.data.rows[a].selectRole=e.data.rows[a].level,e.data.rows[a].enable=e.data.rows[a].enable,e.data.rows[a].checked=e.data.rows[a].checked;var l=s.globalData.StorageUtil.get("departmentCach");e.data.rows[a]=o.dealSelectPerson(l,e.data.rows[a])}o.setData({checkboxItems:e.data.rows}),console.log("发送到组件",e.data.rows)}else s.globalData.ShowMsgUtil.showErrorModal("请求失败",e.data.msg,e.data.code)},fail:function(){s.globalData.ShowMsgUtil.showNoneToastByFail()},complete:function(){wx.hideToast()}})},dealSelectPerson:function(e,a){for(var t=0;t<e.length;++t)e[t].isDetail?a.id==e[t].childId&&(a.checked=!0,a.enable=!1):a.value==e[t].value&&(a.checked=!0,a.enable=!1);return a},onMyEvent:function(e){s.globalData.StorageUtil.get("userInfoCach");var a=e.detail.valueType,t=e.detail.parentId,o=e.detail.checkboxItems;o&&(console.log("选中的院系----",o),s.globalData.StorageUtil.set("departmentCach",o)),1==a?s.globalData.PublicUtil.navigateByUrl(s.globalData.PageUrl.attendancePageUrl.selectMajorlUrl+"?parentId="+t,500):uni.navigateBack({delta:1})},seachSch:function(e){console.log(e);e.detail.value;var a=this,t=s.globalData.StorageUtil.get("userInfoCach"),o=s.globalData.RequestUrl.attendanceRequestUrl.getAttendOrg+"?type=1&teacherId="+t.personId;wx.request({url:o,method:"GET",header:{token:t.token},success:function(e){if(console.log("获取考勤组织",e.data),e.data&&200==e.data.code){for(var t=0;t<e.data.rows.length;++t){e.data.rows[t].value=t,e.data.rows[t].enable=!0;var o=s.globalData.StorageUtil.get("departmentCach");e.data.rows[t]=a.dealSelectPerson(o,e.data.rows[t])}a.setData({checkboxItems:e.data.rows}),console.log("发送到组件",e.data.rows)}else s.globalData.ShowMsgUtil.showErrorModal("请求失败",e.data.msg,e.data.code)},fail:function(){s.globalData.ShowMsgUtil.showNoneToastByFail()}})},mysearchValLen:function(e){var a=e.detail.valLength;0==a&&this.selectPersonnel("")}}};a.default=r},"4b39":function(e,a,t){var o=t("24fb");a=o(!1),a.push([e.i,".searchBox[data-v-1174a1de]{padding:0 %?20?%;box-sizing:border-box;background:#fff}",""]),e.exports=a},"9fd3":function(e,a,t){"use strict";var o;t.d(a,"b",(function(){return l})),t.d(a,"c",(function(){return n})),t.d(a,"a",(function(){return o}));var l=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("v-uni-view",{staticClass:"page"},[t("v-uni-view",{staticClass:"page__bd"},[t("select-recevice",{attrs:{disableds:e.disableds,checkboxItems:e.checkboxItems,checkAll:e.checkAll},on:{singleChecked:function(a){arguments[0]=a=e.$handleEvent(a),e.singleChecked.apply(void 0,arguments)},myevent:function(a){arguments[0]=a=e.$handleEvent(a),e.onMyEvent.apply(void 0,arguments)}}})],1)],1)},n=[]},d8f1:function(e,a,t){"use strict";var o=t("0ec9"),l=t.n(o);l.a}}]);