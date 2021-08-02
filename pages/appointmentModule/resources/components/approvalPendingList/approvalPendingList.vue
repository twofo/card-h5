<template>
<view>
<!--pages/appointmentModule/resources/components/checkPendingList/checkPendingList.wxml-->
      
      
<view v-if="list.length==0">
  <msg-no-data msg="暂无数据"></msg-no-data>
</view>

<view v-else class="myui__bd">

  <view v-for="(item, index) in list" :key="index">

    <!-- 弹窗 -->
    <!-- <model-input showModel="true"></model-input> -->
    <!--弹窗-->
    <view class="modal-mask" @tap="hideModal" v-if="showModel"></view>

    <view class="modal-dialog" v-if="showModel">
      
      <view class="modal-title">请给出拒绝原因</view>
      <view class="modal-content">
        <view class="weui-cells weui-cells_after-title" style="border:1px #eee solid;">
            <view class="weui-cell">
                <view class="weui-cell__bd">
                    <textarea @confirm="confirm" @input="inputReason" class="weui-textarea" placeholder="请输入文本" style="height: 5.3em;"></textarea>
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

    <!-- 审核列表 -->
    <view class="weui-cells weui-cells_after-title" style="margin: 6rpx 0rpx 0rpx;">
        <view class="weui-cell">
          <view class="weui-cell__bd" style="margin: 0rpx 10rpx;">会议考勤：{{item.applyType}}</view>
          <view class="weui-cell__ft weui-cell__ft_in-access" @tap="toDetail" :data-id="item.applyId" style="font-size:14px;">详情</view>
        </view>
    </view> 


    <view class="weui-cells weui-cells_after-title" style="font-size:15px;padding: 20rpx 0rpx 0rpx;">
        <view class="myui-cell">
          <view class="myui-cell__bd">会议名称：</view>
          <view class="myui-cell__bf">{{item.meetingName}}</view>
        </view>
        <view class="myui-cell">
          <view class="myui-cell__bd">申请人：</view>
          <view class="myui-cell__bf">{{item.applyName}}</view>
        </view>
        <view class="myui-cell">
          <view class="myui-cell__bd">会议时间：</view>
          <view class="myui-cell__bf">{{item.meetingTime}}</view>
        </view>
        <view class="myui-cell">
          <view class="myui-cell__bd">申请原因：</view>
          <view class="myui-cell__bf">{{item.applyReason}}</view>
        </view>
        <view class="myui-cell" style="margin：45px 15px;font-size:14px;">
          <view class="weui-cell__bd"></view>
          <view class="weui-cell__ft">申请于 {{item.applyTime}}</view>
        </view>

        <!-- 按钮 -->
        <view class="myui-cell-bottom" style="font-size:16px;margin-top:10rpx;">
          <view class="myui-cell-bottom__bd myui-center" :data-id="item.applyId" @tap="bindRefuse">拒绝</view>
          <view class="myui-cell-bottom__fd myui-center" :data-id="item.applyId" @tap="bindAgree">同意</view>
        </view>

    </view> 

    </view>    


</view>
</view>
</template>

<script>
import msgNoData from "../../../../../components/common/msgNoData/msgNoData";
import modelInput from "../modelInput/modelInput";

export default {
  data() {
    return {};
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
    windowHeight: {
      type: Number,
      default: 0
    },
    showModel: {
      type: Boolean,
      default: false
    },
    inputReason: {
      type: String,
      default: ''
    }
  },
  methods: {
    toDetail: function (e) {
      // console.log(e.currentTarget.dataset.id);
      this.$emit('detail', {
        detail: {
          applyId: e.currentTarget.dataset.id
        }
      });
    },
    bindRefuse: function (e) {
      // console.log(e.currentTarget.dataset.id);
      // this.setData({
      //   showModel: true
      // })
      this.$emit('refuse', {
        detail: {
          applyId: e.currentTarget.dataset.id,
          type: 13
        }
      });
    },
    bindAgree: function (e) {
      this.$emit('agree', {
        detail: {
          applyId: e.currentTarget.dataset.id,
          type: 12
        }
      });
    },
    // model - 取消
    cancel: function () {
      this.setData({
        showModel: false
      });
    },
    // model - 确定
    confirm: function (e) {
      console.log('inputReason-', this.inputReason);
    },
    // model - 输入原因
    inputReason: function (e) {
      console.log(e.detail.value);
      this.setData({
        inputReason: e.detail.value
      });
    }
  }
};
</script>
<style>
@import "./approvalPendingList.css";
</style>