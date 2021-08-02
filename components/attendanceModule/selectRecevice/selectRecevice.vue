<template>
	<view>
		<!-- 全选 -->
		<view class="weui-cells weui-cells_after-title box-top" v-if="isCheckAllShow">
			<label class="weui-cell weui-check__label" @tap="checkAlls">
				<checkbox class="weui-check" :value="checkAll.value" :checked="checkAll.checked"></checkbox>
				<view class="weui-cell__hd weui-check__hd_in-checkbox">
					<icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!checkAll.checked"></icon>
					<icon class="weui-icon-checkbox_success " type="success" :color="color" size="23"
						v-if="checkAll.checked">
					</icon>
				</view>
				<view class="weui-cell__bd">{{checkAll.name}}</view>
			</label>
		</view>
		<!-- 单选 -->
		<view class="weui-cells weui-cells_after-title center-top">
			<scroll-view scroll-y :style="'height: ' + sHeight + 'px;'" @scrolltolower="lower">

				<view v-if="checkboxItems.length > 0" :style="'height: ' + (sHeight+10) + 'px;'">
					<label v-for="(item, index) in checkboxItems" :key="index" class="weui-cell weui-check__label">
						<view class="box" @tap="checkboxChange" :data-value="item.value" :data-id="item.id"
							:data-level="item.selectRole" :data-checked="item.checked" :data-type="item.selectType">
							<checkbox class="weui-check" :value="item.value" :checked="item.checked"></checkbox>

							<view class="weui-cell__hd weui-check__hd_in-checkbox">
								<icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked">
								</icon>
								<icon class="weui-icon-checkbox_success " type="success" :color="color" size="23"
									v-if="item.checked"></icon>
							</view>
							<view class="weui-cell__bd">{{item.name}} <text
									v-if="stidentCount">({{item.studentCount}})人</text>
							</view>
						</view>

					</label>
					<view class="floor-box loading">
						<text>{{loadNotice}}</text>
					</view>
				</view>
				<view v-if="checkboxItems.length == 0">
					<view class="floor-box">
						<text>暂无成员</text>
					</view>
				</view>
			</scroll-view>

		</view>

		<!-- 尾部 -->
		<view class="page__bd" v-if="showBtn">
			<view class="weui-btn-area">
				<button class="weui-btn btn" :disabled="disableds" @tap="confirmReceive">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	var app = getApp();

	export default {
		data() {
			return {
				src: app.globalData.ImageUrl,

			};
		},

		props: {
			checkboxItems: {
				type: Array,
				default: () => []
			},
			checkAll: {
				type: Object,
				default: () => ({})
			},
			stidentCount: {
				type: Boolean,
				default: true
			},
			disableds: {
				type: Boolean,
				default: false
			},
			showBtn: {
				type: Boolean,
				default: true
			},
			isCheckAllShow: {
				type: Boolean,
				default: true
			},
			color: {
				type: String,
				default: '#10aeff'
			},
			sHeight: {
				type: Number,
				default: 400
			},
			loadNotice: {
				type: String,
				default: ''
			}
		},

		/**
		 * 组件的生命周期
		 */
		created: function() { //空间被创建时触发
			console.log('------------------------选择人员的的组件');
			console.log(this.checkboxItems.length)

		},
		mounted() {
			uni.$on("checkitems", (options) => {
				if (options) {
					
						this.setData({
							checkboxItems:options.checkboxItems
						});
					
				}
			
			})
			 
		},
		onLoad() {
			console.log(this.checkboxItems);
		},

		methods: {
			/**
			 * 选择全部
			 */
			checkAlls: function(e) {
				console.log(this.checkboxItems);
				console.log(e);
				var _this = this;
                       console.log(this.checkboxItems);
				var checkboxItems = _this.checkboxItems;
				console.log(checkboxItems)
				var checkAll = _this.checkAll.checked ? false : true;

				if (checkAll) {
					for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
						checkboxItems[i].checked = true; // 判断下级是否禁止  选中时，下级禁止
						if (checkboxItems[i].haveChild) {
							checkboxItems[i].enable = false;
						}
					}
				} else {
					for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
						checkboxItems[i].checked = false; // 判断下级是否禁止  选中时，下级允许

						if (checkboxItems[i].haveChild) {
							checkboxItems[i].enable = true;
						}
					}
				}
                   console.log(checkboxItems)
				this.setData({
					// checkboxItems: checkboxItems,
					'checkAll.checked': checkAll
				});
			},

			/**
			 * 选择单个
			 */
			checkboxChange: function(e) {
				console.log('checkbox发生change事件，携带value值为：', e);
				let singleId = e.currentTarget.dataset.id;
				let singlevalue = e.currentTarget.dataset.value;
				let singleChecked = e.currentTarget.dataset.checked;
				let selectType = e.currentTarget.dataset.type;
				let selectRole = e.currentTarget.dataset.level;
				let datas = {
					id: singleId,
					value: singlevalue,
					checked: singleChecked,
					type: selectType,
					level: selectRole
				};
				this.$emit('singleChecked', {
					detail: datas
				});
				var checkboxItems = this.checkboxItems,
					values = e.currentTarget.dataset.value; // 控制单个选择
				// console.log(checkboxItems[1].checked ? false : true)

				for (var i = 0, lenI = checkboxItems.length; i < lenI; i++) {
					if (checkboxItems[i].value == values) {
						checkboxItems[i].checked = checkboxItems[i].checked ? false : true;
						break;
					} else {
						console.log('212');
					}
				} // 判断是否全部选择


				var flag = true;

				for (var i = 0, lenI = checkboxItems.length; i < lenI; i++) {
					// 判断下级是否禁止  选中时，下级禁止
					if (checkboxItems[i].haveChild) {
						checkboxItems[i].enable = checkboxItems[i].checked ? false : true;
					}

					if (!checkboxItems[i].checked) {
						flag = false;
					}
				} // console.log('checkboxItems-----------', checkboxItems);
				// 给全选按钮复制


				let checkAll = flag ? true : false;
				this.setData({
					'checkAll.checked': checkAll,
					// checkboxItems: checkboxItems
				});
			},

			/**
			 * 选中人员存储方案
			 * 【方案一】
			 * 在当前页面，一点击选中就将选中数组返回到调用组件页面，并存入缓存
			 * 【方案二】
			 * 点击下一级，保存当前页面的选中数据到缓存
			 * 点击确定，保存当前页面的选中数据到缓存
			 */

			/**
			 * 获取下级
			 */
			gainByParent: function(e) {
				let data = []; // console.log('选中的父级id', e);

				data = this.getSelectDate(this.checkboxItems);
				this.$emit('myevent', {
					detail: {
						valueType: 1,
						parentId: e.currentTarget.dataset.id,
						checkboxItems: data
					}
				});
			},

			/**
			 * 确认选择
			 */
			confirmReceive: function(e) {
				let data = [];
				console.log('选中的父级id', e);
				data = this.getSelectDate(this.checkboxItems);
				this.$emit('myevent', {
					detail: {
						valueType: 2,
						checkboxItems: data
					}
				});
			},

			/**
			 * 处理当前数据 - 筛选出选中的数据
			 */
			getSelectDate: function(checkboxItems) {
				let data = [];
				let t = 0;

				for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
					if (checkboxItems[i].checked) {
						// 将接口所需的值处理后给后台
						data[t] = checkboxItems[i];
						t++;
					}
				}

				return data;
			},

			// 上拉加载
			lower() {
				this.$emit('lower', {
					detail: {
						touchEnd: true
					}
				});
			}

		}
	};
</script>
<style>
	@import "./selectRecevice.css";
</style>
