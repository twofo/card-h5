<template>
	<view class>
		<view class="header">
			<selects :selectBox="selectBox" @bindValue="bindValue" @showPick='showPicker'></selects>
		</view>
		<view class="content" v-if="roomList.length>0 && !showPick ">
			<!--    <view :class="[covering==true?'conten':'content']" v-if="roomList.length>0 && !showPick "> -->
			<pianolist @lowers="lower" @pull="bindPullUp" :roomList="roomList" :height="windowHeight-70"
				@toDetail="toDetail">
			</pianolist>
			<!-- <view v-for="(item, index) in roomList" :key="index" class="roomList" @tap="bindItems" :data-ind="item.roomId">
      <view class="roomName">
        {{item.roomName}}
      </view> 
      <view class="appiontRace">
        预约率{{item.race}}%
      </view>
      <view class="roomType" v-if="item.roomType">
        {{item.roomType}}
      </view>
    </view> -->
		</view>
		<view v-if="roomList.length<=0 && !showPick ">
			<view class="nomore">暂无房间</view>
		</view>
	</view>
</template>
<script>
	var app = getApp();
	import selects from "../../../../components/common/pinofloor/pinofloor";
	import pianolist from "../../../../components/common/pianolist/consumeRecordList";
	export default {
		data() {
			return {
				selectBox: [],
				roomList: [],
				currentDay: null,
				//默认日期或选中日期
				selectAreaId: 0,
				selectType: null,
				scrollHeight: 0,
				pullDownNumber: 0,
				// 练功房需要字段
				roomType: 2, //获取时间和楼栋类型  //琴房2 练功房3
				showPick: false,
				windowHeight: 510,
				listLength: 1,
				nomore: false,
				// skip:0,
				recordCount: 0,
				listLength: 1,
				skip: 0,
				take: 8,
				judge: true,
				isCanLoad: true,
				bottom: false,
				d: '到底了',
				odd: '',
				pianoroom: false,
				covering: false,
				pinodatalist: '',
				selectvalue: '',
				pinotype: '',
				bindPull: false,
				bindpino: true,
				floorvalue: '',
			};
		},
		components: {
			selects,
			pianolist
		},
		onReachBottom: function() {},
		onBackPress: function(event) {
			console.log(event.from);
			if (event.from) {
				console.log('446');
			}
		},
		onLoad: function(options) {
			this.pinotype = options.roomType;
			let s = options.roomType;
			uni.$emit("virtual", {
				value: s,
			})
			this.recordCount = 0;
			this.isCanLoad = true;
			this.setData({
				windowHeight: wx.getSystemInfoSync().windowHeight
			});

			if (options.roomType) {
				this.setData({
					roomType: options.roomType
				});
				if (options.roomType == 2) {
					uni.setNavigationBarTitle({
						title: '公共资源_琴房预约_选择场次'
					})
				} else {
					uni.setNavigationBarTitle({
						title: '公共资源_练功房预约_选择场次'
					})
					uni.$emit("martial", {
						value: 1,
					})
				}
			}
			this.selectBoxReduce();
		},
		mounted() {
			uni.$on("covering", (options) => {
				if (options.value) {
					this.setData({
						covering: true,
					})
				}
			})
		},
		methods: {
			showPicker(e) {
				console.log(e);
				this.showPick = e.showPick;
			},
			selectBoxReduce() {
				this.selectvalue = 1;
				let data = this.roomType == 2 ? app.globalData.StorageUtil.get('pianoConfigDate') : app.globalData
					.StorageUtil.get('danceConfigDate');
				setTimeout(function() {
					uni.$emit("floorInfo", {
						value: data.buildInfoDtos,
					})

				}, 10);
				let arr = [];
				if (data.weekDtos.length > 0) {
					let obj = {}; // obj.roomType = "时间选择"
					obj.roomType = data.weekDtos[0].dayWeek + "(" + data.weekDtos[0].dateStr + ")";
					let objArr = [];
					for (let i = 0; i < data.weekDtos.length; i++) {
						let bj = {};
						bj.name = data.weekDtos[i].dayWeek + "(" + data.weekDtos[i].dateStr + ")";
						bj.id = i;
						bj.timestamp = data.weekDtos[i].timestamp;
						objArr.push(bj);
					}
					obj.array = objArr;
					arr.push(obj); // 默认选中日期
					var currentDay = data.weekDtos[0].timestamp;
				}
				if (data.buildInfoDtos.length > 0) {
					let obj = {};
					//进来的时候默认选择楼栋
					obj.roomType = "楼栋选择";
					obj.roomType = data.buildInfoDtos[0].buildName;
					let objArr = [];
					for (let i = 0; i < data.buildInfoDtos.length; i++) {
						let bj = {};
						bj.name = data.buildInfoDtos[i].buildName;
						bj.id = data.buildInfoDtos[i].buildId;
						objArr.push(bj);

					}
					var selectAreaId = data.buildInfoDtos[0].buildId;
					if (selectAreaId) {
						this.judge = false;
						this.selectvalue = 1;
						setTimeout(function() {
							uni.$emit('firstpino', {
								value: selectAreaId,
							})

						}, 10);
						this.floorvalue = 3;
					} else {
						this.floorvalue = 2;
					}
					obj.array = objArr;
					arr.push(obj);
				}
				if (data.areaTypeDtos.length > 0) {
					let obj = {};
					obj.roomType = "类型选择";
					let objArr = [];
					for (let i = 0; i < data.areaTypeDtos.length; i++) {
						let bj = {};
						bj.name = data.areaTypeDtos[i].name;
						bj.id = data.areaTypeDtos[i].type;
						objArr.push(bj);
					}
					obj.array = objArr;
					arr.push(obj);
				}
				this.setData({
					selectBox: arr,
					currentDay,
					selectAreaId
				});
				// console.log(this.currentDay);

				if (data.buildInfoDtos.length > 0) {
					if (typeof selectAreaId === 'undefined') {
						return
					}
					var url = '&selectDate=' + this.currentDay + '&selectAreaId=' + selectAreaId + "&selectAreaLayer=1";
				} else {
					var url = '&selectDate=' + this.currentDay + "&selectAreaLayer=1";
				}
				this.getAppointmentDetail(url, 4, 0);
			},
			// 根据区域类型获取所有房间
			getAppointmentDetail: function(url, take, skip) {
				var _this = this;
				console.log(url)
				app.globalData.ShowMsgUtil.netErrNotice();
				let type = this.roomType;
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				wx.request({
					url: app.globalData.RequestUrl.appointmentRequestUrl.getAppointmentDetail + '?areaType=' +
						type + url + '&take=' + _this.take + '&skip=' + _this.skip,
					method: 'GET',
					header: {
						'token': userInfoCach.token
					},
					success: function(res) {
							let totalPage = res.data.rows.totalResponses;
							console.log(res.data.rows.totalResponses)
							  console.log('21111111',totalPage)
							_this.setData({
								totalPage: totalPage
							})
							console.log(_this.totalPage)
						wx.hideToast({});
						if (res) {}
						if (res.data && res.data.code == 200) {
							_this.reduceData(res.data.rows.responses);
						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
							return;
						}
						this.odd = res.data.rows.responses.length;
						let s = res.data.rows.responses.length;
						if (res.data.rows.responses.length % 2 == 1) {
							setTimeout(function() {
								uni.$emit("virtual", {
									value: 1,
									label: 2
								})
							}, 10);
							uni.$emit("virtual", {
								value: 1,
								label: 2
							})
						} else {
							uni.$emit("evennumber", {
								value: 1,
							})
						}
						if (_this.bindPull == true) {
							if (res.data.rows.responses.length != _this.recordCount) {
								_this.isCanLoad = true;
								_this.recordCount = res.data.rows.responses.length;

							} else {
								console.log('12313')
								_this.bindpino = false;
								uni.$emit("selectOption", {
									value: 1,
									label: 2
								})

								_this.setData({
									nomore: true,
									bottom: true
								})
							}
							if (_this.pianoroom == true) {
								this.isCanLoad = true;
							} else {
								this.isCanLoad = false;
							}

						}
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}
				});
			},
			//数据的添加
			reduceData(data) {
				let arr = [];
				if (data.length > 0) {
					let len = data.length;
					for (let i = 0; i < len; i++) {
						let obj = {};
						obj.roomId = data[i].roomId;
						obj.roomName = data[i].buildStr + '>' + data[i].roomStr;
						// if(this.pinotype=='2'){

						// }
						obj.roomType = data[i].detailOfDayDto[0].pianoTypeName;
						obj.race = data[i].detailOfDayDto[0].appointmentRate;
						arr.push(obj);
					}
				}
				this.setData({
					roomList: arr
				});
				console.log('前端总条数',this.roomList.length)
				        console.log('后端总条数',this.totalPage)
				        let roomList = this.roomList.length
				        let totalPage = this.totalPage
				        uni.$emit("set", {
				          roomList: roomList,
				          totalPage:totalPage
				        })
				
			},
			//选择框选择改变url
			bindValue(e) {
				console.log(e);
				this.selectvalue = 1;
				if (e.detail.selectAreaLayer == '2') {
					this.selectvalue = 2
				} else {
					this.selectvalue = 1;
				}
				this.recordCount = 0;
				this.bindpino = true;
				this.pianoroom = true;
				uni.$emit("floor", {
					value: 1
				})
				uni.$emit("select", {
					value: 1
				})
				let type = e.detail.type;
				let currentDay = this.currentDay;
				let selectAreaId = this.selectAreaId;
				let selectType = this.selectAreaLayer;
				let take;
				if (type == 0) {
					currentDay = e.detail.timestamp;
				}
				console.log(currentDay);
				if (type == 1) {
					// selectAreaId = e.detail.val.id;
					selectAreaId = e.detail.id;

				}
				if (type == 2) {
					selectType = e.detail.val.id;
				}
				this.take = 8;
				take = this.take;
				this.setData({
					currentDay,
					selectAreaId,
					selectType,
					take,
					bottom: false,
					isCanLoad: true,
					showPick: e.detail.showPick
				});
				if (typeof selectAreaId === 'undefined') {
					return
				}
				if (selectType == null) {
					var url = '&selectDate=' + currentDay + '&selectAreaId=' + selectAreaId + "&selectAreaLayer=" + this
						.selectvalue;
				} else {
					var url = '&selectDate=' + currentDay + '&selectAreaId=' + selectAreaId + "&selectAreaLayer=" + this
						.selectvalue + "&selectType=" + selectType;
				}
				//选择框选择
				this.getAppointmentDetail(url, 4, 0);
			},
			//下拉加载
			bindPullUp: function(e) {
				// this.pianoroom=true;
				this.bindPull = true;
				let data = this.roomType == 2 ? app.globalData.StorageUtil.get('pianoConfigDate') : app.globalData
					.StorageUtil.get('danceConfigDate');
				var selectAreaId;
				this.skip = 0;
				if (this.bindpino == true) {
					var currentDay = data.weekDtos[0].timestamp;
					var url = '&selectDate=' + this.currentDay + '&selectAreaId=' + this.selectAreaId +
						"&selectAreaLayer=" + this.selectvalue;
					this.getAppointmentDetail(url, (this.take += 8), this.skip, );
				}
			},
			//跳转传参数
			toDetail(e) {
				let meetingId = e.detail.meetingId;
				let currentDay = this.currentDay;
				let type = this.roomType;
				app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.selectPianoTimeUrl +
					"?roomId=" + meetingId + "&currentDay=" + currentDay + '&roomType=' + type, 500);

			},
		}
	};
</script>
<style>
	@import "./selsectPianoRoom.css";
</style>
