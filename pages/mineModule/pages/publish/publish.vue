<template>
<view class="page">
    
    <view class="weui-cells weui-cells_after-title topC">
        <view class="weui-cell weui-cell_input">
            <view class="weui-cell__bd">
              <input class="weui-input" placeholder="点击输入标题（不超过30字）" @input="inputTitleFun" maxlength="30"></input>
            </view>
        </view>
    </view>

    <view class="weui-cells">
      <view class="weui-cell border-topB">
          <view class="weui-cell__bd">
              <textarea class="weui-textarea" placeholder="点击输入文字（不超过1000字）" style="height: 7.8em" @input="inputContentFun"></textarea>
          </view>
      </view>
    </view>

    <view class="weui-cell centerBackground ">
        <view class="weui-cell__bd">
            <view class="weui-uploader">
                <view class="weui-uploader__hd">
                  图片（选填）
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

  <view class="page__bd topC"> 
    <view class="weui-cells weui-cells_after-title" @tap>
      <navigator url="/pages/mineModule/pages/received/received" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <view class="weui-cell__bd">接收人</view>
        <view class="weui-cell__ft weui-cell__ft_in-access reviecerFontStyle">{{reviecer}}</view>
      </navigator>
    </view>
  </view>

  <view class="page__bd page__bd_spacing top">
      <button class="weui-btn" type="primary" @tap="sendToNotice">发送</button>
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
      inputTitle: '',
      inputContent: '',
      receiveCach: [],
      reviecer: ''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
    console.log('------------------------发布公告------------------------');
    let recevierArr = app.globalData.StorageUtil.get('receiveCach');
    let reviecer = recevierArr[0].name;
    this.setData({
      reviecer
    });
  },
  methods: {
    inputTitleFun: function (e) {
      this.setData({
        inputTitle: e.detail.value
      });
    },
    inputContentFun: function (e) {
      this.setData({
        inputContent: e.detail.value
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

        fail: function (res) {// app.ShowMsgUtil.showErrorModal('请稍后再试', '选择图片失败！');
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

        fail: function (res) {// app.ShowMsgUtil.showErrorModal('请稍后再试', '选择图片失败！');
        }
      });
    },

    /**
     * 图片转码
     */
    chageBase64: function (src) {
      var _this = this;

      wx.getFileSystemManager().readFile({
        filePath: src,
        //选择图片返回的相对路径
        encoding: 'base64',
        //编码格式
        success: function (res) {
          //成功的回调
          let i = _this.imageBase64.length;

          _this.setData({
            ['imageBase64[' + i + ']']: res.data
          });
        }
      });
    },
    sendToNotice: function () {
      var _this = this;

      app.globalData.ShowMsgUtil.showLoadToast('发布中', 3000); // 从缓存中获取接收人

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      var recevie = [];

      if (app.globalData.StorageUtil.get('receiveCach')) {
        recevie = app.globalData.StorageUtil.get('receiveCach');
        console.log('接收人', app.globalData.StorageUtil.get('receiveCach'));
      } else {
        app.globalData.ShowMsgUtil.showErrorModal('请重新选择！', '选择接收人失败');
        return;
      } // 处理数据


      var checkboxItems = [];

      for (let i = 0; i < recevie.length; ++i) {
        let partment = {};
        partment.id = recevie[i].id;
        partment.type = recevie[i].type;
        checkboxItems[i] = partment;
      }

      if (!_this.inputTitle || !_this.inputContent || _this.receiveCach.length == 0) {
        wx.hideToast({});
        app.globalData.ShowMsgUtil.showErrorModal('请填写完整', '都为必填项！');
        return;
      } // 发布公告请求


      this.appSendRequest(userInfoCach, checkboxItems);
    },
    appSendRequest: function (userInfoCach, checkboxItems) {
			app.globalData.ShowMsgUtil.netErrNotice();
      var isSuccess = false;

      var _this = this;

      console.log('checkboxItems', checkboxItems);
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.appSendToMany,
        data: {
          'title': _this.inputTitle,
          'sender': userInfoCach.name,
          'content': _this.inputContent,
          'receivers': checkboxItems,
          'base64String': _this.imageBase64
        },
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' // 默认值

        },
        method: 'POST',

        success(res) {
          isSuccess = true;
          console.log('发布公告返回', res.data);

          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessAndReturn('公告发布成功！', 2000);
            app.globalData.StorageUtil.remove('receiveCach');
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },

        fail: function () {
          if (!isSuccess) {
            setTimeout(function () {
              app.globalData.ShowMsgUtil.showErrorModal('发布失败', '后台连接未成功');
            }, 20000);
          }

          app.globalData.ShowMsgUtil.showErrorModal('发布失败', '公告发送失败');
        },
        complete: function () {
          wx.hideToast({});
        }
      });
    }
  }
};
</script>
<style>
@import "./publish.css";
</style>