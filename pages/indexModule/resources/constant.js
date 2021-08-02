/**
 * 静态常量 
 * 
 */
var constant = {
  /**
   * 功能选项
   */

  /**************************************************** 审核模块 ********************************************************/

  /**
  * 默认值 审核状态选项
  */
  approvalStatusDefault: {
    id: '0',
    name: '待办',
    type: 1
  },

  /**
   * 公共的 审核状态选项
   */
  approvalStatusOptions: [
		{
    approval_id: '1',
    approval_name: '已完成'
		},
	],

  /**
   * 默认值 审核类型选项
   */
  approvalTypeDefault: {
    id: '1',
    name: '会议补签/请假审核',
    type: 2
  },

  /**
  * 公共的 审核类型选项
  */
  publicApprovalTypeOptions: [],

  /**
   * 铺导员 审核类型选项
   */
  counsellorApprovalTypeOptions: [{
    approval_id: '2',
    approval_name: '留校审核'
  }, {
    approval_id: '3',
    approval_name: '外宿审核'
  }, {
    approval_id: '4',
    approval_name: '归寝请假审核'
  }],

  /**
   * 资源管理员
   */
  resourceAdminApprovalTypeOptions: [{
    approval_id: '5',
    approval_name: '会议室预约审核'
  }],

  /***
   * 责任教师角色
   */
  dutyteacherApprovalTypeOptions: [{
    approval_id: '6',
    approval_name: '练功房预约审核'
  }],

  /**************************************************** 综合查询 ********************************************************/
  queryDefault: {
    id: '1',
    name: '留校记录',
    type: 2
  },
  queryOptions: [{
    query_id: '2',
    query_name: '外宿记录'
  }, {
    query_id: '3',
    query_name: '调宿记录'
  }, {
    query_id: '4',
    query_name: '退宿记录'
  }, {
    query_id: '5',
    query_name: '归寝记录'
  }],
  timeDefault: {
    id: '1',
    name: '近一天',
    type: 1
  },
  timeOptions: [{
    query_id: '2',
    query_name: '近一周'
  }, {
    query_id: '3',
    query_name: '近一月'
  }]
};
module.exports = constant;