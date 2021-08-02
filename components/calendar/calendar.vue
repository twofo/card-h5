<template>
<view>
<view class="header space-between">
  <text class="iconfont" data-id="0" @tap="dataBefor">
    <text class="left color"></text>
  </text>
  <view class="btn flex-center" @tap="dateSelection">
    <view class="text">{{selectDay}}</view>
    <text class></text>
  </view>
  <text class="iconfont" data-id="1" @tap="dataBefor">
    <text class="right color"></text>
  </text>
</view>
<view v-if="!calShow" :class="(isOpen?'':'calendar-box') + ' ' + (dateShow?'active':'')">
  <view :class="'calendar-wrapper ' + (dateShow?'active':'')">
    <view class="calendar-panel">
      <view class="date-befor" data-id="0" data-type="month" @tap="dataBefor">
        <text class="iconfont">
        <text class="left color"></text>
        </text>
      </view>
      <view class="calendar-panel-box">
        <view>{{canlender.year}}年</view>
        <view>{{canlender.month}}月</view>
      </view>
      <view class="date-after" data-id="1" data-type="month" @tap="dataBefor">
        <text class="iconfont">
        <text class="right color"></text>
        </text>
      </view>
      <view class="backtoday" @tap="backtoday">
        回到今天
      </view>
    </view>
    <view class="calendar-header">
      <view>日</view>
      <view>一</view>
      <view>二</view>
      <view>三</view>
      <view>四</view>
      <view>五</view>
      <view>六</view>
    </view>
    <view class="calendar-body">
      <block v-for="(weeks, week) in canlender.weeks" :key="week">
        <view class="calender-body-date-week">
          <block v-for="(day, index) in weeks" :key="index">

            <!-- 若需要该样式的话，只需class名date-current即可 -->
            <view :class="'date ' + (canlender.month === day.month? '' : 'placeholder') + ' ' + (day.is_select?'date-current': '') + ' ' + ((day.date==canlender.date||day.checked) && canlender.month == day.month?'date-current': '')" :data-week="week" :data-index="index" :data-ischeck="canlender.month === day.month" @tap="selectDayFun">
              {{day.date}}
              <view v-if="day.have" class="data-circle"></view>
            </view>

          </block>
        </view>
      </block>

    </view>
    <!-- <view class="packup" bindtap='packup'>确定</view> -->
  </view>

  <view class="page__bd detail-box">

    <view class="detail-box-day">

      <view class="detail-text">
        <text>打开时间段：21:30-22:00</text>
      </view>

      <view class="center_start">
        <image class="center_image" src="/static/images/core/kq/right.png"></image>
        <text class="center_image_right center_text">打卡时间：{{startTime}}</text>
      </view>

      <view class="center_detail">
        <view class="center_detail_box">
          <view class="center_detail_position">
            <image class="center_detail_image" src="/static/images/core/kq/position.png"></image>
            <text class="detail_right">12栋301室</text>
          </view>
          <view class="box-status center_text">
            <text>正常</text>
          </view>
        </view>
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
      calShow: true,
      // 日历组件是否打开
      dateShow: false,
      // 日期是否选择
      selectDay: '',
      // 当前选择日期
      canlender: {
        "weeks": []
      },
      selectList: [{
        day: '1',
        month: '5'
      }, {
        day: '2',
        month: '5'
      }, {
        day: '3',
        month: '5'
      }, {
        day: '6',
        month: '5'
      }]
    };
  },

  components: {},
  props: {
    date: {
      type: null,
      default: new Date()
    },
    selected: {
      type: Array,
      default: () => []
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    selected: {
      handler: function (newVal, oldVal) {
        this.getWeek(new Date());
      },
      immediate: true,
      deep: true
    }
  },

  mounted() {
    this.getWeek(new Date());

    if (this.isOpen) {
      this.setData({
        calShow: false,
        dateShow: true
      });
    }
  },

  methods: {
    dateSelection() {
      if (this.isOpen) {
        return;
      }

      let self = this;

      if (self.calShow) {
        self.setData({
          calShow: false
        }, () => {
          setTimeout(() => {
            self.setData({
              dateShow: true
            }, () => {
              self.$emit('select', {
                detail: {
                  ischeck: !self.data.calShow
                }
              });
            });
          }, 100);
        });
      } else {
        self.setData({
          dateShow: false
        }, () => {
          setTimeout(() => {
            self.setData({
              calShow: true
            }, () => {
              self.$emit('select', {
                detail: {
                  ischeck: !self.data.calShow
                }
              });
            });
          }, 300);
        });
      }
    },

    /**
     * 选择哪天后，按照特定的格式输入
     */
    selectDayFun(e) {
      let index = e.currentTarget.dataset.index;
      let week = e.currentTarget.dataset.week;
      let ischeck = e.currentTarget.dataset.ischeck;
      let canlender = this.canlender;
      if (!ischeck) return false;
      let month = canlender.weeks[week][index].month < 10 ? "0" + canlender.weeks[week][index].month : canlender.weeks[week][index].month;
      let date = canlender.weeks[week][index].date < 10 ? "0" + canlender.weeks[week][index].date : canlender.weeks[week][index].date;
      this.getWeek(canlender.year + "-" + month + "-" + date);
    },

    packup() {
      let self = this;

      if (this.isOpen) {
        let year = self.canlender.year + "-" + self.canlender.month + "-" + self.canlender.date;

        let _date = self.getDate(year, 0);

        self.getWeek(_date);
        return;
      }

      self.setData({
        dateShow: false
      }, () => {
        setTimeout(() => {
          self.setData({
            calShow: true
          }, () => {
            let year = self.canlender.year + "-" + self.canlender.month + "-" + self.canlender.date;

            let _date = self.getDate(year, 0);

            self.getWeek(_date);
            self.$emit('select', {
              detail: {
                ischeck: !self.data.calShow
              }
            });
          });
        }, 300);
      });
    },

    // 返回今天
    backtoday() {
      this.getWeek(new Date());
    },

    // 前一天|| 后一天
    dataBefor(e) {
      let num = 0;
      let types = e.currentTarget.dataset.type;

      if (e.currentTarget.dataset.id === "0") {
        num = -1;
      } else {
        num = 1;
      }

      let year = this.canlender.year + "-" + this.canlender.month + "-" + this.canlender.date;

      let _date = this.getDate(year, num, types === 'month' ? "month" : "day");

      this.getWeek(_date);
    },

    // 获取日历内容
    getWeek(dateData) {
      let selected = this.selected;
      let a = new Date(); // 判断当前是 安卓还是ios ，传入不容的日期格式

      if (typeof dateData !== 'object') {
        dateData = dateData.replace(/-/g, "/");
      }

      let _date = new Date(dateData);

      let year = _date.getFullYear(); //年


      let month = _date.getMonth() + 1; //月

      let date = _date.getDate(); //日


      let day = _date.getDay(); // 天


      let canlender = []; // console.log(selected)

      let dates = {
        firstDay: new Date(year, month - 1, 1).getDay(),
        lastMonthDays: [],
        // 上个月末尾几天
        currentMonthDys: [],
        // 本月天数
        nextMonthDays: [],
        // 下个月开始几天
        endDay: new Date(year, month, 0).getDay(),
        weeks: []
      }; // 循环上个月末尾几天添加到数组

      for (let i = dates.firstDay; i > 0; i--) {
        dates.lastMonthDays.push({
          'date': new Date(year, month, -i).getDate() + '',
          'month': month - 1
        });
      } // 循环本月天数添加到数组


      for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
        let have = false;
        let is_select = false;

        for (let j = 0; j < selected.length; j++) {
          let selDate = selected[j].date.split('-');

          if (Number(year) === Number(selDate[0]) && Number(month) === Number(selDate[1]) && Number(i) === Number(selDate[2])) {
            have = true;
          }
        } // 将签到的日期，设置标志位。已备静态页面的展示


        for (let j = 0; j < this.selectList.length; j++) {
          if (this.selectList[j].day == i && this.selectList[j].month == month) {
            is_select = true;
          }
        }

        dates.currentMonthDys.push({
          'date': i + "",
          'month': month,
          have,
          is_select
        });
      } // 循环下个月开始几天 添加到数组


      for (let i = 1; i < 7 - dates.endDay; i++) {
        dates.nextMonthDays.push({
          'date': i + '',
          'month': month + 1
        });
      }

      canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays); // 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天

      for (let i = 0; i < canlender.length; i++) {
        if (i % 7 == 0) {
          dates.weeks[parseInt(i / 7)] = new Array(7);
        }

        dates.weeks[parseInt(i / 7)][i % 7] = canlender[i];
      } // 渲染数据


      this.setData({
        selectDay: month + "月" + date + "日",
        "canlender.weeks": dates.weeks,
        'canlender.month': month,
        'canlender.date': date,
        "canlender.day": day,
        'canlender.year': year
      });
      month = month < 10 ? "0" + month : month;
      date = date < 10 ? "0" + date : date;
      this.$emit('getdate', {
        detail: {
          year,
          month,
          date
        }
      });
    },

    /**
     * 时间计算
     */
    getDate(date, AddDayCount, str = 'day') {
      if (typeof date !== 'object') {
        date = date.replace(/-/g, "/");
      }

      let dd = new Date(date);

      switch (str) {
        case 'day':
          dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期

          break;

        case 'month':
          dd.setMonth(dd.getMonth() + AddDayCount); // 获取AddDayCount天后的日期

          break;

        case 'year':
          dd.setFullYear(dd.getFullYear() + AddDayCount); // 获取AddDayCount天后的日期

          break;
      }

      let y = dd.getFullYear();
      let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0

      let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0

      return y + '-' + m + '-' + d;
    }

  }
};
</script>
<style>
@import "./calendar.css";
</style>