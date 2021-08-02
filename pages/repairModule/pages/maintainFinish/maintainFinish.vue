<template>
<view class="page">
  <view class="page__bd box">

    <!-- 问题描述 -->
    <!-- 维修描述 -->
    <view class="weui-cells weui-cells_after-title">
        <view class="">
            <view class="weui-cell__bd">
                <textarea class="weui-textareas" placeholder="请详细描述维修过程" style="height: 4.6em" @input="bindTextAreaBlur" maxlength="200"></textarea>
                <view class="weui-textarea-counter">{{cursor}}/200</view>
            </view>
        </view>
    </view>
    <!-- 维修原因 -->
    <view class="myui-cells__title">请选择维修原因（必填）</view>
    <view class="page__bd page__bd_spacing">
      <view class="weui-flex">
          <view class="weui-flex__item"><view :class="'placeholder ' + (reasonList[0].isSelect ? 'yes' : 'no')" data-id="0" @tap="selectReason">{{reasonList[0].name}}</view></view>
          <view class="weui-flex__item"><view :class="'placeholder ' + (reasonList[1].isSelect ? 'yes' : 'no')" data-id="1" @tap="selectReason">{{reasonList[1].name}}</view></view>
          <view class="weui-flex__item"><view :class="'placeholder ' + (reasonList[2].isSelect ? 'yes' : 'no')" data-id="2" @tap="selectReason">{{reasonList[2].name}}</view></view>
      </view>
      <view class="weui-flex">
          <view class="weui-flex__item"><view :class="'placeholder ' + (reasonList[3].isSelect ? 'yes' : 'no')" style="width:20%;" data-id="3" @tap="selectReason">{{reasonList[3].name}}</view></view>
      </view>
    </view>
    <!-- 上传图片 -->
    <view class="weui-cell centerBackground myui-cell">
      <view class="weui-cell__bd">
          <view class="weui-uploader">
            <view class="weui-uploader__hd">
                <view class="weui-uploader__title">拍照上传（选填）</view>
            </view>
            <view class="weui-uploader__bd ">
                <view class="weui-uploader__files" id="uploaderFiles">
                 <block v-for="(item, index) in files" :key="index"  >
                 						  <view class="weui-uploader__file" style=" width: 80px;" @tap="previewImage" :id="item" :data-ind="index" >  
                   <input   style="margin-top: -37px;" type="file" accept="image/*" id="uploadImage" capture="camera" onchange="selectFileImage(this);" />
                    	<view class="close" @click.stop="close" :data-ind="index">
                 								<image :src="img[index]"  class="closes"></image>
                 							 </view>     
                           <img  alt="preview" :src="item" id="index" class="weui-uploader__img"/>
                    </view>
                 </block>
                </view>
                <view class="weui-uploader__input-box" style="margin-top: 13px;">
                    <view class="weui-uploader__input" @tap="chooseImage"></view>
                </view>
            </view>
          </view>
      </view>
    </view>
     
    </view>
    <!-- 提交按钮 -->
    <view class="page__bd page__bd_spacing button_top">
      <button class="weui-btn" type="primary" :disabled="disabled" form-type="submit" @tap="confirmFinish">维修完成</button>
    </view>

</view>
</template>

