// pages/someone/someone.js
const $api = require('../../utils/api.js').API;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    someoneList: [],
    ifOpen: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    $api.getSomeoneDetail(app.globalData.someoneId).then(res => {
      if (res.statusCode == 400) {
        this.setData({
          ifOpen: 'true'
        })
        return
      } else {
        this.setData({
          someoneList: res.data.data,
          ifOpen: 'false'
        })
        console.log(res)
      }
    })
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