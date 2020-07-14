Component({
  data: {
    verify: '' //获取内容
  },
  methods: {
    search: function(e) {
      this.setData({
        verify: e.detail.value
      });
      if (this.data.verify.length == 0) {
        this.setData({
          display: "block"
        });
      } else {
        this.setData({
          display: "none"
        });
      }
    }
  }
})