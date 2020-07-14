const $api = require('../../utils/api.js').API;

Page({
  data: {
    testValue: []
  },
  onLoad: function(options) {
  },
  onItemTap: function(e) {
    //接收abel-bar传进来的值，再设置给testValue
    //component-test内部就会自动修改值
    this.setData({
      testValue: e.detail.passValue
    })
  }
})