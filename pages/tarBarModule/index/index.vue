<template>
	<view class="container">
		<!-- 一、消费统计展示 -->
		<view>
			<view class="top-box">
				<!-- @tap="gopay" -->
				<view class="box-items">
					<text class="title-items">{{consumeValue.balance}}元</text>
					<text class="detail-items">个人钱包</text>
				</view>
				<view class="box-items">
					<text class="title-items">{{consumeValue.eleBalanceByRoom}}元</text>
					<text class="detail-items">空调电费</text>
				</view>
				<!-- <view class="box-items">
					<text class="title-items">{{consumeValue.waterhotBalanceByRoom}}元</text>
					<text class="detail-items">热水费</text>
				</view> -->
				
				<!-- <view class="box-items" >
					<text class="title-items">{{consumeValue.waterBalanceByRoom}}元</text>
					<text class="detail-items">冷水费</text>
				</view>
				<view class="box-items" v-if="!showMore">
					<text class="title-items">{{consumeValue.lightingBalanceByRoom}}元</text>
					<text class="detail-items">照明电费</text>
				</view> -->
			</view>
		<!-- 	<view class="top-box-more" v-if="showMore" @tap="showTap()"> 更多 <text class="down-arrow"></text></view>
			<view class="top-box-more" v-if="!showMore" @tap="showTap()"> 收起 <text class="top-arrow"></text></view> -->
		</view>
		<view class="carousel">
			<swiper class="carousel_swiper" indicator-color="#f4f4f4" indicator-active-color="#4eb8b8" autoplay="true" interval="3000"
			 circular="true">
				<block v-for="(item, index) in imgUrls" :key="index">
					<swiper-item>
						<image class="carouselImg" :src="item" mode="aspectFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<!-- 二、功能导航 -->
		<view style="width:100%; margin-bottom: 4rpx;">
			<option-items :cores="cores" title="生活服务"></option-items>
		</view>
		<!-- 二、功能导航 -->
		<block v-if="cores1.length>0">
			<view style="width:100%; margin-bottom: 4rpx;">
				<option-items :cores="cores1" title="后勤服务"></option-items>
			</view>
		</block>

		<!-- 提示框 -->
		<msg-select :msg="msgObj.msg" :showModel="msgObj.showModel" :btnList="msgObj.btnList" @confirm="bindConfirm" @cancel="bindCancel"></msg-select>

		<!-- 三、设备列表-->
		<view class="main-card-item" id="kb">
			<view class="card-item-hd">
				                           
				<text class="card-item-name" >常用设备</text>
				<view class="message" v-if='message' @click="close">
					
				</view>
			</view>
			<view v-if="spr" class="remind-box">
				<image class="remind-img1" :src="imageUrl.none"></image>
				<text class="remind-text">暂无设备</text>
			</view>
			<view v-if="!spr">
				<scroll-view scroll-y style="height: 50%;">
					<view v-for="(item, index) in device" :key="index" class="kb-item">
						<!-- 一、左边 -->
						<view class="kb-item-left">
							<!-- 图片：水、电、门锁、未知 -->
							<image class="card-item-device" :src="item.deviceImage"></image>
							<!--<text class="kb-item-what">{{item.deviceName}}</text-->
						</view>

						<!-- 二、中间 -->
						<view class="item-center">
							<!-- 门锁 - 电量状态。水表 - 使用模式 -->
							<text>{{item.showName}}</text>
							<!-- 在离线 -->
							<text>{{item.showOnline}}</text>
							<!-- 位置 -->
							<text>{{item.showRoomName}}</text>
						</view>

						<!-- 三、右边 -->
						<!--水表-->
						<block>
							<!--在线、离线-->
							<view :data-isOpen="item.isOpen" :data-mode="item.isNormallyOpenMode" :data-deviceCode="item.deviceCode"
							 :data-deviceId="item.deviceId" :data-deviceType="item.deviceType" :data-roomName="item.roomName" :data-doorOpen="item.isOpen"
							 :data-online="item.online" @tap="item.bindtap">
								<image class="card-item-op" :src="item.statusImage"></image>
							</view>
						</block>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 尾部 -->
		<view class="main-ending">
			<view class="main-ending-line"></view>
			<view class="main-ending-text">我是一个乖巧的结尾</view>
			<view class="main-ending-line"></view>
		</view>

		<!-- 人脸识别提示弹窗 -->
		<toast-cover v-if="showToast" class="toastCover">
			<view class="toastCover-head noticeFont"> 温馨提醒 </view>
			<view class="toastCover-cont">
				<view class="toastCover-cont-head">尊敬得用户:</view>
				<view>您还没有完成 <text class="noticeFont">人脸认证</text>，这将可能为您之后的校园生活带来不便，请尽快完善人脸信息。</view>
				<view class="stepFlue">我的 {{">"}} 个人信息 {{">"}} 头像 {{">"}} 拍照 {{">"}} 设置成功</view>

				<view class="stepPhoto">
					<view class="oldPhoto">
						<image :src="oldPic"></image>
					</view>
					<view class="iconfont icon-Arrow"></view>
					<view class="oldPhoto">
						<image :src="newPic"></image>
					</view>
				</view>
				<view class="stepType">本地上传 或 手机拍照</view>
				<view class="toast-btn">
					<view class="noticeFont" @tap="gotoUserInfo">完善信息</view>
					<view class="noticeFont btnLine" @tap="cancelToast">下次完善</view>
				</view>
			</view>
		</toast-cover>
		
		<mp-tabbar v-if="!showOnlyABC" style="position:fixed;bottom:0;width:100%;left:0;right:0;" 
				:list="tabBarList" 
				:current="current"
				@change="tabChange" 
				></mp-tabbar>
	</view>
</template>

