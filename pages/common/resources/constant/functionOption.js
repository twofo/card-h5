/**
 * 静态常量 - 数组 
 * 
 */
var MinePageUrl = require("../jumpPath/minePageUrl.js");

var IndexPageUrl = require("../jumpPath/indexPageUrl.js");

var AttendancePageUrl = require("../jumpPath/attendancePageUrl.js");

var RepairPageUrl = require("../jumpPath/repairPageUrl.js");

var AppiontmentPageUrl = require("../jumpPath/appointmentPageUrl.js");

var ImageUrl = require("../imageUrl.js");

var functionOption = {
  dormitoryStudentType: "1",
  dormitoryNotStudentType: "2",
  /**
   * 我的宿管 学生 - 功能选项
   */
  dormitoryStudentOption: [[{
    image: ImageUrl.waterEleConsume,
    url: IndexPageUrl.waterInfoUrl,
    name: '水电信息'
  }, {
    image: ImageUrl.liuxiao,
    url: IndexPageUrl.inOrOutSchoolApplyUrl + '?applyType=1',
    name: "假期留校"
  }, {
    image: ImageUrl.waisu,
    url: IndexPageUrl.inOrOutSchoolApplyUrl + '?applyType=2',
    name: "外宿申请"
  }, 
  // {
  //   image: ImageUrl.waisu,
  //   url: IndexPageUrl.retiredUrl+ '?applyType=3',
  //   name: "退宿申请"
  //  },
   {
      image: ImageUrl.guiqinjilu,
      url: IndexPageUrl.inOrOutSchoolListUrl,
      name: "申请记录"
    },

  ]],

  /**
   * 我的宿管 非学生 - 功能选项
   */
  dormitoryNotStudentOption: [[{
    image: ImageUrl.waterEleConsume,
    url: IndexPageUrl.waterInfoUrl,
    name: '水电信息'
  },
 {
  image: ImageUrl.waisu,
  url: IndexPageUrl.retiredUrl+ '?applyType=3',
  name: "退宿申请"
  },
  {
     image: ImageUrl.guiqinjilu,
     url: IndexPageUrl.inOrOutSchoolListUrl,
     name: "申请记录"
   },
  
  ]]
};
module.exports = functionOption;