<template>
<!--pages/appointmentModule//pages/creatorSelectStudent/selectStudent.wxml-->

<view class="page" xmlns:wx="http://www.w3.org/1999/xhtml">

  <view class="searchBox">
    <search-inp placeholder="请输入名字" @searchInp="seachSch" @mysearchValLen="mysearchValLen"></search-inp>
  </view>

  <view class="page__bd">
    <!-- 人员选择组件 -->
    <select-recevice :checkboxItems="checkboxItems" :disableds="disableds" :checkAll="checkAll" @myevent="onMyEvent"></select-recevice>
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
      disableds: false //防止多次点击确认事件
      ,
      limitSelectPerson: ""
    };
  },

  components: {
    selectRecevice,
    searchInp
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------------------------选择人员 - 学生------------------------');

    if (options.limitSelectPerson) {
      let limitSelectPerson = options.limitSelectPerson;
      this.setData({
        limitSelectPerson
      });
      let haveCheckboxItem = this.showSecondData(limitSelectPerson);
      console.log('haveCheckboxItem-', haveCheckboxItem);
      this.selectPersonnel(options.parentId, haveCheckboxItem);
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let {
      disableds
    } = this;
    this.setData({
      disableds: false
    }); // this.showSecondData()
  },
  methods: {
    /**
     * 二次进入选择人数显示一次选择状态
     */
    showSecondData(limitSelectPerson) {
      let checkboxItems = this.checkboxItems;
      let haveCheckboxItem = []; // 二次进入页面选择

      if (this.limitSelectPerson == 'attendee') {
        haveCheckboxItem = app.globalData.StorageUtil.get('attendeeStudentCach');
      } else if (this.limitSelectPerson == 'hoster') {
        haveCheckboxItem = app.globalData.StorageUtil.get('hosterCach');
      } else if (this.limitSelectPerson == 'recoder') {
        haveCheckboxItem = app.globalData.StorageUtil.get('recoderCach');
      }

      return haveCheckboxItem; // for (let i = 0; i < checkboxItems.length; i++) {
      //   let ind = i;
      //   for (let j = 0; j < haveCheckboxItem.length; j++) {
      //     if (checkboxItems[i].id == haveCheckboxItem[j].id) {
      //       checkboxItems[i] = haveCheckboxItem[j]
      //     }
      //   }
      // }
      // this.setData({
      //   checkboxItems
      // })
    },

    /**
        * 人员选择（学生）
        */
    selectPersonnel: function (id, haveCheckboxItem) {
      app.globalData.ShowMsgUtil.showLoadAndMsgToast();

      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
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
              // const departmentCach = app.StorageUtil.get('departmentCach');

              if (haveCheckboxItem.length > 0) {
                console.log('haveCheckboxItem-', haveCheckboxItem);

                if (haveCheckboxItem != '') {
                  res.data.rows[i] = _this.dealSelectPerson(haveCheckboxItem, res.data.rows[i]);
                }
              }
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
        if (cach[j].isUpdate == 1) {
          // if (data.level == cach[j].level && data.id == cach[j].id){
          //   data.checked = true;
          //   data.enable = false;
          // }
          if (data.level == cach[j].level && data.id == cach[j].infoId) {
            data.checked = true;
            data.enable = false;
          }
        } else {
          // 新增时
          if (data.level == cach[j].level && data.id == cach[j].id) {
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
      let parentId = e.detail.parentId;
      let {
        limitSelectPerson,
        disableds
      } = this;
      this.setData({
        disableds: true
      }); // 选中学生保存

      let checkboxItems = e.detail.checkboxItems;

      if (checkboxItems) {
        // console.log('选中的学生----', checkboxItems);
        if (limitSelectPerson == 'attendee') {
          //参会人
          // valueType=1 组件点击下级 valueType=2 組件点击确定 
          if (valueType == 1) {} else if (valueType == 2) {
            let cach = app.globalData.StorageUtil.get('attendeeStudentCach');
            let cachData = [];

            if (cach.length > 0) {
              //只要已确认就删除编辑回显数据。因为确认是再次选择，所以确认时只需管当时正选中的
              cachData = this.handlerUpdateData(cach);
              let t = cachData.length;

              for (let i = 0; i < checkboxItems.length; i++) {
                //判断这个缓存里是否已经存在了，这个数据
                let flag = this.dealIsExist(cachData, checkboxItems[i]);

                if (!flag) {
                  //不存在
                  cachData[t++] = checkboxItems[i];
                }
              }
            } else {
              cachData = checkboxItems;
            }

            cach = cachData;
            console.log('选择参会人(学生) - ', cach);
            app.globalData.StorageUtil.set('attendeeStudentCach', cach);
            wx.navigateBack({
              delta: 3
            });
          }
        } else if (limitSelectPerson == 'hoster') {
          //主持人
          this.dealCach(checkboxItems, 'hoster');
        } else if (limitSelectPerson == 'recoder') {
          //记录人
          this.dealCach(checkboxItems, 'recoder');
        } else {
          //其他操作
          app.globalData.ShowMsgUtil.showNoneToast('选择有误', 3000);
          wx.navigateBack({
            delta: 3
          });
        }
      }
    },
    //只要已确认就删除编辑回显数据。因为确认是再次选择，所以确认时只需管当时正选中的
    handlerUpdateData: function (cach) {
      let data = [];
      let t = 0;

      for (let i = 0; i < cach.length; i++) {
        if (!(cach.isUpdate && cach.isUpdate == 1)) {
          data[t] = cach[i];
          t++;
        }
      }

      return data;
    },
    dealIsExist: function (cach, checkboxItems) {
      for (let i = 0; i < cach.length; i++) {
        if (cach[i].level == checkboxItems.level && cach[i].id == checkboxItems.id) {
          return true;
        }
      }

      return false;
    },
    dealCach: function (checkboxItems, str) {
      let cach = app.globalData.StorageUtil.get(str + 'Cach');

      if (checkboxItems.length >= 2 || cach.length >= 2) {
        app.globalData.StorageUtil.set(str + 'Cach', checkboxItems);
        app.globalData.ShowMsgUtil.showNoneToast('选择人数不能超过一个', 3000);
        this.setData({
          //恢复点击事件
          disableds: false
        });
        return;
      } else {
        app.globalData.StorageUtil.set(str + 'Cach', checkboxItems); // app.PublicUtil.navigateByUrl(app.PageUrl.appointmentPageUrl.meetingOperationUrl, 500);

        wx.navigateBack({
          delta: 3
        });
      }
    },

    // 搜索人员 
    seachSch(e) {
      console.log(e);
      let searchVal = e.detail.value; // 发送请求

      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.searchPersonnel + '?personType=0' + '&userName=' + searchVal,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          wx.hideToast({});
          console.log('搜素选择人员', res.data);

          if (res.data && res.data.code == 200) {
            var checkboxItems = [];
            var t = 0;

            for (let i = 0; i < res.data.rows.length; ++i) {
              let partment = {};
              partment.id = res.data.rows[i].userId;
              partment.name = res.data.rows[i].userName;
              partment.type = res.data.rows[i].userType;
              checkboxItems[i] = partment;
            }

            _this.setData({
              checkboxItems
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
@import "./selectStudent.css";
</style>