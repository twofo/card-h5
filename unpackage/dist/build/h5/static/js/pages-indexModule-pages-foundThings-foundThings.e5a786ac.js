(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-indexModule-pages-foundThings-foundThings"],{"0d42":function(t,a,e){"use strict";var o=e("63be"),i=e.n(o);i.a},"1a48":function(t,a,e){"use strict";e.r(a);var o=e("d31f"),i=e.n(o);for(var s in o)"default"!==s&&function(t){e.d(a,t,(function(){return o[t]}))}(s);a["default"]=i.a},"63be":function(t,a,e){var o=e("a91d");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=e("4f06").default;i("3210a28f",o,!0,{sourceMap:!1,shadowMode:!1})},a91d:function(t,a,e){var o=e("24fb");a=o(!1),a.push([t.i,".searchBox[data-v-32236512]{background-color:#fff;padding:0 %?30?%;box-sizing:border-box}.foundList[data-v-32236512]{padding:0 %?30?%;box-sizing:border-box;background-color:#fff}.foundItems[data-v-32236512]{display:-webkit-box;display:-webkit-flex;display:flex;padding-bottom:%?30?%}.foundThingName[data-v-32236512]{font-weight:700}.foundImg[data-v-32236512]{width:%?250?%;height:%?120?%}.foundInfo[data-v-32236512]{position:relative}.lostStatus[data-v-32236512]{position:absolute;right:0;top:0;padding:%?6?% %?10?%;border-top-left-radius:%?16?%;border-bottom-left-radius:%?16?%;background:#f66c45;font-size:%?20?%;color:#fff}.fontSize14[data-v-32236512]{font-size:%?26?%;color:#666}.foundDesc[data-v-32236512]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.nomore[data-v-32236512]{text-align:center;padding-top:%?30?%}",""]),t.exports=a},d31f:function(t,a,e){"use strict";var o=e("4ea4");e("4160"),e("159b"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=o(e("fa13")),s=getApp(),n={data:function(){return{sWidth:200,lostArr:[],sHeight:520,curPage:0,loadMore:!1}},components:{selectInp:i.default},props:{},onLoad:function(t){console.log(s.globalData.globalData);var a=s.globalData.SystemInfo.screenWidth-125,e=s.globalData.SystemInfo.screenHeight-s.globalData.SystemInfo.statusBarHeight-110;this.setData({sWidth:a,sHeight:e}),this.getLostFoundList(5,0)},methods:{mysearchValLen:function(t){console.log(t);var a=t.detail.value,e="0&searchName="+a;this.getLostFoundList(5,e)},gotoPage:function(t){var a=t.currentTarget.id;s.globalData.PublicUtil.navigateByUrl(s.globalData.PageUrl.indexPageUrl.lostAndFoundDetail+"?id="+a,500)},getLostFoundList:function(t,a){var e=this;s.globalData.ShowMsgUtil.netErrNotice();var o=s.globalData.StorageUtil.get("userInfoCach");wx.request({url:s.globalData.RequestUrl.baseRequestUrl.getLostFoundList+"?take="+t+"&skip="+a,method:"GET",header:{token:o.token},success:function(t){console.log("获取失物列表返回",t.data),t.data&&200==t.data.code?(e.reduceData(t.data.data),e.setData({loadMore:!1}),e.curPage!=t.data.data.length?e.curPage=t.data.data.length:0==t.data.data.length?e.setData({loadMore:!1}):(console.log("到底了"),e.setData({loadMore:!0}))):s.globalData.ShowMsgUtil.showErrorModal("请求失败",t.data.msg,t.data.code)},fail:function(){s.globalData.ShowMsgUtil.showNoneToastByFail()}})},reduceData:function(t){var a=[];t.forEach((function(e,o){var i={};i.id=e.id,i.img=null==e.arrayArticleImages||t.arrayArticleImages==[]?[]:e.arrayArticleImages[0],i.lostName=e.articleName,i.postTime=e.releseTime,i.type=e.articleType,i.lostDesc=e.articleDescription,a[o]=i})),this.setData({lostArr:a})},lower:function(){this.loadMore||this.getLostFoundList(2*this.curPage,0)}}};a.default=n},d9e9:function(t,a,e){"use strict";var o;e.d(a,"b",(function(){return i})),e.d(a,"c",(function(){return s})),e.d(a,"a",(function(){return o}));var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",[e("v-uni-view",{staticClass:"searchBox"},[e("select-inp",{attrs:{placeholder:"请输入关键字"},on:{mysearchValLen:function(a){arguments[0]=a=t.$handleEvent(a),t.mysearchValLen.apply(void 0,arguments)}}})],1),e("v-uni-scroll-view",{style:"height:"+t.sHeight+"px",attrs:{"scroll-y":!0,"lower-threshold":"20"},on:{scrolltolower:function(a){arguments[0]=a=t.$handleEvent(a),t.lower.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"foundList",style:"min-height:"+(t.sHeight+10)+"px"},[t._l(t.lostArr,(function(a,o){return t.lostArr.length>0?e("v-uni-view",{key:o,staticClass:"foundItems",attrs:{id:a.id},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.gotoPage.apply(void 0,arguments)}}},[a.img.length>0?e("v-uni-image",{staticClass:"foundImg",attrs:{src:a.img,mode:"aspectFit"}}):t._e(),e("v-uni-view",{staticClass:"foundInfo",style:"width: "+(a.img.length>0?t.sWidth:t.sWidth+125)+"px;"},[e("v-uni-view",{staticClass:"foundThingName"},[e("v-uni-text",[t._v("物品:")]),e("v-uni-text",[t._v(t._s(a.lostName))])],1),e("v-uni-view",{staticClass:"fontSize14"},[e("v-uni-text",[t._v("发布时间:")]),e("v-uni-text",[t._v(t._s(a.postTime))])],1),e("v-uni-view",{staticClass:"fontSize14 foundDesc"},[e("v-uni-text",[t._v("失物详情:")]),e("v-uni-text",[t._v(t._s(a.lostDesc))])],1),a.status?e("v-uni-view",{staticClass:"lostStatus"},[t._v(t._s(a.status))]):t._e()],1)],1):t._e()})),t.loadMore?e("v-uni-view",{staticClass:"nomore"},[t._v("----到底了----")]):t._e(),0==t.lostArr.length?e("v-uni-view",{staticClass:"nomore"},[t._v("暂无数据")]):t._e()],2)],1)],1)},s=[]},ed91:function(t,a,e){"use strict";e.r(a);var o=e("d9e9"),i=e("1a48");for(var s in i)"default"!==s&&function(t){e.d(a,t,(function(){return i[t]}))}(s);e("0d42");var n,l=e("f0c5"),r=Object(l["a"])(i["default"],o["b"],o["c"],!1,null,"32236512",null,!1,o["a"],n);a["default"]=r.exports}}]);