<template>
<view>
<!--components/common/msgSelect/msgSelect.wxml-->


    <!--弹窗-->
    <view class="modal-mask" @tap="hideModal" v-if="showModel"></view>

    <view class="modal-dialog" v-if="showModel">
      
      <!-- 提示信息 -->
      <view class="modal-title myui-center">{{msg}}</view>

      <!-- 按钮 -->
      <view class="myui-cell-bottom" style="font-size:16px;margin-top:10rpx;">
        <view class="myui-cell-bottom__bd myui-center" @tap="cancel">{{btnList[0]}}</view>
        <view class="myui-cell-bottom__fd myui-center" @tap="confirm">{{btnList[1]}}</view>
      </view>

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
    showModel: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: '提示'
    },
    btnList: {
      type: Array,
      default: () => ['取消', '确认']
    }
  },
  methods: {
    confirm: function () {
      this.$emit('confirm');
    },
    cancel: function () {
      this.$emit('cancel');
    }
  }
};
</script>
<style>
@import "./msgSelect.css";
</style>