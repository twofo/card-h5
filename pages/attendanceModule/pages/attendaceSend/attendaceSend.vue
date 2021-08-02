<template>
<view class="page">

	<view class="page__bd">

		<view class="weui-cells weui-cells_after-title box_top">
			<view class="weui-cell weui-cell_input">
				<view class="weui-cell__hd">
					<view class="weui-label__text">考勤计划名称</view>
				</view>
				<view class="weui-cell__ft">
					<input class="weui-input" :placeholder="pageObj.name" @input="inputPlanName"></input>
				</view>
			</view>
			<navigator :url="pageUrl.selectPersonnelUrl" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
				<view class="weui-cell__bd">考勤人员</view>
				<view class="weui-cell__ft weui-cell__ft_in-access">{{pageObj.personnel}}</view>
			</navigator>
		</view>

		<view class="weui-cells weui-cells_after-title box_top">
			<navigator :url="pageUrl.selectWeekUrl" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
				<view class="weui-cell__bd">星期</view>
				<view class="weui-cell__ft weui-cell__ft_in-access">
					
					<view style="display: inline-block;" v-for="(item,index) in pageObj.weekCycle" :key="index">
						{{item}} <text v-if="index != pageObj.weekCycle.length -1">,</text>
					</view>
				</view>
			</navigator>

			<view class="weui-cell weui-cell_access">
				<view class="weui-cell__bd">开始时间</view>
				<view class="weui-cell__ft">
					<picker mode="time" :value="showStartTime" start="01:01" end="23:59" @change="bindStartTimeChange">
						<view class="weui-cell__ft weui-cell__ft_in-access">{{pageObj.startTime}}</view>
					</picker>
				</view>
			</view>
			<view class="weui-cell weui-cell_access">
				<view class="weui-cell__bd">结束时间</view>
				<view class="weui-cell__ft">
					<picker mode="time" :value="showEndTime" start="01:01" end="23:59" @change="bindEndTimeChange">
						<view class="weui-cell__ft weui-cell__ft_in-access">{{pageObj.endTime}}</view>
					</picker>
				</view>
			</view>

			<view class="weui-cell weui-cell_access box" hover-class="weui-cell_active" @tap="bindDelayTimeChange">
				<view class="weui-cell__bd more_bd">延迟结束时间</view>
				<view class="weui-cell__ft">{{delayTime}}</view>
				<view class="weui-cell__ft weui-cell__ft_in-access more_rightIcon"></view>
			</view>


		</view>
	</view>



	<!-- 尾部 -->
	<view class="page__bd">
		<view class="weui-btn-area button_top" v-if="!isDetail">
			<button class="weui-btn page_submit" :disabled="disabled" @tap="confirmSend">发送</button>
		</view>
		<view class="weui-btn-area button_top" v-else>
			<button class="weui-btn page_submit" :disabled="disabled" @tap="confirmUpdate">修改</button>
		</view>
	</view>

	<view class="page__bd setLimit-view button_top">
		<view class="weui-article">
			<view class="weui-article__h1 h1-font">温馨提示</view>
			<view class="weui-article__section">
				<view class="weui-media-box__desc desc-font">1. 默认提前{{advanceTime}}分钟给每位考勤人员发送考勤通知。</view>
				<view class="weui-media-box__desc desc-font">2. 开始时间与结束时间的间隔为10 ~ 30分之间。</view>
				<view class="myui-media-box__desc desc-font">3. 若考勤时间在当天，请注意开始时间应该提前{{advanceTime+5}}分钟，即开始时间比当前时间晚{{advanceTime+5}}分钟。实际结束时间为结束时间+延迟时间。</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>
var app = getApp();
var requestObj = {}; //请求数据对象

