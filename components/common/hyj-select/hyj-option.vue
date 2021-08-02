<template>
	<view class="option-wapper">
		<view class="option-item" @click.stop="!disabled?selectOption():''" :class="{disable:disabled}" hoverClass="hoverclass">
			<slot>
				<text>{{ label }}</text>
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "HyjOption",
		inject: ['select'],
		props: {
			value: {
				required: true
			},
			label: [String, Number],
			created: Boolean,
			disabled: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			'select.value': function(newV, oldV) {
				console.log(5555)
				if (newV === this.value) {
					uni.$emit("selectOption", {
						value: this.value,
						label: this.label
					})
				} else {
					uni.$emit("selectOption", {
						value: this.value,
						label: this.value
					})
				}
			},
			value(newV, oldV) {
				console.log(newV, oldV)
			}
		},
		data() {
			return {}
		},
		created() {
			this.select.options.push(this);
			this.select.cachedOptions.push(this);
			this.select.optionsCount++;
		
		},
		methods: {
			selectOption() {
				this.select.resetOptionStatus();
				if (this.select.cachedOption.value !== this.value && this.select.cachedOption.label != this.label) {
					uni.$emit("selectOption", {
						value: this.value,
						label: this.label
					})
					this.select.onChange && this.select.onChange()
				}

			},
			inputHovering() {

			}
		}

	}
</script>

<style lang="scss">
	.option-item {
		line-height: 68rpx;
		border-bottom: 2rpx solid #e4e7ed;
		font-size: 32rpx;
	}

	.disable {
		color: #999;
	}

	.hoverclass {}
</style>
