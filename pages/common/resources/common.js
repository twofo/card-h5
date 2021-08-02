/**
 * 基础请求路径 
 */
// var websocketpath='ws://ykt.hbjhart.cn/socket';  
// var baseUrl = 'http://ykt.hbjhart.cn'  // 江汉使用
// var baseUrl = 'http://hbykt.keyunzhihui.com'; //33环境 
// var websocketpath = 'ws://hbykt.keyunzhihui.com/socket';
var baseUrl = 'https://keyunzhihui.com'; //49环境 16 V2.0
 var websocketpath='ws://socketdevtest.keyunzhihui.com'; //49环境
// var baseUrl = 'http://192.168.1.88:8088';  // 江汉使用

// var baseUrl = 'http://192.168.1.60:8088';  // 江汉使用

// var baseUrl ='http:// 192.168.1.172';  // 江汉使用
var baseUrl = {
    baseUrl: baseUrl,   
     websocketpath:websocketpath,
	  // baseRequestUrl: baseUrl + '/sec', //本地环境 江汉
	  // payRequestUrl: baseUrl + '/paysec', //本地环境 江汉
	  // appoprRequestUrl: baseUrl + '/appopr',  //本地环境 江汉
  // baseRequestUrl: baseUrl + '/rest', //33环境 
  // payRequestUrl: baseUrl + '/paysec', //33环境 
  // appoprRequestUrl: baseUrl + '/appopr',  //33环境 
  
  baseRequestUrl: baseUrl + '/devsec', //本地环境 49
    payRequestUrl: baseUrl + '/devpay', //本地环境 49
    appoprRequestUrl: baseUrl + '/devappopr',  //本地环境 49
   // baseRequestUrl: 'http://192.168.1.172:8088/rest', //李湘 
   // payRequestUrl:  'http://192.168.1.172:8998', //本地环境 49
   // appoprRequestUrl:  'http://192.168.1.33:8090',  //本地环境 49
   
   
   
   
   //  baseRequestUrl:'http://192.168.1.88:8088/rest',	
   //       payRequestUrl:'http://192.168.1.88:8999',
   //       appoprRequestUrl:'http://192.168.1.88:8090' 
};
module.exports = baseUrl;