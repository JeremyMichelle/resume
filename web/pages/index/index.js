const app = getApp()
import Config from '../../etc/config.js';
import Util from '../../utils/util.js';
Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    userInfo: {},
    imgUrls: [
      Config.basePath+'imgs/g1.png',
      Config.basePath + 'imgs/g2.jpeg',
      Config.basePath + 'imgs/g3.jpeg',
      Config.basePath + 'imgs/g4.jpeg',
      Config.basePath + 'imgs/g5.jpeg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    content:[],
    warpHeight:'',
    header: Config.basePath+'imgs/header.png',
    bg: Config.basePath + 'imgs/bg.jpeg',
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
    var self = this;
      wx.getSystemInfo({
        success: function (res) {
          that.setData({ warpHeight: res.windowHeight+'px'})
        }, fail: function (res) { }
      })
  },
  //提交留言表单
  subMessage: function () {
    let that = this;
    console.log('this.data.form.content', this.data.form.content.length);
    if (this.data.form.content == '' || this.data.form.content.length==0){
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
      let temp = data.data;
      temp.forEach(function (val,i,arr) {
        temp[i].time = val.time.split('.')[0].replace('T',' ');
      });
      that.setData({ content:temp});
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
  },
  upper(e) {
    console.log(e)
  },
})
