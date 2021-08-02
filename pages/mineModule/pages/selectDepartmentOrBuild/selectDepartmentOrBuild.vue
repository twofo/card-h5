<template>
<view class="page">

    <view class="page__bd">
      <!-- 搜索 -->
      <view class="searchBox">
        <search-inp placeholder="请输入名字" @searchInp="seachSch" @mysearchValLen="mysearchValLen"></search-inp>      
      
      </view>

      <view class="weui-cells weui-cells_after-title top">
        <label class="weui-cell weui-check__label" @tap="checkAllFun">
            <checkbox class="weui-check" :value="checkAll.value" :checked="checkAll.checked"></checkbox>
            <view class="weui-cell__hd weui-check__hd_in-checkbox">
                <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!checkAll.checked"></icon>
                <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="checkAll.checked"></icon>
            </view>
            <view class="weui-cell__bd">{{checkAll.name}}</view>
        </label>
      </view>

      <view class="weui-cells weui-cells_after-title center-top">
        <scroll-view scroll-y style="height: 400px;" :scroll-into-view="toView" :scroll-top="scrollTop">
        <!-- <checkbox-group bindchange="checkboxChange"> -->
        <view v-if="checkboxItems.length != 0">
          <label v-for="(item, index) in checkboxItems" :key="index" class="weui-cell weui-check__label" :item="item">
              <view class="box" @tap="checkboxChange" :data-value="item.value">
                <checkbox class="weui-check" :value="item.value" :checked="item.checked"></checkbox>

                <view class="weui-cell__hd weui-check__hd_in-checkbox">
                    <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
                    <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="item.checked"></icon>
                </view>
                <view class="weui-cell__bd" @tap="checkboxChange">{{item.name}}</view>
            </view>

              <view class="weui-cell__ft right-box" @tap="gainByParent" :data-id="item.id">
                <view v-if="item.isHasChild==1">
                  <image :src="mineImageUrl.branch" class="right-img"></image>下级
                </view>
              </view>

          </label>
          </view>
          <view v-if="checkboxItems.length == 0">
            <view class="floor-box">
                <text>暂无成员{{checkboxItems.length}}</text>
            </view>
          </view>
        </scroll-view>
          
      </view>

      <view class="weui-btn-area">
        <button class="weui-btn" type="primary" :disabled="disabled" @tap="confirmReceive">确定</button>
      </view>
    </view>
</view>
</template>

<script>
var app = getApp();
var mineImageUrl = require("../../resources/utils/imageUrl.js");
import searchInp from "../../../../components/attendanceModule/searchAppiontPerson/searchAppiontPerson";

