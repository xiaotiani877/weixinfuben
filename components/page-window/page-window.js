Component({
  data: {
    verify: '' //获取内容
  },
  methods: {
    search: function(e) {
      this.setData({
        verify: e.detail.value
      });
    }
  }
})