Page({
  data: {
    name:'',
    enddate: '',
    days: 0,
    lastdays: 0,
    index: null
  },
  newdate:function(date,days){
    var timedate = new Date(date).getTime()+days*24*60*60*1000;
    var newdate = new Date(timedate);
    var arr = [newdate.getFullYear(), newdate.getMonth()+1, newdate.getDate()]
    var string = arr.join('-');
    console.log(typeof(string))
    return string;
  },
  lastdate:function(date){
    var newdate = new Date().getTime();
    var olddate = new Date(date).getTime();
    var days = (olddate - newdate) /(1000*60*24*60);
    console.log(days)
    return Math.floor(days);
  },
  onLoad: function (options) {
    //console.log(this.newdate("2017-1-1",30));
    //console.log(this.lastdate("2018-1-1"));
    this.setData({
      index: options.index
    })
  },
  inputContent: function (e) {
    this.setData({ name: e.detail.value.trim() });
  },

  inputNum: function (e) {
    this.setData({ days: e.detail.value});
  },
  bindTimeChange: function(e){
    this.setData({
      startdate: e.detail.value,

    })
  },
  create: function () {
    this.setData({
      enddate: this.newdate(this.data.startdate, parseInt(this.data.days))
    })
    if (!this.data.content && !this.data.startdate && !this.data.days) {
      wx.showToast({ title: '请填写完整信息~', icon: 'none' });
      return;
    }
    var todos = wx.getStorageSync('todos');
    console.log(todos)
    var that = this;
    
    var things = {
      name: that.data.name,
      startdate: that.data.startdate,
      days: that.data.days,
      enddate: that.data.enddate,
      lastdate: that.lastdate(that.data.enddate)
    };
    console.log(todos[this.data.index]);
    if(todos[this.data.index].things == undefined){
      todos[this.data.index].things = [];
      todos[this.data.index].things[0] = things;
    }
    else{
    todos[this.data.index].things.push(things);
    }
    console.log(todos);
    wx.setStorageSync('todos', todos);
    wx.navigateBack();
  }
})