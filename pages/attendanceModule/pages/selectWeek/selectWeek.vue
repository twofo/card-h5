<template>
<view class="page">

  <view class="page__bd">

    <view class="weui-cells weui-cells_after-title box_top">
      <checkbox-group @change="checkboxChange">
        <label v-for="(item, index) in checkboxItems" :key="index" class="weui-cell weui-check__label">
            <checkbox class="weui-check" :value="item.value" :checked="item.checked"></checkbox>

            
            <view class="weui-cell__bd">{{item.name}}</view>
            <view class="weui-cell__ft weui-check__hd_in-checkbox">
                <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
                <icon class="weui-icon-checkbox_success" type="success" color="#20A4F7" size="23" v-if="item.checked"></icon>
            </view>
        </label>
      </checkbox-group>
    </view>

    <view class="page__bd">
      <view class="page__bd page__bd_spacing button_top">
        <button class="weui-btn page_submit" :disabled="disabled" @tap="confirmLimit">确定选择</button>
      </view>
    </view>

  </view>

</view>
</template>

<script>
var app = getApp();

export default {
  data() {
    return {
      checkboxItems: [{
        name: '每周一',
        value: '1'
      }, {
        name: '每周二',
        value: '2'
      }, {
        name: '每周三',
        value: '3'
      }, {
        name: '每周四',
        value: '4'
      }, {
        name: '每周五',
        value: '5'
      }, {
        name: '每周六',
        value: '6'
      }, {
        name: '每周日',
        value: '7'
      }],
      disabled: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const toWeekCach = app.globalData.StorageUtil.get('toWeekCach');

    if (toWeekCach) {
      this.dealWeek(toWeekCach);
    } else {
      const checkboxItems = app.globalData.StorageUtil.get('attendaceWeekCach');

      if (checkboxItems) {
        this.setData({
          checkboxItems: checkboxItems
        });
      }
    }
  },
  methods: {
    /**
     * 选择星期
     */
    checkboxChange: function (e) {
			console.log(e)
      this.dealWeek(e.detail.value);
    },
    dealWeek: function (values) {
      var checkboxItems = this.checkboxItems,
          values = values;

      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false;

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (checkboxItems[i].value == values[j]) {
            checkboxItems[i].checked = true;
						this.$set(this.checkboxItems,i,checkboxItems[i])
            break;
          }
        }
      }
			
      this.setData({
        checkboxItems: checkboxItems
      });
    },

    /**
     * 确认选择
     */
    confirmLimit: function () {
      var checkboxItems = this.checkboxItems;
      console.log('选择的日期为', checkboxItems);
      this.setData({
        disabled: true
      });
      app.globalData.StorageUtil.set('attendaceWeekCach', checkboxItems);
      app.globalData.StorageUtil.remove('toWeekCach');
      app.globalData.ShowMsgUtil.showSuccessAndReturn('选择成功',1500);
			
    }
  }
};
</script>
