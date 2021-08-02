<template>
	<view class="page page_view">

		<!-- 一、头像 -->
		<view class="page__bd">
			<view class="reporter-pic ">
				<text class="reporter-title">头像</text>
				<view class="repairImgCount" v-if="showImgCount">
					<!-- <icon type="info_circle" size="16" color="#20A4F7" @tap="showToastFun"></icon> -->
					<!-- <text class="repairImgCountText">可更改次数：</text> -->
					<!-- <text :class="Imgcount  == 0 ? 'fontColorGray' : 'fontColorRed'">{{Imgcount}}</text> -->
				</view>
				<view v-if="userInfoCach.role != null" class="btn-open" @tap="chooseImage">
					<image class="user-avatar" v-if="pic" :src="pic"></image>
					<image class="user-avatar" v-else :src="imagesToApp.admin1"></image>
					<image class="btn-enter" :src="imagesToMy.enter"></image>
				</view>
				<view v-else class="btn-open" @tap="chooseImage">
					<view v-if="pic" class="btn-open">
						<image class="user-avatar" :src="pic"></image>
						<image class="btn-enter" :src="imagesToMy.enter"></image>
					</view>
					<view v-else class="btn-open">
						<image class="user-avatar" :src="imagesToApp.admin1"></image>
						<!-- <open-data class="user-avatar" type="userAvatarUrl"></open-data>  -->
						<image class="btn-enter" :src="imagesToMy.enter"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 二、用户信息列表 -->
		<view class="page__bd">
			<user-detail-list :userDetailCach="userDetailCach" :userInfoCach="userInfoCach" :isUserDetail="1"></user-detail-list>
		</view>

		<!-- 修改头像提示弹框 -->
		<toast-cover maxHeight="290" v-if="showNotice" class="faceNotice" @closeCover="closeCover">
			<view class="toastCover-head noticeFont">温馨提示 </view>
			<view class="faceNoticeTxt faceTxt nomoreTimes">
				<text>您的更改次数已用完！</text>
			</view>
		</toast-cover>

		<toast-cover maxHeight="850" v-if="showToast" class="faceNotice" @closeCover="closeCoverface">
			<view class="toastCover-head noticeFont">“人脸”说明 </view>
			<view class="faceToastCont">
				<view class="faceTxt">“人脸”功能是将用户的真人照片与现场拍摄照片进行比对验证。其功能目的是帮助校内工作人员提高效率，并给校内师生们带来更多便利。在使用过程中，请注意以下：</view>
				<view class="faceImgBox">
					<image :src="imagesToMy.faceImg" class="faceImg" mode="widthFix"></image>
					<view class="noticeFont">VS</view>
					<image :src="imagesToMy.xcImg" class="faceImg" mode="widthFix"></image>
					<image :src="imagesToMy.compareImg" class="faceImg" mode="widthFix"></image>
				</view>
				<view class="faceNoticeTxt faceTxt">
					<text>1.请务必上传本人照片。</text>
					<text>2.考虑到安全性，人脸照片只允许更改2次(第一次添加照片除外),请谨慎更改。</text>
				</view>
				<view class="closeToast noticeFont" @tap="closeToast">确定</view>
			</view>
		</toast-cover>


		<!-- 上传头像 -->
		<avatar :bgImage="imgBg" selWidth="200px" selHeight="200px" ref='avatar' fileType='png' :avatarSrc="pic" @upload="myUpload"
		 quality="1" inner=true avatarStyle="width: 200px; height: 200px; margin: 40px;">
		</avatar>

	</view>
</template>

