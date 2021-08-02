<template>
<view>
<!--components/mineModule/userDetailList/userDetailList.wxml-->

<!-- 用户详情展示组件 -->

<!-- 一、学生、角色用户详情显示 -->
<view v-if="userInfoCach.role == null">
  <view class="weui-cells weui-cells_after-title">
    <view class="weui-cell">
        <view class="weui-cell__bd contTitle">姓名</view>：
        <view class="weui-cell__ft">{{userDetailCach.name}}</view>
    </view>
  </view>
  <view class="weui-cells weui-cells_after-title">
    <view class="weui-cell" v-if="userDetailCach.personType==0">
        <view class="weui-cell__bd contTitle">学号</view>：
        <view class="weui-cell__ft">{{userDetailCach.studentCode}}</view>
    </view>
    <view class="weui-cell" v-if="userDetailCach.personType==1">
        <view class="weui-cell__bd contTitle">教职工</view>：
        <view class="weui-cell__ft">{{userDetailCach.teacherCode}}</view>
    </view>
  </view>
  <view class="weui-cells weui-cells_after-title">
    <view class="weui-cell">
        <view class="weui-cell__bd contTitle">寝室号</view>：
        <view class="weui-cell__ft" v-if="userInfoCach.roomInfo != null">{{userInfoCach.roomInfo.buildName}} - {{userInfoCach.roomInfo.roomName}}</view>
        <view class="weui-cell__ft" v-if="userInfoCach.roomInfo == null">暂无</view>
    </view>
  </view>
  <view class="weui-cells weui-cells_after-title" v-if="userDetailCach.personType==1">
    <view class="weui-cell">
        <view class="weui-cell__bd contTitle">所在部门</view>：
        <view class="weui-cell__ft">{{userDetailCach.department}}</view>
    </view>
  </view>
  <view class="weui-cells weui-cells_after-title" v-if="userDetailCach.personType==0">
   <view class="weui-cell">
        <view class="weui-cell__bd contTitle">院系</view>：
        <view class="weui-cell__ft">{{userDetailCach.college}}</view>
    </view>
    <view class="weui-cell">
        <view class="weui-cell__bd contTitle">专业</view>：
        <view class="weui-cell__ft">{{userDetailCach.majorName}}</view>
    </view>
     <view class="weui-cell">
        <view class="weui-cell__bd contTitle">班级</view>：
        <view class="weui-cell__ft">{{userDetailCach.className}}</view>
    </view>
  </view>
  <view class="weui-cells weui-cells_after-title">
    <view class="weui-cell">
        <view class="weui-cell__bd contTitle">联系电话</view>：
        <view class="weui-cell__ft">{{userDetailCach.mobile}}</view>
    </view>
  </view>
  <!-- <view class="weui-cells weui-cells_after-title" wx:if="{{isUserDetail==1}}">
    <view class="weui-cell">
        <view class="weui-cell__bd">卡号：</view>
        <view class="weui-cell__ft">{{userDetailCach.cardNumber}}</view>
    </view>
  </view> -->
</view>

<!-- 二、含有角色的用户详情显示 -->
<view v-else>
  <view class="weui-cells weui-cells_after-title">
    <view class="weui-cell">
        <view class="weui-cell__bd">姓名：</view>
        <view class="weui-cell__ft">{{userDetailCach.name}}</view>
    </view>
  </view>
  <view class="weui-cells weui-cells_after-title">
    <view class="weui-cell">
        <view class="weui-cell__bd">部门：</view>
        <view class="weui-cell__ft">{{userDetailCach.department}}</view>
    </view>
  </view>
  <view class="weui-cells weui-cells_after-title">
    <view class="weui-cell">
        <view class="weui-cell__bd">邮箱：</view>
        <view class="weui-cell__ft">{{userDetailCach.email}}</view>
    </view>
  </view>
  <view class="weui-cells weui-cells_after-title">
    <view class="weui-cell">
        <view class="weui-cell__bd">手机号：</view>
        <view class="weui-cell__ft">{{userDetailCach.mobile}}</view>
    </view>
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
    userDetailCach: {
      type: Object,
      default: () => ({})
    },
    userInfoCach: {
      type: Object,
      default: () => ({})
    },
    isUserDetail: {
      type: Number,
      default: 0
    }
  },
  methods: {}
};
</script>
<style>
@import "./userDetailList.css";
</style>