(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-repairModule-pages-repairManage-repairManage"],{"31ad":function(t,a,e){"use strict";e.r(a);var i=e("452f"),n=e("fc0c");for(var s in n)"default"!==s&&function(t){e.d(a,t,(function(){return n[t]}))}(s);var l,r=e("f0c5"),o=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],l);a["default"]=o.exports},"452f":function(t,a,e){"use strict";var i;e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return s})),e.d(a,"a",(function(){return i}));var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"page"},[e("v-uni-view",{staticClass:"page__bd"},[e("navbar",{attrs:{tabs:t.tabs},on:{clickTabs:function(a){arguments[0]=a=t.$handleEvent(a),t.bindClickTabs.apply(void 0,arguments)}}}),e("repair-list",{attrs:{list:t.list,btnList:t.btnList,callImage:t.callImage,listLength:t.listLength,height:t.windowHeight-70},on:{call:function(a){arguments[0]=a=t.$handleEvent(a),t.bindCallPhone.apply(void 0,arguments)},pull:function(a){arguments[0]=a=t.$handleEvent(a),t.bindPullUp.apply(void 0,arguments)}}})],1)],1)},s=[]},7838:function(t,a,e){"use strict";var i=e("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=i(e("b35c")),s=i(e("6809")),l=getApp(),r=e("ddc5"),o=e("c2d6"),u={data:function(){return{callImage:o.icCall,tabs:["全部","待分配","待接单","处理中","已完成","已拒绝"],activeIndex:0,list:[],btnList:[],pullDownNumber:0,listLength:1,windowHeight:510}},components:{navbar:n.default,repairList:s.default},props:{},onLoad:function(t){console.log(t);var a=t.isInit;if(a){var e=[0];this.getListByStatus(e,5,0)}this.setData({windowHeight:wx.getSystemInfoSync().windowHeight})},onPullDownRefresh:function(){var t=this;t.setData({list:[],pullDownNumber:0});var a=[0];this.getListByStatus(a,5,0)},methods:{bindClickTabs:function(t){var a=t.detail.activeIndex;this.setData({list:[],pullDownNumber:0,activeIndex:a}),this.dealStatusByActiveIndex(a,5,0)},dealStatusByActiveIndex:function(t,a,e){var i=[];0==t?(i=[0],this.getListByStatus(i,a,e)):1==t?(i=[1],this.getListByStatus(i,a,e)):2==t?(i=[2],this.getListByStatus(i,a,e)):3==t?(i=[3],this.getListByStatus(i,a,e)):4==t?(i=[4,5],this.getListByStatus(i,a,e)):5==t&&(i=[6],this.getListByStatus(i,a,e))},getListByStatus:function(t,a,e){var i=this;l.globalData.ShowMsgUtil.netErrNotice();var n=l.globalData.StorageUtil.get("userInfoCach"),s=i.list.length;wx.request({url:l.globalData.RequestUrl.repairRequestUrl.selectRepairsList+"?statusType="+t+"&take="+a+"&skip="+e,method:"GET",header:{token:n.token},success:function(t){if(console.log("查询报修列表返回",t.data),t.data&&200==t.data.code){i.pullDownNumber++;var a=i.deal(t.data.rows.lists);i.setData({listLength:s,list:a})}else l.globalData.ShowMsgUtil.showErrorModal("请求失败",t.data.msg,t.data.code)},fail:function(){l.globalData.ShowMsgUtil.showNoneToastByFail()}})},deal:function(t){for(var a=0;a<t.length;a++){t[a].deviceName=r.deviceType(t[a].deviceTypeId),t[a].statusName=r.status(t[a].repairStatus),t[a].image=null!=t[a].images&&t[a].images.length>0?t[a].images[0]:"",t[a].isCall=!1;var e={btnName:"查看详情",btnBind:"toDetailOfDormAdmin"},i=[];if(i[0]=e,1==t[a].repairStatus)e={},e.btnName="分配师傅",e.btnBind="toDistribute",i[1]=e,t[a].msg="学生已经等不及啦 ~ 尽快分配喔 ~ ";else if(2==t[a].repairStatus){var n={isCall:!0};null==t[a].userNameOfMaintainer&&(t[a].userNameOfMaintainer="暂无"),console.log(t[a].isAssignUser),1!=t[a].isAssignUser&&(t[a].phoneOfMaintainer="",n.isCall=!1),t[a].msg=t[a].userNameOfMaintainer+" "+t[a].phoneOfMaintainer,n.bindtap="toCall",t[a].callObj=n,console.log(n.isCall)}else if(3==t[a].repairStatus){var s={isCall:!0};null==t[a].userNameOfMaintainer&&(t[a].userNameOfMaintainer="暂无"),2==t[a].isAssignUser&&(t[a].phoneOfMaintainer="",s.isCall=!1),t[a].msg=t[a].userNameOfMaintainer+" "+t[a].phoneOfMaintainer,s.bindtap="toCall",t[a].callObj=s,console.log(s.isCall)}else 5==t[a].repairStatus||4==t[a].repairStatus?t[a].msg="师傅已经维修完成 ~ ":6==t[a].repairStatus&&(t[a].msg="拒绝原因："+t[a].repairRemarksOfMaintainer,e={},e.btnName="重新分配",e.btnBind="toRedistribute",i[1]=e);t[a].btnList=i}return t},bindCallPhone:function(t){var a=t.detail.phone;this.callPhone(a)},callPhone:function(t){wx.showModal({title:"呼叫",content:"拨打"+t,success:function(a){a.confirm?wx.makePhoneCall({phoneNumber:t}):a.cancel&&console.log("用户点击取消")}})},bindPullUp:function(){this.dealStatusByActiveIndex(this.activeIndex,5*(this.pullDownNumber+1),0)}}};a.default=u},fc0c:function(t,a,e){"use strict";e.r(a);var i=e("7838"),n=e.n(i);for(var s in i)"default"!==s&&function(t){e.d(a,t,(function(){return i[t]}))}(s);a["default"]=n.a}}]);