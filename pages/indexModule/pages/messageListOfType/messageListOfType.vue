<template>
	<view class="pages">
		<view class="page__bd">

			<!-- 标题 -->
			<view class="msg-title">
				<view class="myui-cell">
					<view class="weui-cell__bd">
						消息列表
					</view>
					<view class="weui-cell__ft myui-read" @tap="bindToAllRead">
						<view style="display:flex;justify-content: center;">
							<image :src="ImageUrl.msgUnread" style="width:18px;height:16px;margin:0px 10px;"></image>
						</view>
						<view>一键已读</view>
					</view>
				</view>
			</view>

			<!-- 消息列表 -->
			<view class="lists" v-if="pageData.alarmTypeNews.length>0">
				<new-lists :alarmNewsList="pageData.alarmTypeNews" :height="windowHeight*0.9" :listLength="listLength" :itemHeight="itemHeight"
				 :type="type" @bindDealMsg="bindDealMsg" @getMore="getMore" @bindPullUp="bindPullUp"></new-lists>
			</view>
			<view v-else style="margin-top:50%;">
				<view class="weui-loadmore weui-loadmore_line">
					<view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
				</view>
				<view class="weui-loadmore weui-loadmore_line weui-loadmore_dot">
					<view class="weui-loadmore__tips weui-loadmore__tips_in-line weui-loadmore__tips_in-dot"></view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	var app = getApp();
	var ImageUrl = app.globalData.ImageUrl;
	import newLists from "../../../../components/tarbarModule/newList/newList";

	export default {
		data() {
			return {
				windowHeight: 0,
				//获取屏幕高度
				windowWidth: 0,
				pageData: {
					alarmTypeNews: []
				},
				//页面显示数据
				ImageUrl: ImageUrl,
				type: 0,
				// 消息类型
				// 1. 定义请求次数（即下拉刷新）
				pullDownNumber: 0,
				listLength: 1,
				// 用于判断是否将所有数据查询出来
				itemHeight: 126, // 
				// TODO
				// 根据type与childType对消息的点击事件进行处理。
				disabled: false,
			};
		},

		components: {
			newLists
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {

			console.log(options)
			// 确保缓存里的设备数据存在
			var type = options.type;

			if (type == '' || type == null) {
				app.globalData.ShowMsgUtil.showErrorModal('显示失败', '详情显示失败！');
				setTimeout(function() {
					wx.hideToast();
					wx.navigateBack({
						delta: 1
					});
				}, 2000);
			}

			console.log(typeof type)
			let itemHeight = type == 1 ? 76 : 106;
			this.setData({
				itemHeight: itemHeight,
				type: parseInt(type)
			}); // 1. 查询消息详情
			// this.getListByType(type, 1, 5);
			// 2. 将该条消息修改为已读

			this.getListByType(this.type, 1, 5);
			this.setData({
				windowHeight: wx.getSystemInfoSync().windowHeight,
				windowWidth: wx.getSystemInfoSync().windowWidth
			});
		},
		onShow: function() {
			// 1. 根绝消息类别查询这一类消息   @pull="bindPullUp"
			uni.$on('bindPullUp', this.bindPullUp)
			uni.$on('bindDealMsg', this.bindDealMsg)
			uni.$on('getMore', this.getMore)
			this.getListByType(this.type, 1, 5);
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

		/**
		 * 下拉刷新的实现
		 */
		onPullDownRefresh: function() {
			this.setData({
				pageData: {},
				pullDownNumber: 0
			});
			// 1. 根绝消息类别查询这一类消息

			this.getListByType(this.type, 1, 5);
		},
		methods: {
			/**
			 * 获取一类消息
			 */
			getListByType: function(type, pageNumber, pageSize) {
				// app.ShowMsgUtil.showLoadToast();
				var _this = this;
				app.globalData.ShowMsgUtil.netErrNotice();
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				let listLength = app.globalData.PublicUtil.isNotEmpty(_this.pageData, this) ? _this.pageData.alarmTypeNews.length :
					0;
				wx.request({
					url: app.globalData.RequestUrl.appoprRequestUrl.getListByType,
					data: {
						type: type,
						pageNumber: pageNumber,
						pageSize: pageSize
					},
					header: {
						'token': userInfoCach.token
					},
					method: 'POST',
					success: function(res) {
						console.log('获取一类消息数据', res.data.rows);

						if (res.data && res.data.code == 200) {
							_this.pullDownNumber++; // 获取一类消息数据

							_this.dealShowOfNewest(res.data.rows);

							_this.setData({
								listLength: listLength
							});
						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
						}
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToast('后台连接失败', 2000);
					},
					complete: function() {
						wx.hideToast();
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
					obj.messageTitle = data[i].messageTitle; // obj.messageTitle = data[i].messageTitle == '' ? '无' : data[i].messageTitle;

					obj.messageContent = data[i].messageContent;
					obj.messageSendTime = data[i].messageSendTime;
					obj.msg = data[i].messageRead == 0 ? '未读' : '已读';
					obj.messageRead = data[i].messageRead;
					obj.type = data[i].type;
					obj.childType = data[i].childType;
					obj.extras = data[i].extras;
					obj.wxMessagePageValue = data[i].wxMessagePageValue;

					if (data[i].messageRead == 0) {
						obj.image = ImageUrl.msgClue;
					}

					array[i] = obj;
				}

				console.log('array', array);
				this.pageData.alarmTypeNews = array;
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
						name = '未知';
						break;
				}

				return name;
			},

			/**
			 * 将一类消息设为已读
			 */
			bindToAllRead: function() {
				let flag = false;
				var pageData = this.pageData; // 判读这类所有消息是否未读     防止恶意点击

				if (pageData.alarmTypeNews.length > 0) {
					for (let i = 0; i < pageData.alarmTypeNews.length; i++) {
						if (pageData.alarmTypeNews[i].messageRead == 0) {
							flag = true;
						}
					}
				}

				if (flag) {
					let data = {
						markType: this.type
					};
					this.markRead(data);
				} else { // console.log('无已读消息');
				}
			},
			markRead: function(data) {
				var _this = this;
				app.globalData.ShowMsgUtil.netErrNotice();
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				wx.request({
					url: app.globalData.RequestUrl.appoprRequestUrl.markRead,
					data: data,
					header: {
						'token': userInfoCach.token
					},
					method: 'POST',
					success: function(res) {
						console.log('将消息设为已读', res.data);
						if (res.data && res.data.code == 200) {
							// 更新页面数据
							_this.getListByType(_this.type);
						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
						}
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToast('后台连接失败', 2000);
					}
				});
			},

			/**
			 * 上拉更新 
			 */
			bindPullUp: function() {
				console.log('上拉刷新', this.pullDownNumber)
				this.getListByType(this.type, 1, (this.pullDownNumber + 1) * 5);
			},

			/**
			 * 根据不同的type、childtype。
			 * 对指定消息进行不同的处理
			 */
			bindDealMsg: function(e) {
				console.log(e)
				console.log(this.type)
				var index = e.detail.index;
				var type = this.type;
				var childType = this.pageData.alarmTypeNews[index].childType;
				var mid = this.pageData.alarmTypeNews[index].id;
				var msg = this.pageData.alarmTypeNews[index].msg;
				var extras = this.pageData.alarmTypeNews[index].extras == "" ? null : this.pageData.alarmTypeNews[index].wxMessagePageValue;
				// console.log(childType,mid,msg);
				this.dealMsg(type, childType, mid, msg, extras);
			},

			getMore(e) {
				console.log(e)
				app.globalData.ShowMsgUtil.showLoadToast("正在跳转", 1500);
				var index = e.detail.index;
				var type = this.type;
				var childType = this.pageData.alarmTypeNews[index].childType;
				var mid = this.pageData.alarmTypeNews[index].id;
				var msg = this.pageData.alarmTypeNews[index].msg;
				console.log(this.pageData)
				if (msg != '已读') {
					this.markRead({
						mid: mid
					});
				}
				app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.messageDetailUrl + '?mid=' + mid, 1500);
			},

			// 对指定消息进行不同的处理

			/*** 
			 * extras中参数的含义:
			 * 
			 *    msgType        1 - 琴房    2 - 会议室  3 - 归寝
			 * 
			 *    childMsgType   1 - 开始通知(会议室结束通知)
			 *                   2 - 预约申请通知(归寝请假/补卡预约)
			 *                   3 - 预约审核通知(归寝请假/补卡审核) -- 
			 *                   4 - 会议补卡/请假预约通知
			 *                   5 - 会议请假/补卡审核
			 *                   6 - 会议取消通知
			 *                   7 - 会议编辑通知
			 */
			dealMsg: function(type, childType, mid, msg, extras) {
				console.log(childType,mid,msg);
				let navigeteData = extras; //消息跳转数据
				if (this.disabled) return;
				console.log(navigeteData);
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); // 考勤大类 - 考勤通知
				// if (type == 2 && childType == 1 && userInfoCach.role == null) {
				this.disabled = true
				if (type == 2 && userInfoCach.role == null) {
					// 处理数据
					// 消息已读
					let data = {
						mid: mid
					};

					if (msg != '已读') {
						this.markRead(data);
					}

					if (navigeteData) {
						app.globalData.ShowMsgUtil.showLoadToast("正在跳转", 500);

						if (navigeteData.msgType == 1) { //琴房
							if (navigeteData.childMsgType == 1 || navigeteData.childMsgType == 2 || navigeteData.childMsgType == 3 ||
								navigeteData.childMsgType == 4) {
								//琴房详情
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl +
									'?meetingId=' + navigeteData.id + '&type=2&jumpType=newsTo', 500);
							}else if(navigeteData.childMsgType == 6 ){ //琴房预约通知（资源管理员
							 app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl + '?meetingId=' + navigeteData.id + '&type=2&conflict=1&jumpType=newsTo', 500);
							}else if(navigeteData.childMsgType == 5){ //琴房预约取消通知（资源管理员）
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl + '?meetingId=' + navigeteData.id + '&type=2&conflict=1&jumpType=newsTo', 500);
							}

						} else if (navigeteData.msgType == 2) { //会议室
							if (navigeteData.childMsgType == 1) {
								//预约开始(即需考勤)
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendMeetingDetailUrl +
									'?meetingId=' + navigeteData.id +'&type=newsTo', 500);
							} else if (navigeteData.childMsgType == 2) {
								//会议室申请 未审核 -->前往审批页面
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.approvalInfoUrl+'&type=newsTo', 500);
							} else if (navigeteData.childMsgType == 3) {
								// 审核结果
								// app.PublicUtil.navigateByUrl(app.PageUrl.appointmentPageUrl.attendMeetingDetailUrl+'?meetingId='+navigeteData.id,500)
								// 会议室审核失败  -->前往会议详情页面
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.meetingDetailUrl +
									'?meetingId=' + navigeteData.id+'&type=newsTo', 500);
							} else if (navigeteData.childMsgType == 4) {
								//请假/补卡预约  -->前往审批页
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.approvalInfoUrl+'&type=newsTo', 500);
							} else if (navigeteData.childMsgType == 5) {
								//请假/补卡审核  -->前往考勤详情页
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendMeetingDetailUrl +
									'?meetingId=' + navigeteData.id+'&type=newsTo', 500);
							} else if (navigeteData.childMsgType == 6) { //会议取消 不跳转
								wx.hideToast();
							} else if (navigeteData.childMsgType == 7) {
								//会议修改  -->前往考勤详情
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendMeetingDetailUrl +
									'?meetingId=' + navigeteData.id+'&type=newsTo', 500);
							}
						} else if (navigeteData.msgType == 3) { //归寝
							if (navigeteData.childMsgType == 1) {
								// 归寝开始
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.attendancePageUrl.studentClockUrl + "?planId=" +
									navigeteData.id + "&executePlanId=" + navigeteData.executePlanId, 500);
							} else if (navigeteData.childMsgType == 2) {
								// 归寝请假/补卡
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.approvalInfoUrl, 500);
							} else if (navigeteData.childMsgType == 3) {
								//请假/补卡审批结果
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.attendancePageUrl.studentStatisticsUrl +
									"?planId=" + navigeteData.id, 500);
							}
						} else if (navigeteData.msgType == 4) { //报修

						} else if (navigeteData.msgType == 5) { //练功房
							if (navigeteData.childMsgType == 1 || navigeteData.childMsgType == 2 || navigeteData.childMsgType == 3 ||
								navigeteData.childMsgType == 4) {
								//练功房详情
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl +
									"?meetingId=" + navigeteData.id + '&type=3&jumpType=newsTo', 500);
							} else if (navigeteData.childMsgType == 5) {
								//练功房预约(资源管理员)
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl +
									"?meetingId=" + navigeteData.id + '&type=3&conflict=1&jumpType=newsTo', 500);
							} else if (navigeteData.childMsgType == 6) {
								//审批
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.approvalInfoUrl +'&type=newsTo', 500);
							} else if (navigeteData.childMsgType == 7) {
								//练功房审批结果
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl +
									"?meetingId=" + navigeteData.id + '&type=3&jumpType=newsTo', 500);
							} else if (navigeteData.childMsgType == 8) {
								//练功房取消预约
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl +
									"?meetingId=" + navigeteData.id + '&type=3&jumpType=newsTo', 500);
							}
						}
					}
				} else {
					if (msg != '已读') {
						this.markRead({
							mid: mid
						});
					}
					// 跳转到详情页面
					app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.indexPageUrl.messageDetailUrl + '?mid=' + mid, 500);
				}
			}
		}
	};
</script>
<style>
	@import "./messageListOfType.css";
</style>