export default {
  data() {
    return {
      mineImageUrl: mineImageUrl,
      checkboxItems: [],
      checkAll: {
        name: '全选',
        value: '00',
        checked: false
      },
      limitSelectPerson: '',
      disabled: false,
      recevie: [],
      //已选
      t: 0,
      selectId: 0,
      attendeeCach: "",
      hosterCach: "",
      recoderCach: "",
      receiveCach: ""
    };
  },

  components: {
    searchInp
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("选择接收人     ");
    console.log(options);
    let {
      disabled
    } = this.disabled;

    if (options.selectId == 1) {
      // 查询所有部门
      this.selectByParentId(0);
      this.getStorageData();
    }

    if (options.selectId == 2) {
      // 查询所有部门
      this.selectByBuildId(0);
    }

    this.setData({
      selectId: options.selectId
    });

    if (options.limitSelectPerson) {
      let limitSelectPerson = options.limitSelectPerson;
      limitSelectPerson == 'hoster' || limitSelectPerson == 'recoder' ? disabled = true : disabled = false;
      this.setData({
        limitSelectPerson,
        disabled
      });
    }
  },
  methods: {
    getStorageData() {
      let checkboxItems = this.checkboxItems;
      let haveCheckboxItem = []; // 二次进入页面选择

      if (this.limitSelectPerson == 'attendee') {
        haveCheckboxItem = app.globalData.StorageUtil.get('attendeeCach');
      } else if (this.limitSelectPerson == 'hoster') {
        haveCheckboxItem = app.globalData.StorageUtil.get('hosterCach');
      } else if (this.limitSelectPerson == 'recoder') {
        haveCheckboxItem = app.globalData.StorageUtil.get('recoderCach');
      }

      for (let i = 0; i < checkboxItems.length; i++) {
        let ind = i;

        for (let j = 0; j < haveCheckboxItem.length; j++) {
          if (checkboxItems[i].id == haveCheckboxItem[j].id && checkboxItems[i].type == haveCheckboxItem[j].type && checkboxItems[i].name == haveCheckboxItem[j].name) {
            checkboxItems[i] = haveCheckboxItem[j];
            console.log(checkboxItems[i]);
          }
        }
      }

      this.setData({
        checkboxItems
      });
    },

    /**
     * 按组织架构选择
     * 根据父级parentId获取下级
     */
    selectByParentId: function (parentId) {
			app.globalData.ShowMsgUtil.netErrNotice();
      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      const receiveCach = app.globalData.StorageUtil.get('receiveCach');
      let recevie = this.recevie;
      let re = this.t;

      for (let i = 0; i < this.checkboxItems.length; ++i) {
        let receive = {};

        if (this.checkboxItems[i].checked) {
          this.checkboxItems[i].isTeacher = 1;
          recevie[re] = this.checkboxItems[i];
          re++;
        }

        if (this.checkboxItems[i].id == parentId) {
          //父级选中无法获取子级数据
          if (this.checkboxItems[i].checked) {
            return;
          }
        }
      } // console.log('获取下一级')
      // console.log(this.data.checkboxItems)


      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.byOrg + '?parentId=' + parentId,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('根据部门父级查询返回', res.data);

          if (res.data && res.data.code == 200) {
            var checkboxItems = [];
            var t = 0;

            for (let i = 0; i < res.data.rows.length; ++i) {
              let partment = {};
              partment.id = res.data.rows[i].orgId;
              partment.name = res.data.rows[i].name;
              partment.parent = res.data.rows[i].parent;
              partment.parentId = res.data.rows[i].parentId;
              partment.isHasChild = res.data.rows[i].isHasChild;
              partment.code = res.data.rows[i].code;
              partment.type = res.data.rows[i].type;
              partment.value = i;

              if (_this.limitSelectPerson == null) {
                if (receiveCach) {
                  if (receiveCach.length > t && res.data.rows[i].orgId == receiveCach[t].id) {
                    partment.checked = receiveCach[t].id ? true : false;
                    t++;
                  }
                }
              }

              checkboxItems[i] = partment;
            }

            _this.setData({
              checkboxItems: checkboxItems
            });

            _this.getStorageData();
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
      this.setData({
        recevie,
        t: re
      });
    },

    /**
     * 按组织架构选择
     * 根据父级parentId获取下级
     */
    selectByBuildId: function (parentId) {
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      const receiveCach = app.globalData.StorageUtil.get('receiveCach');

      var _this = this;

      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.byBuilding + '?parentId=' + parentId,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          if (res.data && res.data.code == 200) {
            var checkboxItems = [];
            let t = 0;
            console.log('根据楼栋父级查询返回', res.data);

            for (let i = 0; i < res.data.rows.length; ++i) {
              let partment = {};
              partment.id = res.data.rows[i].orgId;
              partment.name = res.data.rows[i].name;
              partment.parent = res.data.rows[i].parent;
              partment.isHasChild = res.data.rows[i].isHasChild;
              partment.code = res.data.rows[i].code;
              partment.type = res.data.rows[i].type;
              partment.value = i;

              if (receiveCach) {
                if (receiveCach.length > t && res.data.rows[i].orgId == receiveCach[t].id) {
                  partment.checked = receiveCach[t].id ? true : false;
                  t++;
                }
              }

              checkboxItems[i] = partment;
            }

            _this.setData({
              checkboxItems: checkboxItems
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
    checkboxChange: function (e) {
      let {
        disabled,
        limitSelectPerson
      } = this;
      var checkboxItems = this.checkboxItems,
          values = e.currentTarget.dataset.value;
      console.log("选中的成员");

      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        if (checkboxItems[i].value == values) {
          checkboxItems[i].checked = checkboxItems[i].checked ? false : true; // 会议主持人,记录人的教师选择判断

          limitSelectPerson == 'hoster' || limitSelectPerson == "recoder" ? disabled = checkboxItems[i].isHasChild == true ? disabled = true : disabled = false //判断是否有子集,如果有则不能选择需要进入子集  
          : "";
          break;
        }
      } // console.log("主持人和记录人的教师选择     "  )


      console.log(checkboxItems);
      this.setData({
        checkboxItems: checkboxItems,
        disabled
      });
    },
    checkAllFun: function (e) {
      var _this = this;

      var checkboxItems = _this.checkboxItems;
      var checkAll = _this.checkAll.checked ? false : true;

      if (checkAll) {
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
          checkboxItems[i].checked = true;
        }
      } else {
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
          checkboxItems[i].checked = false;
        }
      }

      this.setData({
        checkboxItems: checkboxItems,
        'checkAll.checked': checkAll
      });
    },
    gainByParent: function (e) {
      this.selectByParentId(e.currentTarget.dataset.id);
    },

    /**
     * 确定接收人员
     */
    confirmReceive: function () {
      var _this = this;

      var checkboxItems = _this.checkboxItems;
      var recevie = [];
      var t = 0;
      this.setData({
        //阻止多次触发点击事件
        disabled: true
      });

      for (let i = 0; i < checkboxItems.length; ++i) {
        let receive = {};

        if (checkboxItems[i].checked) {
          // receive.code = checkboxItems[i].code;
          // receive.type = checkboxItems[i].type;
          checkboxItems[i].isTeacher = 1;
          recevie[t] = checkboxItems[i];
          t++;
        }
      }

      if (recevie.length == 0) {
        app.globalData.ShowMsgUtil.showErrorModal('公告发送失败', '请选择接收人');
      }

      console.log(recevie); // 会议编辑角色

      if (this.limitSelectPerson == 'attendee') {
        if (this.recevie != {}) {
          for (let j = 0; j < this.recevie.length; ++j) {
            recevie.push(this.recevie[j]);
          }
        }

        let recevies = this.reduce(recevie);
        app.globalData.StorageUtil.set('attendeeCach', recevies);
        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

        let prevPage = pages[pages.length - 3]; // prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

        prevPage.setData({
          // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
          attendeeCach: recevie
        });
      } else if (this.limitSelectPerson == 'hoster') {
        let hosterData = app.globalData.StorageUtil.get('hosterCach');

        if (recevie.length >= 2 || hosterData.length >= 2) {
          app.globalData.ShowMsgUtil.showNoneToast("选择人数不能超过一个", 3000);
          this.setData({
            //恢复点击事件
            disabled: false
          });
          return;
        } else {
          let recevies = this.reduce(recevie);
          app.globalData.StorageUtil.set('hosterCach', recevies);
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

          let prevPage = pages[pages.length - 3]; // prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

          prevPage.setData({
            // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
            hosterCach: recevie
          });
        }
      } else if (this.limitSelectPerson == 'recoder') {
        let recoderData = app.globalData.StorageUtil.get('recoderCach');

        if (recevie.length >= 2 || recoderData.length >= 2) {
          app.globalData.ShowMsgUtil.showNoneToast("选择人数不能超过一个", 3000);
          this.setData({
            disabled: false
          });
          return;
        } else {
          let recevies = this.reduce(recevie);
          app.globalData.StorageUtil.set('recoderCach', recevies);
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

          let prevPage = pages[pages.length - 3]; // prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

          prevPage.setData({
            // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
            recoderCach: recevie
          });
        }
      } else {
        let recevies = this.reduce(recevie);
        app.globalData.StorageUtil.set('receiveCach', recevies);
        let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

        let prevPage = pages[pages.length - 3]; // prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

        prevPage.setData({
          // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
          receiveCach: recevie
        });
      }

      wx.navigateBack({
        delta: 2
      });
    },

    // 去重
    reduce(arr) {
      var hash = [];

      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i] === arr[j]) {
            ++i;
          }
        }

        hash.push(arr[i]);
      }

      return hash;
    },

    // 搜索人员
    seachSch(e) {
      console.log(e);
      let searchVal = e.detail.value;
      console.log(searchVal); // 发送请求
						app.globalData.ShowMsgUtil.netErrNotice();
      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); // if ( this.isCode(searchVal) ){  //为编号
      // var url = app.RequestUrl.appointmentRequestUrl.searchPersonnel + '?personType=1' + '&userCode' + searchVal
      // }else{

      var url = app.globalData.RequestUrl.appointmentRequestUrl.searchPersonnel + '?personType=1' + '&userName=' + searchVal; // }

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
              partment.value = i;
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
      console.log(e);
      let valLength = e.detail.valLength;

      if (valLength == 0) {
        if (this.selectId == 1) {
          // 查询所有部门
          this.selectByParentId(0);
        }

        if (this.selectId == 2) {
          // 查询所有部门
          this.selectByBuildId(0);
        }
      }
    },

    //判断用户的搜索方式
    isCode(value) {
      var regPos = /^\+?[1-9][0-9]*$/; //非负浮点数

      if (regPos.test(value)) {
        return true;
      } else {
        return false;
      }
    }

  }
};
</script>
<style>
@import "./selectDepartmentOrBuild.css";
</style>