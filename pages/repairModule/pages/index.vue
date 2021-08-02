<template>
	<view>
		<view class="page">
			<view class="page__bd" style="background-color: #f7f7f7;">
				<!-- 一、首页 -->
				<block v-if="tabBarIndex==0" >
					<mp-index :backgroundImage="ImageUrl.bgRepairHeader" :list="pendingLists"
						:repairNumber="repairNumber" :sum="sum" :listLength="indexListLength" @pull="bindPullUp"
						:height="repairHeight"></mp-index>
				</block>
				<!-- 二、工单 -->

				<block v-if="tabBarIndex==1">
					<!-- navbar导航 -->
					<navbar class="reReNav" :tabs="tabs" @clickTabs="bindClickTabs"></navbar>
					<!-- 维修列表 -->
					<repair-list :list="list" @call="bindCallPhone" 
						:listLength="workOrderListLength" @pull="bindPullUp"></repair-list>
				</block>
				<!-- 三、消息中心 -->
				<block v-if="tabBarIndex==2">
					<!-- 上层 -->
					<view class="background-up">
						<view class="background-up-top"
							:style="'width: ' + (windowWidth*0.92) + 'px;border-radius: 10px;'">
							<!-- 功能导航 -->
							<view class="wx-items">
								<view v-for="(item, index) in pageData.showOptions" :key="index">
									<navigator
										:url="'/pages/indexModule/pages/messageListOfType/messageListOfType?type=' + item.type">
										<view class="wx-item" v-if="index<5"
											:style="'height:60px;width: 32px;margin:' + (windowHeight*0.26*0.08) + 'px ' + (windowWidth*0.92*0.05) + 'px;'">
											<image :src="item.image" class="item-image"></image>
											<image :src="item.allUnreadImage" class="item-red-point"></image>
											<text class="item-name">{{item.name}}</text>
										</view>
									</navigator>
								</view>
							</view>

						</view>

						<!-- 标题 -->
						<view class="msg-title">
							<view class="myui-cell">
								<view class="weui-cell__bd">
									今日消息（{{pageData.todayNewNumber}}/5）
								</view>
								<view class="weui-cell__ft myui-read" @tap="bindToAllRead">
									<view style="display:flex;justify-content: center;">
										<image :src="ImageUrlApp.msgUnread"
											style="width:18px;height:15px;margin:0px 8px;"></image>
									</view>
									<view>一键全部已读</view>
								</view>
							</view>
						</view>
						<!-- 消息列表 -->
						<view v-if="pageData.showOfNewest!==''">
						<new-lists  :alarmNewsList="pageData.showOfNewest"
														:height="windowHeight-200" 
														:itemHeight="106" 
														@bindDealMsg="bindDealMsg" 
														@getMore="getMore" ></new-lists>
														
						</view>
						<view v-else style="margin-top:30%;">
							<view class="weui-loadmore weui-loadmore_line">
								<view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
							</view>
							<view class="weui-loadmore weui-loadmore_line weui-loadmore_dot">
								<view
									class="weui-loadmore__tips weui-loadmore__tips_in-line weui-loadmore__tips_in-dot">
								</view>
							</view>
						</view>

					</view>


					<!-- 下层 -->
					<view class="background-top"
						:style="'height: ' + (windowHeight*0.12) + 'px; width: 100%;background-color: rgb(32,164,247);'">
					</view>

					<view class="background-bottom" :style="'height: ' + (windowHeight*0.88-7) + 'px; width: 100%;'">
					</view>
				</block>
				<!-- 四、我的 -->
				<block v-if="tabBarIndex==3">
					<view class="user-info">
						<header-pic :pic="pic" :userInfoCach="userInfoCach" @userdetail="bindUserDetail" isMine="true"
							@qrcode="bindqrcode"></header-pic>
					</view>
					<!--  -->
					<view class="myui-items__header">
						<view class="myui-item" @tap="getFinishOrder">
							<image :src="ImageUrl.mineFunRecord" style="width:100rpx;height:100rpx;"></image>
							<text>工单统计</text>
						</view>
						<view style="height: 130rpx;border-right: 2px #bbb solid;margin:auto;"></view>
						<view class="myui-item" @tap="getComment">
							<image :src="ImageUrl.icStars" style="width:100rpx;height:100rpx;"></image>
							<text>综合评价</text>
						</view>
					</view>
					<!-- 功能列表组件 -->
					<mine-list :mineList="mineList"> </mine-list>
				</block>
			</view>
		</view>

		<mp-tabbar style="position:fixed;bottom:0;width:100%;left:0;right:0;" :list="tabBarList" @change="tabChange"
			:current="current"></mp-tabbar>
	</view>
