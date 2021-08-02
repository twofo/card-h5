<template>
<view class="page">
  <view class="page__bd myui-page">

    <!-- 维修评价 -->
    <view class="myui-cells">
      <view class="myui-cell myui-center">
        <text class="myui-cell__title">你对本次服务满意吗？</text>
      </view>
      <!-- 中间 -->
      <view class="myui-cell">
        <view class="weui-cell myui-cell__box">
        
          <view class="weui-cell__hd" style="position: relative;margin-right: 10px;">
            <image src="/static/images/mine/role_teacher.png" style="width: 50px; height: 50px; display: block;"></image>
          </view>
          <view class="weui-cell__bd">
            <view>{{nameOfMaintainer}}(维修工)</view>
          </view>

          <view class="myui-select weui-cells_after-title">
            <checkbox-group @change="checkboxChange">
                <label v-for="(item, index) in checkboxItems" :key="index" class="weui-cell weui-check__label">
                    <checkbox class="weui-check" :value="item.value" :checked="item.checked"></checkbox>

                    <view class="weui-cell__hd weui-check__hd_in-checkbox">
                    <!--    <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
                        <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="item.checked"></icon> -->
                    </view>
                  <!--  <view class="weui-cell__bd">{{item.name}}</view> -->
                </label>
            </checkbox-group>
          </view>

        </view>
              
      </view>
      <!-- 五星 -->
      <view class="myui-cell myui-center">
        <radio-group @change="radioChange">
          <label v-for="(item, index) in radioItems" :key="index">
              <radio class="weui-check" type="number"  :value="item.value" :checked="item.checked"></radio>
              <view class="iconfont">
                <image :src="item.classname" class="star"></image>
              </view>
          </label>
        </radio-group>
      </view>

    </view>

    <!-- 评价描述 -->
    <view class="page-body myui-celll">
      <view class="page-section">
        <view class="textarea-wrp">
          <view class="myui-text">评价描述： <text style="color:#aaa;">请输入本次服务评价描述</text></view>
          <textarea @input="bindTextAreaBlur" auto-height style="width:100%;"></textarea>
        </view>
      </view>
    </view>
    <!-- 上传图片 -->
    <view class="weui-cell centerBackground myui-celll">
      <view class="weui-cell__bd">
        <view class="weui-uploader">
          <view class="weui-uploader__hd">
              <view class="weui-uploader__title">拍照上传（选填）</view>
              <!-- <view class="weui-uploader__info">{{files.length}}/2</view> -->
          </view>
          <view class="weui-uploader__bd ">
              <view class="weui-uploader__files" id="uploaderFiles">
                <block v-for="(item, index) in files" :key="index"  >
                						  <view class="weui-uploader__file" style=" width: 80px;" @tap="previewImage" :id="item" :data-ind="index" >  
                  <input   style="margin-top: -38px;" type="file" accept="image/*" id="uploadImage" capture="camera" onchange="selectFileImage(this);" />
                   	<view class="close" @click.stop="close" :data-ind="index">
                								<image :src="img[index]"  class="closes"></image>
                							 </view>     
                          <img  alt="preview" :src="item" id="index" class="weui-uploader__img"/>
                   </view>
                </block>
              </view>
              <view class="weui-uploader__input-box" style="margin-top: 12px; ">
                  <view class="weui-uploader__input" @tap="chooseImage"></view>
              </view>
          </view>
        </view>
      </view>
    </view>
     
    <!-- 提交评价按钮 -->
    <view class="page__bd page__bd_spacing myui__btn-top">
      <button class="weui-btn" type="primary" :disabled="disabled" form-type="submit" @tap="confirmApply">确认提交</button>
    </view>

  </view>
</view>
</template>

