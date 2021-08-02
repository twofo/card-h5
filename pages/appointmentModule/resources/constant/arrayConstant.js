/**
 * 静态常量 - 数组 
 * 
 */
var AppiontmentPageUrl = require("../../../common/resources/jumpPath/appointmentPageUrl.js");

var ImageUrl = require("../utils/imageUrl.js");

var ImageUrls = require("../../../common/resources/imageUrl.js");

var arrayConstant = {
  // 公共区域
  commonList: [[{
    image: ImageUrl.changGuanAppiontPic,
    url: AppiontmentPageUrl.appointmentRoomUrl,
    name: "场馆预约"
  }, {
    image: ImageUrl.meetingRecordPic,
    url: AppiontmentPageUrl.attendPianoListUrl + '?type=2',
    name: '琴房记录'
  }, {
    image: ImageUrl.dancingListPic,
    url: AppiontmentPageUrl.attendPianoListUrl + '?type=3',
    name: '练功房记录'
  }, {
    image: ImageUrl.optionAttendanceApprovePic,
    url: AppiontmentPageUrl.meetingListUrl,
    name: '会议记录'
  }]],

  /**
   * 预约列表
   */
  // 学生 - 我的预约
  appiontList: [[{
    name: "场馆预约",
    url: AppiontmentPageUrl.appointmentRoomUrl,
    image: ImageUrl.optionAppointmentPic
  }]],
  //会议考勤列表
  meetingAttendanceList: [[{
    name: "考勤列表",
    url: AppiontmentPageUrl.attendMeetingListUrl+'?type=kqlb',
    image: ImageUrl.meetingAttendanceListPic
  }, {
    name: "考勤打卡",
    url: AppiontmentPageUrl.attendAttendaceSignUrl+"?type=kqdk",  //考勤打卡
    image: ImageUrl.meetingAttendanceSignInPic
  },
	{
    image: ImageUrl.optionAttendanceApprovePic,
    url: AppiontmentPageUrl.attendMeetingListUrl+'?type=chjl',
    name: '参会记录'
  }]]
};
module.exports = arrayConstant;