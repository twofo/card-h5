<template>
<view class="page">

  <view class="searchBox">
    <search-inp :placeholder="placeholder" @searchInp="seachSch" @mysearchValLen="mysearchValLen"></search-inp>
  </view>

  <view class="page__bd">
    <!-- 人员选择组件 -->
    <select-recevice :disableds="disableds" :loadNotice="loadNotice" :sHeight="sHeight" :stidentCount="stidentCount" :checkboxItems="checkboxItems" :checkAll="checkAll" @myevent="onMyEvent" @singleChecked="singleChecked" @lower="lower"></select-recevice>
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
      limitSelectPerson: '',
      disableds: false,
      placeholder: "请输入名称",
      parentId: '',
      selectType: 1,
      stidentCount: false,
      loadNotice: '',
      //下拉加载提示
      currentPage: 0,
      //当前页
      totalPage: null,
      //数据的总长度
      searchValInp: "",
      //搜索框输入的内容
      isHasLower: true //是否允许上拉加载,默认允许,当数据加载完毕之后不再需要
      ,
      sHeight: ""
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
    console.log('------------------------选择班级------------------------');
    console.log(options); // app.ShowMsgUtil.showLoadAndMsgToast();

    this.setData({
      parentId: options.parentId
    });

    if (options.limitSelectPerson) {
      // 主持人和记录人不能选择班级
      let limitSelectPerson = options.limitSelectPerson;

      if (limitSelectPerson == 'recoder' || limitSelectPerson == 'hoster') {
        var placeholder = '请输入教师或学生名字';
      } else if (limitSelectPerson == 'dutyTeacher') {
        var placeholder = '请输入责任教师名字';
      } else {
        var placeholder = '请输入部门/班级/教师/学生名称';
      }

      let sHeight = app.globalData.SystemInfo.screenHeight - 390;
      this.setData({
        limitSelectPerson,
        placeholder,
        sHeight
      });
    }
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
      return haveCheckboxItem;
    },

    /**
        * 人员选择（学生）
        * selectType 1院系 2专业 3班级 4班级里的学生
        */
    selectPersonnel: function (haveCheckboxItem, selectType, parentId) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.selectPersonnel + '?selectType=' + selectType + '&parentId=' + parentId,
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

              console.log('haveCheckboxItem-', haveCheckboxItem);

              if (haveCheckboxItem != '') {
                res.data.rows[i] = _this.dealSelectPerson(haveCheckboxItem, res.data.rows[i]);
              }
            }

            _this.setData({
              checkboxItems: res.data.rows,
              selectType: res.data.rows[0].level //同类型的数据的第一个level判断是哪一层的数据

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
     *判断是否是已经选择数据  true 为已选择 false为未选择
     */
    dealSelectPerson: function (cach, data) {
      for (let j = 0; j < cach.length; ++j) {
        if (data.selectType == cach[j].selectType && data.selectId == cach[j].id) {
          return true;
        }
      }

      return false;
    },

    // 当点击单个项目
    singleChecked(e) {
      console.log(e);
    },

    /**
     * 接收组件点击后所传的值
     */
    onMyEvent: function (e) {
      console.log(e);

      var _this = this;

      let {
        limitSelectPerson
      } = this;
      let valueType = e.detail.valueType;
      let parentId = e.detail.parentId;
      let checkboxItems = e.detail.checkboxItems; //判断当前是否有选中的数据，如果有则放进数组并缓存，记录人和主持人缓存中已经有数据则不给予添加

      let currentPageData = this.checkboxItems; //当前搜索的数据

      let attendeeData = app.globalData.StorageUtil.get('attendeeStudentCach');
      let hosterData = app.globalData.StorageUtil.get('hosterCach');
      let recoderData = app.globalData.StorageUtil.get('recoderCach');
      let cachs = [],
          cach = []; //当前数据

      console.log(checkboxItems);

      if (checkboxItems) {
        if (limitSelectPerson == 'attendee') {
          if (currentPageData.length === checkboxItems.length) {
            // console.log("选择了全部人")
            var storegeData = checkboxItems;
          } else if (currentPageData.length >= 1 && checkboxItems.length == 0) {
            // console.log('当前只有一条数据时,未选择')
            var storegeData = this.cancelChecked(attendeeData, currentPageData);
          } else {
            // console.log("选择了部分人")
            if (attendeeData.length > 0) {
              /**
               * 当缓存中的数据与当前的数据有相同时,删除缓存数据,没有相同的把当前数据放入缓存
               */
              var noCheckData = this.cancelChecked(currentPageData, checkboxItems);
              var storegeDatas = this.cancelChecked(attendeeData, noCheckData); //判断当前未选择的是否在缓存中存在,如果存在删除

              var storegeData = [...storegeDatas, ...checkboxItems]; //将新缓存数据和当前选择的数据合并放入缓存
            } else {
              var storegeData = checkboxItems;
            }
          }

          cachs.push(...storegeData, ...attendeeData);
        } else if (limitSelectPerson == 'hoster') {
          if (hosterData.length > 0 || checkboxItems.length > 1) {
            app.globalData.ShowMsgUtil.showNoneToast("选择人只能数不能超过一个", 1500);
            return;
          } else {
            if (checkboxItems.length >= 1) {
              if (checkboxItems[0].selectType != 4) {
                app.globalData.ShowMsgUtil.showNoneToast("选择人只能数不能超过一个", 1500);
                return;
              }
            }

            cachs.push(...checkboxItems, ...hosterData);
          }
        } else if (limitSelectPerson == 'recoder') {
          if (recoderData.length > 0 || checkboxItems.length > 1) {
            app.globalData.ShowMsgUtil.showNoneToast("选择人数不能超过一个", 3000);
            return;
          } else {
            if (checkboxItems.length >= 1) {
              if (checkboxItems[0].selectType != 4) {
                app.globalData.ShowMsgUtil.showNoneToast("选择人只能数不能超过一个", 1500);
                return;
              }
            }

            cachs.push(...checkboxItems, ...recoderData);
          }
        }

        cach = this.reduceFun(cachs);
      } // valueType=1 组件点击下级 valueType=2 組件点击确定 


      if (valueType == 1) {//当前不设置下一级
        // 选择下一级在当前页面获取数据显示并需要判断是否有子级，自己也可以获取下一级
      } else if (valueType == 2) {
        // console.log(cach)
        this.dataFun(cach);

        if (limitSelectPerson == 'attendee') {
          app.globalData.StorageUtil.set('attendeeStudentCach', cach);
        } else if (limitSelectPerson == 'hoster') {
          app.globalData.StorageUtil.set('hosterCach', cach);
        } else if (limitSelectPerson == 'recoder') {
          app.globalData.StorageUtil.set('recoderCach', cach);
        }

        this.setData({
          disableds: true
        });
				
				uni.navigateBack({
				  delta: 1
				});
			
				// #ifdef H5
				 // app.globalData.PublicUtil.redirectByUrl(app.globalData.PageUrl.appointmentPageUrl.selectDepartmentUrl + '?limitSelectPerson=' + limitSelectPerson, 50);
				// #endif
        
      }
    },

    //处理放进缓存的数据
    dataFun(data) {
      let checkboxItems = [];

      for (let i = 0; i < data.length; i++) {
        let partment = {};
        partment.id = data[i].id;
        partment.name = data[i].name;
        partment.selectType = data[i].selectType;
        partment.selectRole = data[i].selectRole;
        partment.isHasChild = data[i].isHasChild;
        partment.checked = data[i].checked;
        partment.value = data[i].selectRole + data[i].id + data[i].selectType;
        checkboxItems[i] = partment;
      }

      this.setData({
        checkboxItems
      });
    },

    // 去重
    reduceFun(objarray) {
      let len = objarray.length;
      let tempJson = {};
      let res = [];

      for (let i = 0; i < len; i++) {
        //取出每一个对象
        tempJson[JSON.stringify(objarray[i])] = true;
      }

      let keyItems = Object.keys(tempJson);

      for (let j = 0; j < keyItems.length; j++) {
        res.push(JSON.parse(keyItems[j]));
      }

      return res;
    },

    // 取消选中，删除缓存中的对应的数据
    cancelChecked(cach, nocheck) {
      // console.log(cach, nocheck)
      let nocheckArr = [];

      if (cach && nocheck) {
        for (var i = 0; i < nocheck.length; i++) {
          for (var j = 0; j < cach.length; j++) {
            if (cach[j].id == nocheck[i].id && cach[j].selectRole == nocheck[i].selectRole && cach[j].selectType == nocheck[i].selectType) {
              cach.splice(j, 1);
              j = j - 1;
            }
          }
        }

        nocheckArr = cach;
        return nocheckArr;
      }
    },

    // 搜索人员  主持人和记录人搜索成功之后需要将确认按钮恢复正常使用

    /**
     * isAttendace 是否是参赛人  1 是 0 不是
     * 
     */
    seachSchUrl(value, take, skip) {
      let searchVal = value;
      let isAttendace; // 判断当前角色 attendee hoster recoder  

      let {
        limitSelectPerson
      } = this;

      if (limitSelectPerson == 'attendee') {
        var haveCheckboxItem = app.globalData.StorageUtil.get('attendeeStudentCach');
        isAttendace = 1;
      } else if (limitSelectPerson == 'hoster') {
        var haveCheckboxItem = app.globalData.StorageUtil.get('hosterCach');
        isAttendace = 2;
      } else if (limitSelectPerson == 'recoder') {
        var haveCheckboxItem = app.globalData.StorageUtil.get('recoderCach');
        isAttendace = 2;
      } // 发送请求


      this.getSearchData(isAttendace, searchVal, take, skip, haveCheckboxItem);
    },

    //上拉加载
    lower(e) {
      console.log(e);

      if (this.isHasLower) {
        this.seachSchUrl(this.searchValInp, this.currentPage * 2, 0);
        this.setData({
          loadNotice: "加载中"
        });
      }
    },

    getSearchData(val, searchVal, take, skip, haveCheckboxItem) {
      var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.appointmentRequestUrl.searchPersonnel + '?searchType=' + val + '&nameStr=' + searchVal + "&take=" + take + "&skip=" + skip,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('搜素选择人员', res.data.rows);

          if (res.data && res.data.code == 200) {
            var checkboxItems = [];
            let totalPage = res.data.rows.peoples.length;

            if (totalPage <= 0) {
              _this.setData({
                checkboxItems: res.data.rows.peoples
              });
            } else {
              for (let i = 0; i < res.data.rows.peoples.length; ++i) {
                let partment = {};

                if (haveCheckboxItem != '') {
                  //判断checked状态
                  // console.log(haveCheckboxItem)
                  var resdata = _this.dealSelectPerson(haveCheckboxItem, res.data.rows.peoples[i]);
                }

                partment.id = res.data.rows.peoples[i].selectId;
                partment.name = res.data.rows.peoples[i].selectName;
                partment.selectType = res.data.rows.peoples[i].selectType;
                partment.selectRole = res.data.rows.peoples[i].selectRole;
                partment.isHasChild = res.data.rows.peoples[i].isHasChild;
								let val = res.data.rows.peoples[i].selectRole + res.data.rows.peoples[i].selectId + res.data.rows.peoples[i].selectType;
                partment.value = String(val)
                partment.checked = resdata;
                checkboxItems[i] = partment; // _this.setData({
                //   [`checkboxItems[${i}]`]:checkboxItems[i] ,
                // })
              }

              if (totalPage != _this.currentPage && totalPage >= 5) {
                _this.setData({
                  loadNotice: "上拉加载更多"
                });
              } else {
                _this.setData({
                  loadNotice: "到底了",
                  isHasLower: false
                });
              }

              _this.setData({
                disableds: false,
                currentPage: totalPage,
                checkboxItems
              });
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

    mysearchValLen(e) {
      let valLength = e.detail.valLength;
      let value = e.detail.value;
      console.log(value);

      if (valLength <= 0) {
        // this.selectPersonnel('');
        this.setData({
          disableds: true,
          checkboxItems: [],
          currentPage: 0
        });
      } else {
        this.seachSchUrl(value, 5, 0);
        this.setData({
          searchValInp: value //搜索框输入的内容

        });
      }
    }

  }
};
</script>
<style>
@import "./selectClass.css";
</style>