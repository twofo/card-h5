<template>
	<view class="box">
		<image :src="img" mode="widthFix" class="NotImg"></image>
		<rich-text  :nodes="content"></rich-text >
	</view>
</template>

<script>
	var app = getApp({allowDefault: true})
	var authImageUrl = require("../../resources/utils/imageUrl.js");
	export default {
		data() {
			return {
				img:authImageUrl.notFountImg,
				content:'<div >登录已过期,账号已经在<span style="font-weight:bold;color: #EA1932">其他地方登录,请退出登录</span>,重新登录!</div>'
			}
		},
		mounted(){
			//#ifdef H5  
			document.querySelector('.uni-page-head-hd').style.display = 'none'  
			//#endif  
		},
		onLoad() {
			app.globalData.StorageUtil.clear();
		},
		methods: {
			
		}
	}
</script>

<style>
	.box{
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.NotImg{
		width: 500rpx;
	}
	
</style>
