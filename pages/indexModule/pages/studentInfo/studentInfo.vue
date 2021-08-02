<template>
<view class="page-body">
	<view class="pagehead">
		<image :src="usrInfo.picture?usrInfo.picture: imageUrl.admin1" class="userPic"></image>
	</view>
	<view class="content">
		<view v-for="(title, index) in usrInfo" :key="index" class="weui-list" @tap="phoneCell" :data-phone="title" :data-index="index">
			<text class="weui-left">{{userInfoTitle[index]}}：</text>
			<text class="weui-right" :style="' color:' + (index == 6 ?'#20A4F7':'#999')">{{title}}</text>
		</view>
		
	</view>
	
	
</view>
</template>

<script>
var app = getApp();
var imageUrl = require("../../../common/resources/imageUrl.js");

export default {
  data() {
    return {
      imageUrl: imageUrl,
      userInfoTitle: ['姓名', "学号", "性别", "班级", "专业", "院系", "手机号", "地址"],
      usrInfo: [],
      userPhone: 0
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    console.log(options);
		if(options.classtype){
			if(options.classtype == -1){
				uni.setNavigationBarTitle({
					title:'学生管理-学生信息'
				})
			}else{
				uni.setNavigationBarTitle({
					title:'班级管理-班级-学生信息'
				})
			}
		}
		

    if (options.studentid != undefined) {
      this.getStudentDetail(options.studentid);
    }
  },
  onShow: function () {},
  methods: {
    getStudentDetail: function (userId) {
      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getStudentDetail + '?studentId=' + userId,
        // url: app.RequestUrl.baseRequestUrl.getStudentDetail + '?studentId=1701',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('学生详情信息返回', res.data);

          if (res.data && res.data.code == 200) {
            let obj = res.data.data;

            let usrInfo = _this.reduceData(obj);

            _this.setData({
              usrInfo
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
    reduceData: function (data) {
      let info = [];
      info[0] = data.username;
      info[1] = data.userCode;
      info[2] = data.sex;
      info[3] = data.className == null || data.className == "" ? "暂无" : data.className;
      info[4] = data.majorName == null || data.majorName == "" ? "暂无" : data.majorName;
      info[5] = data.collegeName == null || data.collegeName == "" ? "暂无" : data.collegeName, info[6] = data.mobile == null || data.mobile == "" ? "暂无" : data.mobile;
      info[7] = data.address == null || data.address == "" ? "暂无" : data.address;

      if (info[6] != "暂无") {
        this.setData({
          userPhone: info[6]
        });
      }

      return info;
    },
    phoneCell: function (e) {
      let index = e.currentTarget.dataset.index;
      let phone = e.currentTarget.dataset.phone;

      if (index == 6) {
        wx.makePhoneCall({
          phoneNumber: phone,

          success(res) {
            console.log(res);
          },

          fail(err) {
            console.log(err);
          }

        });
      }
    }
  }
};
</script>
<style>
@import "./studentInfo.css";
</style>