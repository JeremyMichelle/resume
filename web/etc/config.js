export default {
  // 线上环境
  basePath: 'https://guozhuangxin.cn/',
  // domain: 'https://guozhuangxin.cn/',
  // appid: "wx0ff7cd42eb1029f8"
  // 本地环境
  basePath: 'http://localhost:3001/', 
  // domain: 'https://guozhuangxin.cn/',
  // ajax封装 
  ajax: function (url,params,method) {
    params = (params == undefined ? {} : params);
    method = (method == undefined ? 'GET' : method);
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
          resolve(res.data);
        },
        fail(error) {
          reject(error);
        },
        complete(final) {

        }
      })
    });
    
  },
  //留言列表接口
  getMsgList: function (params) {
    let url = 'messageList';    
    let method = 'GET';
    return this.ajax(url,params,method);
  },
  //提交留言接口
  subMessage: function (params) {
    let url = 'subMessage';
    let method = 'POST';
    return this.ajax(url, params, method);
  }
}