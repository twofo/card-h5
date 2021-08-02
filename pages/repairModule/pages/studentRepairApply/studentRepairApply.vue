<template>
<view class="page">
  <view class="page__bd box">

      <view class="weui-cells weui-cells_after-title myui-cell">
		  <view v-if="statc==1">
          <navigator url="../selectRoom/selectRoom"   class="weui-cell weui-cell_access" hover-class="weui-cell_active">
              <view class="weui-cell__bd" style="font-family: emoji;">房间：{{pageObj.roomName != null  ? pageObj.roomName : '请选择'}}</view>
              <view class="weui-cell__ft weui-cell__ft_in-access"></view>
          </navigator>
		  </view>
		<view  v-else class="weui-cell weui-cell_access">
		    <view class="weui-cell__bd" style="font-family: emoji;">房间：{{pageObj.roomName}}</view>
		</view>
		
          <!-- <block wx:if="{{userInfoCach.role==3 || pageObj.roomName == null}}">
            <navigator url="../selectRoom/selectRoom" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
              <view class="weui-cell__bd">房间：{{pageObj.roomName != null ? pageObj.roomName : '请选择'}}</view>
              <view class="weui-cell__ft weui-cell__ft_in-access"></view>
            </navigator>
          </block> -->
          <!-- <block wx:else>
            <navigator url="" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
              <view class="weui-cell__bd">房间：{{pageObj.roomName != null ? pageObj.roomName : '暂无'}}</view>
            </navigator>
          </block> -->
          <view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
              <view class="weui-cell__bd"style="font-family: emoji;" >申请人：{{pageObj.name}}</view>
          </view>
		  <view class="weui-cell weui-cell_access" hover-class="weui-cell_active">	   
		  </view>
		  <view class="weui-cell__bd"  hover-class="weui-cell_active">
		  	 <picker mode="selector" @change="bindSelectType" :value="typeIndex" :range="typeNameLists">
		  	   <!-- <view wx:if="{{personLists.length==0}}" class="weui-select weui-select_in-select-after weui-cell__ft">请选择</view> -->
		  	   <view class="weui-select weui-select_in-select-after ">
		  	       <text>维修工种：</text>
		  	   {{typeNameLists[typeIndex]}} </view>
		  	 </picker>
		  </view>
		  <view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
		  </view>
	 <view class="weui-cell__bd"  hover-class="weui-cell_active">
		 <picker mode="selector" @change="bindSelectPerson" :value="personIndex" :range="personNameLists">
		   <!-- <view wx:if="{{personLists.length==0}}" class="weui-select weui-select_in-select-after weui-cell__ft">请选择</view> -->
		   <view class="weui-select weui-select_in-select-after ">
		       <text>维修人员：</text>
		   {{personNameLists[personIndex]}}</view>
		 </picker>
	</view>
		<!--  <view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
		      <view class="weui-cell__bd">维修人员：{{pageObj.name}}</view>
		  </view> -->
          <view class="weui-cell weui-cell_input">
            <view class="weui-cell__hd">联系电话：</view>
            <view class="weui-cell__bd">
              <input class="weui-input" placeholder="请输入联系电话" @blur="inputMobile" :value="pageObj.mobile"></input>
            </view>
          </view>
      </view>
      <!-- 问题描述 -->
      <view class="page-body myui-cell">
        <view class="page-section">
          <view class="textarea-wrp">
            <view class="myui-text">报修描述(必填)：</view>
            <textarea @input="bindTextAreaBlur" placeholder="请描述故障现象" auto-height maxlength="140" style="width: 100%"></textarea>
          </view>
        </view>
      </view>
      <!-- 上传图片 -->
      <view class="weui-cell centerBackground myui-cell" style="margin-top: 20px;">
        <view class="weui-cell__bd">
            <view class="weui-uploader">
              <view class="weui-uploader__hd">
                  <view class="weui-uploader__title">现场图片上传（必填）</view>
                  <!-- <view class="weui-uploader__info">{{files.length}}/2</view> -->
              </view>
              <view class="weui-uploader__bds">
                  <view class="weui-uploader__files" id="uploaderFiles">
                      <block v-for="(item, index) in files" :key="index">
						  <view class="weui-uploader__file" style=" width: 80px;margin-top: -27px;" @tap="previewImage" :id="item" :data-ind="index" >  
					     	<view class="close" @click.stop="close" :data-ind="index">
								<image :src="img[index]"  class="closes"></image>
							 </view>     
                                <img  class="weui-uploader__img" :src="item" />
                         </view>
                      </block>
                  </view>
                  <view class="weui-uploader__input-box">
                      <view class="weui-uploader__input" @tap="chooseImage"></view>
                  </view>
              </view>
            </view>
        </view>
      </view>
     
    </view>
    <!-- 提交按钮 -->
    <view class="page__bd page__bd_spacing button_top">
      <button class="weui-btn" type="primary" :disabled="disabled" form-type="submit" @tap="confirmApply">提交申请</button>
    </view>
