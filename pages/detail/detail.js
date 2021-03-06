// pages/detail/detail.js
const $api = require('../../utils/api.js').API;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList: [],
    coment: '',
    bottom: '1',
    block: 'block',
    zindex: true,
    reason_input: '',
    comment_list: [],
  },
  popup: function() {
    this.animation.height(160).step()
    this.setData({
      animation: this.animation.export()
    })
    this.setData({
      bottom: '0',
      block: 'none',
      zindex: false
    })
  },
  drop_down: function() {
    this.animation.height(0).step()
    this.setData({
      animation: this.animation.export(),
      block: 'block',
      zindex: true
    })
  },
  send: function() {
    let that = this
    this.animation.height(0).step()
    this.setData({
      animation: this.animation.export(),
      block: 'block',
      zindex: true
    })
    if (this.data.reason_input == '') {
      return
    } else {
      $api.addComment(app.globalData.detail, this.data.reason_input).then(res => {
        if (res.statusCode == 201) {
          that.setData({
            reason_input: ''
          })
          that.gets()
        }
      })
    }
  },
  bind: function(e) {
    this.setData({
      reason_input: e.detail.value
    })
  },
  gets: function() {
    $api.getComment('a', app.globalData.detail).then(res => {
      this.setData({
        comment_list: res.data.data.results
      })
    })
  },
  getUserDetail: function(e) {
    getApp().globalData.someoneId = e.currentTarget.dataset.someoneid
    wx.navigateTo({
      url: '../someone/someone',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    $api.details(app.globalData.detail).then(res => {
      this.setData({
        detailList: res.data.data,
        coment: res.data.data.content.replace(/\<img/gi, '<img style="max-width:290px;height:auto"')
      })
    })
    // 评论
    this.gets()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.animation = wx.createAnimation({
      duration: 300
    })
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