<template>
<view class="page">

    <view class="page__bd">

      <option-items :cores="cores" :title="title"> </option-items>

    </view>

</view>
</template>

<script>
var app = getApp();
var RepairImageUrl = require("../../resources/utils/imageUrl.js");
import optionItems from "../../../../components/indexModule/option/option";

export default {
  data() {
    return {
      cores: [[{
        image: RepairImageUrl.repairApplyPic,
        url: app.globalData.PageUrl.repairPageUrl.studentRepairApplyUrl,
        name: '报修申请'
      }, {
        image: RepairImageUrl.myRepairPic,
        url: app.globalData.PageUrl.repairPageUrl.studentRepairShowUrl + '?isInit=true',
        name: '我的报修'
      }]],
      coresOfDormAdmin: [[{
        image: RepairImageUrl.repairApplyPic,
        url: app.globalData.PageUrl.repairPageUrl.studentRepairApplyUrl,
        name: '维修申请'
      }, {
        image: RepairImageUrl.myRepairPic,
        url: app.globalData.PageUrl.repairPageUrl.studentRepairShowUrl + '?isInit=true',
        name: '我的报修'
      }, {
        image: RepairImageUrl.myRepairPic,
        url: app.globalData.PageUrl.repairPageUrl.repairManageUrl + '?isInit=true',
        name: '维修处理'
      }]],
      title: '维修'
    };
  },

  components: {
    optionItems
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

    if (userInfoCach.role == 3) {
      // 宿管
      this.setData({
        cores: this.coresOfDormAdmin,
        title: '维修管理'
      });
    }
  },
  methods: {}
};
</script>