</view>
</template>
<script>
var app = getApp();
var Util = require("../../resources/utils/utils.js");
var Images = require("../../resources/utils/imageUrl.js");
// var selectFileImage=require("../../resources/utils/uploadImage.js");
export default {
  data() {
    return {
      pageObj: {},
      //页面显示对象
      files: [],
      //图片数组
      imageBase64: [],
      inputText: '',
      userInfoCach: {},
      deviceType: {},
      roomId: '',
      // 选中的房间id
      index: 0,
      roomObj: {},
      // 宿管选择房间后返回
      disabled: false,
	  statc:'',
	  img:[Images.icClose,Images.icClose],
      typeLists: [],
      // 工种查询list
      typeNameLists: [],
      // 工种类型list
      typeIndex: 0,
      // 选中了第几个
      personLists: [],
      // 根据工种查询人员列表
      personNameLists: [],
      // 人员姓名列表
      personIndex: 0,
	  worker:[],
	  id:'',
	  workId:''
    };
  },

  /**
   * 生命周期函数--监听页面显示
   * 
   */

  onLoad: function () {
    console.log('------------------------报修申请------------------------');
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
	if(userInfoCach.role==3){
		this.setData({
			statc:1
		})
	}
    let obj = {};
    obj.name = userInfoCach.name;
    obj.mobile = userInfoCach.mobile;
     console.log(userInfoCach.roomInfo)
    if (userInfoCach.roomInfo) {
      obj.roomName = userInfoCach.roomInfo.buildName + ' -' + userInfoCach.roomInfo.roomName;
      obj.roomId = userInfoCach.roomInfo.roomId;
    } else {
      obj.roomName = userInfoCach.role == 3 ? '请选择' : '暂无';
      obj.roomId = '';
    } // 初始化设备名称

  this.selection()
    if (!app.globalData.PublicUtil.isNotEmpty(this.deviceType)) {
      let deviceType = {};
      deviceType.name = '空调电表';
      deviceType.id = 5;
      this.setData({
        deviceType: deviceType
      });
    }
    this.setData({
      userInfoCach: userInfoCach,
      pageObj: obj
    });
  },
  onShow: function () {
    console.log("roomObj - ", this.roomObj);
		uni.$on('updatedData',this.updatedData)

    if (JSON.stringify(this.roomObj) == "{}") {
      return;
    }

    let obj = this.pageObj;
    let roomArr = this.roomObj.name
   console.log(roomArr)
    if (roomArr.length > 0) {
      obj.roomName = roomArr
      obj.roomId = this.roomObj.id;
    } else {
      obj.roomName = '暂无';
      obj.roomId = '';
    }

    this.setData({
      pageObj: obj
    });
  },
  methods: {
		updatedData(e){
			this.roomObj = e.roomObj
		},
    selectModel: function () {
      let _this = this;

      wx.showActionSheet({
        itemList: ['空调电表', '其它'],
        success: function (res) {
          if (!res.cancel) {
            let deviceType = {};
             if (res.tapIndex == 0) {
              deviceType.name = '空调电表';
              deviceType.id = 5;
            } else if (res.tapIndex == 1) {
              deviceType.name = '其它';
              deviceType.id = 0;
            }

            _this.setData({
              deviceType: deviceType
            });
          }
        }
      });
    },
    inputMobile: function (e) {
      var obj = this.pageObj;
      obj.mobile = e.detail.value;
      this.setData({
        pageObj: obj
      });
    },
    // 报修描述输入
    bindTextAreaBlur: function (e) {
      this.setData({
        inputText: e.detail.value
      });
    },

    /**
     * 点击照相机，选择要上传的图片或进行拍照
     * 1. 点击拍摄
     * 2. 点击从相册里选择
     */
    chooseImage: function (e) {
      var _this = this;
         console.log(_this.files.length)
      if (_this.files.length < 2) {
        //选项集合
		      console.log(e.platform)
        let itemList;
        if (e.platform == 'android') {
          itemList = ['拍摄', '从相册中选择', '取消'];
        } else {
          itemList = ['拍摄', '从相册中选择'];
        }
        uni.showActionSheet({
          itemList: itemList,
          success: function (res) {
            if (res.tapIndex == '0') {
              _this.takeCamera();
            } else if (res.tapIndex == '1') {
              _this.takePhoto();
            }
          }
        });
      } else {
        app.globalData.ShowMsgUtil.showErrorModal('只能传两张！', '超过上传图片的个数');
      }
    },
	close:function(e){
		 this.files.splice(e.currentTarget.dataset.ind,1)
	     this.imageBase64.splice(e.currentTarget.dataset.ind,1)
	
	},
    // 照相机
    takeCamera: function (e) {
      var _this = this;
      
      wx.chooseImage({
        count: 1,
        sizeType: ['original'],
        sourceType: ['camera'],
        success(res) {
          const src = res.tempFilePaths[0];
		  console.log(src)
          _this.chageBase64(src);
       
          _this.setData({
            files: _this.files.concat(res.tempFilePaths)
          });
        },
       
        fail: function (res) {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },



    // 从相册里选择
    takePhoto: function (e) {
      let _this = this;

      wx.chooseImage({
        count: 1,
        sizeType: ['original'],
        sourceType: ['album'],
        success(res) {
			console.log(res);
			let img =_this.img
          const src = res.tempFilePaths[0];
					console.log(res)
					// 判断上传图片格式
					let imgType = res.tempFiles[0].name.substring(res.tempFiles[0].name.lastIndexOf('.')+1)
					if(imgType != 'jpg' && imgType != 'png'){
						app.globalData.ShowMsgUtil.showErrorModal('上传失败','上传图片只能是 jpg、png格式!')
						return
					}									
          _this.chageBase64(src); // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.setData({
            files: _this.files.concat(res.tempFilePaths)
          });
        },
        fail: function (res) {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
	
    previewImage: function (e) {
      wx.previewImage({
        current: e.currentTarget.id,
        // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
       
      });
    },


    /**
     * 图片转码
     */
    chageBase64: function (src) {
      var _this = this;
			let reBase64 = ''
			let {
				pathToBase64
			} = app.globalData.base64Util
			pathToBase64(src)
				.then(base64 => {
					reBase64 = base64
					let reg = new RegExp('data:image/png;base64,', "g")
					let regs =  new RegExp('data:image/jpeg;base64,', "g")
					var Base641 = reBase64.replace(reg, "");
					var Base642 = Base641.replace(regs,'')
					let i = _this.imageBase64.length;
					  console.log(i)
					_this.setData({
						['imageBase64[' + i + ']']: Base642
					});
				})
				.catch(error => {
					console.error(error)
					return
				})
    },
	//选择维修工人员
     selection:function(){
		 let _this=this
	         let listArr = ['全部']
		 const userInfoCach = app.globalData.StorageUtil.get('userInfoCach')
		    console.log(userInfoCach)
		   let roomId = userInfoCach.roomInfo.roomId
		   console.log(roomId)
		 wx.request({
			 url:app.globalData.RequestUrl.repairRequestUrl.selectAllWorker ,
			 method:'GET',
			 data:{
				 positionRoomId:roomId
			 },
			 header:{
				 'token': userInfoCach.token,
				 'content-type': 'application/json' //默认值
			 },
			 success:function(res) {
			 	console.log(res.data)
				if(res.data && res.data.code==200){
					_this.setData({
						worker:res.data.rows
					})
					let array = []	
					if (res.data.rows.length > 0) {
					  for (let i = 0; i < res.data.rows.length; i++) {
					     array[i] = res.data.rows[i].name;//取工种
					  }
					  	 // _this.requestSelectAllPerson(res.data.rows[0].id);
					} else {
					  array = ['暂无'];
					}	
					listArr.push(...array);
					_this.setData({
						typeLists: res.data.rows,
					   typeNameLists: listArr
					});
					console.log(listArr);
					
				}else{
					
				}
		
			 },
			 fail: function () {
			   _this.setData({
			     disabled: false
			   });
			 
			   app.globalData.ShowMsgUtil.showNoneToastByFail();
			 }
			 
		 })
	
	 },
		 //选择工种
	 bindSelectType: function (e) {
		  let listArr = ["全部"];
		  let listArrs=[]
		  let listArrss=[]
		  let workid=this.typeLists[e.detail.value-1].id
	     this.setData({
	     typeIndex: e.detail.value,
		 workId:workid
	   });

	   if(this.worker[this.typeIndex-1]){
		   	let arrays = []	
			let id=[]
		   if (this.worker[this.typeIndex-1].worker.length > 0) {
		     for (let i = 0; i <this.worker[this.typeIndex-1].worker.length; i++) {
		        arrays[i] =this.worker[this.typeIndex-1].worker[i].nameOfMaintain;
				id[i]=this.worker[this.typeIndex-1].worker[i].idOfMaintain;	 
		     }
			 }	 else {
			   arrays = ['暂无'];
			 }	
             listArr.push(...arrays);
			 listArrs.push(...id);

		    this.setData({
			personNameLists :listArr,
			personLists:listArrs
			})
	   }
	 },
	 //选择人员
	 bindSelectPerson: function (e) {
		 console.log(e)
	   this.setData({
	     personIndex: e.detail.value
	   });
	  
	   if(this.personIndex){
		   let sex=this.personIndex-1
		    this.setData({
				id: this.personLists[sex]
			})
	   }
	 },
    /**
     * 提交报修申请
     */
    confirmApply: function () {
		 var _this = this;
	app.globalData.ShowMsgUtil.netErrNotice();
	 app.globalData.ShowMsgUtil.showLoadToast("正在申请...",200);
	 const userInfoCach = app.globalData.StorageUtil.get('userInfoCach')
	 let id=_this.id
      let {
        disabled
      } = this;
	if (_this.typeIndex == 0) {
	  app.globalData.ShowMsgUtil.showErrorModal('请求失败', '工种不能为空！');
	  disabled = false;
	  return;
	}
	if (_this.id == '') {
	  app.globalData.ShowMsgUtil.showErrorModal('请求失败', '人员不能为空！');
	  disabled = false;
	  return;
	}
      if(!_this.disabled){
		  _this.setData({
			  disabled:false
		  })
			  wx.request({
			    url: app.globalData.RequestUrl.repairRequestUrl.saveRepairs,
			    data: {
			      repairApplyName: _this.pageObj.name,
			  		  maintainId:id,
			      repairApplyPhone: _this.pageObj.mobile,
			      deviceTypeId:_this.workId,
			      repairDesc: _this.inputText,
			      positionRoomId: _this.pageObj.roomId,
			      imglist: _this.imageBase64
			    },
			    method: 'POST',
			    header: {
			      'token': userInfoCach.token,
			      'content-type': 'application/json' //默认值
			    },
			    success: function (res) {
			      console.log('报修申请返回', res.data);
			      if (res.data && res.data.code == 200) {
			        app.globalData.ShowMsgUtil.showSuccessToast("申请成功", 100);
			        app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.successPageUrl + '?value=' + res.data.rows + '&title=你的报修编号为', 500);
			      } else {
			        _this.setData({
			          disabled: false
			        });
			  
			        app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
			        return;
			      }
			    },
			    fail: function () {
			      _this.setData({
			        disabled: false
			      });
			  
			      app.globalData.ShowMsgUtil.showNoneToastByFail();
			    }
			  });
		  setTimeout(function(){
			 _this.setData({
				   disabled:true
			 },5000)
		  })
	  }


    }
  }
};
</script>
<style>
@import "./studentRepairApply.css";
</style>
