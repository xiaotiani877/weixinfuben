// pages/user/user.js
const $api = require('../../utils/api.js').API;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    userList: []
  },
  logins: function() {
    wx.redirectTo({
      url: '../login/login'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const token = wx.getStorageSync('token')
    if (token) {
      $api.getUsers().then(res => {
        getApp().globalData.user_id = res.data.data.id
        this.setData({
          userList: res.data.data
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      token: wx.getStorageSync('token')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})