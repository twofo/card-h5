<template>

<view :class="'weui-tabbar ' + extClass">
  <!-- 选中的时候往weui-tabbar__item加class:weui-bar__item_on  -->
    <view v-for="(item, index) in list" :key="index"  @tap="tabChange(index)" 
				:class="'weui-tabbar__item ' + (index === current ? 'weui-bar__item_on' : '')">
        <view style="position: relative;display:inline-block;width:28px;height:28px;">
          <image :src="current === index ? item.selectedIconPath : item.iconPath" class="weui-tabbar__icon"></image>
        </view>
        <view class="weui-tabbar__label">{{item.text}}</view>
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
    extClass: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    },
    current: {
      type: Number,
      default: 0
    }
  },
  options: {
    addGlobalClass: true
  },
  methods: {
    tabChange(e) {
			console.log(e)
      let  index  = e;

			
      if (index === this.current) {
        return;
      }

			this.setData({
				 current: index
			});
      this.$emit('change', {
        detail: {
          index,
          item: this.list[index]
        }
      });
    }

  }
};
</script>
<style>
@import "./tarbBar.css";
</style>