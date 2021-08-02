<template>
<view class="page" xmlns:wx="http://www.w3.org/1999/xhtml">
    <view class="page__bd">

      <!-- 人员搜索 -->
      <!-- <search-input></search-input> -->

      <!-- 人员选择组件 -->
      <view style="padding: 0rpx 10rpx;">
        <view class="weui-cells weui-cells_after-title" style="margin-top:6px;">
            <view class="weui-cell" @tap="toSelectTeacher">
                <view class="weui-cell__bd">教职工</view>
                <view class="weui-cell__ft weui-cell__ft_in-access"></view>
            </view>
            <view class="weui-cell" @tap="toSelectStudent">
                <view class="weui-cell__bd">学生</view>
                <view class="weui-cell__ft weui-cell__ft_in-access"></view>
            </view>
        </view>

        <!-- <select-recevice stidentCount="{{stidentCount}}" checkboxItems="{{checkboxItems}}" checkAll="{{checkAll}}" bind:myevent="onMyEvent"></select-recevice> -->
      </view>

    </view>
</view>
</template>

<script>
var app = getApp();
import selectRecevice from "../../../../components/attendanceModule/selectRecevice/selectRecevice";
import searchInput from "../../../../components/attendanceModule/searchAppiontPerson/searchAppiontPerson";

export default {
  data() {
    return {
      checkboxItems: [{
        value: '100',
        name: '职工号',
        havaChild: true,
        enable: true,
        id: 101,
        childId: 121
      }, {
        value: '100',
        name: '学生',
        havaChild: true,
        enable: true,
        id: 123,
        childId: 112
      }, {
        value: '100',
        name: '管理员',
        havaChild: true,
        enable: true,
        id: 323,
        childId: 154
      }, {
        value: '100',
        name: '其他',
        havaChild: true,
        enable: true,
        id: 124,
        childId: 2521
      }],
      stidentCount: false,
      checkAll: {
        name: '全选',
        value: '00',
        checked: false
      },
      limitSelectPerson: 'attendee' //进入页面的角色判定

    };
  },

  components: {
    selectRecevice,
    searchInput
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断是从什么页面点击进来的
    console.log(options);
    let limitSelectPerson = options.limitSelectPerson;
    this.setData({
      limitSelectPerson
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); // app.ShowMsgUtil.showLoadAndMsgToast();
  },
  methods: {
    //根据部门选择教师
    toSelectTeacher: function () {
      let limitSelectPerson = this.limitSelectPerson;
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.minePageUrl.selectDepartmentOrBuildUrl + '&limitSelectPerson=' + limitSelectPerson, 500);
    },
    //根据院系选择学生
    toSelectStudent: function () {
      let limitSelectPerson = this.limitSelectPerson; // app.PublicUtil.redirectByUrl(app.PageUrl.appointmentPageUrl.selectDepartmentUrl + '?limitSelectPerson=' + limitSelectPerson, 500);

      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.selectClasslUrl + '?parentId=' + 141 + '&limitSelectPerson=' + limitSelectPerson, 500);
    }
  }
};
</script>
