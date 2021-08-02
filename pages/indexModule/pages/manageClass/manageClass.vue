<template>
<view>
	<view class="weui-article" v-if="classList.classInfos.length>0">
		<h1 v-if="classList.schoolName != null">{{classList.schoolName}}</h1>
		<view v-for="(list, index) in classList.classInfos" :key="index" class="weliBox" 
				@tap="gotoClass" :data-classid="list.classId" :data-className="list.className" :data-number="list.studentNumberStr">
			<view> 
				<text class="className">{{list.className}}</text> 
				<text v-if="list.studentNumberStr">{{list.studentNumberStr}}</text> 
			</view>
			<view class="rightArrow" v-if="list.isHaveChild == 1"></view>
		</view>
	</view>
	<view class="nobody" v-else>暂无数据</view>
</view>
</template>

<script>
var app = getApp();
import wxlist from "../../../../components/common/wxList/wxList";

export default {
  data() {
    return {
      classList: {
				classInfos:[]
			}
    };
  },

  components: {
    wxlist
  },
  props: {},
  onLoad: function (options) {
    this.getClassInfo();
  },
  onShow: function () {},
  methods: {
    getClassInfo: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getClassInfo,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('班级管理返回', res.data);

          if (res.data && res.data.code == 200) {
            let obj = res.data.data;

            _this.setData({
              classList: obj
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
    gotoClass: function (e) {
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      let classId = e.currentTarget.dataset.classid;
      let className = e.currentTarget.dataset.classname;
      let number = e.currentTarget.dataset.number;
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.manageClassDetailUrl + "?classId=" + classId + "&classname=" + className + "&number=" + number, 500);
    }
  }
};
</script>
<style>
@import "./manageClass.css";
</style>