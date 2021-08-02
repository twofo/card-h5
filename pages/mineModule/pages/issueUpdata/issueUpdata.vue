<template>
<view class="page "> 

  <view class="page__bd">
  <view class="weui-cells__title">问题描述（必填）200以内</view>
    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell">
          <view class="weui-cell__bd">
              <textarea class="weui-textarea" placeholder="请输入文本" style="height: 5.8em" @input="getProblem" maxlength="140"></textarea>
              <!-- <view class="weui-textarea-counter">0/200</view> -->
          </view>
      </view>
    </view>
  </view>
   

  <view class="weui-cells">
      <view class="weui-cell">
          <view class="weui-cell__bd">
              <view class="weui-uploader">
                  <view class="weui-uploader__hd">
                      <view class="weui-uploader__title">拍照上传（选填）</view>
                      <!-- <view class="weui-uploader__info">{{files.length}}/2</view> -->
                  </view>
                  <view class="weui-uploader__bd">
                      <view class="weui-uploader__files" id="uploaderFiles">
                          <block v-for="(item, index) in files" :key="index">
                              <view class="weui-uploader__file" @tap="previewImage" :id="item">
                                  <image class="weui-uploader__img" :src="item" mode="aspectFill"></image>
                              </view>
                          </block>
                      </view>
                      <view class="camera">
                        <image class="weui-uploader__img" :src="mineImageUrl.camera" @tap="chooseImage"></image> 
                      </view>
                  </view>
              </view>
          </view>
      </view>
  </view> 

  <view class="page__bd">
  <view class="weui-cells__title">联系电话（选填）</view>
  <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell weui-cell_input">
          <view class="weui-cell__hd">
              <view class="weui-label">电话号码</view>
          </view>
          <view class="weui-cell__bd">
              <input class="weui-input input-group" placeholder="方便技术人员与你联系" @blur="getPhone" maxlength="11"></input>
          </view>
      </view>
  </view>
  </view>

  <view class="page__bd page__bd_spacing">
    <button class="weui-btn page_submit" type="primary" :disabled="disabled" @tap="submitIssue">立即提交</button>
  </view>

</view>
</template>

<script>
var app = getApp();
var mineImageUrl = require("../../resources/utils/imageUrl.js");

export default {
  data() {
    return {
      mineImageUrl: mineImageUrl,
      files: [],
      imageBase64: [],
      problemDetail: '',
      phone: '',
      disabled: false
    };
  },

  components: {},
  props: {},
  methods: {
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
					console.log(res)
					let imgType = res.tempFiles[0].name.substring(res.tempFiles[0].name.lastIndexOf('.')+1)
					if(imgType != 'jpg' && imgType != 'png'){
						app.globalData.ShowMsgUtil.showErrorModal('上传失败','上传图片只能是 jpg、png格式!')
						return
					}
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
					console.log(res)
          const src = res.tempFilePaths[0];
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
    getProblem: function (e) {
      let _this = this;

      _this.setData({
        problemDetail: e.detail.value
      });
    },
    getPhone: function (e) {
      let _this = this;

      _this.setData({
        phone: e.detail.value
      });
    },

    /**
     * 图片转码
     */
    chageBase64: function (src) {
      var _this = this;

			// const arrayBuffer = uni.base64ToArrayBuffer(src)
			// const base64 = uni.arrayBufferToBase64(arrayBuffer)
			
			// let i = _this.imageBase64.length;
			
			// _this.setData({
			// 	['imageBase64[' + i + ']']: base64
			// });
	
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
      // wx.getFileSystemManager().readFile({
      //   filePath: src,
      //   //选择图片返回的相对路径
      //   encoding: 'base64',
      //   //编码格式
      //   success: function (res) {
      //     //成功的回调
      //     let i = _this.imageBase64.length;

      //     _this.setData({
      //       ['imageBase64[' + i + ']']: res.data
      //     });
      //   }
      // });
    },
    // 提交反馈
    submitIssue: function (e) {
      this.setData({
        disabled: true
      });
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
						app.globalData.ShowMsgUtil.netErrNotice();
      var _this = this;

      if (!_this.problemDetail) {
        app.globalData.ShowMsgUtil.showErrorModal('请填写完整', '问题描述不能为空！');
        this.setData({
          disabled: false
        });
        return;
      }

      if (_this.phone && !/^1[34578]\d{9}$/.test(_this.phone)) {
        app.globalData.ShowMsgUtil.showErrorModal('请重新填写', '手机号码格式不确定！');
        this.setData({
          disabled: false
        });
        return;
      }

      this.setData({
        disabled: true
      });
      app.globalData.ShowMsgUtil.showLoadToast("正在申请...");
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.feedback,
        data: {
          "question": _this.problemDetail,
          "telephone": _this.phone,
          "imgUrl": _this.imageBase64
        },
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',
        success: function (res) {
          wx.hideToast();
          console.log('意见反馈返回', res.data);

          if (res.data && res.data.code == 200) {
            // app.globalData.ShowMsgUtil.showSuccessAndReturn('反馈提交成功！', 2000);
						
          } else {
            this.setData({
              disabled: false
            });
            app.globalData.ShowMsgUtil.showErrorModal('请稍后再试！', '反馈提交失败！');
          }
        },
        fail: function (res) {
          wx.hideToast();
          this.setData({
            disabled: false
          });
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    }
  }
};
</script>
<style>
@import "./issueUpdata.css";
</style>