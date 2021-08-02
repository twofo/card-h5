<template>
<view class="page page_view">

  <!-- 设置列表 -->
  <set-list :setList="setList" @myevent="onMyEventFun"></set-list>

  <!-- 切换用户 -->
  <view class="page__bd page__bd_spacing" v-if="forgetPassword">
    <button class="weui-btn page_submit" type="primary" @tap="doLogin">切换用户</button>
  </view>
</view>
</template>

<script>
var app = getApp();
import setList from "../../../../components/mineModule/setList/setList";

export default {
  data() {
    return {
      showFlag: '',
      showchangRole: '',
      userInfoCach: {},
      setList: [],
      forgetPassword: false,
      onMyEvent: ""
    };
  },

  components: {
    setList
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
    console.log('------------------------设置------------------------'); // 1.获取缓存

    const loginObjCach = app.globalData.StorageUtil.get('loginObjCach');
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    var sets = [];
    sets = app.globalData.Constant.arrayConstant.studentSetList; // 2.处理设置列表数据
    if (userInfoCach.role == null ||userInfoCach.role=='') {
      if (loginObjCach.roleList != null && !this.deal(loginObjCach.roleList)) {
				console.log('有角色')
        sets = app.globalData.Constant.arrayConstant.adminSetList;
      }
    } else {
		console.log(loginObjCach.roleList.length);
      if (loginObjCach.roleList != null && loginObjCach.roleList.length > 1) {
				console.log('角色1245')
        sets = app.globalData.Constant.arrayConstant.adminSetListOfRole;           
		//SingeSetListOfRole
      } else {
		  console.log('14555');
				console.log('角色')
        sets = app.globalData.Constant.arrayConstant.adminSetListOfRole;
      }
    }
		console.log(sets)

    var forgetPassword = app.globalData.StorageUtil.get("xcxSet").forgetPassword;
		console.log(forgetPassword)
		
    if (forgetPassword == 1) {
      this.setData({
        forgetPassword: true
      });
    } else {
      for (var i = 0; i < sets.length; i++) {
        if (sets[i].name == "修改密码") {
          sets.splice(i, 1);
        }
      }
    }
		
		if(!app.globalData.showLogin){
			for (var i = 0; i < sets.length; i++) {
			  if (sets[i].name == "退出登录") {
			    sets.splice(i, 1);
			  }
			}
		}
		console.log(sets)
    this.setData({
      'userInfoCach': userInfoCach,
      'setList': sets
    }); // 3.获取消费机设置

    if (userInfoCach.role == null) {
      this.setData({
        onMyEvent: ''
      });
      this.getConsumerMachine(userInfoCach, sets);
    }
  },
  methods: {
    // 用于判断是否有指定的角色
    deal: function (roleList) {
      for (let i = 0; i < roleList.length; i++) {
        if (roleList[i] == 3 || roleList[i] == 4 || roleList[i] == 5) {
          return false;
        }
      }

      return true;
    },
    doDealShowFlag: function (id) {
      if (id == 0) {
        return '不显示';
      } else if (id == 1) {
        return '全显示';
      } else if (id == 2) {
        return '显示余额';
      }
    },

    /**、
     * 获取消费机参数
     */
    getConsumerMachine: function (userInfoCach, sets) {
      var _this = this;

      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getConsumerMachinePay,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          if (res.data && res.data.code == 200) {
            for (let i = 0; i < sets.length; ++i) {
              if (sets[i].bindtap === 'selectModel') {
                sets[i].showFlagName = _this.doDealShowFlag(res.data.rows.showFlag);

                _this.setData({
                  'setList': sets
                });
              }
            }
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

    /**、
     * 退出登录，切换用户
     */
    doLogin: function () {
      wx.redirectTo({
        url: app.globalData.PageUrl.authPageUrl.loginUrl
      });
    },
    onMyEventFun: function (e) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      if (_this.userInfoCach.role == null) {
        wx.request({
          url: app.globalData.RequestUrl.baseRequestUrl.setConsumerMachinePay,
          data: {
            showFlag: e.detail.showFlag
          },
          header: {
            'token': _this.userInfoCach.token,
            'content-type': 'application/json' //默认值

          },
          method: 'PUT',

          success(res) {
            if (res.data && res.data.code == 200) {
              console.log('消费机设置返回', res.data);

              _this.getConsumerMachine(_this.userInfoCach, _this.setList);
            } else {
              app.globalData.ShowMsgUtil.showErrorModal(res.data.msg, '请重新设置！');
              return;
            }
          },

          fail: function () {
            app.globalData.ShowMsgUtil.showNoneToastByFail();
          }
        });
      }
    }
  }
};
</script>
<style>
@import "./set.css";
</style>