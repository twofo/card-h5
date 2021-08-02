<template>
<view>
<!--pages/repairModule/resources/components/index/index.wxml-->


<!-- 头部背景图 -->
<view class="myui-header reHead">
  <image :src="backgroundImage" style="width: 100%;height: 300rpx;"></image>
</view>
<!-- 提示语 -->
<view class="myui-text">
  你有<text style="color:red;"> {{repairNumber}} </text>条新进工单
</view>
<!-- 报修列表 -->
<view class="myui-lists">
  <!-- 待处理 - 维修列表 -->
  <repair-list :list="list" :height="height" :listLength="listLength" @pull="bindPullUp"></repair-list>
</view>
</view>
</template>

<script>
import repairList from "../../../../../components/repairModule/repairList/repairList";

export default {
  data() {
    return {};
  },

  components: {
    repairList
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    btnList: {
      type: Array,
      default: () => []
    },
    backgroundImage: {
      type: String,
      default: ''
    },
    repairNumber: {
      type: Number,
      default: 0
    },
	sum: {
	  type: Number,
	  default: 0
	},
    listLength: {
      type: Number,
      default: 1
    },
    height: {
      type: Number,
      default: 350
    }
  },
  methods: {
    // 上拉更新
    bindPullUp: function () {
      if (this.listLength != this.list.length) {
        console.log('this.data.listLength----', this.listLength);
        console.log('this.data.list.length----', this.list.length);
        this.$emit('pull', {
          detail: {
            listLength: this.listLength
          }
        });
      }
    }
  }
};
</script>
<style>
@import "./index.css";
</style>