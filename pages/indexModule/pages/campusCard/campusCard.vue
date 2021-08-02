<template>
<view class="page">   
  <view class="page__bd">
    <view class="ykt-card">
        <view class="ykt-black-line">
          <image class="cz" :src="indexModuleUrl.wx"></image>
        <text class="cztext">校园卡</text>
        </view>
        <view class="ykt-content">
            <view class="ykt-ye">
                <text class="ykt-ye-name">余额</text>
                <view class="ykt-ye-money">
                    <text class="ykt-ye-value">******</text>
                    <text>元</text>
                </view>
            </view>
            <view class="ykt-img">
                <image :src="indexModuleUrl.cardBg"></image>
            </view>
        </view>
        <view class="ykt-card-more">
            <!-- <text class="ykt-ye-time">截至时间：{{last_time}}</text> -->
            <view v-if="cardNumber!=null"> 
              <text class="ykt-ye-id">卡号：{{cardNumber}}</text>
            </view>
            
        </view>
    </view>

  
    <view class="myui-list" :style="'height:' + (windowHeight*0.5-15) + 'px;width: ' + (windowWidth*0.96) + 'px;'">
      <view class="background-up-title">
        <view class="myui-cell">
          <view class="weui-cell__hd myui-cell__img"></view>
          <view class="weui-cell__bd" style="margin-left: 5px;">近10次消费情况：</view>
        </view>
      </view>
      <view v-if="myRecord.length>0">
        <fee-lists :alarmNewsList="myRecord" :height="windowHeight*0.55" @dealMsg="bindDealMsg"></fee-lists>
      </view>
      <view v-else style="margin-top:30%;">
          <view class="weui-loadmore weui-loadmore_line">
              <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无消费记录</view>
          </view>
          <view class="weui-loadmore weui-loadmore_line weui-loadmore_dot">
              <view class="weui-loadmore__tips weui-loadmore__tips_in-line weui-loadmore__tips_in-dot"></view>
          </view>
      </view>

    </view>
    
  </view>
</view>
</template>

<script>
//获取应用实例
var app = getApp();
var indexModuleUrl = require("../../resources/utils/imageUrl.js");
import feeLists from "../../resources/components/feeList/feeList";

