(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-repairModule-pages-repairDistribute-repairDistribute"],{"06c5":function(e,t,a){"use strict";a("a630"),a("fb6a"),a("d3b7"),a("25f0"),a("3ca3"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var i=s(a("6b75"));function s(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(e){if("string"===typeof e)return(0,i.default)(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?(0,i.default)(e,t):void 0}}},"0f19":function(e,t,a){var i=a("24fb");t=i(!1),t.push([e.i,'uni-button[type="primary"][data-v-4e6aa462]{background-color:#20a4f7}.myui__btn-top[data-v-4e6aa462]{margin-top:%?30?%}',""]),e.exports=t},1472:function(e,t,a){var i=a("0f19");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var s=a("4f06").default;s("8c970afc",i,!0,{sourceMap:!1,shadowMode:!1})},2909:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=l;var i=o(a("6005")),s=o(a("db90")),r=o(a("06c5")),n=o(a("3427"));function o(e){return e&&e.__esModule?e:{default:e}}function l(e){return(0,i.default)(e)||(0,s.default)(e)||(0,r.default)(e)||(0,n.default)()}},3427:function(e,t,a){"use strict";function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},"3e4f":function(e,t,a){"use strict";var i;a.d(t,"b",(function(){return s})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return i}));var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"page"},[a("v-uni-view",{staticClass:"page__bd",staticStyle:{padding:"10rpx 20rpx"}},[a("v-uni-view",{staticClass:"weui-cells weui-cells_after-title",staticStyle:{"margin-top":"30rpx"}},[a("v-uni-view",{staticClass:"weui-cell weui-cell_select"},[a("v-uni-view",{staticClass:"weui-cell__hd weui-cell__hd_in-select-after"},[a("v-uni-view",{staticClass:"weui-label"},[e._v("工种")])],1),a("v-uni-view",{staticClass:"weui-cell__bd"},[a("v-uni-picker",{attrs:{value:e.typeIndex,range:e.typeNameLists},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindSelectType.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"weui-select weui-select_in-select-after weui-cell__ft"},[e._v(e._s(e.typeNameLists[e.typeIndex]))])],1)],1)],1)],1),a("v-uni-view",{staticClass:"weui-cells weui-cells_after-title",staticStyle:{"margin-top":"30rpx"}},[a("v-uni-view",{staticClass:"weui-cell weui-cell_select"},[a("v-uni-view",{staticClass:"weui-cell__hd weui-cell__hd_in-select-after"},[a("v-uni-view",{staticClass:"weui-label"},[e._v("人员")])],1),a("v-uni-view",{staticClass:"weui-cell__bd"},[a("v-uni-picker",{attrs:{mode:"selector",value:e.personIndex,range:e.personNameLists},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindSelectPerson.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"weui-select weui-select_in-select-after weui-cell__ft"},[e._v(e._s(e.personNameLists[e.personIndex]))])],1)],1)],1)],1),a("v-uni-view",{staticClass:"page__bd page__bd_spacing button_top"},[a("v-uni-button",{staticClass:"weui-btn",attrs:{type:"primary",disabled:e.disabled,"form-type":"submit"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.saveDistribution.apply(void 0,arguments)}}},[e._v("确定选择")])],1)],1)],1)},r=[]},6005:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var i=s(a("6b75"));function s(e){return e&&e.__esModule?e:{default:e}}function r(e){if(Array.isArray(e))return(0,i.default)(e)}},"6b75":function(e,t,a){"use strict";function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,i=new Array(t);a<t;a++)i[a]=e[a];return i}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},"8c31":function(e,t,a){"use strict";var i=a("1472"),s=a.n(i);s.a},c2f4:function(e,t,a){"use strict";a.r(t);var i=a("3e4f"),s=a("de53");for(var r in s)"default"!==r&&function(e){a.d(t,e,(function(){return s[e]}))}(r);a("8c31");var n,o=a("f0c5"),l=Object(o["a"])(s["default"],i["b"],i["c"],!1,null,"4e6aa462",null,!1,i["a"],n);t["default"]=l.exports},d7e6:function(e,t,a){"use strict";var i=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=i(a("2909")),r=getApp(),n={data:function(){return{repairCode:"",typeLists:[],typeNameLists:[],typeIndex:0,personLists:[],personNameLists:[],personIndex:0,isAgainDistribution:0,disabled:!1}},components:{},props:{},onLoad:function(e){console.log("------------------------报修分配------------------------"),console.log("选中报修单号",e.repairCode),this.setData({repairCode:e.repairCode,isAgainDistribution:e.isAgainDistribution}),this.requestSelectType()},methods:{requestSelectType:function(){var e=this;r.globalData.ShowMsgUtil.netErrNotice();var t=r.globalData.StorageUtil.get("userInfoCach");wx.request({url:r.globalData.RequestUrl.repairRequestUrl.selectALLWorkerType,method:"GET",header:{token:t.token},success:function(t){if(console.log("查询所有工种返回",t.data.rows),t.data&&200==t.data.code){var a=[];if(t.data.rows.length>0){for(var i=0;i<t.data.rows.length;i++)a[i]=t.data.rows[i].name;e.requestSelectAllPerson(t.data.rows[0].id)}else a=["暂无"];e.setData({typeLists:t.data.rows,typeNameLists:a})}else r.globalData.ShowMsgUtil.showErrorModal("请求失败",t.data.msg,t.data.code)},fail:function(){r.globalData.ShowMsgUtil.showNoneToastByFail()}})},requestSelectAllPerson:function(e){var t=this;r.globalData.ShowMsgUtil.netErrNotice();var a=["全部"],i=r.globalData.StorageUtil.get("userInfoCach");wx.request({url:r.globalData.RequestUrl.repairRequestUrl.selectALLByWorkerId+"?workerId="+e,method:"GET",header:{token:i.token},success:function(e){if(console.log("查询所有人员返回",e.data.rows),e.data&&200==e.data.code){var i=[];if(e.data.rows.length>0)for(var n=0;n<e.data.rows.length;n++)i[n]=e.data.rows[n].nameOfMaintain;else i=["暂无"];a.push.apply(a,(0,s.default)(i)),t.setData({personLists:e.data.rows,personNameLists:a}),console.log(a)}else r.globalData.ShowMsgUtil.showErrorModal("请求失败",e.data.msg,e.data.code)},fail:function(){r.globalData.ShowMsgUtil.showNoneToastByFail()}})},bindSelectType:function(e){0!=this.typeLists.length&&(this.requestSelectAllPerson(this.typeLists[e.detail.value].id),this.setData({typeIndex:e.detail.value}))},bindSelectPerson:function(e){console.log(e.detail.value),this.setData({personIndex:e.detail.value})},saveDistribution:function(){var e=this,t=!0;return 0==e.typeLists.length?(r.globalData.ShowMsgUtil.showErrorModal("请求失败","工种不能为空！"),void(t=!1)):0==e.personLists.length?(r.globalData.ShowMsgUtil.showErrorModal("请求失败","人员不能为空！"),void(t=!1)):""==e.repairCode?(r.globalData.ShowMsgUtil.showErrorModal("请求失败","未指定具体的报修订单！"),void(t=!1)):(this.setData({disabled:t}),void(1==this.isAgainDistribution?e.requestDistribute(1):e.requestDistribute(0)))}}};t.default=n},db90:function(e,t,a){"use strict";function i(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}a("a4d3"),a("e01a"),a("d28b"),a("a630"),a("d3b7"),a("3ca3"),a("ddb0"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},de53:function(e,t,a){"use strict";a.r(t);var i=a("d7e6"),s=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);t["default"]=s.a}}]);