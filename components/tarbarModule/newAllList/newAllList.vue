<template>
<!--components/tarbarModule/newAllList/newAllList.wxml-->


<!-- <view wx:for="{{alarmNewsList}}" wx:key="index" wx:for-item="item"> -->
  <navigator :url="'/pages/mineModule/pages/new/new?devicetypeid=' + (index+1)">
    <view class="weui-cells weui-cells_after-title record-list">
      <view class="list-box-c" style="margin-bottom:2px;">
        <view class="weui-cell__bd list-box-text">
          <image src style="width:8px;height:8px;border:1px red solid;"></image>
          <text style="margin-left:6px;">类型：{{item.typeName}}</text>
        </view>
        <view class="weui-cell__ft" style="font-size:10px;">{{item.msg}}</view>
      </view>

         <view class="weui-cell__bd item-title" style="margin: 20px 0 8px 0;">
            {{item.messageContent}}
          </view>
          <view class="weui-cell__bd list-box-text">
           {{item.messageSendTime}}
          </view>
          <view class="list-box-c" style="margin-top:8px;color:#888888;">
            <view class="weui-cell__bd list-box-text">
              <text>2019年9月12日 11:05</text>
            </view>
            <view class="weui-cell__ft weui-cell__ft_in-access" style="font-size:10px;">更多详情</view>
          </view>
      </view>


    
  </navigator>
<!-- </view> -->
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    alarmTypeNews: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
};
</script>
<style>
@import "./newAllList.css";
</style>