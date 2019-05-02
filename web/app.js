//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    var that = this;
    wx.setStorageSync('logs', logs)
    wx.getUserInfo({success:function(res){
      that.globalData.userInfo = res.userInfo
    }})
  },
  globalData: {
    userInfo: null
  }
})