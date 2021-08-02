<template>
<view class="page" xmlns:wx="http://www.w3.org/1999/xhtml">
<!-- 
    <view class="searchBox">
    <search-inp placeholder="请输入名字" bind:searchInp="seachSch" bind:mysearchValLen="mysearchValLen"></search-inp>
  </view> -->

  
    <view class="page__bd">
      <!-- 人员选择组件 -->
      <select-recevice :disableds="disableds" :checkboxItems="checkboxItems" :checkAll="checkAll" @myevent="onMyEvent"></select-recevice>

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
      disableds: false,
      limitSelectPerson: '',
      parentId: ''
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
    console.log('------------------------选择专业------------------------');
    console.log('院系跳转到专业的数据', options);
    app.globalData.ShowMsgUtil.showLoadAndMsgToast();
    this.setData({
      parentId: options.parentId
    });

    if (options.limitSelectPerson) {
      // 主持人和记录人不能选择专业
      let limitSelectPerson = options.limitSelectPerson;
      let {
        disableds
      } = this;
      limitSelectPerson == 'hoster' || limitSelectPerson == 'recoder' ? disableds = true : disableds = false;
      this.setData({
        limitSelectPerson,
        disableds
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let haveCheckboxItem = this.showSecondData();
    this.selectPersonnel(haveCheckboxItem);
  },
  methods: {
    /**
     * 二次进入显示
     */
    showSecondData() {
      let {
        limitSelectPerson,
        checkboxItems
      } = this;
      let haveCheckboxItem = [];
      limitSelectPerson == 'attendee' ? haveCheckboxItem = app.globalData.StorageUtil.get('attendeeStudentCach') : '';
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
      * selectType 1院系 2专业 3班级 4班级里的学生
      */
    selectPersonnel: function (haveCheckboxItem) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.selectPersonnel + '?selectType=2&parentId=' + this.parentId,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          // console.log('人员选择（学生）"', res.data);
          if (res.data && res.data.code == 200) {
            for (let i = 0; i < res.data.rows.length; ++i) {
              res.data.rows[i].value = i;
              res.data.rows[i].enable = true; // 保留为发送考勤的计划的 - 原先选择人员
              // const departmentCach = app.StorageUtil.get('departmentCach');

              if (haveCheckboxItem != '') {
                res.data.rows[i] = _this.dealSelectPerson(haveCheckboxItem, res.data.rows[i]);
              }
            } // console.log(res.data.rows)


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
          if (data.level == cach[j].level && data.id == cach[j].id) {
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

      let {
        limitSelectPerson
      } = this;
      let valueType = e.detail.valueType;
      let parentId = e.detail.parentId;
      let currentPageData = this.checkboxItems; //当前页面数据

      let nocheckboxItems = []; //未选中数据,用于判断取消选中,但是缓存中存在的数据
      // 选中院系保存

      let checkboxItems = e.detail.checkboxItems; //已经选中

      if (checkboxItems) {
        console.log('选中的专业----', checkboxItems);
        let cach = app.globalData.StorageUtil.get('attendeeStudentCach');
        let cachData = [];

        if (cach.length > 0) {
          nocheckboxItems = this.cancelChecked(currentPageData, checkboxItems);
          let cachDatas = this.cancelChecked(cach, nocheckboxItems);

          if (cachDatas != null) {
            cach = cachDatas;
          } //只要已确认就删除编辑回显数据。因为确认是再次选择，所以确认时只需管当时正选中的


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

          console.log(cachData);
        } else {
          cachData = checkboxItems;
        }

        cach = cachData;
        console.log('选择参会人(专业) - ', cach);

        if (limitSelectPerson == 'attendee') {
          app.globalData.StorageUtil.set('attendeeStudentCach', cach);
        } else if (limitSelectPerson == 'hoster') {
          app.globalData.StorageUtil.set('hosterCach', cach);
        } else if (limitSelectPerson == 'recoder') {
          app.globalData.StorageUtil.set('recoderCach', cach);
        } // valueType=1 组件点击下级 valueType=2 組件点击确定 


        if (valueType == 1) {
          console.log("选择班级");
          let isFrist = app.globalData.PublicUtil.isFristEnter();
          console.log('isFrist-', isFrist);

          if (isFrist) {
            //第一次保留本页面
            app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.selectClasslUrl + '?parentId=' + parentId + '&limitSelectPerson=' + limitSelectPerson, 500);
          } else {
            app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.appointmentPageUrl.selectClasslUrl + '?parentId=' + parentId + '&limitSelectPerson=' + limitSelectPerson, 500);
          }
        } else if (valueType == 2) {
          wx.navigateBack({
            delta: 2
          }); // app.PublicUtil.redirectByUrl(app.PageUrl.appointmentPageUrl.attendaceSendUrl, 500);
        }
      }
    },
    //只要已确认就删除编辑回显数据。因为确认是再次选择，所以确认时只需管当时正选中的
    handlerUpdateData: function (cach) {
      let data = [];
      let t = 0;

      for (let i = 0; i < cach.length; i++) {
        if (!(cach[i].isUpdate && cach[i].isUpdate == 1)) {
          data[t] = cach[i];
          t++;
        }
      }

      return data;
    },
    //判断缓存里是否已存在checkboxItems
    dealIsExist: function (cach, checkboxItems) {
      for (let i = 0; i < cach.length; i++) {
        if (cach[i].level == checkboxItems.level && cach[i].id == checkboxItems.id) {
          return true;
        }
      }

      return false;
    },

    // 取消选中，删除缓存中的对应的数据
    cancelChecked(cach, nocheck) {
      let nocheckArr = [];

      for (var i = 0, lenA = cach.length; i < lenA; i++) {
        for (var b = 0, lenB = nocheck.length; b < lenB; b++) {
          if (cach[i].id == nocheck[b].id && cach[i].level == nocheck[b].level) {
            cach.splice(i, 1);
            return cach;
          }
        }
      }
    },

    // 搜索人员  主持人和记录人搜索成功之后需要将确认按钮恢复正常使用
    seachSch(e) {
      console.log(e);
      let searchVal = e.detail.value; // 发送请求

      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); // if ( this.isCode(searchVal) ){  //为编号
      // var url = app.RequestUrl.appointmentRequestUrl.searchPersonnel + '?personType=1' + '&userCode' + searchVal
      // }else{

      var url = app.globalData.RequestUrl.appointmentRequestUrl.searchPersonnel + '?personType=0' + '&userName=' + searchVal; // }

      wx.request({
        url: url,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
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
              checkboxItems,
              disableds: false
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
@import "./selectMajor.css";
</style>