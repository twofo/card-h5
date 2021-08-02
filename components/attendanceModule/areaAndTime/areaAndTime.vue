<template>
<view class="areaAndTimeBox">
	
	<scroll-view scroll-y :style="'height: ' + sHeight + 'px'">
		<view class="areaAndTimeBox-scroll" v-if="roomList.length>0">
			<view class="timeList" :style="'min-height: ' + sHeight + 'px'">
				<view class="placeH"></view>
				<view v-for="(item, index) in timeList" :key="index" class="timeItem">
					{{item.time}}
				</view>
			</view>
			<view class="areaList" :style="'width: ' + Swidth + 'px;'">
				<view v-for="(item, idx) in roomList" :key="idx" class="areaItemBox">
					<view class="roomName">
						<view class="fontBlod">{{item.roomName}} </view>
						<view>{{item.number}}<text class="roomSize">({{item.size}})</text></view>
					</view>
					
					<view class="roomSelectList">
						<view v-for="(child, index) in item.isSelected" :key="index" :class="'isSelectTxt  ' + (child.isCheck== 1? 'no' : child.isCheck == 3  ? 'seled':'yes' ) + ' '" @tap="selectTime" :data-pind="idx" :id="index" :data-times="child.time">{{child.isFull}}</view>
						
					</view>
				</view>
			</view>
		</view>
		
		<view class="nomore" v-if="roomList.length == 0">暂无数据</view>
	</scroll-view>
	<view class="seletedBox" :style="'height: ' + (tapArr.length >0? '268':'90') + 'rpx;'" v-if="roomList.length>0">
		<view class="selectedList" v-if="tapArr.length>0">
			<view class="selectedItemTitle">已选会议室</view>
			<!-- <scroll-view scroll-x> -->
				<view class="selectedItems">
					<view v-for="(item, index) in tapArr" :key="index" class="selectedItemsList">
						<view class="selectedItemsHead">{{item.time}}</view>
						<view>
							<view>{{roomInfo.roomname}}</view>
							<view>{{roomInfo.num}}<text class="roomSize">({{roomInfo.size}})</text></view>
						</view>
					</view>
				</view>
			<!-- </scroll-view> -->
		</view>
		<view class="selectBtn">
			<view class="selectedTimes">
				<text>预定时间段: </text>
				<text class="selectCount">{{tapArr.length}}</text>
			</view>
			
			<view>
				<button type="primary" class="btn" :disabled="tapArr.length >0 ? disabled : true" @tap="submitData">确 定</button>
			</view>
		</view>
	</view>
</view>
</template>

<script>
let app = getApp();

