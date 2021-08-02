<template>
<view class="page">
	<view :class="showItems ? 'allPage' : ''" @tap="tapPages">  
		<!--  -->
		<view>
			<view class="selectBox" @tap.stop="showPicker">
				<view class="selectTypeHead" :style="'justify-content:' + (selectBox.length%2==0 ? 'space-around':'space-between' )">
					<view v-for="(item, index) in selectBox" :key="index" class="roomType " :data-ind="index" @tap.stop="bindLevelChange">
						<text>{{item.roomType}}</text>
						<i class="down-arrow"></i>
					</view>
				</view>
			</view>
			<view class="selectItems" v-if="showItems">
				<view v-for="(item, index) in array" :key="index" class="items"  @tap.stop="selectItem(item)">{{item.name}}</view>
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
  methods: {
    bindLevelChange(e) {
      let index = e.currentTarget.dataset.ind;
      let showItems = true;
      let array = this.selectBox[index].array;
      console.log("-------------选择下拉框--------------------");
      console.log(index);
      console.log(array);
      this.setData({
        showItems: showItems,
        array,
        levelInd: index,
        roomType: ''
      });
			// this.$emit("showPick", {
			//   showPick: true
			// });
    },

    selectItem(e) {
      console.log(e )
      let val = e;
      this.selectBox[this.levelInd].roomType = val.name;
      let selectBox = this.selectBox;
      let data = {
        type: this.levelInd,
        val: val, //val是对象
				showPick: false
      };
      this.$emit("bindValue", {
        detail: data
      });
      this.setData({
        roomType: val,
        showItems: false,
        selectBox
      });
    },

    tapPages() {
      // console.log("组件最外层点击")
      this.setData({
        showItems: false
      });
	  console.log('4123');
			uni.$emit("covering", {
				value:1
			});
			
    },

    showPicker() {
      // console.log("点击出现下拉框")
      this.setData({
        showItems: true
      });
			
    }
	}
  
}
</script>
<style>
@import "./wxPicker.css";
</style>