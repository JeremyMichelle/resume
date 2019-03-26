export default {
  // 线上环境
  basePath: 'https://guozhuangxin.cn/',
  // domain: 'https://guozhuangxin.cn/',
  // appid: "wx0ff7cd42eb1029f8"
  // 本地环境
  // basePath: 'http://localhost:3001/', 
  // domain: 'https://guozhuangxin.cn/', 
  ajax: function (url,params,method) {
    params = (params == undefined ? {} : params);
    method = (method == undefined ? 'GET' : method);
    console.log('params', params);
    console.log('params', method)
    let that = this;
    return new Promise(function (resolve,reject) {
      wx.request({
        url: that.basePath + url,
        data: params,
        method: method,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          resolve(res);
        },
        fail(error) {
          reject(error);
        },
        complete(final) {

        }
      })
    });
    
  },
  getMsgList: function (params) {
    let url = 'messageList';    
    let method = 'GET';
    return this.ajax(url,params,method);
  },
  subMessage: function (params) {
    let url = 'subMessage';
    let method = 'POST';
    return this.ajax(url, params, method);
  }
}