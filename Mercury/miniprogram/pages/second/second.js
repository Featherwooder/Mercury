// pages/second/second.js
const app=getApp()
var util=require('../../util/util');//调用util中的获取时间函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    habits:[
      {
        id: 0,
      title: "",
      remark: "",
      img: "",
      checktimes: [],
      week: {},
      display:false
      },
     
    ],
    animation1:null,
    animation2:null,
    avatarUrl: '',
    userInfo: {},
    openid:'',

    
    hidden1:true,
    hidden2:false,    
    hidden3:true,
    hidden4:false,
    have_habits:false,
    soup:"\n每个不曾起舞的日子，都是对生命的辜负！！",
    soup_back:"\n二十阿斯利康大家撒哈佛i啊回复第哦个划水都i！！"

  },
  animation: wx.createAnimation({
    duration: 800,
    timingFunction:"ease-out"
   }),
  turn(e) {

    let that = this
    let id = e.currentTarget.dataset.id
    // 点击正面
    if(id == 1) {
    this.setData({
    animation1: that.animation.rotateY(180).step().export(),
    animation2: that.animation.rotateY(0).step().export()
    })
    } else { //点击反面
    this.setData({
      animation1: that.animation.rotateY(0).step().export(),
      animation2: that.animation.rotateY(180).step().export()
    })
    }
   },
  close: function() {
    
    // 1.创建动画实例(animation)
    var animation1 = wx.createAnimation({
      duration: 200,//动画持续时间
      timingFunction: 'ease-in',//动画以低速开始
    })
    var animation2 = wx.createAnimation({
      duration: 200,//动画持续时间
      timingFunction: 'ease-in',//动画以低速开始
    })
    var animation3 = wx.createAnimation({
      duration: 200,//动画持续时间
      timingFunction: 'ease-in',//动画以低速开始
    })


   
    animation1.translate(0, 0).rotate(360).scale(0,0).opacity(0).step()
    animation2.translate(0, 0).rotate(360).scale(0,0).opacity(0).step()
    animation3.translate(0, 0).rotate(360).scale(0,0).opacity(0).step()

  
    // 3.导出动画
    this.setData({
      hidden2:false,
      hidden1:true,
      ani1:animation1.export(),
      ani2:animation2.export(),
      ani3:animation3.export()
    })
  },

  go: function() {
    
    // 1.创建动画实例(animation)
    var animation1 = wx.createAnimation({
      duration: 200,//动画持续时间
      timingFunction: 'ease-out',//动画以低速开始
    })
    var animation2 = wx.createAnimation({
      duration: 200,//动画持续时间
      timingFunction: 'ease-out',//动画以低速开始
    })
    var animation3 = wx.createAnimation({
      duration: 200,//动画持续时间
      timingFunction: 'ease-out',//动画以低速开始
    })


   
    animation1.translate3d(0, -90).rotate3d(360).scale(1,1).opacity(100).step()
    animation2.translate3d(-90, 0).rotate3d(360).scale(1,1).opacity(100).step()
    animation3.translate3d(-63, -63).rotate3d(360).scale(1,1).opacity(100).step()

  
    // 3.导出动画
    this.setData({
      hidden2:true,
      hidden1:false,
      ani1:animation1.export(),
      ani2:animation2.export(),
      ani3:animation3.export()
    })
  },
  myhabit(){
    wx-wx.navigateTo({
      url:"../../pages/calender/calender"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const habits=wx.getStorageSync('habits')||[]
    console.log(habits)
    this.setData({
      habits
    })           
    //获取habits
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time,
      avatarUrl:app.globalData.avatarUrl,
      userInfo:app.globalData.userInfo,
    });

  },
  user_Info(){
    wx-wx.navigateTo({
      url: '/pages/userinfo/userinfo',
    })
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
    var display_num=0;
    
    var j=0;
    for(j = 0,len=habits.length; j < len; j++) {
    for(var i=0;i<7;i++)
      habits.week[i]
    }
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