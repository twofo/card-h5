<template>
<view class="page">

    <view class="page__bd" style="padding: 10rpx 10rpx;">
      <!-- 人员选择组件 -->
      <select-recevice  :showBtn="showBtn" 
												:sHeight="sHeight" 
												:isCheckAllShow="isCheckAllShow" 
												:disableds="disableds" 
												:checkboxItems="checkboxItems" 
												:checkAll="checkAll" 
												:stidentCount="stidentCount"
												@singleChecked="singleChecked" 
												></select-recevice>
    </view>

    <view class="foot-btn page__bd page__bd_spacing ">
      <button type="primary" class="weui-btn" :disabled="disabled" @tap="gotoSearch">前 往 搜 索</button>
      <button type="primary" class="weui-btn" @tap="submitNumBtn" v-if="ifNoChecked">确 定</button>
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
      checkAll: {},
      limitSelectPerson: '',
      parentId: 0,
      selectType: 1,
      showBtn: false,
			disableds:false,
      isCheckAllShow: false,
      ifNoChecked: false,
      //确定按钮只在当前有数据的情况下显示
      cancelCheckedItem: [],
      //当前点击过取消选中的数据,
      stidentCount: false,
      disabled: false,
      sHeight: 427
    };
  },

  components: {
    selectRecevice,
    searchInp
  },
  onLoad: function (options) {
		this.checkboxItems = []
		console.log("页面初始化-----------------------", this.checkboxItems)
    if (options.limitSelectPerson) {
      // 判断显示什么数据 主持人和记录人 还是参赛人 
      let limitSelectPerson = options.limitSelectPerson;
      this.setData({
        limitSelectPerson
      });
			// this.storegeDataFun();
    }
  },
	watch:{
		checkboxItems(val){
			console.log('监听-------------------',val)
			this.checkboxItems = val
		}
	},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let sHeight = app.globalData.SystemInfo.screenHeight - 340;
		console.log('显示已选人员',this.checkboxItems)
		this.storegeDataFun();
    this.setData({
      disabled: false,
      sHeight
    });
  },
	onHide() {
		console.log('页面隐藏时触发')
		this.setData({
			checkboxItems:[]
		});
		console.log(this.checkboxItems)
	},
	
  methods: {
    storegeDataFun() {
      let attendeeData = app.globalData.StorageUtil.get('attendeeStudentCach');
      let hosterData = app.globalData.StorageUtil.get('hosterCach');
      let recoderData = app.globalData.StorageUtil.get('recoderCach');
      let {
        limitSelectPerson,
        ifNoChecked
      } = this;

      if (limitSelectPerson == 'attendee') {
        if (attendeeData.length > 0) {
          this.dataFun(attendeeData);
          this.setData({
            ifNoChecked: true
          });
        } else {
          this.setData({
            checkboxItems: [],
            ifNoChecked: false
          });
        }
      } else if (limitSelectPerson == 'hoster') {
        if (hosterData.length > 0) {
          this.dataFun(hosterData);
          this.setData({
            ifNoChecked: true
          });
        } else {
          this.setData({
            checkboxItems: [],
            ifNoChecked: false
          });
        }
      } else if (limitSelectPerson == 'recoder') {
        if (recoderData.length > 0) {
          this.dataFun(recoderData);
          this.setData({
            ifNoChecked: true
          });
        } else {
          this.setData({
            checkboxItems: [],
            ifNoChecked: false
          });
        }
      }
    },

    // 数据处理
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
				let val = data[i].selectRole + data[i].id + data[i].selectType;
        partment.value = String(val)
        checkboxItems[i] = partment;
      }
			// console.log(checkboxItems)
      this.checkboxItems = checkboxItems
    },

    gotoSearch() {
      this.setData({
        disabled: true
      });
      let {
        limitSelectPerson
      } = this;
      this.delStorageData();
      app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
      app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.selectClasslUrl + '?parentId=' + 141 + '&limitSelectPerson=' + limitSelectPerson, 500);
    },

    singleChecked(e) {
      console.log(e);
      let {
        id,
        value,
        checked,
        level,
        type
      } = e.detail;
      let {checkboxItems} = this;
			console.log(checked);
      for (var i = 0, lenI = checkboxItems.length; i < lenI; i++) {
        if (checkboxItems[i].id == id && checkboxItems[i].selectRole == level && checkboxItems[i].selectType == type) {
						checkboxItems[i].checked = checkboxItems[i].checked ? true : false;
        }
      }
      console.log(checkboxItems);
      this.setData({
        cancelCheckedItem: checkboxItems
      });
    },

    submitNumBtn() {			
			uni.navigateBack({
			  delta: 1
			});
		
    },

    // 无论点击那个按钮都会将该页面取消选择的数据从缓存中删除
    delStorageData() {
      let {
        limitSelectPerson,
        cancelCheckedItem,
        checkboxItems
      } = this;

      if (cancelCheckedItem.length > 0) {
        var hascheckboxItem = this.getSelectDate(cancelCheckedItem);
      } else {
        var hascheckboxItem = this.getSelectDate(checkboxItems);
      }

      console.log(hascheckboxItem);

      if (limitSelectPerson == 'attendee') {
        var haveCheckboxItem = app.globalData.StorageUtil.get('attendeeStudentCach');
      } else if (limitSelectPerson == 'hoster') {
        var haveCheckboxItem = app.globalData.StorageUtil.get('hosterCach');
      } else if (limitSelectPerson == 'recoder') {
        var haveCheckboxItem = app.globalData.StorageUtil.get('recoderCach');
      }

      console.log(haveCheckboxItem);
      let nowStoregeData = this.cancelChecked(haveCheckboxItem, hascheckboxItem);
      console.log(nowStoregeData);

      if (limitSelectPerson == 'attendee') {
        app.globalData.StorageUtil.set('attendeeStudentCach', nowStoregeData);
      } else if (limitSelectPerson == 'hoster') {
        app.globalData.StorageUtil.set('hosterCach', nowStoregeData);
      } else if (limitSelectPerson == 'recoder') {
        app.globalData.StorageUtil.set('recoderCach', nowStoregeData);
      }
    },

    getSelectDate: function (checkboxItems) {
      let data = [];
      let t = 0;

      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        if (!checkboxItems[i].checked) {
          // 将接口所需的值处理后给后台
          data[t] = checkboxItems[i];
          t++;
        }
      }

      return data;
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
    }

  }
};
</script>
<style>
@import "./selectDepartment.css";
</style>