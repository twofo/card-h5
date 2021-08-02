<template>
<appiont-list :appiontList="appiontList"></appiont-list>
</template>

<script>
var app = getApp();
import appiontList from "../../../../components/common/appiontList/appiontList";

export default {
  data() {
    return {
      appiontList: {}
    };
  },

  components: {
    appiontList
  },
  props: {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this;

    let appiontList = '';

    if (userInfoCach.role == null && (userInfoCach.personType == 0 || userInfoCach.personType == 2)) {
      // 功能选项组件 - 学生
      appiontList = app.globalData.Constant.arrayConstant.studentAppiontList;
    } else if (userInfoCach.role == null && userInfoCach.personType == 1) {
      // 功能选项组件 - 教师
      appiontList = app.globalData.Constant.arrayConstant.teacherAppiontList;
    }else if(userInfoCach.role != null && userInfoCach.personType == 1){
			 appiontList = app.globalData.Constant.arrayConstant.teacherAppiontList;
		}

    this.setData({
      appiontList
    });
  },
  methods: {}
};
</script>
