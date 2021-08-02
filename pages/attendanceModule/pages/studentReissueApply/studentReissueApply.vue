<template>
<view class="page">
  <view class="page__bd topC">

    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell">
          <view class="weui-cell__bd">日期：</view>
          <view class="weui-cell__ft">{{signDetail.executeTimeS}}</view>
      </view>
      <view class="weui-cell">
          <view class="weui-cell__bd">当前打卡时间段：</view>
          <view class="weui-cell__ft">{{signDetail.startTimeS}} ~ {{signDetail.endTimeS}}</view>
      </view>
    </view>

    <view class="weui-cells">
      <view class="weui-cell border-topB">
          <view class="weui-cell__bd">
            <textarea class="weui-textarea" placeholder="点击输入补卡原因..." style="height: 5.8em" @input="getReason"></textarea>
          </view>
      </view>
    </view>

    <view class="weui-cell centerBackground ">
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
                    <image class="weui-uploader__img" :src="attendanceImageUrl.camera" @tap="chooseImage"></image> 
                  </view>
              </view>
            </view>
        </view>
    </view>

    <view class="page__bd topC"> 
      <view class="weui-cells weui-cells_after-title">
          <view class="weui-cell">
              <view class="weui-cell__bd">接收人</view>
              <view class="weui-cell__ft">{{signDetail.teacherName}}</view>
          </view>
      </view>
    </view>

    <view class="page__bd page__bd_spacing top">
        <button class="weui-btn" :disabled="disabled" type="primary" @tap="confirmApply">提交</button>
    </view>    
  
  </view>
</view>
</template>

<script>
var app = getApp();
var attendanceImageUrl = require("../../resources/utils/imageUrl.js");

export default {
  data() {
    return {
      attendanceImageUrl: attendanceImageUrl,
      signDetail: {},
      files: [],
      //图片数组
      imageBase64: [],
      //图片转码后的数组
      reasonDetail: '',
      //补卡原因
      disabled: false,
      isAgainApply: 0
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------------------------学生补卡申请------------------------');
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    let executePlanId = options.executePlanId;
    let isAgainApply = options.isAgainApply;

    if (executePlanId) {
      this.getComedyAttendInfo(userInfoCach, executePlanId);
    }

    if (isAgainApply) {
      this.setData({
        isAgainApply: isAgainApply
      });
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.isAgainApply);
    }
  },
  methods: {
    /**
     * 进入补签页面，查询补签详情并显示
     */
    getComedyAttendInfo: function (userInfoCach, executePlanId) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.getComedyAttendInfo + '?executePlanId=' + executePlanId,
        method: 'GET',
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        success: function (res) {
          console.log('查询补签详情并显示返回', res.data);

          if (res.data && res.data.code == 200) {
            let data = res.data.rows;
            data.startTimeS = app.globalData.PublicUtil.formatTimeTwo(data.startTime, 'h:m');
            data.endTimeS = app.globalData.PublicUtil.formatTimeTwo(data.endTime, 'h:m');
            data.executeTimeS = app.globalData.PublicUtil.formatTimeTwo(data.executeTime, 'Y-M-D');

            _this.setData({
              signDetail: data
            });
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    /**
     * 提交补卡申请 
     */
    confirmApply: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      let signDetail = this.signDetail;
      let time = new Date().getTime();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

      _this.setData({
        disabled: true
      });

      app.globalData.ShowMsgUtil.showLoadToast("正在申请...");
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.applyComedySign,
        data: {
          planId: signDetail.planId,
          executePlanId: signDetail.executePlanId,
          applyTime: time,
          userId: userInfoCach.userId,
          type: 30,
          //申请的类型(请假：31 补签：30)
          reason: _this.reasonDetail,
          files: _this.imageBase64,
          isAgainApply: this.isAgainApply
        },
        method: 'POST',
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        success: function (res) {
          console.log('提交补卡申请返回', res.data);

          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessAndReturn('补卡申请成功', 2000);
            wx.navigateBack({
              delta: 1
            });
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
          wx.hideToast({});
        }
      });
    },
    // 选择图片

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
          app.globalData.ShowMsgUtil.showErrorModal('请稍后再试', '选择图片失败！');
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
    getReason: function (e) {
      this.setData({
        reasonDetail: e.detail.value
      });
    }
  }
};
</script>
<style>
@import "./studentReissueApply.css";
</style>