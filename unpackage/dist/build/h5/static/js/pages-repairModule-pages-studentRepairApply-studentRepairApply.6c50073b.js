(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-repairModule-pages-studentRepairApply-studentRepairApply"],{"06c5":function(e,t,a){"use strict";a("a630"),a("fb6a"),a("d3b7"),a("25f0"),a("3ca3"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=s;var i=o(a("6b75"));function o(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(e){if("string"===typeof e)return(0,i.default)(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?(0,i.default)(e,t):void 0}}},"09bf":function(e,t,a){"use strict";var i=a("fc14"),o=a.n(i);o.a},2909:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=l;var i=r(a("6005")),o=r(a("db90")),s=r(a("06c5")),n=r(a("3427"));function r(e){return e&&e.__esModule?e:{default:e}}function l(e){return(0,i.default)(e)||(0,o.default)(e)||(0,s.default)(e)||(0,n.default)()}},"2b5a":function(e,t,a){"use strict";var i=a("4ea4");a("99af"),a("baa5"),a("a434"),a("4d63"),a("ac1f"),a("25f0"),a("5319"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(a("2909")),s=i(a("ade3")),n=getApp(),r=(a("ddc5"),a("c2d6")),l={data:function(){return{pageObj:{},files:[],imageBase64:[],inputText:"",userInfoCach:{},deviceType:{},roomId:"",index:0,roomObj:{},disabled:!1,statc:"",img:[r.icClose,r.icClose],typeLists:[],typeNameLists:[],typeIndex:0,personLists:[],personNameLists:[],personIndex:0,worker:[],id:"",workId:""}},onLoad:function(){console.log("------------------------报修申请------------------------");var e=n.globalData.StorageUtil.get("userInfoCach");3==e.role&&this.setData({statc:1});var t={};if(t.name=e.name,t.mobile=e.mobile,console.log(e.roomInfo),e.roomInfo?(t.roomName=e.roomInfo.buildName+" -"+e.roomInfo.roomName,t.roomId=e.roomInfo.roomId):(t.roomName=3==e.role?"请选择":"暂无",t.roomId=""),this.selection(),!n.globalData.PublicUtil.isNotEmpty(this.deviceType)){var a={name:"空调电表",id:5};this.setData({deviceType:a})}this.setData({userInfoCach:e,pageObj:t})},onShow:function(){if(console.log("roomObj - ",this.roomObj),uni.$on("updatedData",this.updatedData),"{}"!=JSON.stringify(this.roomObj)){var e=this.pageObj,t=this.roomObj.name;console.log(t),t.length>0?(e.roomName=t,e.roomId=this.roomObj.id):(e.roomName="暂无",e.roomId=""),this.setData({pageObj:e})}},methods:{updatedData:function(e){this.roomObj=e.roomObj},selectModel:function(){var e=this;wx.showActionSheet({itemList:["空调电表","其它"],success:function(t){if(!t.cancel){var a={};0==t.tapIndex?(a.name="空调电表",a.id=5):1==t.tapIndex&&(a.name="其它",a.id=0),e.setData({deviceType:a})}}})},inputMobile:function(e){var t=this.pageObj;t.mobile=e.detail.value,this.setData({pageObj:t})},bindTextAreaBlur:function(e){this.setData({inputText:e.detail.value})},chooseImage:function(e){var t,a=this;(console.log(a.files.length),a.files.length<2)?(console.log(e.platform),t="android"==e.platform?["拍摄","从相册中选择","取消"]:["拍摄","从相册中选择"],uni.showActionSheet({itemList:t,success:function(e){"0"==e.tapIndex?a.takeCamera():"1"==e.tapIndex&&a.takePhoto()}})):n.globalData.ShowMsgUtil.showErrorModal("只能传两张！","超过上传图片的个数")},close:function(e){this.files.splice(e.currentTarget.dataset.ind,1),this.imageBase64.splice(e.currentTarget.dataset.ind,1)},takeCamera:function(e){var t=this;wx.chooseImage({count:1,sizeType:["original"],sourceType:["camera"],success:function(e){var a=e.tempFilePaths[0];console.log(a),t.chageBase64(a),t.setData({files:t.files.concat(e.tempFilePaths)})},fail:function(e){n.globalData.ShowMsgUtil.showNoneToastByFail()}})},takePhoto:function(e){var t=this;wx.chooseImage({count:1,sizeType:["original"],sourceType:["album"],success:function(e){console.log(e);t.img;var a=e.tempFilePaths[0];console.log(e);var i=e.tempFiles[0].name.substring(e.tempFiles[0].name.lastIndexOf(".")+1);"jpg"==i||"png"==i?(t.chageBase64(a),t.setData({files:t.files.concat(e.tempFilePaths)})):n.globalData.ShowMsgUtil.showErrorModal("上传失败","上传图片只能是 jpg、png格式!")},fail:function(e){n.globalData.ShowMsgUtil.showNoneToastByFail()}})},previewImage:function(e){wx.previewImage({current:e.currentTarget.id,urls:this.files})},chageBase64:function(e){var t=this,a="",i=n.globalData.base64Util.pathToBase64;i(e).then((function(e){a=e;var i=new RegExp("data:image/png;base64,","g"),o=new RegExp("data:image/jpeg;base64,","g"),n=a.replace(i,""),r=n.replace(o,""),l=t.imageBase64.length;console.log(l),t.setData((0,s.default)({},"imageBase64["+l+"]",r))})).catch((function(e){console.error(e)}))},selection:function(){var e=this,t=["全部"],a=n.globalData.StorageUtil.get("userInfoCach");console.log(a);var i=a.roomInfo.roomId;console.log(i),wx.request({url:n.globalData.RequestUrl.repairRequestUrl.selectAllWorker,method:"GET",data:{positionRoomId:i},header:{token:a.token,"content-type":"application/json"},success:function(a){if(console.log(a.data),a.data&&200==a.data.code){e.setData({worker:a.data.rows});var i=[];if(a.data.rows.length>0)for(var s=0;s<a.data.rows.length;s++)i[s]=a.data.rows[s].name;else i=["暂无"];t.push.apply(t,(0,o.default)(i)),e.setData({typeLists:a.data.rows,typeNameLists:t}),console.log(t)}},fail:function(){e.setData({disabled:!1}),n.globalData.ShowMsgUtil.showNoneToastByFail()}})},bindSelectType:function(e){var t=["全部"],a=[],i=this.typeLists[e.detail.value-1].id;if(this.setData({typeIndex:e.detail.value,workId:i}),this.worker[this.typeIndex-1]){var s=[],n=[];if(this.worker[this.typeIndex-1].worker.length>0)for(var r=0;r<this.worker[this.typeIndex-1].worker.length;r++)s[r]=this.worker[this.typeIndex-1].worker[r].nameOfMaintain,n[r]=this.worker[this.typeIndex-1].worker[r].idOfMaintain;else s=["暂无"];t.push.apply(t,(0,o.default)(s)),a.push.apply(a,n),this.setData({personNameLists:t,personLists:a})}},bindSelectPerson:function(e){if(console.log(e),this.setData({personIndex:e.detail.value}),this.personIndex){var t=this.personIndex-1;this.setData({id:this.personLists[t]})}},confirmApply:function(){var e=this;n.globalData.ShowMsgUtil.netErrNotice(),n.globalData.ShowMsgUtil.showLoadToast("正在申请...",200);var t=n.globalData.StorageUtil.get("userInfoCach"),a=e.id;this.disabled;return 0==e.typeIndex?(n.globalData.ShowMsgUtil.showErrorModal("请求失败","工种不能为空！"),void!1):""==e.id?(n.globalData.ShowMsgUtil.showErrorModal("请求失败","人员不能为空！"),void!1):void(e.disabled||(e.setData({disabled:!1}),wx.request({url:n.globalData.RequestUrl.repairRequestUrl.saveRepairs,data:{repairApplyName:e.pageObj.name,maintainId:a,repairApplyPhone:e.pageObj.mobile,deviceTypeId:e.workId,repairDesc:e.inputText,positionRoomId:e.pageObj.roomId,imglist:e.imageBase64},method:"POST",header:{token:t.token,"content-type":"application/json"},success:function(t){if(console.log("报修申请返回",t.data),!t.data||200!=t.data.code)return e.setData({disabled:!1}),void n.globalData.ShowMsgUtil.showErrorModal("请求失败",t.data.msg,t.data.code);n.globalData.ShowMsgUtil.showSuccessToast("申请成功",100),n.globalData.PublicUtil.navigateByUrl(n.globalData.PageUrl.repairPageUrl.successPageUrl+"?value="+t.data.rows+"&title=你的报修编号为",500)},fail:function(){e.setData({disabled:!1}),n.globalData.ShowMsgUtil.showNoneToastByFail()}}),setTimeout((function(){e.setData({disabled:!0},5e3)}))))}}};t.default=l},3427:function(e,t,a){"use strict";function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},4358:function(e,t,a){"use strict";a.r(t);var i=a("68092"),o=a("8a33");for(var s in o)"default"!==s&&function(e){a.d(t,e,(function(){return o[e]}))}(s);a("09bf");var n,r=a("f0c5"),l=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"919963a6",null,!1,i["a"],n);t["default"]=l.exports},6005:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=s;var i=o(a("6b75"));function o(e){return e&&e.__esModule?e:{default:e}}function s(e){if(Array.isArray(e))return(0,i.default)(e)}},68092:function(e,t,a){"use strict";var i;a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return i}));var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"page"},[a("v-uni-view",{staticClass:"page__bd box"},[a("v-uni-view",{staticClass:"weui-cells weui-cells_after-title myui-cell"},[1==e.statc?a("v-uni-view",[a("v-uni-navigator",{staticClass:"weui-cell weui-cell_access",attrs:{url:"../selectRoom/selectRoom","hover-class":"weui-cell_active"}},[a("v-uni-view",{staticClass:"weui-cell__bd",staticStyle:{"font-family":"emoji"}},[e._v("房间："+e._s(null!=e.pageObj.roomName?e.pageObj.roomName:"请选择"))]),a("v-uni-view",{staticClass:"weui-cell__ft weui-cell__ft_in-access"})],1)],1):a("v-uni-view",{staticClass:"weui-cell weui-cell_access"},[a("v-uni-view",{staticClass:"weui-cell__bd",staticStyle:{"font-family":"emoji"}},[e._v("房间："+e._s(e.pageObj.roomName))])],1),a("v-uni-view",{staticClass:"weui-cell weui-cell_access",attrs:{"hover-class":"weui-cell_active"}},[a("v-uni-view",{staticClass:"weui-cell__bd",staticStyle:{"font-family":"emoji"}},[e._v("申请人："+e._s(e.pageObj.name))])],1),a("v-uni-view",{staticClass:"weui-cell weui-cell_access",attrs:{"hover-class":"weui-cell_active"}}),a("v-uni-view",{staticClass:"weui-cell__bd",attrs:{"hover-class":"weui-cell_active"}},[a("v-uni-picker",{attrs:{mode:"selector",value:e.typeIndex,range:e.typeNameLists},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindSelectType.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"weui-select weui-select_in-select-after "},[a("v-uni-text",[e._v("维修工种：")]),e._v(e._s(e.typeNameLists[e.typeIndex]))],1)],1)],1),a("v-uni-view",{staticClass:"weui-cell weui-cell_access",attrs:{"hover-class":"weui-cell_active"}}),a("v-uni-view",{staticClass:"weui-cell__bd",attrs:{"hover-class":"weui-cell_active"}},[a("v-uni-picker",{attrs:{mode:"selector",value:e.personIndex,range:e.personNameLists},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindSelectPerson.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"weui-select weui-select_in-select-after "},[a("v-uni-text",[e._v("维修人员：")]),e._v(e._s(e.personNameLists[e.personIndex]))],1)],1)],1),a("v-uni-view",{staticClass:"weui-cell weui-cell_input"},[a("v-uni-view",{staticClass:"weui-cell__hd"},[e._v("联系电话：")]),a("v-uni-view",{staticClass:"weui-cell__bd"},[a("v-uni-input",{staticClass:"weui-input",attrs:{placeholder:"请输入联系电话",value:e.pageObj.mobile},on:{blur:function(t){arguments[0]=t=e.$handleEvent(t),e.inputMobile.apply(void 0,arguments)}}})],1)],1)],1),a("v-uni-view",{staticClass:"page-body myui-cell"},[a("v-uni-view",{staticClass:"page-section"},[a("v-uni-view",{staticClass:"textarea-wrp"},[a("v-uni-view",{staticClass:"myui-text"},[e._v("报修描述(必填)：")]),a("v-uni-textarea",{staticStyle:{width:"100%"},attrs:{placeholder:"请描述故障现象","auto-height":!0,maxlength:"140"},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.bindTextAreaBlur.apply(void 0,arguments)}}})],1)],1)],1),a("v-uni-view",{staticClass:"weui-cell centerBackground myui-cell",staticStyle:{"margin-top":"20px"}},[a("v-uni-view",{staticClass:"weui-cell__bd"},[a("v-uni-view",{staticClass:"weui-uploader"},[a("v-uni-view",{staticClass:"weui-uploader__hd"},[a("v-uni-view",{staticClass:"weui-uploader__title"},[e._v("现场图片上传（必填）")])],1),a("v-uni-view",{staticClass:"weui-uploader__bds"},[a("v-uni-view",{staticClass:"weui-uploader__files",attrs:{id:"uploaderFiles"}},[e._l(e.files,(function(t,i){return[a("v-uni-view",{key:i+"_0",staticClass:"weui-uploader__file",staticStyle:{width:"80px","margin-top":"-27px"},attrs:{id:t,"data-ind":i},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.previewImage.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"close",attrs:{"data-ind":i},on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.close.apply(void 0,arguments)}}},[a("v-uni-image",{staticClass:"closes",attrs:{src:e.img[i]}})],1),a("img",{staticClass:"weui-uploader__img",attrs:{src:t}})],1)]}))],2),a("v-uni-view",{staticClass:"weui-uploader__input-box"},[a("v-uni-view",{staticClass:"weui-uploader__input",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.chooseImage.apply(void 0,arguments)}}})],1)],1)],1)],1)],1)],1),a("v-uni-view",{staticClass:"page__bd page__bd_spacing button_top"},[a("v-uni-button",{staticClass:"weui-btn",attrs:{type:"primary",disabled:e.disabled,"form-type":"submit"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.confirmApply.apply(void 0,arguments)}}},[e._v("提交申请")])],1)],1)},s=[]},"6b75":function(e,t,a){"use strict";function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,i=new Array(t);a<t;a++)i[a]=e[a];return i}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},"8a33":function(e,t,a){"use strict";a.r(t);var i=a("2b5a"),o=a.n(i);for(var s in i)"default"!==s&&function(e){a.d(t,e,(function(){return i[e]}))}(s);t["default"]=o.a},a84d:function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,'uni-textarea[data-v-919963a6]{width:%?700?%;padding:%?25?% 0}.textarea-wrp[data-v-919963a6]{padding:0 %?25?%;background-color:#fff}.box[data-v-919963a6]{padding:%?10?% %?30?%}.myui-cell[data-v-919963a6]{margin-top:%?15?%}.myui-text[data-v-919963a6]{padding-top:%?20?%}.weui-uploader__files[data-v-919963a6]{position:relative}.closes[data-v-919963a6]{width:50px;height:50px;position:relative;top:17px;color:red;left:66px;height:20px;width:20px;z-index:99}.weui-uploader__bds[data-v-919963a6]{margin-bottom:-4px;margin-right:-9px}.centerBackground[data-v-919963a6]{border-top:#fff;background-color:#fff;margin-bottom:%?20?%;padding-bottom:%?20?%}uni-button[type="primary"][data-v-919963a6]{background-color:#20a4f7}.myui__btn-top[data-v-919963a6]{margin-top:%?30?%}.weui-select[data-v-919963a6]{position:relative;padding-left:15px;padding-right:30px;height:2.58823529em;line-height:2.58823529em;color:#2f4f4f;border-right:0;margin-top:-15px}.weui-select uni-text[data-v-919963a6]{float:left;font-family:Microsoft YaHei}',""]),e.exports=t},c2d6:function(e,t){var a="/static/pages/repairModule/resources/pic",i={image:a,repairApplyPic:"".concat(a,"/repair_apply.png"),myRepairPic:"".concat(a,"/repair_my.png"),starOn:"".concat(a,"/star_on.png"),starOff:"".concat(a,"/star_off.png"),icCall:"".concat(a,"/ic_call.png"),icProcessBlue:"".concat(a,"/ic_process_blue.png"),icProcessGray:"".concat(a,"/ic_process_gray.png"),navHomePage:"".concat(a,"/nav_home_page.png"),navHomePagePressed:"".concat(a,"/nav_home_page_pressed.png"),navMine:"".concat(a,"/nav_mine.png"),navMinePressed:"".concat(a,"/nav_mine_pressed.png"),navWorkerOrder:"".concat(a,"/nav_worker_order.png"),navWorkerOrderPressed:"".concat(a,"/nav_worker_order_pressed.png"),navNew:"".concat(a,"/nav_new.png"),navNewPressed:"".concat(a,"/nav_new_pressed.png"),bgRepairHeader:"".concat(a,"/bg_repair_header.png"),mineFunRecord:"".concat(a,"/mine_fun_record.png"),icStars:"".concat(a,"/ic_stars.png"),icTypeOther:"".concat(a,"/ic_type_other.png"),icRepairLock:"".concat(a,"/ic_repair_lock.png"),icRepairAmmeter:"".concat(a,"/ic_repair_ammeter.png"),icRepairWatermeter:"".concat(a,"/ic_repair_watermeter.png"),icRepairLamp:"".concat(a,"/ic_repair_lamp.png"),icClose:"".concat(a,"/close.png")};e.exports=i},db90:function(e,t,a){"use strict";function i(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}a("a4d3"),a("e01a"),a("d28b"),a("a630"),a("d3b7"),a("3ca3"),a("ddb0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},ddc5:function(e,t){getApp().globalData;function a(e){var t="";return 0==e?t="其它":1==e?t="门锁":2==e?t="水表":3==e?t="消费机":4==e?t="电表":5==e&&(t="空调电表"),t}function i(e){var t="";return 1==e?t="待分配":2==e?t="待接单":3==e?t="处理中":4==e?t="已完成":5==e?t="已评价":6==e&&(t="已拒绝"),t}e.exports={status:i,deviceType:a}},fc14:function(e,t,a){var i=a("a84d");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var o=a("4f06").default;o("2df8a85b",i,!0,{sourceMap:!1,shadowMode:!1})}}]);