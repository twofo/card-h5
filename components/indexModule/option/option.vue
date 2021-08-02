<template>
<!--components/indexModule/option/option.wxml-->

<view class="main-swpier">
    
  <view class="admin-item-hd ">
    <text class="card-item1-name">{{title}}</text>
  </view>
  <view v-for="(core, index) in cores" :key="index" class="admin-core">
    <block v-for="(item, index2) in core" :key="index2" class="main-core">
      <navigator class="main-core-item" :url="item.url" @tap="bindConfirm(item)">
        <image class="core-item-icon" :src="item.image"></image>
        <text class="core-item-name">{{item.name}}</text>
      </navigator>
    </block>
  </view>
  
</view>
</template>

<script>
var app = getApp({
		
	});
export default {
  data() {
    return {
		seleoptions:'',
	};
  },

  components: {},
  props: {
    cores: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: { 
    bindConfirm(e) {
			console.log(e)
			if(e.name == '学杂缴费'){
				location.href = e.url
			}
			if(this.seleoptions){
				let code=decodeURI((this.seleoptions));
				let a=code.replace('/','').replace('#','');
				console.log(a);
				wx.showModal({
					title: '当前账户属于游客',
					content:a,
					showCancel: false,
					confirmColor: '#20a4f7',
				});
			}
		}
  },
  mounted() {
  	uni.$on("floorIn", (options) => {
		    console.log(options);
		   this.seleoptions=options.value;
		     let a=this.seleoptions.replace('/','').replace('#','')
		   console.log(this.seleoptions);
  	})
  }
};
</script>
<style>
@import "./option.css";
</style>