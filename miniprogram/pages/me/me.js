Page({

  data: {
    avatar: '',
    name: ''
  },

  onShow: function () {

    this.setData({
      avatar: wx.getStorageSync('avatar'),
      name: wx.getStorageSync('name') || ''
    });

  },

  navTo: function(e) {
    wx.navigateTo({
      url: '/pages/' + e.currentTarget.dataset.target + '/' + e.currentTarget.dataset.target
    });
  }

})