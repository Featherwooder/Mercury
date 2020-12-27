// pages/second/second.js
const app = getApp()
var util = require('../../util/util'); //调用util中的获取时间函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    have_habits: false,
    habits_num: 0,
    // time:'',
    habits: [{
        id: 0,
        title: "",
        remark: "",
        img: "",
        checktimes: [],
        week: {},
        checked: false,
        display: false
      },
    ],

    animation1: null,
    animation2: null,
    avatarUrl: '',
    userInfo: {},
    openid: '',

    hidden1: true,
    hidden2: false,
    hidden3: true,
    hidden4: false,
    soup: "",
    soups:[
      {
      words:"\n我从来不相信什么懒洋洋的自由，我向往的自由是通过勤奋和努力实现的更广阔的人生，那样的自由才是珍贵的、有价值的。",
    },
    {
      words:"\n要有最朴素的生活和最遥远的梦想，即使明天天寒地冻，路远马亡。",
    },
    {
      words:"\n如果找不到坚持下去的理由，那就找一个重新开始的理由。",
    },
    {
      words:"\n别想什么一夜成名了，真实的只有百炼成钢。",
    },
    {
      words:"\n你须得忍耐无人知晓的寂寞，以钢铁般的意志咬牙穿行过黑暗，经历酷热与严寒，战胜自己的软 弱，才有万分之一的可能，抵达丰饶与光明。",
    },
    {
      words:"\n成功与否不是我能决定的，但坚持与否，却只有我能决定。",
    },
    {
      words:"\n做久了鼓掌的人，是时候为自己挣得一些掌声",
    },
    {
      words:"\n所谓无底深渊，下去，也是前程万里。",
    },
    {
      words:"\n不是所有的坚持都有结果，但总有一些坚持，能从冰封的土地里，培育出十万朵怒放的蔷薇。",
    },
    {
      words:"\n没有谁的生活会一直完美，但无论什么时候，都要看着前方，满怀希望就会所向披靡。",
    },
    {
      words:"\n在穿过林间的时候我觉得麻雀的死亡给我一些启示。我们虽然在尘网中生活 但永远不要失去想飞的心，不要忘记飞翔的姿势。",
    },
    {
      words:"\n如果不能安全度过今天，就不可能会有明天，没有了明天，也就没有了以后。所谓的一百年后，就是这些无可替代的日子一点点积累而成的，牺牲眼前的性命的人，是拯救不了未来的。",
    },
    {
      words:"\n你做三四月的事情，八九月就会有答案。",
    },
    {
      words:"\n当你打算放弃梦想时，告诉自己再多撑一天，一个星期，一个月，再多撑一年吧，你会发现，拒绝退场的结果令人惊讶。",
    },
    {
      words:"\n古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。",
    }
  ]
  },
  animation: wx.createAnimation({
    duration: 800,
    timingFunction: "ease-out"
  }),
  turn(e) {
    app.get_auth()
    let that = this
    let id = e.currentTarget.dataset.id
    // 点击正面
    if (id == 1) {
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
  close: function () {
    app.get_auth()
    // 1.创建动画实例(animation)
    var animation1 = wx.createAnimation({
      duration: 200, //动画持续时间
      timingFunction: 'ease-in', //动画以低速开始
    })
    var animation2 = wx.createAnimation({
      duration: 200, //动画持续时间
      timingFunction: 'ease-in', //动画以低速开始
    })
    var animation3 = wx.createAnimation({
      duration: 200, //动画持续时间
      timingFunction: 'ease-in', //动画以低速开始
    })



    animation1.translate(0, 0).rotate(360).scale(0, 0).opacity(0).step()
    animation2.translate(0, 0).rotate(360).scale(0, 0).opacity(0).step()
    animation3.translate(0, 0).rotate(360).scale(0, 0).opacity(0).step()


    // 3.导出动画
    this.setData({
      hidden2: false,
      hidden1: true,
      ani1: animation1.export(),
      ani2: animation2.export(),
      ani3: animation3.export()
    })
  },

  go: function () {
    app.get_auth()
    // 1.创建动画实例(animation)
    var animation1 = wx.createAnimation({
      duration: 200, //动画持续时间
      timingFunction: 'ease-out', //动画以低速开始
    })
    var animation2 = wx.createAnimation({
      duration: 200, //动画持续时间
      timingFunction: 'ease-out', //动画以低速开始
    })
    var animation3 = wx.createAnimation({
      duration: 200, //动画持续时间
      timingFunction: 'ease-out', //动画以低速开始
    })



    animation1.translate3d(0, -90).rotate3d(360).scale(1, 1).opacity(100).step()
    animation2.translate3d(-90, 0).rotate3d(360).scale(1, 1).opacity(100).step()
    animation3.translate3d(-63, -63).rotate3d(360).scale(1, 1).opacity(100).step()


    // 3.导出动画
    this.setData({
      hidden2: true,
      hidden1: false,
      ani1: animation1.export(),
      ani2: animation2.export(),
      ani3: animation3.export()
    })
  },
  myhabit() {
    wx - wx.navigateTo({
      url: "../../pages/calender/calender"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.callFunction({
    //   name:'SendMsg',
    //   complete:res=>{
    //       console.log('调用',res)
    //   } 
    // })
    const habits = wx.getStorageSync('habits') || []
    var i=0
    var time = util.formatTime(new Date());
    var date=0
    date=time.substr(time.length-2,time.length-1)
    console.log(date)
    console.log(typeof(date))
    date=date%14
    var soup=this.data.soups[date].words
    this.setData({
      habits,
      soup:soup
    })
    //获取habits
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time,
      avatarUrl: app.globalData.avatarUrl,
      userInfo: app.globalData.userInfo,
    });

  },
  user_Info() {
    app.get_auth()
    wx - wx.navigateTo({
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
    var date = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    var j = 0;
    var len = 0;
    let habits = this.data.habits;
    this.data.habits_num = 0
    for (j = 0, len = habits.length; j < len; j++) {
      var i = 0
      var today = 8
      today = util.getWeekByDate(new Date()) - 1
      if (habits[j].week[date[today]] == true) {
        habits[j].display = true
        this.data.habits_num++
      } else {
        habits[j].display = false
      }

      if (habits[j].checktimes[habits[j].checktimes.length - 1] == this.data.time) //今天是否打卡
      {

        habits[j].checked = true
        this.data.habits_num--

      } else {
        habits[j].checked = false

      }

    }
    var habits_num = this.data.habits_num
    if (this.data.habits_num > 0) {
      this.data.have_habits = true
    }
    var have_habits = this.data.have_habits
    this.setData({
      habits: habits,
      habits_num: habits_num,
      have_habits: have_habits
    });
  },

  onOpen(event) {
    console.log(event)
    const {
      position,
      name
    } = event.detail;
    wx.showToast({
      title: '打卡成功',
      icon: 'success',
      duration: 1500,
    })
    const habits = this.data.habits

    const checktimes = habits[event.currentTarget.id].checktimes
    habits[event.currentTarget.id].display = false
    habits[event.currentTarget.id].checktimes.push(this.data.time)
    this.data.habits_num--
    habits[event.currentTarget.id].checked = true
    var habits_num = this.data.habits_num
    if (this.data.habits_num == 0) {
      this.data.have_habits = false
    }
    var have_habits = this.data.have_habits
    //console.log(checktimes[checktimes.length - 1])
    wx.setStorageSync('habits', habits)
    const db = wx.cloud.database()

    db.collection('habits').add({
      data: {
        _id: app.globalData.openid, // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        habits
      },
      success: function (res) {
        console.log('成功');

      },
      fail: function (res) {
        console.log('更新');
        db.collection('habits').doc(app.globalData.openid).update({
          data: {
            habits
          }
        })
      }

    })
    this.setData({
      habits,
      habits_num: habits_num,
      have_habits: have_habits
    });
  },
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