export default {
  data() {
    return {
      Swidth: 250,
      //手机水平宽度
      sHeight: 510,
      tapInde: -1,
      //当前点击时间段
      tapArr: [],
      //当前已经选择时间段
      floorInd: -1,
      //当前选择楼栋
      roomInfo: {},
      disabled: false
    };
  },

  components: {},
  props: {
    timeList: {
      type: Array,
      default: () => []
    },
    roomList: {
      type: Array,
      default: () => []
    },
    aheadTime: {
      type: Number,
      default: 20
    }
  },
  watch: {
    "timeList": function (val) {
      // console.log("监听")
      // console.log(val)/
      let sHeight = app.globalData.SystemInfo.screenHeight - app.globalData.SystemInfo.statusBarHeight - 180;
      this.setData({
        tapArr: [],
        sHeight
      });
    }
  },

  mounted() {
    // console.log(app.SystemInfo)
    let Swidth = app.globalData.SystemInfo.screenWidth - 80;
    let sHeight = app.globalData.SystemInfo.screenHeight - app.globalData.SystemInfo.statusBarHeight - 190;
    console.log(sHeight);
    this.setData({
      Swidth,
      sHeight
    });
  },

  methods: {
    selectTime(e) {
      // console.log(e)
      let tapInde = e.currentTarget.id;
      let pInd = e.currentTarget.dataset.pind; // 选择的房间是否相同

      if (this.floorInd == -1) {
        this.setData({
          floorInd: pInd
        });
      } else {
        if (pInd != this.floorInd) {
          app.globalData.ShowMsgUtil.showNoneToast("请选择同地点时间段", 2000);
          return;
        }
      } // this.tapSelectRef()
      // 已经选择


      if (this.roomList[pInd].isSelected[tapInde].isCheck == 2) {
        if (this.tapArr.length > 0) {
          let con = this.continueSelect(this.tapArr, tapInde);
          console.log("已选择的时间段");
          console.log(this.tapArr);

          if (con) {
            this.roomList[pInd].isSelected[tapInde].isCheck = 3;
            this.roomList[pInd].isSelected[tapInde].isFull = "已预选";
            this.tapArr.push(this.roomList[pInd].isSelected[tapInde]);
            this.setData({
              disabled: false
            });
          }
        } else {
          this.roomList[pInd].isSelected[tapInde].isCheck = 3;
          this.roomList[pInd].isSelected[tapInde].isFull = "已预选";
          this.tapArr.push(this.roomList[pInd].isSelected[tapInde]);
        }

        this.roomInfo.roomname = this.roomList[pInd].roomName;
        this.roomInfo.num = this.roomList[pInd].number;
        this.roomInfo.size = this.roomList[pInd].size;
        this.roomInfo.id = this.roomList[pInd].id;
        this.setData({
          roomList: this.roomList,
          tapArr: this.tapArr,
          roomInfo: this.roomInfo
        });

        if (this.tapArr.length > 0) {
          this.sHeight = app.globalData.SystemInfo.screenHeight - app.globalData.SystemInfo.statusBarHeight - 270;
        }

        this.setData({
          sHeight: this.sHeight
        });
        return;
      } // 取消选择


      if (this.roomList[pInd].isSelected[tapInde].isCheck == 3) {
        this.roomList[pInd].isSelected[tapInde].isCheck = 2;
        this.roomList[pInd].isSelected[tapInde].isFull = "可预选";
        let arr = this.removeData(this.tapArr, this.roomList[pInd].isSelected[tapInde]);
        this.setData({
          disabled: false
        });

        if (arr.length == 0) {
          this.floorInd = -1;
        } else {
          this.floorInd = pInd;
        }

        this.setData({
          roomList: this.roomList,
          tapArr: arr,
          floorInd: this.floorInd
        });

        if (this.tapArr.length <= 0) {
          this.sHeight = app.globalData.SystemInfo.screenHeight - app.globalData.SystemInfo.statusBarHeight - 180;
        }

        this.setData({
          sHeight: this.sHeight
        });
        return;
      } // 判断当前时间是否可选,每点击一次刷新一次数据,

    },

    // 检查当前可选时间段是否大于20分钟,不大于二十分钟则自动从已选列表中删除,并设置为不可选,每次点击更新一次
    // tapSelectRef() {
    //   console.log(this.data.aheadTime)
    //   let d = this.data.roomList
    //   let currentDate = (new Date()).getTime() + 1000 * 60 * this.data.aheadTime  //当前时间的后二十分钟之后 才可以开始预约
    //   this.roomAndTime(d, currentDate)
    // },
    // roomAndTime(data,t){
    //   for (let j of data) {
    //     j.isSelected.forEach((key, ind) => {
    //       if (t > key.startTime) {
    //         j.isSelected[ind].isCheck = 1,
    //           j.isSelected[ind].isFull = "不可预选"
    //       } 
    //     })
    //   }
    //   this.checkTapArr()
    // },
    // 检查已选中是否存在过期时间段
    // checkTapArr(){
    //   console.log(this.data.tapArr)
    //   let d = this.data.tapArr
    //   if(d.length >0){
    //     d.forEach((val,ind)=>{
    //       if (val.isCheck == 1){
    //         this.removeData(d,val)
    //       }
    //     })
    //   }
    // },
    // 删除缓存中已选择中存在的某一项
    removeData(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          return arr;
        }
      }
    },

    // 判断选择的两个时间段是不是连续
    continueSelect(arr, ind) {
      if (arr.length > 0) {
        let a = [];

        for (let i = 0; i < arr.length; i++) {
          a.push(arr[i].id);
        }

        let max = Math.max(...a);
        let min = Math.min(...a);

        if (ind < min - 1 || ind > max + 1) {
          app.globalData.ShowMsgUtil.showNoneToast("请选择相邻时间段", 2000);
          return false;
        }

        return true;
      }

      return true;
    },

    isContinuityNum(num) {
      //判断选中的时间段是否连续
      let array = [];

      if (num instanceof Array) {
        array = [...num];
      } else {
        array = Array.from(num.toString()); //转换为数组
      }

      array.sort(function (a, b) {
        return a - b;
      });
      var i = array[0];
      var isContinuation = true;

      for (var e in array) {
        if (array[e] != i) {
          isContinuation = false;
          app.globalData.ShowMsgUtil.showNoneToast("请选择相邻时间段", 2000);
          break;
        }

        i++;
      }

      return isContinuation;
    },

    submitData() {
      let arr = this.tapArr;
      let arrLen = arr.length;
      let num = [];

      for (let i = 0; i < arrLen; i++) {
        num[i] = arr[i].id;
      }

      let res = this.isContinuityNum(num); // console.log(res)

      if (!res) return;
      this.setData({
        disabled: true
      });
      let roomInfo = this.roomInfo; // console.log(roomInfo)

      console.log(arr);
      let startT = '',
          endT = '',
          startArr = [],
          endArr = [];
      arr.forEach((val, ind) => {
        startArr.push(val.startTime);
        endArr.push(val.endTime);
      });
      startT = app.globalData.PublicUtil.formatTimeTwo(Math.min(...startArr), 'h:m');
      endT = app.globalData.PublicUtil.formatTimeTwo(Math.max(...endArr), 'h:m');
      console.log(startT);
      console.log(endT);
      let obj = {
        meetingRoomNumber: roomInfo.roomname + '-->' + roomInfo.num + '(' + roomInfo.size + ')',
        meetingRoomId: roomInfo.id,
        startTime: Math.min(...startArr),
        endTime: Math.max(...endArr),
        time: startT + "-" + endT
      };
      this.$emit('getTime', {
        detail: obj
      });
      console.log(obj);
    }

  }
};
</script>
<style>
@import "./areaAndTime.css";
</style>