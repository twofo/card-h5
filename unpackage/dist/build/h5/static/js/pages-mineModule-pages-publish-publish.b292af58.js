(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mineModule-pages-publish-publish"],{"203b":function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,'.centerBackground[data-v-7daede86]{border-top:#fff;background-color:#fff;margin-bottom:%?20?%;margin-top:%?-10?%;padding-bottom:%?20?%}.border-topB[data-v-7daede86]{border-bottom:#fff}.topC[data-v-7daede86]{margin-top:%?35?%}.top[data-v-7daede86]{margin-top:%?70?%}uni-button[type="primary"][data-v-7daede86]{background-color:#20a4f7}.reviecerFontStyle[data-v-7daede86]{width:%?200?%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}',""]),e.exports=t},"3fe2":function(e,t,a){"use strict";a.r(t);var i=a("ad6b"),n=a.n(i);for(var o in i)"default"!==o&&function(e){a.d(t,e,(function(){return i[e]}))}(o);t["default"]=n.a},"84b8":function(e,t,a){"use strict";a.r(t);var i=a("e7e0"),n=a("3fe2");for(var o in n)"default"!==o&&function(e){a.d(t,e,(function(){return n[e]}))}(o);a("db39");var s,l=a("f0c5"),c=Object(l["a"])(n["default"],i["b"],i["c"],!1,null,"7daede86",null,!1,i["a"],s);t["default"]=c.exports},"9be7":function(e,t){var a="/static/pages/mineModule/resources/pic",i={image:a,enter:"".concat(a,"/enter.png"),lanshan:"".concat(a,"/lanshan.png"),logo:"".concat(a,"/logo.png"),camera:"".concat(a,"/camera.png"),branch:"".concat(a,"/branch.png"),faceImg:"".concat(a,"/faceImg.png"),xcImg:"".concat(a,"/xcImg.png"),compareImg:"".concat(a,"/compare.png"),bgColorImg:"".concat(a,"/bgColor.png")};e.exports=i},ad6b:function(e,t,a){"use strict";var i=a("4ea4");a("99af"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("ade3")),o=getApp(),s=a("9be7"),l={data:function(){return{mineImageUrl:s,files:[],imageBase64:[],inputTitle:"",inputContent:"",receiveCach:[],reviecer:""}},components:{},props:{},onLoad:function(){console.log("------------------------发布公告------------------------");var e=o.globalData.StorageUtil.get("receiveCach"),t=e[0].name;this.setData({reviecer:t})},methods:{inputTitleFun:function(e){this.setData({inputTitle:e.detail.value})},inputContentFun:function(e){this.setData({inputContent:e.detail.value})},chooseImage:function(e){var t,a=this;a.files.length<2?(t="android"==e.platform?["拍摄","从相册中选择","取消"]:["拍摄","从相册中选择"],wx.showActionSheet({itemList:t,success:function(e){"0"==e.tapIndex?a.takeCamera():"1"==e.tapIndex&&a.takePhoto()}})):o.globalData.ShowMsgUtil.showErrorModal("只能传两张！","超过上传图片的个数")},takeCamera:function(e){var t=this;wx.chooseImage({count:1,sizeType:["compressed"],sourceType:["camera"],success:function(e){var a=e.tempFilePaths[0];t.chageBase64(a),t.setData({files:t.files.concat(e.tempFilePaths)})},fail:function(e){}})},takePhoto:function(e){var t=this;wx.chooseImage({count:1,sizeType:["compressed"],sourceType:["album"],success:function(e){var a=e.tempFilePaths[0];t.chageBase64(a),t.setData({files:t.files.concat(e.tempFilePaths)})},fail:function(e){}})},chageBase64:function(e){var t=this;wx.getFileSystemManager().readFile({filePath:e,encoding:"base64",success:function(e){var a=t.imageBase64.length;t.setData((0,n.default)({},"imageBase64["+a+"]",e.data))}})},sendToNotice:function(){var e=this;o.globalData.ShowMsgUtil.showLoadToast("发布中",3e3);var t=o.globalData.StorageUtil.get("userInfoCach"),a=[];if(o.globalData.StorageUtil.get("receiveCach")){a=o.globalData.StorageUtil.get("receiveCach"),console.log("接收人",o.globalData.StorageUtil.get("receiveCach"));for(var i=[],n=0;n<a.length;++n){var s={};s.id=a[n].id,s.type=a[n].type,i[n]=s}if(!e.inputTitle||!e.inputContent||0==e.receiveCach.length)return wx.hideToast({}),void o.globalData.ShowMsgUtil.showErrorModal("请填写完整","都为必填项！");this.appSendRequest(t,i)}else o.globalData.ShowMsgUtil.showErrorModal("请重新选择！","选择接收人失败")},appSendRequest:function(e,t){o.globalData.ShowMsgUtil.netErrNotice();var a=!1,i=this;console.log("checkboxItems",t),wx.request({url:o.globalData.RequestUrl.baseRequestUrl.appSendToMany,data:{title:i.inputTitle,sender:e.name,content:i.inputContent,receivers:t,base64String:i.imageBase64},header:{token:e.token,"content-type":"application/json"},method:"POST",success:function(e){a=!0,console.log("发布公告返回",e.data),e.data&&200==e.data.code?(o.globalData.ShowMsgUtil.showSuccessAndReturn("公告发布成功！",2e3),o.globalData.StorageUtil.remove("receiveCach")):o.globalData.ShowMsgUtil.showErrorModal("请求失败",e.data.msg,e.data.code)},fail:function(){a||setTimeout((function(){o.globalData.ShowMsgUtil.showErrorModal("发布失败","后台连接未成功")}),2e4),o.globalData.ShowMsgUtil.showErrorModal("发布失败","公告发送失败")},complete:function(){wx.hideToast({})}})}}};t.default=l},db39:function(e,t,a){"use strict";var i=a("ff11"),n=a.n(i);n.a},e7e0:function(e,t,a){"use strict";var i;a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return i}));var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"page"},[a("v-uni-view",{staticClass:"weui-cells weui-cells_after-title topC"},[a("v-uni-view",{staticClass:"weui-cell weui-cell_input"},[a("v-uni-view",{staticClass:"weui-cell__bd"},[a("v-uni-input",{staticClass:"weui-input",attrs:{placeholder:"点击输入标题（不超过30字）",maxlength:"30"},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.inputTitleFun.apply(void 0,arguments)}}})],1)],1)],1),a("v-uni-view",{staticClass:"weui-cells"},[a("v-uni-view",{staticClass:"weui-cell border-topB"},[a("v-uni-view",{staticClass:"weui-cell__bd"},[a("v-uni-textarea",{staticClass:"weui-textarea",staticStyle:{height:"7.8em"},attrs:{placeholder:"点击输入文字（不超过1000字）"},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.inputContentFun.apply(void 0,arguments)}}})],1)],1)],1),a("v-uni-view",{staticClass:"weui-cell centerBackground "},[a("v-uni-view",{staticClass:"weui-cell__bd"},[a("v-uni-view",{staticClass:"weui-uploader"},[a("v-uni-view",{staticClass:"weui-uploader__hd"},[e._v("图片（选填）")]),a("v-uni-view",{staticClass:"weui-uploader__bd"},[a("v-uni-view",{staticClass:"weui-uploader__files",attrs:{id:"uploaderFiles"}},[e._l(e.files,(function(t,i){return[a("v-uni-view",{key:i+"_0",staticClass:"weui-uploader__file",attrs:{id:t},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.previewImage.apply(void 0,arguments)}}},[a("v-uni-image",{staticClass:"weui-uploader__img",attrs:{src:t,mode:"aspectFill"}})],1)]}))],2),a("v-uni-view",{staticClass:"camera"},[a("v-uni-image",{staticClass:"weui-uploader__img",attrs:{src:e.mineImageUrl.camera},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.chooseImage.apply(void 0,arguments)}}})],1)],1)],1)],1)],1),a("v-uni-view",{staticClass:"page__bd topC"},[a("v-uni-view",{staticClass:"weui-cells weui-cells_after-title",on:{click:function(t){arguments[0]=t=e.$handleEvent(t)}}},[a("v-uni-navigator",{staticClass:"weui-cell weui-cell_access",attrs:{url:"/pages/mineModule/pages/received/received","hover-class":"weui-cell_active"}},[a("v-uni-view",{staticClass:"weui-cell__bd"},[e._v("接收人")]),a("v-uni-view",{staticClass:"weui-cell__ft weui-cell__ft_in-access reviecerFontStyle"},[e._v(e._s(e.reviecer))])],1)],1)],1),a("v-uni-view",{staticClass:"page__bd page__bd_spacing top"},[a("v-uni-button",{staticClass:"weui-btn",attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.sendToNotice.apply(void 0,arguments)}}},[e._v("发送")])],1)],1)},o=[]},ff11:function(e,t,a){var i=a("203b");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var n=a("4f06").default;n("510935f0",i,!0,{sourceMap:!1,shadowMode:!1})}}]);