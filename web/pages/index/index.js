const app = getApp()
import Config from '../../etc/config.js';
import Util from '../../utils/util.js';
import User from '../../utils/user.js';
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
    header: Config.basePath+'imgs/header.png',
    bg: Config.basePath + 'imgs/bg.jpeg',
    form:{name:'',time:'',header:'',content:''},
    pageNo: 1, 
    pageSize: 10,
    lastPage:false,
    isAccredit:false
  },
  onLoad: function () {
    var that = this
    wx.authorize({ scope: 'scope.userInfo', success: function () { }, fail: function () { } });
    // wx.getUserInfo({
    //   success: function (res) {
    //     that.setData({
    //       userInfo: res.userInfo
    //     })
    //     console.log(that.data.userInfo)
    //   }
    // })
    this.getMessageList();

  },
  accredit: function (e) {
    let that = this;
    if (!e.detail.userInfo) {
      // wx.showToast({ title: '请先授权', icon: 'none' });
      that.setData({ isAccredit: false });
      return;
    } else {
      that.setData({ isAccredit:true});
    }
  },
  //提交留言表单
  subMessage: function (e) {
    if (!e.detail.userInfo){
      wx.showToast({ title: '请先授权', icon: 'none' });
      return;
    }
    let that = this;
    wx.showLoading();
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
        if (that.data.form.content == '' || that.data.form.content.length == 0) {
          wx.showToast({ title: '内容不能为空', icon: 'none' });
          return;
        }
        that.setData({ 'form.name': that.data.userInfo.nickName, 'form.header': that.data.userInfo.avatarUrl });
        Config.subMessage(that.data.form).then(function (data) {
          that.setData({ 'form.content': '' });
          wx.showToast({ title: '留言成功' });
          that.setData({ pageNo: 1 });
          that.getMessageList();
        }, function (error) {
          wx.showToast({ title: '留言失败', icon: 'none' });
        })
      }
    })
  },
  //获取留言列表
  getMessageList: function () {
    let that = this;
    Config.getMsgList({ pageNo: that.data.pageNo, pageSize: that.data.pageSize}).then(function(data){
      let temp = data.data;
      temp.forEach(function (val, i, arr) {
        temp[i].time = val.time.split('.')[0].replace('T', ' ');
      });
      if(that.data.pageNo == 1){
        that.setData({ content: temp, lastPage: data.lastPage });
      }else{
        that.setData({ content: that.data.content.concat(temp), lastPage: data.lastPage });
      }
      wx.stopPullDownRefresh();
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
  onReachBottom() {
    let that = this;
    if (that.data.lastPage) {
      return;
    }
    that.setData({ pageNo: ++that.data.pageNo });
    that.getMessageList();
  },
  onPullDownRefresh () {
    
    this.setData({ pageNo: 1 });
    this.getMessageList();
  }
})
