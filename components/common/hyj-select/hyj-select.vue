<template>
	<view class="select-wapper">
		<view @click.stop="!disabled?showOptions():''" :class="{select_box_middle:size=='middle',
		select_box_mini:size=='mini',select_box_large:size=='large', disable:disabled}"
		 class="input-box">
			<view class="">
				<input :value="currentValue" @change="selectChange" :disabled="true" placeholder-class="placeholder" focus="false" />
			</view>
			<view class="icon">
				<text :class="isShow?'iconfont icon-shang':'iconfont icon-xia'"></text>
			</view>
			<view class="option-box" :class="[isShow&&!nh5?'transition':'',overHeight?'overHeight':'',
			nh5?'height-nh5':'']"
			 ref="optionsBox">
				<slot></slot>
			</view>
		</view>

	</view>
</template>

<script>
	import HyjOption from "./hyj-option.vue"
	export default {
		components: {
			HyjOption
		},
		name: "HyjSelect",
		watch: {
			value(newV, oldV) {


			},
			options(newV, oldV) {

			}
		},
		props: {
			name: String,
			id: String,
			value: {
				required: false
			},
			autocomplete: {
				type: String,
				default: 'off'
			},
			automaticDropdown: Boolean,
			size: {
				type: String,
				default: 'middle'
			},
			disabled: Boolean,
			clearable: Boolean,
			filterable: Boolean,
			allowCreate: Boolean,
			loading: Boolean,
			popperClass: String,
			remote: Boolean,
			loadingText: String,
			noMatchText: String,
			noDataText: String,
			remoteMethod: Function,
			filterMethod: Function,
			multiple: Boolean,
			multipleLimit: {
				type: Number,
				default: 0
			},
			placeholder: {
				type: String,
				default () {
					return ('el.select.placeholder');
				}
			},
			defaultFirstOption: Boolean,
			reserveKeyword: Boolean,
			valueKey: {
				type: String,
				default: 'value'
			},
			collapseTags: Boolean,
			popperAppendToBody: {
				type: Boolean,
				default: true
			},
		},
		provide() {
			return {
				'select': this
			};
		},
		data() {
			return {
				currentValue: '',
				options: [],
				cachedOptions: [],
				cachedOption: {},
				optionsCount: 0,
				currentPlaceholder: '',
				query: '',
				isShow: false,
				selectedOption: {},
				animationData: {},
				overHeight: false,
				nh5: false,
			}
		},
		created() {
			// console.log(this.value)
			if (!this.value) {
				this.currentPlaceholder = this.placeholder;
			}
			if (this.size != 'mini' && this.size != 'middle' && this.size != 'large') {
				this.size = 'middle';
				throw "size only mini,middle or large"
			}

		},
		mounted() {
			console.log(this.options[0].label)
			this.currentValue = this.options[0].label
			this.cachedOption = this.options[0];
			this.selectedOption = this.options[0];

			this.getOption(this.value)
			uni.$on("selectOption", (options) => {
				this.cachedOption = options;
				this.selectedOption = options;
				this.currentValue = this.selectedOption.label

			})
		},
		methods: {
			resetOptionStatus() {
				this.isShow = false;
				this.overHeight = false;
				this.nh5 = false;
			},
			setOption(option) {
				this.selectedOption = option;
				this.currentValue = option.label;
			},
			getOption(value) {
				for (let i = 0; i < this.cachedOptions.length; i++) {
					if (this.cachedOptions[i].value === value) {
						this.cachedOption = {
							label: this.cachedOptions[i].label,
							value: this.cachedOptions[i].value
						}
					}
				}
				if (Object.keys([this.cachedOption]).length == 0) {
					this.selectedOption = {
						label: this.value,
						value: this.value
					}
					this.currentValue = this.selectedOption.label;
				} else {
					this.selectedOption = this.cachedOption;
					this.currentValue = this.selectedOption.label;
				}


			},
			onChange() {
				this.$emit('change', this.selectedOption.value)
			},
			showOptions() {
				this.isShow = !this.isShow;
				console.log(this.isShow)
				this.nh5 = false;
				if (this.isShow) {
					// #ifdef H5
					this.$nextTick(function() {
						if (this.$refs.optionsBox.$el.clientHeight > 200) {
							this.overHeight = true;
						}

					})
					// #endif
					// #ifndef H5
					this.nh5 = true;
					// #endif
				} else {
					this.overHeight = false;
				}
			},
			selectChange() {

			}
		},
		beforeDestroy() {
			this.$off(['selectOption'])
		}

	}
</script>

<style lang="scss">
	@import './font/iconfont.css';

	.select-wapper {
		position: relative;

		// width:400rpx ;
		// height: 60rpx;
		.disable {
			background-color: #F5F7FA !important;
		}

		.placeholder {
			display: flex;
			align-items: center;
		}

		.input-box {
			width: 400rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			border: 4rpx solid #e4e7ed;
			border-radius: 10rpx;
			box-sizing: border-box;
		}

		.icon {
			width: 60rpx;
			height: 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			// background-color: #ffff7f;
			color: #999;
		}

		.select_box_middle {
			width: auto;

			input {
				width: 80%;
				height: 60rpx;
				font-size: 32rpx;
				line-height: 60rpx;
				display: flex;
				align-items: center;
				padding: 12rpx 0rpx 12rpx 10rpx;
				box-sizing: border-box;
			}
		}

		.select_box_mini {
			width: 300rpx;
			position: relative;

			input {
				width: 100%;
				height: 60rpx;
				padding: 12rpx 60rpx 12rpx 12rpx;
				display: flex;
				align-items: center;
				font-size: 32rpx;
				box-sizing: border-box;
			}
		}

		.select_box_large {
			width: 440rpx;
			position: relative;

			input {
				width: 100%;
				height: 80rpx;
				display: flex;
				align-items: center;
				padding: 12rpx 60rpx 12rpx 12rpx;
				font-size: 32rpx;
				box-sizing: border-box;
			}
		}

		.option-box {
			width: 100%;
			position: absolute;
			height: 0;
			overflow: hidden;
			top: 60rpx;

			background-color: #fff;
			border-radius: 10rpx;
			padding: 0 12rpx;
			box-sizing: border-box;
			// transition: width .5s, height .5s, -webkit-transform .5s;
			z-index: 10;
		}

		.height-nh5 {
			height: 400rpx;
			border: 2rpx solid #e4e7ed;
			overflow-y: scroll;
		}

		.transition {
			border: 2rpx solid #e4e7ed;
			height: auto;
		}

		.overHeight {
			height: 400rpx;
			overflow-y: scroll;
		}
	}
</style>
