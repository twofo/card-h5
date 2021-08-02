<template>
	<view class="page">
		<view :class="showItems ? 'allPage' : ''" @tap="tapPages">
			<!--  -->
			<view>
				<view class="selectBox" @tap.stop="showPicker">
					<view class="selectTypeHead"
						:style="'justify-content:' + (selectBox.length%2==0 ? 'space-around':'space-between' )">
						<view v-for="(item, index) in selectBox" :key="index" class="roomType " :data-ind="index"
							@tap.stop="bindLevelChange">
							<text>{{item.roomType}}</text>
							<i class="down-arrow"></i>
						</view>
					</view>
				</view>
				<view class="pinocenter" v-if="pinocenter &&showItems">
					<view :class="[selea?'selectItems':'select']" v-if="showItems">
						<scroll-view :style="'height: ' + height + 'px;'" scroll-y="ture" upper-threshold="5"
							lower-threshold="50" scroll-top="1"
							:class="[seleascroll?'uni-scroll-view':' uni-scroll-v']">
							<!-- :class="[seleascroll?'uni-scroll-view':' uni-scroll-v']" -->
							<!-- <view v-for="(item, index) in array" :key="index" class="'idx==index?'_left':'items'' )"  @tap.stop="selectItem(item)" :data-ind="index" @tap="bindfloor" >{{item.name}}</view> -->
							<view v-for="(item, index) in array" :key="index"
								:class="[idx==index?'items-floor':'items']" @tap.stop="selectItem(item)"
								:data-ind="index" @tap="bindfloor">{{item.name}}
								<span v-if="sela"> > </span>
							</view>
						</scroll-view>
					</view>
					<view class="piano-border">
					</view>
					<view class="floor" v-if='floor'>
						<scroll-view :style="'height: ' + height + 'px;'" scroll-y="ture" upper-threshold="5"
							lower-threshold="50" scroll-top="1" class="uni-scroll">
							<p v-for="(item,index) in floorarray" :key="index" :class="[idxa==index?'pinofloor':'pino']"
								@tap.stop="pinofloor" :data-ind="index" :data-in="item.floorId">{{item.floorName}}</p>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				levelInd: 0,
				showItems: false,
				array: [],
				floor: false,
				orderpino: '',
				typenum: false,
				typetime: false,
				pinocenter: true,
				pinodiffer: '',
				floorInfo: [],
				floorarray: [],
				indexind: '',
				selea: true,
				seleascroll: true,
				pinodata: {},
				sela: true,
				pinoselect: false,
				floorselect: false,
				firstone: false,
				outclick: false,
				floorupdate: false,
				selectlayer: false,
				a: false,
				height: {
					type: Number,
					default: 1
				},
				floorid: '',
				floorindex: '',
				b: false,
				c: false,
				d: '',
			};
		},
		components: {},
		props: {
			roomType: {
				type: String,
				default: "会议室类型"
			},
			selectBox: {
				type: Array,
				default: () => []
			}
		},
		onLoad: function() {
			var _this = this;
		},
		beforeDestroy() {
			wx.removeStorage({
				key: 'key3',
			})
		},
		methods: {
			bindLevelChange(e) {
				//获取下标
				let index = e.currentTarget.dataset.ind;
				let s;
				let scro;
				setTimeout(function() {
					this.pinocenter = true
				}, 10);
				//给下边全局赋值
				this.indexind = index;
				//如果下标不为1的话光标选择就没有为-1否则不然光标就等于楼层选取的下标
				if (this.indexind !== 1) {
					s = false;
					this.sela = false;
					order = -1;
				} else {
					s = true;
					this.sela = true;
					order = this.orderpino;
					//获取缓存。如果有缓存就order就等于
					wx.getStorage({
						key: 'key3',
						success(res) {
							if (res) {
								order = res.data;
							}
						}
					})
				}
				//默认点击下拉框floorarray长度开始没有取第一个
				if (this.floorarray.length == 0) {
					this.floorarray = this.floorInfo[0].floorInfo;
				}
				//每次下拉的时候传数据到上一个页面
				this.$emit("bindValue", {
					detail: this.pinodata,
				});
				let a;
				let d;
				//如果下标为1样式就显示否则就隐藏
				if (index == 1) {
					a = true;
					d = true;
				} else {
					a = false;
					d = false;
				}
				let showItems = true;
				//array等于选取的每个下下标不同取得数据也不同。通过下标来判断.
				let array = this.selectBox[index].array;
				console.log(array,this.floorInfo);
				//如果有数据就显示出来
				if (array) {
					this.floor = true;
					this.pinocenter = true;
				}
				let order;
				let florder;
				let floorindex;
				//等于楼层选取的下标来显示楼层选取的不同光标
				floorindex = this.floorindex
				this.showItems = true;
				this.setData({
					showItems: showItems,
					array,
					levelInd: index,
					roomType: '',
					idx: order,
					idxa: floorindex,
					floor: s,
					selea: a,
				});
				//传值遮盖层显示与隐藏
				this.$emit("showPick", {
					showPick: false
				});
			},
			//选择楼栋通过楼栋的下标去更新楼层对应的下标的值
			bindfloor(e) {
				var _this = this;
				let s;
				this.b = true;
				//判断上面选择下标为楼栋为1则给其添加颜色否则则就不添加
				if (this.indexind == 1) {
					_this.orderpino = e.currentTarget.dataset.ind;
					s = _this.orderpino;
					//存楼栋选取下标的缓存
					wx.setStorage({
						key: "key3",
						data: _this.orderpino,
					})
					//楼层数据等于每个楼层选取的下标
					_this.floorarray = _this.floorInfo[_this.orderpino].floorInfo;
				} else {
					s = -1;
				}
				_this.setData({
					idx: s
				})
			},
			//选择楼栋
			selectItem(e) {
				this.floorselect = true;
				//如果为true的话选择楼栋的颜色就显示
				this.selea = true;
				this.selectlayer = true;
				//选择了楼栋的话楼层的下标就等于0;
				this.floorindex = 0;
				this.c = true;
				let a;
				let val = e;
				let d;
				let selectBox = this.selectBox;
				//如果选择的下标为1的话就显示
				if (this.indexind == 1) {
					this.selectlayer = true;
				} else {
					this.selectlayer = false;
					
				}
				let dd
				if (this.c) {
					dd = val.id
				} else {
					dd = this.d
				}
				//如果是a或者最外层点击的是楼栋selectlayer为true传1是楼栋传2的是楼层
				if (this.a || this.selectlayer) {
					d = 1;
				} else {
					d = 2;
				}
				let flooridd;
				//声明需要传到另一个页面的参数,更改数据
				this.pinodata = {
					timestamp: val.timestamp,
					type: this.levelInd,
					id: dd, //val是对象
					showPick: false,
					selectAreaLayer: d,
					val: val,
				}
				let show;
				let order;
				if (this.indexind == 1) {
					f = true;
				} else {
					f = false;
				}
				let f;
				if (this.indexind == 0 || this.indexind == 2) {
					this.selectBox[this.levelInd].roomType = val.name;
					if (this.indexind !== 1) {
						this.$emit("bindValue", {
							detail: this.pinodata,
						});
					}
					show = false;
				} else {
					show = true;
				}
				this.setData({
					roomType: val,
					showItems: show,
					selectBox,
					floor: f,
					pinocenter: true,
				});
			},
			//选择每个楼层传值
			pinofloor(e) {
				var _this = this;
				//选择楼层为false就显示传的是楼层就为2
				_this.selectlayer = false;
				//如果选择了楼层就传楼层的id否则就传楼栋的id
				_this.c = false;
				_this.a = false;
				_this.floorupdate = true;
				_this.floorselect = true;
				let id = e.currentTarget.dataset.ind; //每个楼层的下标
				let ind = e.currentTarget.dataset.in; //每个楼层的id
				// wx.setStorage({
				// 	key: "key3",
				// 	data: _this.orderpino,
				// })
				let order;
				//
				_this.floorid = ind;//楼层id
				_this.floorindex = id; //下标
				//传值参数获取数据
				_this.pinodata = {
					type: this.levelInd,
					selectAreaLayer: 2,
					id: _this.floorid,
					idx: _this.floorindex,
					showPick: false,
				}
				if (this.selea == false) {
					order = 0
				} else {
					order = _this.orderpino;
				}
				//选择楼栋为true
				if (this.floorselect == true) {
					if (order == '') {
						order = 0;
					}
					//楼栋的名字显示等于选取的楼栋的名字、
					_this.selectBox[this.levelInd].roomType = _this.floorInfo[order].floorInfo[_this.floorindex].floorName
				} else {
					//楼栋的名字显示等于选取的每个楼栋的下标里面的楼层的下标的名字、
					_this.selectBox[this.levelInd].roomType = this.floorarray[id].floorName

				}
				//传值到另外一个页面更改页面
				this.$emit("bindValue", {
					detail: _this.pinodata
				});
				_this.setData({
					idxa: id,
					showItems: false,
				})
			},
			//组件最外层点击
			tapPages() {
				this.b = false;
				//如果下标不等于0this.a等于true.参数就为2.否则等于1
				if(this.indexind!==0){
				   this.a = true;
				}
				this.setData({
					showItems: false
				});
				uni.$emit("covering", {
					value: 1
				});
				this.floor = false;

				this.$emit("bindValue", {
					detail: this.pinodata
				});
				this.outclick = true;
				if (this.orderpino !== '') {
					this.floorarray = this.floorInfo[this.orderpino].floorInfo;
					this.selectBox[this.levelInd].roomType = this.selectBox[this.levelInd].array[this.orderpino].name;
				}
				// if (this.c) {
				// 	this.d = this.selectBox[this.levelInd].array[this.orderpino].id
				// }
			},
			showPicker() {
				// console.log("点击出现下拉框")
				this.setData({
					showItems: true
				});
			},
		},
		//接收传回来的值。
		mounted() {
			uni.$on("floor", (options) => {
					if (options) {
						if (options) {
							this.pinocenter = false;
						}
					}
				}),
				uni.$on("martial", (options) => {
					if (options) {
						if (options) {}
					}
				}),
				uni.$on("floorInfo", (options) => {
					if (options) {
						let s = options.value;

						this.floorInfo = options.value;


					}
				}),
				uni.$on("firstpino", (options) => {
					if (options) {
						if (options) {
							this.a = true;
						}
					}
				})
		},
	}
</script>
<style>
	@import "./pinofloor.css";
</style>
