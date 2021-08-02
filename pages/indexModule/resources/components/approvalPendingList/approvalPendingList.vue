<template>
<view>
<view v-if="list.length==0" class="myui__bd">
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
                    <textarea @confirm="confirm" @input="inputReasons" :value="inputReason" class="weui-textarea" placeholder="请输入文本" style="height: 5.3em;"></textarea>
                    <!-- <view class="weui-textarea-counter">0/200</view> -->
                </view>
            </view>
        </view>
      </view>
      <!-- 按钮 -->
      <view class="myui-cell-bottom" style="font-size:16px;margin-top:10rpx;">
        <view class="myui-cell-bottom__bd myui-center" :data-id="refuseId" @tap="cancel">取消</view>
        <view class="myui-cell-bottom__fd myui-center" :data-id="refuseId" :data-approvalType="item.approvalType" @tap="confirm">确定</view>
      </view>

    </view>

    <!-- 审核列表 -->
    <view class="weui-cells weui-cells_after-title" style="margin: 6rpx 0rpx 0rpx;">
        <view class="weui-cell">
          <view v-if="item.approvalType==1" class="weui-cell__bd" style="margin: 0rpx 10rpx;">会议考勤：{{item.applyType}}</view>
          <view v-else class="weui-cell__bd" style="margin: 0rpx 10rpx;">{{item.titleStr}}</view>
          <!-- <view wx:elif="{{item.approvalType==4}}" class="weui-cell__bd" style="margin: 0rpx 10rpx;">{{item.titleStr}}</view> -->
          <!-- <view class="weui-cell__ft weui-cell__ft_in-access" bindtap="toDetail" data-id="{{item.applyId}}" style="font-size:14px;">详情</view> -->
        </view>
    </view> 


    <view class="weui-cells weui-cells_after-title" style="font-size:15px;padding: 20rpx 0rpx 0rpx;">
        <view class="myui-cell" v-if="item.approvalType==1">
          <view class="myui-cell__bd">会议名称：</view>
          <view class="myui-cell__bf">{{item.name}}</view>
        </view>
        <view class="myui-cell">
          <view class="myui-cell__bd">申请人：</view>
          <view class="myui-cell__bf">{{item.applyName}}</view>
        </view>
        <view class="myui-cell">
          <view class="myui-cell__bd">{{item.timeStr}}：</view>
          <view class="myui-cell__bf">{{item.time}}</view>
        </view>
        <view class="myui-cell">
          <view class="myui-cell__bd">{{item.reasonStr}}：</view>
          <view class="myui-cell__bf">{{item.applyReason}}</view>
        </view>
        <view class="myui-cell" v-if="item.approvalType==5 || item.approvalType==6">
          <view class="myui-cell__bd">{{item.otherStr}}：</view>
          <view class="myui-cell__bf">{{item.other}}</view>
        </view>
        <view class="myui-cell" style="margin：45px 15px;font-size:14px;">
          <view class="weui-cell__bd"></view>
          <view class="weui-cell__ft">申请于 {{item.applyTime}}</view>
        </view>

        <!-- 按钮 -->
        <view class="myui-cell-bottom" style="font-size:16px;margin-top:10rpx;">
          <view class="myui-cell-bottom__bd myui-center" :data-id="item.applyId" @tap="bindRefuse">拒绝</view>
          <view class="myui-cell-bottom__fd myui-center" :data-id="item.applyId" :data-approvalType="item.approvalType" @tap="bindAgree">同意</view>
        </view>

    </view> 

    </view>    


    <view class style="margin-top:-200rpx;" v-if="nomore">
      <msg-no-data msg="到底了"></msg-no-data>
    </view>
    <view class style="margin-top:-200rpx;" v-else>
      <msg-no-data msg="上拉加载更多"></msg-no-data>
    </view>

</view>
</view>
</template>

<script>
import msgNoData from "../../../../../components/common/msgNoData/msgNoData";
import modelInput from "../modelInput/modelInput";

export default {
  data() {
    return {
      refuseId: '',
      conflict: false //是否有会议冲突

    };
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
    },
    nomore: {
      type: Boolean,
      default: true
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
      console.log(e.currentTarget.dataset.id);
      this.setData({
        refuseId: e.currentTarget.dataset.id,
        showModel: true
      });
    },
    bindAgree: function (e) {
      console.log("已同意 - e", e);
      this.$emit('agree', {
        detail: {
          applyId: e.currentTarget.dataset.id,
          type: 12,
          approvalType: e.currentTarget.dataset.approvalType
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
			console.log("approvalType",e.currentTarget.dataset.approvalType )
      console.log('inputReason-', this.inputReason);
      console.log('applyId-', e.currentTarget.dataset.id);
      this.$emit('refuse', {
        detail: {
          applyId: e.currentTarget.dataset.id,
          type: 13,
          inputReason: this.inputReason,
          approvalType: e.currentTarget.dataset.approvalType
        }
      });
      this.setData({
        showModel: false,
        inputReason: ""
      });
    },
    // model - 输入原因
    inputReasons: function (e) {
      console.log("拒绝文本框内容",e.detail.value);
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