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

var FunctionOption = require("./functionOption.js");

var arrayConstant = {
	/**
	 * 功能选项
	 */
	// 学生功能选项1
	studentOption: [
		[
		{
			image: ImageUrl.wallet,
			url: IndexPageUrl.walletIndexUrl,
			name: '一卡通'
		},
		{
			image: ImageUrl.eletri_home,
			url: IndexPageUrl.toPayFee+ '?isWater=5',
			name: '电费'
		},
		// {
		// 	image: ImageUrl.water_home,
		// 	url: IndexPageUrl.toPayFee + '?isWater=2',
		// 	name: '水费'
		// },
		{
			image: ImageUrl.account_home,
			url: IndexPageUrl.toPay ,
			name: '余额'
		},
		{
			image: ImageUrl.ecode_home,
			url: IndexPageUrl.paymentCode,
			name: '消费码'
		},
		{
			image: ImageUrl.lost_home,
			url: MinePageUrl.lossApply,
			name: '卡挂失'
		},
		{
			image: ImageUrl.repair,
			url: RepairPageUrl.studentRepairIndexUrl,
			name: '在线报修'
		}, 
		{
			image: ImageUrl.commonResource,
			url: AppiontmentPageUrl.commonAreaUrl,
			name: "公共资源"
		},
		// {
		// 	image: ImageUrl.commonWater,
		// 	url: AppiontmentPageUrl.commonWatermeterUrl,
		// 	name: "公共用水"
		// },
		{
			image: ImageUrl.attendace,
			url: AttendancePageUrl.myAttendanceIndexUrl,
			name: '我的考勤'
		},
		{
			image: ImageUrl.shenpi,
			url: IndexPageUrl.approvalInfoUrl,
			name: '我的待办'
		},
		{
			image: ImageUrl.myRoomImg,
			url: IndexPageUrl.functionOptionUrl + '?optionType=' + FunctionOption.dormitoryStudentType,
			name: '我的宿舍'
		},
		{
			image: ImageUrl.xuezaImg,
			url:'https://jzpt.hbjhart.cn/sm/netPay/payManage.do',
			name: '学杂缴费'
		},
		
		// {
		// 	image: ImageUrl.lostAndFound,
		// 	url: IndexPageUrl.lostAndFound,
		// 	name: '失物招领'
		// },
		]
	],
	initOption: [
		[
		{
			image: ImageUrl.wallet,
			url:'',
			name: '一卡通'
		},
		{
			image: ImageUrl.eletri_home,
			url:'',
			name: '电费'
		},
		// {
		// 	image: ImageUrl.water_home,
		// 	url: IndexPageUrl.toPayFee + '?isWater=2',
		// 	name: '水费'
		// },
		{
			image: ImageUrl.account_home,
			url:'',
			name: '余额'
		},
		{
			image: ImageUrl.ecode_home,
			url:'',
			name: '消费码'
		},
		{
			image: ImageUrl.lost_home,
			url:'',
			name: '卡挂失'
		},
		{
			image: ImageUrl.repair,
				url:'',
			name: '在线报修'
		}, 
		{
			image: ImageUrl.commonResource,
			url:'',
			name: "公共资源"
		},
	
	
		
		// {
		// 	image: ImageUrl.lostAndFound,
		// 	url: IndexPageUrl.lostAndFound,
		// 	name: '失物招领'
		// },
		]
	],
	// 教师功能选项
	teacherOption: [
		[{
			image: ImageUrl.wallet,
			url: IndexPageUrl.walletIndexUrl,
			name: '一卡通'
		}, 
		{
			image: ImageUrl.eletri_home,
			url: IndexPageUrl.toPayFee+ '?isWater=5',
			name: '电费'
		},
		// {
		// 	image: ImageUrl.water_home,
		// 	url: IndexPageUrl.toPayFee + '?isWater=2',
		// 	name: '水费'
		// },
		{
			image: ImageUrl.account_home,
			url: IndexPageUrl.toPay ,
			name: '余额'
		},
		{
			image: ImageUrl.ecode_home,
			url: IndexPageUrl.paymentCode,
			name: '消费码'
		},
		{
			image: ImageUrl.lost_home,
			url: MinePageUrl.lossApply,
			name: '卡挂失'
		},
		{
			image: ImageUrl.repair,
			url: RepairPageUrl.studentRepairIndexUrl,
			name: '在线报修'
		}, {
			image: ImageUrl.commonResource,
			url: AppiontmentPageUrl.commonAreaUrl,
			name: "公共资源"
		}, {
			image: ImageUrl.attendace,
			url: AppiontmentPageUrl.attendanceIndexUrl,
			name: '会议考勤'
		}, {
			image: ImageUrl.shenpi,
			url: IndexPageUrl.approvalInfoUrl,
			name: '我的待办'
		}, {
			image: ImageUrl.myRoomImg,
			url: IndexPageUrl.functionOptionUrl + '?optionType=' + FunctionOption.dormitoryNotStudentType,
			name: '我的宿舍'
		},
		// {
		// 	image: ImageUrl.commonWater,
		// 	url: AppiontmentPageUrl.commonWatermeterUrl,
		// 	name: "公共用水"
		// },
		]
	],
	// 宿管功能选项
	dormAdminOption: [
		[{
			image: ImageUrl.roomManagerImg,
			url: IndexPageUrl.diviceManageUrl,
			name: '宿舍管理'
		}, {
			image: ImageUrl.totalManagerImg,
			url: IndexPageUrl.synthesizeQueryUrl,
			name: '综合查询'
		}]
	],
	// 辅导员功能选项
	counsellorAdminOption: [
		[{
			image: ImageUrl.classMangeImg,
			url: IndexPageUrl.manageClassUrl,
			name: '班级管理'
		}, {
			image: ImageUrl.studentManageImg,
			url: IndexPageUrl.manageClassDetailUrl,
			name: '学生管理'
		}, {
			image: ImageUrl.enterBedroom,
			url: AttendancePageUrl.blockManageUrl,
			name: '考勤计划'
		}, {
			image: ImageUrl.attendaceStatistics,
			url: AttendancePageUrl.attendaceStatisticsUrl,
			name: '考勤统计'
		}]
	],

	/**
	 * 个人中心列表
	 */
	// 学生 - 个人中心列表
	studentCenterList: [{
		imageSrc: ImageUrl.campusCard,
		url: IndexPageUrl.campusCardUrl,
		name: '最近消费'
	}, {
		name: '在线挂失',
		url: MinePageUrl.lossApply,
		imageSrc: ImageUrl.lossApply
	}, {
		name: '综合设置',
		url: MinePageUrl.set,
		imageSrc: ImageUrl.set
	}, {
		name: '操作记录',
		url: MinePageUrl.operatingRecord,
		imageSrc: ImageUrl.operatingRecord
	}, {
		name: '在线帮助',
		url: MinePageUrl.help,
		imageSrc: ImageUrl.help
	}, {
		name: '意见反馈',
		url: MinePageUrl.issueUpdata,
		imageSrc: ImageUrl.issue
	}, {
		name: '关于我们',
		url: MinePageUrl.about,
		imageSrc: ImageUrl.about
	}],
	// 教师 - 个人中心列表
	teacherCenterList: [{
		imageSrc: ImageUrl.campusCard,
		url: IndexPageUrl.campusCardUrl,
		name: '最近消费'
	}, {
		name: '在线挂失',
		url: MinePageUrl.lossApply,
		imageSrc: ImageUrl.lossApply
	}, {
		name: '综合设置',
		url: MinePageUrl.set,
		imageSrc: ImageUrl.set
	}, {
		name: '操作记录',
		url: MinePageUrl.operatingRecord,
		imageSrc: ImageUrl.operatingRecord
	}, {
		name: '在线帮助',
		url: MinePageUrl.help,
		imageSrc: ImageUrl.help
	}, {
		name: '意见反馈',
		url: MinePageUrl.issueUpdata,
		imageSrc: ImageUrl.issue
	}, {
		name: '关于我们',
		url: MinePageUrl.about,
		imageSrc: ImageUrl.about
	}],
	// 宿舍管理员 - 个人中心列表
	dormAdminCenterList: [{
		imageSrc: ImageUrl.myWallet,
		url: IndexPageUrl.walletIndexUrl,
		name: '一卡通'
	}, {
		imageSrc: ImageUrl.campusCard,
		url: IndexPageUrl.campusCardUrl,
		name: '消费记录'
	}, {
		name: '在线挂失',
		url: MinePageUrl.lossApply,
		imageSrc: ImageUrl.lossApply
	}, {
		name: '综合设置',
		url: MinePageUrl.set,
		imageSrc: ImageUrl.set
	}, {
		name: '在线帮助',
		url: MinePageUrl.help,
		imageSrc: ImageUrl.help
	}, {
		name: '意见反馈',
		url: MinePageUrl.issueUpdata,
		imageSrc: ImageUrl.issue
	}, {
		name: '关于我们',
		url: MinePageUrl.about,
		imageSrc: ImageUrl.about
	}],
	// 辅导员 - 个人中心列表
	counsellorAdminCenterList: [{
		imageSrc: ImageUrl.myWallet,
		url: IndexPageUrl.walletIndexUrl,
		name: '一卡通'
	}, {
		imageSrc: ImageUrl.campusCard,
		url: IndexPageUrl.campusCardUrl,
		name: '消费记录'
	}, {
		name: '在线挂失',
		url: MinePageUrl.lossApply,
		imageSrc: ImageUrl.lossApply
	}, {
		name: '综合设置',
		url: MinePageUrl.set,
		imageSrc: ImageUrl.set
	}, {
		name: '在线帮助',
		url: MinePageUrl.help,
		imageSrc: ImageUrl.help
	}, {
		name: '意见反馈',
		url: MinePageUrl.issueUpdata,
		imageSrc: ImageUrl.issue
	}, {
		name: '关于我们',
		url: MinePageUrl.about,
		imageSrc: ImageUrl.about
	}],
	// 维修工 - 个人中心列表
	maintainAdminCenterList: [{
		imageSrc: ImageUrl.myWallet,
		url: IndexPageUrl.walletIndexUrl,
		name: '一卡通'
	}, {
		imageSrc: ImageUrl.house,
		url: IndexPageUrl.functionOptionUrl + '?optionType=' + FunctionOption.dormitoryType,
		name: '我的宿舍'
	}, {
		imageSrc: ImageUrl.campusCard,
		url: IndexPageUrl.campusCardUrl,
		name: '消费记录'
	}, {
		name: '在线挂失',
		url: MinePageUrl.lossApply,
		imageSrc: ImageUrl.lossApply
	}, {
		name: '综合设置',
		url: MinePageUrl.set,
		imageSrc: ImageUrl.set
	}, {
		name: '在线帮助',
		url: MinePageUrl.help,
		imageSrc: ImageUrl.help
	}, {
		name: '意见反馈',
		url: MinePageUrl.issueUpdata,
		imageSrc: ImageUrl.issue
	}, {
		name: '关于我们',
		url: MinePageUrl.about,
		imageSrc: ImageUrl.about
	}],
	//我的考勤列表
	attendanceList: [
		[{
			name: "归寝考勤",
			url: AttendancePageUrl.studentIndexUrl,
			image: ImageUrl.attendanceBackBedrrom
		}, {
			name: "会议考勤",
			url: AppiontmentPageUrl.attendanceIndexUrl,
			image: ImageUrl.attendanceMeeting
		}]
	],

	/**
	 * 设置列表
	 */
	// 学生、教师 - 设置列表
	studentSetList: [{
		name: '交易限额',
		bindtap: 'doSetLimit'
	}, {
		name: '修改密码',
		bindtap: 'passwordAlter'
	}, {
		name: '消费机显示',
		bindtap: 'selectModel'
	}, 
	{
		name: '退出登录',
		bindtap: 'clearStorage'
	},
	],
	adminSetList: [{
		name: '交易限额',
		bindtap: 'doSetLimit'
	}, {
		name: '修改密码',
		bindtap: 'passwordAlter'
	}, {
		name: '消费机显示',
		bindtap: 'selectModel'
	}, 
	{
		name: '退出登录',
		bindtap: 'clearStorage'
	},
	{
		name: '切换角色',
		bindtap: 'doSwitchRole'
	}],
	// 宿管、辅导员、维修工 - 设置列表
	adminSetListOfRole: [
		{
			name: '修改密码',
			bindtap: 'passwordAlter'
		}, 
		{
			name: '退出登录',
			bindtap: 'clearStorage'
		}, 
		{
			name: '切换角色',
			bindtap: 'doSwitchRole'
		},
	],
	
	SingeSetListOfRole: [{
		name: '修改密码',
		bindtap: 'passwordAlter'
	}, 
	{
		name: '退出登录',
		bindtap: 'clearStorage'
	},
	],

	/**
	 * navbar数组
	 */
	// 操作记录navbar的tabs
	operatingRecordTabs: [{
		name: "全部",
		click: 'tabClick'
	}, {
		name: "门锁",
		click: 'tabClick'
	}, {
		name: "水表",
		click: 'tabClick'
	}, {
		name: "其它",
		click: 'open'
	}],
	// 报修管理navbar的tabs
	repairManageTabs: [{
		name: "全部",
		click: 'tabClick'
	}, {
		name: "待分配",
		click: 'tabClick'
	}, {
		name: "待接单",
		click: 'tabClick'
	}, {
		name: "处理中",
		click: 'tabClick'
	}, {
		name: "已完成",
		click: 'tabClick'
	}, {
		name: "已拒绝",
		click: 'tabClick'
	}]
};
module.exports = arrayConstant;
