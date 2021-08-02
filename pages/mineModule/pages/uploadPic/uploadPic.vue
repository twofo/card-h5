<template>

	<view class="wx-content-info">
	<!-- 	<simple-crop :size="size" :src="imageSrc" 
								:cropSizePercent="cropSizePercent" 
								:borderColor="borderColor" 
								@cropUpload="uploadCallback" 
								@cropClose="closeCallback" 
								@cropCrop="cropCallback"></simple-crop> -->
		<avatar
			:bgImage="imgBg"
			selWidth="200px" selHeight="200px"  ref='avatar' fileType='png'
			:avatarSrc="imageSrc" @upload="myUpload" quality="1" inner=true
			avatarStyle="width: 200px; height: 200px; margin: 40px;">
		</avatar>
		
	</view>
</template>

<script>
var app = getApp();
var mineImageUrl = require("../../resources/utils/imageUrl.js");
import simpleCrop from "../../resources/components/simple-crop/index";
import avatar from "../../resources/components/yq-avatar/yq-avatar";

export default {
  data() {
    return {
      //修改处一：初始化图片
      imageSrc: '',
      size: {
        width: 400,
        height: 300
      },
      cropSizePercent: 0.9,
      borderColor: '#fff',
      result: '',
			imgBg: mineImageUrl.bgColorImg
    };
  },

  components: {
    simpleCrop,
		avatar
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    console.log('imageSrc--------');
		console.log(mineImageUrl.bgColorImg)
    console.log(options.imageSrc);
    var imageSrc = options.imageSrc;

    _this.setData({
      imageSrc: imageSrc
    });
  },
  methods: {
    //选取裁剪图片成功回调
    uploadCallback: function (event) {// console.log(event);
      // _this.setData({
      //   imageSrc: event.detail.src
      // })
    },
    //裁剪图片回调
    cropCallback: function (event) {
      this.setData({
        result: event.detail.resultSrc
      }); // wx.hideLoading()

      app.globalData.ShowMsgUtil.showSuccessToast('图片选择成功！', 2000);
      app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.minePageUrl.userDetail + '?pic=' + event.detail.resultSrc, 2000);
    },
    //关闭回调
    closeCallback: function (event) {
      console.log(event);
    }
  }
};
</script>
<style>
@import "./uploadPic.css";
</style>