<template>
	<view>
		<view v-if="list.length==0" class="myui__bd">
			<msg-no-data msg="暂无数据"></msg-no-data>
		</view>

		<view v-else class="myui__bd">
			<scroll-view scroll-y :style="'height:' + sHeight + 'px'" @scrolltolower="lower">

				<view :style="'height:' + (sHeight +10) + 'px'">

					<view v-for="(item, index) in list" :key="index" class="listItem">

						<!--弹窗-->
						<view class="modal-mask" @tap="hideModal" v-if="showModel"></view>

						<view class="modal-dialog" v-if="showModel">

							<view class="modal-title">请给出拒绝原因</view>
							<view class="modal-content">
								<view class="weui-cells weui-cells_after-title" style="border:1px #eee solid;">
									<view class="weui-cell">
										<view class="weui-cell__bd">
											<textarea @confirm="confirm" @input="inputReasonFun" :value="inputReason" class="weui-textarea" placeholder="请输入文本"
											 style="height: 5.3em;"></textarea>
										</view>
									</view>
								</view>
							</view>
							<!-- 按钮 -->
							<view class="myui-cell-bottom" style="font-size:16px;margin-top:10rpx;">
								<view class="myui-cell-bottom__bd myui-center dangeColor" :data-id="refuseId" @tap="cancel">取消</view>
								<view class="myui-cell-bottom__fd myui-center" :data-id="refuseId" @tap="confirm">确定</view>
							</view>

						</view>

						<!-- 审核列表 -->
						<view class="weui-cells weui-cells_after-title" style="margin: 6rpx 0rpx 0rpx;">
							<view class="weui-cell">
								<view :class="'weui-cell__bd ' + (item.approvalType == 3 ? 'dangeColor':'') + ' ' + (item.approvalType == 2 ? 'passColor':'') + ' '"
								 style="margin: 0rpx 10rpx;">{{item.titleStr}}</view>
								<!-- <view wx:elif="{{item.approvalType==4}}" class="weui-cell__bd" style="margin: 0rpx 10rpx;">{{item.titleStr}}</view> -->
								<view v-if="item.approvalType == 0" class="weui-cell__ft weui-cell__ft_in-access" 
								@tap="toDetail" :data-id="item.applyId" :data-areatype='item.areaType'
								 style="font-size:14px;">详情</view>
								<view v-else class="myui-cell__bf time">审核于{{item.reduceTime}}</view>
							</view>
						</view>


						<view class="weui-cells weui-cells_after-title" style="font-size:15px;padding: 20rpx 0rpx 20rpx;">
							<view class="myui-cell" v-if="item.approvalType != 0">
								<view class="myui-cell__bd">申请类型： </view>
								<view class="myui-cell__bf" style="width:57%">{{item.applyStatus}}</view>
								<view class="weui-cell__ft weui-cell__ft_in-access" @tap="toDetail" :data-id="item.applyId" :data-areaType="item.areaType"
								 style="font-size:14px;">详情</view>
							</view>
							<view class="myui-cell" v-if="item.name">
								<view class="myui-cell__bd">预约名称：</view>
								<view class="myui-cell__bf">{{item.name}}</view>
							</view>
							<view class="myui-cell">
								<view class="myui-cell__bd">申请人：</view>
								<view class="myui-cell__bf">{{item.applyName}}</view>
							</view>
							<view class="myui-cell">
								<view class="myui-cell__bd">{{item.timeStr}}：</view>
								<view class="myui-cell__bf">{{item.time}}</view>
							</view>
							<view class="myui-cell">
								<view class="myui-cell__bd">{{item.reasonStr}}：</view>
								<view class="myui-cell__bf">{{item.applyReason}}</view>
							</view>
							<view class="myui-cell" v-if="item.otherStr">
								<view class="myui-cell__bd">{{item.otherStr}}：</view>
								<view class="myui-cell__bf">{{item.other}}</view>
							</view>

							<view class="myui-cell" style="font-size:28rpx;">
								<view class="weui-cell__bd"></view>
								<view class="weui-cell__ft">申请于 {{item.applyTime}}</view>
							</view>

							<!-- 按钮 -->
							<view class="myui-cell-bottom" style="font-size:16px;margin-top:10rpx;" v-if="item.showBtn && item.approvalType==0">
								<view class="myui-cell-bottom__bd myui-center dangeColor" :data-id="item.applyId" @tap="bindRefuse">拒绝</view>
								<view class="myui-cell-bottom__fd myui-center" :data-id="item.applyId" :data-approvalType="item.approvalType"
								 @tap="bindAgree">同意</view>
							</view>

						</view>

						<!-- 同意弹窗 -->
						<view class="modal-mask" @tap="hideModalC" v-if="showModelConflict"></view>

						<view class="modal-dialog" v-if="showModelConflict">

							<view class="modal-title"></view>
							<view class="modal-content">
								<view class="weui-cells weui-cells_after-title passItem" style="background-color:transparent">
									<view class="weui-cell ">
										<view class="weui-cell__bd">
											<view>
												同意该预约之后，其余冲突 预约将会<text style="font-weight:bold">自动拒绝</text>
											</view>
										</view>
									</view>
								</view>
							</view>

							<!-- 按钮 -->
							<view class="myui-cell-bottom" style="font-size:16px;margin-top:10rpx;">
								<view class="myui-cell-bottom__bd myui-center dangeColor" :data-id="applyId" @tap="cancelPass">取消</view>
								<view class="myui-cell-bottom__fd myui-center" :data-id="applyId" @tap="confirmPass">确定</view>
							</view>

						</view>


					</view>


					<view class style="margin-top:-320rpx;" v-if="nomore">
						<msg-no-data msg="到底了"></msg-no-data>
					</view>
					<view class style="margin-top:-320rpx;" v-else>
						<msg-no-data :msg="loadingMore"></msg-no-data>
					</view>

				</view>

			</scroll-view>

		</view>
	</view>