<script>
	var mineImageUrl = require("../../resources/utils/imageUrl.js");
	var app = getApp();
	import userDetailList from "../../../../components/mineModule/userDetailList/userDetailList";
	import toastCover from "../../../../components/common/toastCover/toastCover";
	import avatar from "../../resources/components/yq-avatar/yq-avatar";

	export default {
		data() {
			return {
				userInfoCach: {},
				userDetailCach: {},
				uploadPic: '',
				pic: '',
				tempFilePaths: [],
				imageBase64: '',
				imagesToApp: app.globalData.ImageUrl,
				imagesToMy: mineImageUrl,
				Imgcount: "",
				//修改头像次数,中共修改次数为 2次
				showToast: false,
				showNotice: false,
				showImgCount: true,

				imgBg: mineImageUrl.bgColorImg
			};
		},

		components: {
			userDetailList,
			toastCover,
			avatar
		},

		/**
		 * 生命周期函数--监听页面加载
		 * 1. 获取用户信息， 并将他放入缓存中
		 * 2. 判断是否是裁剪图片后返回刷新; 还是第一次进入用户详情页面
		 */
		onLoad: function(options) {
			console.log('------------------------用户详情------------------------');
			console.log(options)
			var _this = this; //2. 判断是否是裁剪图片后返回刷新; 还是第一次进入用户详情页面


			let {
				pic
			} = options; //2.1第二次pic接收修改完成的图片，裁剪图片后返回用户详情页面。则把返回的数据

			if (pic) {
				_this.setData({
					uploadPic: pic
				});
			} else {//2.2第一次进入pic为空‘’。则从后台请求，从数据库里查询改图片
				_this.getImage();
			}
			_this.getUserDetail(); 

		},
		onShow: function() {
			var _this = this; //1. 获取用户信息， 并将他放入缓存中

			try {
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

				_this.setData({
					'userInfoCach': userInfoCach
				});

				var showImgCount = true;

				if (userInfoCach.role != null) {
					var showImgCount = false;
				}

				this.setData({
					showImgCount
				}); 
				// 用户详情缓存是否存在

				const userDetailCach = app.globalData.StorageUtil.get('userDetailCach');
				const loginInfo = app.globalData.StorageUtil.get('loginObjCach');
				let imgCount = loginInfo.imgCount == null ? '' : loginInfo.imgCount;
				if (!userDetailCach) {
					userDetailCach = {}
				}
			
				_this.setData({
					userDetailCach: userDetailCach,
					Imgcount: imgCount
				});
			


				// }

			} catch (e) {}
		},
		methods: {
			// 修改头像次数弹框
			showToastFun() {
				this.setData({
					showToast: true
				});
			},

			closeToast() {
				this.setData({
					showToast: false
				});
			},

			closeCover(e) {
				console.log(e);
				this.setData({
					showNotice: e.detail.closeCover
				});
			},

			closeCoverface(e) {
				this.setData({
					showToast: e.detail.closeCover
				});
			},

			/**
			 * 获取用户信息
			 */
			getUserDetail: function() {
				var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				wx.request({
					url: app.globalData.RequestUrl.baseRequestUrl.getUserDetail,
					data: {},
					header: {
						'token': userInfoCach.token,
						'content-type': 'application/json' //默认值

					},
					method: 'POST',

					success(res) {
						console.log('用户详情返回', res.data); // 取消加载弹窗

						if (res.data && res.data.code == 200) {
							// 将null值转化为暂无
							let userDetail = app.globalData.PublicUtil.isNullDeal(userInfoCach, res.data.rows);

							_this.setData({
								userDetailCach: userDetail
							});

							app.globalData.StorageUtil.set('userDetailCach', userDetail);
						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
							return;
						}
					},

					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}
				});
			},


			/**
			 * 将裁剪后的图片，保存到后台
			 * 1. uploadPic是否有数据。是则裁剪完成
			 * 2. 将图片转成base64码，为后台接口提供该参数
			 * 3. 编码是否转化完成。若是则向后台发起请求; 否则提示上传失败
			 * 4. 发起请求，是否数据接收成功。若是则重新获取图片（刷新); 否则提示上传失败
			 */

			myUpload(rsp) {
				console.log(rsp);

				let paths = rsp.path;
				let _this = this;
				let reBase64 = ''
				let {
					pathToBase64
				} = app.globalData.base64Util
				pathToBase64(paths)
					.then(base64 => {
						// console.log(base64)
						reBase64 = base64
						let reg = new RegExp('data:image/png;base64,', "g")
						var Base64 = reBase64.replace(reg, "");
						_this.getImgUrl(Base64)
					})
					.catch(error => {
						console.error(error)
						return
					})



			},

			getImgUrl(reBase64) {
				app.globalData.ShowMsgUtil.netErrNotice();
				let _this = this
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				wx.request({
					url: app.globalData.RequestUrl.baseRequestUrl.upImage,
					data: {
						imageBase64: reBase64
					},
					header: {
						'token': userInfoCach.token,
						'content-type': 'application/json' //默认值

					},
					method: 'POST',
					success: function(res) {
						// 4. 接收成功则重新获取图片
						console.log('图片上传', res.data);

						if (res.data && res.data.code == "200") {
							_this.getImage();

							app.globalData.ShowMsgUtil.showSuccessToast('上传成功！', 2000);
						} else {
							_this.getImage();

							app.globalData.ShowMsgUtil.showErrorModal(res.data.msg, '人脸照片不清晰,请重新上传！', 2000);
							return;
						}
					},
					fail: function(res) {
						app.globalData.ShowMsgUtil.showNoneToastByFail();
						return;
					}
				});
			},


			upImage: function(uploadPic) {
				var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach'); //   //1. 裁剪图片完成

				if (uploadPic) {
					// tempFilePath可以作为img标签的src属性显示图片
					const tempFilePaths = uploadPic; //2. 将图片转成base64码

					wx.getFileSystemManager().readFile({
						filePath: uploadPic,
						//选择图片返回的相对路径
						encoding: 'base64',
						//编码格式
						success: function(res) {
							//成功的回调
							_this.setData({
								imageBase64: res.data
							});

							console.log("图像 - ", res.data); //3. 向后台发起请求

							wx.request({
								url: app.globalData.RequestUrl.baseRequestUrl.upImage,
								data: {
									imageBase64: res.data
								},
								header: {
									'token': userInfoCach.token,
									'content-type': 'application/json' //默认值

								},
								method: 'POST',
								success: function(res) {
									// 4. 接收成功则重新获取图片
									console.log('图片上传', res.data);

									if (res.data && res.data.code == "200") {
										_this.getImage();

										app.globalData.ShowMsgUtil.showSuccessToast('上传成功！', 2000);
									} else {
										_this.getImage();

										app.globalData.ShowMsgUtil.showErrorModal(res.data.msg, '人脸照片不清晰,请重新上传！', 2000);
										return;
									}
								},
								fail: function(res) {
									app.globalData.ShowMsgUtil.showNoneToastByFail();
									return;
								}
							});
						}
					});
				}
			},

			/**
			 * 从后台获取获取头像
			 */
			getImage: function(e) {
				var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				wx.request({
					url: app.globalData.RequestUrl.baseRequestUrl.getImage,
					header: {
						'token': userInfoCach.token
					},
					method: 'GET',
					success: function(res) {
						console.log('获取头像', res.data);

						if (res.data && res.data.code === 200) {
							_this.setData({
								pic: res.data.rows.url,
								Imgcount: res.data.rows.imageUploadTimes
							});

							let loginInfo = app.globalData.StorageUtil.get("loginObjCach");
							loginInfo.image = res.data.rows.url;
							loginInfo.imgCount = res.data.rows.imageUploadTimes; // console.log(loginInfo)

							app.globalData.StorageUtil.set("loginObjCach", loginInfo);
						} else {
							_this.setData({
								Imgcount: res.data.rows.imageUploadTimes
							});

							const loginInfo = app.globalData.StorageUtil.get('loginObjCach');
							loginInfo.imgCount = res.data.rows.imageUploadTimes;
							app.globalData.StorageUtil.set('loginObjCach', loginInfo); // app.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
						}
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}
				});
			},

			/**
			 * 点击头像区域，选择要上传的图片并将他传给裁剪页面
			 * 1. 点击拍摄
			 * 2. 点击从相册里选择
			 */
			chooseImage: function(e) {
				if (!this.pic) return;
				let _this = this
				// 删除图片
				uni.showModal({
					title: '提示',
					content: "请确认是否删除头像",
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							_this.deleteImage()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})


				// let avatar = this.$refs.avatar;
				// avatar.fChooseImg(1, {selWidth: "480upx", selHeight: "480upx", expWidth: "480px", expHeight: "480upx", inner:false}, {data: 'xxx'});


			},
			deleteImage: function() {
				app.globalData.ShowMsgUtil.netErrNotice();
				app.globalData.ShowMsgUtil.showLoadToast("正在处理...");
				let _this = this
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				wx.request({
					url: app.globalData.RequestUrl.baseRequestUrl.deleteImage,
					header: {
						'token': userInfoCach.token,
						'content-type': 'application/json' //默认值
					},
					method: 'POST',
					success: function(res) {
						console.log('删除用户图片', res.data);
						if (res.data && res.data.code == "200") {
							app.globalData.ShowMsgUtil.showSuccessToast('图像删除成功！', 2000);
							_this.getImage();
						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
						}
					},
					fail: function(res) {
						app.ShowMsgUtil.showNoneToastByFail();
						return;
					}
				});
			},

			error(e) {
				console.log(e.detail);
			}

		}
	};
</script>
<style>
	@import "./userDetail.css";
</style>
