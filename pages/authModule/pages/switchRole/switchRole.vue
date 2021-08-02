<template>
<view class="page container"> 
  <!-- 标题 -->
  <view class="myui-box__title centerCss">
    <text class=" box-text">可选择角色</text>
  </view>
  <!--  -->
  <view class="myui-box__center">
    <!-- 其它角色 -->
    <view class="myui-box__select">
      <view class="box-select-two centerCss">
         <view class="myui-title__box" @tap="selectRole" id="00">
          <view class="admin-box">
            <image :src="AuthImageUrl.user" class="title-pic"></image>
          </view>
          <view class="myui-title__text">
            默认角色
          </view>
          <view class="centerCss">
            <image :src="AuthImageUrl.icRoleCheck" style="width:26px;height:23px;"></image>
          </view>
        </view>

         <scroll-view scroll-y style="height: 220px;">
          <view v-for="(item, index) in roleList" :key="index">
            <view class="myui-title__box" @tap="selectRole" :id="index" hover-class="weui-cell_active">
              <view class="admin-box">
                <image :src="item.imageUrl" class="title-pic"></image>
              </view>
              <view class="myui-title__text">
                {{item.name}}
              </view>
              <view class="weui-cell__ft weui-cell__ft_in-access"></view>
            </view>
          </view>

         </scroll-view>
      </view>

      <view class="myui-bottom__text">
        <text class=" centerCss" @tap="bindSkip" style="width: 100rpx;height: 50rpx;border-bottom: 2px #20a4f7 solid;">跳过</text>
      </view>

     </view> 
  </view>
</view>
</template>

<script>
var app = getApp();
var AuthImageUrl = require("../../resources/utils/imageUrl.js");

export default {
  data() {
    return {
      'AuthImageUrl': AuthImageUrl,
      'loginObj': {},
      'roleList': []
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var loginObj = app.globalData.StorageUtil.get('loginObjCach');
    app.globalData.ShowMsgUtil.showLoadAndMsgToast('加载中', 1000);
    console.log('角色数组', loginObj.roleList); // 处理角色数据

    if (loginObj.roleList == null) {} else if (loginObj.roleList.length > 0) {
      loginObj.roleList = this.dealRoleList(loginObj.roleList);
    }

    console.log(loginObj.roleList);
    this.setData({
      'roleList': loginObj.roleList,
      'loginObj': loginObj
    });
  },
  onShow: function () {
    console.log('------------------------切换角色------------------------');
  },
  methods: {
    dealRoleList: function (roleList) {
      var roleLists = [];
      let t = 0;

      for (let i = 0; i < roleList.length; ++i) {
        var role = {};
        if (roleList[i] == "3") {
          role.id = 3;
          role.name = "宿舍管理员";
          role.imageUrl = AuthImageUrl.dormAdminAdmin;
        } else if (roleList[i] == "4") {
          role.id = 4;
          role.name = "辅导员";
          role.imageUrl = AuthImageUrl.counsellAdmin;
        } else if (roleList[i] == "5") {
          role.id = 5;
          role.name = "维修工";
          role.imageUrl = AuthImageUrl.maintainAdmin;
        }

        if (roleList[i] == "3" || roleList[i] == "4" || roleList[i] == "5") {
          roleLists[t] = role;
          t++;
        }
      }

      return roleLists;
    },
    selectRole: function (e) {
      console.log('选择角色为', e.currentTarget.id);
      var role = e.currentTarget.id; // 1.该账号没有角色。即为普通用户

      if (role == '00') {
        // 切换角色请求
        this.switchRoleRequest(this.loginObj);
      } else {
        // 2.该账号有角色。选择角色
        // 切换角色请求
        this.switchRoleRequest(this.loginObj, this.roleList[role].id);
      }
    },
    bindSkip: function () {
      // 切换角色请求
      this.switchRoleRequest(this.loginObj);
    },

    /**
       * 角色为管理员
       */
    switchRoleRequest: function (loginObj, role) {
		console.log(1111111111)
           let token;
     						app.globalData.ShowMsgUtil.netErrNotice();
      if (app.globalData.StorageUtil.get('userInfoCach', 1)) {
        // 切换角色的token
        token = app.globalData.StorageUtil.get('userInfoCach').token;
      } else {
        // 登录时的token
        token = loginObj.tokenByLoginAndSwitch;
      }

      app.globalData.ShowMsgUtil.showLoadAndMsgToast('加载中');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.switchRole,
        data: {
          username: loginObj.username,
          role: role
        },
        header: {
          'token': token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          wx.hideToast({});

          if (res.data && res.data.code == 200) {
			  		console.log(222222)
            console.log('用户信息', res.data);
            let userInfo = res.data.rows; // 1.设置userInfo缓存。

            app.globalData.StorageUtil.set('userInfoCach', userInfo);
            app.globalData.ShowMsgUtil.showSuccessToast("选择成功", 1000); // 2.判断手机号是否绑定
			 console.log(userInfo.department,userInfo.mobile)
                 console.log(role,app.globalData.Constant.roleTypeConstant.MAINTAIN_MAN)
				 console.log(app.globalData.CheckUtil.isNotBlank(userInfo.mobile))
				 console.log(userInfo.mobile,userInfo.department,userInfo.role)
            if (app.globalData.CheckUtil.isNotBlank(userInfo.department)||app.globalData.CheckUtil.isNotBlank(userInfo.mobile)||app.globalData.CheckUtil.isNotBlank(userInfo.role)) {
              // 若为维修端首页，则跳转到维修端首页
			 console.log(3333333333)
              if (role == app.globalData.Constant.roleTypeConstant.MAINTAIN_MAN) {
				  
                app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.repairPageUrl.index, 1000);
              } else {
                // 跳转到首页页面
								if(app.globalData.showOnlyABC){
									app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl+'?noRefresh=1', 1000);
								}else{
									// app.globalData.PublicUtil.switchTabByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl, 1000);
									app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl+'?noRefresh=1', 1000);
								}
              }
            } else {
              // 跳转到绑定手机号页面
			  	app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.taBarPageUrl.indexUrl+'?noRefresh=1', 1000);
              // app.globalData.PublicUtil.redirectByUrl(app.globalData.PageUrl.authPageUrl.bindPhoneUrl, 1000);
            }
          } else {
            // app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },

        fail: function () {
          wx.hideToast({});
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    }
  }
};
</script>
<style>
@import "./switchRole.css";
</style>