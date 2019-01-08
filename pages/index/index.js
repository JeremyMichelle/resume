const app = getApp()
Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    userInfo: {}
  },
  onLoad: function () {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
  }
})
