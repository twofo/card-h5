<template>
	<view class="select-box">
		<view class="select-current" @tap.stop="openClose">
			<text class="current-name">{{current.name}}</text>
		</view>
		<view class="option-list" v-if="isShow" >
			<!-- <text class="option">
					{{defaultOption.name}}
					:data-id="item.id" :data-name="item.name"
					:data-type="defaultOption.type"
			</text> -->
			<text v-for="(item, index) in result" :key="index" class="option" 
				@tap.stop="optionTap({id:item.id,name:item.name,type:item.type})"
				>
				
				{{item.name}}
			</text>
		</view>
	</view>
</template>

<script>
	var app = getApp();

	export default {
		data() {
			return {
				result: [],
				isShow: false,
				current: {}
			};
		},

		components: {},
		props: {
			options: {
				type: Array,
				default: () => []
			},
			defaultOption: {
				type: Object,
				default: () => ({
					id: '0',
					name: '全部'
				})
			},
			keys: {
				type: String,
				default: 'id'
			},
			text: {
				type: String,
				default: 'name'
			}
		},

		mounted() {
			// console.log("已经使用01", this.options);
			// console.log('type值:',this.defaultOption.type)
			// 属性名称转换, 如果不是 { id: '', name:'' } 格式，则转为 { id: '', name:'' } 格式
			let result = [];
			result.push(this.defaultOption)
			if (this.keys !== 'id' || this.text !== 'name') {
				let types = this.defaultOption.type
				for (let item of this.options) {
					let {
						[this.keys]: id,
						[this.text]: name,
					} = item;
					
					result.push({
						id,
						name,
						type: types
					});
				}
			} 
			console.log("result - ", result);


			this.setData({
				current: Object.assign({}, this.defaultOption),
				result: result
			});
		},

		methods: {
			optionTap(e) {
				// console.log("已选中 - ", e)
				let dataset = e;
				this.setData({
					current: dataset,
					isShow: false
				}); // 调用父组件方法，并传参

				this.$emit("change", {
					detail: { ...dataset
					}
				});
			},

			openClose() {
				// console.log(this.isShow)
				this.setData({
					isShow: !this.isShow
				});
			},

			// 此方法供父组件调用
			close() {
				this.setData({
					isShow: false
				});
			}

		}
	};
</script>
<style>
	@import "./select.css";
</style>
