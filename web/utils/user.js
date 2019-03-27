const setUserInfo = () => {
  let userInfo = this.getUserInfo();
    wx.getUserInfo({
      success: function (res) {
        wx.setStorage({ key: 'userHeader', data: res.userInfo.avatarUrl});
        wx.setStorage({ key: 'userName', data: res.userInfo.nickName });
      }
    })
  
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const getUserInfo = () => {
  
  return { userHeader: wx.getStorage({ key: 'userHeader' }), userName: wx.getStorage({ key: 'userName' })}
}

module.exports = {
  setUserInfo: setUserInfo,
  getUserInfo: getUserInfo
}
