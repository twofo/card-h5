(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mineModule-pages-help-help"],{1598:function(t,a,e){"use strict";var o=e("9560"),s=e.n(o);s.a},6868:function(t,a,e){"use strict";var o=e("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var s=o(e("f0a3")),i=getApp(),l={data:function(){return{helpList:[],ifIssue:!1,src:""}},components:{helpList:s.default},props:{},onLoad:function(){var t=this;console.log("------------------------帮助------------------------");var a=i.globalData.StorageUtil.get("userInfoCach"),e=i.globalData.StorageUtil.getOfExpire("helpCach");e?(wx.hideToast(),t.setData({helpList:e})):t.helpListData(a),t.setData({src:i.globalData.PageUrl.minePageUrl.helpIssue})},methods:{helpListData:function(t){i.globalData.ShowMsgUtil.netErrNotice(),i.globalData.ShowMsgUtil.showLoadAndMsgToast();var a=this;wx.request({url:i.globalData.RequestUrl.baseRequestUrl.helpList,header:{token:t.token},method:"GET",success:function(t){console.log("帮助列表数据返回",t.data);var e=t.data.rows;t.data&&"200"==t.data.code?(0==e.length&&a.setData({ifIssue:!0}),e&&(i.globalData.StorageUtil.setOfExpire("helpCach",e,720),a.setData({helpList:e}))):i.globalData.ShowMsgUtil.showErrorModal("请求失败",t.data.msg,t.data.code)},fail:function(){i.globalData.ShowMsgUtil.showNoneToastByFail()},complete:function(){wx.hideToast()}})}}};a.default=l},"8dfa":function(t,a,e){var o=e("24fb");a=o(!1),a.push([t.i,"",""]),t.exports=a},"8f00":function(t,a,e){"use strict";e.r(a);var o=e("cc63"),s=e("f939");for(var i in s)"default"!==i&&function(t){e.d(a,t,(function(){return s[t]}))}(i);e("1598");var l,n=e("f0c5"),r=Object(n["a"])(s["default"],o["b"],o["c"],!1,null,"c76f0e1a",null,!1,o["a"],l);a["default"]=r.exports},9560:function(t,a,e){var o=e("8dfa");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var s=e("4f06").default;s("788aee86",o,!0,{sourceMap:!1,shadowMode:!1})},cc63:function(t,a,e){"use strict";var o;e.d(a,"b",(function(){return s})),e.d(a,"c",(function(){return i})),e.d(a,"a",(function(){return o}));var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"page page_view"},[t.ifIssue?[e("v-uni-view",{staticClass:"weui-loadmore weui-loadmore_line"},[e("v-uni-view",{staticClass:"weui-loadmore__tips weui-loadmore__tips_in-line"},[t._v("暂无数据")])],1)]:t._e(),e("help-list",{attrs:{helpList:t.helpList,src:t.src}})],2)},i=[]},f939:function(t,a,e){"use strict";e.r(a);var o=e("6868"),s=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(a,t,(function(){return o[t]}))}(i);a["default"]=s.a}}]);