// pages/BuildHabit/BuildHabit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    habit:{
      id: 0,
      title: "",
      remark: "",
      img: "",
      checktimes: [],
      week: {}
    },
    title:"",
    remark:"",
<<<<<<< HEAD
    value:"",
=======
>>>>>>> c401a80ca0d1b3c1f924841d67ab9c866c402846
    selected: {
      "monday": false,
      "tuesday": false,
      "wednesday": false,
      "thursday": false,
      "friday": false,
      "saturday": false,
      "sunday": false
    },
    imageList: [{

      value: 1,
      selected: false,
      src: "../../images/sport/baseball.png",
      title: 'baseball'
    }, {
      value: 2,
      selected: false,
      src: "../../images/sport/bicycle.png",
      title: 'bicycle'
    }, {
      value: 3,
      selected: false,
      src: "../../images/sport/diving-mask.png",
      title: 'diving-mask'
    }, {
      value: 4,
      selected: false,
      src: "../../images/sport/dumbbell.png",
      title: 'dumbbell'
    }, {
      value: 5,
      selected: false,
      src: "../../images/sport/golf.png",
      title: 'golf'
    }, {
      value: 6,
      selected: false,
      src: "../../images/sport/ping-pong-racket.png",
      title: 'ping-pong'
    }, {
      value: 7,
      selected: false,
      src: "../../images/sport/skates.png",
      title: 'skates'
    }, {
      value: 8,
      selected: false,
      src: "../../images/sport/soccer-ball.png",
      title: 'soccer-ball'
    }, {
      value: 9,
      selected: false,
      src: "../../images/sport/tennis.png",
      title: 'skates'
    }, {
      value: 10,
      selected: false,
      src: "../../images/sport/bowling.png",
      title: 'bowling'
    }, {
      value: 11,
      selected: false,
      src: "../../images/sport/skipping-rope.png",
      title: 'skipping-rope'
    }, {
      value: 12,
      selected: false,
      src: "../../images/sport/stopwatch.png",
      title: 'stopwatch'
    }]

  },
  check_box_Change(e) {
    //console.log(e)
    var selectedList = e.detail.value;
    var date = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    let selected = this.data.selected;//获取data里的值，好用来赋值
    for (var i = 0; i < date.length; i++) {
      if (selectedList.indexOf(date[i]) != -1) {
        selected[date[i]] = true;
      }
      else {
        selected[date[i]] = false;
      }
    }
    //console.log(selected)
    //console.log(this.data)
    this.data.habit.week = selected
    const habit=this.data.habit
    this.setData({
      habit,//保存星期选择
      selected: selected
    });
    //console.log(this.data.week)
  },
  habit_name(e) {

    this.data.habit.title = e.detail.value;//获取习惯名字
    const habit=this.data.habit;
    this.setData({
      habit
    })
    // console.log(this.data.title)
  },
  habit_sentence(e) {
    var value = e.detail.value;//获取激励自己的话
    this.data.habit.remark = value;
    const habit=this.data.habit
    this.setData({
      habit
    })
    //console.log(this.data.remark)

  },
  checkboxChange(e) {//存单图
    console.log(e)
    var value = e.detail.value
    var imageList = this.data.imageList

    for (var i = 0; i < imageList.length; i++) {
      if (imageList[i].value == value) {
        imageList[i].selected = true;
        this.data.habit.img = imageList[i].src;
      }
      else {
        imageList[i].selected = false;
      }
    }
    const habit=this.data.habit
    this.setData({
      imageList: imageList,
      habit
    })

  },
  formSubmit(e) {
    console.log(e)
    var habits = wx.getStorageSync("habits") || [];
    //console.log(e.detail.value.check_box.length)
    console.log(e.detail.value.check_box_image.length)
    console.log(e.detail.value.check_box.length)
    console.log(e.detail.value.name_input.length)
    console.log(e.detail.value.sentence_input.length)
    if(e.detail.value.check_box_image.length&&e.detail.value.check_box.length&&
      e.detail.value.name_input.length&&e.detail.value.sentence_input.length){
        wx.showModal({
          title:"确认保存",
          success: (result) => {
            if(result.confirm){//保存    
              let index=habits.findIndex(v=>v.id===this.data.habit.id)
              if(index!==-1){//如果存在则删除
                habits.splice(index,1)
              }
              habits.push(this.data.habit);
              console.log(habits)
              wx.setStorageSync("habits", habits);               
              wx.showToast({
                title: '保存中',
                icon: 'loading',
                duration: 1500,
                success:function(){
                  setTimeout(function(){
                    wx.showToast({
                      title: '保存成功',
                      icon: 'success',
                      duration: 500,
                      success:function(){
                        setTimeout(function(){
                          wx.navigateBack({
                            delta: 0,
                          })
                        },500)
                      }
                    })
                  },1500)
                }
              });
            }
          }
        })
      }
      else{
        wx.showToast({
          title: '您的习惯还没定制好哦!',
          icon: 'none',
          duration: 1500,
        })
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id= parseInt(options.chang_id)
    let habits = wx.getStorageSync('habits')||[];
    if(id>=0){//id存在则修改
      
      //console.log(habits.findIndex(v=>v.id===id))
      if(habits.findIndex(v=>v.id===id)!==-1){//如果存在
        const habit=habits[id]//获得habit信息

        var img_num=this.data.imageList.findIndex(v=>v.src===habit.img)//获取habit单选的选项
        const imageList=this.data.imageList
        imageList[img_num].selected=true
        this.setData({
          imageList,
          habit,
          title:habit.title,
          remark:habit.remark,
          selected:habit.week
        })
      }
    }
    else{//新建习惯
      var i;
      for(i=0;habits.findIndex(v=>v.id===i)!==-1;i++);//判断是否已有id
      this.data.habit.id=i;//找到不存在的id，就使本次创建的id为i值
      const habit=this.data.habit
      this.setData({
        habit
      })
  
    }
   
    //console.log(habits.findIndex(v=>v.id===0))
    //console.log(habits)
    
    //console.log(n)
    //console.log(this.data.habit_id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  
})