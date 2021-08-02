<template>
<view class="page">

  <!-- 一、头部 -->
  <!-- <view class="user-info-box"> -->
    <view class="user-info">
      <header-pic :pic="pic" :userInfoCach="userInfoCach" :isMine="true" @qrcode="bindqrcode" @userdetail="bindUserDetail"></header-pic> 
    </view>
  <!-- </view> -->

  <!-- 二、功能列表组件 -->
  <mine-list :mineList="mineList"> </mine-list>

  <!-- 三、底部 -->
  <view class="page_bottom_msg">
    <text>{{msg}}</text>
  </view>
	<mp-tabbar v-if="!showOnlyABC" style="position:fixed;bottom:0;width:100%;left:0;right:0;"
			:list="tabBarList" 
			:current="current"
			@change="tabChange" 
			></mp-tabbar>
</view>
</template>

<script>
//获取应用实例
var app = getApp();
import mineList from "../../../components/mineModule/mineList/mineList";
import headerPic from "../../../components/mineModule/mineHeader/mineHeader";
import mpTabbar from "../../../components/common/tarbBar/tarbBar";
export default {
  data() {
    return {
      mineList: [],
      userInfoCach: {},
      pic: '',
      user: {},
      msg: '',
      role: '',
			// 自定义tabBar
			current:2,
			tabBarList:[
				{
				  text: "首页",
				  iconPath: '/static/images/tabBar/index.png',
				  selectedIconPath: "/static/images/tabBar/index@active.png",
					pagePath: "/pages/tarBarModule/index/index"
				}, {
				  text: "消息",
				  iconPath: "/static/images/tabBar/news.png",
				  selectedIconPath: "/static/images/tabBar/news@active.png",
				  pagePath: "/pages/tarBarModule/message/message"
				}, {
				  text: "我的",
				  iconPath: "/static/images/tabBar/more.png",
				  selectedIconPath: "/static/images/tabBar/more@active.png",
				  pagePath: "/pages/tarBarModule/mine/mine"
				}
			],
			showOnlyABC: app.globalData.showOnlyABC
    };
  },

  components: {
    mineList,
    headerPic,
		mpTabbar
  },
	mounted(){  
	      //#ifdef H5 
				 if(!this.showOnlyABC){
					 document.querySelector('.uni-page-head-hd').style.display = 'none'
				 }
	      //#endif  
	},
  props: {},
  onShow: function () {
    console.log('------------------------个人中心------------------------'); // 1.获取缓存

    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); // 2.处理显示数据

    var mines = [];

    if (userInfoCach.role == null && (userInfoCach.personType == 0 || userInfoCach.personType == 2)) {
      // 学生
      mines = app.globalData.Constant.arrayConstant.studentCenterList;
    } else if (userInfoCach.role == null && userInfoCach.personType == 1) {
      // 教师
      mines = app.globalData.Constant.arrayConstant.teacherCenterList;
    } else if (userInfoCach.role == app.globalData.Constant.roleTypeConstant.DORMADMIN) {
      // 宿管
      mines = app.globalData.Constant.arrayConstant.dormAdminCenterList;
    } else if (userInfoCach.role == app.globalData.Constant.roleTypeConstant.COUNSELOR) {
      // 辅导员
      mines = app.globalData.Constant.arrayConstant.counsellorAdminCenterList;
    } else if (userInfoCach.role == app.globalData.Constant.roleTypeConstant.MAINTAIN_MAN) {
      // 维修工
      mines = app.globalData.Constant.arrayConstant.maintainAdminCenterList;
    }else if(userInfoCach.role != null && userInfoCach.personType == 1){
			mines = app.globalData.Constant.arrayConstant.teacherCenterList;
		}

    this.setData({
      'mineList': mines,
      'userInfoCach': userInfoCach
    }); // 3.获取图像

    this.getPicData(); // this.getUserData();
  },
  methods: {
		tabChange(e){
			console.log(e)
			let ind = e.detail.index
			
			if(ind != 2){
				let url = e.detail.item.pagePath
				console.log(url)
				uni.reLaunch({
					url: url
				})
			}
		},
    /**
     * 获取图片
     */
    getPicData: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getImage,
        header: {
          'token': _this.userInfoCach.token
        },
        method: 'GET',
        success: function (res) {
          console.log('获取头像', res.data);

          if (res.data && res.data.code === 200) {
            _this.setData({
              pic: res.data.rows.url
            });
          } else {
            _this.setData({
              pic: ''
            });
						if(res.data.code == 1001 || res.data.code== 2200){
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code)
						}
						
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    /**
     * 跳转到用户详情页面
     */
    bindUserDetail: function (e) {
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.minePageUrl.userDetail, 500);
    },
    bindqrcode: function () {
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.minePageUrl.QRCodeDetail, 500);
    }
  }
};
</script>
<style>
@import "./mine.css";
</style>