<script>
	//获取应用实例
	var app = getApp({
		allowDefault: true
	});
	var ImageUrls = app.globalData.ImageUrl;
	var AgreementUtil = app.globalData.agreementUtil;
	import msgSelect from "../../../components/common/msgSelect/msgSelect";
	import optionItems from "../../../components/indexModule/option/option";
	import toastCover from "../../../components/common/toastCover/toastCover";
	import mpTabbar from "../../../components/common/tarbBar/tarbBar";  
	
	export default {
		data() {
			return {
				cores: [],
				cores1: [],
				userInfoCach: {},
				device: [],
				spr: false,
				imageUrl: ImageUrls,
				title: '',
				lockRequestObj: {},
				//门锁请求对象
				imgUrls: ["/static/images/tabBar/1.png", "/static/images/tabBar/2.png"],
				//首页轮播图
				pageObj: {},
				//页面显示数据
				disabledItemTap: false,
				//点击了不可用的页面
				consumeValue: '',
				statusLock: '',
				msgObj: {},
				//订阅消息提示框对象
				showToast: false,
				//人脸识别提示弹窗
				oldPic: ImageUrls.admin1,
				newPic: ImageUrls.facePic,
                message:true,
				messageId:'',
				showMore: true, //首页钱包余额显示,暂时更多按钮
				// 自定义tabBar
				current:0,
				tabBarList:[
					{
					  text: "首页",
					  iconPath: '/static/images/tabBar/index.png',
					  selectedIconPath: "/static/images/tabBar/index@active.png",
						pagePath: "/pages/tarBarModule/index/index"
					}, {
					  text: "消息",
					  iconPath: "/static/images/tabBar/news.png",
					  selectedIconPath: "/static/images/tabBar/news@active.png",
					  pagePath: "/pages/tarBarModule/message/message"
					}, {
					  text: "我的",
					  iconPath: "/static/images/tabBar/more.png",
					  selectedIconPath: "/static/images/tabBar/more@active.png",
					  pagePath: "/pages/tarBarModule/mine/mine"
					}
				],
				showOnlyABC: app.globalData.showOnlyABC,
				tabItem:[{
						image: ImageUrls.newCentrol,
						url:  "/pages/tarBarModule/message/message",
						name: '消息中心'
					},{
						image: ImageUrls.profile,
						url:  "/pages/tarBarModule/mine/mine",
						name: '个人中心'
					}]
			};
		},
		components: {
			msgSelect,
			optionItems,
			toastCover,
			mpTabbar,
		},
		
		//分享
		onShareAppMessage: function() {
			return {
				title: '科韵智慧校园',
				desc: '智慧校园生活服务小程序',
				path: '/pages/index/index'
			};
		},
		//下拉更新
		onPullDownRefresh: function() {
			var _this = this;

			this.getCardData(_this.userInfoCach);
		},
		onLoad: function(options) {
		
		    var _this=this;
			
		// app.globalData.PublicUtil.redirectByUrl(app.globalData.PageUrl.authPageUrl.rebackUrl);
			if(!app.globalData.showLogin){ //不需要登录即单点
				let urls = window.location.href;
				// let urls =	"http://ykt.hbjhart.cn/h5/?&tokenByLoginAndSwitch=eyJhbGciOiJIUzI1NiJ9.eyJyYW5kb21LZXkiOiIxMTg4OWJjNzFlY2NjY2Q3YjU4MTc3ZGY0YmExOTFlMCIsInBlcnNvbklkIjoieWVzIiwicGVyc29uVHlwZSI6InllcyIsImV4cCI6MTYxNTg4MDgzNiwidXNlcklkIjoieWVzIiwiaWF0IjoxNjE1Mjc2MDM2LCJ1c2VybmFtZSI6IjE0MTIxNDAxMDAifQ.XHD63ocIMUQUT1ue1mtf1TTvAUMARF-R3rwiyeryhSE&username=1412140100#/"
				console.log('urls - ', urls)
				let params = this.getQueryString(urls)
				let isErr = this.handleLoginError(params);
				if(isErr){
					return
				}
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				if(userInfoCach){
					console.log('第二次进入首页,此时无需比较url信息')
				}else{
					console.log('首次进入首页')
					let params = this.getQueryString(urls)
					let username ,roleArr = [] ;
					if(params.username && params.username.indexOf('#/') != -1){
						username = params.username.split('#/')[0]
					}else{
						username = params.username
					}
					//角色筛选  剔除了维修工身份(待完成维修工功能后则需加入该角色)
					if(params.roleList){
						[...params.roleList.split(",")].forEach(item =>{
							if(item == app.globalData.Constant.roleTypeConstant.DORMADMIN || item == app.globalData.Constant.roleTypeConstant.COUNSELOR || item == app.globalData.Constant.roleTypeConstant.RESOURCES_ADMIN || item == app.globalData.Constant.roleTypeConstant.DUTYTEACHER){
								roleArr.push(item)
							}
						})
					}
					console.log(roleArr)
					let rows = {
						image: params.image ? params.image : null,
						roleList: roleArr.length != 0 ? roleArr : null,
						tokenByLoginAndSwitch: params.tokenByLoginAndSwitch,
						username:  username
					}
					
					app.globalData.StorageUtil.set('loginObjCach', rows);
					
					if(options.noRefresh){
					}else{
						if(rows.roleList == null || rows.roleList == ''  || (rows.roleList.length == 1 && (rows.roleList[0] != app.globalData.Constant.roleTypeConstant.DORMADMIN && rows.roleList[0] != app.globalData.Constant.roleTypeConstant.COUNSELOR && rows.roleList[0] != app.globalData.Constant.roleTypeConstant.MAINTAIN_MAN) )) {
							console.log('没有角色也没有用户信息')
							let roleList;
							if(rows.roleList == null || rows.roleList == ''){
								roleList =rows.roleList
							}else {
								
									roleList = parseInt(rows.roleList[0])
							}
							console.log('124');
							this.switchRoleRequest(rows.tokenByLoginAndSwitch, rows.username, roleList)
							
						}else{
							app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.authPageUrl.switchRoleUrl);
						}
					}
					
				}
			}
		},
		

		mounted(){
			//#ifdef H5  
			// document.querySelector('.uni-page-head-hd').style.display = 'none'  
			//#endif  
		},
		onShow: function() {
			var _this = this; 
				console.log('------------------------首页 show ------------------------');
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				if(app.globalData.showLogin){  //需要登录即非单点\
				console.warn('第一次进入首页的数据请求')
					// 保存用户的openid
					if(userInfoCach){
						 _this.bindchange();
					}else{
						setTimeout(function () {
							wx.redirectTo({
								url: app.globalData.PageUrl.authPageUrl.loginUrl
							})
						}, 1000)
					}
					//this.saveOpenid(openid); // 消息订阅授权处理 - 是否需要消息订阅
					// if (userInfoCach.role == app.globalData.Constant.roleTypeConstant.MAINTAIN_MAN) {
					//   app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.repairPageUrl.index, 10);
					// } // 是否需要人脸识别
			
					this.isFaceAuth(); // 处理显示数据 - 功能选项
					var cores = [];
					var cores1 = [];
					
					let tabItem = []

					if (userInfoCach.role == null && (userInfoCach.personType == 0 || userInfoCach.personType == 2)) {
						cores = app.globalData.Constant.arrayConstant.studentOption;
					} else if (userInfoCach.role == null && userInfoCach.personType == 1) {
						cores = app.globalData.Constant.arrayConstant.teacherOption;
					} else if (userInfoCach.role == app.globalData.Constant.roleTypeConstant.DORMADMIN) {
						// 功能选项组件 - 宿管
						cores = app.globalData.Constant.arrayConstant.teacherOption;
						cores1 = app.globalData.Constant.arrayConstant.dormAdminOption;
					} else if (userInfoCach.role == app.globalData.Constant.roleTypeConstant.COUNSELOR) {
						// 功能选项组件 - 辅导员
						cores = app.globalData.Constant.arrayConstant.teacherOption;
						cores1 = app.globalData.Constant.arrayConstant.counsellorAdminOption;
					}else if(userInfoCach.role != null && userInfoCach.personType == 1){
						cores = app.globalData.Constant.arrayConstant.teacherOption;
					}
					let flag = false
					if(this.showOnlyABC){
						tabItem = this.tabItem
						cores[0].forEach(item =>{
							if(item.name === '消息中心' || item.name === '个人中心' ){
								flag = true
							}
						})
						if(!flag){
							cores[0] = cores[0].concat(...tabItem)
						}
					}
					_this.setData({
						'cores': cores,
						'cores1': cores1,
						'userInfoCach': userInfoCach
					});

					_this.getDeductionModel(); // _this.getConsume(userInfoCach);

					_this.getCardData(userInfoCach);
				}else if(userInfoCach){
					console.warn('并非第一次进入首页的数据请求')
					this.getHomeData()
				}
		},

		onHide() {
			let obj = {};
			obj.showModel = false;
			this.setData({
				msgObj: obj
			});
		},
		
		methods: {
			tabChange(e){
				console.log(e)
				let ind = e.detail.index
				if(ind != 0){
					let url = e.detail.item.pagePath
					console.log(url)
					uni.reLaunch({
						url: url
					})
				}
			},
		
			// 登录错误处理
			handleLoginError(params){
				if (typeof params.channel != 'undefined' && params.channel.indexOf("abc")>=0) {
					console.log('执行错误处理 - ', params)
				        let msg =params.message;
						console.log(msg);
						setTimeout(function() {
							uni.$emit("floorIn", {
								value:msg,
							})
						},10);
						let cores=app.globalData.Constant.arrayConstant.initOption;
						let opg={};
						opg.balance='0.00'
						opg.eleBalanceByRoom='0.00'
						this.setData({
							'cores': cores,
							consumeValue:opg,
						});
						app.globalData.StorageUtil.remove('userInfoCach');
				        return true;
				  }
				  return false;
			},
			
			// 单点的使用方式
			getHomeData(){
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				console.log('1233');
				this.isFaceAuth(); // 处理显示数据 - 功能选项
				
				var cores = [];
				var cores1 = [];
				
				let tabItem = []
				
				if (userInfoCach.role == null && (userInfoCach.personType == 0 || userInfoCach.personType == 2)) {
					cores = app.globalData.Constant.arrayConstant.studentOption;
				} else if (userInfoCach.role == null && userInfoCach.personType == 1) {
					cores = app.globalData.Constant.arrayConstant.teacherOption;
				} else if (userInfoCach.role == app.globalData.Constant.roleTypeConstant.DORMADMIN) {
					// 功能选项组件 - 宿管
					cores = app.globalData.Constant.arrayConstant.teacherOption;
					cores1 = app.globalData.Constant.arrayConstant.dormAdminOption;
				} else if (userInfoCach.role == app.globalData.Constant.roleTypeConstant.COUNSELOR) {
					// 功能选项组件 - 辅导员
					cores = app.globalData.Constant.arrayConstant.teacherOption;
					cores1 = app.globalData.Constant.arrayConstant.counsellorAdminOption;
				}else if(userInfoCach.personType == 1){
					cores = app.globalData.Constant.arrayConstant.teacherOption;
				}
				console.log(this.showOnlyABC)
				if(this.showOnlyABC){
					tabItem = this.tabItem
					let flag = false
					console.log('jaoghoahgoahgdhsogfhaoga', cores[0])
					cores[0].forEach(item =>{
						if(item.name === '消息中心' || item.name === '个人中心' ){
							flag = true
						}
					})
					if(!flag){
						cores[0] = cores[0].concat(...tabItem)
					}
				}
				console.log(cores)
				this.setData({
					'cores': cores,
					'cores1': cores1,
					'userInfoCach': userInfoCach
				});
				
				this.getDeductionModel(); // _this.getConsume(userInfoCach);
				this.getCardData(userInfoCach);
			},
			switchRoleRequest: function(token,username,role) {
				var _this = this;
				
				app.globalData.ShowMsgUtil.netErrNotice();
				uni.request({
					url: app.globalData.RequestUrl.baseRequestUrl.switchRole,
					data: {
						username: username,
						role:  role
					},
					header: {
						'token': token,
						'content-type': 'application/json' //默认值
					},
					method: 'POST',
					success(res) {
						console.log('用户详情返回', res.data); // 取消加载弹窗
						app.globalData.CheckUtil.checkLoginInPast(res.data.code)
						if (res.data && res.data.code == 200) {
							uni.setStorageSync('userInfoCach',res.data.rows)
							clearTimeout()
							setTimeout(()=>{
								_this.getHomeData()
							},500)
							// app.globalData.StorageUtil.set('userInfoCach', res.data.rows);
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
			getQueryString(url) {
				var theRequest = new Object();
				if (url.indexOf("?") != -1) {
					var str = url.substr(0);
					console.log("ssss", str)
					var parm = str.split("?")
					var strs = parm[1].split("&");
					for (var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
					}
				}
				return theRequest;
			},
			gopay() {
				wx.redirectTo({
					url: '/pages/indexModule/pages/walletIndex/walletIndex'
				});
			},
			showTap() {
				this.showMore = !this.showMore
			},
			toLogin: function(code) {
				if (code == 1001) {
					wx.showToast({
						title: '登录失效!',
						icon: 'none',
						mask: true,
						duration: 2000
					});
					if(app.globalData.showLogin){
						app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.authPageUrl.loginUrl, 2000);
					}else{
						app.globalData.PublicUtil.reLaunchByUrl(app.globalData.PageUrl.authPageUrl.rebackUrl, 1000);
					}
				}
			},
			/**
			 *  当第一次进入首页初始化数据
			 */
			initData: function() {
				var cores = [];
				let title = ''; // 功能选项组件 - 学生

				title = '基本信息';
				cores = app.globalData.Constant.arrayConstant.studentOption;
				this.setData({
					'title': title,
					'cores': cores
				}); // 数据精度处理

				let obj = {};
				obj.waterCount = 0.0.toFixed(2);
				obj.electricityCount = 0.0.toFixed(2);
				obj.consumeCount = 0.0.toFixed(2);
				this.setData({
					consumeValue: obj
				});
			},

			/************************************************************** WX - 数据请求 *******************************************************************/

			/**
			 * 获取扣费模式返回
			 */
			getDeductionModel: function() {
				var _this = this;
				app.globalData.ShowMsgUtil.netErrNotice();
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach')
				console.log(userInfoCach)
				wx.request({
					url: app.globalData.RequestUrl.baseRequestUrl.getDeductionModel,
					method: 'GET',
					header: {
						'token': userInfoCach.token
					},
					success: function(res) {
						if (res.data && res.data.code == 200) {
							_this.getBalance(res.data.rows.deductionModel);
						} else {
							app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
							return;
						}
					},
				
				});
			},
			bindchange:function(){
				var _this = this;
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach')
					let s= userInfoCach.token
				const username=userInfoCach.username;
					   wx.request({
					   	url: app.globalData.RequestUrl.baseRequestUrl.bind,
					   	method: 'GET',
						header: {
							'token':s
						},
							data: {
								username: userInfoCach.username,
							},
					   	success: function(res) {
							console.log(res);
							console.log(res.data.data);
							var arr = Object.keys(res.data.data); 
						if(res.data.code==200&&arr.length>0){
								let content=res.data.data.messageContent;
								let messageid=res.data.data.id;
								wx.showModal({
								  title: '温馨提示',
								  content: content,
								  confirmColor: '#20a4f7',
								  confirmText:"已读",
								  cancelText:'未读',
								  success: function (res) {
								    if (res.cancel) {
								     console.log('789');
								    }else{
								        _this.submitmessage(messageid);
									}
								  }
								});
							
						
						}
					   	},
					   	fail: function() { // 
					   
					   	}
					   });
			},

			/**
			 * 获取余额
			 */
			getBalance: function(deductionModel) {
				var _this = this;

				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				wx.request({
					url: app.globalData.RequestUrl.baseRequestUrl.balance,
					method: 'POST',
					header: {
						'token': userInfoCach.token
					},
					data: {
						deductionMode: deductionModel
					},
					success: function(res) {
						if (res.data && res.data.code == 200) {
							let obj = {};
							obj.balance = app.globalData.PublicUtil.minuteChanageYuanBalance(res.data.rows.purseBalance.balance);
							obj.eleBalanceByRoom = app.globalData.PublicUtil.minuteChanageYuanBalance(res.data.rows.purseBalance.eleBalanceByRoom);
							obj.waterBalanceByRoom = app.globalData.PublicUtil.minuteChanageYuanBalance(res.data.rows.purseBalance.waterBalanceByRoom);
							obj.waterhotBalanceByRoom = app.globalData.PublicUtil.minuteChanageYuanBalance(res.data.rows.purseBalance.hotWaterBalance);
							// 空调电费 未完成
							obj.waterzyBalanceByRoom = app.globalData.PublicUtil.minuteChanageYuanBalance(res.data.rows.purseBalance.conditionerEleFeeByRoom);
							//照明电费
							obj.lightingBalanceByRoom = app.globalData.PublicUtil.minuteChanageYuanBalance(res.data.rows.purseBalance.lightingEleFeeByRoom);
							// console.log("obj - ", obj);

							_this.setData({
								consumeValue: obj
							});
						} else {
							wx.hideToast({});
							console.warn('请求失败', res.data.msg); // 
							app.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
						}
					},
					fail: function() {
						wx.hideToast({});
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}
				});
			},
			submitmessage:function(messageid){
				 console.log('4564');
				 console.log(messageid);
				 		var _this = this;
						 console.log(_this.messageId);
				 		const userInfoCach = app.globalData.StorageUtil.get('userInfoCach')
				 			console.log( userInfoCach.token);
							console.log(userInfoCach);
				 		const username=userInfoCach.username;
				 			   wx.request({
				 			   	url: app.globalData.RequestUrl.baseRequestUrl.submessa,
				 			   	method: 'POST', 
				 		      header: {
				 			'token': userInfoCach.token,
				 			'content-type': 'application/json' // 默认值
				 		},
				 		  data: {
				 		  	id: messageid,
				 		  },
				 			   	success: function(res) {
				 			         console.log(res);
				 			   	},
				 			   	fail: function() { 
				 			   	},
								
				 			   });
				
			},

			/**
			 * 消费统计
			 */
			getConsume: function() {
				var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach')
				wx.request({
					url: app.globalData.RequestUrl.baseRequestUrl.countAlarm,
					method: 'GET',
					header: {
						'token': userInfoCach.tokenByLoginAndSwitch
					},
					success: function(res) {
						console.log('消费统计返回', res.data);

						if (res.data && res.data.code == 200) {
							// 数据精度处理
							let waterConsume = parseFloat(res.data.rows.waterConsume);
							let eleConsume = parseFloat(res.data.rows.eleConsume);
							let totalConsume = parseFloat(res.data.rows.totalConsume);
							res.data.rows.waterConsume = (waterConsume / 100.0).toFixed(2);
							res.data.rows.eleConsume = (eleConsume / 100.0).toFixed(2);
							res.data.rows.totalConsume = (totalConsume / 100.0).toFixed(2);

							_this.setData({
								consumeValue: res.data.rows
							});
						} else {
							app.globalData.CheckUtil.checkLoginInPast(res.data.code)

							if (_this.title == '' && _this.cores.length == 0) {
								_this.initData();
							}

							return;
						}
					},
					fail: function() {
						if (_this.title == '' && _this.cores.length == 0) {
							_this.initData();
						}
					}
				});
			},

			/**
			 * 获取小程序配置
			 */
			isFaceAuth: function() {
				var _this = this;

				var xcxSet = app.globalData.StorageUtil.get("xcxSet");

				if (xcxSet.face == 1) {
					_this.handleFaceAuth();
				}
			},
			handleFaceAuth: function() {
				// 人脸数据
				let userLogin = app.globalData.StorageUtil.get('loginObjCach');
				var showToast = false;

				if (userLogin) {
					let headPortrait = userLogin.image;

					if (headPortrait == null || headPortrait == undefined || headPortrait == '') {
						showToast = true;
					}
				} // if (userInfoCach.role!=null){
				//    var showToast = false
				// }


				this.setData({
					showToast
				});
			},

			/************************************************************** WX - 设备操作 *******************************************************************/

			/**
			 * 获取设备列表
			 */
			getCardData: function() {
				var _this = this;
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach')
				const deviceinfo = app.globalData.StorageUtil.get('deviceCach'); //获设备列表数据
						app.globalData.ShowMsgUtil.netErrNotice();
				wx.request({
					url: app.globalData.RequestUrl.baseRequestUrl.getDeviceList,
					method: 'GET',
					header: {
						'token': userInfoCach.token
					},
					success: function(res) {

						if (res.data && res.data.code === 200) {
							var info = res.data.rows; //处理后台数据 - 用于页面显示

							_this.deal(info);
						} else if (res.data.code == 1001) {
							app.globalData.CheckUtil.checkLoginInPast(res.data.code)

							return;
						} else {
							//网络异常情况直接读取缓存
							_this.deal(deviceinfo); // _this.setData({
							//   device: deviceinfo,
							// });

						}

					},
					fail: function() {
						//网络异常情况直接读取缓存
						// app.ShowMsgUtil.showErrorModal('请求失败', '后台连接失败！');
						_this.deal(deviceinfo); // _this.setData({
						//   device: deviceinfo,
						// });

					},
					complete:function(){
						uni.stopPullDownRefresh()
					},
				});
			},
			deal: function(info) {
				var _this = this;

				console.log('个人设备列表', info);

				if (info.length > 0) {
					app.globalData.StorageUtil.set('deviceCach', info);
				} //处理页面显示数据


				let array = _this.dealPageObjByDevice(info);
			},
			// 处理页面显示数据
			dealPageObjByDevice: function(array) {
				var list = [];
				var t = 0;

				for (let i = 0; i < array.length; i++) {
					if (!(array[i].deviceType == 1 || array[i].deviceType == 6 || array[i].deviceType == 2 || array[i].deviceType ==
							8) || array[i].deviceCacheToApp == null) {
						continue;
					}

					let obj = {};
					let deviceCacheToApp = array[i].deviceCacheToApp;
					obj.deviceType = array[i].deviceType;

					if (array[i].deviceName.length > 4) {
						obj.deviceName = array[i].deviceName.substring(0, 4);
					}

					obj.deviceName = array[i].deviceName; //设备开关

					let switchStatus = deviceCacheToApp.status.isOpen;
					let switchIsOpean = switchStatus == 1 ? true : false;
					obj.switchIsOpean = switchIsOpean; //一、左边 - 设备图片

					if (deviceCacheToApp.status.isOpen == 1 || deviceCacheToApp.status.isOpen == 0) {
						if (array[i].deviceType == 6) {
							obj.deviceImage = "/images/index/device/" + 1 + "-" + deviceCacheToApp.status.isOpen + ".png";
						} else {
							obj.deviceImage = "/images/index/device/" + array[i].deviceType + "-" + deviceCacheToApp.status.isOpen + ".png";
						}
					} else {
						obj.deviceImage = "/static/images/core/wz.png";
					} //二、中间 


					obj.showName = this.dealByDeviceTypeId(array[i]);

					if (deviceCacheToApp.status.online) {
						obj.showOnline = "设备状态：在线";
					} else {
						obj.showOnline = "设备状态：离线";
					}

					obj.showRoomName = "位置：" + array[i].roomName;
					obj.roomName = array[i].roomName; //三、右边
					//设备在线

					if (deviceCacheToApp.status.online) {
						if (array[i].deviceType == 1 || array[i].deviceType == 6) {
							// obj.bindtap = 'oprlock';
							obj.bindtap = 'oprlockV2';
						} else {
							obj.bindtap = 'oprdevice';
						}

						if (array[i].deviceType == 2 || array[i].deviceType == 8) {
							//冷水表
							if (array[i].deviceType == 2) {
								obj.statusImage = app.globalData.ImageUrl.frobit;
							} // if(array[i].deviceType == 8){
							//   if(deviceCacheToApp.attributes.isNormallyOpenMode == 0||deviceCacheToApp.attributes.isNormallyOpenMode == 1){
							//     obj.statusImage = app.ImageUrl.frobit;
							//   }else{
							//     obj.statusImage = app.ImageUrl.open;
							//   }
							// }
							// obj.isOpen = deviceCacheToApp.status.isOpen;


							obj.isNormallyOpenMode = deviceCacheToApp.attributes.isNormallyOpenMode;
							obj.deviceCode = array[i].deviceCode;
							obj.isOpen = deviceCacheToApp.status.isOpen;
							obj.online = deviceCacheToApp.status.online;
						} else {
							//在线。判断设备是开还是关？
							if (deviceCacheToApp.status.isOpen == 1) {
								obj.statusImage = app.globalData.ImageUrl.open;
							} else if (deviceCacheToApp.status.isOpen == 0) {
								obj.statusImage = app.globalData.ImageUrl.close;
							} else {
								obj.statusImage = pp.ImageUrl.frobit;
							} // obj.isOpen = deviceCacheToApp.status.isOpen;


							obj.isNormallyOpenMode = deviceCacheToApp.status.isNormallyOpenMode;
							obj.deviceCode = array[i].deviceCode;
							obj.isOpen = deviceCacheToApp.status.isOpen;
							obj.online = deviceCacheToApp.status.online;
							obj.doorOpen = deviceCacheToApp.status.doorOpen;
						}
					} else {
						obj.statusImage = app.globalData.ImageUrl.frobit;
					}

					if (array[i].deviceType == 8) {
						obj.deviceImage = "/static/images/index/device/2-0.png";
						obj.deviceCode = array[i].deviceCode;
						obj.bindtap = 'toOpenWatermeter';
						obj.roomName = array[i].roomName;
						obj.statusImage = app.globalData.ImageUrl.open;
						obj.deviceId = array[i].deviceCode;
					}

					list[t] = obj;
					console.log('房间内设备数据 - ', list);
					t++;
				}

				console.log('房间内设备数据 - ', list); // TODO 将连接成功缓存的数据，取出，并存入常用设备数组

				list = this.handleDeviceStorage(list);

				if (list.length > 0) {
					this.setData({
						spr: false
					});
				} else {
					this.setData({
						spr: true
					});
				}

				this.setData({
					device: list
				});
			},
			handleDeviceStorage: function(list) {
				let listArr = list;
				let cachArr = [];
				let isIos = this.handleIOSOrAndrondData(); // 缓存中是否存在数据

				const deviceCach = app.globalData.StorageUtil.get('connectDeviceCach');

				if (deviceCach && deviceCach.length > 0) {
					let t = list.length; // 将数据取出，并查询设备基本信息

					for (let i = 0; i < deviceCach.length; i++) {
						let isContinue = 0; // 过滤数组，苹果手机显示苹果手机存储的数据，安卓手机显示安卓存储的数据

						if (isIos != deviceCach[i].isIos) {
							continue;
						}

						for (let j = 0; j < list.length; j++) {
							if (list[j] && list[j].deviceType == 8) {
								// 如果是苹果手机，有设备缓存与房间设备相同的设备，则保留缓存的设备，去除房间里的设备
								if (isIos == 1) {
									console.log('list[j] - ', list[j]);

									if (list[j].deviceCode === deviceCach[i].deviceCode) {
										listArr.splice(j, 1);
									}
								} // 如果是安卓手机，有设备缓存与房间设备相同的设备，则保留房间里的设备，去除缓存的设备


								if (isIos == 0) {
									if (list[j].deviceCode === deviceCach[i].deviceCode) {
										isContinue = 1;
									}
								}
							}
						}

						if (isContinue === 1) {
							continue;
						} // 请求后台，获取设备信息


						let obj = {};
						obj.deviceImage = "/static/images/index/device/2-0.png";
						obj.deviceCode = deviceCach[i].deviceCode;
						obj.bindtap = 'toOpenWatermeter';
						obj.roomName = deviceCach[i].deviceName;
						obj.showRoomName = "位置：" + deviceCach[i].deviceName + '[楼层#房间号]';
						obj.statusImage = app.globalData.ImageUrl.open;
						obj.showName = "设备类型：热水表";
						obj.deviceId = deviceCach[i].deviceId;
						obj.deviceType = 18; // 用来区分公共区域的热水表
						// obj.showOnline = "设备状态：在线";
						// 将设备的数据存入到常用设备数组

						listArr[t++] = obj;
					}
				}

				let x = 0;
				let showArr = [];

				for (let i = 0; i < listArr.length; i++) {
					if (listArr[i] && !(listArr[i].deviceCode == undefined || listArr[i].deviceCode == null || listArr[i].deviceCode ==
							'')) {
						showArr[x++] = listArr[i];
					}
				} // 


				return showArr;
			},
			// 将苹果手机与安卓手机存储数据，分别对应显示
			handleIOSOrAndrondData: function() {
				let isIos = 0;
				wx.getSystemInfo({
					success: function(res) {
						

						if (res.platform == "devtools") {
							console.log("PC");
						} else if (res.platform == "ios") {
							isIos = 1;
						} else if (res.platform == "android") {
							isIos = 0;
						}
					}
				});
				return isIos;
			},
			dealByDeviceTypeId: function(array) {
				let showName = "";

				switch (array.deviceType) {
					case 6:
					case 1:
						if (array.deviceCacheToApp.attributes.electricityNormal == 0) {
							showName = "电量状态: 低电量";
						} else if (array.deviceCacheToApp.attributes.electricityNormal == 1) {
							showName = "电量状态: 正常";
						} else {
							showName = "电量状态: 未知";
						}

						break;

					case 2:
						if (array.deviceCacheToApp.attributes.isNormallyOpenMode == 0) {
							showName = "模式: 常开";
						} else if (array.deviceCacheToApp.attributes.isNormallyOpenMode == 1) {
							showName = "模式: 后付费";
						} else if (array.deviceCacheToApp.attributes.isNormallyOpenMode == 2) {
							showName = "模式: 预付费";
						} else {
							showName = "使用模式: 未知";
						}

						break;

					case 8:
						showName = "使用模式: 预付费";
						break;

					default:
						showName = "未知";
						break;
				}

				return showName;
			},
			//热水表操作
			toOpenWatermeter: function(e) {
				// this.getBalance();
				console.log("this.data.consumeValue.balance - ", this.consumeValue.balance);
				console.log("e - ", e);
				let deviceId = e.currentTarget.dataset.deviceid;
				let deviceType = e.currentTarget.dataset.devicetype;
				let roomName = e.currentTarget.dataset.roomname;
				this.initializeBluetooth(deviceId, roomName, deviceType);
			},
			//冷水表操作
			oprdevice: function(e) {
				var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
				var mode = e.currentTarget.dataset.mode;

				if (mode == 0 || mode == 1) {
					app.globalData.ShowMsgUtil.showErrorModal('操作失败', '当前模式无法操作');
					return;
				}

				var online = e.currentTarget.dataset.online;
				console.log(online);

				if (!online) {
					app.globalData.ShowMsgUtil.showErrorModal('操作失败', '设备已离线');
					return;
				}

				var isopen = e.currentTarget.dataset.isopen;
				var falg = 0;

				if (isopen == 1) {
					falg = 0;
				}

				if (isopen == 0) {
					falg = 1;
				}

				app.globalData.ShowMsgUtil.showLoadAndMsgToast('操作中！', 20000);
				var devicecode = e.currentTarget.dataset.devicecode;
				var devicetype = e.currentTarget.dataset.devicetype;
				wx.request({
					url: app.globalData.RequestUrl.appoprRequestUrl.operateWater,
					method: 'POST',
					header: {
						'token': _this.userInfoCach.token,
						'content-type': 'application/json' // 默认值

					},
					data: {
						"deviceType": devicetype,
						"deviceCode": devicecode,
						"status": falg,
						"operateType": 1
					},
					success: function(res) {
						if (res.data && res.data.code === 200) {
							app.globalData.ShowMsgUtil.showSuccessToast("操作成功", 2000);
							wx.hideNavigationBarLoading();
							wx.stopPullDownRefresh();
						} else {
							if (res.data.code === 6000) {
								app.globalData.ShowMsgUtil.showErrorModal('提醒', "请再试下!");
							} else {
								app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
							}
						}

						_this.getCardData(_this.userInfoCach);
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					},
					complete: function() {
						wx.hideToast({});
						wx.hideNavigationBarLoading();
						wx.stopPullDownRefresh();
					}
				});
			},
			// 门锁操作
			oprlockV2: function(e) {
				var _this = this;

				var online = e.currentTarget.dataset.online;

				if (!online) {
					app.globalData.ShowMsgUtil.showErrorModal('操作失败', '设备已离线');
					return;
				}

				var isopen = e.currentTarget.dataset.isopen;

				if (isopen == 1) {
					app.globalData.ShowMsgUtil.showLoadAndMsgToast('门已开无需操作！', 1000);
					return;
				}

				app.globalData.ShowMsgUtil.showLoadAndMsgToast('请按键开门！', 1000); //433门锁无需蓝牙信标

				var devicecode = e.currentTarget.dataset.devicecode;
				var devicetype = e.currentTarget.dataset.devicetype; // 测试 - 直接开锁

				_this.requestOpenClock(devicecode, devicetype, 1);
			},
			// 开启门锁是否需要开启蓝牙判断
			getStatusLock: function(devicecode, devicetype, falg) {
				var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
				wx.request({
					url: app.globalData.RequestUrl.baseRequestUrl.getOperateLockSetting,
					method: 'GET',
					header: {
						'token': this.userInfoCach.token
					},
					success: function(res) {
						console.log('门锁是否启用蓝牙信标返回', res.data);

						if (res.data && res.data.code == 200) {
							if (res.data.rows.isSet == 0) {
								// 直接开锁
								_this.requestOpenClock(devicecode, devicetype, falg);
							} else if (res.data.rows.isSet == 1) {
								// 1. 判断手机是否开启蓝牙
								_this.checkBooth(devicecode, devicetype, falg);
							}
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
			// 门锁开启请求
			requestOpenClock: function(devicecode, devicetype, falg) {
				var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				wx.request({
					url: app.globalData.RequestUrl.appoprRequestUrl.operateLock,
					method: 'POST',
					header: {
						'token': userInfoCach.token,
						'content-type': 'application/json' // 默认值

					},
					data: {
						"deviceType": devicetype,
						"deviceCode": devicecode,
						"operateType": falg
					},
					success: function(res) {
						console.log('操作门锁返回', res.data);

						if (res.data && res.data.code === 200) {
							// if (falg == 0){
							//   app.ShowMsgUtil.showSuccessToast("关门操作成功！", 2000);
							// } else if (falg == 1){
							//   app.ShowMsgUtil.showSuccessToast("开门操作成功！", 2000);
							// }
							_this.getCardData(_this.userInfoCach);
						} else {
							// app.ShowMsgUtil.showLoadAndMsgToast('状态或已发生变化', 2000);
							_this.getCardData(_this.userInfoCach);

							log.warn('请求失败!', res.data.msg);
						}
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToastByFail();
					}
				});
			},
			// 3. 要求指定门锁开启蓝牙信标 - 扫描蓝牙
			requestOpenBooth: function(deviceCode) {
				var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				wx.request({
					url: app.globalData.RequestUrl.appoprRequestUrl.lockBluetoothOpen,
					data: {
						deviceCode: deviceCode
					},
					method: 'POST',
					header: {
						'token': userInfoCach.token,
						'content-type': 'application/json' //默认值

					},
					success: function(res) {
						console.log('请求开启门锁beacon返回', res.data);

						if (res.data && res.data.code == 200) {
							// 扫描蓝牙信标
							let uuid = res.data.rows.blueToothId;
							uuid = _this.dealStr(uuid);

							if (uuid != null) {
								_this.searchBooth(uuid);
							}
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
			 * 4. 搜素蓝牙信标
			 */
			searchBooth: function(uuid) {
				var _this = this;

				let uuids = [];
				uuids[0] = uuid;
				console.log('蓝牙信标扫描uuid', uuids); // 开始扫描

				wx.hideToast();
				app.globalData.ShowMsgUtil.showLoadAndMsgToast('扫描设备中！', 30000); // console.log(_this.data.lockRequestObj.devicecode);

				var flag = false;
				wx.startBeaconDiscovery({
					uuids: uuids,
					success: function() {
						wx.hideToast(); // console.log("开始扫描设备...");
						// 监听iBeacon信号

						wx.onBeaconUpdate(function(res) {
							// console.log(res.beacons);
							// 请注意，官方文档此处又有BUG，是res.beacons，不是beacons。
							if (res && res.beacons && res.beacons.length > 0) {
								// 停止蓝牙扫描
								wx.stopBeaconDiscovery({
									success: function() {}
								}); // 开锁

								_this.requestOpenClock(_this.lockRequestObj.devicecode, _this.lockRequestObj.devicetype, _this.lockRequestObj
									.falg);
							} else {}
						});
					},
					fail: function() {
						wx.hideToast();
						app.globalData.ShowMsgUtil.showErrorModal('操作失败', '未扫到门锁蓝牙信标');
					}
				});
			},
			dealStr: function(str) {
				let strArray = [];

				if (str != null && str != '' && str.length == 32) {
					strArray[0] = str.substring(0, 8);
					strArray[1] = str.substring(8, 12);
					strArray[2] = str.substring(12, 16);
					strArray[3] = str.substring(16, 20);
					strArray[4] = str.substring(20, str.length);
					return strArray.join('-');
				}

				return null;
			},

			/**
			 * 2. 检查手机是否打开蓝牙
			 */

			/**
			 * 搜素蓝牙设备
			 */
			checkBooth: function(devicecode, devicetype, falg) {
				var _this = this; // 停止蓝牙扫描


				wx.stopBeaconDiscovery({
					success: function() {}
				});
				wx.closeBluetoothAdapter({
					complete: function(res) {
						// 打开蓝牙适配器
						wx.openBluetoothAdapter({
							success: function(res) {
								// 获取本机蓝牙适配器的状态：判断蓝牙是否
								wx.getBluetoothAdapterState({
									success: function(res) {
										console.log('已打开蓝牙'); //2. 已打开蓝牙
										// 要求指定门锁开启蓝牙信标

										_this.requestOpenBooth(devicecode);

										let lockRequestObj = {};
										lockRequestObj.devicecode = devicecode;
										lockRequestObj.devicetype = devicetype;
										lockRequestObj.falg = falg;

										_this.setData({
											lockRequestObj: lockRequestObj
										});
									}
								});
							},
							// 在打开蓝牙适配器中：提示手机蓝牙未打开
							fail: function(res) {
								wx.showModal({
									title: '提示',
									content: '请检查手机蓝牙是否打开',
									showCancel: false,
									confirmColor: '#20a4f7',
									success: function(res) {
										console.log('没有打开蓝牙');
									}
								});
							}
						});
					}
				});
			},

			/**
			 * 一、初始化蓝牙
			 */
			initializeBluetooth: function(deviceCode, roomName, deviceType) {
				let _this = this; //关闭蓝牙模块


				wx.closeBluetoothAdapter({
					complete: function(res) {
						console.log("关闭蓝牙模块 - ", res); //判断蓝牙是否打开

						wx.openBluetoothAdapter({
							success: function(res) {
								console.log("初始化蓝牙设备 - ", res);

								_this.handleWaterOperate(deviceCode, roomName, deviceType);
							},
							fail: function(res) {
								app.globalData.ShowMsgUtil.showErrorModal('蓝牙连接失败', "请检查手机蓝牙是否打开"); // console.log("初始化蓝牙设备 - ", res);

								console.warn("请检查手机蓝牙是否打开");
							}
						});
					},
					fail: function(res) {
						app.globalData.ShowMsgUtil.showErrorModal('蓝牙连接失败', "请检查手机蓝牙是否打开"); // console.log("关闭蓝牙模块 - ", res);

						console.warn("请检查手机蓝牙是否打开");
					}
				});
			},
			handleWaterOperate: function(deviceCode, roomName, deviceType) {
				let _this = this;

				wx.getSystemInfo({
					success: function(res) {
						console.log("获取当前用户的设备类型 - ", res.platform);

						if (res.platform == "devtools") {
							PC;
						} else if (res.platform == "ios") {
							console.log("isIOS - deviceCode - ", deviceType);

							if (deviceType && deviceType === 18) {
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.commonWatermeterUrl +
									'?deviceId=' + deviceCode + '&roomName=' + roomName + '&isIOS=1' + '&isPublic=1', 500);
							} else {
								app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.commonWatermeterUrl +
									'?roomName=' + roomName + '&isIOS=1' + '&isPublic=0', 500);
							}
						} else if (res.platform == "android") {
							app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.appointmentPageUrl.commonWatermeterUrl +
								'?deviceId=' + deviceCode + '&roomName=' + roomName + '&isIOS=0' + '&isPublic=' + (deviceType === 18 ? 1 :
									0), 500);
						}
					}
				});
			},
			//灯控操作
			oprlamp: function(e) {
				var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
				var online = e.currentTarget.dataset.online;

				if (online == 0) {
					app.globalData.ShowMsgUtil.showErrorModal('操作失败', '设备已离线');
					return;
				}

				var isopen = e.currentTarget.dataset.isopen;
				var falg = 0;

				if (isopen == 1) {
					falg = 0;
				}

				if (isopen == 0) {
					falg = 1;
				}

				var devicecode = e.currentTarget.dataset.devicecode;
				wx.request({
					url: app.globalData.RequestUrl.appoprRequestUrl.operateLamp,
					method: 'POST',
					header: {
						'token': _this.userInfoCach.token,
						'content-type': 'application/json' // 默认值

					},
					data: {
						"deviceType": 5,
						"deviceCode": devicecode,
						"status": falg,
						"operateType": 1
					},
					success: function(res) {
						console.log('灯控操作返回', res.data);

						if (res.data && res.data.code === 200) {
							_this.getCardData(_this.userInfoCach);
						} else {
							app.globalData.ShowMsgUtil.showLoadAndMsgToast('状态或已发生变化', 2000);

							_this.getCardData(_this.userInfoCach);
						}
					},
					complete: function() {
						wx.vibrateShort();
						wx.hideNavigationBarLoading();
						wx.stopPullDownRefresh();
					}
				});
			},

			/************************************************************** WX - 消息订阅 *******************************************************************/

			/**
			 * 保存用户的openId
			 * 用户消息推送等业务
			 */
			saveOpenid: function(wxOpenid) {
				var _this = this;

				const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
				wx.request({
					url: app.globalData.RequestUrl.baseRequestUrl.saveOpenid,
					data: {
						wxOpenid: wxOpenid
					},
					method: 'POST',
					header: {
						'token': userInfoCach.token,
						'content-type': 'application/json' //默认值

					},
					success: function(res) {
						if (res.data && res.data.code === 200) { // app.ShowMsgUtil.showSuccessToast("拒绝成功", 2000);
							// 判断是否满足前提条件 
						} else { // app.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
						}
					},
					fail: function() {
						app.globalData.ShowMsgUtil.showNoneToastByFail();
						// setTimeout(function() {
						// 	wx.redirectTo({
						// 		url: app.globalData.PageUrl.authPageUrl.loginUrl
						// 	});
						// }, 2000);
					}
				});
			},



			//点击确认
			bindConfirm: function() {
				let _this = this;

				wx.requestSubscribeMessage({
					tmplIds: app.globalData.Constant.pushMsgConstant.commonlyTemplates,

					// tmplIds: app.Constant.pushMsgConstant.PayTemplates,
					success(res) {
						console.log('已授权接收订阅消息', res);
					},

					fail(res) {
						console.log('授权失败', res);
					},

					complete() {
						_this.msgObj.showModel = false;

						_this.setData({
							msgObj: _this.msgObj
						});
					}

				});
			},
			//点击取消
			bindCancel: function() {
				let _this = this;

				_this.msgObj.showModel = false;

				_this.setData({
					msgObj: _this.msgObj
				});
			},

			/************************************************************** WX - 人脸识别 *******************************************************************/
			// 前往用户详情
			gotoUserInfo() {
				app.globalData.PublicUtil.navigateByUrl(app.globalData.PageUrl.minePageUrl.userDetail, 500);
				let showToast = false;
				this.setData({
					showToast
				});
			},

			cancelToast() {
				let showToast = false;
				this.setData({
					showToast
				});
			}

		}
	};
</script>
<style>
	@import "./index.css";
</style>