</template>

<script>
	var app = getApp();
	import msgNoData from "../../../../../components/common/msgNoData/msgNoData";
	import modelInput from "../modelInput/modelInput";

	export default {
		data() {
			return {
				showModel: false,
				refuseId: '',
				nomore: false,
				// loadingMore: '下拉加载更多',
				showModelConflict: false,
				applyId: '',
				inputReason: ""
			};
		},

		components: {
			msgNoData,
			modelInput
		},
		props: {
			list: {
				type: Array,
				default: () => []
			},
			sHeight: {
				type: Number,
				default: 554
			},
			loadingMore: {
				type: String,
				default: ''
			}
		},

		mounted() {},

		methods: {
			toDetail(e) {
				console.log(e);
				let meetingId = e.currentTarget.dataset.id;
				let areaType = e.currentTarget.dataset.areatype;

				if (areaType == 1) {
					app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.meetingDetailUrl + '?meetingId=' +
						meetingId + "&conflict=" + '1', 500);
				} else if (areaType == 3) {
					app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.attendPianoDetailUrl +
						'?meetingId=' + meetingId + "&conflict=" + '1' + "&type=" + areaType, 500);
				}
			},

			// 拒绝弹窗
			hideModal() {
				this.setData({
					showModel: false
				});
			},

			cancel() {
				this.hideModal();
			},

			confirm(e) {
				let applyId = e.currentTarget.dataset.id;
				this.$emit('comfirmRefuse', {
					detail: {
						applyId: applyId,
						type: 13,
						inputReason: this.inputReason
					}
				});
				this.setData({
					showModel: false,
					inputReason: ""
				});
				this.hideModal();
			},

			inputReasonFun(e) {
				this.setData({
					inputReason: e.detail.value
				});
			},

			// 审批会议
			bindRefuse(e) {
				this.setData({
					refuseId: e.currentTarget.dataset.id,
					showModel: true
				});
				this.$emit("cancelRefuse", {
					detail: {
						applyId: "000"
					}
				});
			},

			bindAgree(e) {
				let applyId = e.currentTarget.dataset.id;
				let approvalType = e.currentTarget.dataset.approvaltype; // this.triggerEvent('agreeRefuse', { applyId: applyId, type: 12, approvalType: approvalType });

				this.setData({
					applyId,
					showModelConflict: true
				});
			},

			lower() {
				this.$emit("lower", {
					detail: {
						loadingMore: "加载中"
					}
				});
			},

			// 审批同意后弹窗
			hideModalC() {
				this.setData({
					showModelConflict: false
				});
			},

			cancelPass() {
				this.hideModalC();
				this.$emit('cancelThisMeet', {
					detail: {
						applyId: '000'
					}
				});
			},

			confirmPass(e) {
				this.hideModalC();
				this.$emit("comfirmThisMeet", {
					detail: {
						applyId: this.applyId
					}
				});
			}

		}
	};
</script>
<style>
	@import "./conflictList.css";
</style>
