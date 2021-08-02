/**
 * 请求路径 
 * 
 * payRequestUrl的请求地址
 */
var BaseUrl = require("../common.js");
var payRequestUrl = BaseUrl.payRequestUrl; //清远
// var payRequestUrl = 'https://keyunzhihui.com/pay'//生产支付环境  V2.0
//var payRequestUrl = "http://192.168.1.167:8998";//张家玮
var payRequestUrl = {
  payRequestUrl,
    /** 小程序 **/
  // 获取授权码
  getOpenID: `${payRequestUrl}/xcxPay/getOpenID`,
  // 微信预充值接口
  cxcOrder: `${payRequestUrl}/xcxPay/cxcOrder`,
  // 微信关闭充值订单接口
  cxcClose: `${payRequestUrl}/xcxPay/close`,

  // 获取分享二维码
  getShareCode: `${payRequestUrl}/pay/getShareCode`,
  // 获取付款二维码
  getCode: `${payRequestUrl}/pay/getCode`,
  //单点登录的接口
    casAuth : `${payRequestUrl}/rest/casAuth  `,

    /**  H5  **/
    // 微信支付接口
	payforUrl: `${payRequestUrl}/wxPay/placeOrderH5`,
	//获取微信支付结果 成功/失败
	payforwxUrl:`${payRequestUrl}/wxPay/query`,
    // 微信H5关闭订单
    closewWxOrder:`${payRequestUrl}/wxPay/close`,
	// 农行支付接口
	payforABCUrl: `${payRequestUrl}/abchina/placeOrder`,
	
	// 支付宝支付接口
	// payforZFBUrl: `http://pay.keyunzhihui.com/aliPay/h5Pay`,
	payforZFBUrl: `${payRequestUrl}/aliPay/h5Pay`,
    // 支付宝获取授权码
    AliPayGetOpenID: `${payRequestUrl}/aliPay/getOpenId`,
	
	//余额支付
	YEPayUrl: `${payRequestUrl}/pay/sysBalance`
	
	
};
module.exports = payRequestUrl;