const $api = require('../../utils/api.js').API;
const app = getApp()
Component({
  // 组件的属性列表
  properties: {
    testValue: {
      type: Array, //属性名
      value: [] //属性初始值
    },
    items: {
      type: Array,
      value: []
    }
  },
  data: {
    clickIndex: '',
    display: 'display:flex;justify-content: space-between;',
    boxStyle: 'border-bottom: 1px solid #e5e5e5;padding: 10px;',
    name: '',
    border: 'width:100px;height:100px;',
    indexs: '1'
  },
  onLoad: function(options) {},
  lifetimes: {
    created(e) {
      let that = this
      const date = new Date().getTime()
      $api.getArticles(0, date).then(res => {
        if (res.statusCode == 401) {
          wx.removeStorageSync('token')
        } else {
          //请求成功
          that.setData({
            testValue: res.data.data.results
          })
          getApp().globalData.startCard = res.data.data.results
        }
      }).catch(err => {
        //请求失败
      })
    }
  },
  methods: {
    errorFuntion: function(e) {},
    details: function(e) {
      getApp().globalData.detail = e.currentTarget.dataset.art_id
      wx.navigateTo({
        url: '../../pages/detail/detail',
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: {},
  pageLifetimes: {
    show: function() {
      console.log(1)
    }
  }
})