const $api = require('../../utils/api.js').API;
// const app = getApp()
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
    boxStyle: 'border-bottom: 1px solid #e5e5e5;padding: 10px;',
    name: ''
  },
  onLoad: function(options) {
  },
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
  methods: {}
})