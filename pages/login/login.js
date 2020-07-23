// pages/login/login.js
const $api = require('../../utils/api.js').API;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: "13196893501",
    code: ''
  },
  enter: function() {
    $api.enter(this.data.mobile, this.data.code).then(res => {
      // 请求成功
      
      wx.switchTab({
        url: '../user/user',
      })
      this.setData({
        moblie: '',
        code: ''
      })
      const token = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      };
      console.log(token)
    }).catch(err => {
      // 请求失败
    })

  },
  postMoblie: function(e) {
    this.setData({
      moblie: e.detail.value
    })
  },
  postCode: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  getVer: function() {
    // console.log(this.data.moblie)
    $api.getVer(this.data.moblie).then(res => {
      //请求成功
      // console.log(res)
    }).catch(err => {
      //请求失败
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
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