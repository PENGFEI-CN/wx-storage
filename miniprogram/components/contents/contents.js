Component({

  properties: {
    content: {
      type: String,
      value: ''
    },
    startdate: {
      type: String,
      value: null
    },
    enddate: {
      type: String,
      value: null
    },
    days: {
      type: Number,
      value: null
    },
    lastdays: {
      type: Number,
      value: null
    }
  },

  data: {
    collapsed: true
  },

  attached: function () {
    console.log('component attached!');
  },

  detached: function () {
    console.log('component dettached!');
  },

  methods: {
    removeThing: function () {
      this.triggerEvent('thingremove');
    },
    toggleExtra: function (e) {
      this.setData({
        collapsed: !this.data.collapsed
      });
    }
  }
})
