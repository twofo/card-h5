(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-authModule-pages-bindPhone-bindPhone"],{"1e3b":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'.title[data-v-66c2c349]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;width:100%;height:20%;margin-left:%?30?%;margin-top:%?30?%;font-size:15pt}.pub[data-v-66c2c349]{margin-top:%?20?%}#title-1[data-v-66c2c349]{font-size:17pt}#title-2[data-v-66c2c349]{font-size:10pt;line-height:%?85?%;height:%?85?%;color:rgba(70,52,52,.64)}.content[data-v-66c2c349]{margin-top:%?10?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}uni-form[data-v-66c2c349]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:stretch;-webkit-align-items:stretch;align-items:stretch;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.input-group[data-v-66c2c349]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:%?25?% %?10?%;margin:%?20?% 3%;background:#fff;border-radius:5px;-webkit-transition:all .25s ease-in-out;transition:all .25s ease-in-out}.input-label[data-v-66c2c349]{color:#888;font-size:13pt;height:%?25?%;line-height:%?25?%;padding:0 %?25?%}.input-group uni-input[data-v-66c2c349],\r\n.input-group uni-picker[data-v-66c2c349]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:13pt;min-height:%?52?%;height:%?52?%;line-height:%?52?%;padding:0 %?25?%}.input-placeholder[data-v-66c2c349],\r\n.input-group uni-picker.placeholder[data-v-66c2c349]{color:#ccc}.input-label-send[data-v-66c2c349]{color:#20a4f7;margin-right:%?10?%}.confirm-btn[data-v-66c2c349]{font-size:13pt;line-height:%?85?%;height:%?85?%;color:#bbb;text-align:center;border-radius:5px;margin:auto 3%;position:relative;top:%?50?%}uni-button[type="primary"][data-v-66c2c349]{background-color:#20a4f7}uni-button[disabled][type="primary"][data-v-66c2c349]{background-color:#7fc8f5}.top[data-v-66c2c349]{margin-top:%?50?%}',""]),t.exports=e},4196:function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"pages"},[a("v-uni-view",{staticClass:"title"},[a("v-uni-text",{staticClass:"title-1 pub"},[t._v("手机号绑定")]),a("v-uni-text",{attrs:{id:"title-2"}},[t._v("应国家网信办实名制要求，需求绑定手机号")])],1),a("v-uni-view",{staticClass:"content"},[a("v-uni-form",{on:{submit:function(e){arguments[0]=e=t.$handleEvent(e),t.confirmSubmit.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"input-group"},[a("v-uni-text",{staticClass:"input-label"},[t._v("手机号：")]),a("v-uni-input",{attrs:{type:"number",name:"phone",placeholder:"请输入手机号",maxlength:"20","cursor-spacing":"20"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.phoneInput.apply(void 0,arguments)}}})],1),a("v-uni-view",{staticClass:"input-group"},[a("v-uni-text",{staticClass:"input-label"},[t._v("验证码：")]),a("v-uni-input",{attrs:{type:"text",name:"authCord",placeholder:"请输入验证码",maxlength:"6","cursor-spacing":"20"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.authCodeInput.apply(void 0,arguments)}}}),t.alreadySend?t._e():a("v-uni-text",{staticClass:"input-label-send",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.send.apply(void 0,arguments)}}},[t._v("发送验证码")]),t.alreadySend?a("v-uni-text",{staticClass:"input-label-send",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.send.apply(void 0,arguments)}}},[t._v(t._s(t.time+"S 后重新发送"))]):t._e()],1),a("v-uni-view",{staticClass:"confirm-btn top"},[a("v-uni-button",{attrs:{disabled:t.disabled,"form-type":"submit",type:"primary"}},[t._v("绑定")])],1)],1)],1)],1)},o=[]},"4a8f":function(t,e,a){"use strict";a.r(e);var n=a("ebe7"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},"96b4":function(t,e,a){"use strict";a.r(e);var n=a("4196"),i=a("4a8f");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("c8d8");var l,c=a("f0c5"),r=Object(c["a"])(i["default"],n["b"],n["c"],!1,null,"66c2c349",null,!1,n["a"],l);e["default"]=r.exports},c8d8:function(t,e,a){"use strict";var n=a("dc49"),i=a.n(n);i.a},dc49:function(t,e,a){var n=a("1e3b");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("47c28f92",n,!0,{sourceMap:!1,shadowMode:!1})},ebe7:function(t,e,a){"use strict";a("d3b7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=getApp(),i={data:function(){return{disabled:!0,canSend:!1,alreadySend:!1,time:60,phoneNum:"",authCode:""}},components:{},props:{},onShow:function(){},mounted:function(){document.querySelector(".uni-page-head-hd").style.display="block",document.querySelector(".uni-page-head-btn").style.display="block"},methods:{phoneInput:function(t){var e=this,a=t.detail.value,n=this.checkPhone(a);e.setData({phoneNum:a}),n?(e.setData({phoneNum:a}),e.showSend()):(e.setData({phoneNum:""}),e.hidenSend()),e.checkSubmit()},showSend:function(){this.setData({canSend:!0})},hidenSend:function(){this.setData({canSend:!1})},checkPhone:function(t){var e=/^1\d{10}$/;return!!e.test(t)},authCodeInput:function(t){var e=this,a=t.detail.value;e.setData({authCode:a}),e.checkSubmit()},checkSubmit:function(t){var e=this,a=e.phoneNum,n=e.authCode;e.checkEmpty(a)&&e.checkEmpty(n)?e.setData({disabled:!1}):e.setData({disabled:!0})},checkEmpty:function(t){return""!=t&&null!=t},send:function(t){var e=this,a=e.phoneNum;if(e.alreadySend)console.log("在倒计时中，重复点击");else if(e.checkPhone(a)){var i=n.globalData.StorageUtil.get("userInfoCach");e.canSend&&(n.globalData.ShowMsgUtil.netErrNotice(),wx.request({url:n.globalData.RequestUrl.baseRequestUrl.bindPhoneOfCode,data:{phoneNum:a},header:{token:i.token,"content-type":"application/json"},method:"POST",success:function(t){if(console.log("绑定手机号获取验证码返回",t.data),!t.data||200!=t.data.code)return n.globalData.ShowMsgUtil.showErrorModal("请求失败",t.data.msg,t.data.code),void e.hideAcceptCordError();i.mobile=a,n.globalData.StorageUtil.set("userInfoCach",i),e.showAcceptCord(),e.timer()},fail:function(){n.globalData.ShowMsgUtil.showNoneToastByFail(),e.hideAcceptCordError()}}))}else n.globalData.ShowMsgUtil.showErrorModal("手机号格式不正确","请输入正确的手机号！")},hideAcceptCordError:function(t){this.setData({alreadySend:!1})},showAcceptCord:function(t){wx.showToast({title:"发送成功",icon:"success",duration:2e3}),this.setData({alreadySend:!0})},timer:function(t){var e=this,a=new Promise((function(t,a){var n=setInterval((function(){e.setData({time:e.time-1}),e.time<=0&&(e.setData({time:60}),e.hideAcceptCordError(),t(n))}),1e3)}));a.then((function(t){clearInterval(t)}))},confirmSubmit:function(t){var e=this;n.globalData.ShowMsgUtil.netErrNotice();var a=e.phoneNum,i=e.authCode;if(e.checkPhone(a)){var o=n.globalData.StorageUtil.get("userInfoCach");wx.request({url:n.globalData.RequestUrl.baseRequestUrl.bindPhone,data:{phoneNum:a,code:i},header:{token:o.token,"content-type":"application/json"},method:"POST",success:function(t){console.log("绑定手机号码返回",t.data),t.data&&200==t.data.code?(n.globalData.ShowMsgUtil.showSuccessToast("修改成功",2e3),o.role==n.globalData.Constant.roleTypeConstant.MAINTAIN_MAN?n.globalData.PublicUtil.reLaunchByUrl(n.globalData.PageUrl.repairPageUrl.index,2e3):n.globalData.PublicUtil.switchTabByUrl(n.globalData.PageUrl.taBarPageUrl.indexUrl,2e3)):n.globalData.ShowMsgUtil.showErrorModal("请求失败",t.data.msg,t.data.code)},fail:function(){n.globalData.ShowMsgUtil.showNoneToastByFail()}})}else n.globalData.ShowMsgUtil.showErrorModal("格式不正确","请输入正确的手机号！")},clearForgetPage:function(t){this.setData({disabled:!0,canSend:!1,alreadySend:!1,time:60,phoneNum:"",authCode:""}),this.onShow()}}};e.default=i}}]);