export default {
  data() {
    return {
      indexModuleUrl: indexModuleUrl,
      userInfoCach: {},
      cardNumber: '',
      windowHeight: 667,
      windowWidth: 375,
      remind: '加载中',
      reminds: true,
      canvas_remind: '加载中',
      fontSize: 12,
      // 字体大小, 24rpx=12px
      count: 10,
      // 展示的消费次数
      width: 0,
      // 画布宽
      height: 300,
      // 画布高, wxss给定canvas高300px
      dict: [],
      // 所有消费数据
      points: [],
      // 点的集合（包括点的横坐标x、纵坐标y、当前点的详情detail）
      costArr: [],
      // 消费金额集合
      balanceArr: [],
      // 余额金额集合
      tapDetail: {},
      // 每个点对应的详情集合
      lineLeft: 0,
      // 详情垂直线的初始左边距
      gridMarginLeft: 35,
      // 表格左边距
      gridMarginTop: 20,
      // 表格上边距
      switchBtn: true,
      // true:余额 or false:交易额
      options: {},
      myRecord: {},
      currentIndex: 0 // 当前点的索引，切换视图的时候保持当前详情
      ,
      switchArr: ""
    };
  },

  components: {
    feeLists
  },
  props: {},
  onLoad: function () {
    var _this = this;

    console.log('------------------------校园卡------------------------');
    wx.getSystemInfo({
      success: function (res) {
        // 获取窗口宽, 计算画布宽
        _this.setData({
          'width': res.windowWidth
        });
      }
    });
    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight,
      windowWidth: wx.getSystemInfoSync().windowWidth,
      userInfoCach: userInfoCach
    });
    this.sendRequest();
  },
  onShow: function () {
    var _this = this; // 用户详情缓存是否存在
    // 提高用户体验。获取数据时，先弹窗加载。加载成功后则取消

  },
  methods: {
    /**
     * 获取用户信息
     */
    sendRequest: function () {
      var _this = this;

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
          console.log('用户详情返回', res.data);

          if (res.data && res.data.code == 200) {
            // 将null值转化为暂无
            let userDetail = app.globalData.PublicUtil.isNullDeal(userInfoCach, res.data.rows); // _this.setData({
            //   userDetailCach: userDetail,
            // });

            _this.setData({
              cardNumber: res.data.rows.cardNumber,
              reminds: false
            });

            app.globalData.StorageUtil.set('userDetailCach', res.data.rows);
          }
        },

        fail: function () {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }
      });

      function yktRender(info) {
        var data = info.slice(0, _this.count).reverse();
        /*
         * 获取最近消费数据绘制折线图
         **/

        var dict = data;
        var len = dict.length,
            xArr = [],
            // x轴坐标
        yArr = [],
            // 余额点在画布中的纵坐标
        balanceArr = [],
            // 余额金额集合
        costArr = [],
            // 消费金额集合
        canvasWidth = _this.width,
            spaceX = (canvasWidth - 2 * _this.gridMarginLeft) / (_this.count - 1),
            // 表示横坐标的间隔距离
        canvasHeight = _this.height,
            gridMarginTop = _this.gridMarginTop,
            // 折线图上距离
        gridMarginLeft = _this.gridMarginLeft,
            // 折线图左距离
        gridNum = 6,
            //横线行数
        fontSize = _this.fontSize; //字号
        // 横坐标&余额&消费

        for (var i = 0; i < len; i++) {
          xArr.push(i * spaceX);
          balanceArr.push(parseFloat(dict[i].useUsage));

          if (dict[i].transaction == '消费') {
            dict[i].cost = -Math.abs(dict[i].cost);
          }

          costArr.push(parseFloat(dict[i].cost));
        }

        if (dict.length != 0) {
          _this.setData({
            tapDetail: dict[dict.length - 1]
          });
        }

        _this.setData({
          dict: data,
          cardNumber: _this.cardNumber,
          lineLeft: _this.width - _this.gridMarginLeft - 1,
          remind: '',
          switchArr: balanceArr,
          // 将纵坐标的值初始化为余额集合
          costArr: costArr,
          // 消费集合，切换折线的时候用
          balanceArr: balanceArr
        });

        _this.setData({
          canvas_remind: ''
        });
      }
			app.globalData.ShowMsgUtil.netErrNotice();
      wx.showNavigationBarLoading();
      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.myRecord + '?type=2&take=10&skip=0',
        header: {
          "token": userInfoCach.token
        },
        method: 'GET',
        success: function (res) {
          console.log('获取充值记录返回', res.data);

          if (res.data && res.data.code === 200) {
            var info = res.data.rows;

            if (info) {
              info = _this.dealShowData(info);

              _this.setData({
                myRecord: info
              });

              yktRender(info);
            } else {
              _this.setData({
                remind: '暂无数据'
              });
            }
          }
        },
        fail: function (res) {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        },
        complete: function () {
          wx.hideNavigationBarLoading();
        }
      });
    },
    // 将返回数据处理成页面显示数据
    dealShowData: function (list) {
      let array = [];

      for (let i = 0; i < list.length; i++) {
        console.log(list[i]);
        let obj = {};
        obj.name = '消费类型：' + list[i].location;
        obj.time = list[i].days;
        obj.money = '- ' + (parseFloat(list[i].useUsage) / 100.0).toFixed(2);
        array[i] = obj;
      }

      return array;
    },
    // 绘制横轴&纵轴&网格线
    drawLineXY: function (options, switchArr) {
      var context = options.context,
          gridMarginLeft = options.gridMarginLeft,
          gridMarginTop = options.gridMarginTop,
          canvasHeight = options.canvasHeight,
          canvasWidth = options.canvasWidth,
          xArr = options.xArr,
          tmp_yArr = switchArr,
          gridNum = options.gridNum,
          fontSize = options.fontSize;
      /*
       * 余额纵坐标&横网格线
       * gridNum: 横网格线条数
       * spaceY: 横网格间距
       * spaceYe: 纵轴余额的金额间隔
       * tmp_minY: 余额的最小值
       * tmp_maxY: 余额的最大值
       */

      var tmp_minY = Math.min.apply(Math, tmp_yArr.map(function (e) {
        return Math.abs(e);
      })),
          tmp_maxY = Math.max.apply(Math, tmp_yArr.map(function (e) {
        return Math.abs(e);
      })),
          spaceYe = tmp_maxY / gridNum,
          gridHeight = canvasHeight - 2 * gridMarginTop,
          spaceY = gridHeight / gridNum; // 绘制竖网格

      context.setLineWidth(1);
      context.setLineCap("round");
      context.setStrokeStyle("#dddddd");

      for (var i = 0; i < xArr.length; i++) {
        context.beginPath();
        context.moveTo(xArr[i] + gridMarginLeft, canvasHeight - gridMarginTop);
        context.lineTo(xArr[i] + gridMarginLeft, gridMarginTop);
        context.stroke();
        context.closePath();
      }

      context.setStrokeStyle("#dddddd");
      context.setFillStyle("#ffcb63"); // 绘制横网格&纵轴金额  

      for (var i = 0; i <= gridNum; i++) {
        var numY = 0,
            diff = 0; // 纵轴金额

        if (i === 0) {
          numY = 0;
        } else {
          numY = (spaceYe * i).toFixed(0);
        }

        context.beginPath();
        context.moveTo(xArr[0] + gridMarginLeft, gridMarginTop + spaceY * i);
        context.lineTo(xArr[xArr.length - 1] + gridMarginLeft, gridMarginTop + spaceY * i);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.setFontSize(fontSize);
        var left = 25;

        if (numY < 10) {
          left = 15;
        } else if (numY < 100) {
          left = 20;
        } else if (numY < 1000) {
          left = 25;
        }

        context.fillText(numY, gridMarginLeft - left, canvasHeight - gridMarginTop - spaceY * i + 3);
        context.closePath();
      }
      /*
       * 绘制横轴和纵轴
       */


      context.setLineWidth(2);
      context.setStrokeStyle("#ffcb63");
      context.beginPath();
      context.moveTo(xArr[0] + gridMarginLeft, canvasHeight - gridMarginTop);
      context.lineTo(canvasWidth - gridMarginLeft / 2, canvasHeight - gridMarginTop);
      context.moveTo(xArr[0] + gridMarginLeft, canvasHeight - gridMarginTop);
      context.lineTo(xArr[0] + gridMarginLeft, 0);
      context.stroke();
      context.closePath();
    },
    // 描点&连线
    drawPointLine: function (options, switchArr) {
      var _this = this;

      var context = options.context,
          yArr = [],
          gridMarginLeft = options.gridMarginLeft,
          gridMarginTop = options.gridMarginTop,
          canvasHeight = options.canvasHeight,
          canvasWidth = options.canvasWidth,
          xArr = options.xArr,
          gridNum = options.gridNum,
          tmp_yArr = switchArr,
          len = options.len,
          spaceX = options.spaceX,
          pointArr = [];
      /* 
       * 点集的纵坐标
       * 根据网格间距/余额间距的比例算出点的对应纵坐标
       * spaceY: 横网格间距
       * spaceYe: 纵轴金额间隔
       * tmp_minY: 金额的最小值
       * tmp_maxY: 金额的最大值
       * yArr: 点在画布中的纵坐标
       */

      var tmp_minY = Math.min.apply(Math, tmp_yArr.map(function (e) {
        return Math.abs(e);
      })),
          tmp_maxY = Math.max.apply(Math, tmp_yArr.map(function (e) {
        return Math.abs(e);
      })),
          spaceYe = tmp_maxY / gridNum,
          gridHeight = canvasHeight - 2 * gridMarginTop,
          spaceY = gridHeight / gridNum,
          switchBtn = Math.min.apply(Math, tmp_yArr) >= 0;

      for (var i = 0; i < len; i++) {
        yArr.push(gridHeight - (tmp_maxY - Math.abs(tmp_yArr[i])) * spaceY / spaceYe);
      }
      /* 
       * 描点连线
       */


      for (var i = 0; i < len; i++) {
        var x = xArr[i] + gridMarginLeft,
            // 横坐标
        y = canvasHeight - gridMarginTop - yArr[i]; // 纵坐标         
        // 将点在画布中的坐标&消费详情存入数组

        pointArr.push({
          x: x,
          y: y,
          detail: this.dict[i]
        });
      }

      context.setStrokeStyle("#73b4ef");
      context.setFillStyle("#ffcb63"); // 描点连线

      for (var i = 0, pLen = pointArr.length; i < pLen; i++) {
        if (pointArr[i + 1]) {
          if (switchBtn && tmp_yArr[i + 1] > tmp_yArr[i] || !switchBtn && (tmp_yArr[i] > 0 || tmp_yArr[i + 1] > 0)) {
            context.setGlobalAlpha(0.66);
          }

          context.beginPath();
          context.moveTo(pointArr[i].x, pointArr[i].y);
          context.lineTo(pointArr[i + 1].x, pointArr[i + 1].y);
          context.stroke();
          context.beginPath();
        }

        context.setGlobalAlpha(1);
        context.beginPath();
        context.arc(pointArr[i].x, pointArr[i].y, 2, 0, 2 * Math.PI); // 画点              

        context.fill();
        context.fillText((!switchBtn && tmp_yArr[i] > 0 ? '+' : '') + tmp_yArr[i], pointArr[i].x + 3, pointArr[i].y - 3); // 点的含义，画字

        context.closePath();
      }

      _this.setData({
        points: pointArr
      });
    },
    // 触摸详情
    canvasTap: function (e) {
      var _this = this; // 手指在画布中的坐标        


      var tapX = e.detail.x,
          tapY = e.detail.y,
          points = _this.points,
          pointsLen = points.length,
          diffX = 0,
          iwidth = (_this.width - 2 * _this.gridMarginLeft) / (_this.count - 1);
      var i = Math.round((tapX - _this.gridMarginLeft) / iwidth);

      _this.setData({
        tapDetail: points[i].detail,
        lineLeft: _this.gridMarginLeft + iwidth * i - 1,
        // 详情竖线的left
        currentIndex: i // 当前点的索引，即显示当前详情

      });
    }
  }
};
</script>
<style>
@import "./campusCard.css";
</style>