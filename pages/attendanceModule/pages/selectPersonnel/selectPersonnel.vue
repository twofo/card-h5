<template>
<view class="page">
    <view class="page__bd">
			<!-- <view class="searchBox">
			  <search-inp placeholder="请输入名字" bind:searchInp="seachSch" bind:mysearchValLen="mysearchValLen"></search-inp>
			</view> -->
      <!-- 人员选择组件 -->
      <select-recevice :disableds="disableds" :checkboxItems="checkboxItems" @singleChecked='singleChecked' :checkAll="checkAll" @myevent="onMyEvent"></select-recevice>
    </view>
</view>
</template>

<script>
var app = getApp();
import selectRecevice from "../../../../components/attendanceModule/selectRecevice/selectRecevice";
import searchInp from "../../../../components/attendanceModule/searchAppiontPerson/searchAppiontPerson";

export default {
  data() {
    return {
      checkboxItems: [],
      checkAll: {
        name: '全选',
        value: '00',
        checked: false
      },
			disableds:true
    };
  },

  components: {
    selectRecevice,
    searchInp
  },
  props: {},

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
    console.log('------------------------选择组织------------------------');
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    this.getAttendOrg(userInfoCach, 1);
  },
  methods: {
		singleChecked(e){
			console.log(e)
			this.setData({
				disableds: false
			})
			
		},
    /**
     * 获取考勤组织
     */
    getAttendOrg: function (userInfoCach, type, id) {
			app.globalData.ShowMsgUtil.netErrNotice();
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;

      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.getAttendOrg + '?type=' + type + '&teacherId=' + userInfoCach.personId,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取考勤组织', res.data);

          if (res.data && res.data.code == 200) {
            for (let i = 0; i < res.data.rows.length; ++i) {
							let val = res.data.rows[i].id + res.data.rows[i].level;
              res.data.rows[i].value = String(val)
              res.data.rows[i].selectRole = res.data.rows[i].level; 
              res.data.rows[i].enable = res.data.rows[i].enable; 
              res.data.rows[i].checked = res.data.rows[i].checked; 

              const departmentCach = app.globalData.StorageUtil.get('departmentCach');
              res.data.rows[i] = _this.dealSelectPerson(departmentCach, res.data.rows[i]);
            }

            _this.setData({
              checkboxItems: res.data.rows
            }); // // 如是组件点击下级
            // if (_this.data.valueType == 1){
            //   // 跳转到下级
            // }


            console.log('发送到组件', res.data.rows);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideToast();
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

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      let valueType = e.detail.valueType;
      let parentId = e.detail.parentId; // 选中院系保存

      let checkboxItems = e.detail.checkboxItems;

      if (checkboxItems) {
        console.log('选中的院系----', checkboxItems);
        app.globalData.StorageUtil.set('departmentCach', checkboxItems);
      } // valueType=1 组件点击下级 valueType=2 組件点击确定 


      if (valueType == 1) {
        app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.attendancePageUrl.selectMajorlUrl + '?parentId=' + parentId, 500);
      } else {
        uni.navigateBack({
          delta: 1
        }); // app.PublicUtil.redirectByUrl(app.PageUrl.attendancePageUrl.attendaceSendUrl, 500);
      }
    },

    // 搜索人员  主持人和记录人搜索成功之后需要将确认按钮恢复正常使用
    seachSch(e) {
      console.log(e);
      let searchVal = e.detail.value; // 发送请求

      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      var url = app.globalData.RequestUrl.attendanceRequestUrl.getAttendOrg + '?type=1' + '&teacherId=' + userInfoCach.personId;
      wx.request({
        url: url,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取考勤组织', res.data);

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

            console.log('发送到组件', res.data.rows);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    mysearchValLen(e) {
      let valLength = e.detail.valLength;

      if (valLength == 0) {
        this.selectPersonnel('');
      }
    }

  }
};
</script>
<style>
@import "./selectPersonnel.css";
</style>