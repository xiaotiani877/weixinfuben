//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  enter: function() {
    wx.navigateTo({
      url: '../login/login',
    })
  }
})