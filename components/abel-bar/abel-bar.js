const $api = require('../../utils/api.js').API;
var app = getApp()
Component({
  //  组件的属性列表
  properties: {
    height: {
      type: String,
      value: '120'
    },
    textColor: {
      type: String,
      value: '#666666'
    },
    textSize: {
      type: String,
      value: '28'
    },
    selectColor: {
      type: String,
      value: '#FE9036'
    },
    mSelecteds: {
      type: String
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    scrollStyle: 'border-bottom: 1px solid #e5e5e5;',
    left: '0',
    right: '750',
    bottom: '0',
    mSelected: "0",
    lastIndex: 0,
    transition: 'left 0.5s, right 0.2s',
    windowWidth: 375,
    domData: '0',
    textDomData: [],
    mDataCus: [],
    idItem: [],
    items: []
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onItemTap: function(e) {
      const index = e.currentTarget.dataset.index;
      var checkId = this.data.idItem.channels[index].id
      const date = new Date().getTime()
      if (this.data.items[index].list) {
        this.triggerEvent('onItemTap', {
          passValue: this.data.items,
          indexs: e.currentTarget.dataset.index
        })
      } else {
        $api.getArticles(checkId, date).then(res => {
          this.data.items[index]['list'] = res.data.data.results
          // 组件传值
          this.triggerEvent('onItemTap', {
            passValue: this.data.items,
            indexs: e.currentTarget.dataset.index
          })
        }).catch(err => {
          //请求失败
        })
      }

      let str = this.data.lastIndex < index ? 'left 0.5s, right 0.2s' : 'left 0.2s, right 0.5s';
      this.setData({
        transition: str,
        lastIndex: index,
        mSelected: index,
        domData: e.currentTarget.dataset.index
      })
    },
    zbc: function() {
      console.log(this.data.domData)
      const date = new Date().getTime()
      $api.getArticles(this.data.domData, date).then(res => {
        if (this.data.domData == '0') {
          this.data.items[0]['list'] = app.globalData.startCard.concat(res.data.data.results)
          this.triggerEvent('onItemTaps', {
            passValue: this.data.items,
          })
        } else {
          this.data.items[this.data.domData]['list'] = this.data.items[this.data.domData]['list'].concat(res.data.data.results)
          this.triggerEvent('onItemTaps', {
            passValue: this.data.items,
          })
        }
      }).catch(err => {
        //请求失败
      })
    },
    abcd:function(){
      
    }
  },
  lifetimes: {
    created() {},
    attached() {
      let that = this
      wx.request({
        url: "http://ttapi.research.itcast.cn/app/v1_0/user/channels",
        method: "GET",
        success: function(res) {
          that.setData({
            idItem: res.data.data,
            items: res.data.data.channels
          })
          that.data.items[0]['list'] = app.globalData.startCard
        }
      })
    },
    ready() {
      this.setData({
        mSelected: this.data.mSelecteds
      })
    }
  }
})