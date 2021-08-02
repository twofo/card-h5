<template>
	<view>
		<view class="weui-cells weui-cells_after-title">
			<view class="weui-cell weui-heads">
				<view class="weui-cell__hd">
					<image :src="detailArr.statusImage"
						style="margin-right: 5px;vertical-align: middle;width:23px; height: 25px;"></image>
				</view>
				<view class="weui-cell__bd" style="margin: 0rpx 10rpx;">{{detailArr.listType}}</view>
			</view>
			<view v-for="(item, index) in titleTxtArr" :key="index"
				:class="'myui-cell ' + (index === 0 ? 'paddingTop' : '')">
				<view class="myui-cell__bd contTitle">{{item}}：</view>
				<view class="myui-cell__bf">{{detailArr.titleArr[index]}}</view>
			</view>

			<view class="freeCont">
				<view class="freeCont-Title">{{freeTxtArr[0]}}</view>

				<view class="free-box">
					<view class="free-item">
						<view class=" contTitle">{{freeTxtArr[1]}}：</view>
						<view class>{{detailArr.sumTime}}小时</view>
					</view>
					<view class="free-item free-right">
						<view class=" contTitle">{{freeTxtArr[2]}}：</view>
						<view class>{{detailArr.freeTime}}小时</view>
					</view>
				</view>

				<view class="free-box">
					<view class="free-item">
						<view class=" contTitle">{{freeTxtArr[3]}}：</view>
						<view class>{{detailArr.sumCount}}元</view>
					</view>
					<view class="free-item free-right">
						<view class=" contTitle">{{freeTxtArr[4]}}：</view>
						<view class>{{detailArr.payfor}}元</view>
					</view>
				</view>

				<view class="free-box">
					<view class="free-item">
						<view class=" contTitle">{{freeTxtArr[5]}}：</view>
						<view class>{{detailArr.payforType}}</view>
					</view>
					<view class="free-item free-right">
						<view class=" contTitle"></view>
						<view class></view>
					</view>
				</view>

				<view class="myui-cell free-right">
					<view class="myui-cell__bf"> 发布于 {{detailArr.pulishTime}}</view>
				</view>

			</view>

			<view class="weui-cell footerBtn" v-if="(detailArr.nostart || detailArr.showQcode)  && identity==1" >
				<view class="footerBtnItem" :data-id="detailArr.id" @tap="cancelAppiontment">取消预约</view>
				<view class="footerBtnItem" :data-phone="detailArr.phone" @tap="contactAdministrator">联系管理员</view>
			</view>

			<!-- 正常出席 -->
			<view class="weui-cell" v-if="(detailArr.normalAttend || detailArr.cancelMeeting) && identity==1">
				<view class="footerBtnItems" :data-phone="detailArr.phone" @tap="contactAdministrator">联系管理员</view>
			</view>



		</view>
		<!-- 编辑预约 -->
	<!-- 	<view class="myui-cell free-right" v-if="detailArr.showEditAppiont">
			<view class="myui-cell__bf normal" :data-id="detailArr.id" @tap='editAppiont'>修改预约内容 {{'>>'}}</view>
		</view> -->

		<!-- 出席 结果 -->
		<view class="signResult" v-if="detailArr.resultOb && identity==1">签到结果</view>
		<!-- 签到结果 -->
		<view class="weui-cell normalAttendFoot" v-if="detailArr.resultObj && identity==1">
			<view>
				<icon class="weui-icon-checkbox_success" :type="detailArr.resultObj.icon"
					:color="detailArr.resultObj.iconColor" size="16"></icon>
				<text class="normal">{{detailArr.resultObj.statusTxt}}</text>
			</view>
			<view class="myui-cell fonts15">
				<text>打卡时间：</text>
				<text>{{detailArr.resultObj.checkTime}}</text>
			</view>



			<view class="normalAttendTime adress" v-if="detailArr.resultObj.Adress">
				<view class="pin-solid icons"></view>
				<view class="adressTxt">{{detailArr.resultObj.Adress}}</view>
			</view>


			<view class="myui-cell fonts15" v-if="detailArr.resultObj.toSignIcon">
				<text class="normal" :data-id="detailArr.id" :data-roomType='detailArr.roomType'
					@tap="signIn">{{detailArr.resultObj.toSign}}{{' >>'}}</text>
			</view>


			<view class="myui-cell fonts15 paddingTop" v-if="detailArr.resultObj.checkOut">
				<text class="normal" :data-id="detailArr.id" :data-roomType='detailArr.roomType'
					@tap="signIn">{{detailArr.resultObj.toOut}}{{' >>'}}</text>
			</view>

		</view>
		<!-- 签退结果 -->
		<view class="weui-cell noBorder normalAttendFoot"
			v-if="detailArr.resultObj && detailArr.resultObj.signOutInfo && conflict == -1">
			<view>
				<icon class="weui-icon-checkbox_success" :type="detailArr.resultObj.iconOut"
					:color="detailArr.resultObj.iconColorOut" size="16"></icon>
				<text class="normal">{{detailArr.resultObj.statusTxtOut}}</text>
			</view>
			<view class="myui-cell fonts15">
				<text>打卡时间：</text>
				<text>{{detailArr.resultObj.checkTimeOut }}</text>
			</view>


			<view class="normalAttendTime adress" v-if="detailArr.resultObj.AdressOut">
				<view class="pin-solid icons"></view>
				<view class="adressTxt">{{detailArr.resultObj.AdressOut}}</view>
			</view>

		</view>
		<!-- 取消预约 -->
		<view class="cancelBox weui-cell" v-if="detailArr.cancelMeeting && conflict == -1">
			<view style="width: 100%;">
				<text class="circleIcon"></text>
				<text class="normal">{{detailArr.cancelStatus}}</text>
			</view>
			<view class="normalAttendTime " v-if="detailArr.cancelReason">
				<text>原因：</text>
				<text>{{detailArr.cancelReason}}</text>
			</view>
			<view class="myui-cell free-right" style="width:100%;" v-if="detailArr.checkedTime">
				<view class="myui-cell__bf fonts15">取消于 {{detailArr.checkedTime}}</view>
			</view>

			<view class="myui-cell-bottom " style="width:100%;" v-if="detailArr.showEditBtn">
				<view class="myui-cell-bottom__bd myui-center reSendbtn" :data-id="detailArr.id" @tap="editAppiont">
					再次发起预约</view>
			</view>

			<view style="width: 100%;">
				<text class="circleIcon"
					v-if="detailArr.refunding || detailArr.refundFail || detailArr.refundSuccess"></text>
				<text class="normal" v-if="detailArr.refunding">退款处理中</text>
				<text class="normal" v-if="detailArr.refundFail">退款失败</text>
				<text class="normal" v-if="detailArr.refundSuccess">退款完成</text>
			</view>
			<block v-if="detailArr.refundFail">
				<view class="normalAttendTime" v-if="detailArr.refundReason">
					<text>失败原因：</text>
					<text>{{detailArr.refundReason}}</text>
				</view>
				<view class="normalAttendTime adress" v-if="detailArr.refunder">
					<text>审批人：</text>
					<text>{{detailArr.refunder}}</text>
				</view>
				<view class="myui-cell free-right" style="width:100%;">
					<view class="myui-cell__bf"> {{detailArr.checkCancelTime}}</view>
				</view>
			</block>

			<block v-if="detailArr.refundSuccess">
				<view class="normalAttendTime">
					<text>应退金额：</text>
					<text>{{detailArr.shouldRefundCharge}} 元</text>
				</view>
				<view class="normalAttendTime">
					<text>手 续 费：</text>
					<text>{{detailArr.serviceCharge}} 元</text>
				</view>
				<view class="normalAttendTime">
					<text>实退金额：</text>
					<text>{{detailArr.realityDeductionMoney}} 元</text>
				</view>

				<view class="myui-cell free-right" style="width:100%;">
					<view class="myui-cell__bd " style="width:55%;" v-if="detailArr.refunder">
						<text>审批人：</text>
						<text>{{detailArr.refunder}}</text>
					</view>
					<view class="myui-cell__bf" v-if="detailArr.checkCancelTime"> 取消于 {{detailArr.checkCancelTime}}
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	var app = getApp();

	export default {
		data() {
			return {
				personTypes: '',
				idType: '',
				identity: ''
			};
		},

		components: {},
		props: {
			color: {
				type: String,
				default: '#20A4F7'
			},
			titleTxtArr: {
				type: Array,
				default: () => []
			},
			detailArr: {
				type: Object,
				default: () => ({})
			},
			freeTxtArr: {
				type: Array,
				default: () => []
			},
			conflict: {
				type: Number,
				value: -1
			}
		},

		mounted() {
				//通过用户登录的身份信息跟接口返回的预约人身份信息进行判断
			uni.$on("virtual", (options) => {
				console.log(options)
				if (options.personTypes == options.username) {
					this.setData({
						identity: 1//显示
					})
					console.log(this.identity)
				}else {
					this.setData({
						identity: 2//隐藏
					})
				}
			})
		},
		methods: {
			// 显示二维码

			showCode() {},

			// 取消预约
			cancelAppiontment(e) {
				let meetingId = e.currentTarget.dataset.id;
				let data = {
					meetingId: meetingId
				};
				this.$emit('cancelAppiontment', {
					detail: data
				});
			},

			contactAdministrator(e) {
				let phone = e.currentTarget.dataset.phone;
				let data = {
					phone: phone
				};
				this.$emit("contactAdmin", {
					detail: data
				});
			},

			signIn: function(e) {
				//考勤，打卡签到
				console.log(e);
				let meetingId = e.target.dataset.id;
				let roomType = e.target.dataset.roomType;
				console.log(roomType);
				app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500); //跳转到打卡页面  attendAttendaceSignUrl

				app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl
					.attendAttendaceSignUrl +
					"?meetingId=" + meetingId + "&roomType=" + roomType, 500);
			},

			// 练功房拒绝预约
			// 重新创建会议/编辑会议
			editAppiont(e) {
				let meetingId = e.target.dataset.id;
				app.globalData.ShowMsgUtil.showLoadToast("正在跳转...", 500);
				app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.appiontPianoRoomUrl +
					"?meetingId=" + meetingId + '&type=' + 3, 500);
			}

		}
	};
</script>
<style>
	@import "./attenDetail.css";
</style>