</template>

<script>
	var app = getApp();
	var ImageUrl = require("../resources/utils/imageUrl.js");
	var Util = require("../resources/utils/utils.js");

	var ImageUrlApp = app.globalData.ImageUrl;
	var ImageUrls = app.globalData.ImageUrl;
	import newLists from "../../../components/tarbarModule/newList/newList";
	import mpTabbar from "../../../components/common/tarbBar/tarbBar";
	import mpIndex from "../resources/components/index/index";
	import navbar from "../../../components/attendanceModule/navbar/navbar";
	import repairList from "../../../components/repairModule/repairList/repairList";
	import mineList from "../../../components/mineModule/mineList/mineList";
	import headerPic from "../../../components/mineModule/mineHeader/mineHeader";

	export default {
		data() {
			return {
				tabBarIndex: 0,
				// tabBar的序号 - 用于显示页面内容
				current: 0,
				navTo:false,
				// 用于显示tabBar 
				tabBarList: [{
					text: "首页",
					iconPath: ImageUrl.navHomePage,
					selectedIconPath: ImageUrl.navHomePagePressed
				}, {
					text: "工单",
					iconPath: ImageUrl.navWorkerOrder,
					selectedIconPath: ImageUrl.navWorkerOrderPressed,
					badge: 'New'
				}, {
					text: "消息",
					iconPath: ImageUrl.navNew,
					selectedIconPath: ImageUrl.navNewPressed,
					badge: 'New'
				}, {
					text: "我的",
					iconPath: ImageUrl.navMine,
					selectedIconPath: ImageUrl.navMinePressed,
					badge: 'New'
				}],
				// 首页
				ImageUrl: ImageUrl,
				pendingLists: [], // 待处理报修列表
				repairNumber: 0, // 新进工单数
				// 工单
				tabs: ["全部", "待处理", "处理中", "已完成"],
				activeIndex: 0, //选中了哪一块
				list: [],
				// 我的
				pic: '',
				mineList: [],
				userInfoCach: {},
				// 上拉与下拉
				// 1. 定义请求次数（即下拉刷新）
				pullDownNumberOfIndex: 0, // 首页 - 请求计数
				pullDownNumberOfWorkOrder: 0, // 工单 - 请求计数
				workOrderListLength: 1, // 工单展示数据的长度，用于判断已经查询所有数据
				indexListLength: 1, // 首页展示数据的长度，用于判断已经查询所有数据

				// 消息中心   TODO
				windowHeight: 0, //获取屏幕高度
				windowWidth: 0,
				pageData: {}, //页面显示数据
				ImageUrlApp: ImageUrlApp,
				repairHeight: 485,
				slientH: 0,
				statusHeight: 0,
				orderHeight: 350,
				sum:0,//订单总条
			};
		},

		components: {
			newLists,
			mpTabbar,
			mpIndex,
			navbar,
			repairList,
			mineList,
			headerPic
		},
		props: {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onLoad: function() {
			let slientH = app.globalData.SystemInfo.screenHeight;
			let statusHeight = app.globalData.SystemInfo.statusBarHeight;
			let repairHeight = slientH - statusHeight - 310;
			this.setData({
				repairHeight,
				slientH,
				statusHeight
			});
			console.log(slientH, statusHeight, repairHeight); // 0.首页数据查询

			if (this.tabBarIndex == 0) {
				let status = [];
				status = [2];
				this.getListByStatus(status, 5, 0);
			} // 1.获取缓存


			const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); // 2.处理显示数据

			var mines = [];
			mines = app.globalData.Constant.arrayConstant.maintainAdminCenterList;
			this.setData({
				'mineList': mines,
				'userInfoCach': userInfoCach
			}); // 3.获取图像

			this.getPicData(); // 消息中心   TODO
			// if (this.data.tabBarIndex == 2) {

			app.globalData.ShowMsgUtil.showLoadToast();
			this.setData({
				windowHeight: wx.getSystemInfoSync().windowHeight,
				windowWidth: wx.getSystemInfoSync().windowWidth,
				userInfoCach: userInfoCach
			}); // 获取消息功能

			this.getOptions(); // 获取当日最新消息
			this.getNewest(); // }
		},
	onShow: function() {
		// 1. 根绝消息类别查询这一类消息   @pull="bindPullUp"
		uni.$on('bindPullUp', this.bindPullUp)
		uni.$on('bindDealMsg', this.bindDealMsg)
		uni.$on('getMore', this.getMore)
		// this.getListByType(this.type, 1, 5);
		this.disabled = false
	},
	onHide: function() {
		uni.$off('bindPullUp', this.bindPullUp)
		uni.$off('bindDealMsg', this.bindDealMsg)
		uni.$off('getMore', this.getMore)
	},
	onUnload: function() {
		uni.$off('bindPullUp', this.bindPullUp)
		uni.$off('bindDealMsg', this.bindDealMsg)
		uni.$off('getMore', this.getMore)
	},
		//下拉更新
		onPullDownRefresh: function() {
			var _this = this;

			_this.setData({
				pendingLists: [],
				// 待处理报修列表
				list: [],
				pullDownNumberOfIndex: 0,
				// 首页 - 请求计数
				pullDownNumberOfWorkOrder: 0 // 工单 - 请求计数

			});

			let status = [];

			if (_this.tabBarIndex == 0) {
				status = [2];
				this.getListByStatus(status, 5, 0);
			} else if (_this.tabBarIndex == 1) {
				status = [2, 3, 4, 5];
				this.getListByStatus(status, 5, 0);
			}
		},
		//下拉更新
		onPullDownRefresh: function() {
			// 获取消息功能
			this.getOptions(); // 获取当日最新消息

			this.getNewest();
		},
		methods: {
			/**
			 * 点击tabBar事件
			 */
			tabChange(e) {
				console.log('tab change', e.detail.index)
				let tabBarIndex = e.detail.index;
				this.setData({
					tabBarIndex: tabBarIndex
				}); // console.log('e.detail.index', e.detail.index);

				app.globalData.StorageUtil.set('tabBarIndex', tabBarIndex);

				if (tabBarIndex == 0) {
					this.setData({
						pendingLists: [],
						pullDownNumberOfWorkOrder: 0
					});
					let status = [];
					status = [2];
					this.getListByStatus(status, 5, 0);
				} else if (tabBarIndex == 1) {
					let status = [];
					status = [2, 3, 4, 5];
					this.getListByStatus(status, 5, 0);
					this.setData({
						list: [],
						pullDownNumberOfIndex: 0,
						isInit: true
					});
					let {
						slientH,
						statusHeight
					} = this;
					const query = uni.createSelectorQuery().in(this); //选择id
					var that = this;
					query.select('.reReNav').boundingClientRect(function(rect) {
						console.log(111, rect);
						let orderHeight = slientH - statusHeight - rect.height - 120;
						console.log(orderHeight)
						that.setData({
							orderHeight: orderHeight
						});
					}).exec();
				}
			},
			//点击更多详情跳转
            getMore(e) {
            console.log('消息页面点击详情  ------------',e);
            console.log(this.pageData);
            var index = e.detail.index;
            var type = this.type;
   		      if(this.pageData.showOfNewest.length > 0){
   			
   			var childType = this.pageData.showOfNewest[index].childType;
   			var mid = this.pageData.showOfNewest[index].id;
   			var msg = this.pageData.showOfNewest[index].msg;
   			if (msg != '已读') {
   				this.markRead({mid: mid});
   			}
   			console.log(mid)
   			app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.messageDetailUrl + '?mid=' + mid, 500);
   		}
   },
   
			/**
			 *   //获取订单总数

			 * 首页 - 报修列表查询
			 * 
			 * 根据状态查询报修列表
			 */
			getListByStatus: function(status, take, skip) {
				var _this = this;
				app.globalData.ShowMsgUtil.netErrNotice();
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				let listLength = _this.list.length;
				let listLengthOfIndex = _this.pendingLists.length;
				wx.request({
					url: app.globalData.RequestUrl.repairRequestUrl.selectRepairsList + '?statusType=' +
						status + '&take=' + take + '&skip=' + skip,
					method: 'GET',
					header: {
						'token': userInfoCach.token
					},
					success: function(res) {
						console.log('查询报修列表返回', res.data);

						if (res.data && res.data.code == 200) {
							if (_this.tabBarIndex == 0) {
								_this.pullDownNumberOfIndex++;

								let data = _this.dealOfIndex(res.data.rows.lists);

								_this.setData({
									indexListLength: listLengthOfIndex,
									pendingLists: data,
									repairNumber: res.data.rows.number
								});
							} else if (_this.tabBarIndex == 1) {
								_this.pullDownNumberOfWorkOrder++;

								let data = _this.deal(res.data.rows.lists);

								console.log(data);

								_this.setData({
									workOrderListLength: listLength,
									list: data
								});
							}
						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
							return;
						}
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showErrorModal('请求失败', '后台连接失败！');
					},
					complete: function() {
						wx.hideToast();
					}
				});
			},

			/**
			 * 首页 - 处理成页面显示数据
			 */
			dealOfIndex: function(data) {
				for (var i = 0; i < data.length; i++) {
					let btnList = [{
						btnName: '处理',
						btnBind: 'toDeal'
					}];
					data[i].deviceName = Util.deviceType(data[i].deviceTypeId);
					data[i].statusName = Util.status(data[i].repairStatus);
					data[i].image = data[i].images != null ? data[i].images[0] : '';
					data[i].btnList = btnList;
				}

				return data;
			},

			/**
			 * 工单
			 * 
			 * 点击navbar
			 * 每请求一次对应的计数加一。当改变activeIndex时，下拉刷新时计数清空。
			 */
			bindClickTabs: function(e) {
				console.log('navbar组件点击', e.detail.activeIndex);
				let activeIndex = e.detail.activeIndex;
				this.setData({
					list: [],
					pullDownNumberOfWorkOrder: 0,
					activeIndex: activeIndex
				});
				this.dealStatusByActiveIndex(activeIndex, 5, 0);
			},
			dealStatusByActiveIndex: function(activeIndex, take, skip) {
				let status = []; // 根据点击不同的navbar查询不同

				if (activeIndex == 0) {
					status = [2, 3, 4, 5];
					this.getListByStatus(status, take, skip);
				} else if (activeIndex == 1) {
					status = [2];
					this.getListByStatus(status, take, skip);
				} else if (activeIndex == 2) {
					status = [3];
					this.getListByStatus(status, take, skip);
				} else if (activeIndex == 3) {
					status = [4, 5];
					this.getListByStatus(status, take, skip);
				}
			},

			/**
			 * 工单
			 * 
			 * 将请求返回数据处理成页面显示数据
			 */
			deal: function(data) {
				for (var i = 0; i < data.length; i++) {
					// let obj = {};
					data[i].deviceName = Util.deviceType(data[i].deviceTypeId);
					data[i].statusName = Util.status(data[i].repairStatus);
					data[i].image = data[i].images != null ? data[i].images[0] : '';
					let obj = {};
					let list = [];

					if (data[i].repairStatus == 1) {
						obj = {};
						obj.btnName = '处理';
						obj.btnBind = 'toDeal';
						list[0] = obj;
					} else if (data[i].repairStatus == 2) {		
						obj = {};
						obj.btnName = '处理';
						obj.btnBind = 'toDeal';
						list[0] = obj;
					} else if (data[i].repairStatus == 3) {
						let time = data[i].toMaintainTime == null ? '暂未确定' : data[i].toMaintainTime;
						data[i].msg = '维修时间：' + time;
						obj = {};
						obj.index = 3;
						obj.btnName = '查看详情';
						obj.btnBind = 'toDetailOfMaintain';
						list[0] = obj;
						obj = {};
						obj.btnName = '维修完成';
						obj.btnBind = 'toFinish';
						list[1] = obj;
					} else if (data[i].repairStatus == 4 || data[i].repairStatus == 5 || data[i].repairStatus == 6) {
						let time = data[i].toMaintainTime == null ? '暂未确定' : data[i].toMaintainTime;
						data[i].msg = '维修时间：' + time;
						obj = {};
						obj.index = 4;
						obj.btnName = '查看详情';
						obj.btnBind = 'toDetailOfMaintain';
						list[0] = obj;
					}

					data[i].btnList = list;
				}

				return data;
			},

			/**
			 * 我的
			 */

			/**
			 * 获取图片
			 */
			getPicData: function() {
				var _this = this;
				app.globalData.ShowMsgUtil.netErrNotice();
				wx.request({
					url: app.globalData.RequestUrl.baseRequestUrl.getImage,
					header: {
						'token': _this.userInfoCach.token
					},
					method: 'GET',
					success: function(res) {
						console.log('获取头像', res.data);

						if (res.data && res.data.code === 200) {
							_this.setData({
								pic: res.data.rows.url
							});
						}
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showErrorModal('请求失败', '后台连接失败！');
					}
				});
			},

			/** 
			 * 我的
			 * 
			 * 已完成工单
			 */
			getFinishOrder: function() {
				app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.finishOrderStatisticsUrl,
					500);
			},
			getComment: function() {
				app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.commentStatisticsUrl,
				500);
			},
			//上滑加载更多
			bindPullUp: function() {
				var _this = this;

				if (_this.tabBarIndex == 0) {
					let status = [];
					status = [2];
					this.getListByStatus(status, (this.pullDownNumberOfIndex + 1) * 5, 0);
				} else if (_this.tabBarIndex == 1) {
					this.dealStatusByActiveIndex(this.activeIndex, (this.pullDownNumberOfWorkOrder + 1) * 5, 0);
				}
			},

			/**
			 * 跳转到用户详情页面
			 */
			bindUserDetail: function(e) {
				app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.minePageUrl.userDetail, 500);
			},
			bindqrcode: function() {
				app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.minePageUrl.QRCodeDetail, 500);
			},

			/**
			 * 消息中心 - TODO
			 */

			/**
			 * 获取功能选项
			 */
			getOptions: function() {
				var _this = this;
				app.globalData.ShowMsgUtil.netErrNotice();
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				wx.request({
					url: app.globalData.RequestUrl.appoprRequestUrl.unreadStatistics,
					method: 'GET',
					header: {
						'token': userInfoCach.token
					},
					success: function(res) {
						console.log('获取消息功能选项', res.data.rows);

						if (res.data && res.data.code == 200) {
							_this.dealShowOfOptions(res.data.rows);
						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
						}
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToast('后台连接失败', 2000);
					},
					complete: function() {
						wx.hideNavigationBarLoading();
					}
				});
			},
			// 处理拖布功能选择 - 显示数据
			dealShowOfOptions: function(data) {
				if (data.length == 0) {
					this.pageData.showOptions = [];
					this.setData({
						pageData: this.pageData
					});
					return;
				}

				const image = [ImageUrlApp.msgPay, ImageUrlApp.msgAttendance, ImageUrlApp.msgAlarm, ImageUrlApp
					.msgOther, ImageUrlApp.msgNotice, ImageUrlApp.msgRepair
				];

				for (let i = 0; i < data.length; i++) {
					data[i].image = image[data[i].type - 1];

					if (!data[i].allRead) {
						data[i].allUnreadImage = ImageUrlApp.msgClue;
					}
				}

				this.pageData.showOptions = data;
				this.setData({
					pageData: this.pageData
				});
			},

			/**
			 * 获取当日最新消息
			 */
			getNewest: function() {
				var _this = this;
				app.globalData.ShowMsgUtil.netErrNotice();
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				wx.request({
					url: app.globalData.RequestUrl.appoprRequestUrl.getNewest + '/5',
					method: 'GET',
					header: {
						'token': userInfoCach.token
					},
					success: function(res) {
						console.log('获取当日最新消息', res.data);

						if (res.data && res.data.code == 200) {
							let todayNewNumber = res.data.rows.length;
							_this.pageData.todayNewNumber = todayNewNumber;

							_this.setData({
								pageData: _this.pageData
							});

							_this.dealShowOfNewest(res.data.rows);
						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
						}
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToast('后台连接失败', 2000);
					},
					complete: function() {
						wx.hideNavigationBarLoading();
					}
				});
			},
			// 处理今日消息
			dealShowOfNewest: function(data) {
				if (data.length == 0) {
					this.pageData.showOfNewest = [];
					this.setData({
						pageData: this.pageData
					});
					return;
				}

				let array = [];
				for (let i = 0; i < data.length; i++) {
					let obj = {};
					obj.id = data[i].id;
					obj.typeName = this.dealMsgType(data[i].type);
					obj.messageTitle = data[i].messageTitle;
					obj.messageContent = data[i].messageContent;
					obj.messageSendTime = data[i].messageSendTime;
					obj.msg = data[i].messageRead == 0 ? '未读' : '已读';
					obj.type = data[i].type;
					obj.childType = data[i].childType;
                   obj.extras = data[i].extras;
					if (data[i].messageRead == 0) {
						obj.image = ImageUrlApp.msgClue;
					}

					array[i] = obj;
				}

				this.pageData.showOfNewest = array;
				this.setData({
					pageData: this.pageData
				});
			},
			dealMsgType: function(type) {
				var name = '';

				switch (type) {
					case 1:
						name = '支付';
						break;

					case 2:
						name = '考勤';
						break;

					case 3:
						name = '告警';
						break;

					case 4:
						name = '其他';
						break;

					case 5:
						name = '公告';
						break;

					case 6:
						name = '报修';
						break;

					default:
						name: '未知';

						break;
				}

				return name;
			},

			/**
			 * 将消息设为已读
			 */
			bindToAllRead: function() {
				let flag = false;
				var pageData = this.pageData; // 判读所有大类型的公告是否未读

				if (pageData.showOptions.length > 0) {
					for (let i = 0; i < pageData.showOptions.length; i++) {
						if (!pageData.showOptions[i].allRead) {
							flag = true;
						}
					}
				} // 判断今日信息的最新公告是否未读

				if (pageData.showOfNewest.length > 0) {
					for (let i = 0; i < pageData.showOfNewest.length; i++) {
						if (pageData.showOfNewest[i].msg === '未读') {
							flag = true;
						}
					}
				}

				if (flag) {
					this.markRead();
				}
			},
			markRead: function() {
				var _this = this;
				app.globalData.ShowMsgUtil.netErrNotice();
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				wx.request({
					url: app.globalData.RequestUrl.appoprRequestUrl.markRead,
					data: {
						markAll: true
					},
					header: {
						'token': userInfoCach.token
					},
					method: 'POST',
					success: function(res) {
						// console.log('将消息设为已读', res.data);
						if (res.data && res.data.code == 200) {
							// 更新页面数据
							_this.getOptions();

							_this.getNewest();
						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
						}
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToast('后台连接失败', 2000);
					},
					complete: function() {
						wx.hideNavigationBarLoading();
					}
				});
			},

			/**
			 * 根据不同的type、childtype。
			 * 对指定消息进行不同的处理
			 */
			bindDealMsg: function(e) {
				console.log(2222222222)
				var index = e.detail.index;
				var type = this.pageData.showOfNewest[index].type;
				var childType = this.pageData.showOfNewest[index].childType;
				var mid = this.pageData.showOfNewest[index].id;
				var extra=this.pageData.showOfNewest[index].extras;
				var extra=JSON.parse(extra)
				var msg = this.pageData.showOfNewest[index].msg;
				if (msg != '已读') {
					this.markRead({mid: mid});
				}
				this.dealMsg(type, childType, mid,extra);
			},
			// 对指定消息进行不同的处理
			dealMsg: function(type, childType, mid,extra) {
				// 考勤大类 - 考勤通知
				
					const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				if (type == 2  && childType == 1) {
					// 处理数据
					app.globalData.ShowMsgUtil.showErrorModal('注意', '请前往考勤打卡页面进行打卡！'); // 跳转到考勤打卡页面
				}  
				if(userInfoCach.personType!==0) {
					// 跳转到详情页面	
             app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.repairPageUrl.repairDetailOfMaintainUrl + '?repairCode=' + extra.repairCode, 500);
		    		 
				}
			}
		}
	};
</script>
<style>
	@import "./index.css";
</style>