export default {
  data() {
    return {
      pageUrl: app.globalData.PageUrl.attendancePageUrl,
      pageObj: {},
      //显示页面数据对象
      isDetail: false,
      planId: '',
      //若存在则更新，否则创建 
      showStartTime: '请选择',
      // 点击开始时间初始化时间
      showEndTime: '请选择',
      // 点击开始时间初始化时间
      advanceTime: 0,
      // 提前时间
      delayTime: '5分钟',
      // 延迟时间
      delayIndex: 0,
      disabled: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log(options)
    console.log('------------------------创建考勤计划------------------------'); // 若是更新
    // 获取考勤计划详情

    if (options.planId) {
      this.getPlanDetails(options.planId);
      this.setData({
        planId: options.planId,
        isDetail: true
      });
    }

    this.getAdvanceTime();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 发送  创建考勤计划
    // app.StorageUtil.remove('sendPageObjCach');
    const sendPageObjCach = app.globalData.StorageUtil.get('sendPageObjCach'); // 处理并获取页面显示数据

    if (sendPageObjCach) {
      this.getPageData(sendPageObjCach);
    } else {
      this.getPageData();
    }
  },
  methods: {
    /**
     * 一、获取页面显示数据
     * 
     * 处理发送考勤页面数据 - 显示页面
     * 
     * 1. 发送创建计划时通过判断缓存数据
     * 2. 修改计划时通过查询计划详情数据
     */
    getPageData: function (obj) {
      let pageObj = {}; //1.考勤计划名称

      if (obj != null && obj.name != null) {
        pageObj.name = obj.name;
        requestObj.name = obj.name;
      } else {
        pageObj.name = '请输入名称';
        requestObj.name = '';
      } //2.获取考勤人员值


      const departmentCach = app.globalData.StorageUtil.get('departmentCach'); //选择院系

      const majorCach = app.globalData.StorageUtil.get('majorCach'); //选择专业

      const classCach = app.globalData.StorageUtil.get('classCach'); //选择班级

      if (departmentCach.length > 0 || majorCach.length > 0 || classCach.length > 0) {
        pageObj.personnel = '已选择'; //请求数据 - 选择人员

        let attendances;

        if (this.isDetail) {
          // 考勤计划详情 - 将返回的考勤人员数据显示
          attendances = this.dealSelect(departmentCach, majorCach, classCach);
        } else {
          // 将其处理成请求数据
          attendances = this.dealSelect(departmentCach, majorCach, classCach);
        }

        requestObj.attendances = attendances;
      } else {
        pageObj.personnel = '请选择';
        requestObj.attendances = '';
      } // this.setRequestObj('attendance', attendance, this);//请求对象数据  人员
      //3.获取星期
      // 获取星期值


      const checkboxItems = app.globalData.StorageUtil.get('attendaceWeekCach');

      if (checkboxItems) {
        let weekValue = this.dealWeekValue(checkboxItems); 
				// this.setRequestObj('weekCycle', weekValue, this); //请求对象数据  日期
        // this.setPageObj('weekCycle', weekValue, this);
				
				console.log(weekValue)
        pageObj.weekCycle = weekValue;
        requestObj.weekCycle = weekValue;
      } else if (obj != null && obj.weekCycle != null) {
        pageObj.weekCycle = obj.weekCycle;
        requestObj.weekCycle = obj.weekCycle; // this.setRequestObj('weekCycle', obj.weekCycle, this); //请求对象数据  日期
        // this.setPageObj('weekCycle', obj.weekCycle, this);
      } else {
        pageObj.weekCycle = '请选择';
        requestObj.weekCycle = '';
      } //4.开始时间


      if (obj != null && obj.startTime != null) {
        pageObj.startTime = obj.startTime;
        requestObj.startTime = obj.startTime;
      } else {
        pageObj.startTime = '请选择';
        requestObj.startTime = '';
      } //5.结束时间


      if (obj != null && obj.endTime != null) {
        pageObj.endTime = obj.endTime;
        requestObj.endTime = obj.endTime;
      } else {
        pageObj.endTime = '请选择';
        requestObj.endTime = '';
      }

      this.setData({
        pageObj: pageObj
      });
      app.globalData.StorageUtil.set('sendPageObjCach', pageObj);
    },

    /**
     * 修改 - 显示页面数据对象
     */
    setPageObj: function (name, value, _this) {
      var obj = {}; //1.初始化页面数据

      const sendPageObjCach = app.globalData.StorageUtil.get('sendPageObjCach');
      let pageObj = sendPageObjCach ? sendPageObjCach : this.pageObj;
      obj.name = pageObj.name;
      obj.personnel = pageObj.personnel;
      obj.weekCycle = pageObj.weekCycle;
      obj.startTime = pageObj.startTime;
      obj.endTime = pageObj.endTime; //2.修改页面数据

      obj[name] = value; //根据name的输入值给该输入值赋值（随着输入name的值改变而改变）
      // obj.name = value;  // 给obj对象的name赋值（指定的固定属性name）
      //3.显示页面数据

      _this.setData({
        pageObj: obj
      }); //存入缓存


      app.globalData.StorageUtil.set('sendPageObjCach', obj);
    },

    /**
     * 修改 - 请求数据对象
     */
    setRequestObj: function (name, value, _this) {
      var obj = {}; //1.初始化页面数据

      obj.name = requestObj.name;
      obj.attendances = requestObj.attendances;
      obj.weekCycle = requestObj.weekCycle;
      obj.startTime = requestObj.startTime;
      obj.endTime = requestObj.endTime; //2.修改页面数据

      obj[name] = value; //根据name的输入值给该输入值赋值（随着输入name的值改变而改变）
      //3.显示页面数据

      requestObj = obj;
    },

    /**
     * 数据处理
     */
    // 处理给后台的选择人员数据
    dealSelect: function (departmentCach, majorCach, classCach) {
      let obj = {};
      obj.department = this.selectValue(departmentCach, true);
      obj.profession = this.selectValue(majorCach);
      obj.classes = this.selectValue(classCach);
      return obj;
    },
    selectValue: function (value, isDepartment) {
      let data = [];
      let t = 0;

      for (var i = 0, lenI = value.length; i < lenI; ++i) {
        if (value[i].checked) {
          // 将接口所需的值处理后给后台
          let object = {};
          object.parentId = value[i].parentId;
          object.childId = value[i].id;

          if (isDepartment) {
            object.parentId = 0;
          }

          data[t] = object;
          t++;
        }
      }

      return data;
    },
    dealWeekValue: function (checkboxItems) {
      let weekValue = [];
      let t = 0;

      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        if (checkboxItems[i].checked) {
          weekValue[t] = checkboxItems[i].value;
          t++;
        }
      }

      return weekValue;
    },

    /**
     * 输入考勤计划名称
     */
    inputPlanName: function (e) {
      if (e.detail.value == '') {
        requestObj.name = '';
      }

      this.setPageObj('name', e.detail.value, this);
      this.setRequestObj('name', e.detail.value, this);
    },

    /**
     * 开始时间选择
     */
    bindStartTimeChange: function (e) {
      this.setPageObj('startTime', e.detail.value, this);
      this.setRequestObj('startTime', e.detail.value, this);
    },
    bindStartTime: function (time) {
      //1.初始化开始时间
      let startDate = new Date();
      let now = startDate.getMinutes();
      startDate.setMinutes(now + time + 7); //2.初始化结束时间

      let endDate = new Date();
      endDate.setMinutes(now + time + 7 + 10);
      let start = app.globalData.PublicUtil.formatTimeTwo(startDate.getTime(), 'h:m');
      let end = app.globalData.PublicUtil.formatTimeTwo(endDate.getTime(), 'h:m');
      this.setData({
        showStartTime: start,
        showEndTime: end
      });
    },

    /**
     * 结束时间选择
     */
    bindEndTimeChange: function (e) {
      let endTime = e.detail.value;
      let startTime = this.pageObj.startTime;

      if (startTime === '' || startTime === '请选择') {
        app.globalData.ShowMsgUtil.showErrorModal('注意', '请先设置开始时间！');
        return;
      }

      this.setPageObj('endTime', endTime, this);
      this.setRequestObj('endTime', endTime, this);
      this.isFeasible(); // 判断开始时间与结束时间的范围为10 ~ 30分钟
    },
    isFeasible: function () {
      let endTime = this.pageObj.endTime;
      let startTime = this.pageObj.startTime; // 获取开始时间

      let nowTime = app.globalData.PublicUtil.formatTimeTwo(new Date(), 'Y-M-D');
      let sTime = nowTime + ' ' + startTime + ':00';
      let eTime = nowTime + ' ' + endTime + ':00'; // 获取时间范围
      //1.获取当前日期

      let minDate = new Date(sTime); //2. 获取当前分钟

      let min = minDate.getMinutes(); //3. 设置当前时间+5分钟：把当前分钟数+5后的值重新设置为date对象的分钟数

      minDate.setMinutes(min + 10);
      let maxDate = new Date(sTime);
      maxDate.setMinutes(min + 30); // 获取结束时间的时间戳

      let eDate = new Date(eTime).getTime();

      if (minDate.getTime() > eDate || eDate > maxDate.getTime()) {
        wx.hideToast({});
        this.setData({});
        app.globalData.ShowMsgUtil.showErrorModal('注意', '开始与结束时间应该在10~30分钟之间！');
        return;
      }
    },

    /**
     * 确认创建考勤
     */
    confirmSend: function () {
			console.log(this.planId)
      var _this = this;

      if (requestObj.name == '') {
        app.globalData.ShowMsgUtil.showErrorModal('发送失败', '考勤名称不能为空');
        return;
      }

      if (requestObj.startTime == '') {
        app.globalData.ShowMsgUtil.showErrorModal('发送失败', '考勤开始时间不能为空');
        return;
      }

      if (requestObj.endTime == '') {
        app.globalData.ShowMsgUtil.showErrorModal('发送失败', '考勤开始时间不能为空');
        return;
      }

      if (requestObj.attendances == '') {
        app.globalData.ShowMsgUtil.showErrorModal('发送失败', '考勤人员不能为空');
        return;
      }

      this.isFeasible(); // 判断开始时间与结束时间的范围为10 ~ 30分钟

      let isRange = this.isWithinRange(true); // 是否在指定范围内

      console.log('isRange', isRange);

      if (isRange) {
        wx.showModal({
          title: '提示',
          content: '考勤已过，考勤计划将在明天执行',

          success(res) {
            if (res.confirm) {
              _this.requestSend(_this.planId);

              return;
            } else if (res.cancel) {
              console.log('用户点击取消');
              return;
            }
          }

        });
      } else {
        _this.requestSend(_this.planId);
      }
    },
    requestSend: function ( planId) {
			console.log('planId:  ', planId)
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      const sendPageObjCach = app.globalData.StorageUtil.get('sendPageObjCach');
      app.globalData.ShowMsgUtil.showLoadToast("正在创建...");
      let obj = requestObj.attendances;
      uni.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.createAttendancePlan,
        data: {
          id: planId,
          name: sendPageObjCach.name,
          type: 1,
          weekCycle: sendPageObjCach.weekCycle,
          teacherId: userInfoCach.personId,
          startTime: sendPageObjCach.startTime,
          endTime: sendPageObjCach.endTime,
          attendances: obj
        },
        header: {
          'token': userInfoCach.token,
          'content-type': 'application/json' //默认值

        },
        method: 'POST',

        success(res) {
          wx.hideToast({});
          console.log('创建考勤返回', res.data);

          if (res.data && res.data.code == 200) {
            if (planId) {
              app.globalData.ShowMsgUtil.showSuccessAndReturn('修改成功', 2000);
            } else {
              app.globalData.ShowMsgUtil.showSuccessAndReturn('发送成功', 2000);
            } // 在确定选择、确定修改、退出考勤计划（新增或修改）页面时，清空缓存


            app.globalData.StorageUtil.remove('attendaceWeekCach');
            app.globalData.StorageUtil.remove('departmentCach');
            app.globalData.StorageUtil.remove('majorCach');
            app.globalData.StorageUtil.remove('classCach');
            app.globalData.StorageUtil.remove('sendPageObjCach');
            app.globalData.StorageUtil.remove('toWeekCach');
          } else {
            _this.setData({
              disabled: false
            });

            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },

        fail: function () {
          wx.hideToast({});

          _this.setData({
            disabled: false
          });

          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    /**
     * 获取考勤计划详情
     * 
     * 1. 将查询出来的人员选择 - 数据处理 - 存入缓存。
     */
    getPlanDetails: function (planId) {
      var _this = this;

      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.getAttendancePlanDetail + '?teacherId=' + userInfoCach.personId + '&planId=' + planId,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取考勤计划详情返回', res.data);

          if (res.data && res.data.code == 200) {
            let data = res.data.rows;
            data.startTime = app.globalData.PublicUtil.formatTimeTwo(data.startTime, 'h:m');
            data.endTime = app.globalData.PublicUtil.formatTimeTwo(data.endTime, 'h:m');
            app.globalData.StorageUtil.set('departmentCach', _this.dealSelectResponse(data.target.department));
            app.globalData.StorageUtil.set('majorCach', _this.dealSelectResponse(data.target.profession));
            app.globalData.StorageUtil.set('classCach', _this.dealSelectResponse(data.target.classes));
            app.globalData.StorageUtil.set('toWeekCach', data.weekCycle); // app.StorageUtil.set('sendPageObjCach', data);
            // 处理成页面显示数据

            _this.getPageData(data); // 当前时间正在考勤，不能修改


            let isRange = _this.isWithinRange(false); // 是否在指定范围内


            wx.hideLoading();

            if (isRange) {
              app.globalData.ShowMsgUtil.showErrorModal('修改失败', '考勤执行期间不能修改考勤计划！');
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                });
              }, 2000);
            }
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },

    /** 
     * 1. 数据处理
     * 
     * 添加标志位，checked是选中状态  isDetail是详情数据（是修改还是新增）
     */
    dealSelectResponse: function (array) {
      for (let i = 0; i < array.length; i++) {
        array[i].checked = true;
        array[i].isDetail = true;
      }

      return array;
    },

    /** 
     * 确定修改
     * 
     */
    confirmUpdate: function () {
			console.log(this.planId)
      var _this = this;

      if (requestObj.name == '') {
        app.globalData.ShowMsgUtil.showErrorModal('发送失败', '考勤名称不能为空');
        return;
      }

      if (requestObj.startTime == '') {
        app.globalData.ShowMsgUtil.showErrorModal('发送失败', '考勤开始时间不能为空');
        return;
      }

      if (requestObj.endTime == '') {
        app.globalData.ShowMsgUtil.showErrorModal('发送失败', '考勤开始时间不能为空');
        return;
      }

      if (requestObj.attendances == '') {
        app.globalData.ShowMsgUtil.showErrorModal('发送失败', '考勤人员不能为空');
        return;
      }

      this.isFeasible(); // 判断开始时间与结束时间的范围为10 ~ 30分钟

      let isRange = this.isWithinRange(true); // 是否在指定范围内

      console.log('isRange', isRange);

      if (isRange) {
        wx.showModal({
          title: '提示',
          content: '考勤已过，考勤计划将在明天执行',

          success(res) {
            if (res.confirm) {
              _this.requestSend(_this.planId);

              return;
            } else if (res.cancel) {
              console.log('用户点击取消');
              return;
            }
          }

        });
      } else {
        this.setData({
          disabled: true
        });

        _this.requestSend(_this.planId);
      }
    },

    /**
     * 延迟结束时间选择
     */
    bindDelayTimeChange: function () {
      let _this = this;

      let list = ['5分钟', '10分钟', '15分钟'];
      wx.showActionSheet({
        itemList: list,
        success: function (res) {
          if (!res.cancel) {
            _this.setData({
              delayIndex: res.tapIndex,
              delayTime: list[res.tapIndex]
            });
          }
        }
      });
    },

    /**
     * 获取一个考勤计划创建后提前多少时间执行通知学生
     */
    getAdvanceTime: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.attendanceRequestUrl.getAdvanceTime,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取提前时间返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.setData({
              advanceTime: res.data.rows
            });

            _this.bindStartTime(res.data.rows);
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
     * 工具方法
     * 
     * 用于判断输入的时间是否指定的范围内
     */
    isWithinRange: function (isSave) {
      // 1.判断考勤时间是否是今天
      let weekCycle = this.pageObj.weekCycle; // 获取设置星期数组

      let nowTime = app.globalData.PublicUtil.formatTimeTwo(new Date(), 'Y-M-D h:m:s'); // 获取当前日期

      let nowArray = app.globalData.PublicUtil.getDates(1, nowTime); // 获取今天是星期几

      for (let i = 0; i < weekCycle.length; i++) {
        if (weekCycle[i] == nowArray[0].week) {
          // 若星期是相等的则是同一天
          // 2. 判断
          //编辑 - 当前时间 是否在开始时间 - (提前时间+5) ~ 结束时间+延迟时间这个范围以内
          //新增 - 当前时间 是否 大于开始时间 - 提前时间
          let startTime = this.pageObj.startTime;
          let endTime = this.pageObj.endTime; // 获取开始时间

          let nowTime = app.globalData.PublicUtil.formatTimeTwo(new Date(), 'Y-M-D');
          let sTime = nowTime + ' ' + startTime + ':00';
          let eTime = nowTime + ' ' + endTime + ':00'; // (1)开始时间+提前时间 的时间戳

          let minDate = new Date(sTime);
          let min = minDate.getMinutes(); // 获取当前分钟

          if (isSave) {
            minDate.setMinutes(min - this.advanceTime);
          } else {
            minDate.setMinutes(min - (this.advanceTime + 5));
          } // (2)结束时间+延迟时间 的时间戳


          let maxDate = new Date(eTime);
          let max = maxDate.getMinutes(); // 获取当前分钟

          let delayTime = this.dealDelayTime();
          maxDate.setMinutes(max + delayTime); // (3)当前时间戳

          let nowDate = new Date().getTime(); // 3. 开始时间大于minData 与 结束时间小于maxData  在范围内
          // let startData = new Date(sTime).getTime();
          // let endData = new Date(eTime).getTime();
          // console.log('minDate', minDate);
          // console.log('nowDate', nowDate);
          // console.log('maxDate', maxDate);
          //考勤计划是否正在执行中。

          if (isSave) {
            // 执行中不让修改
            if (minDate.getTime() <= nowDate) {
              return true;
            }
          } else {
            // 考勤计划是否当天执行
            if (minDate.getTime() <= nowDate && nowDate <= maxDate.getTime()) {
              return true;
            }
          }
        }
      }

      return false;
    },

    dealDelayTime() {
      if (this.delayIndex == 0) {
        return 5;
      } else if (this.delayIndex == 1) {
        return 10;
      } else if (this.delayIndex == 1) {
        return 15;
      }

      return 5;
    }

  }
};
</script>
<style>
@import "./attendaceSend.css";
</style>