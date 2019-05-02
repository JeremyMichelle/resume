const app = getApp()
import Config from '../../etc/config.js';
import Util from '../../utils/util.js';
import User from '../../utils/user.js';
Page({
  data: {
    userInfo: {},
    imgUrls: [
      Config.basePath + 'imgs/g1.png',
      Config.basePath + 'imgs/g2.jpeg',
      Config.basePath + 'imgs/g3.jpeg',
      Config.basePath + 'imgs/g4.jpeg',
      Config.basePath + 'imgs/g5.jpeg'
    ],
    // indicatorDots: false,
    // autoplay: true,
    // interval: 5000,
    // duration: 1000,
    content:[],
    header: Config.basePath+'imgs/header.png',
    bg: Config.basePath + 'imgs/bg.jpeg',
    form:{name:'',time:'',header:'',content:''},
    pageNo: 1, 
    pageSize: 10,
    lastPage:false,
    isAccredit:false,
    //判断是否显示自定义loading，暂不用
    // isLoading:true
  },
  onLoad: function () {
    var that = this
    this.getMessageList();
    // that.setData({ isLoading:false})
  },
  // accredit: function (e) {
  //   let that = this;
  //   if (!e.detail.userInfo) {
  //     that.setData({ isAccredit: false });
  //     return;
  //   } else {
  //     that.setData({ isAccredit:true});
  //   }
  // },
  //提交留言表单
  subMessage: function (e) {
    if (!e.detail.userInfo){
      wx.showToast({ title: '请先授权', icon: 'none' });
      return;
    }
    let that = this;
    wx.showLoading();
    //获取用户信息
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
        //非空判断
        if (that.data.form.content == '' || that.data.form.content.length == 0) {
          wx.showToast({ title: '内容不能为空', icon: 'none' });
          return;
        }
        //提交留言
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
      //转换日期格式
      temp.forEach(function (val, i, arr) {
        temp[i].time = val.time.split('.')[0].replace('T', ' ');
      });
      //分页加载判断
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
  //留言字段双向数据绑定
  inputedit: function (e) {
    // 1. input 和 info 双向数据绑定
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    this.setData({
      'form.content': value
    });
  },
  //加载更多留言
  onReachBottom() {
    let that = this;
    if (that.data.lastPage) {
      return;
    }
    that.setData({ pageNo: ++that.data.pageNo });
    that.getMessageList();
  },
  //下拉刷新
  onPullDownRefresh () {
    
    this.setData({ pageNo: 1 });
    this.getMessageList();
  }
})
