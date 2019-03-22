const app = getApp()
import Config from '../../etc/config.js';
Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    userInfo: {},
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    content:[],
    form:{name:'',time:'',header:'',content:''}
  },
  onLoad: function () {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
        console.log(that.data.userInfo)
      }
    })
    this.getMessageList();
  },
  subMessage: function () {
    let that = this;
    console.log('this.data.form.content', this.data.form.content.length);
    if (this.data.form.content == ' ' || this.data.form.content.length!=0){
      wx.showToast({ title: '内容不能为空', icon:'none'});
      return;
    }
    // wx.showLoading();
    this.setData({ 'form.name': this.data.userInfo.nickName, 'form.header': this.data.userInfo.avatarUrl});
    Config.subMessage(that.data.form).then(function(data){
      wx.showToast({ title: '留言成功' });
      that.getMessageList();
    },function(error){
      wx.showToast({ title: '留言失败',icon:'none' });
    })
  },
  //获取留言列表
  getMessageList: function () {
    let that = this;
    Config.getMsgList().then(function(data){
      console.log('res.data', data);
      that.setData({ content:data.data});
    },function(error){
      console.log('error', error);
    })
  },
  //提交留言
  inputedit: function (e) {
    // 1. input 和 info 双向数据绑定
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    this.setData({
      'form.content': value
    });
  }
})
