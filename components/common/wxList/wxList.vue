<template>
<view class="wxList">
	<view v-for="(item, index) in lists" :key="index" :class="'wxListItem flexCenter  ' + (borderBottom?'borderBottom':'')" @tap="userDetail" :data-userid="item.id">
		<!-- wx:for="{{lists}}" wx:key="key" -->
		<view class="wxListLeft flexCenter">
			<image class=" userPic" :src="item.picture?item.picture:'/static/images/mine/admin-1.png'"></image>
			<view>
				<view>{{item.userName}}</view>
				<view>{{item.userId}}</view>
			</view>
		</view>
		
		<view class="wxListCenter">
			<view class="flexCenter">
				<image src="/static/images/index/option/student/phone.png" class="PhonePic"></image>
				<view v-if="item.userPhone">{{item.userPhone}}</view>
				<view v-else>无</view>
			</view>
			<view v-if="item.usermajor">{{item.usermajor}}</view>
		</view>
		
		<view class="rightArrow"></view>
		
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
    borderBottom: {
      type: Boolean,
      default: true
    },
    lists: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    imageError(e) {
      console.log(e);
    },

    userDetail(e) {
      let userid = e.currentTarget.dataset.userid;
      this.$emit('detail', {
        detail: userid
      });
    }

  }
};
</script>
<style>
@import "./wxList.css";
</style>