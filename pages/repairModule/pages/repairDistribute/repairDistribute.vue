<template>
<view class="page">

  <view class="page__bd" style="padding: 10rpx 20rpx;">

    <view class="weui-cells weui-cells_after-title" style="margin-top: 30rpx;">
      <view class="weui-cell weui-cell_select">
        <view class="weui-cell__hd weui-cell__hd_in-select-after">
            <view class="weui-label">工种</view>
        </view>
        <view class="weui-cell__bd">
            <picker @change="bindSelectType" :value="typeIndex" :range="typeNameLists">
                <view class="weui-select weui-select_in-select-after weui-cell__ft">{{typeNameLists[typeIndex]}}</view>
            </picker>
        </view>
      </view>
    </view>

    <view class="weui-cells weui-cells_after-title" style="margin-top: 30rpx;">
      <view class="weui-cell weui-cell_select">
        <view class="weui-cell__hd weui-cell__hd_in-select-after">
            <view class="weui-label">人员</view>
        </view>
        <view class="weui-cell__bd">
            <picker mode="selector" @change="bindSelectPerson" :value="personIndex" :range="personNameLists">
              <!-- <view wx:if="{{personLists.length==0}}" class="weui-select weui-select_in-select-after weui-cell__ft">请选择</view> -->
              <view class="weui-select weui-select_in-select-after weui-cell__ft">{{personNameLists[personIndex]}}</view>
            </picker>
        </view>
      </view>
    </view>

    <!-- 确认分配按钮 -->
    <view class="page__bd page__bd_spacing button_top">
      <button class="weui-btn" type="primary" :disabled="disabled" form-type="submit" @tap="saveDistribution">确定选择</button>
    </view>

  </view>
</view>
</template>

<script>
var app = getApp();

export default {
  data() {
    return {
      repairCode: '',
      typeLists: [],
      // 工种查询list
      typeNameLists: [],
      // 工种类型list
      typeIndex: 0,
      // 选中了第几个
      personLists: [],
      // 根据工种查询人员列表
      personNameLists: [],
      // 人员姓名列表
      personIndex: 0,
      isAgainDistribution: 0,
      // 是否重新分配  0分配  1重新分配
      disabled: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------------------------报修分配------------------------');
    console.log('选中报修单号', options.repairCode);
    this.setData({
      repairCode: options.repairCode,
      isAgainDistribution: options.isAgainDistribution
    });
    this.requestSelectType();
  },
  methods: {
    requestSelectType: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.repairRequestUrl.selectALLWorkerType,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('查询所有工种返回', res.data.rows);

          if (res.data && res.data.code == 200) {
            let array = [];

            if (res.data.rows.length > 0) {
              for (let i = 0; i < res.data.rows.length; i++) {
                array[i] = res.data.rows[i].name;
              } // 根据第一个工种 - 查询工种下的员工


              _this.requestSelectAllPerson(res.data.rows[0].id);
            } else {
              array = ['暂无'];
            }

            _this.setData({
              typeLists: res.data.rows,
              typeNameLists: array
            });
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
    requestSelectAllPerson: function (workerId) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      let listArr = ["全部"]; // let listArr = [ ]

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.repairRequestUrl.selectALLByWorkerId + '?workerId=' + workerId,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('查询所有人员返回', res.data.rows);

          if (res.data && res.data.code == 200) {
            let array = [];

            if (res.data.rows.length > 0) {
              for (let i = 0; i < res.data.rows.length; i++) {
                array[i] = res.data.rows[i].nameOfMaintain;
              }
            } else {
              array = ['暂无'];
            }

            listArr.push(...array);

            _this.setData({
              personLists: res.data.rows,
              personNameLists: listArr
            });

            console.log(listArr);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    /**
     * 选择工种
     */
    bindSelectType: function (e) {
      if (this.typeLists.length == 0) {
        return;
      } // 根据工种 查询工种下的员工


      this.requestSelectAllPerson(this.typeLists[e.detail.value].id);
      this.setData({
        typeIndex: e.detail.value
      });
    },

    /**
     * 选择人员
     */
    bindSelectPerson: function (e) {
      console.log(e.detail.value);
      this.setData({
        personIndex: e.detail.value
      });
    },

    /**
     * 确认分配
     */
    saveDistribution: function () {
      var _this = this;

      var disabled = true;
      if (_this.typeLists.length == 0) {
        app.globalData.ShowMsgUtil.showErrorModal('请求失败', '工种不能为空！');
        disabled = false;
        return;
      }
      if (_this.personLists.length == 0) {
        app.globalData.ShowMsgUtil.showErrorModal('请求失败', '人员不能为空！');
        disabled = false;
        return;
      }

      if (_this.repairCode == '') {
        app.globalData.ShowMsgUtil.showErrorModal('请求失败', '未指定具体的报修订单！');
        disabled = false;
        return;
      }

      this.setData({
        disabled
      });

      if (this.isAgainDistribution == 1) {
        _this.requestDistribute(1);
      } else {
        _this.requestDistribute(0);
      }
    },

    /**
     * 确认分配
     * isAgainDistribution: 1-重新分配  0-分配
     */
    // requestDistribute: function (isAgainDistribution) {
    //   var _this = this;
				// 		app.globalData.ShowMsgUtil.netErrNotice();
    //   const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    //   console.log(this.personIndex); // console.log(_this.data.personLists[_this.data.personIndex - 1].idOfMaintain)

    //   if (_this.personIndex == 0) {
    //     var data = {
    //       userType: 2,
    //       id: _this.typeLists[this.typeIndex].id,
    //       repairCode: _this.repairCode
    //     };
    //   } else {
    //     var data = {
    //       userType: 1,
    //       id: _this.personLists[_this.personIndex - 1].idOfMaintain,
    //       repairCode: _this.repairCode
    //     };
    //   }

    //   app.globalData.ShowMsgUtil.showLoadToast("正在分配...");
    //   wx.request({
    //     url: app.globalData.RequestUrl.repairRequestUrl.saveDistribution,
    //     data: data,
    //     method: 'POST',
    //     header: {
    //       'token': userInfoCach.token,
    //       'content-type': 'application/json' //默认值

    //     },
    //     success: function (res) {
    //       wx.hideToast();
    //       console.log('确认分配返回', res.data);

    //       if (res.data && res.data.code == 200) {
    //         app.globalData.ShowMsgUtil.showSuccessToast('分配成功！', 500); // app.PublicUtil.reLaunchByUrl(app.PageUrl.repairPageUrl.repairManageUrl + '?isInit=true', 2000);

    //         app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.repairManageUrl + '?isInit=true');
    //       } else {
    //         _this.setData({
    //           disabled: false
    //         });

    //         app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
    //         return;
    //       }
    //     },
    //     fail: function () {
    //       wx.hideToast();

    //       _this.setData({
    //         disabled: false
    //       });

    //       app.globalData.ShowMsgUtil.showNoneToastByFail();
    //     }
    //   });
    // }
  }
};
</script>
<style>
@import "./repairDistribute.css";
</style>