<template>
<view class="page page_view">

  <view class="page__bd">
    <view v-for="(item, index) in setList" :key="index" class="title__bd" :item="item">
      <view class="weui-cells__title title_font">{{item.title}}（<text class="title_font_min">{{item.msg}}</text>）</view>
      <view class="weui-cells weui-cells_after-title">
        <view class="weui-cell weui-cell_input">
          <view class="weui-cell__bd">
            <input class="weui-input" type="number" 
						@input="inputTap($event,index)" value="" :placeholder="item.placeholderName"></input>
          </view>
        </view>
      </view>
    </view>
  </view>
  
  <view class="page__bd">
    <view class="page__bd page__bd_spacing title__bd">
      <button class="weui-btn page_submit" :disabled="disabled" @tap="confirmLimit">确认办理</button>
    </view>
  </view>

  <view class="page__bd">
    <view class="page__bd page__bd_spacing">
      <button class="weui-btn page_submit submit_a" :disabled="canceldisabled" type="default" @tap="clearLimit">取消限额</button>
    </view>
  </view>

  <view class="page__bd setLimit-view">
    <view class="weui-article">
    <view class="weui-article__h1 h1-font">温馨提示</view>
      <view class="weui-article__section">
        <view class="weui-media-box__desc desc-font">1. 取消限额按钮为取消全部的限额设置。</view> 
        <view class="weui-media-box__desc desc-font">2. 设置单笔交易限额后，单笔消费不能超过该限额。</view>
        <view class="weui-media-box__desc desc-font">3. 设置单日累计交易限额后，每日累计消费不能超出该限制。</view>
        <view class="weui-media-box__desc desc-font">4. 设置单月累计交易限额后，每月累计消费不能超出该限制。</view>
        <view class="weui-media-box__desc desc-font">5. 该设置限制所有交易类型，如卡片消费，二维码消费。</view>        
      </view>
    </view>
  </view>
  
</view>
</template>

<script>
/**
 * 1. 优化缓存成功
 * 2. 优化输入验证成功
 * 3. 优化页面加载成功
 */
var app = getApp();

