Page({
  data: {
    todo: '',
    todos: [],
    leftCount: 1,
    allFinished: false,
    allSetting: true,
    clearSetting: true,
    currentstorage: 0 ,
    testdate: "2019-5-31"
  },
  containerTap: function (res) {
    var that = this
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY + 85;
    this.setData({
      rippleStyle: ''
    });
    setTimeout(function () {
      that.setData({
        rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
      });
    }, 200)
  },
  save: function () {
    wx.setStorageSync('todos', this.data.todos);
  },

  onShow: function () {
    var todos = wx.getStorageSync('todos');
    console.log(todos)
    if (todos && todos.length) {
      var leftCount = todos.length;
      todos[0].finished = true;
      this.setData({ todos: todos, leftCount: leftCount, allFinished: !leftCount });
    }

    var allSetting = wx.getStorageSync('allSetting');
    if(typeof allSetting == 'boolean') {
      this.setData({ allSetting: allSetting});
    }

    var clearSetting = wx.getStorageSync('clearSetting');
    if (typeof clearSetting == 'boolean') {
      this.setData({ clearSetting: clearSetting });
    }

    //onsole.log((this.data.todos[this.data.currentstorage].things != undefined))
  },

  onItemRemove: function (e) {
    var index = e.currentTarget.dataset.index;
    var todos = this.data.todos;
    var remove = todos.splice(index, 1)[0];
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount -1
    });
    this.save();
    getApp().writeHistory(remove, 'delete', +new Date());
  },

  inputTodo: function (e) {
    this.setData({ todo: e.detail.value });
  },



  toggleTodo: function (e) {
    var currentindex = e.currentTarget.dataset.index;
    var todos = this.data.todos;
    var newtodos = todos.map(
      function(item,index){
        if (index == currentindex){
          item.finished = true;
          //console.log(item.finished)
        }
        else{
          item.finished = false;
        }
        return item;
      }
    )
    //console.log(newtodos)
    this.setData({
      currentstorage: currentindex,
      todos: newtodos,

    });
  },

  toggleAll: function (e) {
    var allFinished = !this.data.allFinished;
    var todos = this.data.todos.map(function(todo) {
      todo.finished = allFinished;
      return todo;
    });
    this.setData({
      todos: todos,
      allFinished: allFinished
    })
    this.save();
    getApp().writeHistory(null, allFinished ? 'finishAll' : 'restartAll', +new Date());
  },
  
  clearFinished: function (e) {
    var todos = this.data.todos;
    var remains = todos.filter(function(todo) {
      return !todo.finished;
    });
    this.setData({ todos: remains });
    this.save();
    getApp().writeHistory(null, 'clear', +new Date());
  },

  createItem: function (e) {
    wx.navigateTo({ url: '/pages/detail/detail' })
  },

  createThing: function (e) {
    wx.navigateTo({ url: '/pages/goods/goods?index=' + this.data.currentstorage })
  },

  onThingRemove: function (e) {
    var index = e.currentTarget.dataset.index;
    var currentstorage = this.data.currentstorage;
    
    var todos = this.data.todos;

    var remove = todos[currentstorage].things.splice(index, 1)[0];
    this.setData({
      todos: todos
    });
    this.save();
    getApp().writeHistory(remove, 'delete', +new Date());
  },
})
