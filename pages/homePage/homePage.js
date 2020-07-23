const $api = require('../../utils/api.js').API;
var app = getApp()
Page({
  data: {
    able_item: [],
    display: 'block',
    abel_bar_display: 'block',
    testValue: [],
    search_input: '',
    focuss: false,
    valueInput: '',
    search_association: [],
    cancel_display: 'none',
    windowWidth: '',
    checkId: '',
    indexs: '0',
    mSelecteds: '',
    passValue: []
  },
  onLoad: function(options) {},
  onReady: function() {
    let that = this
    that.setData({
      windowWidth: (wx.getSystemInfoSync().windowWidth - 35) / 4
    })
    wx.request({
      url: "http://ttapi.research.itcast.cn/app/v1_0/user/channels",
      method: "GET",
      success: function(res) {
        that.setData({
          able_item: res.data.data.channels
        })
      }
    })
    this.animation = wx.createAnimation({
      duration: 300
    })
    this.animations = wx.createAnimation({
      duration: 300
    })
    this.abel_bar = this.selectComponent('#abel_bar')
  },
  onItemTap: function(e) {
    //接收abel-bar传进来的值，再设置给testValue
    //component-test内部就会自动修改值
    this.setData({
      passValue: e.detail.passValue,
      testValue: e.detail.passValue[e.detail.indexs].list,
      indexs: e.detail.indexs
    })
    this.setData({
      mSelecteds: this.data.indexs
    })
  },
  onItemTaps: function(e) {
    console.log(e.detail.passValue)
    this.setData({
      passValue: e.detail.passValue,
      testValue: e.detail.passValue[this.data.indexs].list
    })
    if (this.data.indexs == '0') {
      getApp().globalData.startCard = e.detail.passValue[0].list
    }
  },
  searchFocus: function() {
    this.animation.left('40%').step()
    this.animations.opacity(0.2).left('19%').step()
    this.setData({
      animation: this.animation.export(),
      animations: this.animations.export(),
      display: 'none',
      abel_bar_display: 'none',
      focuss: true,
      cancel_display: 'block'
    })
  },
  searchInput: function(e) {
    if (e.detail.value == '') {
      this.setData({
        search_association: []
      })
    } else {
      this.setData({
        search_input: e.detail.value
      })
      $api.getAssociation(e.detail.value).then(res => {
        this.setData({
          search_association: res.data.data.options
        })
      })
    }
  },
  cancel: function() {
    this.animations.left('50%').opacity(1).step()
    this.animation.left('50%').step()
    this.setData({
      valueInput: '',
      animation: this.animation.export(),
      animations: this.animations.export(),
      display: 'block',
      abel_bar_display: 'block',
      focuss: false,
      search_association: [],
      search_input: '',
      cancel_display: 'none'
    })
    let that = this
    that.setData({
      testValue: that.data.indexs == '0' ? app.globalData.startCard : that.data.passValue[that.data.indexs].list
    })
  },
  search_touch: function(e) {

    $api.getAssociations(e.currentTarget.dataset.association).then(res => {
      this.setData({
        display: 'block',
        abel_bar_display: 'none',
        testValue: res.data.data.results,
        valueInput: e.currentTarget.dataset.association
      })
    })
  },
  onReachBottom() {
    let that = this
    if (that.data.search_input == '') {
      let abel_bar = that.abel_bar
      abel_bar.zbc() // 调用自定义组件中的方法
    }else{
      
    }
  }
})