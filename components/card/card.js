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
    display: 'display:flex;',
    boxStyle: 'border-bottom: 1px solid #e5e5e5;padding: 10px;',
    name: '',
    border: 'width:100px;height:100px;'
  },
  onLoad: function(options) {},
  lifetimes: {
    created() {
      let that = this
      $api.getArticles(0, 1594363544516, 1).then(res => {
        //请求成功
        that.setData({
          testValue: res.data.data.results
        })
      }).catch(err => {
        //请求失败
      })
    }
  },
  methods: {
    errorFuntion: function(e) {},
    // resolvingDate: function(date) {
    //   //date是传入的时间
    //   let d = new Date(date);

    //   let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
    //   let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    //   let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    //   let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    //   let sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

    //   let times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;

    //   return times
    // }
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
  onReady: function() {},
})