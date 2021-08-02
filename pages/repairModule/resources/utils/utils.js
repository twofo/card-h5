var app = getApp().globalData;
/**
 * 根据设备id获取设备名
 */

function deviceType(id) {
  let name = '';

  if (id == 0) {
    name = '其它';
  } else if (id == 1) {
    name = '门锁';
  } else if (id == 2) {
    name = '水表';
  } else if (id == 3) {
    name = '消费机';
  } else if (id == 4) {
    name = '电表';
  } else if (id == 5) {
    name = '空调电表';
  }

  return name;
}
/**
 * 根据设备id获取设备名
 */


function status(statusId) {
  let name = '';

  if (statusId == 1) {
    name = '待分配';
  } else if (statusId == 2) {
    name = '待接单';
  } else if (statusId == 3) {
    name = '处理中';
  } else if (statusId == 4) {
    name = '已完成';
  } else if (statusId == 5) {
    name = '已评价';
  } else if (statusId == 6) {
    name = '已拒绝';
  }

  return name;
}

module.exports = {
  status: status,
  deviceType: deviceType
};