const themes = {
  smallBar: 'smallBar'
}
const $api = require('../../utils/api.js').API;
var app = getApp()
Component({
  //  组件的属性列表
  properties: {
    itemList: {
      type: Array,
      value: []
    },
    items: {
      type: Array,
      value: []
      // observer: function(newVal, oldVal, changedPath) {
      //   if (newVal && newVal.length < 4) {
      //     this.setData({
      //       itemWidth: (750 / newVal.length) - 60
      //     })
      //   } else {
      //     this.setData({
      //       itemWidth: (750 / 4) - 60
      //     })
      //   }
      // }
    },
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
    selected: {
      type: String,
      value: '0',
      observer: function(newVal) {
        this.setData({
          mSelected: newVal
        })
      }
    },
    theme: {
      type: String,
      value: 'default',
      observer: function(newVal) {
        if (this.data.theme == themes.smallBar) {
          this.setData({
            bottom: this.data.height / 2 - this.data.textSize - 8,
            scrollStyle: ''
          })
        }
      }
    },
    dataCus: {
      type: Array,
      value: '',
      observer: function(newVal) {
        this.setData({
          mDataCus: newVal
        });
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    itemWidth: 128,
    isScroll: true,
    scrollStyle: 'border-bottom: 1px solid #e5e5e5;',
    left: '0',
    right: '750',
    bottom: '0',
    mSelected: '0',
    lastIndex: 0,
    transition: 'left 0.5s, right 0.2s',
    windowWidth: 375,
    domData: [],
    textDomData: [],
    mDataCus: [],
    pageIndex: '',
    idItem: []
  },
  externalClasses: ['cus'],
  /**
   * 组件的方法列表
   */
  methods: {
    barLeft: function(index, dom) {
      let that = this;
      this.setData({
        left: dom[index].left
      })
    },
    barRight: function(index, dom) {
      let that = this;
      this.setData({
        right: that.data.windowWidth - dom[index].right,
      })
    },
    onItemTap: function(e) {
      const index = e.currentTarget.dataset.index;
      var checkId = this.data.idItem.channels[index].id
      const date = new Date().getTime()
      $api.getArticles(checkId, date).then(res => {
        // console.log(res.data.data.results)
        //请求成功
        this.setData({
          itemList: res.data.data.results
        })
        // 组件传值
        this.triggerEvent('onItemTap', {
          passValue: res.data.data.results
        })
      }).catch(err => {
        //请求失败
      })
      let str = this.data.lastIndex < index ? 'left 0.5s, right 0.2s' : 'left 0.2s, right 0.5s';
      this.setData({
        transition: str,
        lastIndex: index,
        mSelected: index,
      })
      if (this.data.theme == themes.smallBar) {
        this.barLeft(index, this.data.textDomData);
        this.barRight(index, this.data.textDomData);
      } else {
        this.barLeft(index, this.data.domData);
        this.barRight(index, this.data.domData);
      }
      this.triggerEvent('itemtap', e, {
        bubbles: true
      });
    }
  },
  lifetimes: {
    attached: function() {
      let that = this
      wx.request({
        url: "http://ttapi.research.itcast.cn/app/v1_0/user/channels",
        method: "GET",
        success: function(res) {
          that.setData({
            idItem: res.data.data
          })
          let item_list = [];
          for (var i = 0; i < res.data.data.channels.length; i++) {
            item_list.push(res.data.data.channels[i].name)
          }
          that.setData({
            items: item_list
          })
        }
      })
    },
    ready: function() {
      let that = this;
      const sysInfo = wx.getSystemInfoSync();
      this.setData({
        windowWidth: sysInfo.screenWidth
      })
      const query = this.createSelectorQuery();
      query.in(this).selectAll('.item').fields({
        dataset: true,
        rect: true,
        size: true
      }, function(res) {
        that.setData({
          domData: res,
        })
        that.barLeft(that.data.mSelected, that.data.domData);
        that.barRight(that.data.mSelected, that.data.domData);
        // console.log(res)
      }).exec()
      query.in(this).selectAll('.text').fields({
        dataset: true,
        rect: true,
        size: true
      }, function(res) {
        that.setData({
          textDomData: res,
        })
        if (that.data.theme == themes.smallBar) {
          that.barLeft(that.data.mSelected, that.data.textDomData);
          that.barRight(that.data.mSelected, that.data.textDomData);
        }
      }).exec()
    }
  },
  pageLifetimes: {}
})