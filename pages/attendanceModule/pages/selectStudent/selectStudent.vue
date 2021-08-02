<template>
<view class="page">
    <view class="page__bd">
      <!-- 人员选择组件 -->
      <select-recevice :checkboxItems="checkboxItems" :disableds="disableds" :checkAll="checkAll" @myevent="onMyEvent"></select-recevice>

    </view>
</view>
</template>

<script>
var app = getApp();
import selectRecevice from "../../../../components/attendanceModule/selectRecevice/selectRecevice";

export default {
  data() {
    return {
      checkboxItems: [],
      checkAll: {
        name: '全选',
        value: '00',
        checked: false
      }
    };
  },

  components: {
    selectRecevice
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------------------------选择班级------------------------');
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); // type：1会议考勤人员选择

    this.selectPersonnel(userInfoCach, options.parentId);
  },
  methods: {
    /**
        * 人员选择（学生）
        */
    selectPersonnel: function (userInfoCach, id) {
			app.globalData.ShowMsgUtil.netErrNotice();
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;

      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.selectPersonnel + '?selectType=4&parentId=' + id,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('人员选择（学生）"', res.data);

          if (res.data && res.data.code == 200) {
            for (let i = 0; i < res.data.rows.length; ++i) {
              res.data.rows[i].value = i;
              res.data.rows[i].enable = true; // 保留为发送考勤的计划的 - 原先选择人员

              const departmentCach = app.globalData.StorageUtil.get('departmentCach');
              res.data.rows[i] = _this.dealSelectPerson(departmentCach, res.data.rows[i]);
            }

            _this.setData({
              checkboxItems: res.data.rows
            });
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideToast({});
        }
      });
    },

    /**
     * 数据处理
     * 
     * 将所有数据的选中数据加checked标识位。
     * 场景
     * 1. 新增 - 选择 - 确定选择 - 再选择
     * 2. 修改 - 显示
     * 3. 修改 - 显示 - 选择
     */
    dealSelectPerson: function (cach, data) {
      for (let j = 0; j < cach.length; ++j) {
        // 修改时
        if (cach[j].isDetail) {
          if (data.id == cach[j].childId) {
            data.checked = true;
            data.enable = false;
          }
        } else {
          // 新增时
          if (data.value == cach[j].value) {
            data.checked = true;
            data.enable = false;
          }
        }
      }

      return data;
    },

    /**
     * 接收组件点击后所传的值
     */
    onMyEvent: function (e) {
      var _this = this;

      let valueType = e.detail.valueType;
      let parentId = e.detail.parentId; // 选中院系保存

      let checkboxItems = e.detail.checkboxItems;

      if (checkboxItems) {
        console.log('选中的学生----', checkboxItems);
        app.globalData.StorageUtil.set('studentCach', checkboxItems);
      } // valueType=1 组件点击下级 valueType=2 組件点击确定 


      if (valueType == 1) {} else if (valueType == 2) {
        wx.navigateBack({
          delta: 4
        }); // app.PublicUtil.redirectByUrl(app.PageUrl.attendancePageUrl.attendaceSendUrl, 500);
      }
    }
  }
};
</script>
