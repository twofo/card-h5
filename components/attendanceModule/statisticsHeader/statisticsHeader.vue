<template>
	<view>
		<view class="weui-cells__title_two weui-selsect">请选择</view>
		<view class="weui-cells weui-cells_after-title">
			<view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
				<view class="weui-cell__bd">考勤时间</view>
				<view class="weui-cell__ft weui-cell__ft_in-access">
					<picker v-if="showType!=''" mode="date" fields="month" :value="date" start="2019-01-01" end="2030-09-01" @change="bindDateChange">
						<view>{{date}}</view>
					</picker>
					<picker v-else mode="date" :value="date" start="2019-01-01" end="2030-09-01" @change="bindDateChange">
						<view>{{date}}</view>
					</picker>
				</view>
			</view>
			<navigator url="/pages/attendanceModule/pages/studentStatisticsIndex/studentStatisticsIndex?isStudent=0&type=kqtj" class="weui-cell weui-cell_access"
			 hover-class="weui-cell_active">
				<view class="weui-cell__bd">考勤规则</view>
				<view class="weui-cell__ft weui-cell__ft_in-access">{{showName}}</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},

		components: {},
		props: {
			showType: {
				type: String,
				default: ''
			},
			showName: {
				type: String,
				default: ''
			},
			date: {
				type: String,
				default: '2019-09-01'
			}
		},
		methods: {
			bindDateChange: function(e) {
				this.setData({
					date: e.detail.value
				});
				this.$emit('getData', {
					detail: {
						data: e.detail.value
					}
				});
			}
		}
	};
</script>
<style>
	@import "./statisticsHeader.css";
</style>
