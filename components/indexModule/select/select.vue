<template>
<view class="page">
    <view class="page__bd">
 
        <view class="weui-cells weui-cells_after-title">
          <view class="weui-cell" @tap="selectToggle">
              <view class="weui-cell__bd bd_width">{{nowText}}</view>
              <image src="/static/pages/indexModule/resources/pic/down.png" class="com-sImg weui-cell__ft" :animation="animationData"></image>
          </view>

          <view class="com-sList" v-if="selectShow">
            <view v-if="propArray.length > 7"> 
            <scroll-view scroll-y style="height: 217px;" :scroll-into-view="toView" :scroll-top="scrollTop">
              <view v-for="(item, index) in propArray" :key="index" :data-index="index" class="com-sItem" @tap="setText">{{item.name}}</view>
            </scroll-view>
            </view>
            <view v-else> 
              <view v-for="(item, index) in propArray" :key="index" :data-index="index" class="com-sItem" @tap="setText">{{item.name}}</view>
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
      selectShow: false,
      //初始option不显示
      nowText: "请选择",
      //初始内容
      animationData: {},
      //右边箭头的动画
      byBuild: '',
      byFloor: '',
      byRoom: ''
    };
  },

  components: {},
  props: {
    propArray: {
      type: Array
    }
  },
  methods: {
    //option的显示与否
    selectToggle: function () {
      var nowShow = this.selectShow; //获取当前option显示的状态
      //创建动画

      var animation = wx.createAnimation({
        timingFunction: "ease"
      });
      this.animation = animation;

      if (nowShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        });
      } else {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export()
        });
      }

      this.setData({
        selectShow: !nowShow
      });
    },
    //设置内容
    setText: function (e) {
      var nowData = this.properties.propArray; //当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties

      var nowIdx = e.target.dataset.index; //当前点击的索引

      var nowText = nowData[nowIdx].name; //当前点击的内容

      var nowBuild = nowData[nowIdx].byBuild; //当前点击的内容

      var nowFloor = nowData[nowIdx].byFloor; //当前点击的内容

      var nowRoom = nowData[nowIdx].byRoom; //当前点击的内容
      //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画

      this.animation.rotate(0).step();

      if (nowBuild == 1 || nowBuild == 2 || nowBuild == 3) {
        this.setData({
          nowText: ""
        });
      }

      this.setData({
        selectShow: false,
        nowText: nowText,
        animationData: this.animation.export()
      });
      var nowDate = {
        id: nowIdx,
        name: nowText
      };
      this.$emit('myget', {
        detail: nowDate
      });
    }
  }
};
</script>
<style>
@import "./select.css";
</style>