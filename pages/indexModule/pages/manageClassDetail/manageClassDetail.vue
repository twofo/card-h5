<template>
<view>
	<view class="detailSearch">
		<searchinp placeholder="请输入名字" @mysearchValLen="mysearchVal"></searchinp>
	</view>
	<view class="detailList" v-if="lists.length >0">
		<view class="detailClassName" v-if="className">
			<text class="className">{{className}}</text>
			<text class="number" v-if="number != 'undefined'">{{number}}</text>
		</view>
		<wxlist :lists="lists" @detail="userDetail"></wxlist>
	</view>
	<view class="nobody" v-else>暂无成员</view>
</view>
</template>

<script>
var app = getApp();
import wxlist from "../../../../components/common/wxList/wxList";
import searchinp from "../../../../components/attendanceModule/searchAppiontPerson/searchAppiontPerson";

export default {
  data() {
    return {
      lists: [],
      className: '',
      number: 0,
      classId: 0,
			classType:-1,
    };
  },

  components: {
    wxlist,
    searchinp
  },
  props: {},
  onLoad: function (options) {
    console.log(options);

    if (options.classname != undefined) {
      var url = app.globalData.RequestUrl.baseRequestUrl.getStudentInfo + '?classId=' + options.classId; // var url = app.RequestUrl.baseRequestUrl.getStudentInfo + '?classId='+options.classId

      this.getStudentInfo(url);
      this.setData({
        className: options.classname,
        number: options.number,
        classId: options.classId,
				classType:1
      });
    } else {
      //从学生管理进来
      var url = app.globalData.RequestUrl.baseRequestUrl.getStudentInfo;
      this.getStudentInfo(url);
			uni.setNavigationBarTitle({
				title:'学生管理'
			})
    }
  },
  onShow: function () {},
  methods: {
    mysearchVal: function (e) {
      let cont = e.detail.value;
      let valLen = e.detail.valLength;
      console.log('cont - ', cont);

      if (this.classId != 0 && this.classId != null && this.classId != '') {
        var url = app.globalData.RequestUrl.baseRequestUrl.getStudentInfo + '?classId=' + this.classId + '&searchUserName=' + cont;
        this.getStudentInfo(url);
      } else {
        var url = app.globalData.RequestUrl.baseRequestUrl.getStudentInfo + '?searchUserName=' + cont;
        this.getStudentInfo(url);
      }
    },
    getStudentInfo: function (url) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: url,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('学生管理信息返回', res.data);

          if (res.data && res.data.code == 200) {
            var lists = _this.reduceData(res.data.data);

            _this.setData({
              lists
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
      var arr = [];

      for (let i = 0; i < data.length; i++) {
        var obj = {};
        obj.userName = data[i].username;
        obj.id = data[i].studentId;
        obj.userPhone = data[i].mobile, obj.userId = data[i].userCode;

        if (data[i].className) {
          obj.usermajor = data[i].className;
          this.className = '学生成员';
        }

        arr[i] = obj;
      }

      return arr;
    },
    userDetail: function (e) {
      console.log(e);
      let userId = e.detail;
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.studentInfoUrl + "?studentid=" + userId + "&classtype="+ this.classType, 500);
    }
  }
};
</script>
<style>
@import "./manageClassDetail.css";
</style>