export default {
  data() {
    return {
      setList: [{
        id: 1,
        title: '单笔交易限额',
        placeholderName: '请输入单笔交易限额（选填）',
        msg: '未设置',
				val:'onceLimit'
      }, {
        id: 2,
        title: '单日累计交易限额',
        placeholderName: '请输入单日交易限额（选填）',
        msg: '未设置',
				val:'oneDayLimit'
      }, {
        id: 3,
        title: '单月累计交易限额',
        placeholderName: '请输入单月交易限额（选填）',
        msg: '未设置',
				val:'oneMonthLimit'
      }],
      userInfoCach: {},
      onceLimit: '',
      //存储输入的值
      oneDayLimit: '',
      oneMonthLimit: '',
      inputValue: '',
      disabled: false,
      canceldisabled: false,
      msg: ""
    };
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('------------------------设置限额------------------------');

    var _this = this;

    const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');

    _this.setData({
      'userInfoCach': userInfoCach
    }); // 不从后台查，直接从缓存里获取数据。
    // TODO  可能出现缓存无缘故被清空。则所有设置都为未设置。但若用户本来设置了金额，也会未设置。
    // 待解决。 在解决之前采用，若三个缓存不存在，则从后台查询。
    // 只要缓存里有一个金额数据存在。则从缓存里去


    if (app.globalData.StorageUtil.get('onceLimitCach') || app.globalData.StorageUtil.get('oneDayLimitCach') || app.globalData.StorageUtil.get('oneMonthLimitCach')) {
      _this.setValue(0, app.globalData.StorageUtil.get('onceLimitCach'));

      _this.setValue(1, app.globalData.StorageUtil.get('oneDayLimitCach'));

      _this.setValue(2, app.globalData.StorageUtil.get('oneMonthLimitCach'));

      wx.hideToast();
    } else {
      // 若三个缓存不存在，则从后台查询。防止缓存因意外而被清空
     this.getSetVal()
    }
  },
  methods: {
		getSetVal(){
			var _this = this;
			app.globalData.ShowMsgUtil.netErrNotice();
			const userInfoCach = app.globalData.StorageUtil.get('userInfoCach');
			uni.request({
			  url: app.globalData.RequestUrl.baseRequestUrl.getLimitMoney,
			  header: {
			    'token': userInfoCach.token
			  },
			  method: 'GET',
			  success: function (res) {
			    console.log('限额设置', res.data.rows);
			
			    if (res.data && res.data.code == 200) {
			      // TODO 加循环  数组无法存储null值。使用数组更加复杂
			      _this.setValue(0, res.data.rows.onceLimit);
			
			      _this.setValue(1, res.data.rows.oneDayLimit);
			
			      _this.setValue(2, res.data.rows.oneMonthLimit);
						
			    } else {
			      app.globalData.ShowMsgUtil.showErrorModal('加载失败', res.data.msg, res.data.code);
			
			      _this.setData({
			        msg: '加载失败，请稍后再试'
			      });
			    }
			  },
			  fail: function () {
			    app.globalData.ShowMsgUtil.showNoneToastByFail();
			  }
			});
		},
    /**
     * 网络错误提示
     */
    showNetError: function () {
      app.globalData.showNetWorkError('网络异常');
      setTimeout(function () {
        wx.hideNavigationBarLoading();
      }, 5000);
    },
    setValue: function (index, value) {
      var _this = this;

      if (value != null && value != '') {
        _this.setOneMsg(index, value);
      } else {
        _this.setMsg(index);
      }
    },
    setOneMsg: function (index, value) {
      const str = "当前限额￥";
      this.setData({
        ['setList[' + index + '].msg']: str + value
      });
    },
    setMsg: function (index) {
      const str = "未设置";
      this.setData({
        ['setList[' + index + '].msg']: str
      });
    },

    /**
     * 获取输入的值
     */
		inputTap(e,index){
			console.log(e,index)
			let val = parseInt(e.detail.value)
			if(index == 0){
				this.setData({
				  'onceLimit': val
				});
			}else if(index == 1){
				this.setData({
				  'oneDayLimit': val
				});
			}else if(index == 2){
				this.setData({
				  'oneMonthLimit': val
				});
			}
		},
    verify: function (value) {
      if (value.length != 0) {
        return Math.floor(value) === value
      }

    },

    /**
    * 确认限额设置
    */
    confirmLimit: function (e) {
      var _this = this;

      var onceLimit = _this.onceLimit;
      var oneDayLimit = _this.oneDayLimit;
      var oneMonthLimit = _this.oneMonthLimit;
      wx.showModal({
        title: '提示',
        content: '是否确认限额？',
        confirmColor: '#20a4f7',

        success(res) {
          if (res.confirm) {
            if (onceLimit.length == 0 && oneDayLimit.length == 0 && oneMonthLimit.length == 0) {
              app.globalData.ShowMsgUtil.showErrorModal('请先重新设置！', '你没有设置新的金额');
							return
            }

            if (!(_this.verify(onceLimit) || _this.verify(oneDayLimit) || _this.verify(oneMonthLimit))) {
              app.globalData.ShowMsgUtil.showErrorModal('请重新输入！', '你设置的金额不是正整数');
            } else if (onceLimit.length != 0 || oneDayLimit.length != 0 || oneMonthLimit.length != 0) {
              _this.confirmSetLimit();
            }
          } else if (res.cancel) {}
        },

        fail(res) {
          app.globalData.ShowMsgUtil.showNoneToastByFail();
        }

      });
    },

    /**
     * 发起限额请求
     */
    confirmSetLimit: function (e) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      let {
        disabled
      } = this;

      _this.setData({
        disabled: true
      });

      uni.request({
        url: app.globalData.RequestUrl.baseRequestUrl.limitMoney,
        data: {
          'onceLimit': _this.onceLimit,
          'oneDayLimit': _this.oneDayLimit,
          'oneMonthLimit': _this.oneMonthLimit
        },
        header: {
          'token': _this.userInfoCach.token,
          'content-type': 'application/json' //默认值
        },
        method: 'PUT',
        success(res) {
          console.log('限额设置返回', res);

          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessToast('限额设置成功！', 2000); // 将设置后的金额存入缓存。没输入则不存
            if (_this.onceLimit) {
              app.globalData.StorageUtil.set('onceLimitCach', _this.onceLimit);
            }
            if (_this.oneDayLimit) {
              app.globalData.StorageUtil.set('oneDayLimitCach', _this.oneDayLimit);
            }
            if (_this.oneMonthLimit) {
              app.globalData.StorageUtil.set('oneMonthLimitCach', _this.oneMonthLimit);
            }
            _this.setData({
              disabled: false
            });

            _this.clearPage();
          } else {
            _this.setData({
              disabled: false
            });

            app.globalData.ShowMsgUtil.showErrorModal('请求失败', res.data.msg, res.data.code);
            return;
          }
        },

        fail: function () {
          _this.setData({
            disabled: false
          });

          app.globalData.ShowMsgUtil.showNoneToastByFail();

          _this.showNetError();
        }
      });
    },

    /**
     * 刷新页面
     */
    clearPage: function (e) {
			console.log('刷新页面')
      var _this = this;
			//#ifdef H5
					window.location.reload();
			//#endif
     
    },

    /**
     * 取消限额设置
     */
    clearLimit: function (e) {
      var _this = this;

      var onceLimit = _this.onceLimit;
      var oneDayLimit = _this.oneDayLimit;
      var oneMonthLimit = _this.oneMonthLimit;
      wx.showModal({
        title: '提示',
        content: '是否取消全部限额？',
        confirmColor: '#20a4f7',

        success(res) {
          if (res.confirm) {
            // if (onceLimit.length == 0 || oneDayLimit.length == 0 || oneMonthLimit.length == 0) {
            //   app.showErrorModal('还没有设置限额', '请先设置限额！');
            // }else{
            _this.deleteSetLimit(); // }

          } else if (res.cancel) {
            console.log('是否取消全部限额？', '用户点击取消');
          }
        }

      });
    },
    deleteSetLimit: function (e) {
      var _this = this;
						app.globalData.ShowMsgUtil.netErrNotice();
      let {
        canceldisabled
      } = this;

      _this.setData({
        canceldisabled: true
      });

      wx.request({
        url: app.globalData.RequestUrl.baseRequestUrl.deleteLimitMoney,
        method: 'POST',
        header: {
          'token': _this.userInfoCach.token
        },
        success: function (res) {
          if (res.data && res.data.code == 200) {
            app.globalData.ShowMsgUtil.showSuccessToast('删除设置成功！', 2000);
            app.globalData.StorageUtil.remove('onceLimitCach');
            app.globalData.StorageUtil.remove('oneDayLimitCach');
            app.globalData.StorageUtil.remove('oneMonthLimitCach');

            _this.clearPage();
          } else {
            app.globalData.ShowMsgUtil.showErrorModal('删除失败！', res.data.msg, res.data.code);
          }

          _this.setData({
            canceldisabled: false
          });
        },
        fail: function () {
          _this.setData({
            canceldisabled: false
          });

          app.globalData.ShowMsgUtil.showNoneToastByFail();

          _this.showNetError();
        }
      });
    }
  }
};
</script>
<style>
@import "./setLimit.css";
</style>