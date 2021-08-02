<template>
<view class="searchBox">
  <view class="weui-cells weui-cells_after-title">
    <view class="weui-cell weui-cell_input search-inp-box">
      <icon type="search" class="search-inp-icon" size="18" v-if="showIcon"></icon>
      <input class="weui-input search-Inp" :placeholder="placeholder" :style="'padding-left:' + inpPadLeft + 'rpx'" confirm-type="search" @confirm="bindconfrim" data-value="1" @input="bindInput" :focus="searchFocus"></input>
    </view>
  </view>
</view>
</template>

<script>

export default {
  data() {
    return {
      timer: null
    };
  },

  components: {},
  props: {
    placeholder: {
      //提示词
      type: String,
      default: '请输入...'
    },
    searchFocus: {
      //是否聚焦  根据需求添加,默认不聚焦
      type: Boolean,
      default: false
    },
    showIcon: {
      //是否展示搜索图标
      type: Boolean,
      default: true
    },
    inpPadLeft: {
      //搜索框有图标时左边距
      type: String,
      default: '57'
    }
  },
  methods: {
    bindconfrim(e) {
      // console.log(e.detail.value.replace(/\s+/g, ''))
      let inpVal = e.detail.value.replace(/\s+/g, ''); //去除前后空格

      let myInpValy = {
        value: inpVal
      };
      this.$emit('searchInp', {
        detail: myInpValy
      });
    },

    bindInput(e) {
      let _this = this;

      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(function () {
        let inpVal = e.detail.value.replace(/\s+/g, ''); // console.log('mysearchValLen',inpVal);

        let myInpValLength = {
          value: inpVal,
          valLength: inpVal.length
        }; // console.log('mysearchValLen',myInpValLength);

        _this.$emit('mysearchValLen', {
          detail: myInpValLength
        });
      }, 600);
    }

  }
};
</script>
<style>
@import "./searchAppiontPerson.css";
</style>