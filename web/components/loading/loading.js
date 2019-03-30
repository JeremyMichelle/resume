// components/myself-information.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    loadingHidden: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPullDownRefresh: function () {
      this.setData({
        loadingHidden: false
      });
      var that = this;
      wx.request({
        url: 'https://www.geekxz.com/action/works/recWorks',
        data: {
          num: '5',
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data.data.works);
          that.setData({
            recWorks: res.data.data.works,
          })
        },
        complete: function () {        // complete
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh()      //停止下拉刷新
        }
      })
      setTimeout(function () {
        that.setData({
          loadingHidden: true
        });
      }, 2000);
    }
  }
})