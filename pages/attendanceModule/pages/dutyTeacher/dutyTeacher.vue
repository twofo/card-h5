<template>
	<view>
		<select-recevice :checkboxItems="checkboxItems" :isCheckAllShow="isCheckAllShow" :sHeight="sHeight"
			:stidentCount="stidentCount" :disableds="disableds" :loadNotice="loadNotice" @lower="lower"
			@singleChecked="singleChecked" @myevent="onMyEvent" @refresherpulling="resfresh"></select-recevice>
	</view>
</template>

<script>
	var app = getApp();
	import selectRecevice from "../../../../components/attendanceModule/selectRecevice/selectRecevice";

	export default {
		data() {
			return {
				checkboxItems: [],
				disableds: true,
				stidentCount: false,
				isCheckAllShow: false,
				sHeight: 500,
				loadNotice: "下拉加载更多",
				nomore: false,
				//已加载完成
				currentPage: 0,
				//当前页
				totalPage: null,
				//数据的总长度
				// 房间类型
				roomType: 2,
				//琴房2 练功房 3
				limitSelectPerson: null,
				//使用身份 dutyTeacher 责任教师(练功房使用)
				oldId: null //原选择责任教师id 
					,
				oomType: "",
				startT: "",
				endT: "",
				danceObj: "",
				triggered: false
			};
		},

		components: {
			selectRecevice
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		resfresh: function(e) {
			console.log(11111111)
		},
		onLoad: function(options) {
			console.log(app.globalData.SystemInfo);
			let sHeight = app.globalData.SystemInfo.windowHeight - 150;
			console.log(sHeight);

			if (options.roomType) {
				this.setData({
					oomType: options.roomType,
					limitSelectPerson: options.limitSelectPerson,
					startT: options.startTime,
					endT: options.endTime
				});
				let searchType, roleType;

				if (options.limitSelectPerson == "dutyTeacher") {
					searchType = 4;
					roleType = 16;
					uni.setNavigationBarTitle({
						title: '公共资源_练功房预约_责任教师'
					})
				}

				let startT = options.startTime;
				let endT = options.endTime;
				this.searchPersonnel(searchType, roleType, startT, endT, 5);
				this.setData({
					searchType: searchType,
					roleType: roleType,
					startT: startT,
					endT: endT,
					take: 5,
				})
				if (options.id) {
					this.setData({
						oldId: options.id
					});
				}
			}

			let checkboxItems = [ // {
				//   id:110,
				//   name: '小艾 (教师 20200812)',
				//   selectType:4,
				//   selectRole:1,
				//   isHasChild:0,
				//   value:11104,
				//   checked:false
				// },
			];
			this.setData({
				sHeight,
				checkboxItems
			});
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 页面下拉刷新事件
		 * 
		 */
		onPullDownRefresh: function(searchPersonnel) {
			console.log(this.searchType)
			let searchType = this.searchType
			let roleType = this.roleType
			let startT = this.startT
			let endT = this.endT
			let take = this.take
			if (take >= 5) {
				take += 5
			}
			this.searchPersonnel(searchType, roleType, startT, endT, take)
			wx.stopPullDownRefresh();
		},
		methods: {

			searchPersonnel: function(searchType, roleType, startT, endT, take) {
				console.log(take)
				var _this = this;
				app.globalData.ShowMsgUtil.netErrNotice();
				var haveCheckboxItem = [];
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				wx.request({
					url: app.globalData.RequestUrl.appointmentRequestUrl.searchPersonnel + '?searchType=' +
						searchType + '&roleType=' + roleType + "&startTime=" + startT + "&endTime=" + endT +
						"&take=" + take,
					method: 'GET',
					header: {
						'token': userInfoCach.token
					},
					success: function(res) {
						wx.hideToast({});
						console.log('人员搜素返回"', res.data);

						if (res.data && res.data.code == 200) {
							var checkboxItems = [];
						let totalPage = res.data.rows.peoples.length;
				        let totalPages=res.data.rows.sum
						console.log(totalPages)

							if (totalPage <= 0) {
								_this.setData({
									checkboxItems: res.data.rows.peoples
								});
							} else {
								if (totalPage != _this.currentPage && totalPage <totalPages) {
									// wx.hideNavigationBarLoading();
									//   wx.showNavigationBarLoading();
									_this.setData({
										loadNotice: "上拉加载更多"
									});
								} else {
									_this.setData({
										loadNotice: "到底了",
										nomore: true
									});
								}
								for (let i = 0; i < res.data.rows.peoples.length; ++i) {
									let partment = {};
									// console.log("--------------------------------------------------------------------");
									// console.log(_this.oldId);

									if (_this.oldId != null) {
										//判断checked状态
										// console.log(haveCheckboxItem)
										var resdata = _this.dealSelectPerson(_this.oldId, res.data.rows.peoples[
											i]);
									}

									partment.id = res.data.rows.peoples[i].selectId;
									partment.name = res.data.rows.peoples[i].selectName;
									partment.selectType = res.data.rows.peoples[i].selectType;
									partment.selectRole = res.data.rows.peoples[i].selectRole;
									partment.isHasChild = res.data.rows.peoples[i].isHasChild;
									let val = res.data.rows.peoples[i].selectRole + res.data.rows.peoples[i].selectId + res
										.data.rows.peoples[i].selectType;
									partment.value = String(val)
									partment.checked = resdata;
									checkboxItems[i] = partment; // _this.setData({
									//   [`checkboxItems[${i}]`]:checkboxItems[i] ,
									// })
								}



								console.log(checkboxItems);

								_this.setData({
									disableds: false,
									currentPage: totalPage,
									checkboxItems
								});
							}
						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);

							_this.setData({
								loadNotice: "加载失败"
							});

							return;
						}
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}
				});
			},

			/**
			 *判断是否是已经选择数据  true 为已选择 false为未选择
			 */
			dealSelectPerson: function(id, resdata) {
				console.log(id);
				console.log(resdata);

				if (parseInt(id) == resdata.selectId) {
					return true;
				} else {
					return false;
				}
			},

			// 点击回调
			onMyEvent(e) {
				console.log(e);
				let result = e.detail;
				let reCheckbox = result.checkboxItems;

				if (reCheckbox.length <= 0) {
					app.globalData.ShowMsgUtil.showNoneToast("必须选择一位教师", 1500);
					return;
				}

				if (reCheckbox.length > 1) {
					app.globalData.ShowMsgUtil.showNoneToast("只能选择一位教师", 1500);
					return;
				}


				var danceObj = {
					dutyTeacher: reCheckbox[0].name,
					id: reCheckbox[0].id
				};
				uni.$emit('updateDutyteacher', {
					danceObj: danceObj
				})

				wx.navigateBack({
					delta: 1
				});
			},

			// 单选回调
			singleChecked(e) {
				console.log("单选", e);
				this.setData({
					disableds: false
				});
			},

			lower(e) {
				console.log(e);
				let touchEnd = e.detail.touchEnd;
				let {
					nomore
				} = this
				if (!nomore) {
					let searchType, roleType;
					let startT = this.startT;
					let endT = this.endT;

					if (this.limitSelectPerson == "dutyTeacher") {
						searchType = 4;
						roleType = 16;
					}

					this.searchPersonnel(searchType, roleType, startT, endT, this.currentPage * 2);
					this.setData({
						loadNotice: "加载中"
					});
				}
			}

		}
	};
</script>
<style>
	@import "./dutyTeacher.css";
</style>