<script>
var app = getApp();
var ImageUrl = require("../../resources/utils/imageUrl.js");
var selectFileImage=require("../../resources/utils/uploadImage.js");
export default {
  data() {
    return {
      repairCode: '',
      // 报修编号
      checkboxItems: [{
        name: '匿名评价',
        value: '0',
        checked: true
      }],
      // 是否匿名
      radioItems: [// 五星的数组
      {
        classname: ImageUrl.starOn,
        value: '1',
        checked: true
      }, {
        classname: ImageUrl.starOff,
        value: '2',
        checked: false
      }, {
        classname: ImageUrl.starOff,
        value: '3',
        checked: false
      }, {
        classname: ImageUrl.starOff,
        value: '4',
        checked: false
      }, {
        classname: ImageUrl.starOff,
        value: '5',
        checked: false
      }],
      stars: 1,
      files: [],
      // 图片数组
      imageBase64: [],
	  img:ImageUrl.icClose,
      inputText: '',
      // 评论描述
      nameOfMaintainer: '',
      // 维修工名称
      disabled: false,
	   img:[ImageUrl.icClose,ImageUrl.icClose],
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------------------------报修评论------------------------'); // console.log('选中报修单号', options.repairCode);
    // console.log('选中报修单号', options.nameOfMaintainer);

    this.setData({
      repairCode: options.repairCode,
      nameOfMaintainer: options.nameOfMaintainer
    });
  },
  methods: {
    checkboxChange: function (e) {
      // console.log('checkbox发生change事件，携带value值为：', e.detail.value);
      var checkboxItems = this.checkboxItems,
          values = e.detail.value;

      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false;

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (checkboxItems[i].value == values[j]) {
            checkboxItems[i].checked = true;
            break;
          }
        }
      }

      this.setData({
        checkboxItems: checkboxItems
      });
    },

    /**
     * 选择几星
     */
    radioChange: function (e) {
      var radioItems = this.radioItems;
   console.log(radioItems)
      for (var i = 0; i < e.detail.value; i++) {
        radioItems[i].checked = true;
        radioItems[i].classname = ImageUrl.starOn;
      }

      for (var j = e.detail.value; j < radioItems.length; j++) {
        radioItems[j].checked = false;
        radioItems[j].classname = ImageUrl.starOff;
      } // console.log('_this.data.stars', e.detail.value);

      this.setData({
        radioItems: radioItems,
        stars:  e.detail.value
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
	close:function(e){
		 console.log(e);
		 console.log(this.files);
		 console.log(this.files.length);
	 this.files.splice(e.currentTarget.dataset.ind,1)
	 this.imageBase64.splice(e.currentTarget.dataset.ind,1)
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
          app.globalData.ShowMsgUtil.showNoneToastByFail();
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

    /**
     * 提交报修申请
     */
    confirmApply: function () {
      var _this = this;

      if (_this.inputText == '') {
        app.globalData.ShowMsgUtil.showErrorModal('请求失败', '请填写评价描述');
        return;
      }

      if (_this.stars <= 0) {
        app.globalData.ShowMsgUtil.showErrorModal('请求失败', '至少要有一颗星');
        return;
      } // console.log('_this.data.stars', _this.data.stars);


      let data = {};
      data.hidden = _this.checkboxItems[0].checked ? 1 : 0;
      data.starsNumber = _this.stars;

      _this.setData({
        disabled: true
      });

      _this.request(data);
    },
    request: function (data) {
			app.globalData.ShowMsgUtil.netErrNotice();
      var _this = this;

      app.globalData.ShowMsgUtil.showLoadToast("正在评价...");
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.repairRequestUrl.saveComments,
        data: {
          hidden: data.hidden,
          commentRanks: data.starsNumber,
          commentDesc: _this.inputText,
          imglist: _this.imageBase64,
          commentName: userInfoCach.name,
          repairCode: _this.repairCode
        },
        method: 'POST',
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        success: function (res) {
          console.log('评论保存返回', res.data);

          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessToast("评价成功", 500);
            app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.successPageUrl, 500);
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
        },
        complete: function () {
          wx.hideToast();
        }
      });
    }
  }
};
</script>
<style>
@import "./studentRepairComment.css";
</style>