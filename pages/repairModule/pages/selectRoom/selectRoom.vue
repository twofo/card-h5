<template>
<view class="page">
  <view class="page__bd">

    <!-- 选择房间 -->
      <view class="content box-select">

        <view class="left">
          <!-- <view class='active'>1号楼</view> -->
          <block v-for="(item, index) in builds" :key="index">
            <view :id="index" :class="'left-item ' + (selectBuildIndex == index ? 'active' : '')" @tap="selectBuild">
              <view class="left-title">{{item.name}}</view>                      
            </view>
          </block>
        </view>
        
        <view class="right">
          <view class="right-box">

            <view class="search-box">
              <image :src="imageUrl.search" class="search-pic"></image>
              <input class="search-input" placeholder="请输入房间号" @input="searchRoom"></input>
            </view>
        
            <!-- 楼层与房间模块 -->
            <view class="floor">
              <!-- <scroll-view scroll-y scroll-with-animation  :scroll-into-view="toView" scroll-left="{{scrollLength}}" class='scrollY' style='height: {{winHeight}}px'> -->
            <scroll-view scroll-y style="height: 484px;"  :scroll-top="scrollTop">
              <!-- 如果没有进行搜索 -->
              <view v-if="roomList.length == 0 && inputVlue == ''">
                <!-- 循环楼层 -->
                <block v-for="(item, index) in rooms" :key="index">
                  <view class="floor-box">
                    <text class="floor-title">第 {{item.floorName}} </text>

                    <!-- 循环房间 -->
                    <view class="room-box">
                      <block v-for="(is, index2) in item.rooms" :key="index2">
                        <view class="room-item" @tap="clickRoomBox" :id="is.id" :data-roomCode="is.roomCode" :data-roomName="is.name">
                          <text>{{is.name}}</text>
                        </view>
                      </block>    
                    </view>
                    
                  </view>
                </block>

              </view>

              <!-- 若进行了搜素 -->
              <view v-if="roomList.length > 0">

                <!-- 循环楼层 -->
                <!-- <block wx:for="{{rooms}}" wx:key="this"> -->
                  <view class="floor-box">
                    <text class="floor-title">搜素结果</text>
                    <!-- 循环房间 -->
                    <view class="room-box">
                      <block v-for="(is, index) in roomList" :key="index">
                        <view class="room-item" @tap="clickRoomBox" :id="is.id" :data-roomCode="is.roomCode">
                          <text>{{is.name}}</text>
                        </view>
                        </block> 
                    </view>
                  </view>
                <!-- </block> -->

              </view>

              <view v-if="roomList.length == 0 && inputVlue">
                <view class="floor-box">
                    <text class="floor-title">未搜素到房间</text>
                </view>
              </view>

              </scroll-view>

            </view>

          </view>
        </view>

      </view>



  </view>
</view>
</template>

<script>
var app = getApp();
var imageUrl = app.globalData.ImageUrl;
import repairDetail from "../../../../components/repairModule/repairDetail/repairDetail";

export default {
  data() {
    return {
      imageUrl: imageUrl,
      builds: [],
      // 楼栋数组
      selectBuildIndex: 0,
      // 点击第几个楼栋
      floors: [],
      rooms: [],
      // 房间数组
      roomList: [],
      // 搜索出来的房间数组
      inputVlue: '' // 搜索输入
      ,
      roomObj: "",
			scrollTop:0
    };
  },

  components: {
    repairDetail
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBuilds();
  },
  methods: {
    // 获取楼栋信息
    getBuilds: function () {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getBuildList,
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('获取楼栋信息返回', res.data);

          if (res.data && res.data.code == 200) {
            _this.setData({
              'builds': res.data.rows
            });

            if (res.data.rows.length < 1) {
              app.globalData.ShowMsgUtil.showErrorModal('请求失败', '当前账号未分配楼栋管理权限！');
              return;
            }

            app.globalData.StorageUtil.set('buildsByAdminId', res.data.rows); // 获取该楼栋的所有房间即楼层

            _this.getRoomsByBuildId(res.data.rows[0].id);
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
    selectBuild: function (e) {
      var _this = this;

      const builds = app.globalData.StorageUtil.get('buildsByAdminId');
      this.setData({
        'selectBuildIndex': e.currentTarget.id
      }); // 根据楼栋id获取楼层与房间

      var selectBuildIndex = this.builds[e.currentTarget.id].id;

      if (_this.builds.length == 0) {
        app.globalData.ShowMsgUtil.showErrorModal('查询失败', "未负责楼栋");
      } else {
        this.getRoomsByBuildId(selectBuildIndex);
      }
    },
    getRoomsByBuildId: function (selectBuildIndex) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
      var floors = [];
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.getRoomByBuildId + selectBuildIndex + '/rooms',
        method: 'GET',
        header: {
          'token': userInfoCach.token
        },
        success: function (res) {
          console.log('根据楼栋获取房间返回', res.data);

          if (res.data && res.data.code == 200) {
            for (let i = 0; i < res.data.rows.length; ++i) {
              let floor = {};
              floor.id = res.data.rows[i].floorId;
              floor.name = res.data.rows[i].floorName; // 设置楼栋标志位

              floor.byFloor = 2;
              floors[i] = floor;
            } // 设置楼栋标志为1


            for (let i = 0; i < res.data.rows.length; ++i) {
              let room = {};
              room = res.data.rows[i];
              room.byRoom = 3;
              res.data.rows[i] = room;
            }

            _this.setData({
              'floors': floors,
              'rooms': res.data.rows
            });
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },
        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });
    },
    // 点击房间
    clickRoomBox: function (e) {
      console.log("点击房间 - ", e);
      var roomId = e.currentTarget.id;
      var roomCode = e.currentTarget.dataset.roomcode;
      var roomName = e.currentTarget.dataset.roomName; //获取当前页面js里面的pages里的所有信息。

     
      let roomObj = {};
      roomObj.id = roomId;
      roomObj.name = this.builds[this.selectBuildIndex].name + '-' + roomName;
      roomObj.code = roomCode;
     
		 uni.$emit('updatedData',{roomObj:roomObj})
      uni.navigateBack({
        delta: 1
      });
    }
  }
};
</script>
<style>
@import "./selectRoom.css";
</style>