(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-indexModule-pages-toPay-toPay"],{"0e28":function(t,e,a){var o=a("10a4");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=a("4f06").default;i("e0205d0e",o,!0,{sourceMap:!1,shadowMode:!1})},"10a4":function(t,e,a){var o=a("24fb");e=o(!1),e.push([t.i,".top[data-v-5fcf13d2]{margin-top:%?15?%}.box-top[data-v-5fcf13d2]{margin-top:%?0?%}.bottom[data-v-5fcf13d2]{margin-top:%?160?%}uni-button[disabled][data-v-5fcf13d2]{color:#bbb;background-color:#e3e3e3}.btn-font[data-v-5fcf13d2]{width:95%;color:#fff;background-color:#20a4f7}.bottom-top[data-v-5fcf13d2]{margin-top:%?200?%}.fontSize16[data-v-5fcf13d2]{font-size:%?32?%}.center-box[data-v-5fcf13d2]{\r\n  /* width: 100%;\r\n  height: 260rpx; */\r\n  /* padding-top: 20rpx; */}.input-title[data-v-5fcf13d2]{height:%?100?%;margin-left:%?40?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.input-box[data-v-5fcf13d2]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-left:%?20?%;font-size:48px;height:%?150?%}.input-value[data-v-5fcf13d2]{width:100%;height:%?120?%;font-size:%?70?%!important}.moneyList[data-v-5fcf13d2]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;padding:%?30?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.moneyItem[data-v-5fcf13d2]{min-width:30%;padding:%?30?% 0;text-align:center;border:%?1?% solid #20a4f7;border-radius:%?10?%;margin-bottom:%?20?%;box-sizing:border-box;background-color:#fff}.MonIcon[data-v-5fcf13d2]{font-size:%?28?%}.model_box[data-v-5fcf13d2]{position:absolute;top:0;width:100%;height:calc(100vh - 44px - env(safe-area-inset-top));background:rgba(0,0,0,.3);z-index:9999;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.model_cont[data-v-5fcf13d2]{width:75%;height:%?354?%;background-color:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-radius:%?10?%}.dangeColor[data-v-5fcf13d2]{color:#ea1932}.cells[data-v-5fcf13d2]{height:%?100?%;line-height:%?100?%;width:90%;text-align:center;letter-spacing:%?2?%;border-bottom:%?4?% solid #eee}.cells[data-v-5fcf13d2]:last-child{border-bottom:none}.Mtitle[data-v-5fcf13d2]{font-weight:700;height:%?140?%;line-height:%?140?%}",""]),t.exports=e},"3de4":function(t,e,a){"use strict";a("c975"),a("13d5"),a("4d63"),a("ac1f"),a("25f0"),a("466d"),a("5319"),a("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=/^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,i=/^<\/([-A-Za-z0-9_]+)[^>]*>/,l=/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,n=h("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"),s=h("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),r=h("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),c=h("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),d=h("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),u=h("script,style");function g(t,e){var a,g,h,f=[],b=t;f.last=function(){return this[this.length-1]};while(t){if(g=!0,f.last()&&u[f.last()])t=t.replace(new RegExp("([\\s\\S]*?)</"+f.last()+"[^>]*>"),(function(t,a){return a=a.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g,"$1$2"),e.chars&&e.chars(a),""})),v("",f.last());else if(0==t.indexOf("\x3c!--")?(a=t.indexOf("--\x3e"),a>=0&&(e.comment&&e.comment(t.substring(4,a)),t=t.substring(a+3),g=!1)):0==t.indexOf("</")?(h=t.match(i),h&&(t=t.substring(h[0].length),h[0].replace(i,v),g=!1)):0==t.indexOf("<")&&(h=t.match(o),h&&(t=t.substring(h[0].length),h[0].replace(o,y),g=!1)),g){a=t.indexOf("<");var p=a<0?t:t.substring(0,a);t=a<0?"":t.substring(a),e.chars&&e.chars(p)}if(t==b)throw"Parse Error: "+t;b=t}function y(t,a,o,i){if(a=a.toLowerCase(),s[a])while(f.last()&&r[f.last()])v("",f.last());if(c[a]&&f.last()==a&&v("",a),i=n[a]||!!i,i||f.push(a),e.start){var u=[];o.replace(l,(function(t,e){var a=arguments[2]?arguments[2]:arguments[3]?arguments[3]:arguments[4]?arguments[4]:d[e]?e:"";u.push({name:e,value:a,escaped:a.replace(/(^|[^\\])"/g,'$1\\"')})})),e.start&&e.start(a,u,i)}}function v(t,a){if(a){for(o=f.length-1;o>=0;o--)if(f[o]==a)break}else var o=0;if(o>=0){for(var i=f.length-1;i>=o;i--)e.end&&e.end(f[i]);f.length=o}}v()}function h(t){for(var e={},a=t.split(","),o=0;o<a.length;o++)e[a[o]]=!0;return e}function f(t){return t.replace(/<\?xml.*\?>\n/,"").replace(/<!doctype.*>\n/,"").replace(/<!DOCTYPE.*>\n/,"")}function b(t){return t.reduce((function(t,e){var a=e.value,o=e.name;return t[o]?t[o]=t[o]+" "+a:t[o]=a,t}),{})}function p(t){t=f(t);var e=[],a={node:"root",children:[]};return g(t,{start:function(t,o,i){var l={name:t};if(0!==o.length&&(l.attrs=b(o)),i){var n=e[0]||a;n.children||(n.children=[]),n.children.push(l)}else e.unshift(l)},end:function(t){var o=e.shift();if(o.name!==t&&console.error("invalid state: mismatch end tag"),0===e.length)a.children.push(o);else{var i=e[0];i.children||(i.children=[]),i.children.push(o)}},chars:function(t){var o={type:"text",text:t};if(0===e.length)a.children.push(o);else{var i=e[0];i.children||(i.children=[]),i.children.push(o)}},comment:function(t){var a={node:"comment",text:t},o=e[0];o.children||(o.children=[]),o.children.push(a)}}),a.children}var y=p;e.default=y},"3fc3":function(t,e,a){"use strict";a.r(e);var o=a("e4d1"),i=a.n(o);for(var l in o)"default"!==l&&function(t){a.d(e,t,(function(){return o[t]}))}(l);e["default"]=i.a},"76ed":function(t,e,a){"use strict";a.r(e);var o=a("e256"),i=a("3fc3");for(var l in i)"default"!==l&&function(t){a.d(e,t,(function(){return i[t]}))}(l);a("9e18");var n,s=a("f0c5"),r=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,"5fcf13d2",null,!1,o["a"],n);e["default"]=r.exports},"9e18":function(t,e,a){"use strict";var o=a("0e28"),i=a.n(o);i.a},e256:function(t,e,a){"use strict";var o;a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return l})),a.d(e,"a",(function(){return o}));var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"page"},[a("v-uni-view",{staticClass:"page__bd"},[a("v-uni-view",{staticClass:"weui-cells weui-cells_after-title box-top"},[a("v-uni-view",{staticClass:"weui-cell weui-cell_access",attrs:{"hover-class":"weui-cell_active"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.selectNumber.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"weui-cell__bd fontSize16"},[t._v("充值方式")]),t.isPayWay?a("v-uni-view",[t.showOnlyABC?a("v-uni-view",{staticClass:"weui-cell__ft fontSize16"},[t._v("农行快E付")]):a("v-uni-picker",{attrs:{mode:"selector",range:t.payMeths,value:t.payInd},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.pickChange.apply(void 0,arguments)}}},[a("v-uni-view",[t._v(t._s(t.payMeths[t.payInd]))])],1)],1):a("v-uni-view",[a("v-uni-view",{staticClass:"weui-cell__ft fontSize16"},[t._v("暂无支付方式")])],1)],1)],1),a("v-uni-view",{staticClass:"weui-cells weui-cells_after-title box-top"},[a("v-uni-view",{staticClass:"center-box"},[a("v-uni-view",{staticClass:"input-title fontSize16"},[t._v("充值金额")]),a("v-uni-view",{staticClass:"input-box"},[a("v-uni-text",{staticClass:"MonIcon"},[t._v("￥")]),a("v-uni-input",{staticClass:"input-value",attrs:{value:t.total_fee,type:"digit",maxlength:"6"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputMoney.apply(void 0,arguments)}},model:{value:t.total_fee,callback:function(e){t.total_fee=e},expression:"total_fee"}})],1)],1)],1),a("v-uni-view",[a("v-uni-view",{staticClass:"moneyList"},[t._l(t.moneyList,(function(e,o){return a("v-uni-view",{key:e,staticClass:"moneyItem",attrs:{"data-value":e},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getMonVal.apply(void 0,arguments)}}},[a("v-uni-text",[t._v(t._s(e)+"\n\t\t\t\t\t\t\t元")])],1)})),t.minder?a("v-uni-view",{staticClass:"reminder"},[a("span",[t._v("请输入整数不包含小数")])]):t._e()],2)],1),a("v-uni-view",{staticClass:"page__bd bottom"},[a("v-uni-button",{staticClass:"weui-btn btn-font",attrs:{type:"number",disabled:t.disablePay},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toPay.apply(void 0,arguments)}}},[t._v("确认充值")])],1)],1),t.reToPay?t._e():a("v-uni-view",{staticClass:"model_box"},[a("v-uni-view",{staticClass:"model_cont"},[a("v-uni-view",{staticClass:"cells Mtitle"},[t._v("请确认微信支付是否已完成")]),a("v-uni-view",{staticClass:"cells dangeColor",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.wxResSeccess.apply(void 0,arguments)}}},[t._v("已完成支付")]),a("v-uni-view",{staticClass:"cells",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.rePayAgain.apply(void 0,arguments)}}},[t._v("支付遇到问题,重新支付")])],1)],1)],1)},l=[]},e4d1:function(t,e,a){"use strict";a("c975"),a("b64b"),a("d3b7"),a("ac1f"),a("25f0"),a("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=getApp(),i=(a("3de4"),{data:function(){return{isPayWay:!1,disablePay:!0,total_fee:"",pageObj:{},toPayType:"",payObj:"",moneyList:["5","10","20","30","50","100"],payMeths:["农行支付","微信支付","支付宝支付"],payMethArr:[],payInd:0,selectMeth:{},reToPay:!0,showWeb:"",pay:"",showOnlyABC:o.globalData.showOnlyABC,val:"",minder:!1}},mounted:function(){console.log("7987"),window.onbeforeunload=function(){},window.addEventListener("onbeforeunload",(function(t){console.log("4564"),alert("监听到的事件是这样的吗啊")}),!1)},onLoad:function(t){console.log("------------------------充值------------------------"),console.log("options.isWater",t),t.isWater&&1==t.isWater?(wx.setNavigationBarTitle({title:"一卡通_水费充值_缴费"}),this.pageObj.rechargeType=1,this.pageObj.bodyName="水费缴费"):t.isWater&&15==t.isWater?(wx.setNavigationBarTitle({title:"一卡通_水费充值_缴费"}),this.pageObj.rechargeType=15,this.pageObj.bodyName="盛帆冷水缴费"):t.isWater&&2==t.isWater?(wx.setNavigationBarTitle({title:"一卡通_空调电费充值_缴费"}),this.pageObj.rechargeType=2,this.pageObj.bodyName="空调电费缴费"):t.isWater&&13==t.isWater?(wx.setNavigationBarTitle({title:"一卡通_照明电费充值_缴费"}),this.pageObj.rechargeType=13,this.pageObj.bodyName="照明电费缴费"):t.isWater&&9==t.isWater?(wx.setNavigationBarTitle({title:"一卡通_热水费充值_缴费"}),this.pageObj.rechargeType=9,this.pageObj.bodyName="热水费缴费"):t.isWater&&12==t.isWater?(wx.setNavigationBarTitle({title:"一卡通_直饮水充值_缴费"}),this.pageObj.rechargeType=12,this.pageObj.bodyName="直饮水费缴费"):(wx.setNavigationBarTitle({title:"一卡通_余额充值_缴费"}),this.pageObj.rechargeType=6,this.pageObj.bodyName="钱包充值"),this.pageObj.isWater=t.isWater,t.toPayType&&this.setData({toPayType:t.toPayType}),this.setData({pageObj:this.pageObj});var e=o.globalData.StorageUtil.get("userInfoCach");this.getPayWay(e),t.getResult&&1==t.getResult&&this.setData({reToPay:!1})},onShow:function(){if(""==this.total_fee){var t="";this.isHidden(t)}},methods:{pickChange:function(t){console.log(t);var e=t.detail.value,a=this.payMethArr[e];console.log(a),this.setData({payInd:e,selectMeth:a})},getPayWay:function(t){var e=this;o.globalData.ShowMsgUtil.netErrNotice(),wx.request({url:o.globalData.RequestUrl.baseRequestUrl.payMethod,method:"GET",header:{token:t.token},success:function(t){if(console.log("获取支付方式返回",t.data),!t.data||200!=t.data.code)return o.globalData.ShowMsgUtil.showErrorModal("请求失败",t.data.msg,t.data.code),void(e.total_fee&&e.isHidden(e.total_fee));var a=!1,i=[],l=[],n={};if(t.data.rows.length>0){a=!0,l=t.data.rows,n=t.data.rows[0];for(var s=0;s<t.data.rows.length;s++){var r=[t.data.rows[2],t.data.rows[0]];t.data.rows[0]=r[0],t.data.rows[2]=r[1],i.push(t.data.rows[s].name)}}6!==e.pageObj.rechargeType&&(i.push("余额支付"),l.push({name:"余额支付",value:"YUEPay"})),e.setData({isPayWay:a,payMeths:i,payMethArr:l,selectMeth:n})},fail:function(){o.globalData.ShowMsgUtil.showNoneToastByFail()}})},isHidden:function(t){t>0&&this.isPayWay?this.setData({disablePay:!1}):this.setData({disablePay:!0})},inputMoney:function(t){var e=t.detail.value,a=e.toString().split(".");if(console.log(a),e.indexOf())var o=/^[1-9]{1}[0-9]*$/;if(!o.test(e))return this.minder=!0,void this.setData({disablePay:!0});this.minder=!1,this.setData({disablePay:!1}),this.setData({total_fee:t.detail.value}),this.isHidden(t.detail.value)},getMonVal:function(t){var e=t.currentTarget.dataset.value;console.log(e),this.setData({total_fee:e}),this.isHidden(e)},selectNumber:function(){},myoninput:function(){console.log("456445")},toPay:function(){var t=this;console.log("去充值"),console.log(this.selectMeth);var e=o.globalData.StorageUtil.get("userInfoCach");if(1!=e.isMortal){o.globalData.ShowMsgUtil.showLoadToast("加载中");var a=t.total_fee,i=o.globalData.SystemInfo.platform;o.globalData.CheckUtil.verifyMoney(a)?(console.log(a),console.log(i),this.showOnlyABC&&(this.selectMeth.value="ABCHINA"),"WXPAY"==this.selectMeth.value?this.getWXPay(a,i):"ZFBPAY"==this.selectMeth.value?this.getZFBPay(a,i):"ABCHINA"==this.selectMeth.value?this.getABCPay(a,i):this.getYEPay(a,i)):o.globalData.ShowMsgUtil.showErrorModal("提醒","暂不支持该功能！")}else o.globalData.ShowMsgUtil.showErrorModal("提醒","培训人员暂不支持该功能！")},getWXPay:function(t,e){var a=window.location.href;o.globalData.ShowMsgUtil.netErrNotice();var i=100*t,l=o.globalData.CryptoJS.EncryptBASE64(i);-1==a.indexOf("?")?a+="?getResult=1":a+="&getResult=1",console.log("微信支付回调地址:"+a);var n=this,s=o.globalData.StorageUtil.get("userInfoCach");uni.request({url:o.globalData.RequestUrl.payRequestUrl.payforUrl,data:{payAmount:l,body:n.pageObj.bodyName,rechargeType:n.pageObj.rechargeType,h5Type:e},header:{token:s.token,"content-type":"application/json"},method:"POST",success:function(i){if(uni.hideToast(),200==i.data.code){var l=i.data.rows.mweb_url+"&redirect_url="+encodeURIComponent(a);console.log("即将拉起微信支付:"+l);var s={outTradeNo:i.data.rows.out_trade_no,total_fee:t,body:n.pageObj.bodyName,rechargeType:n.pageObj.rechargeType,h5Type:e,url:l};o.globalData.StorageUtil.set("payforInfo",s),location.href=l}else o.globalData.ShowMsgUtil.showErrorModal("充值失败",i.data.msg)},fail:function(t){n.setData({disablePay:!1}),o.globalData.ShowMsgUtil.showNoneToastByFail()}})},rePayAgain:function(){var t="again";this.getWXPayResult(t)},wxResSeccess:function(){var t="destory";this.getWXPayResult(t)},getWXPayResult:function(t){o.globalData.ShowMsgUtil.netErrNotice(),o.globalData.ShowMsgUtil.showLoadToast("正在处理...",500);var e=this,a=o.globalData.StorageUtil.get("userInfoCach"),i=o.globalData.StorageUtil.get("payforInfo");uni.request({url:o.globalData.RequestUrl.payRequestUrl.payforwxUrl,data:{outTradeNo:i.outTradeNo,totalFee:i.total_fee,transactionId:""},header:{token:a.token,"content-type":"application/json"},method:"POST",success:function(a){if(console.log(a),uni.hideToast(),200==a.data.code){var l=a.data.msg;"USERPAYING"==l?(setTimeout((function(){wx.removeStorage({key:"payforInfo"})}),500),o.globalData.PublicUtil.navigateByUrl(o.globalData.PageUrl.indexPageUrl.payResult+"?status="+a.data.msg,500),clearTimeout()):"NOTPAY"==l||"PAYERROR"==l||"CLOSED"==l?"again"==t?location.href=i.url:(uni.hideToast(),e.setData({reToPay:!0}),wx.showModal({title:"提示",content:"订单未完成请确认关闭订单",showCancel:!1,confirmText:"确定关闭",confirmColor:"#EA1932",success:function(){e.closeOrder(),o.globalData.PublicUtil.navigateByUrl(o.globalData.PageUrl.indexPageUrl.payResult+"?status="+a.data.msg+"&errorMessage=取消支付",500)}})):"SUCCESS"==l&&(setTimeout((function(){wx.removeStorage({key:"payforInfo"})}),500),o.globalData.PublicUtil.navigateByUrl(o.globalData.PageUrl.indexPageUrl.payResult+"?status="+l+"&amount="+i.total_fee,500))}else uni.hideToast(),e.setData({reToPay:!0}),o.globalData.ShowMsgUtil.showErrorModal("充值失败",a.data.msg)},fail:function(t){uni.hideToast(),e.setData({reToPay:!0}),o.globalData.ShowMsgUtil.showNoneToastByFail()}})},closeOrder:function(){o.globalData.ShowMsgUtil.netErrNotice();var t=this,e=o.globalData.StorageUtil.get("payforInfo"),a=o.globalData.StorageUtil.get("userInfoCach");uni.request({url:o.globalData.RequestUrl.payRequestUrl.closewWxOrder,data:{outTradeNo:e.outTradeNo},header:{token:a.token,"content-type":"application/json"},method:"POST",success:function(t){uni.hideToast(),wx.removeStorage({key:"payforInfo"}),200==t.data.code||o.globalData.ShowMsgUtil.showErrorModal("充值失败","订单关闭失败，请稍后再试！")},fail:function(e){t.setData({disablePay:!1}),o.globalData.ShowMsgUtil.showNoneToastByFail()}})},getZFBPay:function(t,e){console.log("进入支付宝支付");var a=this,i=o.globalData.StorageUtil.get("userInfoCach"),l=100*t,n=o.globalData.CryptoJS.EncryptBASE64(l);uni.request({url:o.globalData.RequestUrl.payRequestUrl.payforZFBUrl,data:{payAmount:n,body:a.pageObj.bodyName,rechargeType:a.pageObj.rechargeType,h5Type:e},header:{token:i.token,"content-type":"application/json"},method:"POST",success:function(t){if(console.log(t),200==t.data.code){var e=document.createElement("div");e.innerHTML=t.data.rows.formHtml;var a=e.innerText||e.textContent;e=null,document.querySelector("body").innerHTML=a,document.forms[0].submit()}else o.globalData.ShowMsgUtil.showErrorModal(t.data.msg,"请稍后再试！")},fail:function(t){a.setData({disablePay:!1}),o.globalData.ShowMsgUtil.showNoneToastByFail()}})},getABCPay:function(t,e){console.log("进入农行支付");var a=100*t,i=o.globalData.CryptoJS.EncryptBASE64(a);o.globalData.ShowMsgUtil.netErrNotice();var l=this,n=o.globalData.StorageUtil.get("userInfoCach");uni.request({url:o.globalData.RequestUrl.payRequestUrl.payforABCUrl,data:{payAmount:i,body:l.pageObj.bodyName,rechargeType:l.pageObj.rechargeType},header:{token:n.token,"content-type":"application/json"},method:"POST",success:function(t){if(uni.hideToast(),200==t.data.code){var e=t.data.rows.url;console.log(e),location.href=e}else o.globalData.ShowMsgUtil.showErrorModal(t.data.msg,"请稍后再试！")},fail:function(t){l.setData({disablePay:!1}),o.globalData.ShowMsgUtil.showNoneToastByFail()}})},getYEPay:function(t,e){console.log("进入余额支付"),console.log(t);var a=100*t,i=o.globalData.CryptoJS.EncryptBASE64(a);o.globalData.ShowMsgUtil.netErrNotice();var l=this,n=o.globalData.StorageUtil.get("userInfoCach");console.log(t),o.globalData.ShowMsgUtil.showLoadToast("正在充值...",500),uni.request({url:o.globalData.RequestUrl.payRequestUrl.YEPayUrl,data:{payAmount:i,body:l.pageObj.bodyName,rechargeType:l.pageObj.rechargeType,h5Type:e},header:{token:n.token,"content-type":"application/json"},method:"POST",success:function(e){console.log(e),uni.hideToast(),200==e.data.code?(l.setData({disablePay:!0}),o.globalData.PublicUtil.reLaunchByUrl(o.globalData.PageUrl.indexPageUrl.payResult+"?status=SUCCESS&amount="+t,500)):(o.globalData.ShowMsgUtil.showErrorModal("充值失败",e.data.msg),l.setData({disablePay:!1}))},fail:function(t){l.setData({disablePay:!1}),o.globalData.ShowMsgUtil.showNoneToastByFail()}})},getPayData:function(t,e,a){var i=this;o.globalData.ShowMsgUtil.netErrNotice(),this.setData({disablePay:!0});var l=o.globalData.StorageUtil.get("userInfoCach"),n=o.globalData.StorageUtil.get("openid"),s=100*t,r=o.globalData.CryptoJS.EncryptBASE64(s);wx.request({url:o.globalData.RequestUrl.payRequestUrl.cxcOrder,data:{recharge_type:e,total_fee:r,body:a,openid:n,identifier:l.username},header:{token:l.token,"content-type":"application/json"},method:"POST",success:function(t){if(wx.hideToast({}),console.log("校园通充值返回",t.data),!t.data||200!=t.data.code)return i.setData({disablePay:!1}),void o.globalData.ShowMsgUtil.showErrorModal("请求失败",t.data.msg,t.data.code);Object.keys(t.data.rows).length>0?(i.toWXPay(t.data.rows),i.setData({payObj:t.data.rows})):(i.setData({disablePay:!1}),o.globalData.ShowMsgUtil.showErrorModal("充值失败","请稍后再试！"))},fail:function(){wx.hideToast({}),i.setData({disablePay:!1}),o.globalData.ShowMsgUtil.showNoneToastByFail()}})},toWXPay:function(t){var e=this;wx.hideToast(),wx.requestPayment({timeStamp:t.timeStamp,nonceStr:t.nonceStr,package:t.package,signType:t.signType,paySign:t.sign,success:function(t){console.log("success",t.data),"requestPayment:ok"===t.errMsg&&("piano"==e.toPayType?(o.globalData.ShowMsgUtil.showSuccessToast("充值成功",1500),setTimeout((function(){wx.navigateBack({delta:1})}),1500)):o.globalData.PublicUtil.reLaunchByUrl(o.globalData.PageUrl.authPageUrl.successPageUrl+"?title=支付成功&pageUrl="+o.globalData.PageUrl.taBarPageUrl.indexUrl,500))},fail:function(t){console.log("fail",t.data),e.setData({disablePay:!1}),"requestPayment:fail cancel"===t.errMsg?(wx.hideToast(),e.closeWxRechargeOrder()):(t.errMsg,o.globalData.PublicUtil.reLaunchByUrl(o.globalData.PageUrl.authPageUrl.failPageUrl+"?title=支付失败&pageUrl="+o.globalData.PageUrl.indexPageUrl.toPay,500))}})},closeWxRechargeOrder:function(){o.globalData.ShowMsgUtil.netErrNotice();var t=o.globalData.StorageUtil.get("userInfoCach");wx.request({url:o.globalData.RequestUrl.payRequestUrl.cxcClose,data:{outTradeNo:this.payObj.outTradeNo},header:{token:t.token,"content-type":"application/json"},method:"POST",success:function(t){wx.hideToast({}),console.log("校园通充值返回",t.data),t.data&&200==t.data.code||o.globalData.ShowMsgUtil.showErrorModal("请求失败",t.data.msg,t.data.code)},fail:function(){wx.hideToast({}),o.globalData.ShowMsgUtil.showNoneToastByFail()}})}}});e.default=i}}]);