<script>
var app = getApp();
var Util = require("../../resources/utils/utils.js");
var Images = require("../../resources/utils/imageUrl.js");
var selectFileImage=require("../../resources/utils/uploadImage.js");
export default {
  data() {
    return {
      files: [],
      //图片数组
      imageBase64: [],
	   img:Images.icClose,
      inputText: '',
      reasonList: [{
        id: 0,
        name: '自然损耗',
        isSelect: true
      }, {
        id: 1,
        name: '有意破坏',
        isSelect: false
      }, {
        id: 2,
        name: '操作不当',
        isSelect: false
      }, {
        id: 3,
        name: '其他',
        isSelect: false
      }],
      cursor: 0,
      // 维修过程的输入字数
      repairCode: '',
      disabled: false,
	   img:[Images.icClose,Images.icClose],
    };
	
  },
	 
  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------------------------维修完成------------------------');
    this.setData({
      repairCode: options.repairCode
    });
  },
  methods: {
    /**
     *  维修原因
     */
    selectReason: function (e) {
      let list = this.reasonList;
      let clickId = e.currentTarget.dataset.id;

      for (let i = 0; i < list.length; i++) {
        list[i].isSelect = false;
      }

      for (let i = 0; i < list.length; i++) {
        if (list[i].id == clickId) {
          list[i].isSelect = true;
        }
      }

      this.setData({
        reasonList: list
      });
    },
    // 报修描述输入
    bindTextAreaBlur: function (e) {
      this.setData({
        cursor: e.detail.cursor,
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

      if (_this.files.length < 2) {
        //选项集合
        let itemList;

        if (e.platform == 'android') {
          itemList = ['拍摄', '从相册中选择', '取消'];
        } else {
          itemList = ['拍摄', '从相册中选择'];
        }

        wx.showActionSheet({
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
    // 照相机
    takeCamera: function (e) {
      var _this = this;

      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera'],

        success(res) {
          const src = res.tempFilePaths[0];

          _this.chageBase64(src);

          _this.setData({
            files: _this.files.concat(res.tempFilePaths)
          });
        },

        fail: function (res) {
          app.globalData.ShowMsgUtil.showErrorModal('请稍后再试', '选择图片失败！');
        }
      });
    },
    // 从相册里选择
    takePhoto: function (e) {
      let _this = this;

      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album'],

        success(res) {
          const src = res.tempFilePaths[0];

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
        urls: this.files //需要预览的图片http链接列表

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
					
					// console.log(base64)
					reBase64 = base64
					let reg = new RegExp('data:image/png;base64,', "g")
					let regs =  new RegExp('data:image/jpeg;base64,', "g")
					var Base641 = reBase64.replace(reg, "");
					var Base642 = Base641.replace(regs,'')
					let i = _this.imageBase64.length;
					
					_this.setData({
						['imageBase64[' + i + ']']: Base642
					});
					
				})
				.catch(error => {
					console.error(error)
					return
				})
    },

	close:function(e){
		 console.log(e);
		 console.log(this.files);
		 console.log(this.files.length);
	     this.files.splice(e.currentTarget.dataset.ind,1)
	     this.imageBase64.splice(e.currentTarget.dataset.ind,1)
	},
    /**
     * 维修完成
     */
    confirmFinish: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

      let repairReasons = _this.dealReason(_this.reasonList);

      if (_this.inputText == '') {
        app.globalData.ShowMsgUtil.showErrorModal('请求失败', '描述不能为空！');
        return;
      }

      if (repairReasons == '') {
        app.globalData.ShowMsgUtil.showErrorModal('请求失败', '原因不能为空！');
        return;
      }

      _this.setData({
        disabled: true
      });

      app.globalData.ShowMsgUtil.showLoadToast("正在申请...");
      wx.request({
        url: app.globalData.RequestUrl.repairRequestUrl.repairFinish,
        data: {
          repairCode: _this.repairCode,
          // 编号
          repairRemarks: _this.inputText,
          // 维修描述
          repairReasons: repairReasons,
          // 维修原因
          repairImglist: _this.imageBase64 // 图片

        },
        method: 'POST',
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        success: function (res) {
          console.log('确认拒绝返回', res.data);

          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessToast("操作成功", 2000);
            app.globalData.StorageUtil.set('tabBarIndex', 1);
            app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.repairPageUrl.index, 2000);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideLoading({});
        }
      });
    },
    dealReason: function (reasonList) {
      let repairReasons = '';

      for (let i = 0; i < reasonList.length; i++) {
        if (reasonList[i].isSelect) {
          repairReasons = reasonList[i].id + 1;
        }
      }

      return repairReasons;
    }
  }
};
</script>
<style>
@import "./maintainFinish.css";
</style>