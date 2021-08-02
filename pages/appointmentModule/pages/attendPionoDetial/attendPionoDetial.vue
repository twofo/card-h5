<template>
	<view>
		<view>

			<atten-detail @cancelAppiontment="cancelAppiontment" @contactAdmin="contactAdmin" :titleTxtArr="titleTxtArr"
				:detailArr="detailArr" :conflict='conflict' :freeTxtArr="freeTxtArr"></atten-detail>
		</view>

	</view>
</template>

<script>
	var app = getApp();
	var ImageUrl = require("../../resources/utils/imageUrl.js");
	import attenDetail from "../../../../components/attendanceModule/attenDetail/attenDetail";

	export default {
		data() {
			return {
				meetingId: 0,
				detailArr: {
					titleArr: []
				},
				titleTxtArr: ['地址', '预约时间', "预约人", '备注'],
				freeTxtArr: ['费用', '总计时间', '消费免费时长', '总计花费', "实际支付", '支付方式'],
				allowCancelAppointmentTime: null,

				/***练功房需要数据 */
				type: 2,
				//练功房 3 
				username: '', //学生 0

				conflict: -1,
                 personTypes:null
			};
		},

		components: {
			attenDetail
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {

			console.log(options);
			this.setData({
				meetingId: options.meetingId,
				type: options.type
			});
			let calData = options.type == 2 ? app.globalData.StorageUtil.get('pianoConfigDate') : app.globalData
				.StorageUtil.get('danceConfigDate');
			console.log(calData)
			if (calData == '') {
				this.getAppointmentConfigure(options.type);
			} else {
				this.setData({
					allowCancelAppointmentTime: calData.configureDtos.allowCancelAppointmentTime
				})
			}

			const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
              this.setData({
				  username: userInfoCach.username
			  })
			   console.log('第一次的idType',this.idType)
			if (options.type && options.type === '3') {
				//练功房数据
				let idType = userInfoCach.personType;
				let username=userInfoCach.username
				let titleTxtArr = this.titleTxtArr;
				console.log('titleTxtArr-----',titleTxtArr)
				uni.setNavigationBarTitle({
					title: "公共资源_练功房预约记录_详情"
				});

				if (idType == 0) {
					titleTxtArr = ['地址', '预约时间', "预约人", "责任教师", '备注'];
				}

				this.setData({
					titleTxtArr,
					username,

				});
			} else {
				uni.setNavigationBarTitle({
					title: "公共资源_琴房预约记录_详情"
				});
			}

			if (options.type==3) {
				this.setData({
					conflict: Number(options.conflict)
				})
				uni.setNavigationBarTitle({
					title: "公共资源_练功房预约记录_详情"
				});
			}else{
				uni.setNavigationBarTitle({
					title: "公共资源_琴房预约记录_详情"
				});
			}

			this.getDetailById(options.meetingId);
		},
		methods: {
			// 获取配置时间
			getAppointmentConfigure: function(roomType) {
				console.log('465');
				console.log(roomType);
				var _this = this;
				app.globalData.ShowMsgUtil.netErrNotice();
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				uni.request({
					url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentConfigure +
						'?areaType=' + roomType,
					method: 'GET',
					header: {
						'token': userInfoCach.token
					},
					success: function(res) {
						console.log('获取预约，所需的配置信息"', res.data);

						if (res.data && res.data.code == 200) {
							let data = res.data.rows;
							app.globalData.StorageUtil.set('pianoConfigDate', data);

							_this.setData({
								allowCancelAppointmentTime: data.configureDtos
									.allowCancelAppointmentTime
							});
						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
							return;
						}
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}
				});

			},

			// 取消预约
			cancelAppiontment(e) {
				let meetingId = e.detail.meetingId;
				app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
				app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl
					.cancelPianoAppiontmentUrl + "?meetingId=" + meetingId + "&roomType=" + this.type, 500);
			},

			// 获取详情
			getDetailById: function(appointmentId) {
				console.log(appointmentId);
				app.globalData.ShowMsgUtil.showLoadAndMsgToast();
				app.globalData.ShowMsgUtil.netErrNotice();
				var _this = this;

				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				uni.request({
					url: app.globalData.RequestUrl.appointmentRequestUrl.getAreaAppointmentDetail +
						appointmentId + "/detail?areaType=" + this.type,
					method: 'GET',
					header: {
						'token': userInfoCach.token
					},
					success: function(res) {
						console.log("琴房详情", res.data);
						if (res.data && res.data.code == 200) {
							_this.setData({
								personTypes:res.data.data.appointmentInfo.appointmentUserCode
							})
							console.log(res.data.data.appointmentInfo, res.data.data.appointmentChargeInfo,
								res.data.data.buildManagerInfo, res.data.data.pianoCancelNodeInfo, res
								.data.data.attendanceInfo);
							
							_this.dataReduce(res.data.data.appointmentInfo, res.data.data
								.appointmentChargeInfo, res.data.data.buildManagerInfo, res.data.data
								.pianoCancelNodeInfo, res.data.data.attendanceInfo);
						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
							return;
						}
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					},
					complete: function() {
						uni.hideToast({});
					}
				});
			},

			// 时间戳转换日期方法
			timesToTime(times) {
				var date = new Date(times);
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
				var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
				var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
				let timeObj = {
					yearMountDay: Y + M + D,
					hourM: h + m
				};
				return timeObj;
			},

			dataReduce(data1, data2, data3, data4, data5) {
				console.log(data1, data2, data3, data4, data5);
				let obj = {};
				if (data1) {
					let arr = [];
					obj.pulishTime = data1.applyTime;

					if (data1.remark == null || data1.remark == '') {
						obj.reason = '无';
					} else {
						obj.reason = data1.remark;
					}

					let startTime = data1.startTime;
					let endTime = data1.endTime;
					/** 收费以上的信息 将以数组形式进行显示 **/

					arr[0] = data1.addressStr == null ? '无' : data1.addressStr;
					arr[1] = this.timesToTime(startTime).yearMountDay + this.timesToTime(startTime).hourM + '-' + this
						.timesToTime(endTime).hourM;
					arr[2] = data1.appointmentUserName;
					arr[3] = obj.reason;
					/** 模拟数据 练功房  责任教师数据 */
					//  data1.dutyteacher = "小艾"

					if (this.type && this.type === '3') {
						if (data1.appointmentType == 2) {
							arr[3] = data1.approvalTeacherR[0];
							arr[4] = obj.reason;

						} else if (this.idType == 0) {
							console.log(data1)
							arr[3] = data1.approvalTeacherR[0].selectName;
							arr[4] = obj.reason;
						}
					}
					obj.roomType = this.type
					obj.titleArr = arr;
					// obj.founder = data1.appointmentUserName
					// obj.adress = data1.pianoAddress
					// obj.appiontTime = this.timesToTime(startTime).yearMountDay + this.timesToTime(startTime).hourM + '-' + this.timesToTime(endTime).hourM

					obj.id = data1.id;
					obj.attendTime = this.timesToTime(startTime).yearMountDay + this.timesToTime(startTime).hourM;
					var status = data1.status; //var status = -3   //0申请中、1未开始、2使用中、3已结束、-1退费、-2已取消  -3已过期、-4已拒绝

					if (status == 0) {
						obj.listType = '申请中';
						obj.statusImage = ImageUrl.checkPendingPic;
						obj.nostart = true;

						if (this.type == '3') {
							//是否允许修改预约 true允许
							obj.showEditAppiont = false;
						}

						let freeTxtArr = ['费用', '总计时间', '消费免费时长', '总计花费', "待支付", '支付方式'];
						this.setData({
							freeTxtArr
						});
					} else if (status == 1) {
						obj.listType = '未开始';
						obj.statusImage = ImageUrl.nostartPic;
						obj.nostart = true;
					} else if (status == 2) {
						obj.listType = '进行中';
						obj.statusImage = ImageUrl.readyStartPic;
						obj.showQcode = true;

						if (this.type == '3') {
							obj.showEditAppiont = true;
						}

						let calData = app.globalData.StorageUtil.get('pianoConfigDate');
						let cancelTime = this.allowCancelAppointmentTime;
						let calTT = startTime + 1000 * 60 * cancelTime;
						let nowTTT = new Date().getTime();

						if (nowTTT > calTT) {
							obj.showQcode = false;
							obj.normalAttend = true;

							if (this.type == '3') {
								obj.showEditAppiont = false;
							}
						}
					} else {
						obj.statusImage = ImageUrl.approvePic;

						if (status == 3) {
							obj.listType = '已结束';
							obj.normalAttend = true;
						} else if (status == -1) {
							obj.listType = '取消中';
							obj.statusImage = ImageUrl.checkPendingPic;
							obj.cancelMeeting = true;
							obj.cancelStatus = '预约取消中';
						} else if (status == -3) {
							obj.listType = '已过期';
							obj.normalAttend = true;
							obj.statusImage = ImageUrl.meetingOutPic;
							let freeTxtArr = ['费用', '总计时间', '消费免费时长', '总计花费', "待支付", '支付方式'];
							this.setData({
								freeTxtArr
							});
						} else if (status == -2) {
							obj.listType = '已取消';
							obj.cancelMeeting = true;
							obj.cancelStatus = '预约已申请取消';
							obj.statusImage = ImageUrl.unapprovePic;
						} else if (status == -4) {
							obj.listType = '已拒绝';
							obj.cancelMeeting = true;
							obj.cancelStatus = '申请未通过'; // obj.cancelReason = "已有人预约"

							obj.checkedTime = data1.cancelAppointmentTime;
							obj.showEditBtn = true;
							obj.statusImage = ImageUrl.unapprovePic;
						}
					}
				}

				if (data2) {
					obj.sumTime = data2.totalTimeLength;
					obj.freeTime = data2.feeTimeLength;
					obj.sumCount = data2.totalConsume;
					obj.payfor = data2.prepaymentConsume != null ? data2.prepaymentConsume : data2.realityConsume;

					if (data2.payMethod == 0) { //付款渠道(0系统代扣，1微信支付，2支付宝支付，3银联支付 4二维码 5卡 6人脸)

						obj.payforType = '系统代扣';
					} else if (data2.payMethod == 1) {
						obj.payforType = '微信支付';
					} else if (data2.payMethod == 2) {
						obj.payforType = '支付宝支付';
					} else if (data2.payMethod == 3) {
						obj.payforType = '银联支付';
					} else if (data2.payMethod == 4) {
						obj.payforType = '二维码支付';
					} else if (data2.payMethod == 5) {
						obj.payforType = '卡支付';
					} else if (data2.payMethod == 6) {
						obj.payforType = '人脸支付';
					} else {
						obj.payforType = '无';
					}
				}

				if (data3) {
					obj.phone = data3.pianoManagerPhoneNumber;
					obj.adminId = data3.id;
					obj.adminName = data3.pianoManagerName;
				}

				if (data4 != null) {
					obj.cancelTime = data4.cancelAppointmentTime == null ? '' : data4.cancelAppointmentTime;
					obj.checkCancelTime = data4.approveRefundTime == null ? '' : data4.approveRefundTime;
					obj.canceltype = data4.refundStatus;
					obj.appointmentStatus = data4.appointmentStatus;

					if (obj.appointmentStatus == -1) {
						obj.normalAttend = false;
						obj.cancelMeeting = true;
					} //obj.cancelReason = data4.cancelReason //取消预约理由


					if (obj.canceltype == 2) {
						obj.refunding = true;
					} else if (obj.canceltype == 3) {
						obj.refundSuccess = true;
						obj.shouldRefundCharge = data4.pianoRefundChargeInfo.shouldRefundCharge;
						obj.serviceCharge = data4.pianoRefundChargeInfo.serviceCharge;
						obj.realityDeductionMoney = data4.pianoRefundChargeInfo.realityDeductionMoney;
					} else if (obj.canceltype == 4) {
						obj.refundFail = true; //obj.refundReason = data4.refundReason   //取消预约失败原因
					}
				}

				if (data5 != null) {
					// 签到以及最终结果状态
					let reObj = {};

					if (data5.checkInInfo) {
						console.log(data5);
						let checkInInfo = data5.checkInInfo; // 签到
						var reStatus = checkInInfo.status; //20正常 21未签到 22正常签退 30系统签退  
						switch (reStatus) {
							case 20:
								reObj.statusTxt = "正常出席";
								reObj.icon = 'success';
								reObj.iconColor = '#20A4F7';
								reObj.id = checkInInfo.appointmentId;
								reObj.Adress = checkInInfo.checkInRoomName;
								reObj.checkTime = checkInInfo.checkInTime == null ? '无' : app.globalData.PublicUtil
									.formatTimeTwo(checkInInfo.checkInTime, 'Y-M-D h:m');
								reObj.checkOut = data1.status == -2 || data1.status == -1 ? false : true;
								reObj.toOut = "前往签退";
								break;
							case 21:
								reObj.statusTxt = "未签到";
								reObj.icon = 'cancel';
								reObj.iconColor = '#FA6400';
								reObj.id = checkInInfo.appointmentId;
								reObj.Adress = checkInInfo.checkInRoomName;
								reObj.checkTime = checkInInfo.checkInTime == null ? '无' : app.globalData.PublicUtil
									.formatTimeTwo(checkInInfo.checkInTime, 'Y-M-D h:m');
								reObj.toSign = '前往签到';
								reObj.toSignIcon = data1.status == 1 || data1.status == 2 ? true : '';
								break;

							case 22:
								reObj.statusTxt = "正常签退";
								reObj.icon = 'success';
								reObj.iconColor = '#20A4F7';
								reObj.id = checkInInfo.appointmentId;
								reObj.Adress = checkInInfo.checkInRoomName;
								reObj.checkTime = checkInInfo.checkInTime == null ? '无' : app.globalData.PublicUtil
									.formatTimeTwo(checkInInfo.checkInTime, 'Y-M-D h:m');
								break;

							case 30:
								reObj.statusTxt = "系统签退";
								reObj.icon = 'success';
								reObj.iconColor = '#20A4F7';
								reObj.id = checkInInfo.appointmentId;
								reObj.Adress = checkInInfo.checkInRoomName;
								reObj.checkTime = checkInInfo.checkInTime == null ? '无' : app.globalData.PublicUtil
									.formatTimeTwo(checkInInfo.checkInTime, 'Y-M-D h:m');
								break;
						}
					} // 签退

					if (data5.checkOutInfo) {
						let checkOutInfo = data5.checkOutInfo;
						var reStatusOut = checkOutInfo.status;
						reObj.signOutInfo = true;
						reObj.checkOut = false;
						console.log(checkOutInfo);

						switch (reStatusOut) {
							case 20:
								reObj.statusTxtOut = "正常出席";
								reObj.iconOut = 'success';
								reObj.iconColorOut = '#20A4F7';
								reObj.AdressOut = checkOutInfo.checkInRoomName;
								reObj.checkTimeOut = checkOutInfo.checkInTime == null ? '无' : app.globalData.PublicUtil
									.formatTimeTwo(checkOutInfo.checkInTime, 'Y-M-D h:m');
								reObj.checkOutOut = true;
								reObj.toOutOut = "前往签退";
								break;

							case 21:
								reObj.statusTxtOut = "未签到";
								reObj.iconOut = 'cancel';
								reObj.iconColorOut = '#FA6400';
								reObj.AdressOut = checkOutInfo.checkInRoomName;
								reObj.checkTimeOut = checkOutInfo.checkInTime == null ? '无' : app.globalData.PublicUtil
									.formatTimeTwo(checkOutInfo.checkInTime, 'Y-M-D h:m');
								reObj.toSignOut = '前往签到';
								reObj.toSignIconOut = true;
								break;

							case 22:
								reObj.statusTxtOut = "正常签退";
								reObj.iconOut = 'success';
								reObj.iconColorOut = '#20A4F7';
								reObj.AdressOut = checkOutInfo.checkInRoomName;
								reObj.checkTimeOut = checkOutInfo.checkInTime == null ? '无' : app.globalData.PublicUtil
									.formatTimeTwo(checkOutInfo.checkInTime, 'Y-M-D h:m');
								break;

							case 30:
								reObj.statusTxtOut = "系统签退";
								reObj.iconOut = 'success';
								reObj.iconColorOut = '#20A4F7';
								reObj.AdressOut = checkOutInfo.checkInRoomName;
								reObj.checkTimeOut = checkOutInfo.checkInTime == null ? '无' : app.globalData.PublicUtil
									.formatTimeTwo(checkOutInfo.checkInTime, 'Y-M-D h:m');
								break;
						}
					}

					obj.resultObj = reObj;
				} // 如果当前是 申请中, 已过期,已拒绝 ,则没有签到结果显示


				if (data1.status == 0 || data1.status == -3 || data1.status == -4) {
					obj.resultObj = null;
				}

				console.log(obj);
				this.setData({
					detailArr: obj
				});
			
				let  personTypes=this.personTypes
				let  username=this.username
				// console.log(this.personTypes)
			 //  console.log('idType',this.idType)
			uni.$emit("virtual", {
				personTypes: personTypes,
				username: username
			})
			},

			contactAdmin(e) {
				let phone = e.detail.phone;

				if (phone == 'undefined' || phone == '' || phone == null) {
					app.globalData.ShowMsgUtil.showNoneToast('管理员未绑定手机号码,暂时无法联系!', 2000);
					return;
				}

				uni.showModal({
					title: '呼叫',
					content: '拨打' + phone,
					cancelText: '取消',
					confirmText: '拨打',
					confirmColor: '#20a4f7',

					success(res) {
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: phone
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}

				});
			}

		}
	};
</script>
