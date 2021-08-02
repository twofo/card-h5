<template>
<view>
<!--pages/appointmentModule/resources/components/modelInput/modelInput.wxml-->

<!--弹窗-->
<view class="modal-mask" @tap="hideModal" v-if="showModel"></view>

<view class="modal-dialog" v-if="showModel">
  
  <view class="modal-title">请给出拒绝原因</view>
  <view class="modal-content">
    <view class="weui-cells weui-cells_after-title" style="border:1px #eee solid;">
        <view class="weui-cell">
            <view class="weui-cell__bd">
                <textarea class="weui-textarea" placeholder="请输入文本" style="height: 5.3em;"></textarea>
                <!-- <view class="weui-textarea-counter">0/200</view> -->
            </view>
        </view>
    </view>
  </view>
<!-- 按钮 -->
  <view class="myui-cell-bottom" style="font-size:16px;margin-top:10rpx;">
    <view class="myui-cell-bottom__bd myui-center" :data-id="item.meetingId" @tap="cancel">取消</view>
    <view class="myui-cell-bottom__fd myui-center" :data-id="item.meetingId" @tap="confirm">确定</view>
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
      default: true
    }
  },
  methods: {}
};
</script>
<style>
@import "./modelInput.css";
</style>